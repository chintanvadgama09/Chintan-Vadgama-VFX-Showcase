const fs = require('fs');

global.window = {};
require('../words.js');
const current = new Set((global.window.WORD_BANK || []).map(w => w.word.toLowerCase()));
console.log('Current in words.js:', current.size);

const candidateList = [
  "antediluvian", "apocryphal", "asperity", "assiduous", "bellicose", "calumny", "capitulate",
  "castigate", "chicanery", "circumspect", "clandestine", "cogent", "commensurate", "compunction",
  "concomitant", "conflagration", "contentious", "corpulence", "credulous", "cupidity", "cursory",
  "debacle", "decorous", "deference", "deleterious", "demagogue", "demure", "deride", "desiccate",
  "despot", "desultory", "diatribe", "didactic", "diffident", "dilatory", "dilettante", "disaffected",
  "discursive", "disparage", "dispassionate", "disrepute", "dissemble", "disseminate", "dissonance",
  "distend", "dogmatic", "duplicity", "ebullient", "eclectic", "efficacious", "effrontery",
  "egregious", "elegy", "elucidate", "emollient", "empirical", "enervate", "engender", "equivocal",
  "equivocate", "erudite", "esoteric", "espouse", "eulogy", "evanescent", "exacerbate", "exculpate",
  "execrable", "exigent", "exonerate", "expedient", "expiate", "expurgate", "extant", "extol",
  "extraneous", "facetious", "fallacious", "fastidious", "fatuous", "fawn", "feckless", "fecund",
  "fervid", "fetid", "florid", "fractious", "frenetic", "froward", "fulminate", "furtive",
  "garrulous", "germane", "glib", "grandiloquent", "gratuitous", "gregarious", "guile", "hackneyed",
  "hapless", "harangue", "hedonism", "hegemony", "heterodox", "hirsute", "homily", "hubris",
  "iconoclast", "idiosyncrasy", "ignominious", "impecunious", "imperious", "impertinent",
  "impervious", "impetuous", "implacable", "implicit", "impudent", "impugn", "inchoate",
  "incisive", "indefatigable", "indolent", "ineluctable", "ineptitude", "inert", "inexorable",
  "ingenuous", "inimical", "iniquity", "innocuous", "inscrutable", "insidious", "insipid",
  "insolent", "insouciant", "intransigent", "inundate", "invective", "inveterate", "invidious",
  "irascible", "irrevocable", "jettison", "jocund", "judicious", "juxtapose", "laconic",
  "lampoon", "languid", "largesse", "lascivious", "laudable", "legerdemain", "levity", "licentious",
  "limpid", "lithe", "loquacious", "lucid", "lugubrious", "luminous", "machination", "maelstrom",
  "magnanimous", "maladroit", "malevolent", "malinger", "malleable", "maverick", "mawkish",
  "mellifluous", "mendacious", "mercurial", "meretricious", "meticulous", "mitigate", "modicum",
  "mollify", "morass", "mordant", "morose", "multifarious", "munificent", "myopic", "nadir",
  "nascent", "nebulous", "nefarious", "neophyte", "nihilism", "noisome", "noxious", "nuance",
  "obdurate", "obfuscate", "oblique", "obsequious", "obstinate", "obstreperous", "obtuse",
  "obviate", "occlude", "officious", "onerous", "opaque", "opprobrium", "opulent", "oscillate",
  "ostentatious", "ostracize", "palliate", "pallid", "panacea", "panegyric", "paragon", "pariah",
  "parsimonious", "partisan", "paucity", "pedantic", "pejorative", "pellucid", "penchant",
  "penitent", "penurious", "peremptory", "perfidious", "perfunctory", "peripatetic", "pernicious",
  "perspicacious", "petulant", "phlegmatic", "pithy", "placate", "placid", "platitude", "plebeian",
  "plethora", "poignant", "polemic", "portentous", "pragmatic", "precarious", "precipitous",
  "precocious", "predilection", "preponderance", "prescient", "presumptuous", "prevaricate",
  "pristine", "probity", "proclivity", "prodigal", "prodigious", "profane", "profligate",
  "profuse", "prolific", "propensity", "propitious", "propriety", "prosaic", "proscribe",
  "proselytize", "protean", "provincial", "prurient", "puerile", "pugnacious", "pulchritude",
  "punctilious", "pungent", "pusillanimous", "quagmire", "quaint", "qualm", "quandary", "quash",
  "querulous", "quiescent", "quintessential", "quixotic", "quotidian", "rambunctious", "rancor",
  "rapacious", "rapprochement", "rarefied", "recalcitrant", "recant", "recapitulate", "redoubtable",
  "refulgent", "remonstrate", "remuneration", "renege", "reprobate", "repudiate", "rescind",
  "resilient", "resolution", "resplendent", "restive", "reticent", "reverent", "ribald", "rife",
  "rudimentary", "sagacious", "salient", "salutary", "sanctimonious", "sanguine", "sardonic",
  "scintillating", "scrupulous", "scurrilous", "secular", "sedition", "sententious", "serendipity",
  "servile", "sinuous", "solicitous", "solipsism", "somnolent", "sonorous", "sophistry", "spartan",
  "specious", "spurious", "staid", "stalwart", "stolid", "stratagem", "strident", "stultify",
  "stupefy", "subjugate", "sublime", "submissive", "suborn", "subpoena", "subservient", "subside",
  "substantive", "subsume", "subversive", "succinct", "succor", "suffrage", "sully", "supercilious",
  "superfluous", "supplant", "supple", "supplicant", "surfeit", "surly", "surmise", "surreptitious",
  "susceptible", "sycophant", "symbiosis", "syntax", "tacit", "taciturn", "tangential", "tautology",
  "tawdry", "tedious", "temerity", "temperance", "temporal", "tenable", "tenacious", "tenet",
  "tentative", "tenuous", "tepid", "terse", "timorous", "tirade", "torpid", "torpor", "tortuous",
  "tractable", "tranquil", "transcendent", "transgression", "transient", "translucent", "transmute",
  "treachery", "trepidation", "trite", "truculent", "truncate", "tumultuous", "turgid", "turpitude",
  "ubiquitous", "umbrage", "unabashed", "unalloyed", "unbridled", "uncanny", "unctuous", "undulate",
  "unequivocal", "unfettered", "unflappable", "unfurl", "ungainly", "unilateral", "unmitigated",
  "unprecedented", "unpretentious", "unruly", "unscrupulous", "untenable", "unwarranted",
  "unwieldy", "upbraid", "urbane", "usurp", "utilitarian", "utopian", "vacillate", "vacuous",
  "vainglorious", "valediction", "valiant", "validate", "vapid", "variegated", "vehement",
  "velocity", "venal", "venerable", "venerate", "veracity", "verbatim", "verbose", "verdant",
  "verisimilitude", "veritable", "vernacular", "versatile", "vestige", "vexation", "viable",
  "vicarious", "vicissitude", "vigilant", "vilify", "vindicate", "vindictive", "virulent",
  "visceral", "viscous", "vitiate", "vitriolic", "vituperate", "vivacious", "vivid", "vociferous",
  "volatile", "volition", "voluble", "voluminous", "voracious", "vortex", "vulnerable", "wane",
  "wanton", "warranted", "wary", "waver", "whimsical", "wistful", "wizened", "wreak", "wry",
  "xenophobia", "yearn", "yoke", "zeal", "zealot", "zealous", "zenith", "zephyr"
];

const needed = candidateList.filter(w => !current.has(w));
console.log('Candidates count:', candidateList.length);
console.log('Candidates already in words.js:', candidateList.length - needed.length);
console.log('New candidates to add:', needed.length);
console.log('Sample new candidates:', needed.slice(0, 15));
