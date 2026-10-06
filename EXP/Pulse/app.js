/* Shared application shell, navigation and global settings. */
const P=window.Pulse;

document.addEventListener("DOMContentLoaded",()=>{
  const state=P.getState();
  applyTheme(state.settings.theme);
  wireNav();
  wireGlobalTheme();
  renderAccount();
  const importer=document.getElementById("globalImportInput");
  if(importer){
    importer.addEventListener("change", async e=>{
      const file=e.target.files?.[0]; if(!file)return;
      try{ await P.importJSONFile(file); P.showToast("Data imported successfully"); setTimeout(()=>location.reload(),350); }
      catch(err){ alert(`Import failed: ${err.message}`); }
      e.target.value="";
    });
  }
  const exportBtn=document.getElementById("globalExportBtn");
  if(exportBtn) exportBtn.addEventListener("click",()=>P.downloadJSON(`pulse-backup-${P.today()}.json`));
});

function wireNav(){
  const page=document.body.dataset.page;
  document.querySelectorAll("[data-nav]").forEach(a=>{
    if(a.dataset.nav===page) a.classList.add("active");
  });
}
function wireGlobalTheme(){
  const btn=document.getElementById("themeToggle");
  if(!btn)return;
  btn.addEventListener("click",()=>{
    const current=P.getState().settings.theme;
    const next=current==="dark"?"light":current==="light"?"system":"dark";
    P.getState().settings.theme=next;
    P.saveState({immediate:true});
    applyTheme(next);
  });
}
function applyTheme(mode){
  const resolved=mode==="system"?(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):mode;
  document.documentElement.dataset.theme=resolved;
  const btn=document.getElementById("themeToggle");
  if(btn) btn.textContent=mode==="system"?"Theme · System":`Theme · ${mode[0].toUpperCase()+mode.slice(1)}`;
}
function renderAccount(){
  const s=P.getState();
  const name=s.profile.name || "You";
  const els=document.querySelectorAll("[data-account-name]");
  els.forEach(x=>x.textContent=name);
  document.querySelectorAll("[data-level]").forEach(x=>x.textContent=`Level ${s.gamification.level}`);
}
