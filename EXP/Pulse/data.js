/* Pulse data layer — all persistent app state lives in one JSON document. */

const STORAGE_KEY = "pulseFitnessData";
const SCHEMA_VERSION = 1;

const ACTIVITY_LIBRARY = [
  {id:"gym", name:"Gym workout", category:"Strength", unit:"minutes", defaultGoal:45, xp:40, icon:"🏋️"},
  {id:"run", name:"Running", category:"Cardio", unit:"minutes", defaultGoal:30, xp:35, icon:"🏃"},
  {id:"walk", name:"Walking", category:"Cardio", unit:"steps", defaultGoal:8000, xp:25, icon:"🚶"},
  {id:"swim", name:"Swimming", category:"Cardio", unit:"minutes", defaultGoal:30, xp:35, icon:"🏊"},
  {id:"cycle", name:"Cycling", category:"Cardio", unit:"minutes", defaultGoal:30, xp:30, icon:"🚴"},
  {id:"yoga", name:"Yoga / mobility", category:"Recovery", unit:"minutes", defaultGoal:20, xp:25, icon:"🧘"},
  {id:"stretch", name:"Stretching", category:"Recovery", unit:"minutes", defaultGoal:10, xp:15, icon:"🤸"},
  {id:"sleep", name:"Wind-down / sleep routine", category:"Recovery", unit:"minutes", defaultGoal:30, xp:20, icon:"🌙"},
  {id:"water", name:"Hydration check-in", category:"Wellness", unit:"glasses", defaultGoal:8, xp:15, icon:"💧"},
  {id:"meditation", name:"Meditation", category:"Mind", unit:"minutes", defaultGoal:10, xp:15, icon:"🧘‍♂️"},
  {id:"outdoors", name:"Outdoor time", category:"Wellness", unit:"minutes", defaultGoal:20, xp:15, icon:"🌿"},
  {id:"steps", name:"Step goal", category:"Wellness", unit:"steps", defaultGoal:8000, xp:25, icon:"👟"},
];

function isoDate(date = new Date()){
  const d = new Date(date);
  d.setHours(0,0,0,0);
  const y = d.getFullYear();
  const m = String(d.getMonth()+1).padStart(2,"0");
  const day = String(d.getDate()).padStart(2,"0");
  return `${y}-${m}-${day}`;
}
function parseDate(s){ return new Date(`${s}T00:00:00`); }
function today(){ return isoDate(); }
function addDays(dateStr, delta){
  const d = parseDate(dateStr); d.setDate(d.getDate()+delta); return isoDate(d);
}
function formatDate(dateStr, opts={month:"short", day:"numeric"}){ 
  return parseDate(dateStr).toLocaleDateString(undefined, opts); 
}
function clamp(n,min,max){ return Math.max(min,Math.min(max,n)); }
function uid(prefix="id"){ return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`; }

const DEFAULT_STATE = {
  schemaVersion: SCHEMA_VERSION,
  updatedAt: new Date().toISOString(),
  profile: {
    name: "You",
    age: "",
    sex: "",
    heightCm: 174,
    goalWeightKg: "",
    dailyCalorieTarget: 0,
    activityLevel: "moderate"
  },
  settings: {
    theme: "system",
    weekStartsMonday: true,
    showCompletedTasks: true
  },
  gamification: {
    xp: 0,
    level: 1,
    lifetimeXp: 0,
    currentStreak: 0,
    bestStreak: 0,
    streakRecoveryTokens: 1,
    lastRecoveryUseDate: null,
    lastStreakDate: null,
    weeklyCommitment: 5,
    weeklyCompleted: 0,
    momentum: 0,
    achievements: [],
    dailyQuestBonusClaimed: {}
  },
  weightLogs: [],
  foodLibrary: [],
  foodLogs: [],
  activities: [],
};

function deepMerge(base, incoming){
  if(Array.isArray(base)) return Array.isArray(incoming) ? incoming : base;
  if(base && typeof base==="object"){
    const out = {...base};
    if(incoming && typeof incoming==="object" && !Array.isArray(incoming)){
      Object.keys(incoming).forEach(k => out[k] = k in out ? deepMerge(out[k], incoming[k]) : incoming[k]);
    }
    return out;
  }
  return incoming ?? base;
}

function sanitizeState(input){
  const merged = deepMerge(DEFAULT_STATE, input || {});
  merged.schemaVersion = SCHEMA_VERSION;
  merged.updatedAt = new Date().toISOString();
  merged.weightLogs = Array.isArray(merged.weightLogs) ? merged.weightLogs : [];
  merged.foodLibrary = Array.isArray(merged.foodLibrary) ? merged.foodLibrary : [];
  merged.foodLogs = Array.isArray(merged.foodLogs) ? merged.foodLogs : [];
  merged.activities = Array.isArray(merged.activities) ? merged.activities : [];
  merged.gamification.achievements = Array.isArray(merged.gamification.achievements) ? merged.gamification.achievements : [];
  return merged;
}

function loadState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return sanitizeState(DEFAULT_STATE);
    return sanitizeState(JSON.parse(raw));
  }catch(err){
    console.error("Pulse: unable to load saved data", err);
    return sanitizeState(DEFAULT_STATE);
  }
}

let state = loadState();
const listeners = new Set();
let saveTimer = null;

function getState(){ return state; }
function notify(){ listeners.forEach(fn => { try{ fn(state); }catch(e){ console.error(e); } }); }

function persistState(){
  state.updatedAt = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  notify();
}

function saveState({immediate=false}={}){
  if(saveTimer) clearTimeout(saveTimer);
  if(immediate) return persistState();
  saveTimer = setTimeout(persistState, 120);
}

function subscribe(fn){ listeners.add(fn); return ()=>listeners.delete(fn); }

function resetState(){
  state = sanitizeState(DEFAULT_STATE);
  persistState();
}

function replaceState(next){
  state = sanitizeState(next);
  persistState();
}

function downloadJSON(filename="pulse-fitness-backup.json"){
  const blob = new Blob([JSON.stringify(state,null,2)], {type:"application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href=url; a.download=filename; a.click();
  setTimeout(()=>URL.revokeObjectURL(url),500);
}

function importJSONFile(file){
  return new Promise((resolve,reject)=>{
    const reader = new FileReader();
    reader.onload = ()=>{
      try{
        const parsed = JSON.parse(reader.result);
        if(!parsed || typeof parsed!=="object") throw new Error("Invalid JSON document.");
        replaceState(parsed);
        resolve(getState());
      }catch(err){ reject(err); }
    };
    reader.onerror=()=>reject(reader.error || new Error("Could not read the file."));
    reader.readAsText(file);
  });
}

function getActivityForDate(dateStr){
  return state.activities.filter(a=>a.date===dateStr);
}
function getFoodForDate(dateStr){
  return state.foodLogs.filter(a=>a.date===dateStr);
}
function sum(arr, key){ return arr.reduce((t,x)=>t+(Number(x[key])||0),0); }

function addWeight(dateStr, weight, note=""){
  const value = Number(weight);
  if(!dateStr || !Number.isFinite(value) || value<=0) throw new Error("Enter a valid weight.");
  const existing = state.weightLogs.find(x=>x.date===dateStr);
  if(existing){ existing.weightKg=value; existing.note=note; }
  else state.weightLogs.push({id:uid("w"), date:dateStr, weightKg:value, note});
  state.weightLogs.sort((a,b)=>a.date.localeCompare(b.date));
  saveState();
}

function deleteWeight(id){
  state.weightLogs = state.weightLogs.filter(x=>x.id!==id);
  saveState();
}

function upsertFoodLibrary(food){
  const calories = Number(food.calories);
  if(!food.name || !Number.isFinite(calories) || calories<0) throw new Error("Food name and calories are required.");
  const clean = {
    id: food.id || uid("food"),
    name: String(food.name).trim(),
    serving: String(food.serving || "1 serving").trim(),
    calories,
    protein: Number(food.protein)||0,
    carbs: Number(food.carbs)||0,
    fat: Number(food.fat)||0,
    fiber: Number(food.fiber)||0,
    notes: String(food.notes||"").trim()
  };
  const idx = state.foodLibrary.findIndex(x=>x.id===clean.id);
  if(idx>=0) state.foodLibrary[idx]=clean; else state.foodLibrary.push(clean);
  saveState();
  return clean;
}

function deleteFood(id){
  state.foodLibrary = state.foodLibrary.filter(x=>x.id!==id);
  saveState();
}

function addFoodLog(entry){
  const calories = Number(entry.calories);
  const quantity = Number(entry.quantity || 1);
  if(!entry.date || !entry.name || !Number.isFinite(calories) || calories<0 || quantity<=0) throw new Error("Enter a valid food entry.");
  state.foodLogs.push({
    id:uid("fl"),
    date:entry.date,
    name:String(entry.name).trim(),
    quantity,
    unit:String(entry.unit||"serving"),
    calories:calories*quantity,
    protein:(Number(entry.protein)||0)*quantity,
    carbs:(Number(entry.carbs)||0)*quantity,
    fat:(Number(entry.fat)||0)*quantity,
    fiber:(Number(entry.fiber)||0)*quantity,
    notes:String(entry.notes||"").trim()
  });
  saveState();
}

function deleteFoodLog(id){
  state.foodLogs = state.foodLogs.filter(x=>x.id!==id);
  saveState();
}

function addActivity(entry){
  const clean = {
    id:entry.id||uid("act"),
    date:entry.date || today(),
    name:String(entry.name||"Activity").trim(),
    category:String(entry.category||"Wellness"),
    goal:Number(entry.goal)||0,
    unit:String(entry.unit||"minutes"),
    scheduledTime:String(entry.scheduledTime||""),
    completed:Boolean(entry.completed),
    completedAt:entry.completedAt || null,
    xp:Number(entry.xp)||15,
    source:entry.source||"custom",
    notes:String(entry.notes||"").trim()
  };
  state.activities.push(clean);
  saveState();
  return clean;
}

function toggleActivity(id){
  const item = state.activities.find(x=>x.id===id);
  if(!item) return;
  item.completed = !item.completed;
  item.completedAt = item.completed ? new Date().toISOString() : null;
  if(item.completed) awardXP(item.xp, "Activity completed");
  saveState();
}

function deleteActivity(id){
  state.activities = state.activities.filter(x=>x.id!==id);
  saveState();
}

function startOfWeek(dateStr=today()){
  const d = parseDate(dateStr);
  const day = d.getDay();
  const diff = state.settings.weekStartsMonday ? (day===0 ? -6 : 1-day) : -day;
  d.setDate(d.getDate()+diff);
  return isoDate(d);
}

function weekDates(dateStr=today()){
  const start=startOfWeek(dateStr);
  return Array.from({length:7},(_,i)=>addDays(start,i));
}

function recalcStreak(){
  const completedDates = new Set(
    state.activities.filter(a=>a.completed).map(a=>a.date)
  );
  const t=today();
  const y=addDays(t,-1);
  const yy=addDays(t,-2);

  // A finite "streak shield" can preserve a streak across exactly one missed day.
  // It is consumed only when the user returns and completes something today.
  if(
    completedDates.has(t) &&
    !completedDates.has(y) &&
    completedDates.has(yy) &&
    state.gamification.streakRecoveryTokens>0 &&
    state.gamification.lastRecoveryUseDate!==t
  ){
    state.gamification.streakRecoveryTokens -= 1;
    state.gamification.lastRecoveryUseDate = t;
  }

  let streak=0;
  let cursor=t;
  while(completedDates.has(cursor)){
    streak++;
    cursor=addDays(cursor,-1);
  }

  // After a successful recovery, bridge one missing day and continue the older streak.
  if(
    completedDates.has(t) &&
    state.gamification.lastRecoveryUseDate===t &&
    !completedDates.has(y) &&
    completedDates.has(yy)
  ){
    streak += 1;
    cursor = yy;
    while(completedDates.has(cursor)){
      streak++;
      cursor=addDays(cursor,-1);
    }
  }

  state.gamification.currentStreak=streak;
  state.gamification.bestStreak=Math.max(state.gamification.bestStreak,streak);
}

function awardXP(amount, reason=""){
  const xp=Math.max(0,Number(amount)||0);
  state.gamification.xp += xp;
  state.gamification.lifetimeXp += xp;
  const oldLevel=state.gamification.level;
  state.gamification.level = Math.floor(state.gamification.lifetimeXp/250)+1;
  recalcStreak();
  updateAchievements();
  if(state.gamification.level>oldLevel){
    showToast(`Level ${state.gamification.level} unlocked`);
  }else if(reason){
    showToast(`+${xp} XP · ${reason}`);
  }
  saveState();
}

function updateAchievements(){
  const g=state.gamification;
  const completed=state.activities.filter(a=>a.completed).length;
  const earned=new Set(g.achievements);
  const rules=[
    ["first_step", completed>=1, "First step"],
    ["ten_actions", completed>=10, "10 completed actions"],
    ["twenty_five", completed>=25, "25 completed actions"],
    ["seven_day", g.bestStreak>=7, "7-day streak"],
    ["level_5", g.level>=5, "Reached level 5"],
    ["food_library_5", state.foodLibrary.length>=5, "Saved 5 foods"],
    ["weight_log_7", state.weightLogs.length>=7, "Logged weight 7 times"]
  ];
  let changed=false;
  rules.forEach(([id,ok])=>{ if(ok&&!earned.has(id)){earned.add(id);changed=true;} });
  g.achievements=[...earned];
  if(changed) saveState();
}

function getDaySummary(dateStr=today()){
  const activities=getActivityForDate(dateStr);
  const foods=getFoodForDate(dateStr);
  const planned=activities.length;
  const done=activities.filter(a=>a.completed).length;
  return {
    date:dateStr,
    planned, done,
    consistency:planned ? Math.round(done/planned*100) : 0,
    calories:Math.round(sum(foods,"calories")),
    protein:Math.round(sum(foods,"protein")),
    carbs:Math.round(sum(foods,"carbs")),
    fat:Math.round(sum(foods,"fat"))
  };
}

function getWeeklyConsistency(dateStr=today()){
  const dates=weekDates(dateStr);
  const vals=dates.map(d=>getDaySummary(d).consistency);
  return Math.round(vals.reduce((a,b)=>a+b,0)/vals.length);
}

function calculateDailyCalories(profile=state.profile){
  const weight=Number(state.weightLogs.at(-1)?.weightKg)||65;
  const height=Number(profile.heightCm)||174;
  const age=Number(profile.age)||30;
  let bmr;
  if(profile.sex==="male") bmr=10*weight+6.25*height-5*age+5;
  else if(profile.sex==="female") bmr=10*weight+6.25*height-5*age-161;
  else bmr=10*weight+6.25*height-5*age-78;
  const factors={sedentary:1.2,light:1.375,moderate:1.55,high:1.725,athlete:1.9};
  return Math.round(bmr*(factors[profile.activityLevel]||1.55));
}

function getQuestState(){
  const date=today();
  const acts=getActivityForDate(date);
  const allDone=acts.length>0 && acts.every(a=>a.completed);
  const base=[
    {id:"move",title:"Complete one planned activity",meta:"Make one meaningful action count.",xp:20,done:acts.some(a=>a.completed)},
    {id:"log",title:"Log today's weight or skip intentionally",meta:"Keep your trend honest, not perfect.",xp:10,done:state.weightLogs.some(w=>w.date===date)},
    {id:"nutrition",title:"Log your first meal",meta:"Start the day with visibility.",xp:10,done:state.foodLogs.some(f=>f.date===date)}
  ];
  if(allDone) base[0].done=true;
  return base;
}

function maybeClaimQuestBonus(){
  const date=today();
  if(state.gamification.dailyQuestBonusClaimed[date]) return false;
  const q=getQuestState();
  if(q.every(x=>x.done)){
    state.gamification.dailyQuestBonusClaimed[date]=true;
    awardXP(35,"Daily quest bonus");
    return true;
  }
  return false;
}

function showToast(message){
  const el=document.querySelector(".toast");
  if(!el) return;
  el.textContent=message;
  el.classList.add("show");
  clearTimeout(window.__pulseToastTimer);
  window.__pulseToastTimer=setTimeout(()=>el.classList.remove("show"),1800);
}

window.Pulse={
  STORAGE_KEY,SCHEMA_VERSION,ACTIVITY_LIBRARY, DEFAULT_STATE,
  getState, saveState, subscribe, resetState, replaceState, downloadJSON, importJSONFile,
  today, isoDate, parseDate, addDays, formatDate, clamp, uid,
  getActivityForDate, getFoodForDate, addWeight, deleteWeight, upsertFoodLibrary, deleteFood,
  addFoodLog, deleteFoodLog, addActivity, toggleActivity, deleteActivity,
  startOfWeek, weekDates, recalcStreak, awardXP, updateAchievements,
  getDaySummary, getWeeklyConsistency, calculateDailyCalories, getQuestState, maybeClaimQuestBonus,
  showToast
};

document.addEventListener("DOMContentLoaded",()=>{
  const s=loadState();
  state=s;
  recalcStreak();
});
