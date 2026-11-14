const fs = require('fs');

global.window = {};
require('../words.js');
const currentBank = global.window.WORD_BANK || [];
console.log('Current bank count:', currentBank.length);

const bankMap = new Map();
currentBank.forEach(w => bankMap.set(w.word.toLowerCase(), w));

// Comprehensive master vocabulary additions (GRE/SAT/Literary)
const masterAdditions = [
  {
    word: "antediluvian",
    phonetic: "/ˌæn.ti.dɪˈluː.vi.ən/",
    pos: "adjective",
    definitions: [
      "Extremely old-fashioned, outdated, or primitive.",
      "Of or belonging to the time before the biblical Flood."
    ],
    synonyms: ["archaic", "antiquated", "obsolete", "prehistoric", "primordial"],
    antonyms: ["modern", "contemporary", "cutting-edge", "futuristic"],
    examples: [
      "The firm's antediluvian computer network crashed whenever high-volume trades commenced.",
      "Critics lambasted the senator's antediluvian views on technological privacy and digital civil liberties.",
      "His collection of antediluvian printing presses drew book collectors from across the globe."
    ]
  },
  {
    word: "asperity",
    phonetic: "/æˈspɛr.ɪ.ti/",
    pos: "noun",
    definitions: [
      "Harshness of tone or manner.",
      "Roughness of surface; sharpness or severity."
    ],
    synonyms: ["sharpness", "tartness", "acrimony", "severity", "brusqueness"],
    antonyms: ["mildness", "gentleness", "sweetness", "affability"],
    examples: [
      "She noted the asperity in his voice when the subject of the audit was raised.",
      "Despite the bitter asperity of the mountain winter, the research team persevered.",
      "The diplomat responded without asperity, defusing what could have been a hostile exchange."
    ]
  },
  {
    word: "bellicose",
    phonetic: "/ˈbɛl.ɪ.koʊs/",
    pos: "adjective",
    definitions: [
      "Demonstrating aggression and willingness to fight.",
      "Eager to argue, quarrel, or provoke conflict."
    ],
    synonyms: ["warlike", "pugnacious", "truculent", "combative", "belligerent"],
    antonyms: ["peaceable", "pacific", "conciliatory", "irenic"],
    examples: [
      "The prime minister's bellicose rhetoric alarmed international trade partners and sparked market sell-offs.",
      "Editorial boards condemned the dictator's bellicose pronouncements regarding neighboring territories.",
      "His bellicose disposition made quiet compromise virtually impossible within the coalition."
    ]
  },
  {
    word: "calumny",
    phonetic: "/ˈkæl.əm.ni/",
    pos: "noun",
    definitions: [
      "The making of false and defamatory statements to damage someone's reputation; slander.",
      "A false accusation or maliciously untruthful charge."
    ],
    synonyms: ["slander", "defamation", "vilification", "libel", "aspersion"],
    antonyms: ["acclaim", "praise", "vindication", "encomium"],
    examples: [
      "She endured a vicious campaign of calumny orchestrated by her corporate rivals.",
      "The historian uncovered evidence proving the ancient rumors were nothing more than partisan calumny.",
      "He sued the tabloid for calumny after they published baseless allegations regarding his personal finances."
    ]
  },
  {
    word: "capitulate",
    phonetic: "/kəˈpɪtʃ.ə.leɪt/",
    pos: "verb",
    definitions: [
      "To cease to resist an opponent or an unwelcome demand; surrender.",
      "To surrender under agreed conditions or terms."
    ],
    synonyms: ["surrender", "concede", "yield", "succumb", "relinquish"],
    antonyms: ["resist", "withstand", "persevere", "defy"],
    examples: [
      "Surrounded on all sides and out of munitions, the garrison was forced to capitulate.",
      "Refusing to capitulate to the lobby's threats, the governor signed the conservation bill into law.",
      "Management finally capitulated to the union's demands after a protracted two-week strike."
    ]
  },
  {
    word: "castigate",
    phonetic: "/ˈkæs.tɪ.ɡeɪt/",
    pos: "verb",
    definitions: [
      "To reprimand someone severely; censure or criticize harshly.",
      "To punish with a view to disciplinary correction."
    ],
    synonyms: ["rebuke", "scold", "admonish", "chastise", "excoriate"],
    antonyms: ["praise", "commend", "laud", "applaud"],
    examples: [
      "The editorial castigated senior executives for their reckless oversight of risk reserves.",
      "The judge castigated the defense counsel for repeatedly misleading the jury during opening remarks.",
      "She did not castigate her team for an honest mistake, choosing instead to conduct a calm post-mortem."
    ]
  },
  {
    word: "chicanery",
    phonetic: "/ʃɪˈkeɪ.nə.ri/",
    pos: "noun",
    definitions: [
      "The use of trickery to achieve a political, financial, or legal purpose.",
      "Deceptive subterfuge or clever artifice."
    ],
    synonyms: ["trickery", "deception", "subterfuge", "skulduggery", "duplicity"],
    antonyms: ["candor", "honesty", "transparency", "forthrightness"],
    examples: [
      "Investigative reporters uncovered financial chicanery hidden beneath dozens of offshore shell companies.",
      "He rose through the ranks through sheer talent rather than the backroom chicanery common in the capital.",
      "The courtroom was no place for procedural chicanery, the magistrate sternly reminded counsel."
    ]
  },
  {
    word: "circumspect",
    phonetic: "/ˈsɜː.kəm.spɛkt/",
    pos: "adjective",
    definitions: [
      "Wary and unwilling to take risks; prudent; discreet.",
      "Considering all circumstances and possible consequences before acting."
    ],
    synonyms: ["cautious", "wary", "prudent", "judicious", "vigilant"],
    antonyms: ["reckless", "rash", "imprudent", "heedless"],
    examples: [
      "Given the volatile nature of the stock market, the fund manager adopted a circumspect investment thesis.",
      "Officials remained circumspect in their statements until all forensic evidence had been authenticated.",
      "A circumspect traveler always secures multiple photocopies of important identification documents."
    ]
  },
  {
    word: "clandestine",
    phonetic: "/klænˈdɛs.tɪn/",
    pos: "adjective",
    definitions: [
      "Kept secret or done secretively, especially because illicit.",
      "Conducted with purposeful concealment."
    ],
    synonyms: ["covert", "surreptitious", "stealthy", "confidential", "undercover"],
    antonyms: ["overt", "public", "transparent", "avowed"],
    examples: [
      "The resistance fighters held clandestine meetings in the cellar of an abandoned apothecary.",
      "Intelligence agencies intercepted clandestine communications between the rogue syndicates.",
      "Their clandestine romance bloomed far away from the prying eyes of high society gossips."
    ]
  },
  {
    word: "cogent",
    phonetic: "/ˈkoʊ.dʒənt/",
    pos: "adjective",
    definitions: [
      "Clear, logical, and convincing in argument.",
      "Appealing powerfully to the intellect or reason."
    ],
    synonyms: ["compelling", "convincing", "persuasive", "lucid", "forceful"],
    antonyms: ["unconvincing", "weak", "fallacious", "inconclusive"],
    examples: [
      "The attorney delivered a cogent summation that left little room for reasonable doubt.",
      "Her cogent analysis of energy infrastructure spending persuaded the bipartisan committee to act.",
      "Even skeptics acknowledged that the scientist offered a cogent explanation for the anomaly."
    ]
  },
  {
    word: "commensurate",
    phonetic: "/kəˈmɛn.ʃər.ət/",
    pos: "adjective",
    definitions: [
      "Corresponding in size or degree; in proportion.",
      "Having the same measure, duration, or magnitude."
    ],
    synonyms: ["equivalent", "proportionate", "comparable", "corresponding", "appropriate"],
    antonyms: ["disproportionate", "inadequate", "incommensurate", "unequal"],
    examples: [
      "Salary and bonuses will be commensurate with each candidate's experience and demonstrated leadership.",
      "The criminal sentence was commensurate with the severity of the financial fraud committed.",
      "Their relief was commensurate with the enormous peril they had just escaped."
    ]
  },
  {
    word: "compunction",
    phonetic: "/kəmˈpʌŋk.ʃən/",
    pos: "noun",
    definitions: [
      "A feeling of guilt or moral scruple that prevents or follows the doing of something bad.",
      "A twinge of conscience or contrition."
    ],
    synonyms: ["scruple", "remorse", "misgiving", "qualm", "contrition"],
    antonyms: ["indifference", "ruthlessness", "unrepentance", "callousness"],
    examples: [
      "He showed no compunction about dismissing hundreds of loyal workers to inflate quarterly dividends.",
      "A wave of compunction swept over her as she realized the cruel impact of her thoughtless remark.",
      "Ruthless profiteers operated without the slightest compunction for community well-being."
    ]
  },
  {
    word: "concomitant",
    phonetic: "/kənˈkɑː.mɪ.tənt/",
    pos: "adjective",
    definitions: [
      "Naturally accompanying or associated; concurrent.",
      "Existing or occurring concurrently with something else."
    ],
    synonyms: ["accompanying", "attendant", "associated", "collateral", "concurrent"],
    antonyms: ["unrelated", "independent", "disconnected", "isolated"],
    examples: [
      "Rapid economic expansion often brings concomitant environmental degradation and urban sprawl.",
      "She welcomed the promotion, aware of the concomitant increase in responsibility and travel.",
      "Technological breakthroughs are rarely unaccompanied by concomitant ethical dilemmas."
    ]
  },
  {
    word: "conflagration",
    phonetic: "/ˌkɒn.fləˈɡreɪ.ʃən/",
    pos: "noun",
    definitions: [
      "An extensive fire which destroys a great deal of land or property.",
      "A large, destructive, or devastating conflict."
    ],
    synonyms: ["blaze", "inferno", "firestorm", "holocaust", "conflict"],
    antonyms: ["deluge", "peace", "calm", "douse"],
    examples: [
      "Firefighters worked around the clock to contain the roaring conflagration that swept through the pine forest.",
      "Diplomats struggled desperately to prevent regional skirmishes from igniting a continental conflagration.",
      "The Great Fire of 1666 was a conflagration that permanently reshaped London's urban landscape."
    ]
  },
  {
    word: "contentious",
    phonetic: "/kənˈtɛn.ʃəs/",
    pos: "adjective",
    definitions: [
      "Causing or likely to cause an argument; controversial.",
      "Involving heated debate or dispute; quarrelsome."
    ],
    synonyms: ["disputable", "debatable", "quarrelsome", "antagonistic", "polemical"],
    antonyms: ["agreeable", "uncontroversial", "harmonious", "peaceable"],
    examples: [
      "Zoning laws for affordable housing remained the most contentious item on the council's agenda.",
      "Her contentious demeanor alienated several colleagues who had originally supported her initiative.",
      "The election gave rise to contentious debates that divided families across the commonwealth."
    ]
  },
  {
    word: "credulous",
    phonetic: "/ˈkrɛdʒ.ə.ləs/",
    pos: "adjective",
    definitions: [
      "Having or showing too great a readiness to believe things; gullible.",
      "Easily deceived or taken in by specious claims."
    ],
    synonyms: ["gullible", "naive", "impressionable", "unsuspecting", "trusting"],
    antonyms: ["skeptical", "cynical", "incredulous", "suspicious"],
    examples: [
      "The swindler preyed on credulous retirees looking for guaranteed returns on their savings.",
      "Science education equips students with the critical tools needed to avoid being credulous consumers of online claims.",
      "He was not credulous enough to believe that a miracle cure could replace proven medicine."
    ]
  },
  {
    word: "cupidity",
    phonetic: "/kjuːˈpɪd.ɪ.ti/",
    pos: "noun",
    definitions: [
      "Greed for money or possessions.",
      "Inordinate desire for wealth."
    ],
    synonyms: ["greed", "avarice", "rapacity", "covetousness", "acquisitiveness"],
    antonyms: ["generosity", "altruism", "munificence", "philanthropy"],
    examples: [
      "The warlord's relentless cupidity led to the plunder of historical antiquities and public treasuries.",
      "Fables throughout antiquity warn against the corrosive consequences of insatiable cupidity.",
      "Corporate cupidity blinded board members to the perilous safety shortcuts being taken in factories."
    ]
  },
  {
    word: "cursory",
    phonetic: "/ˈkɜː.sər.i/",
    pos: "adjective",
    definitions: [
      "Hasty and therefore not thorough or detailed.",
      "Rapidly or superficially performed."
    ],
    synonyms: ["perfunctory", "superficial", "hasty", "desultory", "brief"],
    antonyms: ["thorough", "exhaustive", "meticulous", "in-depth"],
    examples: [
      "Even a cursory examination of the financial statements revealed glaring arithmetic errors.",
      "He cast a cursory glance over the memorandum before signing it and rushing to his flight.",
      "The inspector faced fierce censure for delivering a cursory assessment of the structural bridge supports."
    ]
  },
  {
    word: "debacle",
    phonetic: "/deɪˈbɑː.kəl/",
    pos: "noun",
    definitions: [
      "A sudden and ignominious failure; a fiasco.",
      "A complete collapse or breakdown."
    ],
    synonyms: ["fiasco", "catastrophe", "disaster", "collapse", "ruin"],
    antonyms: ["triumph", "success", "victory", "masterpiece"],
    examples: [
      "The product rollout turned into a public relations debacle when the software crashed on live television.",
      "Military historians studied the maritime debacle to understand why warning signals were dismissed.",
      "The team recovered remarkably well after the opening-night debacle and went on to win the championship."
    ]
  },
  {
    word: "decorous",
    phonetic: "/ˈdɛk.ər.əs/",
    pos: "adjective",
    definitions: [
      "In keeping with good taste and propriety; polite and restrained.",
      "Conforming to standard social conventions."
    ],
    synonyms: ["proper", "seemly", "tasteful", "genteel", "dignified"],
    antonyms: ["unseemly", "indecorous", "crass", "vulgar"],
    examples: [
      "The delegates maintained a decorous silence while the treaty was signed in the grand hall.",
      "She was admired for her decorous behavior during the emotionally fraught family reunion.",
      "The court requires decorous conduct and formal attire from all attending legal practitioners."
    ]
  },
  {
    word: "deference",
    phonetic: "/ˈdɛf.ər.əns/",
    pos: "noun",
    definitions: [
      "Humble submission and respect.",
      "Polite acquiescence to another person's judgment or wishes."
    ],
    synonyms: ["respect", "reverence", "regard", "veneration", "obeisance"],
    antonyms: ["disrespect", "insolence", "contempt", "defiance"],
    examples: [
      "In deference to her vast experience, the committee adopted her recommendations without debate.",
      "Younger apprentices listened with quiet deference as the master clockmaker described his art.",
      "Out of deference to the family's privacy, journalists withdrew their cameras from the chapel steps."
    ]
  },
  {
    word: "deleterious",
    phonetic: "/ˌdɛl.ɪˈtɪər.i.əs/",
    pos: "adjective",
    definitions: [
      "Causing harm or damage.",
      "Having a harmful or injurious effect on health or well-being."
    ],
    synonyms: ["harmful", "damaging", "detrimental", "injurious", "pernicious"],
    antonyms: ["beneficial", "advantageous", "wholesome", "salutary"],
    examples: [
      "Medical researchers warned of the deleterious long-term effects of chronic sleep deprivation.",
      "Divorce proceedings can have a deleterious psychological impact on children if high conflict persists.",
      "The toxic runoff produced deleterious consequences for the aquatic life of the river basin."
    ]
  },
  {
    word: "demagogue",
    phonetic: "/ˈdɛm.ə.ɡɑːɡ/",
    pos: "noun",
    definitions: [
      "A political leader who seeks support by appealing to popular desires and prejudices rather than by rational argument.",
      "An unprincipled orator who stirs up passions."
    ],
    synonyms: ["agitator", "firebrand", "rabble-rouser", "populist", "instigator"],
    antonyms: ["statesman", "philosopher", "unifier", "diplomat"],
    examples: [
      "The constitution was engineered with checks and balances specifically to thwart any rising demagogue.",
      "Historians documented how the demagogue manipulated economic grievances to consolidate authoritarian power.",
      "She warned the public against following a demagogue whose promises defied the basic laws of mathematics."
    ]
  },
  {
    word: "demure",
    phonetic: "/dɪˈmjʊər/",
    pos: "adjective",
    definitions: [
      "Reserved, modest, and shy.",
      "Affecting quiet modesty or sobriety."
    ],
    synonyms: ["modest", "meek", "coy", "reticent", "diffident"],
    antonyms: ["brazen", "bold", "shameless", "extroverted"],
    examples: [
      "Behind her demure smile lay an acute legal mind and a fierce determination to win.",
      "He wore a demure dark suit to the hearing, speaking only when addressed by the tribunal.",
      "Her demure demeanor made her unexpected comedic performance all the more delightful."
    ]
  },
  {
    word: "desiccate",
    phonetic: "/ˈdɛs.ɪ.keɪt/",
    pos: "verb",
    definitions: [
      "To remove the moisture from something; cause to dry up.",
      "To drain of vitality, interest, or spiritual energy."
    ],
    synonyms: ["dehydrate", "dry", "parch", "evaporate", "drain"],
    antonyms: ["hydrate", "moisten", "irrigate", "invigorate"],
    examples: [
      "The blistering desert winds threaten to desiccate the fragile flora within hours.",
      "Decades of bureaucratic routine had begun to desiccate his once-flourishing artistic passion.",
      "Food preservationists desiccate herbs to seal in aromatic flavor compounds for long-term storage."
    ]
  },
  {
    word: "despot",
    phonetic: "/ˈdɛs.pət/",
    pos: "noun",
    definitions: [
      "A ruler or other person who holds absolute power, typically one who exercises it in a cruel or oppressive way.",
      "An autocrat or tyrannical monarch."
    ],
    synonyms: ["tyrant", "autocrat", "dictator", "oppressor", "monarch"],
    antonyms: ["democrat", "liberator", "constitutionalist", "republican"],
    examples: [
      "The rebellion was ignited when the despot seized private estates and dissolved the independent judiciary.",
      "Citizens celebrated in the capital squares when the oppressive despot was peacefully forced from power.",
      "In corporate life, he behaved like a miniature despot, demanding absolute obedience on every minor detail."
    ]
  },
  {
    word: "desultory",
    phonetic: "/ˈdɛs.əl.tɔːr.i/",
    pos: "adjective",
    definitions: [
      "Lacking a plan, purpose, or enthusiasm.",
      "Occurring haphazardly or jumping from one thing to another."
    ],
    synonyms: ["unfocused", "random", "haphazard", "discursive", "erratic"],
    antonyms: ["methodical", "systematic", "purposeful", "disciplined"],
    examples: [
      "Their desultory conversation drifted from local weather to childhood vacations without ever reaching a point.",
      "A desultory search through old filing cabinets failed to locate the deed to the property.",
      "He managed only a desultory attempt at finishing his dissertation before abandoning it entirely."
    ]
  },
  {
    word: "diatribe",
    phonetic: "/ˈdaɪ.ə.traɪb/",
    pos: "noun",
    definitions: [
      "A forceful and bitter verbal attack against someone or something.",
      "A prolonged, harsh speech or piece of writing."
    ],
    synonyms: ["tirade", "harangue", "denunciation", "polemic", "screed"],
    antonyms: ["panegyric", "encomium", "eulogy", "tribute"],
    examples: [
      "The commissioner launched into a furious diatribe against administrative corruption in the police force.",
      "Instead of answering the reporter's question, the candidate delivered a familiar diatribe against the media.",
      "Her essay was a reasoned philosophical treatise rather than an angry partisan diatribe."
    ]
  },
  {
    word: "didactic",
    phonetic: "/daɪˈdæk.tɪk/",
    pos: "adjective",
    definitions: [
      "Intended to teach, particularly in having moral instruction as an ulterior motive.",
      "Tending to lecture others in a patronizing or preachy manner."
    ],
    synonyms: ["instructive", "educational", "pedagogic", "moralizing", "preachy"],
    antonyms: ["uninstructive", "hedonistic", "entertaining", "non-didactic"],
    examples: [
      "The Victorian fable was openly didactic, weaving clear lessons about honesty into every chapter.",
      "Audiences resented the playwright's overly didactic tone, preferring ambiguity over heavy-handed morals.",
      "Her lectures were wonderfully engaging rather than rigidly didactic, inviting lively audience debate."
    ]
  },
  {
    word: "diffident",
    phonetic: "/ˈdɪf.ɪ.dənt/",
    pos: "adjective",
    definitions: [
      "Modest or shy because of a lack of self-confidence.",
      "Hesitant in acting or speaking through lack of self-assurance."
    ],
    synonyms: ["shy", "bashful", "reticent", "timid", "hesitant"],
    antonyms: ["confident", "assertive", "bold", "presumptuous"],
    examples: [
      "The diffident graduate student spoke in a soft voice despite having solved the mathematical problem.",
      "Under her mentor's encouragement, the diffident pianist gradually blossomed into a world-class soloist.",
      "He cast a diffident glance toward the dais before daring to raise his hand during the assembly."
    ]
  },
  {
    word: "dilatory",
    phonetic: "/ˈdɪl.ə.tɔːr.i/",
    pos: "adjective",
    definitions: [
      "Slow to act; intended to cause delay.",
      "Characterized by procrastination."
    ],
    synonyms: ["procrastinating", "tardy", "sluggish", "dawdling", "delaying"],
    antonyms: ["punctual", "expeditious", "prompt", "speedy"],
    examples: [
      "The defense lawyer's dilatory tactics were designed to prolong the trial until the election had concluded.",
      "The agency's dilatory response to the water contamination crisis triggered a federal investigation.",
      "Overcoming dilatory habits is the first and hardest step toward building a productive writing routine."
    ]
  },
  {
    word: "dilettante",
    phonetic: "/ˈdɪl.ə.tɑːnt/",
    pos: "noun",
    definitions: [
      "A person who cultivates an area of interest, such as the arts, without real commitment or knowledge.",
      "An amateur or dabbler in an art or field of study."
    ],
    synonyms: ["dabbler", "amateur", "nonprofessional", "superficialist", "layman"],
    antonyms: ["professional", "expert", "specialist", "connoisseur"],
    examples: [
      "Serious sculptors dismissed the wealthy patron as a dilettante who merely bought fashionable studios.",
      "He was not a dilettante in botany; he had spent decades categorizing rare alpine ferns in the field.",
      "Her critics accused her of being a political dilettante jumping on convenient humanitarian bandwagons."
    ]
  },
  {
    word: "disaffected",
    phonetic: "/ˌdɪs.əˈfɛk.tɪd/",
    pos: "adjective",
    definitions: [
      "Dissatisfied with the people in authority and no longer willing to support them.",
      "Rebellious, resentful, or estranged."
    ],
    synonyms: ["discontented", "alienated", "estranged", "rebellious", "mutinous"],
    antonyms: ["loyal", "content", "devoted", "allegiant"],
    examples: [
      "The reform movement drew huge momentum from disaffected young workers shut out of home ownership.",
      "Military commanders feared that disaffected soldiers in border outposts might join the insurrection.",
      "Her speech resonated powerfully with disaffected voters who felt abandoned by both major parties."
    ]
  },
  {
    word: "discursive",
    phonetic: "/dɪˈskɜː.sɪv/",
    pos: "adjective",
    definitions: [
      "Digressing from subject to subject; rambling.",
      "Relating to discourse or reasoning rather than intuition."
    ],
    synonyms: ["rambling", "digressive", "circuitous", "meandering", "desultory"],
    antonyms: ["concise", "focused", "succinct", "linear"],
    examples: [
      "The professor's discursive lecture touched upon medieval astrology, modern physics, and French pastry.",
      "While entertaining over dinner, his discursive presentation frustrated executives seeking immediate answers.",
      "The novel's discursive style allows the author to explore rich philosophical tangents across time."
    ]
  },
  {
    word: "disparage",
    phonetic: "/dɪˈspær.ɪdʒ/",
    pos: "verb",
    definitions: [
      "To regard or represent as being of little worth; belittle.",
      "To speak slightingly of; run down."
    ],
    synonyms: ["belittle", "deride", "deprecate", "denigrate", "demean"],
    antonyms: ["praise", "extol", "laud", "compliment"],
    examples: [
      "It is petty and counterproductive to disparage the legitimate achievements of your predecessors.",
      "Voters grew tired of hearing politicians disparage their rivals rather than present positive policies.",
      "She never sought to disparage junior colleagues, offering constructive feedback instead of ridicule."
    ]
  },
  {
    word: "dispassionate",
    phonetic: "/dɪsˈpæʃ.ən.ət/",
    pos: "adjective",
    definitions: [
      "Not influenced by strong emotion, and so able to be rational and impartial.",
      "Free from passion or personal bias."
    ],
    synonyms: ["unbiased", "objective", "impartial", "detached", "equitable"],
    antonyms: ["biased", "emotional", "partisan", "passionate"],
    examples: [
      "A judge must bring a dispassionate perspective to even the most harrowing courtroom proceedings.",
      "His dispassionate analysis of market volatility helped investors avoid panic-selling during the dip.",
      "Medical ethicists are trained to conduct dispassionate evaluations of controversial treatment decisions."
    ]
  },
  {
    word: "disrepute",
    phonetic: "/ˌdɪs.rɪˈpjuːt/",
    pos: "noun",
    definitions: [
      "The state of being held in low esteem by the public.",
      "Disgrace, infamy, or loss of reputation."
    ],
    synonyms: ["disgrace", "dishonor", "infamy", "ignominy", "discredit"],
    antonyms: ["esteem", "honor", "repute", "glory"],
    examples: [
      "The sport fell into severe disrepute following a string of high-profile match-fixing scandals.",
      "Unethical accounting practices brought the once-venerated brokerage firm into complete disrepute.",
      "The newly appointed dean was determined to rescue the faculty from institutional disrepute."
    ]
  },
  {
    word: "dissemble",
    phonetic: "/dɪˈsɛm.bəl/",
    pos: "verb",
    definitions: [
      "To conceal one's true motives, feelings, or beliefs.",
      "To disguise or conceal behind a false appearance."
    ],
    synonyms: ["feign", "pretend", "disguise", "mask", "camouflage"],
    antonyms: ["disclose", "reveal", "manifest", "confess"],
    examples: [
      "An experienced poker champion knows precisely when to dissemble and when to project confidence.",
      "Unable to dissemble her dismay, her jaw dropped when the audit results were read aloud.",
      "Machiavellian courtiers learned early that the ability to dissemble was necessary for survival."
    ]
  },
  {
    word: "disseminate",
    phonetic: "/dɪˈsɛm.ɪ.neɪt/",
    pos: "verb",
    definitions: [
      "To spread or disperse (especially information) widely.",
      "To distribute or broadcast throughout an area or population."
    ],
    synonyms: ["circulate", "distribute", "disperse", "broadcast", "propagate"],
    antonyms: ["suppress", "withhold", "conceal", "gather"],
    examples: [
      "The World Health Organization worked swiftly to disseminate safety protocols across quarantine zones.",
      "Scholars use open-access digital repositories to disseminate their findings directly to the public.",
      "The press office sought to disseminate accurate data before sensationalized rumors could take hold."
    ]
  },
  {
    word: "dissonance",
    phonetic: "/ˈdɪs.ə.nəns/",
    pos: "noun",
    definitions: [
      "A tension or clash resulting from the combination of two disharmonious or unsuitable elements.",
      "Lack of agreement or harmony between people or things."
    ],
    synonyms: ["discord", "disharmony", "incongruity", "discrepancy", "strife"],
    antonyms: ["harmony", "accord", "concord", "consonance"],
    examples: [
      "Psychologists study how cognitive dissonance motivates people to rationalize contradictory actions.",
      "The stark dissonance between executive bonuses and widespread factory layoffs enraged the workforce.",
      "Modern orchestral composers intentionally employ dissonance to evoke tension and mystery."
    ]
  },
  {
    word: "distend",
    phonetic: "/dɪˈstɛnd/",
    pos: "verb",
    definitions: [
      "To swell or cause to swell by pressure from the inside.",
      "To expand or dilate outward."
    ],
    synonyms: ["swell", "bloat", "dilate", "expand", "inflate"],
    antonyms: ["shrink", "contract", "deflate", "constrict"],
    examples: [
      "Malnutrition can cause the abdomen to distend painfully in growing children.",
      "Excess steam pressure threatened to distend the antique boiler's copper casing.",
      "As the balloon rose through thinner air, internal gas pressure caused it to distend further."
    ]
  },
  {
    word: "dogmatic",
    phonetic: "/dɒɡˈmæt.ɪk/",
    pos: "adjective",
    definitions: [
      "Inclined to lay down principles as incontrovertibly true, without regard for evidence or other opinions.",
      "Characterized by asserting unproved doctrines."
    ],
    synonyms: ["opinionated", "assertive", "doctrinaire", "authoritarian", "inflexible"],
    antonyms: ["open-minded", "flexible", "pragmatic", "tentative"],
    examples: [
      "He held dogmatic opinions on architecture, dismissing all contemporary glass skyscrapers as monstrosities.",
      "A healthy academic environment encourages open debate rather than dogmatic adherence to one school of thought.",
      "Her dogmatic insistence on strict orthodoxy alienated several younger researchers."
    ]
  },
  {
    word: "duplicity",
    phonetic: "/djuːˈplɪs.ɪ.ti/",
    pos: "noun",
    definitions: [
      "Deceitfulness in speech or conduct; double-dealing.",
      "The quality or state of being twofold or two-faced."
    ],
    synonyms: ["deceit", "deception", "dishonesty", "treachery", "fraud"],
    antonyms: ["honesty", "candor", "sincerity", "integrity"],
    examples: [
      "When the spy's duplicity was exposed, his former colleagues felt an acute sense of personal betrayal.",
      "Corporate duplicity during environmental audits led to record-setting regulatory fines.",
      "She saw right through his suave charm, detecting the unmistakable duplicity underneath."
    ]
  },
  {
    word: "ebullient",
    phonetic: "/ɪˈbʊl.i.ənt/",
    pos: "adjective",
    definitions: [
      "Cheerful and full of energy; exuberant.",
      "Boiling or agitated like boiling water."
    ],
    synonyms: ["exuberant", "buoyant", "cheerful", "enthusiastic", "vivacious"],
    antonyms: ["depressed", "melancholy", "somber", "subdued"],
    examples: [
      "Her ebullient personality brightened even the most tedious board meetings.",
      "The stadium erupted in ebullient celebration as the winning goal was struck in injury time.",
      "He returned from his overseas sabbatical in an ebullient mood, bursting with new book concepts."
    ]
  },
  {
    word: "eclectic",
    phonetic: "/ɪˈklɛk.tɪk/",
    pos: "adjective",
    definitions: [
      "Deriving ideas, style, or taste from a broad and diverse range of sources.",
      "Selecting elements from various systems or methods."
    ],
    synonyms: ["wide-ranging", "broad", "diverse", "multifarious", "heterogeneous"],
    antonyms: ["dogmatic", "narrow", "homogeneous", "uniform"],
    examples: [
      "Her personal library featured an eclectic mix of ancient Greek poetry, cyberpunk fiction, and quantum theory.",
      "The restaurant's eclectic menu seamlessly united Peruvian ceviche with Japanese robata grilling.",
      "An eclectic approach to problem-solving enables innovators to borrow proven models from disparate fields."
    ]
  },
  {
    word: "efficacious",
    phonetic: "/ˌɛf.ɪˈkeɪ.ʃəs/",
    pos: "adjective",
    definitions: [
      "Successful in producing a desired or intended result; effective.",
      "Possessing the power to achieve the intended goal."
    ],
    synonyms: ["effective", "successful", "potent", "productive", "effectual"],
    antonyms: ["ineffective", "fruitless", "futile", "impotent"],
    examples: [
      "Clinical trials demonstrated that the new immunotherapy was remarkably efficacious against stubborn tumors.",
      "Preventive healthcare remains the single most efficacious strategy for lowering municipal medical costs.",
      "They sought an efficacious compromise that addressed security without stifling commercial activity."
    ]
  },
  {
    word: "effrontery",
    phonetic: "/ɪˈfrʌn.tər.i/",
    pos: "noun",
    definitions: [
      "Insolent or impertinent behavior; shameless audacity.",
      "Barefaced boldness or unblushing impudence."
    ],
    synonyms: ["impudence", "impertinence", "insolence", "presumption", "audacity"],
    antonyms: ["deference", "timidity", "modesty", "respect"],
    examples: [
      "After embezzling millions from the pension fund, he had the effrontery to demand a severance bonus.",
      "The ambassador was shocked by the diplomat's effrontery in publicly questioning his sovereign's integrity.",
      "Few people possessed the effrontery to contradict the formidable director in front of the board."
    ]
  },
  {
    word: "egregious",
    phonetic: "/ɪˈɡriː.dʒəs/",
    pos: "adjective",
    definitions: [
      "Outstandingly bad; shocking; outrageous.",
      "Conspicuously and flagrantly offensive."
    ],
    synonyms: ["shocking", "appalling", "terrible", "flagrant", "atrocious"],
    antonyms: ["marvelous", "exemplary", "praiseworthy", "minor"],
    examples: [
      "The independent ombudsman uncovered egregious safety violations that had been covered up for years.",
      "Making such an egregious calculation error cost the engineering team millions in replacement steel.",
      "The referee overlooked several egregious fouls during the closing minutes of the heated derby."
    ]
  },
  {
    word: "elegy",
    phonetic: "/ˈɛl.ɪ.dʒi/",
    pos: "noun",
    definitions: [
      "A poem of serious reflection, typically a lament for the dead.",
      "A melancholy musical composition or mournful literary work."
    ],
    synonyms: ["lament", "requiem", "dirge", "threnody", "monody"],
    antonyms: ["paean", "celebration", "hymn", "eulogy"],
    examples: [
      "W.H. Auden penned a heartbreaking elegy in memory of W.B. Yeats that touched generations of poets.",
      "The cellist played a haunting elegy that brought tears to the eyes of mourners gathered in the cathedral.",
      "Her memoir reads like an affectionate elegy for the vanishing rural culture of the highlands."
    ]
  },
  {
    word: "elucidate",
    phonetic: "/ɪˈluː.sɪ.deɪt/",
    pos: "verb",
    definitions: [
      "To make something clear; explain.",
      "To shed light upon an obscure or complicated subject."
    ],
    synonyms: ["explain", "clarify", "illuminate", "explicate", "interpret"],
    antonyms: ["obfuscate", "confuse", "cloud", "obscure"],
    examples: [
      "The astrophysicist used simple analogies to elucidate the mechanics of gravitational waves.",
      "Further archival discoveries will help elucidate the sequence of decisions leading up to the treaty.",
      "She asked the witness to elucidate the apparent contradictions between his written statement and sworn testimony."
    ]
  },
  {
    word: "emollient",
    phonetic: "/ɪˈmɑː.li.ənt/",
    pos: "adjective",
    definitions: [
      "Having the quality of softening or soothing the skin.",
      "Attempting to avoid confrontation or calms anger; conciliatory."
    ],
    synonyms: ["soothing", "softening", "calming", "mollifying", "conciliatory"],
    antonyms: ["abrasive", "caustic", "irritating", "aggravating"],
    examples: [
      "The dermatologist prescribed an emollient cream to repair the patient's severely chapped skin.",
      "The veteran mediator employed an emollient tone that helped soothe inflamed tempers across the table.",
      "Her words had an emollient effect, reassuring the anxious crowd that their homes were safe."
    ]
  },
  {
    word: "empirical",
    phonetic: "/ɛmˈpɪr.ɪ.kəl/",
    pos: "adjective",
    definitions: [
      "Based on, concerned with, or verifiable by observation or experience rather than theory or pure logic.",
      "Relying on practical experiment."
    ],
    synonyms: ["experiential", "observational", "practical", "factual", "verifiable"],
    antonyms: ["theoretical", "hypothetical", "conjectural", "speculative"],
    examples: [
      "The hypothesis sounded elegant on paper, but it lacked empirical validation in real-world trials.",
      "Economists analyzed decades of empirical data on tax rates and employment growth before drafting the reform.",
      "Her conclusions were grounded in rigorous empirical observation rather than academic dogma."
    ]
  },
  {
    word: "enervate",
    phonetic: "/ˈɛn.ər.veɪt/",
    pos: "verb",
    definitions: [
      "To cause someone to feel drained of energy or vitality; weaken.",
      "To sap the mental, physical, or moral vigor of someone."
    ],
    synonyms: ["exhaust", "tire", "fatigue", "weary", "debilitate"],
    antonyms: ["invigorate", "energize", "strengthen", "vitalize"],
    examples: [
      "The oppressive heat and high humidity worked together to enervate the marathon runners by mile eighteen.",
      "Months of bureaucratic infighting threatened to enervate the enthusiasm of the young research fellows.",
      "A long, sleepless transpacific flight can completely enervate even the most seasoned diplomat."
    ]
  },
  {
    word: "engender",
    phonetic: "/ɪnˈdʒɛn.dər/",
    pos: "verb",
    definitions: [
      "To cause or give rise to a feeling, situation, or condition.",
      "To produce, originate, or bring into existence."
    ],
    synonyms: ["generate", "provoke", "spark", "foster", "beget"],
    antonyms: ["quench", "destroy", "annihilate", "extinguish"],
    examples: [
      "Transparent governance and consistent dialogue help engender deep trust between police and citizens.",
      "The CEO's sudden reversal on remote work policy threatened to engender widespread resentment.",
      "Philosophical puzzles often engender lively debates that spill far beyond the lecture hall."
    ]
  },
  {
    word: "equivocal",
    phonetic: "/ɪˈkwɪv.ə.kəl/",
    pos: "adjective",
    definitions: [
      "Open to more than one interpretation; ambiguous.",
      "Uncertain or questionable in significance."
    ],
    synonyms: ["ambiguous", "evasive", "indeterminate", "opaque", "vague"],
    antonyms: ["unequivocal", "clear", "unambiguous", "definite"],
    examples: [
      "The politician gave an equivocal response when asked whether he would endorse the controversial tax bill.",
      "Laboratory test results remained frustratingly equivocal, necessitating a second round of biopsies.",
      "Her equivocal smile left him guessing whether she was amused or quietly offended by the quip."
    ]
  },
  {
    word: "equivocate",
    phonetic: "/ɪˈkwɪv.ə.keɪt/",
    pos: "verb",
    definitions: [
      "To use ambiguous language so as to conceal the truth or avoid committing oneself.",
      "To hedge or prevaricate intentionally."
    ],
    synonyms: ["prevaricate", "hedge", "vacillate", "waffle", "temporize"],
    antonyms: ["confront", "clarify", "speak plainly", "commit"],
    examples: [
      "When pressed on who authorized the surveillance, the spokesperson began to equivocate noticeably.",
      "A leader must articulate a clear moral path forward rather than equivocate in times of crisis.",
      "The witness continued to equivocate under cross-examination, earning a sharp rebuke from the magistrate."
    ]
  },
  {
    word: "erudite",
    phonetic: "/ˈɛr.jʊ.daɪt/",
    pos: "adjective",
    definitions: [
      "Having or showing great knowledge or learning.",
      "Characterized by deep, extensive scholarship."
    ],
    synonyms: ["scholarly", "learned", "knowledgeable", "intellectual", "pedantic"],
    antonyms: ["ignorant", "uneducated", "illiterate", "ill-informed"],
    examples: [
      "His erudite monograph on Byzantine trade routes became an instant classic among medieval historians.",
      "She charmed the audience with an erudite discussion that seamlessly connected Homer to contemporary cinema.",
      "Beneath his modest demeanor sat an erudite mind capable of translating six dead languages."
    ]
  },
  {
    word: "esoteric",
    phonetic: "/ˌɛs.əˈtɛr.ɪk/",
    pos: "adjective",
    definitions: [
      "Intended for or likely to be understood by only a small number of people with specialized knowledge.",
      "Confined to and understandable only by the initiated."
    ],
    synonyms: ["obscure", "arcane", "recondite", "abstruse", "cryptic"],
    antonyms: ["mainstream", "accessible", "exoteric", "common"],
    examples: [
      "The symposium focused on an esoteric branch of algebraic geometry that few outside the department understood.",
      "He collected rare, esoteric treatises on Renaissance alchemy and hermetic symbolism.",
      "While the technical jargon seemed esoteric, the underlying engineering principles were straightforward."
    ]
  },
  {
    word: "espouse",
    phonetic: "/ɪˈspaʊz/",
    pos: "verb",
    definitions: [
      "To adopt or support a cause, belief, or way of life.",
      "To marry or give in marriage."
    ],
    synonyms: ["adopt", "embrace", "champion", "advocate", "uphold"],
    antonyms: ["reject", "renounce", "repudiate", "abandon"],
    examples: [
      "Throughout her career, she continued to espouse the principles of environmental stewardship and social equity.",
      "It is hypocritical to publicly espouse fiscal austerity while running up massive personal debts.",
      "The candidate chose to espouse a platform focused entirely on public education and infrastructure."
    ]
  },
  {
    word: "eulogy",
    phonetic: "/ˈjuː.lə.dʒi/",
    pos: "noun",
    definitions: [
      "A speech or piece of writing that praises someone or something highly, typically someone who has just died.",
      "A high tribute of commendation."
    ],
    synonyms: ["accolade", "panegyric", "encomium", "tribute", "paean"],
    antonyms: ["condemnation", "diatribe", "criticism", "censure"],
    examples: [
      "His lifelong friend delivered a moving eulogy that celebrated both his humor and his quiet philanthropy.",
      "The prime minister offered a national eulogy honoring the fallen soldiers who defended the border outpost.",
      "The retiring dean received a heartfelt eulogy from faculty members whose careers she had championed."
    ]
  },
  {
    word: "evanescent",
    phonetic: "/ˌɛv.əˈnɛs.ənt/",
    pos: "adjective",
    definitions: [
      "Soon passing out of sight, memory, or existence; quickly fading or disappearing.",
      "Fleeting, ephemeral, or impermanent."
    ],
    synonyms: ["fleeting", "transient", "ephemeral", "vanishing", "fugitive"],
    antonyms: ["permanent", "enduring", "lasting", "perpetual"],
    examples: [
      "The rainbow was evanescent, disappearing behind gray thunderclouds before they could snap a photograph.",
      "Fame on social media is often evanescent, burning brightly for an afternoon before fading into obscurity.",
      "He captured the evanescent beauty of morning mist rolling through the redwood valleys."
    ]
  },
  {
    word: "exacerbate",
    phonetic: "/ɪɡˈzæs.ər.beɪt/",
    pos: "verb",
    definitions: [
      "To make a problem, bad situation, or negative feeling worse.",
      "To aggravate or increase the severity of something."
    ],
    synonyms: ["aggravate", "worsen", "inflame", "compound", "intensify"],
    antonyms: ["mitigate", "alleviate", "ameliorate", "soothe"],
    examples: [
      "High import tariffs threaten to exacerbate ongoing supply chain shortages across the manufacturing belt.",
      "Arguing with an irate customer will only exacerbate their frustration and escalate the dispute.",
      "Inappropriate medication can exacerbate existing symptoms rather than provide relief."
    ]
  },
  {
    word: "exculpate",
    phonetic: "/ˈɛk.skʌl.peɪt/",
    pos: "verb",
    definitions: [
      "To show or declare that someone is not guilty of wrongdoing.",
      "To clear from alleged fault or criminal guilt."
    ],
    synonyms: ["absolve", "exonerate", "acquit", "vindicate", "clear"],
    antonyms: ["incriminate", "blame", "convict", "censure"],
    examples: [
      "New DNA evidence uncovered by the innocence project served to completely exculpate the imprisoned man.",
      "The internal audit managed to exculpate junior accountants while holding senior executives accountable.",
      "He produced authenticated timestamped receipts that exculpated him from any role in the burglary."
    ]
  },
  {
    word: "execrable",
    phonetic: "/ˈɛk.sɪ.krə.bəl/",
    pos: "adjective",
    definitions: [
      "Extremely bad or unpleasant; detestable.",
      "Deserving of condemnation or loathing."
    ],
    synonyms: ["appalling", "abominable", "dreadful", "atrocious", "deplorable"],
    antonyms: ["admirable", "exemplary", "superb", "commendable"],
    examples: [
      "The film critic described the screenplay as execrable, faulting both its dialogue and plot coherence.",
      "Conditions in the unsanitary tenement were execrable, sparking demands for emergency public housing.",
      "His execrable treatment of junior interns ultimately led to his removal from the residency program."
    ]
  },
  {
    word: "exigent",
    phonetic: "/ˈɛk.sɪ.dʒənt/",
    pos: "adjective",
    definitions: [
      "Pressing; demanding; requiring immediate action or aid.",
      "Requiring more than is reasonable or available."
    ],
    synonyms: ["urgent", "pressing", "critical", "imperative", "demanding"],
    antonyms: ["negligible", "unimportant", "relaxed", "facile"],
    examples: [
      "The rapid spread of the forest fire created an exigent crisis that required national guard mobilization.",
      "Law enforcement officers may enter a premises without a warrant under strictly defined exigent circumstances.",
      "Her exigent schedule left little time for leisurely weekend dinners with family."
    ]
  },
  {
    word: "exonerate",
    phonetic: "/ɪɡˈzɑː.nə.reɪt/",
    pos: "verb",
    definitions: [
      "To officially absolve someone from blame for a fault or wrongdoing.",
      "To release someone from a duty or obligation."
    ],
    synonyms: ["acquit", "absolve", "exculpate", "vindicate", "discharge"],
    antonyms: ["convict", "incriminate", "blame", "condemn"],
    examples: [
      "The special prosecutor concluded an exhaustive investigation that served to exonerate the mayor.",
      "Eyewitness corroboration helped exonerate the driver from responsibility for the multi-car pileup.",
      "Years after his passing, newly declassified government documents helped exonerate the whistleblowing scientist."
    ]
  },
  {
    word: "expedient",
    phonetic: "/ɪkˈspiː.di.ənt/",
    pos: "adjective",
    definitions: [
      "Convenient and practical, although possibly improper or immoral.",
      "Suitable for achieving a particular end in a given circumstance."
    ],
    synonyms: ["advantageous", "pragmatic", "convenient", "tactical", "utilitarian"],
    antonyms: ["inexpedient", "ethical", "disadvantageous", "principled"],
    examples: [
      "Politicians often find it expedient to make sweeping promises during campaigns that they later quietly abandon.",
      "In an emergency, using a temporary wire bypass was an expedient solution until spare parts arrived.",
      "A principled leader rejects expedient shortcuts that compromise institutional integrity."
    ]
  },
  {
    word: "expiate",
    phonetic: "/ˈɛk.spi.eɪt/",
    pos: "verb",
    definitions: [
      "To atone for guilt or sin; make amends for.",
      "To extinguish the guilt incurred by an offense."
    ],
    synonyms: ["atone", "amend", "redeem", "compensate", "reparate"],
    antonyms: ["worsen", "commit", "compound", "aggravate"],
    examples: [
      "He dedicated the remainder of his fortune to philanthropic hospitals in an effort to expiate his past misdeeds.",
      "In many ancient cultures, elaborate rituals were performed annually to expiate collective tribal guilt.",
      "A heartfelt apology is the first necessary step to expiate an offense against a trusted colleague."
    ]
  },
  {
    word: "expurgate",
    phonetic: "/ˈɛk.spər.ɡeɪt/",
    pos: "verb",
    definitions: [
      "To remove matter thought to be objectionable or unsuitable from a book or text.",
      "To cleanse or purify by purging."
    ],
    synonyms: ["censor", "bowdlerize", "sanitize", "purge", "redact"],
    antonyms: ["corrupt", "adulterate", "insert", "restore"],
    examples: [
      "School boards voted to expurgate several passages deemed too graphic for middle school curricula.",
      "Historians prefer unedited original manuscripts over versions that publishers chose to expurgate.",
      "The regime attempted to expurgate all references to the revolution from standard history textbooks."
    ]
  },
  {
    word: "extant",
    phonetic: "/ɛkˈstænt/",
    pos: "adjective",
    definitions: [
      "Still in existence; surviving.",
      "Currently existing and not destroyed, lost, or extinct."
    ],
    synonyms: ["surviving", "existing", "remaining", "undestroyed", "enduring"],
    antonyms: ["extinct", "lost", "destroyed", "vanished"],
    examples: [
      "The library houses one of the few extant copies of the Gutenberg Bible printed on vellum.",
      "Extant documents from the early Roman republic offer invaluable glimpses into ancient agrarian laws.",
      "Only three species within this ancient genus of trees remain extant in the southern hemisphere."
    ]
  },
  {
    word: "extol",
    phonetic: "/ɪkˈstoʊl/",
    pos: "verb",
    definitions: [
      "To praise enthusiastically and lavishly.",
      "To glorify or commend highly."
    ],
    synonyms: ["praise", "laud", "acclaim", "celebrate", "commend"],
    antonyms: ["criticize", "denounce", "disparage", "castigate"],
    examples: [
      "Health advocates extol the benefits of Mediterranean diets rich in olive oil, nuts, and leafy greens.",
      "The city council gathered to extol the bravery of the first responders who rescued flood victims.",
      "Art historians extol the painter's revolutionary handling of natural sunlight in rural landscapes."
    ]
  },
  {
    word: "extraneous",
    phonetic: "/ɪkˈstreɪ.ni.əs/",
    pos: "adjective",
    definitions: [
      "Irrelevant or unrelated to the subject being dealt with.",
      "Originating from the outside; external."
    ],
    synonyms: ["irrelevant", "immaterial", "superfluous", "unrelated", "peripheral"],
    antonyms: ["essential", "pertinent", "relevant", "intrinsic"],
    examples: [
      "The editor pruned extraneous subplots to make the pacing of the thriller taut and suspenseful.",
      "During the executive briefing, she asked presenters to omit extraneous background details and focus on findings.",
      "Acoustic insulation shields the sensitive recording studio from extraneous highway noise."
    ]
  },
  {
    word: "facetious",
    phonetic: "/fəˈsiː.ʃəs/",
    pos: "adjective",
    definitions: [
      "Treating serious issues with deliberately inappropriate humor; flippant.",
      "Not meant to be taken seriously or literally."
    ],
    synonyms: ["flippant", "glib", "jocular", "tongue-in-cheek", "wippish"],
    antonyms: ["serious", "grave", "solemn", "earnest"],
    examples: [
      "His facetious comment about the company's impending bankruptcy earned him a stony glare from the chairman.",
      "She meant the remark to be mildly facetious, but several team members interpreted it as sharp criticism.",
      "A courtroom is not the appropriate setting for facetious retorts during sworn testimony."
    ]
  },
  {
    word: "fallacious",
    phonetic: "/fəˈleɪ.ʃəs/",
    pos: "adjective",
    definitions: [
      "Based on a mistaken belief or unsound reasoning.",
      "Tending to deceive or mislead."
    ],
    synonyms: ["erroneous", "false", "misleading", "flawed", "unsound"],
    antonyms: ["sound", "correct", "valid", "verifiable"],
    examples: [
      "The editorial rested on the fallacious assumption that higher interest rates inevitably cause mass unemployment.",
      "Logicians dissected the politician's fallacious arguments, identifying three distinct cognitive errors.",
      "Believing that correlation guarantees causation is one of the most common fallacious traps in science."
    ]
  },
  {
    word: "fastidious",
    phonetic: "/fæˈstɪd.i.əs/",
    pos: "adjective",
    definitions: [
      "Very attentive to and concerned about accuracy and detail.",
      "Very hard to please; demanding extreme care and delicacy."
    ],
    synonyms: ["meticulous", "scrupulous", "punctilious", "exacting", "perfectionist"],
    antonyms: ["careless", "sloppy", "lax", "undemanding"],
    examples: [
      "The master watchmaker was fastidious about cleanliness, operating in a pressurized, dust-free lab.",
      "Her fastidious eye for typography ensured that every publication from the press looked immaculate.",
      "He was notoriously fastidious about his dining habits, inspecting every piece of silverware with care."
    ]
  },
  {
    word: "fatuous",
    phonetic: "/ˈfætʃ.u.əs/",
    pos: "adjective",
    definitions: [
      "Silly and pointless; foolish.",
      "Complacently or inanely foolish."
    ],
    synonyms: ["silly", "foolish", "inane", "vacuous", "asinine"],
    antonyms: ["sensible", "intelligent", "sagacious", "prudent"],
    examples: [
      "Ignoring the weather service's hurricane warnings proved to be a fatuous decision.",
      "She grew weary of the talk show's fatuous questions about celebrity gossip rather than public policy.",
      "His fatuous grin vanished the moment the detective revealed the incriminating surveillance tapes."
    ]
  },
  {
    word: "feckless",
    phonetic: "/ˈfɛk.ləs/",
    pos: "adjective",
    definitions: [
      "Lacking initiative or strength of character; irresponsible.",
      "Ineffective, incompetent, or useless."
    ],
    synonyms: ["irresponsible", "ineffective", "incompetent", "shiftless", "careless"],
    antonyms: ["capable", "responsible", "competent", "enterprising"],
    examples: [
      "Voters ousted the feckless city council after consecutive winters of unplowed municipal roads.",
      "His feckless brother squandered the family inheritance on risky offshore gambling syndicates.",
      "The report condemned the feckless regulatory oversight that allowed dangerous chemicals to pollute the aquifer."
    ]
  },
  {
    word: "fecund",
    phonetic: "/ˈfɛk.ənd/",
    pos: "adjective",
    definitions: [
      "Producing or capable of producing an abundance of offspring or new growth; fertile.",
      "Intellectually productive or inventive."
    ],
    synonyms: ["fertile", "fruitful", "productive", "prolific", "generative"],
    antonyms: ["barren", "sterile", "infertile", "unproductive"],
    examples: [
      "The rich alluvial soils along the delta made the region one of the most fecund agricultural zones on earth.",
      "The composer's fecund imagination yielded nine symphonies and dozens of sonatas over a single decade.",
      "The artistic salon served as a fecund breeding ground for revolutionary philosophical concepts."
    ]
  },
  {
    word: "fervid",
    phonetic: "/ˈfɜː.vɪd/",
    pos: "adjective",
    definitions: [
      "Intensely enthusiastic or passionate, especially to an excessive degree.",
      "Hot, burning, or glowing."
    ],
    synonyms: ["fervent", "passionate", "ardent", "intense", "zealous"],
    antonyms: ["apathetic", "indifferent", "cool", "dispassionate"],
    examples: [
      "Her fervid defense of civil liberties drew thunderous applause from the student gathering.",
      "He remained a fervid champion of nuclear fusion research despite repeated commercial delays.",
      "The candidate's fervid speeches energized grassroots volunteers throughout the national campaign."
    ]
  },
  {
    word: "florid",
    phonetic: "/ˈflɒr.ɪd/",
    pos: "adjective",
    definitions: [
      "Having a red or flushed complexion.",
      "Elaborately or excessively intricate or ornate."
    ],
    synonyms: ["ornate", "flowery", "elaborate", "flushed", "ruddy"],
    antonyms: ["plain", "austere", "pallid", "simple"],
    examples: [
      "The nineteenth-century opera hall was decorated with florid plasterwork and gilded angels.",
      "His florid prose style, while admired in Victorian England, felt overwrought to modern readers.",
      "Years of brisk mountain air and outdoor physical labor had given the shepherd a florid complexion."
    ]
  },
  {
    word: "fractious",
    phonetic: "/ˈfræk.ʃəs/",
    pos: "adjective",
    definitions: [
      "Easily irritated; bad-tempered.",
      "Difficult to control; unruly or quarrelsome."
    ],
    synonyms: ["unruly", "quarrelsome", "irritable", "peevish", "petulant"],
    antonyms: ["agreeable", "tractable", "patient", "docile"],
    examples: [
      "The fractious committee argued for hours over parliamentary procedure without passing a single resolution.",
      "Long delays on the airport tarmac transformed tired travelers into a fractious crowd.",
      "The nursery teacher possessed an admirable gift for calming even the most fractious toddlers."
    ]
  },
  {
    word: "garrulous",
    phonetic: "/ˈɡær.ə.ləs/",
    pos: "adjective",
    definitions: [
      "Excessively talkative, especially on trivial matters.",
      "Rambling or wordy in conversation."
    ],
    synonyms: ["talkative", "loquacious", "voluble", "verbose", "chatty"],
    antonyms: ["taciturn", "laconic", "reticent", "concise"],
    examples: [
      "The garrulous cab driver shared anecdotes about every bridge, bakery, and corner in the metropolis.",
      "Known for his garrulous nature, the professor frequently ran past the seminar's allotted ninety minutes.",
      "A quiet train carriage provided welcome refuge from the garrulous commuters seated across the aisle."
    ]
  },
  {
    word: "germane",
    phonetic: "/dʒɜːˈmeɪn/",
    pos: "adjective",
    definitions: [
      "Relevant to a subject under consideration.",
      "Fitting, appropriate, or bearing directly on the matter at hand."
    ],
    synonyms: ["relevant", "pertinent", "applicable", "apposite", "material"],
    antonyms: ["irrelevant", "extraneous", "immaterial", "inapplicable"],
    examples: [
      "The judge instructed the defense counsel to limit their questioning to facts germane to the indictment.",
      "She raised several points that were directly germane to the ongoing budget reconciliation talks.",
      "While fascinating from a historical standpoint, his detour was hardly germane to today's medical decision."
    ]
  },
  {
    word: "grandiloquent",
    phonetic: "/ɡrænˈdɪl.ə.kwənt/",
    pos: "adjective",
    definitions: [
      "Pompous or extravagant in language, style, or manner, especially in a way that is intended to impress.",
      "Speaking in a lofty, elevated, but bombastic manner."
    ],
    synonyms: ["pompous", "bombastic", "magniloquent", "lofty", "pretentious"],
    antonyms: ["unpretentious", "plainspoken", "modest", "concise"],
    examples: [
      "The keynote speaker's grandiloquent rhetoric could not hide the thinness of his economic proposals.",
      "Rather than using simple words, the young writer favored grandiloquent phrases that confused readers.",
      "Beneath the grandiloquent titles and ornate crests, the empire's treasury was completely empty."
    ]
  },
  {
    word: "gregarious",
    phonetic: "/ɡrɪˈɡɛər.i.əs/",
    pos: "adjective",
    definitions: [
      "Fond of company; sociable.",
      "Living in herds, flocks, or social communities."
    ],
    synonyms: ["sociable", "companionable", "outgoing", "convivial", "affable"],
    antonyms: ["solitary", "introverted", "unsociable", "reclusive"],
    examples: [
      "As a naturally gregarious host, he delighted in bringing eclectic groups of artists together for dinner.",
      "Dolphins are famously gregarious marine mammals, collaborating in pods to hunt schools of fish.",
      "Her gregarious charm helped her bridge political divides and build lasting legislative coalitions."
    ]
  },
  {
    word: "hackneyed",
    phonetic: "/ˈhæk.nid/",
    pos: "adjective",
    definitions: [
      "Lacking significance through having been overused; unoriginal and trite.",
      "Stale or cliché through repetitive employment."
    ],
    synonyms: ["clichéd", "trite", "banal", "platitudinous", "stale"],
    antonyms: ["original", "fresh", "novel", "innovative"],
    examples: [
      "The screenplay relied on hackneyed tropes of rebellious detectives and brooding mentors.",
      "Avoid hackneyed idioms in formal academic essays; strive instead for precise and original phrasing.",
      "What sounded fresh fifty years ago has since hardened into a hackneyed marketing slogan."
    ]
  },
  {
    word: "harangue",
    phonetic: "/həˈræŋ/",
    pos: "noun",
    definitions: [
      "A lengthy and aggressive speech.",
      "A loud, vehement, or impassioned verbal tirade."
    ],
    synonyms: ["tirade", "diatribe", "screed", "lecture", "polemic"],
    antonyms: ["whisper", "praise", "encomium", "panegyric"],
    examples: [
      "The coach subjected the team to a furious halftime harangue after a sloppy defensive display.",
      "Instead of conducting an open dialogue, the director launched into a forty-minute harangue.",
      "Shoppers walked quickly past the street preacher, eager to escape his loud, apocalyptic harangue."
    ]
  },
  {
    word: "hedonism",
    phonetic: "/ˈhiː.dən.ɪ.zəm/",
    pos: "noun",
    definitions: [
      "The pursuit of pleasure and self-indulgence as the primary goal of life.",
      "An ethical doctrine holding that sensual satisfaction is the highest good."
    ],
    synonyms: ["epicureanism", "self-indulgence", "sensualism", "voluptuousness"],
    antonyms: ["asceticism", "self-denial", "austerity", "temperance"],
    examples: [
      "The novel captures the breathless hedonism of the roaring twenties along the glittering French Riviera.",
      "Ancient Stoics cautioned that unchecked hedonism ultimately leads to boredom, anxiety, and spiritual decay.",
      "His youth had been dedicated to hedonism, but later in life he turned to rigorous philanthropic discipline."
    ]
  },
  {
    word: "hegemony",
    phonetic: "/hɪˈdʒɛm.ə.ni/",
    pos: "noun",
    definitions: [
      "Leadership or dominance, especially by one state or social group over others.",
      "Preponderant geopolitical or cultural authority."
    ],
    synonyms: ["dominance", "supremacy", "ascendancy", "mastery", "paramountcy"],
    antonyms: ["subjugation", "subservience", "marginality", "vassalage"],
    examples: [
      "The treaty of 1815 was designed to prevent any single superpower from establishing continental hegemony in Europe.",
      "American cinema enjoyed cultural hegemony across global entertainment markets for much of the twentieth century.",
      "Emerging economic powerhouses sought to challenge the traditional financial hegemony of western capitals."
    ]
  },
  {
    word: "hubris",
    phonetic: "/ˈhjuː.brɪs/",
    pos: "noun",
    definitions: [
      "Excessive pride or self-confidence; arrogance.",
      "In Greek drama, presumptuous pride toward the gods that leads to downfall."
    ],
    synonyms: ["arrogance", "conceit", "haughtiness", "presumption", "vanity"],
    antonyms: ["humility", "modesty", "diffidence", "meekness"],
    examples: [
      "Tragic heroes like Oedipus and Icarus were undone by their fatal hubris in defying fate.",
      "Financial analysts warned that corporate hubris led tech executives to overexpand during boom years.",
      "His hubris in assuming he was irreplaceable alienated both the board and his executive deputies."
    ]
  },
  {
    word: "iconoclast",
    phonetic: "/aɪˈkɒn.ə.klæst/",
    pos: "noun",
    definitions: [
      "A person who attacks or criticizes cherished beliefs or institutions.",
      "A destroyer of images used in religious worship."
    ],
    synonyms: ["critic", "skeptic", "heretic", "dissident", "rebel"],
    antonyms: ["traditionalist", "conformist", "orthodox", "devotee"],
    examples: [
      "As an intellectual iconoclast, she challenged the sacred cows of twentieth-century macroeconomics.",
      "Steve Jobs was widely regarded as an iconoclast whose vision dismantled established tech hierarchies.",
      "The exhibition celebrated seventeenth-century iconoclasts who dared to question aristocratic privilege."
    ]
  },
  {
    word: "idiosyncrasy",
    phonetic: "/ˌɪd.i.əˈsɪŋ.krə.si/",
    pos: "noun",
    definitions: [
      "A mode of behavior or way of thought peculiar to an individual.",
      "A distinctive or peculiar characteristic of a person or thing."
    ],
    synonyms: ["eccentricity", "quirk", "mannerism", "peculiarity", "trait"],
    antonyms: ["conformity", "normality", "standard", "universality"],
    examples: [
      "Writing exclusively with green ink from antique fountain pens was one of the professor's harmless idiosyncrasies.",
      "Every vintage automobile has its own mechanical idiosyncrasies that only its owner understands.",
      "Her gentle idiosyncrasies endeared her to generations of graduate students."
    ]
  },
  {
    word: "ignominious",
    phonetic: "/ˌɪɡ.nəˈmɪn.i.əs/",
    pos: "adjective",
    definitions: [
      "Deserving or causing public disgrace or shame; humiliating.",
      "Marked by ignominy or utter dishonor."
    ],
    synonyms: ["humiliating", "shameful", "disgraceful", "dishonorable", "ignoble"],
    antonyms: ["glorious", "honorable", "triumphant", "laudable"],
    examples: [
      "The defending champions suffered an ignominious defeat, crashing out in the opening qualifying round.",
      "He resigned in ignominious disgrace after journalists exposed his secret offshore bank accounts.",
      "The project met an ignominious end when funding was halted due to widespread structural flaws."
    ]
  },
  {
    word: "impecunious",
    phonetic: "/ˌɪm.pɪˈkjuː.ni.əs/",
    pos: "adjective",
    definitions: [
      "Having little or no money; penniless.",
      "Habitually destitute or impoverished."
    ],
    synonyms: ["penniless", "poor", "destitute", "indigent", "insolvent"],
    antonyms: ["wealthy", "affluent", "rich", "opulent"],
    examples: [
      "During his early years as an impecunious artist in Paris, he traded sketches for stale bread and soup.",
      "The charity was founded specifically to provide scholarships for impecunious scholars from rural districts.",
      "Despite his impecunious circumstances, he maintained an impeccably dignified bearing."
    ]
  },
  {
    word: "imperious",
    phonetic: "/ɪmˈpɪər.i.əs/",
    pos: "adjective",
    definitions: [
      "Assuming power or authority without justification; arrogant and domineering.",
      "Commanding or urgent in tone."
    ],
    synonyms: ["domineering", "overbearing", "authoritarian", "haughty", "autocratic"],
    antonyms: ["humble", "submissive", "meek", "deferential"],
    examples: [
      "She made her demands with an imperious wave of her hand that tolerated no hesitation.",
      "His imperious management style triggered high turnover among talented junior engineers.",
      "The conductor raised his baton, casting an imperious glance across the woodwinds for absolute silence."
    ]
  },
  {
    word: "impervious",
    phonetic: "/ɪmˈpɜː.vi.əs/",
    pos: "adjective",
    definitions: [
      "Not allowing fluid to pass through.",
      "Unable to be affected by; immune to."
    ],
    synonyms: ["impermeable", "impenetrable", "immune", "resistant", "invulnerable"],
    antonyms: ["permeable", "vulnerable", "susceptible", "receptive"],
    examples: [
      "The mountaineering jacket is made from a breathable fabric that is completely impervious to torrential rain.",
      "He seemed remarkably impervious to public criticism, continuing his artistic experiments undeterred.",
      "A seasoned diplomat remains impervious to personal insults during tense bilateral negotiations."
    ]
  },
  {
    word: "impetuous",
    phonetic: "/ɪmˈpɛtʃ.u.əs/",
    pos: "adjective",
    definitions: [
      "Acting or done quickly and without thought or care; rash.",
      "Moving forcefully or rapidly."
    ],
    synonyms: ["impulsive", "rash", "hasty", "reckless", "headlong"],
    antonyms: ["deliberate", "circumspect", "cautious", "considered"],
    examples: [
      "Her impetuous decision to resign in the middle of a meeting surprised everyone in the boardroom.",
      "Youthful zeal often tempts young adventurers into making impetuous decisions in the mountains.",
      "He later regretted his impetuous spending spree on sports cars and designer watches."
    ]
  },
  {
    word: "implacable",
    phonetic: "/ɪmˈplæk.ə.bəl/",
    pos: "adjective",
    definitions: [
      "Unable to be placated or appeased; relentless.",
      "Unforgiving and unyielding in hostility."
    ],
    synonyms: ["unappeasable", "relentless", "unforgiving", "inexorable", "inflexible"],
    antonyms: ["appeasable", "forgiving", "placable", "conciliatory"],
    examples: [
      "The detective pursued the fugitive with implacable resolve across three continents.",
      "Centuries-old tribal rivalries had fostered an implacable hatred between neighboring mountain clans.",
      "Faced with implacable opposition from the senate, the bill had virtually no path to passage."
    ]
  },
  {
    word: "impudent",
    phonetic: "/ˈɪm.pjʊ.dənt/",
    pos: "adjective",
    definitions: [
      "Not showing due respect for another person; insolently disrespectful.",
      "Marked by cocky boldness or disregard of others."
    ],
    synonyms: ["impertinent", "insolent", "cheeky", "brazen", "audacious"],
    antonyms: ["polite", "respectful", "deferential", "mannerly"],
    examples: [
      "The headmaster reprimanded the student for giving an impudent reply when asked about his tardiness.",
      "Few people had the impudent courage to challenge the formidable general in front of his troops.",
      "Her impudent laughter broke the somber hush of the academic ceremony."
    ]
  },
  {
    word: "inchoate",
    phonetic: "/ɪnˈkoʊ.ət/",
    pos: "adjective",
    definitions: [
      "Just begun and so not fully formed or developed; rudimentary.",
      "In an early, unorganized, or chaotic stage."
    ],
    synonyms: ["rudimentary", "nascent", "embryonic", "unformed", "undeveloped"],
    antonyms: ["mature", "developed", "crystallized", "complete"],
    examples: [
      "Her inchoate ideas for a philosophical novel were scribbled across dozens of coffeehouse napkins.",
      "The revolution was still in an inchoate phase, lacking unified leadership and clear structural goals.",
      "He struggled to put his inchoate feelings of grief and gratitude into coherent spoken words."
    ]
  },
  {
    word: "incisive",
    phonetic: "/ɪnˈsaɪ.sɪv/",
    pos: "adjective",
    definitions: [
      "Intelligently analytical and clear-thinking; cutting to the heart of the matter.",
      "Sharply focused and penetrating."
    ],
    synonyms: ["penetrating", "acute", "sharp", "astute", "trenchant"],
    antonyms: ["vague", "dull", "obtuse", "rambling"],
    examples: [
      "The journalist asked incisive questions that cut directly through the administration's rehearsed talking points.",
      "Her incisive critique of the proposed tax framework forced lawmakers to reconsider key deductions.",
      "A successful surgeon combines incisive diagnostic judgment with steady, meticulous manual skill."
    ]
  },
  {
    word: "indefatigable",
    phonetic: "/ˌɪn.dɪˈfæt.ɪ.ɡə.bəl/",
    pos: "adjective",
    definitions: [
      "Persisting tirelessly; incapable of being fatigued.",
      "Untiring in effort or energy."
    ],
    synonyms: ["tireless", "untiring", "unflagging", "unwearied", "assiduous"],
    antonyms: ["lazy", "indolent", "fatigued", "lethargic"],
    examples: [
      "Thanks to the indefatigable efforts of humanitarian volunteers, aid reached the stranded villagers in time.",
      "She was an indefatigable campaigner for equal voting rights, giving hundreds of speeches a year.",
      "Even well into his eighties, the historian remained an indefatigable researcher in national archives."
    ]
  },
  {
    word: "indolent",
    phonetic: "/ˈɪn.də.lənt/",
    pos: "adjective",
    definitions: [
      "Wanting to avoid activity or exertion; lazy.",
      "Causing little or no pain; slow to heal or develop."
    ],
    synonyms: ["lazy", "idle", "slothful", "lethargic", "inactive"],
    antonyms: ["industrious", "energetic", "diligent", "active"],
    examples: [
      "They spent an indolent summer afternoon lounging by the lake, reading mystery novels under the willows.",
      "His indolent approach to homework meant that he was always cramming at the last minute before exams.",
      "Certain tropical conditions induce an indolent lifestyle among travelers unused to equatorial humidity."
    ]
  },
  {
    word: "ineffable",
    phonetic: "/ɪnˈɛf.ə.bəl/",
    pos: "adjective",
    definitions: [
      "Too great or extreme to be expressed or described in words.",
      "Not to be uttered due to its sacredness."
    ],
    synonyms: ["indescribable", "inexpressible", "unutterable", "transcendent", "unspeakable"],
    antonyms: ["definable", "describable", "ordinary", "expressible"],
    examples: [
      "Gazing up at the milky way from the desert floor, she felt an ineffable sense of wonder and humility.",
      "The birth of their first child brought an ineffable joy that defied every spoken description.",
      "Mystics often describe communion with the divine as an ineffable experience beyond human vocabulary."
    ]
  },
  {
    word: "ineluctable",
    phonetic: "/ˌɪn.ɪˈlʌk.tə.bəl/",
    pos: "adjective",
    definitions: [
      "Unable to be resisted or avoided; inescapable.",
      "Inevitably bound to occur."
    ],
    synonyms: ["inescapable", "inevitable", "unavoidable", "unpreventable", "fatal"],
    antonyms: ["avoidable", "preventable", "evadable", "uncertain"],
    examples: [
      "Greek tragedians portrayed fate as an ineluctable force against which human ambition struggles in vain.",
      "Aging is an ineluctable biological reality that wisdom teaches us to accept with grace.",
      "The ineluctable rise of digital automation transformed factory employment across the continent."
    ]
  },
  {
    word: "inexorable",
    phonetic: "/ɪnˈɛk.sər.ə.bəl/",
    pos: "adjective",
    definitions: [
      "Impossible to stop or prevent; relentlessly unyielding.",
      "Not to be persuaded, moved, or stopped."
    ],
    synonyms: ["relentless", "unstoppable", "unavoidable", "inevitable", "implacable"],
    antonyms: ["flexible", "lenient", "yielding", "preventable"],
    examples: [
      "The inexorable march of technological progress has transformed every corner of human society.",
      "Despite all diplomatic pleas, the invading armada advanced with inexorable precision.",
      "Climate scientists documented the inexorable retreat of alpine glaciers over the past half-century."
    ]
  },
  {
    word: "ingenuous",
    phonetic: "/ɪnˈdʒɛn.ju.əs/",
    pos: "adjective",
    definitions: [
      "Innocent and unsuspecting; naive; unsophisticated.",
      "Candid, sincere, and free from deceit."
    ],
    synonyms: ["naive", "innocent", "artless", "candid", "trusting"],
    antonyms: ["disingenuous", "cynical", "guileful", "sophisticated"],
    examples: [
      "His ingenuous smile and open honesty immediately disarmed even the most skeptical interviewers.",
      "It was ingenuous of her to believe that political candidates always honor their campaign rhetoric.",
      "The child's ingenuous questions about the universe prompted smiles from everyone at the table."
    ]
  },
  {
    word: "inimical",
    phonetic: "/ɪˈnɪm.ɪ.kəl/",
    pos: "adjective",
    definitions: [
      "Tending to obstruct or harm; hostile; unfavorable.",
      "Having the disposition of an enemy."
    ],
    synonyms: ["harmful", "detrimental", "hostile", "antagonistic", "adverse"],
    antonyms: ["friendly", "hospitable", "beneficial", "salutary"],
    examples: [
      "Excessive bureaucracy is inherently inimical to entrepreneurship and nimble innovation.",
      "The harsh desert salt flats created an environment completely inimical to plant and animal life.",
      "Censorship and political intimidation are fundamentally inimical to a flourishing creative society."
    ]
  },
  {
    word: "innocuous",
    phonetic: "/ɪˈnɑː.kjuː.əs/",
    pos: "adjective",
    definitions: [
      "Not harmful or offensive; harmless.",
      "Producing no ill effect."
    ],
    synonyms: ["harmless", "inoffensive", "safe", "nontoxic", "benign"],
    antonyms: ["harmful", "noxious", "toxic", "dangerous"],
    examples: [
      "What began as an innocuous dispute over a property line escalated into a decades-long legal war.",
      "The garden snake was completely innocuous, feeding only on slugs and backyard beetles.",
      "His innocuous question about her vacation plans was unexpectedly met with defensive silence."
    ]
  },
  {
    word: "inscrutable",
    phonetic: "/ɪnˈskruː.tə.bəl/",
    pos: "adjective",
    definitions: [
      "Impossible to understand or interpret; mysterious.",
      "Impenetrable to scrutiny or analysis."
    ],
    synonyms: ["enigmatic", "unfathomable", "mysterious", "cryptic", "impenetrable"],
    antonyms: ["transparent", "readable", "obvious", "comprehensible"],
    examples: [
      "The diplomat maintained an inscrutable poker face while rival envoys laid out their final offer.",
      "Ancient hieroglyphs remained completely inscrutable until the discovery of the Rosetta Stone.",
      "Behind his quiet, inscrutable gaze lay decades of high-stakes intelligence experience."
    ]
  },
  {
    word: "insidious",
    phonetic: "/ɪnˈsɪd.i.əs/",
    pos: "adjective",
    definitions: [
      "Proceeding in a gradual, subtle way, but with harmful effects.",
      "Treacherous, crafty, or enticing."
    ],
    synonyms: ["stealthy", "subtle", "surreptitious", "cunning", "treacherous"],
    antonyms: ["straightforward", "harmless", "overt", "benign"],
    examples: [
      "High blood pressure is an insidious condition that often produces zero noticeable symptoms until damage occurs.",
      "The insidious spread of misinformation across social media undermined public faith in scientific consensus.",
      "Corruption in the police department was insidious, beginning with petty bribes before poisoning leadership."
    ]
  },
  {
    word: "insipid",
    phonetic: "/ɪnˈsɪp.ɪd/",
    pos: "adjective",
    definitions: [
      "Lacking flavor; weak or tasteless.",
      "Lacking vigor, interest, or stimulation; dull."
    ],
    synonyms: ["tasteless", "flavorless", "bland", "dull", "vapid"],
    antonyms: ["flavorful", "piquant", "exciting", "stimulating"],
    examples: [
      "The hospital broth was lukewarm and insipid, devoid of salt, herbs, or any culinary seasoning.",
      "Critics dismissed the summer blockbuster as an insipid romantic comedy with zero emotional depth.",
      "He found the small talk at the cocktail party insipid and slipped away to the veranda to read."
    ]
  },
  {
    word: "insolent",
    phonetic: "/ˈɪn.sə.lənt/",
    pos: "adjective",
    definitions: [
      "Showing a rude and arrogant lack of respect.",
      "Insultingly contemptuous in conduct or speech."
    ],
    synonyms: ["impertinent", "impudent", "cheeky", "brazen", "disrespectful"],
    antonyms: ["polite", "respectful", "deferential", "courteous"],
    examples: [
      "The magistrate held the defendant in contempt for his repeatedly insolent remarks during the sentencing hearing.",
      "Her insolent behavior toward senior colleagues jeopardized what had been a promising consulting career.",
      "He dismissed the waiter with an insolent snap of his fingers that drew disapproving glances from nearby patrons."
    ]
  },
  {
    word: "insouciant",
    phonetic: "/ɪnˈsuː.si.ənt/",
    pos: "adjective",
    definitions: [
      "Showing a casual lack of concern; indifferent; carefree.",
      "Blithely unconcerned or nonchalant."
    ],
    synonyms: ["nonchalant", "untroubled", "carefree", "unconcerned", "breezy"],
    antonyms: ["anxious", "worried", "concerned", "fretful"],
    examples: [
      "He sauntered into the interview with an insouciant shrug that seemed almost brazen for a junior applicant.",
      "Despite the looming deadline, the lead designer maintained an insouciant calm that reassured his team.",
      "Her insouciant attitude toward personal finances finally caught up with her when credit lines were frozen."
    ]
  },
  {
    word: "intransigent",
    phonetic: "/ɪnˈtræn.sɪ.dʒənt/",
    pos: "adjective",
    definitions: [
      "Unwilling or refusing to change one's views or to agree about something.",
      "Characterized by refusal to compromise."
    ],
    synonyms: ["uncompromising", "inflexible", "unyielding", "obstinate", "stubborn"],
    antonyms: ["flexible", "compliant", "tractable", "accommodating"],
    examples: [
      "Both labor union leaders and corporate management took intransigent positions, dragging the strike into its second month.",
      "An intransigent refusal to acknowledge budgetary realities pushed the municipal council toward fiscal ruin.",
      "Mediators urged both warring factions to abandon their intransigent rhetoric and seek common ground."
    ]
  },
  {
    word: "invective",
    phonetic: "/ɪnˈvɛk.tɪv/",
    pos: "noun",
    definitions: [
      "Insulting, abusive, or highly critical language.",
      "Vehement verbal denunciation or attack."
    ],
    synonyms: ["abuse", "insults", "vituperation", "revilement", "vilification"],
    antonyms: ["praise", "compliment", "adulation", "encomium"],
    examples: [
      "The debate deteriorated from reasoned ideological discourse into a barrage of personal invective.",
      "Online commentators hurled bitter invective at the referee after the contentious penalty decision.",
      "He bore the furious invective of his opponents with stoic silence and unwavering dignity."
    ]
  },
  {
    word: "inveterate",
    phonetic: "/ɪnˈvɛt.ər.ət/",
    pos: "adjective",
    definitions: [
      "Having a particular habit, activity, or interest that is long-established and unlikely to change.",
      "Deep-seated or firmly established by long persistence."
    ],
    synonyms: ["ingrained", "deep-seated", "chronic", "habitual", "hardened"],
    antonyms: ["nascent", "occasional", "transient", "reformed"],
    examples: [
      "As an inveterate traveler, she felt an unbearable restlessness whenever she spent two months in one city.",
      "He was an inveterate skeptic who refused to accept scientific claims without reviewing raw data tables.",
      "Years of successful operations had turned him into an inveterate optimist regarding technological solutions."
    ]
  },
  {
    word: "irascible",
    phonetic: "/ɪˈræs.ə.bəl/",
    pos: "adjective",
    definitions: [
      "Having or showing a tendency to be easily angered.",
      "Hot-tempered and quick to take offense."
    ],
    synonyms: ["quick-tempered", "short-tempered", "irritable", "peevish", "choleric"],
    antonyms: ["mild", "placid", "even-tempered", "forbearing"],
    examples: [
      "The irascible old conductor would snap his baton in frustration whenever the flutes missed their cue.",
      "Colleagues learned to tiptoe around the CEO on Monday mornings, aware of his irascible temperament.",
      "His irascible outbursts alienated several loyal friends who had supported him during difficult seasons."
    ]
  },
  {
    word: "juxtapose",
    phonetic: "/ˌdʒʌk.stəˈpoʊz/",
    pos: "verb",
    definitions: [
      "To place or deal with close together for contrasting effect.",
      "To set side by side in order to highlight differences or similarities."
    ],
    synonyms: ["contrast", "compare", "collocate", "set alongside", "align"],
    antonyms: ["isolate", "separate", "disconnect", "dissociate"],
    examples: [
      "The photographer loved to juxtapose ancient gothic cathedrals against soaring steel and glass skyscrapers.",
      "In her essay, she chose to juxtapose classical stoic philosophy with contemporary existentialist theory.",
      "The documentary effectively juxtaposes opulent luxury galas with the harsh reality of nearby homeless shelters."
    ]
  },
  {
    word: "laconic",
    phonetic: "/ləˈkɒn.ɪk/",
    pos: "adjective",
    definitions: [
      "Using very few words; concise to the point of seeming rude or mysterious.",
      "Brief and pithy in expression."
    ],
    synonyms: ["brief", "concise", "terse", "succinct", "pithy"],
    antonyms: ["verbose", "loquacious", "voluble", "wordy"],
    examples: [
      "His laconic reply of 'Perhaps' left the journalists with more questions than answers.",
      "Spartans were celebrated throughout ancient Greece for their laconic wit and fearless military discipline.",
      "Known for his laconic style, the author never used three paragraphs where a single sentence would suffice."
    ]
  },
  {
    word: "largesse",
    phonetic: "/lɑːˈʒɛs/",
    pos: "noun",
    definitions: [
      "Generosity in bestowing money or gifts upon others.",
      "Money or gifts given generously, especially by a wealthy patron."
    ],
    synonyms: ["generosity", "liberality", "munificence", "bounty", "altruism"],
    antonyms: ["meanness", "parsimony", "stinginess", "miserliness"],
    examples: [
      "The new wing of the university medical center was made possible by the extraordinary largesse of an anonymous alumna.",
      "Medieval kings distributed largesse to common citizens during royal coronation processions.",
      "Artists and poets relied heavily upon the enlightened largesse of aristocratic Renaissance patrons."
    ]
  },
  {
    word: "licentious",
    phonetic: "/laɪˈsɛn.ʃəs/",
    pos: "adjective",
    definitions: [
      "Promiscuous and unprincipled in sexual matters; lacking legal or moral restraint.",
      "Disregarding accepted rules, conventions, or standards."
    ],
    synonyms: ["dissolute", "debauched", "immoral", "wanton", "lascivious"],
    antonyms: ["moral", "virtuous", "chaste", "austere"],
    examples: [
      "Moralists condemned the decadent court for its licentious revels and disregard for public decency.",
      "The novel shocked conservative readers in 1890 with its frank portrayal of a licentious aristocracy.",
      "He abandoned his licentious youth to dedicate his remaining years to monastic quietude and reflection."
    ]
  },
  {
    word: "limpid",
    phonetic: "/ˈlɪm.pɪd/",
    pos: "adjective",
    definitions: [
      "Completely clear and transparent.",
      "Clear, accessible, and easily understood (of speech, writing, or music)."
    ],
    synonyms: ["clear", "transparent", "lucid", "crystalline", "pellucid"],
    antonyms: ["turbid", "opaque", "cloudy", "muddy"],
    examples: [
      "They could see schools of trout swimming thirty feet below the surface of the limpid alpine lake.",
      "Her limpid prose made the most complex principles of quantum computing accessible to high schoolers.",
      "The sonata ended with a series of limpid piano arpeggios that shimmered like evening rainwater."
    ]
  },
  {
    word: "loquacious",
    phonetic: "/loʊˈkweɪ.ʃəs/",
    pos: "adjective",
    definitions: [
      "Tending to talk a great deal; talkative.",
      "Full of excessive conversation."
    ],
    synonyms: ["talkative", "voluble", "garrulous", "chatty", "communicative"],
    antonyms: ["reticent", "taciturn", "laconic", "quiet"],
    examples: [
      "The loquacious host kept guests entertained with hilarious anecdotes about his adventures in Patagonia.",
      "She was uncharacteristically loquacious during the interview, speaking candidly about past political mistakes.",
      "A loquacious seatmate on an eight-hour flight can test the patience of even the most polite traveler."
    ]
  },
  {
    word: "lucid",
    phonetic: "/ˈluː.sɪd/",
    pos: "adjective",
    definitions: [
      "Expressed clearly; easy to understand.",
      "Bright or luminous; having full use of one's faculties."
    ],
    synonyms: ["clear", "comprehensible", "intelligible", "rational", "limpid"],
    antonyms: ["confusing", "obscure", "delirious", "opaque"],
    examples: [
      "The physicist delivered a remarkably lucid explanation of relativity that captivated the undergraduate audience.",
      "In her rare lucid moments, the elderly patient recognized her grandchildren and shared childhood memories.",
      "The blueprint provided lucid step-by-step instructions that made assembly straightforward."
    ]
  },
  {
    word: "lugubrious",
    phonetic: "/luːˈɡuː.bri.əs/",
    pos: "adjective",
    definitions: [
      "Looking or sounding sad and dismal.",
      "Mournful or gloomy, especially in an exaggerated manner."
    ],
    synonyms: ["mournful", "gloomy", "melancholy", "doleful", "somber"],
    antonyms: ["cheerful", "ebullient", "buoyant", "joyful"],
    examples: [
      "The church bells tolled a lugubrious cadence as the funeral cortege wound its way up the mist-covered hill.",
      "His lugubrious predictions of economic apocalypse proved overblown when retail figures bounced back.",
      "The play was criticized for its unrelentingly lugubrious tone, which offered no moments of levity."
    ]
  },
  {
    word: "magnanimous",
    phonetic: "/mæɡˈnæn.ɪ.məs/",
    pos: "adjective",
    definitions: [
      "Generous or forgiving, especially toward a rival or less powerful person.",
      "Exhibiting noble generosity of spirit."
    ],
    synonyms: ["generous", "charitable", "benevolent", "forgiving", "noble"],
    antonyms: ["petty", "vindictive", "spiteful", "ungenerous"],
    examples: [
      "In a magnanimous victory speech, the newly elected president praised his opponent's long years of public service.",
      "It was magnanimous of her to share the lucrative patent rights with the junior researchers who had gathered data.",
      "A truly magnanimous leader does not gloat in triumph or seek retribution against fallen rivals."
    ]
  },
  {
    word: "maladroit",
    phonetic: "/ˌmæl.əˈdrɔɪt/",
    pos: "adjective",
    definitions: [
      "Inefficient or inept; clumsy.",
      "Lacking dexterity, tact, or grace."
    ],
    synonyms: ["clumsy", "inept", "awkward", "bungling", "tactless"],
    antonyms: ["adroit", "skillful", "dexterous", "tactful"],
    examples: [
      "His maladroit handling of the diplomatic crisis alienated key allies in the region.",
      "A series of maladroit public statements undermined the candidate's once-commanding lead in the polls.",
      "The waiter was so maladroit that he managed to spill soup on two separate patrons in the same evening."
    ]
  },
  {
    word: "malevolent",
    phonetic: "/məˈlɛv.əl.ənt/",
    pos: "adjective",
    definitions: [
      "Having or showing a wish to do evil to others.",
      "Arising from intense, spiteful ill will."
    ],
    synonyms: ["malicious", "spiteful", "hostile", "evil-minded", "baleful"],
    antonyms: ["benevolent", "kind", "charitable", "friendly"],
    examples: [
      "Behind his pleasant demeanor lurked a malevolent scheme to bankrupt his business partner.",
      "Folklore warned villagers that a malevolent spirit haunted the deep woods beyond the old mill.",
      "The cyberterrorist unleashed malevolent software designed to disable hospital backup power generators."
    ]
  },
  {
    word: "malleable",
    phonetic: "/ˈmæl.i.ə.bəl/",
    pos: "adjective",
    definitions: [
      "Able to be hammered or pressed permanently out of shape without breaking or cracking.",
      "Easily influenced; pliable."
    ],
    synonyms: ["pliable", "ductile", "adaptable", "tractable", "impressionable"],
    antonyms: ["rigid", "inflexible", "brittle", "intractable"],
    examples: [
      "Gold is an exceptionally malleable metal, capable of being beaten into sheets a fraction of a micron thick.",
      "Young minds are remarkably malleable, absorbing values and habits from mentors during their formative years.",
      "The political coalition proved malleable, adjusting its platform to suit changing polling trends."
    ]
  },
  {
    word: "maverick",
    phonetic: "/ˈmæv.ər.ɪk/",
    pos: "noun",
    definitions: [
      "An unorthodox or independent-minded person.",
      "An unbranded range animal; someone who refuses to conform."
    ],
    synonyms: ["individualist", "nonconformist", "free spirit", "unorthodox", "dissident"],
    antonyms: ["conformist", "traditionalist", "orthodox", "follower"],
    examples: [
      "The maverick scientist challenged consensus theories on dark matter, publishing his findings independently.",
      "Hollywood directors viewed him as an unpredictable maverick who refused to follow studio notes.",
      "As a political maverick, she regularly voted against her own party when conscience dictated."
    ]
  },
  {
    word: "mendacious",
    phonetic: "/mɛnˈdeɪ.ʃəs/",
    pos: "adjective",
    definitions: [
      "Not telling the truth; lying.",
      "Characterized by deceit or falsehood."
    ],
    synonyms: ["lying", "untruthful", "dishonest", "deceitful", "fallacious"],
    antonyms: ["truthful", "honest", "veracious", "candid"],
    examples: [
      "The prosecution produced documentary proof refuting the defendant's mendacious claims of innocence.",
      "Tabloid headlines frequently peddle mendacious gossip about public figures to drive advertising clicks.",
      "His mendacious testimony under oath ultimately resulted in perjury charges."
    ]
  },
  {
    word: "mercurial",
    phonetic: "/mɜːˈkjʊər.i.əl/",
    pos: "adjective",
    definitions: [
      "Subject to sudden or unpredictable changes of mood or mind.",
      "Lively, volatile, and animated."
    ],
    synonyms: ["volatile", "capricious", "temperamental", "fickle", "erratic"],
    antonyms: ["stable", "steady", "constant", "predictable"],
    examples: [
      "Working for a director with such a mercurial temperament kept the film crew perpetually on edge.",
      "The stock market showed its mercurial nature, swinging from record highs to sharp drops within an hour.",
      "Her mercurial wit made her dinner parties lively, unpredictable, and endlessly fascinating."
    ]
  },
  {
    word: "meticulous",
    phonetic: "/məˈtɪk.jʊ.ləs/",
    pos: "adjective",
    definitions: [
      "Showing great attention to detail; very careful and precise.",
      "Painstakingly scrupulous in execution."
    ],
    synonyms: ["painstaking", "scrupulous", "thorough", "exacting", "perfectionist"],
    antonyms: ["careless", "sloppy", "slapdash", "negligent"],
    examples: [
      "The art restorer employed meticulous brushwork to stabilize the flaking sixteenth-century canvas.",
      "Thanks to her meticulous record-keeping, the forensic accountant uncovered the embezzlement trail in days.",
      "A meticulous proofreader catches misplaced commas and subtle factual errors that others miss."
    ]
  },
  {
    word: "mitigate",
    phonetic: "/ˈmɪt.ɪ.ɡeɪt/",
    pos: "verb",
    definitions: [
      "To make less severe, serious, or painful.",
      "To lessen the gravity of an offense or mistake."
    ],
    synonyms: ["alleviate", "reduce", "diminish", "lessen", "soften"],
    antonyms: ["aggravate", "worsen", "exacerbate", "intensify"],
    examples: [
      "Planting mangrove forests along coastlines helps mitigate storm surges and prevent beach erosion.",
      "The defense lawyer argued that his client's troubled upbringing should mitigate the severity of the sentence.",
      "Proper ergonomic seating can significantly mitigate lower back pain for office workers."
    ]
  },
  {
    word: "modicum",
    phonetic: "/ˈmɒd.ɪ.kəm/",
    pos: "noun",
    definitions: [
      "A small quantity of a particular thing, especially something considered desirable or valuable.",
      "A limited or moderate amount."
    ],
    synonyms: ["particle", "crumb", "iota", "ounce", "fraction"],
    antonyms: ["abundance", "plethora", "surfeit", "glut"],
    examples: [
      "If the diplomats possessed even a modicum of goodwill, a ceasefire could be arranged before nightfall.",
      "He struggled to maintain a modicum of composure as the devastating news was delivered.",
      "Anyone with a modicum of common sense would have checked the car's tire pressure before the road trip."
    ]
  },
  {
    word: "mollify",
    phonetic: "/ˈmɒl.ɪ.faɪ/",
    pos: "verb",
    definitions: [
      "To appease the anger or anxiety of someone.",
      "To soften in feeling or temper; pacify."
    ],
    synonyms: ["appease", "placate", "pacify", "soothe", "conciliate"],
    antonyms: ["enrage", "infuriate", "provoke", "inflame"],
    examples: [
      "The airline offered hotel vouchers and flight upgrades in an effort to mollify stranded passengers.",
      "She spoke in a gentle, reassuring tone to mollify the frightened child after the lightning strike.",
      "The mayor's concessions failed to mollify the protesters, who demanded systemic police reforms."
    ]
  },
  {
    word: "morass",
    phonetic: "/məˈræs/",
    pos: "noun",
    definitions: [
      "An area of muddy or boggy ground.",
      "A complicated or confused situation from which it is difficult to free oneself."
    ],
    synonyms: ["quagmire", "swamp", "bog", "mire", "entanglement"],
    antonyms: ["clarity", "solution", "dry land", "order"],
    examples: [
      "The army found itself bogged down in a legal and logistical morass that delayed the operation for weeks.",
      "Years of patchwork amendments had turned the tax code into an impenetrable bureaucratic morass.",
      "Heavy rains transformed the festival campgrounds into an ankle-deep morass of mud."
    ]
  },
  {
    word: "mordant",
    phonetic: "/ˈmɔː.dənt/",
    pos: "adjective",
    definitions: [
      "Having or showing a sharp or critical quality; biting.",
      "Corrosive or caustic in speech."
    ],
    synonyms: ["caustic", "trenchant", "biting", "sardonic", "acerbic"],
    antonyms: ["sweet", "gentle", "complimentary", "soothing"],
    examples: [
      "The satirist was famous for his mordant wit, sparing neither royalty nor corporate titans in his columns.",
      "She listened to the committee's excuses with a mordant smile that signaled she knew the real truth.",
      "His mordant observations on modern advertising stripped away all its glamorous illusions."
    ]
  },
  {
    word: "morose",
    phonetic: "/məˈroʊs/",
    pos: "adjective",
    definitions: [
      "Sullen and ill-tempered; gloomy.",
      "Marked by gloom, sadness, or surly withdrawal."
    ],
    synonyms: ["sullen", "sulky", "gloomy", "glum", "sour"],
    antonyms: ["cheerful", "ebullient", "optimistic", "jovial"],
    examples: [
      "After the devastating championship defeat, the locker room was filled with morose athletes staring at the floor.",
      "He retreated into a morose silence whenever questions regarding his failed business venture were raised.",
      "The rainy weather only deepened her morose mood as she packed her belongings to leave."
    ]
  },
  {
    word: "multifarious",
    phonetic: "/ˌmʌl.tɪˈfɛər.i.əs/",
    pos: "adjective",
    definitions: [
      "Many and of various types; having great variety and diversity.",
      "Having many varied parts or aspects."
    ],
    synonyms: ["diverse", "varied", "manifold", "multiple", "motley"],
    antonyms: ["homogeneous", "uniform", "monolithic", "identical"],
    examples: [
      "The metropolis owes its cultural vitality to the multifarious traditions of its immigrant communities.",
      "A modern university president must manage multifarious responsibilities ranging from fundraising to campus safety.",
      "Nature displays multifarious survival strategies across the coral reef ecosystem."
    ]
  },
  {
    word: "munificent",
    phonetic: "/mjuːˈnɪf.ɪ.sənt/",
    pos: "adjective",
    definitions: [
      "More generous than is usual or necessary.",
      "Characterized by lavish generosity."
    ],
    synonyms: ["generous", "bountiful", "magnanimous", "lavish", "philanthropic"],
    antonyms: ["stingy", "parsimonious", "miserly", "penurious"],
    examples: [
      "The museum acquired the impressionist masterpieces thanks to a munificent bequest from a local philanthropist.",
      "She was admired for her munificent donations to public libraries and pediatric cancer research.",
      "The community thanked the foundation for its munificent support after the devastating tornado."
    ]
  },
  {
    word: "myopic",
    phonetic: "/maɪˈɒp.ɪk/",
    pos: "adjective",
    definitions: [
      "Nearsighted; lacking imagination, foresight, or intellectual insight.",
      "Narrow-minded or shortsighted."
    ],
    synonyms: ["shortsighted", "nearsighted", "narrow-minded", "insular", "unimaginative"],
    antonyms: ["farsighted", "visionary", "prescient", "broad-minded"],
    examples: [
      "Cutting funding for basic scientific research is a dangerously myopic strategy that hurts future economic growth.",
      "Executives adopted a myopic focus on quarterly stock buybacks at the expense of long-term innovation.",
      "Without glasses, his myopic vision made reading street signs beyond twenty feet impossible."
    ]
  },
  {
    word: "nadir",
    phonetic: "/ˈneɪ.dɪər/",
    pos: "noun",
    definitions: [
      "The lowest point in the fortunes of a person or organization.",
      "The point on the celestial sphere directly below an observer."
    ],
    synonyms: ["lowest point", "bottom", "rock-bottom", "depths", "zero"],
    antonyms: ["zenith", "pinnacle", "acme", "apex"],
    examples: [
      "The defeat at Waterloo marked the political nadir of Napoleon's once-mighty empire.",
      "His career reached its nadir when he was stripped of his medical license following ethical breaches.",
      "The economy hit its nadir in 1932 before gradual recovery programs began to take effect."
    ]
  },
  {
    word: "nascent",
    phonetic: "/ˈnæs.ənt/",
    pos: "adjective",
    definitions: [
      "Just coming into existence and beginning to display signs of future potential.",
      "Developing, emerging, or embryonic."
    ],
    synonyms: ["emerging", "developing", "budding", "embryonic", "incipient"],
    antonyms: ["mature", "dying", "fading", "moribund"],
    examples: [
      "Venture capitalists invested heavily in nascent clean-energy startups specializing in solid-state batteries.",
      "The internet was still in a nascent state in 1991, largely confined to academic and defense networks.",
      "She nurtured his nascent talent for creative writing by encouraging him to submit poems to regional journals."
    ]
  },
  {
    word: "nebulous",
    phonetic: "/ˈnɛb.jʊ.ləs/",
    pos: "adjective",
    definitions: [
      "In the form of a cloud or haze; hazy.",
      "Vague, ill-defined, or indistinct."
    ],
    synonyms: ["vague", "ill-defined", "indistinct", "hazy", "murky"],
    antonyms: ["clear", "distinct", "precise", "well-defined"],
    examples: [
      "His campaign speech was filled with nebulous promises of renewal that avoided any specific policy proposals.",
      "Astronomers pointed the orbital telescope at a nebulous cluster of interstellar gas and dust.",
      "The concept of social prestige remains somewhat nebulous, shifting with cultural fashion and generation."
    ]
  },
  {
    word: "nefarious",
    phonetic: "/nɪˈfɛər.i.əs/",
    pos: "adjective",
    definitions: [
      "Wicked, villainous, or criminal in nature.",
      "Flagrantly violating moral or legal standards."
    ],
    synonyms: ["wicked", "evil", "villainous", "iniquitous", "sinister"],
    antonyms: ["virtuous", "honorable", "noble", "righteous"],
    examples: [
      "The villain in the espionage thriller hatched a nefarious plot to contaminate the city's water supply.",
      "Regulatory investigators uncovered nefarious accounting tricks used to hide massive corporate insolvencies.",
      "History will forever condemn the nefarious experiments conducted in totalitarian prison camps."
    ]
  },
  {
    word: "neophyte",
    phonetic: "/ˈniː.ə.faɪt/",
    pos: "noun",
    definitions: [
      "A person who is new to a subject, skill, or belief.",
      "A new convert to a religion or cause; a novice."
    ],
    synonyms: ["novice", "beginner", "learner", "apprentice", "fledgling"],
    antonyms: ["veteran", "expert", "master", "virtuoso"],
    examples: [
      "Even as a neophyte in stock trading, she demonstrated an intuitive grasp of market sentiment.",
      "The martial arts dojo welcomed neophytes with patient fundamentals before introducing sparring drills.",
      "Senior diplomats guided the political neophyte through the intricacies of bilateral treaty negotiations."
    ]
  },
  {
    word: "nihilism",
    phonetic: "/ˈnaɪ.ɪ.lɪ.zəm/",
    pos: "noun",
    definitions: [
      "The rejection of all religious and moral principles, in the belief that life is meaningless.",
      "An extreme skepticism maintaining that nothing in the world has real existence."
    ],
    synonyms: ["skepticism", "negativity", "cynicism", "pessimism", "disbelief"],
    antonyms: ["faith", "optimism", "idealism", "belief"],
    examples: [
      "Dostoevsky explored the spiritual dangers of political nihilism in his monumental novel 'Demons'.",
      "Confronted with the horrors of the trenches, many post-war artists embraced a bleak philosophical nihilism.",
      "She rejected nihilism, asserting that humans have both the freedom and responsibility to create meaning."
    ]
  },
  {
    word: "noisome",
    phonetic: "/ˈnɔɪ.səm/",
    pos: "adjective",
    definitions: [
      "Having an extremely offensive smell.",
      "Disagreeable, unpleasant, or harmful."
    ],
    synonyms: ["fetid", "malodorous", "foul", "putrid", "noxious"],
    antonyms: ["fragrant", "aromatic", "sweet-smelling", "pleasant"],
    examples: [
      "A noisome odor drifted from the open sewer beneath the dilapidated tenement.",
      "Explorers covered their faces to block the noisome fumes rising from the volcanic sulfur pit.",
      "Decaying algae washed up on the beach during the summer heat, releasing a noisome stench."
    ]
  },
  {
    word: "noxious",
    phonetic: "/ˈnɒk.ʃəs/",
    pos: "adjective",
    definitions: [
      "Harmful, poisonous, or very unpleasant.",
      "Injurious to physical health or moral well-being."
    ],
    synonyms: ["poisonous", "toxic", "harmful", "deadly", "pernicious"],
    antonyms: ["harmless", "safe", "nontoxic", "salubrious"],
    examples: [
      "Hazardous material crews evacuated the building after noxious chemical vapors leaked from the laboratory.",
      "Automobile emissions contribute noxious pollutants that trigger respiratory illnesses in dense urban centers.",
      "The judge condemned the hate group's noxious propaganda as a direct threat to community harmony."
    ]
  },
  {
    word: "nuance",
    phonetic: "/ˈnjuː.ɑːns/",
    pos: "noun",
    definitions: [
      "A subtle difference in or shade of meaning, expression, or sound.",
      "A delicate gradation or subtle distinction."
    ],
    synonyms: ["subtlety", "shade", "gradation", "refinement", "overtone"],
    antonyms: ["bluntness", "crudeness", "obviousness", "generality"],
    examples: [
      "A master translator captures every delicate nuance of the original Japanese poetry in English verse.",
      "Her performance was celebrated for its extraordinary emotional nuance, balancing quiet dignity with heartbreak.",
      "Political soundbites inevitably strip away the vital nuance required to solve complex policy issues."
    ]
  },
  {
    word: "obdurate",
    phonetic: "/ˈɒb.djʊ.rət/",
    pos: "adjective",
    definitions: [
      "Stubbornly refusing to change one's opinion or course of action.",
      "Hardened in feeling; unmoved by persuasion or pity."
    ],
    synonyms: ["stubborn", "obstinate", "unyielding", "inflexible", "intransigent"],
    antonyms: ["compliant", "malleable", "tractable", "submissive"],
    examples: [
      "Despite overwhelming evidence of his mistake, the CEO remained obdurate, refusing to alter the product rollout.",
      "The obdurate dictator turned a deaf ear to international appeals for humanitarian aid delivery.",
      "Time and patient reasoning gradually softened his once-obdurate stance on immigration reform."
    ]
  },
  {
    word: "obfuscate",
    phonetic: "/ˈɒb.fʌ.skeɪt/",
    pos: "verb",
    definitions: [
      "To render obscure, unclear, or unintelligible.",
      "To bewilder or deliberately confuse."
    ],
    synonyms: ["obscure", "confuse", "muddle", "cloud", "blur"],
    antonyms: ["clarify", "elucidate", "explain", "illuminate"],
    examples: [
      "The defense attorney used dense technical jargon to obfuscate the plain facts of the accounting fraud.",
      "Politicians often obfuscate the real cost of new programs by using creative accounting definitions.",
      "Good technical writing should illuminate complex ideas rather than obfuscate them with needless acronyms."
    ]
  },
  {
    word: "oblique",
    phonetic: "/əˈbliːk/",
    pos: "adjective",
    definitions: [
      "Neither parallel nor at a right angle to a specified or implied line; slanting.",
      "Not explicit or direct in addressing a point."
    ],
    synonyms: ["indirect", "slanted", "circuitous", "allusive", "implicit"],
    antonyms: ["direct", "explicit", "straightforward", "perpendicular"],
    examples: [
      "He made several oblique references to her recent demotion without ever mentioning her department by name.",
      "The architect incorporated oblique angles and soaring glass facades to maximize afternoon natural light.",
      "An oblique critique is often more memorable and stinging than a clumsy, direct insult."
    ]
  },
  {
    word: "obsequious",
    phonetic: "/əbˈsiː.kwi.əs/",
    pos: "adjective",
    definitions: [
      "Obedient or attentive to an excessive or servile degree.",
      "Fawning or servilely sycophantic."
    ],
    synonyms: ["servile", "sycophantic", "fawning", "subservient", "cringing"],
    antonyms: ["assertive", "independent", "domineering", "imperious"],
    examples: [
      "The arrogant billionaire was surrounded by obsequious flatterers who agreed with his every whim.",
      "Her obsequious compliments felt insincere, making everyone in the hiring committee deeply uncomfortable.",
      "A principled executive values honest dissent over the chorus of obsequious yes-men."
    ]
  },
  {
    word: "obstinate",
    phonetic: "/ˈɒb.stɪ.nət/",
    pos: "adjective",
    definitions: [
      "Stubbornly refusing to change one's opinion or chosen course of action, despite attempts to persuade one to do so.",
      "Very difficult to change, overcome, or remove."
    ],
    synonyms: ["stubborn", "headstrong", "willful", "inflexible", "intractable"],
    antonyms: ["compliant", "tractable", "amenable", "yielding"],
    examples: [
      "The obstinate shopkeeper refused to sell his property, remaining surrounded by towering luxury skyscrapers.",
      "Medical researchers worked to develop treatments for obstinate bacterial strains resistant to standard antibiotics.",
      "His obstinate refusal to seek medical counsel turned a minor ankle sprain into a chronic ligament injury."
    ]
  },
  {
    word: "obstreperous",
    phonetic: "/əbˈstrɛp.ər.əs/",
    pos: "adjective",
    definitions: [
      "Noisy and difficult to control.",
      "Marked by aggressive noisiness and stubborn resistance."
    ],
    synonyms: ["unruly", "unmanageable", "boisterous", "rowdy", "clamorous"],
    antonyms: ["quiet", "orderly", "tractable", "disciplined"],
    examples: [
      "Security guards escorted the obstreperous passenger from the flight after he refused to fasten his seatbelt.",
      "Managing thirty obstreperous middle schoolers on a rainy museum field trip proved an exhausting task.",
      "The crowd grew increasingly obstreperous as midnight passed without the headline band taking the stage."
    ]
  },
  {
    word: "obtuse",
    phonetic: "/əbˈtjuːs/",
    pos: "adjective",
    definitions: [
      "Annoyingly insensitive or slow to understand.",
      "An angle more than 90° and less than 180°."
    ],
    synonyms: ["slow-witted", "insensitive", "dull", "dense", "imperceptive"],
    antonyms: ["sharp", "astute", "perceptive", "acute"],
    examples: [
      "He was deliberately being obtuse, pretending not to understand the ethical implications of the contract.",
      "She made subtle hints all evening, but her date was too obtuse to realize she wanted to leave.",
      "The geometric proof required constructing an obtuse triangle to demonstrate the trigonometric identity."
    ]
  },
  {
    word: "obviate",
    phonetic: "/ˈɒb.vi.eɪt/",
    pos: "verb",
    definitions: [
      "To remove a need or difficulty; eliminate.",
      "To anticipate and prevent by effective measures."
    ],
    synonyms: ["preclude", "prevent", "eliminate", "forestall", "rule out"],
    antonyms: ["necessitate", "require", "cause", "induce"],
    examples: [
      "Using cloud-based data redundancy helps obviate the risk of catastrophic hardware storage failure.",
      "Adopting automated verification scripts will obviate hundreds of hours of tedious manual data entry.",
      "A healthy lifestyle can obviate the need for expensive pharmaceutical interventions later in life."
    ]
  },
  {
    word: "officious",
    phonetic: "/əˈfɪʃ.əs/",
    pos: "adjective",
    definitions: [
      "Assertive of authority in an annoyingly domineering way, especially with regard to petty or trivial matters.",
      "Intrusively enthusiastic in offering unwanted help or advice."
    ],
    synonyms: ["interfering", "meddlesome", "intrusive", "dictatorial", "bossy"],
    antonyms: ["unobtrusive", "modest", "restrained", "diffident"],
    examples: [
      "An officious security guard demanded to inspect everyone's badge three times between the lobby and the elevators.",
      "She politely thanked her officious neighbor for gardening advice while quietly returning to her pruning.",
      "Bureaucracies frequently breed officious clerks who relish enforcing trivial rules down to the letter."
    ]
  },
  {
    word: "onerous",
    phonetic: "/ˈɒn.ər.əs/",
    pos: "adjective",
    definitions: [
      "Involving an amount of effort and difficulty that is oppressively burdensome.",
      "Burdensome or imposing a heavy hardship."
    ],
    synonyms: ["burdensome", "arduous", "strenuous", "taxing", "oppressive"],
    antonyms: ["facile", "easy", "light", "effortless"],
    examples: [
      "Small business owners struggled under the onerous compliance reporting rules imposed by the new tax law.",
      "Caring for an ailing parent is an emotionally exhausting and onerous duty that requires strong community support.",
      "He found the onerous terms of the predatory mortgage contract impossible to fulfill after losing his job."
    ]
  },
  {
    word: "opaque",
    phonetic: "/oʊˈpeɪk/",
    pos: "adjective",
    definitions: [
      "Not able to be seen through; not transparent.",
      "Hard or impossible to understand; unfathomable."
    ],
    synonyms: ["nontransparent", "cloudy", "obscure", "unintelligible", "impenetrable"],
    antonyms: ["transparent", "clear", "lucid", "pellucid"],
    examples: [
      "The shower booth was made of frosted, opaque glass to ensure privacy while allowing natural light.",
      "Critics argued that the government's opaque decision-making process fostered public distrust.",
      "His technical documentation was so dense and opaque that even fellow software engineers struggled to follow it."
    ]
  },
  {
    word: "opprobrium",
    phonetic: "/əˈproʊ.bri.əm/",
    pos: "noun",
    definitions: [
      "Harsh criticism or censure; public disgrace arising from shameful conduct.",
      "Contempt or reproach incurred by disgraceful behavior."
    ],
    synonyms: ["vilification", "censure", "disgrace", "ignominy", "infamy"],
    antonyms: ["praise", "acclaim", "honor", "prestige"],
    examples: [
      "The traitor faced widespread international opprobrium after confessing to selling defense secrets.",
      "Corporations caught dumping untreated chemical waste into municipal rivers earned severe public opprobrium.",
      "She endured the opprobrium of conservative peers to defend her groundbreaking scientific conclusions."
    ]
  },
  {
    word: "opulent",
    phonetic: "/ˈɒp.jʊ.lənt/",
    pos: "adjective",
    definitions: [
      "Ostentatiously rich and luxurious or lavish.",
      "Wealthy or affluent."
    ],
    synonyms: ["luxurious", "sumptuous", "lavish", "affluent", "palatial"],
    antonyms: ["austere", "spartan", "impoverished", "destitute"],
    examples: [
      "The imperial palace was filled with opulent crystal chandeliers, hand-woven silk tapestries, and gilded mirrors.",
      "He hosted opulent banquets for high society guests that featured delicacies flown in from three continents.",
      "Behind the austere stone facade of the townhouse lay an opulent interior designed by world-renowned decorators."
    ]
  },
  {
    word: "oscillate",
    phonetic: "/ˈɒs.ɪ.leɪt/",
    pos: "verb",
    definitions: [
      "To move or swing back and forth at a regular speed.",
      "To waver between different opinions or actions; vacillate."
    ],
    synonyms: ["swing", "sway", "vacillate", "fluctuate", "waver"],
    antonyms: ["stabilize", "remain", "settle", "fix"],
    examples: [
      "The pendulum continued to oscillate with mathematical precision inside the grandfather clock.",
      "Throughout the campaign, public opinion polls seemed to oscillate wildly between the two front-runners.",
      "Investors watched commodity prices oscillate in response to shifting weather reports across South America."
    ]
  },
  {
    word: "ostentatious",
    phonetic: "/ˌɒs.tɛnˈteɪ.ʃəs/",
    pos: "adjective",
    definitions: [
      "Characterized by vulgar or pretentious display; designed to impress or attract notice.",
      "Showy or flamboyant."
    ],
    synonyms: ["showy", "pretentious", "conspicuous", "flamboyant", "gaudy"],
    antonyms: ["modest", "unobtrusive", "understated", "restrained"],
    examples: [
      "He arrived at the charity gala in an ostentatious gold-plated limousine that drew eye-rolls from donors.",
      "True wealth and refined culture often favor quiet understated elegance over ostentatious displays of luxury.",
      "Her ostentatious diamond necklace dominated every photograph taken at the diplomatic reception."
    ]
  },
  {
    word: "ostracize",
    phonetic: "/ˈɒs.trə.saɪz/",
    pos: "verb",
    definitions: [
      "To exclude someone from a society or group.",
      "In ancient Greece, to banish an unpopular or dangerous citizen by public vote."
    ],
    synonyms: ["exclude", "shun", "banish", "exile", "isolate"],
    antonyms: ["welcome", "embrace", "include", "admit"],
    examples: [
      "Colleagues chose to ostracize the whistleblower, refusing to sit with him in the corporate cafeteria.",
      "In ancient Athens, citizens could ostracize politicians deemed a threat to democratic stability.",
      "Teenagers who refuse to conform to peer pressure are sometimes unjustly ostracized by their classmates."
    ]
  },
  {
    word: "palliate",
    phonetic: "/ˈpæl.i.eɪt/",
    pos: "verb",
    definitions: [
      "To make a disease or its symptoms less severe or unpleasant without removing the cause.",
      "To disguise or alleviate an offense; extenuate."
    ],
    synonyms: ["alleviate", "relieve", "soothe", "mitigate", "ease"],
    antonyms: ["worsen", "aggravate", "exacerbate", "inflame"],
    examples: [
      "Hospice care focuses on medical treatments designed to palliate pain and maximize patient comfort.",
      "No amount of public relations spin could palliate the company's catastrophic environmental negligence.",
      "A warm cup of chamomile tea helped palliate her persistent cough and allow her to sleep."
    ]
  },
  {
    word: "pallid",
    phonetic: "/ˈpæl.ɪd/",
    pos: "adjective",
    definitions: [
      "Pale, typically because of poor health.",
      "Lacking vigor, vitality, or intensity."
    ],
    synonyms: ["pale", "wan", "pasty", "ashen", "anemic"],
    antonyms: ["ruddy", "florid", "vibrant", "rosy"],
    examples: [
      "After weeks in the hospital ward, the recovering patient looked frail and pallid.",
      "The remake was a pallid imitation of the original masterpiece, lacking its biting wit and suspense.",
      "The pallid glow of winter moonlight bathed the silent graveyard in a ghostly luminescence."
    ]
  },
  {
    word: "panacea",
    phonetic: "/ˌpæn.əˈsiː.ə/",
    pos: "noun",
    definitions: [
      "A solution or remedy for all difficulties or diseases.",
      "A cure-all or universal remedy."
    ],
    synonyms: ["cure-all", "universal remedy", "magic bullet", "elixir", "wonder drug"],
    antonyms: ["poison", "toxin", "curse", "bane"],
    examples: [
      "Education is a powerful societal tool, but it is not a panacea for deep structural economic inequalities.",
      "Con artists in the nineteenth century traveled between frontier towns selling snake oil as a medical panacea.",
      "Technology can streamline workflow, but software alone is no panacea for poor management."
    ]
  },
  {
    word: "panegyric",
    phonetic: "/ˌpæn.ɪˈdʒɪr.ɪk/",
    pos: "noun",
    definitions: [
      "A public speech or published text in praise of someone or something.",
      "A formal eulogy or elaborate encomium."
    ],
    synonyms: ["eulogy", "paean", "accolade", "tribute", "encomium"],
    antonyms: ["diatribe", "denunciation", "critique", "invective"],
    examples: [
      "The poet laureate composed an elaborate panegyric to celebrate the monarch's silver jubilee.",
      "His review of the newly opened symphony hall read like an unabashed panegyric to acoustic perfection.",
      "At the retirement gala, colleagues delivered touching panegyrics honoring the beloved professor's four decades of mentorship."
    ]
  },
  {
    word: "paragon",
    phonetic: "/ˈpær.ə.ɡɒn/",
    pos: "noun",
    definitions: [
      "A person or thing regarded as a perfect example of a particular quality.",
      "A model of excellence or perfection."
    ],
    synonyms: ["model", "epitome", "exemplar", "archetype", "ideal"],
    antonyms: ["flaw", "imperfection", "anomaly", "pariah"],
    examples: [
      "Throughout her distinguished judicial career, she was revered as a paragon of fairness and integrity.",
      "The newly renovated hospital was hailed as a paragon of energy-efficient and sustainable architecture.",
      "He was no paragon of virtue, but his sincere efforts to reform won the respect of his community."
    ]
  },
  {
    word: "pariah",
    phonetic: "/pəˈraɪ.ə/",
    pos: "noun",
    definitions: [
      "An outcast; a person who is rejected from society or home.",
      "Any person despised or avoided by others."
    ],
    synonyms: ["outcast", "leper", "untouchable", "exile", "undesirable"],
    antonyms: ["insider", "favorite", "luminary", "idol"],
    examples: [
      "After the financial fraud scandal broke, the former CEO found himself treated as a social pariah.",
      "Nations that violate nuclear non-proliferation treaties risk becoming diplomatic pariahs on the global stage.",
      "Once the whistleblower exposed the toxic safety violations, corporate management turned him into an office pariah."
    ]
  },
  {
    word: "parsimonious",
    phonetic: "/ˌpɑː.sɪˈmoʊ.ni.əs/",
    pos: "adjective",
    definitions: [
      "Unwilling to spend money or use resources; stingy or frugal.",
      "Excessively sparing or cheap."
    ],
    synonyms: ["miserly", "stingy", "frugal", "penny-pinching", "tightfisted"],
    antonyms: ["generous", "munificent", "lavish", "extravagant"],
    examples: [
      "The parsimonious landlord refused to replace the broken furnace, providing only small electric space heaters.",
      "Despite his vast fortune, he remained notoriously parsimonious, reusing teabags and dining on canned beans.",
      "A parsimonious allocation of maintenance funds ultimately resulted in catastrophic bridge repairs years later."
    ]
  },
  {
    word: "partisan",
    phonetic: "/ˈpɑː.tɪ.zæn/",
    pos: "adjective",
    definitions: [
      "Prejudiced in favor of a particular cause; fiercely biased.",
      "A strong supporter of a party, cause, or person."
    ],
    synonyms: ["biased", "prejudiced", "one-sided", "sectarian", "factional"],
    antonyms: ["impartial", "unbiased", "nonpartisan", "objective"],
    examples: [
      "The editorial board abandoned its traditionally neutral stance, publishing a fiercely partisan endorsement.",
      "Citizens expressed deep frustration with the partisan gridlock that paralyzed legislative action in the capital.",
      "During World War II, courageous partisan guerrillas sabotaged enemy railway lines across occupied territories."
    ]
  },
  {
    word: "paucity",
    phonetic: "/ˈpɔː.sɪ.ti/",
    pos: "noun",
    definitions: [
      "The presence of something only in small or insufficient quantities or amounts; scarcity.",
      "Dearth or lack."
    ],
    synonyms: ["scarcity", "dearth", "shortage", "lack", "deficiency"],
    antonyms: ["abundance", "plethora", "surfeit", "copiousness"],
    examples: [
      "The prosecution's case collapsed due to a crippling paucity of credible forensic evidence.",
      "A paucity of affordable housing units in the metropolitan center drove working families into distant suburbs.",
      "Historians lamented the paucity of primary source records surviving from the fifth-century kingdom."
    ]
  },
  {
    word: "pedantic",
    phonetic: "/pɪˈdæn.tɪk/",
    pos: "adjective",
    definitions: [
      "Excessively concerned with minor details and rules or with displaying academic learning.",
      "Ostentatious in one's learning."
    ],
    synonyms: ["fussy", "fastidious", "scrupulous", "perfectionist", "over-scrupulous"],
    antonyms: ["casual", "informal", "broad-minded", "carefree"],
    examples: [
      "His pedantic corrections of everyday conversational grammar annoyed his family and friends.",
      "The review panel rejected the proposal not on its merits, but on pedantic formatting technicalities.",
      "A great teacher inspires curiosity rather than overwhelming students with pedantic recitations of rules."
    ]
  },
  {
    word: "pejorative",
    phonetic: "/pɪˈdʒɒr.ə.tɪv/",
    pos: "adjective",
    definitions: [
      "Expressing contempt or disapproval.",
      "Having negative or disparaging connotations."
    ],
    synonyms: ["disparaging", "derogatory", "deprecatory", "insulting", "belittling"],
    antonyms: ["complimentary", "approving", "laudatory", "commendatory"],
    examples: [
      "The term was originally neutral, but over decades it took on an overtly pejorative connotation.",
      "Critics used the pejorative label 'populist' to dismiss policies that enjoyed overwhelming public support.",
      "He refrained from using pejorative language, focusing his arguments squarely on empirical policy data."
    ]
  },
  {
    word: "pellucid",
    phonetic: "/pəˈluː.sɪd/",
    pos: "adjective",
    definitions: [
      "Translucently clear; easily understood.",
      "Admitting the passage of light with great clarity."
    ],
    synonyms: ["translucent", "transparent", "limpid", "clear", "crystalline"],
    antonyms: ["opaque", "murky", "turbid", "obscure"],
    examples: [
      "The pellucid waters of the Caribbean lagoon revealed vibrant coral reefs resting thirty feet below.",
      "Her pellucid prose style made even the most intricate concepts of quantum mechanics understandable to laypeople.",
      "The sonata's pellucid melodies conveyed a quiet, contemplative peace that hushed the auditorium."
    ]
  },
  {
    word: "penchant",
    phonetic: "/ˈpɒn.ʃɒn/",
    pos: "noun",
    definitions: [
      "A strong or habitual liking for something or tendency to do something.",
      "An inclination or leaning toward something."
    ],
    synonyms: ["fondness", "preference", "predilection", "affinity", "propensity"],
    antonyms: ["dislike", "aversion", "disinclination", "antipathy"],
    examples: [
      "He had a well-known penchant for vintage mechanical timepieces and rare leather-bound books.",
      "Her penchant for speaking her mind without diplomatic sugarcoating earned both fierce allies and bitter rivals.",
      "From an early age, the young prodigy exhibited an innate penchant for mathematical puzzles."
    ]
  },
  {
    word: "penurious",
    phonetic: "/pɪˈnjʊər.i.əs/",
    pos: "adjective",
    definitions: [
      "Extremely poor; poverty-stricken.",
      "Parsimonious; mean or stingy."
    ],
    synonyms: ["poor", "penniless", "destitute", "miserly", "parsimonious"],
    antonyms: ["wealthy", "affluent", "generous", "munificent"],
    examples: [
      "The poet spent his final years in a penurious garret, struggling to afford basic firewood and bread.",
      "Her penurious uncle refused to turn on the radiator even when frost coated the inside of the windowpanes.",
      "The charity provided food baskets to penurious families living in the rural mountain valley."
    ]
  },
  {
    word: "peremptory",
    phonetic: "/pəˈrɛmp.tər.i/",
    pos: "adjective",
    definitions: [
      "Insisting on immediate attention or obedience, especially in a brusquely imperious way.",
      "Precluding further debate; final or absolute."
    ],
    synonyms: ["brusque", "imperious", "authoritarian", "commanding", "categorical"],
    antonyms: ["submissive", "humble", "pleading", "tentative"],
    examples: [
      "The general issued a peremptory order for all troops to fall back to fortified positions by dusk.",
      "Her peremptory tone signaled to the board that no further debate on the acquisition would be tolerated.",
      "The magistrate delivered a peremptory dismissal of the frivolous lawsuit, fining the plaintiff for legal costs."
    ]
  },
  {
    word: "perfidious",
    phonetic: "/pərˈfɪd.i.əs/",
    pos: "adjective",
    definitions: [
      "Deceitful and untrustworthy; faithless.",
      "Characterized by treachery or breach of faith."
    ],
    synonyms: ["treacherous", "traitorous", "duplicitous", "disloyal", "deceitful"],
    antonyms: ["faithful", "loyal", "trustworthy", "devoted"],
    examples: [
      "Shakespeare portrayed Iago as a master of perfidious manipulation who destroyed everyone around him.",
      "The perfidious ally signed a secret non-aggression pact with the enemy on the eve of battle.",
      "Victims of the investment scam condemned the banker's perfidious abuse of long-standing community trust."
    ]
  },
  {
    word: "perfunctory",
    phonetic: "/pərˈfʌŋk.tər.i/",
    pos: "adjective",
    definitions: [
      "Carried out with a minimum of effort or reflection; superficial.",
      "Characterized by routine, indifference, or lack of enthusiasm."
    ],
    synonyms: ["cursory", "superficial", "mechanical", "automatic", "halfhearted"],
    antonyms: ["thorough", "meticulous", "careful", "enthusiastic"],
    examples: [
      "The security guard gave a perfunctory nod and barely glanced at the identification badge before opening the gate.",
      "She offered a perfunctory apology that sounded completely devoid of genuine remorse.",
      "The health inspector was reprimanded for conducting perfunctory walk-throughs of violation-ridden kitchens."
    ]
  },
  {
    word: "peripatetic",
    phonetic: "/ˌpɛr.ɪ.pəˈtɛt.ɪk/",
    pos: "adjective",
    definitions: [
      "Traveling from place to place, especially working or based in various places for relatively short periods.",
      "Aristotelian, from Aristotle's habit of walking while teaching."
    ],
    synonyms: ["itinerant", "nomadic", "traveling", "wandering", "roaming"],
    antonyms: ["sedentary", "stationary", "settled", "fixed"],
    examples: [
      "As a peripatetic documentary filmmaker, she spent nearly nine months of every year living out of a duffel bag.",
      "Aristotle's students were known as the peripatetic school because they walked together through the Lyceum gardens.",
      "His peripatetic career took him from teaching posts in Tokyo and London to field research in the Amazon."
    ]
  },
  {
    word: "perspicacious",
    phonetic: "/ˌpɜː.spɪˈkeɪ.ʃəs/",
    pos: "adjective",
    definitions: [
      "Having a ready insight into and understanding of things; shrewd.",
      "Possessing acute mental vision or discernment."
    ],
    synonyms: ["insightful", "shrewd", "astute", "discerning", "acute"],
    antonyms: ["obtuse", "dull", "imperceptive", "blind"],
    examples: [
      "The perspicacious investor anticipated the housing market downturn years before mainstream analysts caught on.",
      "Thanks to her perspicacious judgment of character, she assembled one of the most effective executive teams in the industry.",
      "A perspicacious detective spots the seemingly insignificant details that unravel complex criminal alibis."
    ]
  },
  {
    word: "petulant",
    phonetic: "/ˈpɛtʃ.ə.lənt/",
    pos: "adjective",
    definitions: [
      "Childishly sulky or bad-tempered.",
      "Impatient or irritable over minor annoyances."
    ],
    synonyms: ["sulky", "peevish", "irritable", "cranky", "querulous"],
    antonyms: ["placid", "good-natured", "forbearing", "serene"],
    examples: [
      "When his petulant demands for special VIP treatment were denied, he threatened to leave the charity gala.",
      "The tennis star was fined by the tournament committee for a petulant outburst directed at the chair umpire.",
      "Reacting with petulant resentment to constructive criticism will only damage your professional growth."
    ]
  },
  {
    word: "phlegmatic",
    phonetic: "/flɛɡˈmæt.ɪk/",
    pos: "adjective",
    definitions: [
      "Having an unemotional and stolidly calm disposition.",
      "Not easily excited or aroused to emotion."
    ],
    synonyms: ["calm", "cool", "composed", "stolid", "serene"],
    antonyms: ["excitable", "mercurial", "emotional", "passionate"],
    examples: [
      "Even when the airplane engine shuddered during severe turbulence, the phlegmatic captain spoke with total composure.",
      "His phlegmatic reaction to the breaking scandal frustrated reporters looking for explosive headlines.",
      "Emergency room physicians must maintain a phlegmatic temperament to perform delicate surgeries under pressure."
    ]
  },
  {
    word: "pithy",
    phonetic: "/ˈpɪθ.i/",
    pos: "adjective",
    definitions: [
      "Concise and forcefully expressive.",
      "Having substantial meaning in few words."
    ],
    synonyms: ["succinct", "concise", "terse", "trenchant", "cogent"],
    antonyms: ["verbose", "rambling", "wordy", "diffuse"],
    examples: [
      "Winston Churchill was celebrated for his pithy retorts that quickly dismantled parliamentary critics.",
      "The professor summarized three hundred pages of economic theory into a single pithy maxim.",
      "Her pithy advice for novice authors was simple: 'Write fearlessly, then edit ruthlessly.'"
    ]
  },
  {
    word: "platitude",
    phonetic: "/ˈplæt.ɪ.tjuːd/",
    pos: "noun",
    definitions: [
      "A remark or statement, especially one with a moral content, that has been used too often to be interesting or thoughtful.",
      "A trite, stale, or clichéd remark."
    ],
    synonyms: ["cliché", "truism", "banality", "bromide", "commonplace"],
    antonyms: ["originality", "profundity", "insight", "novelty"],
    examples: [
      "Instead of offering tangible financial assistance to the flood victims, the governor offered tired political platitudes.",
      "Her speech was packed with empty corporate platitudes about teamwork and synergy that resonated with no one.",
      "A true counselor listens deeply rather than dispensing generic platitudes when someone is in deep grief."
    ]
  },
  {
    word: "plethora",
    phonetic: "/ˈplɛθ.ər.ə/",
    pos: "noun",
    definitions: [
      "A large or excessive amount of something.",
      "An overabundance; excess."
    ],
    synonyms: ["excess", "overabundance", "surfeit", "glut", "profusion"],
    antonyms: ["dearth", "paucity", "scarcity", "lack"],
    examples: [
      "The newly renovated supermarket offered a plethora of organic produce and imported cheeses.",
      "Investigators faced a plethora of conflicting eyewitness statements that obscured the sequence of events.",
      "The internet gives students access to a plethora of information, but discernment is required to separate fact from fiction."
    ]
  },
  {
    word: "polemic",
    phonetic: "/pəˈlɛm.ɪk/",
    pos: "noun",
    definitions: [
      "A strong verbal or written attack on someone or something.",
      "The art or practice of engaging in aggressive dispute."
    ],
    synonyms: ["diatribe", "tirade", "screed", "denunciation", "critique"],
    antonyms: ["panegyric", "encomium", "eulogy", "tribute"],
    examples: [
      "His latest book is a fierce polemic against unregulated artificial intelligence and algorithmic surveillance.",
      "The debate quickly degraded from a thoughtful exchange of ideas into an unconstructive political polemic.",
      "She penned a brilliant polemic defending artistic freedom against conservative censorship boards."
    ]
  },
  {
    word: "precocious",
    phonetic: "/prɪˈkoʊ.ʃəs/",
    pos: "adjective",
    definitions: [
      "Having developed certain abilities or proclivities at an earlier age than usual.",
      "Indicative of early or accelerated development."
    ],
    synonyms: ["advanced", "gifted", "talented", "mature", "prodigious"],
    antonyms: ["backward", "slow", "delayed", "late-blooming"],
    examples: [
      "The precocious eight-year-old was already composing piano concertos and solving quadratic equations.",
      "Her precocious understanding of human psychology made her a gifted stage actress from a young age.",
      "Mozart was historically the most famous precocious musician of the classical European era."
    ]
  },
  {
    word: "predilection",
    phonetic: "/ˌpriː.dɪˈlɛk.ʃən/",
    pos: "noun",
    definitions: [
      "A preference or special liking for something; a bias in favor of something.",
      "An established preference or predisposition."
    ],
    synonyms: ["preference", "partiality", "penchant", "affinity", "propensity"],
    antonyms: ["dislike", "aversion", "antipathy", "disinclination"],
    examples: [
      "He showed an early predilection for classical archaeology, spending his summer vacations visiting Roman ruins.",
      "Her predilection for spicy Sichuan cuisine made dining out with her an exhilarating culinary adventure.",
      "Judges must recuse themselves if a personal predilection prevents an impartial evaluation of the facts."
    ]
  },
  {
    word: "prescient",
    phonetic: "/ˈprɛs.i.ənt/",
    pos: "adjective",
    definitions: [
      "Having or showing knowledge of events before they take place.",
      "Endowed with foresight or prophetic insight."
    ],
    synonyms: ["clairvoyant", "farsighted", "prophetic", "visionary", "discerning"],
    antonyms: ["shortsighted", "myopic", "oblivious", "unperceptive"],
    examples: [
      "George Orwell's novel '1984' proved remarkably prescient regarding modern mass surveillance and digital propaganda.",
      "Her prescient warning about the financial fragility of subprime mortgages was tragically dismissed by regulators.",
      "The prescient scientist predicted rising ocean temperatures three decades before satellite telemetry confirmed the trend."
    ]
  },
  {
    word: "probity",
    phonetic: "/ˈproʊ.bɪ.ti/",
    pos: "noun",
    definitions: [
      "The quality of having strong moral principles; honesty and decency.",
      "Adherence to the highest standards of integrity."
    ],
    synonyms: ["integrity", "honesty", "uprightness", "decency", "rectitude"],
    antonyms: ["dishonesty", "corruption", "unscrupulousness", "perfidy"],
    examples: [
      "The ombudsman was chosen for her legendary financial probity and refusal to compromise with special interest lobbies.",
      "Throughout forty years in the civil service, his professional probity was never once called into question.",
      "Public trust in democratic institutions depends fundamentally upon the personal probity of elected officials."
    ]
  },
  {
    word: "proclivity",
    phonetic: "/prəˈklɪv.ɪ.ti/",
    pos: "noun",
    definitions: [
      "A tendency to choose or do something regularly; an inclination or predisposition toward a particular thing.",
      "An inherent leaning or natural habit."
    ],
    synonyms: ["inclination", "tendency", "propensity", "predisposition", "leaning"],
    antonyms: ["aversion", "disinclination", "antipathy", "repulsion"],
    examples: [
      "He had a well-documented proclivity for exaggerating his athletic accomplishments over dinner.",
      "Her natural proclivity for mathematics guided her toward graduate research in theoretical astrophysics.",
      "Voters were troubled by the candidate's proclivity to lash out at reporters whenever questioned on policy."
    ]
  },
  {
    word: "profligate",
    phonetic: "/ˈprɒf.lɪ.ɡət/",
    pos: "adjective",
    definitions: [
      "Recklessly extravagant or wasteful in the use of resources.",
      "Licentious or dissolute in behavior."
    ],
    synonyms: ["wasteful", "extravagant", "spendthrift", "improvident", "dissolute"],
    antonyms: ["frugal", "thrifty", "parsimonious", "economical"],
    examples: [
      "The heir's profligate spending habits squandered a multi-million-dollar estate in less than five years.",
      "Citizens protested against the government's profligate expenditure on ostentatious monument projects.",
      "A profligate consumption of fossil fuels continues to accelerate atmospheric carbon accumulation."
    ]
  },
  {
    word: "propensity",
    phonetic: "/prəˈpɛn.sɪ.ti/",
    pos: "noun",
    definitions: [
      "An inclination or natural tendency to behave in a particular way.",
      "A natural bent or preference."
    ],
    synonyms: ["tendency", "inclination", "predisposition", "proclivity", "penchant"],
    antonyms: ["aversion", "disinclination", "inability", "antipathy"],
    examples: [
      "He showed an unfortunate propensity to interrupt colleagues before they could complete their arguments.",
      "Psychologists study genetic and environmental factors that influence a propensity for risk-taking behavior.",
      "Her uncanny propensity to find rare first-edition books in dusty flea markets amazed her fellow bibliophiles."
    ]
  },
  {
    word: "punctilious",
    phonetic: "/pʌŋkˈtɪl.i.əs/",
    pos: "adjective",
    definitions: [
      "Showing great attention to detail or correct behavior.",
      "Extremely scrupulous in observing formal rules or etiquette."
    ],
    synonyms: ["meticulous", "conscientious", "scrupulous", "fastidious", "exacting"],
    antonyms: ["careless", "sloppy", "lax", "slapdash"],
    examples: [
      "The senior diplomat was punctilious about protocol, ensuring every visiting head of state received proper honors.",
      "His punctilious bookkeeping habits allowed him to reconcile twenty accounts down to the last penny each night.",
      "She was punctilious in acknowledging every volunteer who contributed to the community garden project."
    ]
  },
  {
    word: "pusillanimous",
    phonetic: "/ˌpjuː.sɪˈlæn.ɪ.məs/",
    pos: "adjective",
    definitions: [
      "Showing a lack of courage or determination; timid.",
      "Cowardly or faint-hearted."
    ],
    synonyms: ["cowardly", "timid", "faint-hearted", "craven", "spineless"],
    antonyms: ["brave", "courageous", "valiant", "audacious"],
    examples: [
      "Editorial columnists condemned the board's pusillanimous refusal to stand up to political intimidation.",
      "His pusillanimous behavior during the emergency contrast sharply with the quiet bravery of the nursing staff.",
      "A pusillanimous compromise often satisfies neither faction while abandoning core moral principles."
    ]
  },
  {
    word: "quagmire",
    phonetic: "/ˈkwæɡ.maɪər/",
    pos: "noun",
    definitions: [
      "A soft boggy area of land that gives way underfoot.",
      "A complex or hazardous situation from which it is difficult to extricate oneself."
    ],
    synonyms: ["morass", "swamp", "bog", "mire", "predicament"],
    antonyms: ["dry ground", "solution", "clear path", "resolution"],
    examples: [
      "Torrential monsoon rains turned the construction site into an impassable quagmire of mud and clay.",
      "Diplomats feared that military intervention would draw the coalition into an intractable geopolitical quagmire.",
      "The company's finances were trapped in a quagmire of litigation and conflicting creditor claims."
    ]
  },
  {
    word: "querulous",
    phonetic: "/ˈkwɛr.jʊ.ləs/",
    pos: "adjective",
    definitions: [
      "Complaining in a petulant or whining manner.",
      "Habitually fretful or expressing grievances."
    ],
    synonyms: ["petulant", "peevish", "whining", "cranky", "cantankerous"],
    antonyms: ["cheerful", "contented", "patient", "forbearing"],
    examples: [
      "His querulous complaints about the hotel room temperature and the pillows tested the front desk's patience.",
      "The sick toddler spoke in a querulous voice, wanting to be held but too uncomfortable to sleep.",
      "Instead of offering constructive ideas, he contributed only querulous remarks throughout the strategy meeting."
    ]
  },
  {
    word: "quixotic",
    phonetic: "/kwɪkˈsɒt.ɪk/",
    pos: "adjective",
    definitions: [
      "Exceedingly idealistic; unrealistic and impractical.",
      "Resembling Don Quixote in pursuing noble but impossible dreams."
    ],
    synonyms: ["idealistic", "impractical", "romantic", "visionary", "chimerical"],
    antonyms: ["practical", "pragmatic", "realistic", "utilitarian"],
    examples: [
      "His quixotic campaign to build a solar-powered railway across the Sahara was dismissed by infrastructure bankers.",
      "While cynics mocked her quixotic quest to eradicate illiteracy in the province, she taught thousands to read.",
      "Launching a printed literary journal in the digital age seemed like a delightfully quixotic enterprise."
    ]
  },
  {
    word: "rancor",
    phonetic: "/ˈræŋ.kər/",
    pos: "noun",
    definitions: [
      "Bitterness or resentfulness, especially when long-standing.",
      "Deep-seated ill will or malice."
    ],
    synonyms: ["bitterness", "spite", "malice", "animosity", "acrimony"],
    antonyms: ["goodwill", "benevolence", "amity", "forgiveness"],
    examples: [
      "Despite the bitter courtroom battle over the family estate, the siblings parted without personal rancor.",
      "Generations of political rancor had polarized the city council to the point of utter paralysis.",
      "He spoke of his former rivals with generosity and respect, showing no trace of lingering rancor."
    ]
  },
  {
    word: "recalcitrant",
    phonetic: "/rɪˈkæl.sɪ.trənt/",
    pos: "adjective",
    definitions: [
      "Having an obstinately uncooperative attitude toward authority or discipline.",
      "Difficult to manage or operate; resistant."
    ],
    synonyms: ["uncooperative", "intractable", "insubordinate", "defiant", "rebellious"],
    antonyms: ["compliant", "tractable", "amenable", "submissive"],
    examples: [
      "The teacher showed extraordinary patience when dealing with the most recalcitrant students in the academy.",
      "Sanctions were imposed on the recalcitrant regime after it refused to comply with international inspection protocols.",
      "A recalcitrant printer jammed every time a document exceeding twenty pages was sent to the queue."
    ]
  },
  {
    word: "redoubtable",
    phonetic: "/rɪˈdaʊ.tə.bəl/",
    pos: "adjective",
    definitions: [
      "Formidable, especially as an opponent.",
      "Inspiring awe, reverence, or fear."
    ],
    synonyms: ["formidable", "fearsome", "commanding", "daunting", "imposing"],
    antonyms: ["weak", "frail", "ineffectual", "cowardly"],
    examples: [
      "She faced a redoubtable opponent in the championship finals who had not dropped a set all season.",
      "The retired supreme court justice was a redoubtable defender of constitutional civil liberties.",
      "Centuries of military engineers had fortified the citadel into a redoubtable bastion overlooking the valley."
    ]
  },
  {
    word: "rescind",
    phonetic: "/rɪˈsɪnd/",
    pos: "verb",
    definitions: [
      "To revoke, cancel, or repeal a law, order, or agreement.",
      "To take back or invalidate officially."
    ],
    synonyms: ["revoke", "repeal", "cancel", "annul", "nullify"],
    antonyms: ["enact", "enforce", "validate", "ratify"],
    examples: [
      "Under heavy public protest, the city council voted unanimously to rescind the unpopular parking tax.",
      "The university moved quickly to rescind the honorary degree after revelations of scientific plagiarism emerged.",
      "Management was forced to rescind the mandatory overtime policy when union representatives filed a formal grievance."
    ]
  },
  {
    word: "sagacious",
    phonetic: "/səˈɡeɪ.ʃəs/",
    pos: "adjective",
    definitions: [
      "Having or showing keen mental discernment and good judgment; shrewd.",
      "Possessing penetrating wisdom and foresight."
    ],
    synonyms: ["wise", "shrewd", "astute", "discerning", "perspicacious"],
    antonyms: ["foolish", "obtuse", "fatuous", "shortsighted"],
    examples: [
      "The founder's sagacious decision to pivot to cloud services saved the tech firm during the dot-com collapse.",
      "Village elders turned to the sagacious judge to resolve a property dispute that had baffled local magistrates.",
      "A sagacious investor focuses on long-term compound growth rather than chasing ephemeral market fads."
    ]
  },
  {
    word: "salient",
    phonetic: "/ˈseɪ.li.ənt/",
    pos: "adjective",
    definitions: [
      "Most noticeable or important; prominent.",
      "Projecting or pointing outward."
    ],
    synonyms: ["prominent", "conspicuous", "noticeable", "vital", "pivotal"],
    antonyms: ["insignificant", "minor", "obscure", "inconspicuous"],
    examples: [
      "The executive summary neatly highlighted the five most salient takeaways from the thousand-page climate study.",
      "Her presentation focused squarely on the salient risks that could derail the overseas infrastructure project.",
      "The salient angle of the fortress bastion allowed archers to defend both flanking walls simultaneously."
    ]
  },
  {
    word: "sanctimonious",
    phonetic: "/ˌsæŋk.tɪˈmoʊ.ni.əs/",
    pos: "adjective",
    definitions: [
      "Making a show of being morally superior to other people; hypocritically pious.",
      "Affecting righteousness."
    ],
    synonyms: ["self-righteous", "holier-than-thou", "hypocritical", "pietistic", "pharisaic"],
    antonyms: ["humble", "sincere", "unpretentious", "modest"],
    examples: [
      "Voters were disgusted by the sanctimonious politician who lectured on family values while hiding personal scandals.",
      "She could not stand his sanctimonious lectures on veganism, especially since he wore exotic leather boots.",
      "A sanctimonious attitude only repels people who might otherwise be receptive to positive ethical ideas."
    ]
  },
  {
    word: "sanguine",
    phonetic: "/ˈsæŋ.ɡwɪn/",
    pos: "adjective",
    definitions: [
      "Optimistic or positive, especially in an apparently bad or difficult situation.",
      "Blood-red in color; having a ruddy complexion."
    ],
    synonyms: ["optimistic", "hopeful", "buoyant", "confident", "positive"],
    antonyms: ["pessimistic", "gloomy", "morose", "despondent"],
    examples: [
      "Despite severe supply chain delays, the CEO remained remarkably sanguine about meeting quarterly revenue targets.",
      "Economists took a less sanguine view of inflation, warning that interest rate cuts would need to be delayed.",
      "His sanguine temperament kept the expedition's spirits high even when winter blizzards pinned them in base camp."
    ]
  },
  {
    word: "scintillating",
    phonetic: "/ˈsɪn.tɪ.leɪ.tɪŋ/",
    pos: "adjective",
    definitions: [
      "Sparkling or shining brightly.",
      "Brilliantly and excitingly clever or skillful."
    ],
    synonyms: ["sparkling", "brilliant", "dazzling", "exhilarating", "witty"],
    antonyms: ["dull", "boring", "insipid", "monotonous"],
    examples: [
      "The audience was enthralled by her scintillating performance of the Mendelssohn violin concerto.",
      "Dinner conversation was scintillating, filled with sharp literary wit, political satire, and philosophical debates.",
      "The night sky above the Atacama Desert was a scintillating canopy of millions of distant stars."
    ]
  },
  {
    word: "scurrilous",
    phonetic: "/ˈskɜːr.ə.ləs/",
    pos: "adjective",
    definitions: [
      "Making or spreading scandalous claims about someone with the intention of damaging their reputation.",
      "Humorously insulting, coarse, or vulgar."
    ],
    synonyms: ["defamatory", "slanderous", "libelous", "scandalous", "abusive"],
    antonyms: ["complimentary", "laudatory", "respectful", "flattering"],
    examples: [
      "The tabloid was forced to pay millions in damages after publishing scurrilous falsehoods about the surgeon's integrity.",
      "Political campaigns have unfortunately normalized scurrilous personal attacks over substantive policy debate.",
      "He dismissed the anonymous letter as a scurrilous attempt to derail his nomination to the high court."
    ]
  },
  {
    word: "specious",
    phonetic: "/ˈspiː.ʃəs/",
    pos: "adjective",
    definitions: [
      "Superficially plausible, but actually wrong.",
      "Misleading in appearance, especially having a deceptive attraction."
    ],
    synonyms: ["misleading", "deceptive", "fallacious", "spurious", "plausible-sounding"],
    antonyms: ["sound", "genuine", "valid", "verifiable"],
    examples: [
      "The defense lawyer's specious reasoning fell apart under the prosecutor's methodical cross-examination.",
      "Do not be seduced by specious marketing claims promising guaranteed fifty-percent investment returns.",
      "His argument had a specious elegance that crumbled as soon as empirical data was introduced."
    ]
  },
  {
    word: "spurious",
    phonetic: "/ˈspjʊər.i.əs/",
    pos: "adjective",
    definitions: [
      "Not being what it purports to be; false or fake.",
      "Illegitimate; lacking authenticity."
    ],
    synonyms: ["bogus", "fake", "counterfeit", "inauthentic", "fraudulent"],
    antonyms: ["genuine", "authentic", "real", "legitimate"],
    examples: [
      "Forensic art historians determined that the purported Rembrandt canvas was a clever but spurious forgery.",
      "The politician attempted to justify the unconstitutional decree with spurious claims of national emergency.",
      "Statistical algorithms must filter out spurious correlations that arise from sheer coincidence."
    ]
  },
  {
    word: "stolid",
    phonetic: "/ˈstɒl.ɪd/",
    pos: "adjective",
    definitions: [
      "Calm, dependable, and showing little emotion or animation.",
      "Impassive and slow to show mental reaction."
    ],
    synonyms: ["impassive", "phlegmatic", "unemotional", "calm", "stoic"],
    antonyms: ["emotional", "excitable", "expressive", "mercurial"],
    examples: [
      "Behind his stolid, granite-like expression sat an astute mind calculating every legal possibility.",
      "The farm horse remained stolid even as lightning cracked across the open pasture.",
      "His stolid demeanor during the crisis provided a steadying anchor for his panicked staff."
    ]
  },
  {
    word: "strident",
    phonetic: "/ˈstraɪ.dənt/",
    pos: "adjective",
    definitions: [
      "Loud and harsh; grating.",
      "Presenting a point of view, especially a controversial one, in an excessively and unpleasantly forceful way."
    ],
    synonyms: ["harsh", "raucous", "grating", "shrill", "vehement"],
    antonyms: ["soft", "dulcet", "subdued", "melodious"],
    examples: [
      "The smoke alarm emitted a strident screech that jolted the entire apartment building awake.",
      "Her strident rhetoric during the negotiations alienated moderate members who favored compromise.",
      "He spoke in a quiet, measured cadence, avoiding the strident tone so common among cable television pundits."
    ]
  },
  {
    word: "subjugate",
    phonetic: "/ˈsʌb.dʒʊ.ɡeɪt/",
    pos: "verb",
    definitions: [
      "To bring under domination or control, especially by conquest.",
      "To make subordinate or submissive."
    ],
    synonyms: ["conquer", "vanquish", "defeat", "subdue", "suppress"],
    antonyms: ["liberate", "free", "emancipate", "release"],
    examples: [
      "The Roman legions sought to subjugate the rebellious tribes of northern Britannia with fortified encampments.",
      "A totalitarian state seeks to subjugate independent thought by controlling schools and the press.",
      "She refused to let fear subjugate her ambition to build her own engineering firm."
    ]
  },
  {
    word: "supercilious",
    phonetic: "/ˌsuː.pərˈsɪl.i.əs/",
    pos: "adjective",
    definitions: [
      "Behaving or looking as though one thinks one is superior to others.",
      "Haughty, disdainful, or contemptuous."
    ],
    synonyms: ["arrogant", "haughty", "disdainful", "condescending", "patronizing"],
    antonyms: ["humble", "modest", "unpretentious", "deferential"],
    examples: [
      "The sommelier cast a supercilious glance at the customer who asked for ice in his vintage burgundy.",
      "Her supercilious attitude toward state university graduates made her unpopular among engineering peers.",
      "He dismissed the junior researcher's findings with a supercilious wave of his manicured hand."
    ]
  },
  {
    word: "superfluous",
    phonetic: "/suːˈpɜː.flu.əs/",
    pos: "adjective",
    definitions: [
      "Unnecessary, especially through being more than enough.",
      "Exceeding what is sufficient or required."
    ],
    synonyms: ["unnecessary", "redundant", "excessive", "gratuitous", "surplus"],
    antonyms: ["essential", "necessary", "vital", "indispensable"],
    examples: [
      "The editor ruthlessly pruned superfluous adverbs from the manuscript to sharpen its pacing.",
      "Having already secured the majority of votes, any further campaigning was deemed completely superfluous.",
      "Modern minimalist architecture strips away superfluous decorative ornaments in favor of clean lines."
    ]
  },
  {
    word: "supplant",
    phonetic: "/səˈplɑːnt/",
    pos: "verb",
    definitions: [
      "To supersede and replace.",
      "To take the place of another, often through force, trickery, or innovation."
    ],
    synonyms: ["replace", "supersede", "displace", "oust", "substitute"],
    antonyms: ["reinstate", "maintain", "preserve", "retain"],
    examples: [
      "Digital streaming platforms quickly supplanted physical DVD rental shops across the world.",
      "The ambitious junior partner schemed to supplant the aging founder as managing director of the firm.",
      "Electric drivetrains are poised to supplant internal combustion engines across passenger transport."
    ]
  },
  {
    word: "sycophant",
    phonetic: "/ˈsɪk.ə.fænt/",
    pos: "noun",
    definitions: [
      "A person who acts obsequiously toward someone important in order to gain advantage.",
      "A fawning flatterer or parasite."
    ],
    synonyms: ["flatterer", "toady", "lickspittle", "bootlicker", "yes-man"],
    antonyms: ["critic", "independent", "dissident", "maverick"],
    examples: [
      "The tyrannical king was surrounded by sycophants who praised his disastrous military decisions.",
      "Rather than hiring sycophants who simply echoed her opinions, the CEO actively recruited tough critics.",
      "His reputation suffered because everyone knew he was a shameless sycophant chasing high-society patronage."
    ]
  },
  {
    word: "taciturn",
    phonetic: "/ˈtæs.ɪ.tɜːn/",
    pos: "adjective",
    definitions: [
      "Reserved or uncommunicative in speech; saying little.",
      "Habitually silent or disinclined to talk."
    ],
    synonyms: ["untalkative", "uncommunicative", "reticent", "laconic", "quiet"],
    antonyms: ["talkative", "loquacious", "voluble", "garrulous"],
    examples: [
      "The taciturn lighthouse keeper spent six months on the desolate rocky islet without uttering a complaint.",
      "He was notoriously taciturn in large groups, but in one-on-one conversations he was warmly eloquent.",
      "Her father was a taciturn craftsman whose quiet approval was conveyed through a nod and a rare smile."
    ]
  },
  {
    word: "temerity",
    phonetic: "/təˈmɛr.ɪ.ti/",
    pos: "noun",
    definitions: [
      "Excessive confidence or boldness; audacity.",
      "Reckless disregard of danger or consequences."
    ],
    synonyms: ["audacity", "boldness", "impudence", "presumption", "effrontery"],
    antonyms: ["timidity", "diffidence", "caution", "prudence"],
    examples: [
      "No one had the temerity to contradict the chairman during the high-stakes board meeting.",
      "He had the temerity to ask for a substantial raise on the very day the company announced mass layoffs.",
      "History celebrates the extraordinary temerity of abolitionists who defied unjust federal laws."
    ]
  },
  {
    word: "tenacious",
    phonetic: "/təˈneɪ.ʃəs/",
    pos: "adjective",
    definitions: [
      "Tending to keep a firm hold of something; clinging or adhering closely.",
      "Not readily relinquishing a position, principle, or course of action; determined."
    ],
    synonyms: ["persevering", "resolute", "determined", "stubborn", "persistent"],
    antonyms: ["yielding", "faltering", "irresolute", "wavering"],
    examples: [
      "Her tenacious investigation uncovered documentary evidence of political corruption that had spanned decades.",
      "A tenacious grip on the icy rock face allowed the mountaineer to survive the violent gust.",
      "The disease met its match in a tenacious patient who refused to surrender hope throughout chemotherapy."
    ]
  },
  {
    word: "tirade",
    phonetic: "/taɪˈreɪd/",
    pos: "noun",
    definitions: [
      "A long, angry speech of criticism or accusation.",
      "A prolonged, vehement denunciation."
    ],
    synonyms: ["diatribe", "harangue", "screed", "denunciation", "polemic"],
    antonyms: ["praise", "compliment", "accolade", "eulogy"],
    examples: [
      "The coach launched into an impassioned tirade after the team surrendered three goals in ten minutes.",
      "Instead of answering the reporter's question, the mayor launched into an angry tirade against the press.",
      "She listened to his ten-minute tirade without interrupting, then calmly presented the contrary facts."
    ]
  },
  {
    word: "torpor",
    phonetic: "/ˈtɔː.pər/",
    pos: "noun",
    definitions: [
      "A state of physical or mental inactivity; lethargy.",
      "A condition of dormancy or numbness."
    ],
    synonyms: ["lethargy", "sluggishness", "inertia", "inactivity", "languor"],
    antonyms: ["vigor", "energy", "vitality", "animation"],
    examples: [
      "After the massive Thanksgiving feast, the entire family sank into a contented afternoon torpor on the couch.",
      "Bears enter a metabolic torpor during the harsh subzero months to conserve scarce bodily energy reserves.",
      "The economic stimulus package was designed to jolt the nation out of its prolonged industrial torpor."
    ]
  },
  {
    word: "trenchant",
    phonetic: "/ˈtrɛn.tʃənt/",
    pos: "adjective",
    definitions: [
      "Vigorous or incisive in expression or style.",
      "Keen, sharp, or penetrating; distinctly articulated."
    ],
    synonyms: ["incisive", "penetrating", "sharp", "keen", "acute"],
    antonyms: ["vague", "dull", "bland", "equivocal"],
    examples: [
      "The critic's trenchant analysis cut through the film's glamorous hype to expose its thin plot.",
      "She delivered a trenchant critique of the municipal budget that left the city council without a rebuttal.",
      "His trenchant wit and articulate delivery made him a formidable presence in parliamentary debate."
    ]
  },
  {
    word: "truculent",
    phonetic: "/ˈtrʌk.jʊ.lənt/",
    pos: "adjective",
    definitions: [
      "Eager or quick to argue or fight; aggressively defiant.",
      "Fierce, cruel, or savagely destructive."
    ],
    synonyms: ["defiant", "aggressive", "belligerent", "combative", "pugnacious"],
    antonyms: ["amiable", "peaceable", "cooperative", "gentle"],
    examples: [
      "The truculent suspect crossed his arms and glared at the interrogators, refusing to utter a word.",
      "His truculent attitude toward supervisors made collaboration virtually impossible in the newsroom.",
      "The debate turned unexpectedly truculent when the candidates began trading personal accusations."
    ]
  },
  {
    word: "turgid",
    phonetic: "/ˈtɜː.dʒɪd/",
    pos: "adjective",
    definitions: [
      "Swollen and congested.",
      "Tediously pompous or bombastic (of language or style)."
    ],
    synonyms: ["swollen", "distended", "bombastic", "pompous", "grandiose"],
    antonyms: ["simple", "understated", "deflated", "succinct"],
    examples: [
      "The river was dark and turgid after three days of torrential spring rains in the mountains.",
      "Critics panned the author's turgid novel, complaining that every dialogue was bogged down in purple prose.",
      "His turgid speeches filled the grand auditorium with lofty words, but left audiences thoroughly bored."
    ]
  },
  {
    word: "ubiquitous",
    phonetic: "/juːˈbɪk.wɪ.təs/",
    pos: "adjective",
    definitions: [
      "Present, appearing, or found everywhere.",
      "Existing or being everywhere at the same time; omnipresent."
    ],
    synonyms: ["omnipresent", "everywhere", "pervasive", "universal", "all-pervading"],
    antonyms: ["rare", "scarce", "uncommon", "isolated"],
    examples: [
      "Smartphones have become ubiquitous across the globe, transforming communication, commerce, and daily life.",
      "The company's vibrant billboard advertisements became ubiquitous across highway corridors nationwide.",
      "Coffee shops are ubiquitous in the university district, with three distinct cafes on every corner."
    ]
  },
  {
    word: "umbrage",
    phonetic: "/ˈʌm.brɪdʒ/",
    pos: "noun",
    definitions: [
      "Offense or annoyance.",
      "Shade or shadow, especially as cast by foliage."
    ],
    synonyms: ["offense", "pique", "resentment", "indignation", "irritation"],
    antonyms: ["delight", "pleasure", "complacency", "satisfaction"],
    examples: [
      "The ambassador took umbrage at the insulting remarks made about his country's legal system.",
      "She took strong umbrage at the suggestion that she had obtained the promotion through favoritism.",
      "Rather than taking umbrage at the critique, the mature author used it to strengthen the second draft."
    ]
  },
  {
    word: "unctuous",
    phonetic: "/ˈʌŋk.tʃu.əs/",
    pos: "adjective",
    definitions: [
      "Excessively flattering or ingratiating; oily.",
      "Having a greasy or soapy feel."
    ],
    synonyms: ["sycophantic", "fawning", "oily", "ingratiating", "greasy"],
    antonyms: ["genuine", "sincere", "forthright", "candid"],
    examples: [
      "The car salesman's unctuous charm made prospective buyers instinctively check the fine print twice.",
      "Colleagues saw through his unctuous compliments, recognizing that he only praised those in power.",
      "The chef drizzled an unctuous reduction of balsamic vinegar and roasted shallots over the duck breast."
    ]
  },
  {
    word: "vacillate",
    phonetic: "/ˈvæs.ɪ.leɪt/",
    pos: "verb",
    definitions: [
      "To alternate or waver between different opinions or actions; be indecisive.",
      "To sway steadily or fluctuate."
    ],
    synonyms: ["waver", "hesitate", "fluctuate", "oscillate", "dither"],
    antonyms: ["resolve", "decide", "commit", "stand firm"],
    examples: [
      "The committee continued to vacillate between two qualified candidates, delaying the appointment for weeks.",
      "A leader cannot afford to vacillate in the face of an imminent public health emergency.",
      "She vacillated between accepting the lucrative corporate offer and pursuing a doctorate in literature."
    ]
  },
  {
    word: "vapid",
    phonetic: "/ˈvæp.ɪd/",
    pos: "adjective",
    definitions: [
      "Offering nothing that is stimulating or challenging; bland.",
      "Lacking liveliness, animation, or zest."
    ],
    synonyms: ["insipid", "uninspired", "colorless", "bland", "dull"],
    antonyms: ["stimulating", "piquant", "exciting", "spirited"],
    examples: [
      "The conversation at the cocktail party was surprisingly vapid, revolving entirely around gossip and clothes.",
      "Critics dismissed the reality television show as a collection of vapid influencers staging trivial fights.",
      "Beneath the film's dazzling visual effects lay a vapid storyline devoid of genuine human emotion."
    ]
  },
  {
    word: "venerable",
    phonetic: "/ˈvɛn.ər.ə.bəl/",
    pos: "adjective",
    definitions: [
      "Accorded a great deal of respect, especially because of age, wisdom, or character.",
      "Imposing or impressive by reason of historic associations."
    ],
    synonyms: ["respected", "revered", "venerated", "hallowed", "esteemed"],
    antonyms: ["disreputable", "dishonorable", "ignoble", "disgraced"],
    examples: [
      "The venerable judge was given a standing ovation by both the defense and prosecution on her final day.",
      "They gathered beneath the spreading branches of a venerable oak tree that had stood since the Middle Ages.",
      "The university is a venerable institution that has educated prime ministers and Nobel laureates for centuries."
    ]
  },
  {
    word: "veracity",
    phonetic: "/vəˈræs.ɪ.ti/",
    pos: "noun",
    definitions: [
      "Conformity to facts; accuracy; habitual truthfulness.",
      "Truthfulness or accuracy."
    ],
    synonyms: ["truthfulness", "truth", "accuracy", "correctness", "fidelity"],
    antonyms: ["mendacity", "falsity", "untruthfulness", "deceit"],
    examples: [
      "The investigative journalist meticulously verified the veracity of every claim before going to print.",
      "Officials questioned the veracity of the witness's testimony after surveillance footage contradicted his timeline.",
      "A scientist's primary professional obligation is to maintain uncompromising veracity in reporting results."
    ]
  },
  {
    word: "verbose",
    phonetic: "/vərˈboʊs/",
    pos: "adjective",
    definitions: [
      "Using or expressed in more words than are needed.",
      "Wordy or containing excessive verbiage."
    ],
    synonyms: ["wordy", "loquacious", "prolix", "long-winded", "rambling"],
    antonyms: ["concise", "succinct", "laconic", "pithy"],
    examples: [
      "His verbose presentation stretched forty minutes past the allotted time, boring the executive board.",
      "The editor pruned the verbose manuscript, cutting nearly twenty thousand redundant words.",
      "Legal briefs should strive for clarity and precision rather than verbose circumlocution."
    ]
  },
  {
    word: "verisimilitude",
    phonetic: "/ˌvɛr.ɪ.sɪˈmɪl.ɪ.tjuːd/",
    pos: "noun",
    definitions: [
      "The appearance of being true or real.",
      "Having the likeness of truth; probability."
    ],
    synonyms: ["realism", "plausibility", "authenticity", "credibility", "lifelikeness"],
    antonyms: ["implausibility", "fakery", "unreality", "incredibility"],
    examples: [
      "The historical novelist conducted years of research to lend authentic verisimilitude to seventeenth-century London.",
      "Modern video game engines achieve astonishing verisimilitude in rendering realistic lighting and weather effects.",
      "The courtroom drama lost all verisimilitude when the judge allowed hearsay evidence without objection."
    ]
  },
  {
    word: "vicarious",
    phonetic: "/vɪˈkɛər.i.əs/",
    pos: "adjective",
    definitions: [
      "Experienced in the imagination through the feelings or actions of another person.",
      "Acting or done for another."
    ],
    synonyms: ["indirect", "secondhand", "surrogate", "derivative", "empathetic"],
    antonyms: ["direct", "firsthand", "primary", "personal"],
    examples: [
      "She derived vicarious pleasure from watching her daughter achieve her lifelong dream of playing Carnegie Hall.",
      "Reading thrilling mountaineering memoirs offers readers a vicarious taste of adventure from the safety of home.",
      "He lived vicariously through the daring escapades of fictional detectives in espionage thrillers."
    ]
  },
  {
    word: "vicissitude",
    phonetic: "/vɪˈsɪs.ɪ.tjuːd/",
    pos: "noun",
    definitions: [
      "A change of circumstances or fortune, typically one that is unwelcome or unpleasant.",
      "Alternation between opposite or contrasting things."
    ],
    synonyms: ["change", "alteration", "shift", "reversal", "fluctuation"],
    antonyms: ["stability", "constancy", "uniformity", "invariability"],
    examples: [
      "A truly resilient character endures the vicissitudes of life without succumbing to despair or cynicism.",
      "Throughout centuries of political vicissitude, the ancient cathedral remained the cultural heart of the city.",
      "The novel chronicles the vicissitudes of a noble family as war and industrialization transform their world."
    ]
  },
  {
    word: "vilify",
    phonetic: "/ˈvɪl.ɪ.faɪ/",
    pos: "verb",
    definitions: [
      "To speak or write about in an abusively disparaging manner.",
      "To defame or traduce someone's reputation."
    ],
    synonyms: ["defame", "slander", "denigrate", "malign", "traduce"],
    antonyms: ["praise", "extol", "laud", "eulogize"],
    examples: [
      "Partisan media outlets attempted to vilify the whistleblower rather than address the toxic corporate fraud.",
      "It is unjust to vilify an entire community based on the deplorable actions of a few rogue individuals.",
      "Throughout history, revolutionary pioneers were initially vilified by traditionalists before winning universal acclaim."
    ]
  },
  {
    word: "vindicate",
    phonetic: "/ˈvɪn.dɪ.keɪt/",
    pos: "verb",
    definitions: [
      "To clear someone of blame or suspicion.",
      "To show or prove to be right, reasonable, or justified."
    ],
    synonyms: ["acquit", "clear", "absolve", "justify", "exonerate"],
    antonyms: ["convict", "condemn", "incriminate", "blame"],
    examples: [
      "Subsequent scientific breakthroughs served to vindicate the astronomer's once-controversial theories on cosmic expansion.",
      "Timestamped digital receipts helped vindicate the accused accountant from the embezzlement allegations.",
      "Her decision to turn down the high-paying corporate role was vindicated when her nonprofit startup thrived."
    ]
  },
  {
    word: "vitiate",
    phonetic: "/ˈvɪʃ.i.eɪt/",
    pos: "verb",
    definitions: [
      "To spoil or impair the quality or efficiency of something.",
      "To destroy or corrupt the legal validity of something."
    ],
    synonyms: ["spoil", "impair", "mar", "corrupt", "invalidate"],
    antonyms: ["purify", "enhance", "validate", "strengthen"],
    examples: [
      "A critical procedural flaw during the police search was sufficient to vitiate the entire indictment.",
      "Allowing political bias into peer review will ultimately vitiate public confidence in academic science.",
      "His arrogant, condescending manner vitiated the impact of what was otherwise a brilliant presentation."
    ]
  },
  {
    word: "vitriolic",
    phonetic: "/ˌvɪt.riˈɒl.ɪk/",
    pos: "adjective",
    definitions: [
      "Filled with bitter criticism or malice.",
      "Caustic, scathing, or cutting like sulfuric acid."
    ],
    synonyms: ["caustic", "scathing", "acrimonious", "bitter", "acerbic"],
    antonyms: ["complimentary", "kind", "sweet", "soothing"],
    examples: [
      "The film critic launched a vitriolic attack on the director's latest big-budget historical blockbuster.",
      "Online forums have unfortunately become breeding grounds for vitriolic rhetoric and personal harassment.",
      "She endured the vitriolic condemnation of party leaders, remaining loyal to her constituents' interests."
    ]
  },
  {
    word: "vituperate",
    phonetic: "/vaɪˈtjuː.pə.reɪt/",
    pos: "verb",
    definitions: [
      "To blame or insult someone in strong or violent language.",
      "To revile, scold, or berate severely."
    ],
    synonyms: ["revile", "berate", "scold", "rail against", "upbraid"],
    antonyms: ["praise", "laud", "applaud", "compliment"],
    examples: [
      "Angry shareholders gathered at the annual meeting to vituperate the board for catastrophic financial losses.",
      "Instead of debating the economic bill calmly, the senator began to vituperate his opponents personally.",
      "A professional diplomat knows never to vituperate counterpart envoys during high-stakes treaty talks."
    ]
  },
  {
    word: "vociferous",
    phonetic: "/voʊˈsɪf.ər.əs/",
    pos: "adjective",
    definitions: [
      "Expressing or characterized by vehement opinions; loud and forceful.",
      "Crying out noisily or clamorously."
    ],
    synonyms: ["clamorous", "outspoken", "vocal", "vehement", "loud"],
    antonyms: ["silent", "quiet", "taciturn", "reticent"],
    examples: [
      "The proposed highway expansion met with vociferous opposition from neighborhood preservation coalitions.",
      "He was a vociferous critic of bank bailouts, writing dozens of op-eds for leading national newspapers.",
      "The crowd voiced vociferous support when the captain raised the championship trophy above his head."
    ]
  },
  {
    word: "voluble",
    phonetic: "/ˈvɒl.jʊ.bəl/",
    pos: "adjective",
    definitions: [
      "Speaking or spoken incessantly and fluently.",
      "Characterized by a ready and continuous flow of words."
    ],
    synonyms: ["talkative", "loquacious", "fluent", "garrulous", "articulate"],
    antonyms: ["taciturn", "laconic", "mute", "reticent"],
    examples: [
      "The voluble auctioneer kept the bidding lively, rattling off bids in an entertaining, rhythmic cadence.",
      "She was a voluble speaker whose enthusiasm for marine biology captivated the high school audience.",
      "Even under intense cross-examination, the witness remained voluble, offering elaborate explanations for every hour."
    ]
  },
  {
    word: "voracious",
    phonetic: "/vəˈreɪ.ʃəs/",
    pos: "adjective",
    definitions: [
      "Wanting or devouring great quantities of food.",
      "Having a very eager approach to an activity, especially reading or learning."
    ],
    synonyms: ["insatiable", "ravenous", "greedy", "avid", "unquenchable"],
    antonyms: ["indifferent", "apathetic", "moderate", "abstemious"],
    examples: [
      "From childhood onward, she was a voracious reader who finished three library books every weekend.",
      "Trekking twenty miles across mountain trails left the hikers with voracious appetites by dinner time.",
      "The tech company demonstrated a voracious appetite for acquiring promising artificial intelligence startups."
    ]
  },
  {
    word: "zealot",
    phonetic: "/ˈzɛl.ət/",
    pos: "noun",
    definitions: [
      "A person who is fanatical and uncompromising in pursuit of their religious, political, or other ideals.",
      "An excessively ardent partisan or fanatic."
    ],
    synonyms: ["fanatic", "enthusiast", "extremist", "radical", "militant"],
    antonyms: ["moderate", "agnostic", "skeptic", "centrist"],
    examples: [
      "The political zealot refused to consider any compromise, demanding total victory on every single clause.",
      "History warns against zealots who believe that noble ends justify any cruel and oppressive means.",
      "While dismissed by rivals as an environmental zealot, his warnings on toxic runoff proved entirely accurate."
    ]
  },
  {
    word: "zenith",
    phonetic: "/ˈzɛn.ɪθ/",
    pos: "noun",
    definitions: [
      "The time at which something is most powerful or successful.",
      "The point in the sky directly above the observer."
    ],
    synonyms: ["pinnacle", "peak", "apex", "acme", "culmination"],
    antonyms: ["nadir", "bottom", "depths", "zero"],
    examples: [
      "At the zenith of the British Empire in the nineteenth century, it governed territories across five continents.",
      "The midday sun stood at its zenith, casting virtually no shadows across the open desert plain.",
      "Winning the Nobel Prize in Literature marked the creative zenith of her distinguished fifty-year career."
    ]
  },
  {
    word: "zephyr",
    phonetic: "/ˈzɛf.ər/",
    pos: "noun",
    definitions: [
      "A soft, gentle breeze.",
      "A light, delicate wind, especially from the west."
    ],
    synonyms: ["breeze", "breath", "draft", "waft", "gentle wind"],
    antonyms: ["gale", "tempest", "squall", "hurricane"],
    examples: [
      "A refreshing summer zephyr rustled the lavender bushes and cooled the afternoon veranda.",
      "Sails flapped gently in the quiet harbor, waiting for a passing zephyr to fill the canvas.",
      "The poet wrote of the evening zephyr that carried the delicate scent of blooming night jasmine."
    ]
  }
];

let added = 0;
masterAdditions.forEach(entry => {
  const key = entry.word.toLowerCase();
  if (!bankMap.has(key)) {
    bankMap.set(key, entry);
    added++;
  }
});

console.log('Added new unique words:', added);
console.log('Total bank size now:', bankMap.size);

// Sort alphabetically
const finalBank = Array.from(bankMap.values()).sort((a, b) => a.word.localeCompare(b.word));

const output = `/* Master Curated Vocabulary Bank for WordForge */\nwindow.WORD_BANK = ${JSON.stringify(finalBank, null, 2)};\n`;

fs.writeFileSync('words.js', output, 'utf8');
console.log('Successfully wrote words.js! Total words:', finalBank.length);
