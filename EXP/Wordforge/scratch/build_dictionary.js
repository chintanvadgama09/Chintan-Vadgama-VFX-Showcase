const fs = require('fs');

// Load the 112 starter words
global.window = global;
require('../words.js');
const starters = global.WORD_BANK || [];
console.log('Starting with existing curated words:', starters.length);

const wordMap = new Map();
starters.forEach(w => wordMap.set(w.word.toLowerCase(), w));

// Comprehensive list of master vocabulary entries
const newEntries = [
  {
    word: "aberrant",
    phonetic: "/æˈbɛr.ənt/",
    pos: "adjective",
    definitions: [
      "Departing from an accepted standard or normal state.",
      "Diverging from the ordinary type in structure or behavior."
    ],
    synonyms: ["atypical", "anomalous", "divergent", "deviant", "unorthodox"],
    antonyms: ["normal", "typical", "standard", "conventional"],
    examples: [
      "The geneticist studied aberrant cell growth that defied standard biological models.",
      "Such aberrant weather patterns in midsummer raised serious climate concerns.",
      "His aberrant reaction during the calm discussion surprised all his colleagues."
    ]
  },
  {
    word: "abjure",
    phonetic: "/əbˈdʒʊər/",
    pos: "verb",
    definitions: [
      "To solemnly renounce or give up a belief, cause, or claim.",
      "To reject or avoid something under oath."
    ],
    synonyms: ["renounce", "relinquish", "forswear", "repudiate", "disavow"],
    antonyms: ["embrace", "affirm", "espouse", "adopt"],
    examples: [
      "Under heavy pressure, the dissident refused to abjure his political convictions.",
      "In order to join the ascetic community, novices were asked to abjure all worldly luxuries.",
      "He chose to abjure his previous allegiance after learning the truth about the organization."
    ]
  },
  {
    word: "abstruse",
    phonetic: "/æbˈstruːs/",
    pos: "adjective",
    definitions: [
      "Difficult to understand; obscure or esoteric.",
      "Dealing with matters that are profound and hard for ordinary minds to grasp."
    ],
    synonyms: ["obscure", "arcane", "recondite", "esoteric", "cryptic"],
    antonyms: ["clear", "obvious", "lucid", "straightforward"],
    examples: [
      "The professor's lecture on quantum entanglement was notoriously abstruse.",
      "She spent the weekend deciphering the abstruse legal terminology in the contract.",
      "Ancient philosophical treatises can seem abstruse without historical commentary."
    ]
  },
  {
    word: "acumen",
    phonetic: "/əˈkjuː.mən/",
    pos: "noun",
    definitions: [
      "The ability to make good judgments and quick decisions, typically in a particular domain.",
      "Keenness of insight; sharpness of intellect."
    ],
    synonyms: ["shrewdness", "discernment", "astuteness", "perspicacity", "insight"],
    antonyms: ["naivety", "obtuse", "foolishness", "dullness"],
    examples: [
      "Her financial acumen helped turn the struggling bakery into a regional franchise.",
      "The trial tested the young prosecutor's courtroom acumen and composure.",
      "He lacked the technical expertise, but his political acumen was unrivaled."
    ]
  },
  {
    word: "adamant",
    phonetic: "/ˈæd.ə.mənt/",
    pos: "adjective",
    definitions: [
      "Refusing to be persuaded or to change one's mind; unyielding.",
      "Impenetrably hard or unbreakable."
    ],
    synonyms: ["unshakeable", "inflexible", "resolute", "steely", "firm"],
    antonyms: ["flexible", "compliant", "yielding", "vacillating"],
    examples: [
      "Despite prolonged negotiations, the union leaders remained adamant about their safety demands.",
      "She was adamant that all team members receive equal recognition for the research.",
      "His parents were adamant about him completing his college degree."
    ]
  },
  {
    word: "admonish",
    phonetic: "/ədˈmɒn.ɪʃ/",
    pos: "verb",
    definitions: [
      "To warn or reprimand someone firmly.",
      "To advise or urge someone earnestly to do something."
    ],
    synonyms: ["reprove", "rebuke", "chide", "caution", "reprimand"],
    antonyms: ["praise", "commend", "applaud", "compliment"],
    examples: [
      "The judge admonished the witness against making speculative statements.",
      "Her mentor gently admonished her to take rest before burning out from overwork.",
      "Teachers frequently admonished students about keeping their mobile phones silenced."
    ]
  },
  {
    word: "aesthetic",
    phonetic: "/ɛsˈθɛt.ɪk/",
    pos: "adjective",
    definitions: [
      "Concerned with beauty or the appreciation of beauty.",
      "Giving or designed to give pleasure through beauty."
    ],
    synonyms: ["artistic", "tasteful", "refined", "pleasing", "graceful"],
    antonyms: ["unattractive", "crude", "grotesque", "garish"],
    examples: [
      "The architect blended modern minimalist aesthetic with classic timber frameworks.",
      "Many consumers buy products not just for function, but for aesthetic satisfaction.",
      "The quiet seaside town had an understated aesthetic that enchanted photographers."
    ]
  },
  {
    word: "altruistic",
    phonetic: "/ˌæl.truˈɪs.tɪk/",
    pos: "adjective",
    definitions: [
      "Showing a disinterested and selfless concern for the well-being of others.",
      "Motivated by a desire to benefit others with no expectation of personal gain."
    ],
    synonyms: ["unselfish", "philanthropic", "benevolent", "charitable", "magnanimous"],
    antonyms: ["selfish", "egotistical", "mercenary", "self-serving"],
    examples: [
      "The anonymous donation was a purely altruistic act to fund children's healthcare.",
      "Critics debated whether corporate charity is ever truly altruistic or driven by branding.",
      "She dedicated her retirement years to altruistic work in rural literacy programs."
    ]
  },
  {
    word: "amalgamate",
    phonetic: "/əˈmæl.ɡə.meɪt/",
    pos: "verb",
    definitions: [
      "To combine or unite to form one organization or structure.",
      "To merge disparate elements into a unified whole."
    ],
    synonyms: ["merge", "unite", "fuse", "consolidate", "integrate"],
    antonyms: ["separate", "disperse", "bifurcate", "divide"],
    examples: [
      "The two community colleges decided to amalgamate their libraries and online resources.",
      "Her culinary style amalgamates traditional Tuscan flavors with Japanese plating techniques.",
      "The newly amalgamated banking corporation became the third largest in the province."
    ]
  },
  {
    word: "ambiguous",
    phonetic: "/æmˈbɪɡ.ju.əs/",
    pos: "adjective",
    definitions: [
      "Open to more than one interpretation; having a double meaning.",
      "Unclear or inexact because a choice between alternatives has not been made."
    ],
    synonyms: ["equivocal", "vague", "cryptic", "obscure", "indeterminate"],
    antonyms: ["unambiguous", "clear", "explicit", "lucid"],
    examples: [
      "The treaty's ambiguous wording later led to territorial disputes between both nations.",
      "He gave an ambiguous response when asked about his future plans with the company.",
      "The ending of the novel was intentionally ambiguous, leaving readers to interpret the protagonist's fate."
    ]
  },
  {
    word: "ameliorate",
    phonetic: "/əˈmiː.li.ə.reɪt/",
    pos: "verb",
    definitions: [
      "To make something bad or unsatisfactory better.",
      "To improve conditions or ease suffering."
    ],
    synonyms: ["improve", "alleviate", "enhance", "mitigate", "relieve"],
    antonyms: ["worsen", "exacerbate", "aggravate", "deteriorate"],
    examples: [
      "The municipal council introduced green energy subsidies to ameliorate air quality.",
      "Steps were taken to ameliorate overcrowding in municipal hospitals.",
      "A warm cup of herbal tea helped ameliorate her pounding headache."
    ]
  },
  {
    word: "anachronistic",
    phonetic: "/əˌnæk.rəˈnɪs.tɪk/",
    pos: "adjective",
    definitions: [
      "Belonging or appropriate to an earlier period, especially so as to seem conspicuously old-fashioned.",
      "Chronologically out of place."
    ],
    synonyms: ["antiquated", "archaic", "outdated", "obsolete", "chronologically misplaced"],
    antonyms: ["contemporary", "modern", "timely", "current"],
    examples: [
      "Wearing full Victorian tweed to a modern software conference looked strikingly anachronistic.",
      "The film was criticized for anachronistic dialogue that used twenty-first-century slang in seventeenth-century France.",
      "His strict rotary telephone policy seemed delightfully anachronistic to his tech-savvy grandchildren."
    ]
  },
  {
    word: "antipathy",
    phonetic: "/ænˈtɪp.ə.θi/",
    pos: "noun",
    definitions: [
      "A deep-seated feeling of dislike or aversion.",
      "Hostility or antagonism toward someone or something."
    ],
    synonyms: ["hostility", "aversion", "animosity", "enmity", "repugnance"],
    antonyms: ["affinity", "fondness", "amity", "sympathy"],
    examples: [
      "There was longstanding antipathy between the rival tech moguls dating back to university days.",
      "Her natural antipathy toward public speaking disappeared after thorough coaching.",
      "The proposed highway expansion met with fierce antipathy from local homeowners."
    ]
  },
  {
    word: "antithesis",
    phonetic: "/ænˈtɪθ.ə.sɪs/",
    pos: "noun",
    definitions: [
      "A person or thing that is the direct opposite of someone or something else.",
      "A contrast or opposition between two things in rhetoric."
    ],
    synonyms: ["contrary", "reverse", "opposite", "counterpart", "inverse"],
    antonyms: ["equivalent", "replica", "counterpart", "duplicate"],
    examples: [
      "His chaotic, cluttered workshop was the exact antithesis of his wife's spotless design studio.",
      "The serene monastery stood as the antithesis to the bustling, smog-filled city below.",
      "In her speech, she used antithesis effectively to highlight the divide between wealth and poverty."
    ]
  },
  {
    word: "apocryphal",
    phonetic: "/əˈpɒk.rɪ.fəl/",
    pos: "adjective",
    definitions: [
      "Of doubtful authenticity, although widely circulated as being true.",
      "Spurious or legendary rather than historical."
    ],
    synonyms: ["unverified", "dubious", "fabricated", "legendary", "spurious"],
    antonyms: ["authentic", "genuine", "verifiable", "true"],
    examples: [
      "The popular tale of Isaac Newton and the falling apple may well be apocryphal.",
      "She entertained dinner guests with an apocryphal account of the museum's resident ghost.",
      "Biographers must carefully sift verified historical letters from apocryphal legends."
    ]
  },
  {
    word: "arcane",
    phonetic: "/ɑːˈkeɪn/",
    pos: "adjective",
    definitions: [
      "Understood by few; mysterious or secret.",
      "Requiring secret or specialized knowledge to comprehend."
    ],
    synonyms: ["esoteric", "abstruse", "enigmatic", "cryptic", "obscure"],
    antonyms: ["commonplace", "obvious", "familiar", "accessible"],
    examples: [
      "The manuscript was filled with arcane astronomical charts and alchemical notations.",
      "Tax law can seem completely arcane to anyone without a specialized accounting background.",
      "The secret fraternity preserved ancient rituals that seemed arcane to outsiders."
    ]
  },
  {
    word: "arduous",
    phonetic: "/ˈɑː.dʒu.əs/",
    pos: "adjective",
    definitions: [
      "Involving or requiring strenuous effort; difficult and tiring.",
      "Hard to endure, achieve, or climb."
    ],
    synonyms: ["taxing", "onerous", "strenuous", "laborious", "grueling"],
    antonyms: ["effortless", "facile", "easy", "breezy"],
    examples: [
      "Mountaineers faced an arduous twelve-hour ascent through biting blizzard winds.",
      "Rebuilding the regional infrastructure after the storm was an arduous, multi-year endeavor.",
      "Learning fluent Mandarin proved to be the most arduous intellectual challenge of his career."
    ]
  },
  {
    word: "ascetic",
    phonetic: "/əˈsɛt.ɪk/",
    pos: "adjective",
    definitions: [
      "Characterized by severe self-discipline and abstention from all forms of indulgence, typically for religious reasons.",
      "Extremely simple or austere in lifestyle or appearance."
    ],
    synonyms: ["austere", "abstinent", "spartan", "self-denying", "monastic"],
    antonyms: ["hedonistic", "sybaritic", "indulgent", "sensual"],
    examples: [
      "The monk lived an ascetic existence in a sparse cliffside cell high above the valley.",
      "During training camp, the Olympic boxer adopted an almost ascetic regimen of diet and exercise.",
      "Her ascetic living room contained little more than a low wooden desk and a straw floor mat."
    ]
  },
  {
    word: "assiduous",
    phonetic: "/əˈsɪd.ju.əs/",
    pos: "adjective",
    definitions: [
      "Showing great care, attention, and persistent effort.",
      "Constant in application to business or duties."
    ],
    synonyms: ["diligent", "meticulous", "industrious", "sedulous", "painstaking"],
    antonyms: ["negligent", "lazy", "indolent", "careless"],
    examples: [
      "Through assiduous archival research, the historian uncovered overlooked letters by the diplomat.",
      "Her assiduous study habits earned her the highest academic honor in her graduating class.",
      "The botanist made assiduous field notes documenting every stage of the rare orchid's bloom."
    ]
  },
  {
    word: "audacious",
    phonetic: "/ɔːˈdeɪ.ʃəs/",
    pos: "adjective",
    definitions: [
      "Showing a willingness to take surprisingly bold risks.",
      "Showing an impudent lack of respect."
    ],
    synonyms: ["intrepid", "daring", "bold", "valiant", "insolent"],
    antonyms: ["timid", "cautious", "meek", "fearful"],
    examples: [
      "The startup launched an audacious bid to challenge the monopolistic tech giant.",
      "His audacious escape from the besieged fortress became the stuff of military legend.",
      "The art curator took an audacious risk by hanging experimental graffiti in the grand hall."
    ]
  },
  {
    word: "austere",
    phonetic: "/ɒˈstɪər/",
    pos: "adjective",
    definitions: [
      "Severe or strict in manner, attitude, or appearance.",
      "Having an extremely plain and simple style or quality; without comfort or luxury."
    ],
    synonyms: ["spartan", "somber", "rigorous", "ascetic", "plain"],
    antonyms: ["lavish", "ornate", "luxurious", "indulgent"],
    examples: [
      "The monastery was celebrated for its austere architecture and quiet courtyard.",
      "His austere childhood fostered a deep resilience and quiet humility throughout his adulthood.",
      "During economic downturns, government institutions adopted austere fiscal policies."
    ]
  },
  {
    word: "banal",
    phonetic: "/bəˈnɑːl/",
    pos: "adjective",
    definitions: [
      "So lacking in originality as to be obvious and boring.",
      "Predictable and trite."
    ],
    synonyms: ["trite", "hackneyed", "clichéd", "platitudinous", "prosaic"],
    antonyms: ["novel", "original", "innovative", "fresh"],
    examples: [
      "The speech was loaded with banal political slogans that failed to inspire the crowd.",
      "Great literature elevates even banal everyday routines into moments of profound insight.",
      "He dismissed the romantic comedy as a banal sequence of predictable misunderstandings."
    ]
  },
  {
    word: "belligerent",
    phonetic: "/bəˈlɪdʒ.ər.ənt/",
    pos: "adjective",
    definitions: [
      "Hostile and aggressive; eager to fight.",
      "Engaged in a war or conflict, as recognized by international law."
    ],
    synonyms: ["pugnacious", "combative", "truculent", "bellicose", "antagonistic"],
    antonyms: ["peaceable", "conciliatory", "pacific", "amicable"],
    examples: [
      "The belligerent patron was escorted out by tavern security before a brawl started.",
      "Diplomats condemned the belligerent rhetoric broadcast by state television.",
      "A belligerent stance in negotiations rarely yields lasting compromise."
    ]
  },
  {
    word: "bolster",
    phonetic: "/ˈboʊl.stər/",
    pos: "verb",
    definitions: [
      "To support or strengthen; prop up.",
      "To encourage, sustain, or boost someone or something."
    ],
    synonyms: ["strengthen", "reinforce", "buttress", "sustain", "fortify"],
    antonyms: ["undermine", "weaken", "impair", "erode"],
    examples: [
      "The discovery of new geological core samples bolstered their climate change thesis.",
      "A series of early victories bolstered team morale ahead of the national championship.",
      "The central bank intervened to bolster the falling currency against international shocks."
    ]
  },
  {
    word: "bombastic",
    phonetic: "/bɒmˈbæs.tɪk/",
    pos: "adjective",
    definitions: [
      "High-sounding but with little meaning; inflated or pompous.",
      "Ostentatiously lofty in style or language."
    ],
    synonyms: ["grandiloquent", "pompous", "turgid", "orotund", "pretentious"],
    antonyms: ["restrained", "understated", "concise", "modest"],
    examples: [
      "The candidate's bombastic claims about instant economic miracles drew skepticism from economists.",
      "Beneath the bombastic rhetoric of the pamphlet lay few practical proposals.",
      "He avoided the bombastic posturing typical of courtroom dramas and let the evidence speak."
    ]
  },
  {
    word: "brevity",
    phonetic: "/ˈbrɛv.ɪ.ti/",
    pos: "noun",
    definitions: [
      "Concise and exact use of words in writing or speech.",
      "Shortness of time or duration."
    ],
    synonyms: ["conciseness", "terse", "pithiness", "succinctness", "compactness"],
    antonyms: ["prolixity", "verbosity", "wordiness", "lengthiness"],
    examples: [
      "In executive summaries, brevity is essential for busy decision-makers.",
      "The brevity of cherry blossom season reminds onlookers of nature's impermanence.",
      "Shakespeare famously observed that brevity is the soul of wit."
    ]
  },
  {
    word: "cajole",
    phonetic: "/kəˈdʒoʊl/",
    pos: "verb",
    definitions: [
      "To persuade someone to do something by sustained flattery or coaxing.",
      "To wheedle or influence through charm."
    ],
    synonyms: ["wheedle", "coax", "flatter", "entice", "beguile"],
    antonyms: ["coerce", "intimidate", "dissuade", "repel"],
    examples: [
      "She managed to cajole her reluctant brother into attending the charity gala with her.",
      "The vendor cajoled tourists with sweet mint tea and complimentary handwoven scarves.",
      "Skillful mediators cajole stubborn parties into looking beyond immediate grievances."
    ]
  },
  {
    word: "candid",
    phonetic: "/ˈkæn.dɪd/",
    pos: "adjective",
    definitions: [
      "Truthful and straightforward; frank.",
      "Taken informally without subjects posing."
    ],
    synonyms: ["frank", "forthright", "sincere", "unvarnished", "direct"],
    antonyms: ["disingenuous", "evasive", "guarded", "insincere"],
    examples: [
      "The CEO gave a candid interview addressing the company's recent product failures.",
      "I appreciate your candid feedback on my draft; it revealed several plot holes.",
      "The documentary featured candid footage of the band arguing backstage before their tour."
    ]
  },
  {
    word: "capitulate",
    phonetic: "/kəˈpɪtʃ.ʊ.leɪt/",
    pos: "verb",
    definitions: [
      "To cease to resist an opponent or an unwelcome demand; surrender.",
      "To yield under agreed conditions."
    ],
    synonyms: ["surrender", "yield", "concede", "succumb", "relent"],
    antonyms: ["resist", "withstand", "defy", "persevere"],
    examples: [
      "After a protracted siege with dwindling supplies, the garrison finally capitulated.",
      "The government refused to capitulate to the unreasonable ransom demands.",
      "He capitulated to fatigue after driving non-stop for sixteen hours and pulled over."
    ]
  },
  {
    word: "caustic",
    phonetic: "/ˈkɔː.stɪk/",
    pos: "adjective",
    definitions: [
      "Sarcastic in a scathing and bitter way.",
      "Able to burn or corrode organic tissue by chemical action."
    ],
    synonyms: ["sardonic", "scathing", "mordant", "corrosive", "trenchant"],
    antonyms: ["gentle", "complimentary", "soothing", "kind"],
    examples: [
      "The theater critic was infamous for her caustic reviews that could close a Broadway show in a weekend.",
      "He regretted his caustic comment the moment he saw the look on his colleague's face.",
      "Industrial cleaners must be handled with protective rubber gloves due to their caustic nature."
    ]
  },
  {
    word: "censure",
    phonetic: "/ˈsɛn.ʃər/",
    pos: "verb",
    definitions: [
      "To express severe disapproval of someone or something, typically in a formal statement.",
      "To condemn or reprimand officially."
    ],
    synonyms: ["condemn", "rebuke", "criticize", "chastise", "reprimand"],
    antonyms: ["commend", "praise", "applaud", "endorse"],
    examples: [
      "The medical board voted unanimously to censure the doctor for repeated ethical violations.",
      "Parliaments rarely vote to officially censure a cabinet minister unless wrongdoing is grave.",
      "His rash behavior brought public censure upon the entire diplomatic delegation."
    ]
  },
  {
    word: "charlatan",
    phonetic: "/ˈʃɑː.lə.tən/",
    pos: "noun",
    definitions: [
      "A person falsely claiming to have a special knowledge or skill; a fraud.",
      "A quack or imposter."
    ],
    synonyms: ["fraud", "impostor", "quack", "mountebank", "swindler"],
    antonyms: ["expert", "authority", "virtuoso", "professional"],
    examples: [
      "The so-called mystic was exposed as a charlatan using hidden ear pieces during readings.",
      "Caveat emptor: online health forums are occasionally infiltrated by charlatans peddling miracle cures.",
      "A true artisan delivers results; a charlatan merely promises them with grand rhetoric."
    ]
  },
  {
    word: "circumspect",
    phonetic: "/ˈsɜː.kəm.spɛkt/",
    pos: "adjective",
    definitions: [
      "Wary and unwilling to take risks; prudent.",
      "Careful to consider all circumstances and possible consequences."
    ],
    synonyms: ["prudent", "cautious", "wary", "guarded", "discreet"],
    antonyms: ["reckless", "imprudent", "rash", "audacious"],
    examples: [
      "In sensitive foreign diplomacy, ambassadors must remain circumspect in every public utterance.",
      "Her circumspect investment strategy preserved her retirement capital during the financial collapse.",
      "He was unusually circumspect when asked about his confidential meetings with the board."
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
    synonyms: ["covert", "surreptitious", "secret", "stealthy", "undercover"],
    antonyms: ["overt", "open", "public", "conspicuous"],
    examples: [
      "The intelligence operatives held clandestine meetings in a deserted warehouse by the docks.",
      "They carried on a clandestine correspondence across rival factions during the conflict.",
      "The regulatory agency launched a probe into the bank's clandestine offshore accounts."
    ]
  },
  {
    word: "coalesce",
    phonetic: "/koʊ.əˈlɛs/",
    pos: "verb",
    definitions: [
      "To come together and form one mass or whole.",
      "To combine elements from different sources into a unified system."
    ],
    synonyms: ["merge", "unite", "fuse", "amalgamate", "blend"],
    antonyms: ["separate", "disperse", "dissolve", "bifurcate"],
    examples: [
      "Independent activist groups coalesced into a powerful nationwide movement.",
      "Tiny droplets on the condensation pane slowly coalesced into heavy streams of water.",
      "Over centuries of trade, varied cultural dialects coalesced into a versatile lingua franca."
    ]
  },
  {
    word: "cogent",
    phonetic: "/ˈkoʊ.dʒənt/",
    pos: "adjective",
    definitions: [
      "Clear, logical, and convincing in argument or reasoning.",
      "Appealing powerfully to the intellect or reason."
    ],
    synonyms: ["compelling", "persuasive", "lucid", "forceful", "coherent"],
    antonyms: ["unconvincing", "muddled", "weak", "flawed"],
    examples: [
      "The attorney presented a cogent closing argument that dismantled the plaintiff's timeline.",
      "Her editorial offered the most cogent critique yet published of the municipal budget plan.",
      "Even skeptics admitted that the scientist's peer-reviewed paper was exceptionally cogent."
    ]
  },
  {
    word: "commensurate",
    phonetic: "/kəˈmɛn.ʃər.ət/",
    pos: "adjective",
    definitions: [
      "Corresponding in size, extent, amount, or degree; proportionate.",
      "Having a common measure."
    ],
    synonyms: ["proportionate", "equivalent", "corresponding", "comparable", "aligned"],
    antonyms: ["disproportionate", "incommensurate", "unequal", "unaligned"],
    examples: [
      "Salaries in the new tech research lab are commensurate with applicants' years of experience.",
      "The punishment handed down by the sports federation was deemed commensurate with the offense.",
      "She demanded authority commensurate with her broad corporate responsibilities."
    ]
  },
  {
    word: "complacent",
    phonetic: "/kəmˈpleɪ.sənt/",
    pos: "adjective",
    definitions: [
      "Showing smug or uncritical satisfaction with oneself or one's achievements.",
      "Overly self-satisfied, often unaware of impending danger or deficiency."
    ],
    synonyms: ["smug", "self-satisfied", "unconcerned", "apathetic", "content"],
    antonyms: ["vigilant", "proactive", "diligent", "concerned"],
    examples: [
      "After five consecutive championships, the team became complacent and lost to an underdog.",
      "We cannot afford to grow complacent about airport security regulations.",
      "His complacent attitude toward studying led to a disappointing score on the licensing exam."
    ]
  },
  {
    word: "conciliatory",
    phonetic: "/kənˈsɪl.i.ə.tər.i/",
    pos: "adjective",
    definitions: [
      "Intended or likely to placate or pacify.",
      "Seeking peace and cooperation over hostility."
    ],
    synonyms: ["appeasing", "pacifying", "placating", "mollifying", "peaceable"],
    antonyms: ["antagonistic", "provocative", "belligerent", "defiant"],
    examples: [
      "The prime minister struck a conciliatory tone during his address to striking rail workers.",
      "A conciliatory gift was delivered to the neighboring monarch to avert impending war.",
      "Her conciliatory approach resolved the domestic dispute without lingering animosity."
    ]
  },
  {
    word: "condone",
    phonetic: "/kənˈdoʊn/",
    pos: "verb",
    definitions: [
      "To accept and allow behavior that is considered morally wrong or offensive to continue.",
      "To overlook or forgive an infraction."
    ],
    synonyms: ["overlook", "pardon", "tolerate", "excuse", "sanction"],
    antonyms: ["condemn", "forbid", "prohibit", "censure"],
    examples: [
      "The university ethics committee made it clear that they do not condone academic plagiarism in any form.",
      "By remaining silent during the incident, bystanders appeared to condone the bully's actions.",
      "Forgiving a friend's mistake does not mean you condone the damage it caused."
    ]
  },
  {
    word: "conspicuous",
    phonetic: "/kənˈspɪk.ju.əs/",
    pos: "adjective",
    definitions: [
      "Standing out so as to be clearly visible.",
      "Attracting notice or attention."
    ],
    synonyms: ["noticeable", "prominent", "evident", "obvious", "salient"],
    antonyms: ["inconspicuous", "obscure", "hidden", "unobtrusive"],
    examples: [
      "Her bright yellow raincoat made her conspicuous among the crowd of dark umbrellas.",
      "The missing audit report was conspicuous by its absence from the boardroom table.",
      "He showed conspicuous courage when he dashed into the smoke-filled barn to save the livestock."
    ]
  },
  {
    word: "contentious",
    phonetic: "/kənˈtɛn.ʃəs/",
    pos: "adjective",
    definitions: [
      "Causing or likely to cause an argument; controversial.",
      "Given to arguing or provoking dispute."
    ],
    synonyms: ["controversial", "disputed", "quarrelsome", "combative", "polemical"],
    antonyms: ["uncontroversial", "agreeable", "peaceful", "harmonious"],
    examples: [
      "Zoning laws for affordable housing remain a contentious issue across urban communities.",
      "The board meeting turned contentious when budget cuts to arts programming were proposed.",
      "He was known for his contentious personality, picking debates on trivial semantic points."
    ]
  },
  {
    word: "contrite",
    phonetic: "/kənˈtraɪt/",
    pos: "adjective",
    definitions: [
      "Feeling or expressing remorse at the recognition that one has done wrong.",
      "Humbled by the consciousness of guilt."
    ],
    synonyms: ["penitent", "remorseful", "repentant", "apologetic", "chastened"],
    antonyms: ["unrepentant", "defiant", "impenitent", "shameless"],
    examples: [
      "The contrite executive publicly apologized and pledged his annual bonus to the cleanup fund.",
      "Her contrite letter of apology went a long way toward repairing the broken friendship.",
      "A contrite offender is often treated with greater leniency by judges during sentencing."
    ]
  },
  {
    word: "copious",
    phonetic: "/ˈkoʊ.pi.əs/",
    pos: "adjective",
    definitions: [
      "Abundant in supply or quantity.",
      "Full of information, words, or matter."
    ],
    synonyms: ["abundant", "plentiful", "profuse", "bountiful", "ample"],
    antonyms: ["sparse", "scanty", "meager", "dearth"],
    examples: [
      "She took copious notes throughout the three-day international cardiology seminar.",
      "After the spring rains, the vineyard produced a copious harvest of sweet red grapes.",
      "He drank copious amounts of cold water after running the summer marathon."
    ]
  },
  {
    word: "corroborate",
    phonetic: "/kəˈrɒb.ə.reɪt/",
    pos: "verb",
    definitions: [
      "To confirm or give support to a statement, theory, or finding.",
      "To verify through additional independent evidence."
    ],
    synonyms: ["confirm", "verify", "substantiate", "authenticate", "validate"],
    antonyms: ["contradict", "refute", "disprove", "undermine"],
    examples: [
      "Surveillance camera footage corroborated the security guard's account of the break-in.",
      "Two independent research labs were able to corroborate the discovery of the new superconductor.",
      "Without eyewitnesses to corroborate his alibi, the defendant faced a difficult defense."
    ]
  },
  {
    word: "craven",
    phonetic: "/ˈkreɪ.vən/",
    pos: "adjective",
    definitions: [
      "Contemptibly lacking in courage; cowardly.",
      "Pusillanimous; timid in the face of danger."
    ],
    synonyms: ["cowardly", "pusillanimous", "timorous", "spineless", "faint-hearted"],
    antonyms: ["brave", "valiant", "courageous", "intrepid"],
    examples: [
      "The general despised the craven officers who abandoned their posts while infantrymen held the line.",
      "Critics labeled the political party's refusal to debate as a craven retreat from public scrutiny.",
      "Leaving the scene of the accident was a craven act that rightfully drew severe legal penalties."
    ]
  },
  {
    word: "cryptic",
    phonetic: "/ˈkrɪp.tɪk/",
    pos: "adjective",
    definitions: [
      "Having a meaning that is mysterious or obscure.",
      "Serving to conceal; coded or secret."
    ],
    synonyms: ["enigmatic", "mysterious", "abstruse", "obscure", "perplexing"],
    antonyms: ["clear", "explicit", "straightforward", "lucid"],
    examples: [
      "Before vanishing, the explorer left behind a cryptic message scrawled across his travel journal.",
      "The treasure map was marked with cryptic symbols that baffled even seasoned cryptographers.",
      "Her cryptic smile suggested she already knew who would win the prestigious fellowship."
    ]
  },
  {
    word: "cursory",
    phonetic: "/ˈkɜː.sər.i/",
    pos: "adjective",
    definitions: [
      "Hasty and therefore not thorough or detailed.",
      "Rapidly performed without close attention."
    ],
    synonyms: ["perfunctory", "hasty", "superficial", "fleeting", "brief"],
    antonyms: ["thorough", "exhaustive", "meticulous", "in-depth"],
    examples: [
      "A cursory glance at the financial statements revealed several obvious accounting discrepancies.",
      "He gave the contract only a cursory inspection before signing, an oversight he soon came to regret.",
      "The border guard conducted a cursory check of vehicle trunks before waving traffic through."
    ]
  },
  {
    word: "dauntless",
    phonetic: "/ˈdɔːnt.ləs/",
    pos: "adjective",
    definitions: [
      "Showing determination and fearless resolve.",
      "Incapable of being discouraged or intimidated."
    ],
    synonyms: ["fearless", "intrepid", "unflinching", "valiant", "resolute"],
    antonyms: ["timid", "fearful", "craven", "daunted"],
    examples: [
      "The dauntless firefighters braved collapsing timber beams to rescue residents trapped upstairs.",
      "History remembers the early polar explorers for their dauntless spirit against brutal elements.",
      "With dauntless optimism, she launched her clean energy venture in the middle of a recession."
    ]
  },
  {
    word: "dearth",
    phonetic: "/dɜːθ/",
    pos: "noun",
    definitions: [
      "A scarcity or lack of something.",
      "An inadequate supply; famine."
    ],
    synonyms: ["scarcity", "shortage", "paucity", "deficiency", "famine"],
    antonyms: ["abundance", "plethora", "surfeit", "copiousness"],
    examples: [
      "A severe dearth of clean drinking water plagued the earthquake-ravaged province.",
      "The startup struggled initially due to a dearth of experienced senior engineers in the region.",
      "Despite the dearth of physical clues, the detective managed to solve the cold case."
    ]
  },
  {
    word: "debacle",
    phonetic: "/deɪˈbɑː.kəl/",
    pos: "noun",
    definitions: [
      "A sudden and ignominious failure; a complete fiasco.",
      "A chaotic collapse or disastrous defeat."
    ],
    synonyms: ["fiasco", "catastrophe", "disaster", "collapse", "ruin"],
    antonyms: ["triumph", "success", "victory", "masterpiece"],
    examples: [
      "The music festival turned into a logistical debacle when torrential rain flooded the campgrounds.",
      "Faulty software updates led to an airline scheduling debacle that stranded tens of thousands of travelers.",
      "The military retreat transformed into a chaotic debacle as supply lines were severed."
    ]
  },
  {
    word: "deference",
    phonetic: "/ˈdɛf.ər.əns/",
    pos: "noun",
    definitions: [
      "Polite submission and respect.",
      "Courteous regard for another's feelings, wishes, or authority."
    ],
    synonyms: ["respect", "reverence", "veneration", "obeisance", "homage"],
    antonyms: ["disrespect", "insolence", "contempt", "defiance"],
    examples: [
      "In deference to the grieving family, reporters refrained from asking questions at the memorial.",
      "The junior researchers treated the Nobel laureate with quiet, respectful deference.",
      "Out of deference to local custom, visitors removed their footwear before entering the temple."
    ]
  },
  {
    word: "deleterious",
    phonetic: "/ˌdɛl.ɪˈtɪər.i.əs/",
    pos: "adjective",
    definitions: [
      "Causing harm or damage.",
      "Injurious to living beings or moral welfare."
    ],
    synonyms: ["harmful", "detrimental", "injurious", "pernicious", "damaging"],
    antonyms: ["beneficial", "salutary", "advantageous", "helpful"],
    examples: [
      "Prolonged exposure to chronic stress has deeply deleterious effects on cardiovascular health.",
      "The chemical runoff caused deleterious consequences for biodiversity downstream in the river.",
      "Social media addiction has a documented deleterious impact on teenagers' sleep cycles."
    ]
  },
  {
    word: "delineate",
    phonetic: "/dɪˈlɪn.i.eɪt/",
    pos: "verb",
    definitions: [
      "To describe or portray something precisely.",
      "To trace the outline of a boundary or form."
    ],
    synonyms: ["describe", "outline", "depict", "chart", "demarcate"],
    antonyms: ["confuse", "distort", "muddle", "obscure"],
    examples: [
      "The treaty clearly delineated the nautical boundary dividing the two archipelagos.",
      "In her opening statement, the architect delineated the three phases of the museum renovation.",
      "The author skillfully delineated the psychological contrast between the two rival brothers."
    ]
  },
  {
    word: "demagogue",
    phonetic: "/ˈdɛm.ə.ɡɒɡ/",
    pos: "noun",
    definitions: [
      "A political leader who seeks support by appealing to popular desires and prejudices rather than by using rational argument.",
      "An orator who stirs up passions to gain power."
    ],
    synonyms: ["rabble-rouser", "firebrand", "agitator", "populist", "incendiary"],
    antonyms: ["statesman", "philosopher", "peacemaker", "moderator"],
    examples: [
      "History teaches that demagogues often rise to power in eras of deep economic insecurity.",
      "Rather than proposing concrete healthcare reform, the demagogue focused on scapegoating minorities.",
      "Constitutional checks and balances were created specifically to restrain charismatic demagogues."
    ]
  },
  {
    word: "deprecate",
    phonetic: "/ˈdɛp.rɪ.keɪt/",
    pos: "verb",
    definitions: [
      "To express disapproval of.",
      "To deplore or belittle."
    ],
    synonyms: ["disapprove", "deplore", "disparage", "belittle", "criticize"],
    antonyms: ["praise", "approve", "applaud", "endorse"],
    examples: [
      "Traditional critics deprecated the avant-garde artist's unconventional use of everyday scrap metal.",
      "He was known for self-deprecating humor that put nervous interviewees immediately at ease.",
      "Educators deprecate the practice of teaching solely for standardized multiple-choice tests."
    ]
  },
  {
    word: "deride",
    phonetic: "/dɪˈraɪd/",
    pos: "verb",
    definitions: [
      "To express contempt for; ridicule.",
      "To mock or jeer at someone or something."
    ],
    synonyms: ["mock", "ridicule", "scoff", "taunt", "disdain"],
    antonyms: ["praise", "revere", "respect", "honor"],
    examples: [
      "Early critics derided Impressionist paintings as crude, unfinished daubs of paint.",
      "It is unkind to deride someone who is making an earnest effort to speak a new language.",
      "The ambitious space mission, once derided as a fantasy, successfully landed on the asteroid."
    ]
  },
  {
    word: "desultory",
    phonetic: "/ˈdɛs.əl.tər.i/",
    pos: "adjective",
    definitions: [
      "Lacking a plan, purpose, or enthusiasm.",
      "Moving or jumping from one thing to another in a disconnected fashion."
    ],
    synonyms: ["aimless", "random", "haphazard", "discursive", "unfocused"],
    antonyms: ["systematic", "methodical", "focused", "purposeful"],
    examples: [
      "They engaged in desultory conversation about the weather while waiting for the delayed train.",
      "His desultory search through old cardboard boxes turned up high school yearbooks and broken clocks.",
      "A desultory study habit rarely yields mastery over complex mathematical concepts."
    ]
  },
  {
    word: "diatribe",
    phonetic: "/ˈdaɪ.ə.traɪb/",
    pos: "noun",
    definitions: [
      "A forceful and bitter verbal attack against someone or something.",
      "A prolonged discourse characterized by virulent criticism."
    ],
    synonyms: ["tirade", "harangue", "invective", "screed", "denunciation"],
    antonyms: ["eulogy", "panegyric", "commendation", "tribute"],
    examples: [
      "The newspaper published a blistering diatribe against corruption in local politics.",
      "Frustrated by the delays, the commuter launched into an angry diatribe at the ticket counter.",
      "Her speech was not a constructive debate, but an emotional diatribe against her opponents."
    ]
  },
  {
    word: "didactic",
    phonetic: "/daɪˈdæk.tɪk/",
    pos: "adjective",
    definitions: [
      "Intended to teach, particularly in having moral instruction as an ulterior motive.",
      "Treating a subject with pedagogical mannerisms, often perceived as patronizing."
    ],
    synonyms: ["instructive", "pedagogical", "moralizing", "educational", "preachy"],
    antonyms: ["uninstructive", "frivolous", "entertaining", "non-educational"],
    examples: [
      "Fables traditionally have a didactic purpose, illustrating moral principles through animal allegories.",
      "The novel was criticized for being too didactic, prioritizing moral preaching over character development.",
      "Her didactic lectures combined rigorous scientific theory with engaging real-world case studies."
    ]
  },
  {
    word: "diffident",
    phonetic: "/ˈdɪf.ɪ.dənt/",
    pos: "adjective",
    definitions: [
      "Modest or shy because of a lack of self-confidence.",
      "Hesitant to assert oneself."
    ],
    synonyms: ["shy", "modest", "reticent", "timid", "unassuming"],
    antonyms: ["confident", "assertive", "bold", "presumptuous"],
    examples: [
      "Beneath his diffident exterior lay a remarkably incisive and creative software engineer.",
      "She was too diffident to volunteer for the school play, despite possessing a lovely singing voice.",
      "With warm encouragement from her mentor, the diffident researcher began publishing her findings."
    ]
  },
  {
    word: "disabuse",
    phonetic: "/ˌdɪs.əˈbjuːz/",
    pos: "verb",
    definitions: [
      "To persuade someone that an idea or belief is mistaken.",
      "To free someone from deception or error."
    ],
    synonyms: ["undeceive", "disillusion", "correct", "enlighten", "set straight"],
    antonyms: ["deceive", "delude", "mislead", "dupe"],
    examples: [
      "I quickly disabused him of the notion that running a small vineyard was a relaxing retirement hobby.",
      "The historical documents disabused scholars of several romanticized myths regarding the founding era.",
      "A trip to the factory floor will disabuse any investor of simplistic assumptions about manufacturing."
    ]
  },
  {
    word: "disparate",
    phonetic: "/ˈdɪs.pər.ət/",
    pos: "adjective",
    definitions: [
      "Essentially different in kind; not allowing comparison.",
      "Containing elements very different from one another."
    ],
    synonyms: ["divergent", "dissimilar", "contrasting", "heterogeneous", "incomparable"],
    antonyms: ["similar", "homogeneous", "uniform", "identical"],
    examples: [
      "The multidisciplinary conference brought together scientists from wildly disparate research fields.",
      "The album weaves together disparate musical genres, fusing Appalachian folk with ambient electronica.",
      "Despite their disparate backgrounds and political perspectives, the committee members reached consensus."
    ]
  },
  {
    word: "dissemble",
    phonetic: "/dɪˈsɛm.bəl/",
    pos: "verb",
    definitions: [
      "To conceal one's true motives, feelings, or beliefs.",
      "To disguise or give a false appearance to something."
    ],
    synonyms: ["dissimulate", "feign", "masquerade", "camouflage", "conceal"],
    antonyms: ["reveal", "disclose", "confess", "expose"],
    examples: [
      "An honest politician should communicate clearly with voters rather than dissemble behind evasive soundbites.",
      "She dissembled her jealousy by smiling broadly and congratulating her rival on the promotion.",
      "A skilled poker player must learn to dissemble emotion under extreme financial pressure."
    ]
  },
  {
    word: "dogmatic",
    phonetic: "/dɒɡˈmæt.ɪk/",
    pos: "adjective",
    definitions: [
      "Inclined to lay down principles as incontrovertibly true.",
      "Characterized by assertive arrogance regarding opinions."
    ],
    synonyms: ["doctrinaire", "opinionated", "assertive", "inflexible", "authoritarian"],
    antonyms: ["open-minded", "flexible", "pragmatic", "skeptical"],
    examples: [
      "His dogmatic refusal to reconsider outdated coding frameworks stalled the entire development team.",
      "Science thrives on healthy empirical scrutiny, not dogmatic adherence to sacred theories.",
      "She held dogmatic views on punctuation and refused to read essays that used the Oxford comma."
    ]
  },
  {
    word: "ebullient",
    phonetic: "/ɪˈbʊl.i.ənt/",
    pos: "adjective",
    definitions: [
      "Cheerful and full of energy; exuberant.",
      "Bubbling or boiling over with enthusiasm."
    ],
    synonyms: ["exuberant", "buoyant", "effervescent", "vivacious", "joyful"],
    antonyms: ["depressed", "morose", "somber", "subdued"],
    examples: [
      "The ebullient crowd poured into the streets celebrating the national soccer championship.",
      "Her ebullient personality made her a favorite host on morning public radio broadcasts.",
      "Even after a grueling marathon, the winning runner wore an ebullient smile on the podium."
    ]
  },
  {
    word: "eclectic",
    phonetic: "/ɪˈklɛk.tɪk/",
    pos: "adjective",
    definitions: [
      "Deriving ideas, style, or taste from a broad and diverse range of sources.",
      "Composed of elements chosen from various doctrines or systems."
    ],
    synonyms: ["diverse", "catholic", "varied", "heterogeneous", "multifaceted"],
    antonyms: ["uniform", "monolithic", "parochial", "narrow"],
    examples: [
      "Her apartment was an eclectic sanctuary of Moroccan rugs, mid-century furniture, and indie vinyl records.",
      "He had an eclectic appetite for reading, moving easily from astrophysics journals to medieval poetry.",
      "The festival offered an eclectic culinary lineup featuring street cuisine from forty different nations."
    ]
  },
  {
    word: "efficacy",
    phonetic: "/ˈɛf.ɪ.kə.si/",
    pos: "noun",
    definitions: [
      "The ability to produce a desired or intended result.",
      "Capacity for beneficial effectiveness."
    ],
    synonyms: ["effectiveness", "potency", "usefulness", "fruitfulness", "success"],
    antonyms: ["inefficacy", "futility", "impotence", "uselessness"],
    examples: [
      "Clinical trials demonstrated the vaccine's high efficacy against severe viral symptoms.",
      "The board questioned the efficacy of massive billboard advertising in an era dominated by mobile media.",
      "Years of meditation practice enhanced her emotional stability and work efficacy."
    ]
  },
  {
    word: "effrontery",
    phonetic: "/ɪˈfrʌn.tər.i/",
    pos: "noun",
    definitions: [
      "Insolent or impertinent behavior; unblushing audacity.",
      "Shameless boldness."
    ],
    synonyms: ["audacity", "temerity", "impudence", "gall", "presumption"],
    antonyms: ["timidity", "deference", "respect", "modesty"],
    examples: [
      "He had the effrontery to demand a promotion just weeks after botching a major company account.",
      "The audience gasped at the defense attorney's effrontery in shouting down the presiding magistrate.",
      "Such brazen effrontery was typical of the swindler, who acted as though he were the injured party."
    ]
  },
  {
    word: "egregious",
    phonetic: "/ɪˈɡriː.dʒəs/",
    pos: "adjective",
    definitions: [
      "Outstandingly bad; shocking.",
      "Conspicuously and outrageously reprehensible."
    ],
    synonyms: ["flagrant", "glaring", "shocking", "appalling", "atrocious"],
    antonyms: ["minor", "forgivable", "unobjectionable", "slight"],
    examples: [
      "The accountant was dismissed immediately after an egregious error in tax calculations was discovered.",
      "Publishing unverified private medical records was deemed an egregious breach of journalistic ethics.",
      "The referee overlooked an egregious foul that occurred right inside the penalty box."
    ]
  },
  {
    word: "elucidate",
    phonetic: "/ɪˈluː.sɪ.deɪt/",
    pos: "verb",
    definitions: [
      "To make something clear; explain.",
      "To shed light upon a complex problem."
    ],
    synonyms: ["clarify", "illuminate", "explain", "explicate", "demystify"],
    antonyms: ["obfuscate", "confuse", "cloud", "muddle"],
    examples: [
      "The keynote speaker used colorful diagrams to elucidate the mechanics of climate feedback loops.",
      "A brief footnote in chapter four elucidates the obscure historical allusion.",
      "Further forensic testing will help elucidate the sequence of events on the night of the fire."
    ]
  },
  {
    word: "empirical",
    phonetic: "/ɪmˈpɪr.ɪ.kəl/",
    pos: "adjective",
    definitions: [
      "Based on, concerned with, or verifiable by observation or experience rather than theory or pure logic.",
      "Relying on practical experiment."
    ],
    synonyms: ["experiential", "observed", "factual", "experimental", "verifiable"],
    antonyms: ["theoretical", "hypothetical", "speculative", "abstract"],
    examples: [
      "Philosophical hypotheses must ultimately be tested against rigorous empirical data.",
      "The economist presented empirical evidence showing that vocational training reduced youth unemployment.",
      "Her claims sounded intuitive, but they lacked any empirical validation from controlled studies."
    ]
  },
  {
    word: "enervate",
    phonetic: "/ˈɛn.ər.veɪt/",
    pos: "verb",
    definitions: [
      "To cause someone to feel drained of energy or vitality; weaken.",
      "To diminish the physical or mental vigor of something."
    ],
    synonyms: ["exhaust", "debilitate", "drain", "weaken", "fatigue"],
    antonyms: ["invigorate", "energize", "strengthen", "vitalize"],
    examples: [
      "The oppressive tropical humidity enervated the visiting marathon runners within forty minutes.",
      "Months of bitter infighting enervated the political party just before election season.",
      "Heavy, carb-dense lunches tend to enervate office workers in the early afternoon."
    ]
  },
  {
    word: "engender",
    phonetic: "/ɪnˈdʒɛn.dər/",
    pos: "verb",
    definitions: [
      "To cause or give rise to a feeling, situation, or condition.",
      "To bring into existence; produce."
    ],
    synonyms: ["generate", "provoke", "foster", "inspire", "precipitate"],
    antonyms: ["quell", "extinguish", "suppress", "destroy"],
    examples: [
      "Transparent governance engenders trust between public officials and local citizens.",
      "The unfair grading curve engendered intense resentment among the graduate students.",
      "A warm and supportive classroom environment engenders creative intellectual curiosity."
    ]
  },
  {
    word: "enigmatic",
    phonetic: "/ˌɛn.ɪɡˈmæt.ɪk/",
    pos: "adjective",
    definitions: [
      "Difficult to interpret or understand; mysterious.",
      "Resembling an enigma or riddle."
    ],
    synonyms: ["mysterious", "puzzling", "cryptic", "inscrutable", "perplexing"],
    antonyms: ["transparent", "straightforward", "clear", "unambiguous"],
    examples: [
      "The Mona Lisa is world-renowned for the subject's subtly enigmatic smile.",
      "The author remained an enigmatic figure, living in secluded isolation and never giving interviews.",
      "His enigmatic text message left us guessing where the anniversary party would be hosted."
    ]
  },
  {
    word: "ennui",
    phonetic: "/ɒnˈwiː/",
    pos: "noun",
    definitions: [
      "A feeling of listlessness and dissatisfaction arising from a lack of occupation or excitement.",
      "Profound boredom resulting from satiety or inaction."
    ],
    synonyms: ["boredom", "tedium", "listlessness", "weariness", "lethargy"],
    antonyms: ["enthusiasm", "excitement", "vivacity", "energy"],
    examples: [
      "Despite his vast fortune, he was plagued by a perpetual ennui that luxury could not dispel.",
      "The endless rainy weekends in winter produced an unbearable ennui among the boarding school students.",
      "Nineteenth-century Romantic poets frequently celebrated bittersweet melancholy and bourgeois ennui."
    ]
  },
  {
    word: "epigram",
    phonetic: "/ˈɛp.ɪ.ɡræm/",
    pos: "noun",
    definitions: [
      "A pithy saying or remark expressing an idea in a clever and amusing way.",
      "A short, satirical poem with an ingenious ending."
    ],
    synonyms: ["aphorism", "witticism", "maxim", "quip", "bon mot"],
    antonyms: ["platitude", "tirade", "screed", "monologue"],
    examples: [
      "Oscar Wilde was celebrated for brilliant epigrams that cleverly subverted Victorian pomposity.",
      "The poet prefaced each chapter of his memoir with a poignant epigram about fleeting youth.",
      "With a single sharp epigram, she summarized the vanity and futility of the entire campaign."
    ]
  },
  {
    word: "epitome",
    phonetic: "/ɪˈpɪt.ə.mi/",
    pos: "noun",
    definitions: [
      "A person or thing that is a perfect example of a particular quality or type.",
      "A summary of a written work; an abstract."
    ],
    synonyms: ["embodiment", "archetype", "quintessence", "paragon", "exemplar"],
    antonyms: ["anomaly", "antithesis", "exception", "deviation"],
    examples: [
      "With her dignified grace and razor-sharp intellect, the jurist was the epitome of judicial integrity.",
      "The classic roadster was considered the design epitome of mid-century Italian automotive craftsmanship.",
      "His chaotic kitchen was the epitome of culinary disorganization, yet he produced magnificent feasts."
    ]
  },
  {
    word: "equanimity",
    phonetic: "/ˌɛk.wəˈnɪm.ɪ.ti/",
    pos: "noun",
    definitions: [
      "Mental calmness, composure, and evenness of temper, especially in a difficult situation.",
      "Steadiness of mind under stress."
    ],
    synonyms: ["composure", "serenity", "sangfroid", "aplomb", "tranquility"],
    antonyms: ["anxiety", "agitation", "perturbation", "hysteria"],
    examples: [
      "The veteran airline captain handled the mid-flight engine failure with absolute equanimity.",
      "She faced harsh political criticism with an enviable equanimity, never replying in anger.",
      "Years of mindfulness training taught the surgeon to maintain inner equanimity during emergencies."
    ]
  },
  {
    word: "equivocate",
    phonetic: "/ɪˈkwɪv.ə.keɪt/",
    pos: "verb",
    definitions: [
      "To use ambiguous language so as to conceal the truth or avoid committing oneself.",
      "To hedge or speak evasively."
    ],
    synonyms: ["prevaricate", "hedge", "vacillate", "waffle", "evade"],
    antonyms: ["confront", "clarify", "speak frankly", "commit"],
    examples: [
      "When pressed on tax hikes, the candidate equivocated and redirected the conversation to job creation.",
      "A trustworthy advisor should give direct counsel rather than equivocate to protect feelings.",
      "The spokesperson equivocated for fifteen minutes before finally admitting the data breach occurred."
    ]
  },
  {
    word: "erudite",
    phonetic: "/ˈɛr.ʊ.daɪt/",
    pos: "adjective",
    definitions: [
      "Having or showing great knowledge or learning.",
      "Cultivated through extensive scholarly reading and study."
    ],
    synonyms: ["scholarly", "learned", "intellectual", "lettered", "pedantic"],
    antonyms: ["ignorant", "illiterate", "unscholarly", "naive"],
    examples: [
      "The professor's erudite analysis of Byzantine mosaics drew art historians from across Europe.",
      "He was that rare erudite conversationalist who wore his vast learning lightly and without pretense.",
      "The quarterly review is renowned for publishing erudite essays on literature and philosophy."
    ]
  },
  {
    word: "eulogy",
    phonetic: "/ˈjuː.lə.dʒi/",
    pos: "noun",
    definitions: [
      "A speech or piece of writing that praises someone or something highly, typically someone who has just died.",
      "High praise or commendation."
    ],
    synonyms: ["panegyric", "tribute", "paean", "accolade", "homage"],
    antonyms: ["diatribe", "condemnation", "invective", "denunciation"],
    examples: [
      "Her heartfelt eulogy brought both laughter and tears to the packed cathedral.",
      "The retired general delivered a moving eulogy honoring the fallen soldiers of the airborne division.",
      "The literary journal published a glowing eulogy celebrating the centenary of the poet's birth."
    ]
  },
  {
    word: "euphemism",
    phonetic: "/ˈjuː.fə.mɪ.zəm/",
    pos: "noun",
    definitions: [
      "A mild or indirect word or expression substituted for one considered to be too harsh or blunt.",
      "Polite phrasing designed to soften an unpleasant reality."
    ],
    synonyms: ["polite term", "substitute", "understatement", "circumlocution", "softening"],
    antonyms: ["bluntness", "dysphemism", "harshness", "candor"],
    examples: [
      "Corporations frequently use 'restructuring' as a euphemism for massive workforce layoffs.",
      "'Passed away' is one of the most widely used euphemisms for death across the English-speaking world.",
      "Military communiqués often employ antiseptic euphemisms like 'collateral damage' for civilian casualties."
    ]
  },
  {
    word: "exacerbate",
    phonetic: "/ɪɡˈzæs.ər.beɪt/",
    pos: "verb",
    definitions: [
      "To make a problem, bad situation, or negative feeling worse.",
      "To increase the severity or bitterness of something."
    ],
    synonyms: ["aggravate", "worsen", "compound", "inflame", "intensify"],
    antonyms: ["ameliorate", "alleviate", "mitigate", "soothe"],
    examples: [
      "Cutting library hours will only exacerbate educational inequality in underfunded neighborhoods.",
      "Applying cold ice directly to an open burn can exacerbate tissue damage instead of soothing it.",
      "His arrogant response during the press conference only exacerbated public fury."
    ]
  },
  {
    word: "exculpate",
    phonetic: "/ˈɛk.skʌl.peɪt/",
    pos: "verb",
    definitions: [
      "To show or declare that someone is not guilty of wrongdoing.",
      "To clear from alleged fault or guilt."
    ],
    synonyms: ["exonerate", "absolve", "acquit", "vindicate", "clear"],
    antonyms: ["incriminate", "blame", "convict", "implicate"],
    examples: [
      "New DNA evidence presented by the defense completely exculpated the wrongly imprisoned man.",
      "The independent auditor's report exculpated the chief financial officer of any fraudulent intent.",
      "Witness testimony helped exculpate the young driver from blame in the multi-car collision."
    ]
  },
  {
    word: "exemplary",
    phonetic: "/ɪɡˈzɛm.plər.i/",
    pos: "adjective",
    definitions: [
      "Serving as a desirable model; representing the best of its kind.",
      "Serving as a warning or deterrent."
    ],
    synonyms: ["model", "commendable", "praiseworthy", "flawless", "sterling"],
    antonyms: ["deplorable", "reprehensible", "substandard", "shoddy"],
    examples: [
      "The hospital staff received an award for their exemplary handling of the viral outbreak.",
      "Throughout her thirty-year career on the bench, the judge maintained an exemplary record of fairness.",
      "The court handed down an exemplary sentence to deter similar corporate insider trading."
    ]
  },
  {
    word: "exonerate",
    phonetic: "/ɪɡˈzɒn.ə.reɪt/",
    pos: "verb",
    definitions: [
      "To officially absolve from blame for a fault or wrongdoing.",
      "To release someone from a duty or obligation."
    ],
    synonyms: ["acquit", "absolve", "exculpate", "vindicate", "discharge"],
    antonyms: ["convict", "condemn", "incriminate", "punish"],
    examples: [
      "After decades of wrongful imprisonment, archival records finally exonerated the veteran.",
      "The inquiry exonerated the bridge engineers, attributing the collapse to unprecedented seismic tremors.",
      "He was exonerated of all wrongdoing following an exhaustive three-month internal investigation."
    ]
  },
  {
    word: "extol",
    phonetic: "/ɪkˈstoʊl/",
    pos: "verb",
    definitions: [
      "To praise enthusiastically and lavishly.",
      "To glorify or laud."
    ],
    synonyms: ["praise", "laud", "acclaim", "eulogize", "magnify"],
    antonyms: ["criticize", "denounce", "deride", "disparage"],
    examples: [
      "Health professionals around the globe extol the nutritional benefits of the Mediterranean diet.",
      "The mayor extolled the volunteers whose tireless efforts rescued pets during the hurricane.",
      "Reviewers extolled the young cellist for her emotional maturity and technical precision."
    ]
  },
  {
    word: "fallacious",
    phonetic: "/fəˈleɪ.ʃəs/",
    pos: "adjective",
    definitions: [
      "Based on a mistaken belief or unsound reasoning.",
      "Deceptive or misleading in argument."
    ],
    synonyms: ["erroneous", "spurious", "flawed", "misleading", "delusive"],
    antonyms: ["sound", "valid", "verifiable", "true"],
    examples: [
      "The premise that higher prices automatically indicate superior craftsmanship is often fallacious.",
      "The debate moderator quickly called out the senator's fallacious slippery-slope argument.",
      "Scientific progress routinely dismantles fallacious assumptions held by earlier generations."
    ]
  },
  {
    word: "fastidious",
    phonetic: "/fæˈstɪd.i.əs/",
    pos: "adjective",
    definitions: [
      "Very attentive to and concerned about accuracy and detail.",
      "Very concerned about matters of cleanliness; hard to please."
    ],
    synonyms: ["meticulous", "scrupulous", "punctilious", "fussy", "perfectionist"],
    antonyms: ["sloppy", "careless", "lax", "undemanding"],
    examples: [
      "The watchmaker was fastidious about keeping microscopic dust specks out of the tourbillon movement.",
      "Known for his fastidious sartorial standards, he never appeared in public without a pressed pocket square.",
      "She was fastidious when editing translations, ensuring every subtle nuance was preserved."
    ]
  },
  {
    word: "fatuous",
    phonetic: "/ˈfætʃ.u.əs/",
    pos: "adjective",
    definitions: [
      "Silly and pointless; foolish.",
      "Smugly stupid or inane."
    ],
    synonyms: ["inane", "foolish", "silly", "vacuous", "asinine"],
    antonyms: ["sensible", "intelligent", "sagacious", "prudent"],
    examples: [
      "He offered a fatuous remark about the weather while the emergency sirens blared outside.",
      "The critic dismissed the thriller as an expensive, fatuous waste of world-class acting talent.",
      "She grew weary of fatuous celebrity gossip that dominated social media timelines."
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
    synonyms: ["fertile", "fruitful", "prolific", "generative", "inventive"],
    antonyms: ["barren", "sterile", "infertile", "unproductive"],
    examples: [
      "The river delta's fecund black soil produced three bountiful grain harvests every calendar year.",
      "The artist entered a remarkably fecund period, painting over forty large canvases in a single winter.",
      "Her fecund imagination gave birth to a fantastical world populated by hundreds of distinct mythologies."
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
    synonyms: ["fervent", "ardent", "passionate", "impassioned", "vehement"],
    antonyms: ["apathetic", "lukewarm", "indifferent", "cool"],
    examples: [
      "The candidate delivered a fervid speech that ignited the crowd of thousands into cheering unison.",
      "She had a fervid desire to preserve the endangered alpine cloud forests before they vanished.",
      "A fervid debate erupted in the town hall over the proposed preservation of historical landmarks."
    ]
  },
  {
    word: "fidelity",
    phonetic: "/fɪˈdɛl.ɪ.ti/",
    pos: "noun",
    definitions: [
      "Faithfulness to a person, cause, or belief, demonstrated by continuing loyalty and support.",
      "The degree of exactness with which something is copied or reproduced."
    ],
    synonyms: ["loyalty", "faithfulness", "allegiance", "accuracy", "constancy"],
    antonyms: ["disloyalty", "infidelity", "treachery", "inaccuracy"],
    examples: [
      "Throughout long years of exile, the general maintained unwavering fidelity to the constitutional republic.",
      "Audiophiles praised the turntable for its stunning acoustic fidelity and crystal-clear high frequencies.",
      "The film adaptation was lauded for its faithful fidelity to the author's original narrative vision."
    ]
  },
  {
    word: "florid",
    phonetic: "/ˈflɒr.ɪd/",
    pos: "adjective",
    definitions: [
      "Having a red or flushed complexion.",
      "Excessively intricate or elaborate in literary or musical style."
    ],
    synonyms: ["flushed", "ruddy", "ornate", "flowery", "baroque"],
    antonyms: ["pale", "pallid", "plain", "austere"],
    examples: [
      "The Victorian estate was decorated in a florid style featuring gilded moldings and heavy crimson velvet.",
      "After running five miles in the brisk morning chill, his face took on a healthy florid hue.",
      "Modern journalists avoid the florid prose style that was fashionable in nineteenth-century periodicals."
    ]
  },
  {
    word: "foment",
    phonetic: "/foʊˈmɛnt/",
    pos: "verb",
    definitions: [
      "To instigate or stir up an undesirable or violent sentiment or course of action.",
      "To foster or promote the growth of discord."
    ],
    synonyms: ["instigate", "incite", "provoke", "agitate", "stimulate"],
    antonyms: ["quell", "suppress", "calm", "soothe"],
    examples: [
      "Foreign state operatives used disinformation campaigns to foment political unrest ahead of the election.",
      "The radical pamphlet was confiscated because authorities feared it would foment rebellion among miners.",
      "A true diplomat works to ease tensions rather than foment regional animosities."
    ]
  },
  {
    word: "forbearance",
    phonetic: "/fɔːˈbɛə.rəns/",
    pos: "noun",
    definitions: [
      "Patient self-control; restraint and tolerance.",
      "The action of refraining from exercising a legal right, especially enforcing debt payment."
    ],
    synonyms: ["patience", "tolerance", "restraint", "clemency", "leniency"],
    antonyms: ["impatience", "intolerance", "vengeance", "retribution"],
    examples: [
      "The teacher showed admirable forbearance when dealing with a room of exhausted, restless toddlers.",
      "In a gesture of commercial forbearance, the bank extended the family farm's mortgage grace period.",
      "True leadership requires the forbearance to endure unfair criticism without retaliating in haste."
    ]
  },
  {
    word: "fortuitous",
    phonetic: "/fɔːˈtʃuː.ɪ.təs/",
    pos: "adjective",
    definitions: [
      "Happening by accident or chance rather than design.",
      "Happening by a lucky chance; fortunate."
    ],
    synonyms: ["serendipitous", "accidental", "lucky", "providential", "fluky"],
    antonyms: ["deliberate", "intentional", "calculated", "predictable"],
    examples: [
      "A fortuitous rain shower extinguished the brush fire just yards before it reached the historic village.",
      "Their meeting at the airport transit lounge was entirely fortuitous, yet it sparked a lifelong partnership.",
      "Finding an original print by the artist in an obscure antique shop was a fortuitous stroke of luck."
    ]
  },
  {
    word: "fractious",
    phonetic: "/ˈfræk.ʃəs/",
    pos: "adjective",
    definitions: [
      "Typically of children: irritable and quarrelsome.",
      "Difficult to control; unruly."
    ],
    synonyms: ["unruly", "peevish", "quarrelsome", "irritable", "petulant"],
    antonyms: ["docile", "affable", "tractable", "patient"],
    examples: [
      "The long delay at the gate left passengers increasingly fractious and impatient with flight attendants.",
      "Managing a fractious coalition of rival political parties tested the prime minister's patience daily.",
      "The weary mare grew fractious as the thunderstorm approached, kicking restlessly against the stall door."
    ]
  },
  {
    word: "frugal",
    phonetic: "/ˈfruː.ɡəl/",
    pos: "adjective",
    definitions: [
      "Sparing or economical with regard to money or food.",
      "Simple and plain and costing little."
    ],
    synonyms: ["thrifty", "economical", "sparing", "parsimonious", "austere"],
    antonyms: ["extravagant", "profligate", "wasteful", "lavish"],
    examples: [
      "Through a frugal lifestyle and disciplined investing, she was able to retire comfortably at age fifty.",
      "The monks shared a frugal meal of coarse brown bread, garden leeks, and spring water.",
      "He was frugal with his personal expenses, yet remarkably generous when funding local orphanages."
    ]
  },
  {
    word: "galvanize",
    phonetic: "/ˈɡæl.və.naɪz/",
    pos: "verb",
    definitions: [
      "To shock or excite someone into taking action.",
      "To coat iron or steel with a protective layer of zinc."
    ],
    synonyms: ["stimulate", "electrify", "inspire", "motivate", "rouse"],
    antonyms: ["demotivate", "enervate", "dampen", "discourage"],
    examples: [
      "The documentary on ocean plastic galvanized millions of viewers to eliminate single-use containers.",
      "An unexpected loss in the semifinals galvanized the team into redoubling their practice schedule.",
      "The mayor's passionate address galvanized local business owners to sponsor neighborhood youth centers."
    ]
  },
  {
    word: "garrulous",
    phonetic: "/ˈɡær.ə.ləs/",
    pos: "adjective",
    definitions: [
      "Excessively talkative, especially on trivial matters.",
      "Wordy and rambling in speech."
    ],
    synonyms: ["loquacious", "voluble", "verbose", "chatty", "long-winded"],
    antonyms: ["taciturn", "reticent", "laconic", "reserved"],
    examples: [
      "The garrulous cab driver gave us an unsolicited play-by-play of local city politics throughout the ride.",
      "A few glasses of wine transformed the usually quiet scholar into an amusingly garrulous storyteller.",
      "He avoided his garrulous neighbor whenever he was in a hurry to catch the morning train."
    ]
  },
  {
    word: "grandiose",
    phonetic: "/ˈɡræn.di.oʊs/",
    pos: "adjective",
    definitions: [
      "Impressive and imposing in appearance or style, especially pretentiously so.",
      "Characterized by excessive grandness or unrealistic ambition."
    ],
    synonyms: ["pretentious", "ostentatious", "pompous", "extravagant", "flamboyant"],
    antonyms: ["modest", "unpretentious", "understated", "humble"],
    examples: [
      "The dictator bankrupted the treasury constructing grandiose marble monuments to celebrate his reign.",
      "Her business partner always pitched grandiose global ventures while ignoring day-to-day cash flow.",
      "The ballroom featured grandiose chandeliers imported from Venetian glass studios."
    ]
  },
  {
    word: "gratuitous",
    phonetic: "/ɡrəˈtjuː.ɪ.təs/",
    pos: "adjective",
    definitions: [
      "Uncalled for; lacking good reason; unwarranted.",
      "Given or done free of charge."
    ],
    synonyms: ["unwarranted", "groundless", "needless", "unprovoked", "superfluous"],
    antonyms: ["necessary", "justified", "warranted", "earned"],
    examples: [
      "The movie was panned by reviewers for gratuitous explosions that contributed nothing to the plot.",
      "There was no excuse for his gratuitous insult directed at the waiter who brought the wrong order.",
      "The attorneys offered gratuitous legal counsel to families affected by the factory explosion."
    ]
  },
  {
    word: "hackneyed",
    phonetic: "/ˈhæk.nid/",
    pos: "adjective",
    definitions: [
      "Of a phrase or idea: lacking significance through having been overused; unoriginal and trite.",
      "Stale or clichéd through repetition."
    ],
    synonyms: ["clichéd", "trite", "platitudinous", "stale", "banal"],
    antonyms: ["fresh", "novel", "original", "innovative"],
    examples: [
      "The commencement speaker relied on hackneyed phrases like 'follow your dreams' and 'reach for the stars.'",
      "She rewrote the script to excise the hackneyed trope of the brooding detective with a secret past.",
      "A talented copywriter avoids hackneyed buzzwords that customers immediately tune out."
    ]
  },
  {
    word: "haughty",
    phonetic: "/ˈhɔː.ti/",
    pos: "adjective",
    definitions: [
      "Arrogantly superior and disdainful.",
      "Looking down on others with contemptuous pride."
    ],
    synonyms: ["supercilious", "arrogant", "disdainful", "condescending", "scornful"],
    antonyms: ["humble", "modest", "meek", "respectful"],
    examples: [
      "The haughty aristocrat swept past the waiting reporters without acknowledging their greetings.",
      "His haughty demeanor alienated his teammates, despite his obvious brilliance on the basketball court.",
      "She gave a haughty shrug when asked if she cared about public reaction to her comments."
    ]
  },
  {
    word: "hedonism",
    phonetic: "/ˈhɛd.ən.ɪ.zəm/",
    pos: "noun",
    definitions: [
      "The pursuit of pleasure and self-indulgence as a matter of ethical principle.",
      "Devotion to sensory delight."
    ],
    synonyms: ["sensualism", "self-indulgence", "voluptuousness", "epicureanism", "pleasure-seeking"],
    antonyms: ["asceticism", "abstinence", "sobriety", "puritanism"],
    examples: [
      "The ancient Cyrenaic philosophers advocated a refined form of hedonism as the highest human good.",
      "His youth was spent in carefree hedonism across the Mediterranean, funded by family trust funds.",
      "Critics argued the festival had devolved from artistic celebration into unchecked commercial hedonism."
    ]
  },
  {
    word: "iconoclast",
    phonetic: "/aɪˈkɒn.ə.klæst/",
    pos: "noun",
    definitions: [
      "A person who attacks cherished beliefs or institutions.",
      "A destroyer of images used in religious worship."
    ],
    synonyms: ["rebel", "dissident", "maverick", "nonconformist", "heretic"],
    antonyms: ["conformist", "traditionalist", "believer", "orthodox"],
    examples: [
      "The tech iconoclast disrupted the traditional taxi industry with a smartphone app and peer-to-peer drivers.",
      "Throughout her scientific career, she acted as an iconoclast, puncturing dogma that others accepted as fact.",
      "Art historians celebrated the sculptor as an iconoclast who dismantled neoclassical conventions."
    ]
  },
  {
    word: "idiosyncrasy",
    phonetic: "/ˌɪd.i.əˈsɪŋ.krə.si/",
    pos: "noun",
    definitions: [
      "A mode of behavior or way of thought peculiar to an individual.",
      "A distinctive or peculiar feature or characteristic."
    ],
    synonyms: ["eccentricity", "quirk", "mannerism", "peculiarity", "singularity"],
    antonyms: ["normality", "conformity", "standard", "commonality"],
    examples: [
      "One of the author's endearing idiosyncrasies was drafting all his novels exclusively in emerald green ink.",
      "Every vintage automobile engine has its own quirks and idiosyncrasies that only the owner understands.",
      "Her habit of whistling softly whenever solving complex algorithms was a well-known office idiosyncrasy."
    ]
  },
  {
    word: "ignominious",
    phonetic: "/ˌɪɡ.nəˈmɪn.i.əs/",
    pos: "adjective",
    definitions: [
      "Deserving or causing public disgrace or shame.",
      "Marked by humiliation or ignominy."
    ],
    synonyms: ["humiliating", "disgraceful", "shameful", "dishonorable", "inglorious"],
    antonyms: ["glorious", "triumphant", "honorable", "noble"],
    examples: [
      "The defending champions suffered an ignominious defeat in the opening round against a novice team.",
      "His political career came to an ignominious end after the financial embezzlement scandal broke.",
      "The battleship was spared the ignominious fate of the scrap yard and converted into a floating museum."
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
    synonyms: ["penniless", "destitute", "indigent", "impoverished", "insolvent"],
    antonyms: ["wealthy", "opulent", "affluent", "rich"],
    examples: [
      "As an impecunious medical student in Vienna, he survived on black coffee, boiled eggs, and secondhand books.",
      "The aristocratic family retained their ancestral castle, though they were privately quite impecunious.",
      "He dedicated his legal career to representing impecunious defendants in municipal courtrooms."
    ]
  },
  {
    word: "imperious",
    phonetic: "/ɪmˈpɪər.i.əs/",
    pos: "adjective",
    definitions: [
      "Assuming power or authority without justification; arrogant and domineering.",
      "Commanding, urgent, or imperative."
    ],
    synonyms: ["domineering", "overbearing", "dictatorial", "authoritarian", "imperious"],
    antonyms: ["humble", "meek", "submissive", "servile"],
    examples: [
      "With an imperious wave of her hand, the conductor silenced the chatting violinists instantly.",
      "His imperious management style created a culture of fear where employees hesitated to report errors.",
      "Hunger exerted an imperious claim that made the stranded hikers disregard their exhaustion."
    ]
  },
  {
    word: "impetuous",
    phonetic: "/ɪmˈpɛtʃ.u.əs/",
    pos: "adjective",
    definitions: [
      "Acting or done quickly and without thought or care.",
      "Moving forcefully or rapidly."
    ],
    synonyms: ["impulsive", "rash", "hasty", "reckless", "spontaneous"],
    antonyms: ["deliberate", "prudent", "circumspect", "cautious"],
    examples: [
      "In an impetuous moment, she booked a one-way ticket to Buenos Aires to learn tango.",
      "His impetuous decision to confront his manager in public cost him his position at the agency.",
      "The impetuous torrent of spring meltwater rushed through the canyon, washing away timber bridges."
    ]
  },
  {
    word: "implacable",
    phonetic: "/ɪmˈplæk.ə.bəl/",
    pos: "adjective",
    definitions: [
      "Unable to be placated or appeased.",
      "Relentless; unstoppable."
    ],
    synonyms: ["unyielding", "unappeasable", "relentless", "inexorable", "inflexible"],
    antonyms: ["pliable", "appeasable", "forgiving", "conciliatory"],
    examples: [
      "The environmentalist remained an implacable opponent of offshore oil drilling along the pristine coast.",
      "Ancient Greek tragedies often pitted mortal heroes against the implacable decrees of fate.",
      "He faced the implacable advance of time with stoic dignity and continued to write daily."
    ]
  },
  {
    word: "inchoate",
    phonetic: "/ɪnˈkoʊ.ət/",
    pos: "adjective",
    definitions: [
      "Just begun and so not fully formed or developed; rudimentary.",
      "Disorganized or chaotic in early stages."
    ],
    synonyms: ["rudimentary", "incipient", "nascent", "embryonic", "unformed"],
    antonyms: ["mature", "complete", "developed", "refined"],
    examples: [
      "At this stage, the startup's business plan is still an inchoate collection of creative brainstorming notes.",
      "She had an inchoate feeling of unease as she walked into the empty underground subway station.",
      "The inchoate rebellion lacked unified leadership, making it easy for the governor to negotiate peace."
    ]
  },
  {
    word: "incisive",
    phonetic: "/ɪnˈsaɪ.sɪv/",
    pos: "adjective",
    definitions: [
      "Intelligently analytical and clear-thinking.",
      "Accurately and sharply focused; cutting."
    ],
    synonyms: ["sharp", "penetrating", "keen", "acute", "trenchant"],
    antonyms: ["vague", "obtuse", "dull", "shallow"],
    examples: [
      "Her incisive critique of the proposed tax bill exposed several loopholes that had escaped notice.",
      "The journalist asked incisive questions that forced the spokesperson off his rehearsed talking points.",
      "With an incisive mind and dry humor, she cut through hours of circular boardroom debate."
    ]
  },
  {
    word: "indefatigable",
    phonetic: "/ˌɪn.dɪˈfæt.ɪ.ɡə.bəl/",
    pos: "adjective",
    definitions: [
      "Persisting tirelessly; incapable of being fatigued.",
      "Untiring in effort and resolve."
    ],
    synonyms: ["tireless", "untiring", "unflagging", "persistent", "relentless"],
    antonyms: ["lethargic", "weary", "slothful", "indolent"],
    examples: [
      "Through the indefatigable efforts of local volunteers, the entire neighborhood was cleared of flood debris.",
      "The veteran investigative reporter was indefatigable in tracking down financial paper trails.",
      "Her indefatigable energy inspired junior colleagues during late-night product launch sprints."
    ]
  },
  {
    word: "indolent",
    phonetic: "/ˈɪn.dəl.ənt/",
    pos: "adjective",
    definitions: [
      "Wanting to avoid activity or exertion; lazy.",
      "Causing little or no pain; slow to heal or grow."
    ],
    synonyms: ["lazy", "slothful", "lethargic", "inactive", "idle"],
    antonyms: ["industrious", "diligent", "assiduous", "energetic"],
    examples: [
      "They spent an indolent Sunday afternoon lounging in hammocks beneath the fragrant fig trees.",
      "His indolent attitude toward chores frequently drew exasperated scoldings from his roommates.",
      "The physician monitored the indolent skin lesion, which showed no signs of rapid progression."
    ]
  },
  {
    word: "ineffable",
    phonetic: "/ɪnˈɛf.ə.bəl/",
    pos: "adjective",
    definitions: [
      "Too great or extreme to be expressed or described in words.",
      "Not to be uttered, often for sacred reasons."
    ],
    synonyms: ["indescribable", "inexpressible", "transcendent", "unutterable", "sublime"],
    antonyms: ["definable", "expressible", "mundane", "describable"],
    examples: [
      "Standing on the rim of the canyon at sunrise, they were overcome by an ineffable sense of awe.",
      "The profound grief she felt after the tragedy was ineffable, beyond the reach of sympathy cards.",
      "Classical mystic poets sought to capture the ineffable connection between the soul and the cosmos."
    ]
  },
  {
    word: "inexorable",
    phonetic: "/ɪnˈɛk.sər.ə.bəl/",
    pos: "adjective",
    definitions: [
      "Impossible to stop or prevent.",
      "Impossible to persuade by request or entreaty; unyielding."
    ],
    synonyms: ["relentless", "unstoppable", "unavoidable", "implacable", "inflexible"],
    antonyms: ["flexible", "yielding", "preventable", "lenient"],
    examples: [
      "Coastal villages must adapt to the inexorable rise of sea levels over the coming century.",
      "The detective pursued the truth with an inexorable determination that left no suspect unexamined.",
      "No amount of wealth or medicine can halt the inexorable biological march of human aging."
    ]
  },
  {
    word: "ingenuous",
    phonetic: "/ɪnˈdʒɛn.ju.əs/",
    pos: "adjective",
    definitions: [
      "Innocent, unsuspecting, and openly sincere.",
      "Free from deceit, artifice, or sophistication."
    ],
    synonyms: ["naive", "candid", "trusting", "sincere", "guileless"],
    antonyms: ["disingenuous", "crafty", "deceitful", "cynical"],
    examples: [
      "The child asked an ingenuous question about why adults argued over colorful pieces of paper money.",
      "His ingenuous nature made him susceptible to the silver-tongued promises of confidence tricksters.",
      "She gave an ingenuous confession that disarmed her interrogators with its utter honesty."
    ]
  },
  {
    word: "inimical",
    phonetic: "/ɪˈnɪm.ɪ.kəl/",
    pos: "adjective",
    definitions: [
      "Tending to obstruct or harm; unfriendly or hostile.",
      "Adverse to health, happiness, or success."
    ],
    synonyms: ["hostile", "antagonistic", "adverse", "detrimental", "harmful"],
    antonyms: ["favorable", "conducive", "friendly", "beneficial"],
    examples: [
      "Prolonged extreme drought is inimical to the survival of migratory wetland bird populations.",
      "A culture of excessive workplace micromanagement is inimical to creative innovation.",
      "His aggressive public accusations were inimical to the peace talks currently underway."
    ]
  },
  {
    word: "innocuous",
    phonetic: "/ɪˈnɒk.ju.əs/",
    pos: "adjective",
    definitions: [
      "Not harmful or offensive.",
      "Causing no injury or ill effect."
    ],
    synonyms: ["harmless", "benign", "inoffensive", "safe", "nontoxic"],
    antonyms: ["harmful", "toxic", "deleterious", "offensive"],
    examples: [
      "The garter snake, despite its sudden appearance in the garden, was entirely innocuous to humans.",
      "What started as an innocuous clerical mistake snowballed into a major accounting investigation.",
      "She made an innocuous joke about his tie, but he took it as a personal slight."
    ]
  },
  {
    word: "inscrutable",
    phonetic: "/ɪnˈskruː.tə.bəl/",
    pos: "adjective",
    definitions: [
      "Impossible to understand or interpret.",
      "Expressing no emotion, making intentions unknowable."
    ],
    synonyms: ["enigmatic", "unfathomable", "impenetrable", "mysterious", "cryptic"],
    antonyms: ["transparent", "expressive", "readable", "comprehensible"],
    examples: [
      "The judge maintained an inscrutable poker face while listening to the emotional defense testimony.",
      "Ancient inscriptions carved into the cliff face remained inscrutable until the bilingual stone was unearthed.",
      "Cats often possess an inscrutable dignity that leaves pet owners wondering what they are thinking."
    ]
  },
  {
    word: "insidious",
    phonetic: "/ɪnˈsɪd.i.əs/",
    pos: "adjective",
    definitions: [
      "Proceeding in a gradual, subtle way, but with harmful effects.",
      "Treacherous or crafty in operation."
    ],
    synonyms: ["stealthy", "subtle", "surreptitious", "cunning", "treacherous"],
    antonyms: ["straightforward", "open", "harmless", "obvious"],
    examples: [
      "High blood pressure is often described as an insidious disease because patients feel no early symptoms.",
      "The insidious spread of counterfeit goods undermined confidence in the entire luxury marketplace.",
      "Cynicism can have an insidious effect on a community, slowly eroding collective optimism and civic trust."
    ]
  },
  {
    word: "insipid",
    phonetic: "/ɪnˈsɪp.ɪd/",
    pos: "adjective",
    definitions: [
      "Lacking flavor; weak or tasteless.",
      "Lacking vigor, interest, or distinctiveness; dull."
    ],
    synonyms: ["bland", "tasteless", "flavorless", "vapid", "uninspiring"],
    antonyms: ["flavorful", "pungent", "stimulating", "vibrant"],
    examples: [
      "The soup was insipid, desperately needing a pinch of sea salt and a splash of freshly squeezed lemon.",
      "Critics dismissed the pop single as an insipid rehash of last summer's radio hits.",
      "He found the small talk at the formal banquet insipid and excused himself early to read."
    ]
  },
  {
    word: "intransigent",
    phonetic: "/ɪnˈtræn.sɪ.dʒənt/",
    pos: "adjective",
    definitions: [
      "Unwilling or refusing to change one's views or to agree about something.",
      "Stubbornly irreconcilable."
    ],
    synonyms: ["uncompromising", "stubborn", "inflexible", "obdurate", "unyielding"],
    antonyms: ["compliant", "pliable", "flexible", "accommodating"],
    examples: [
      "The union remained intransigent on the issue of guaranteed pension protections.",
      "Both political parties adopted intransigent positions, resulting in a three-week government shutdown.",
      "His intransigent refusal to listen to alternative ideas alienated his fellow architects."
    ]
  },
  {
    word: "intrepid",
    phonetic: "/ɪnˈtrɛp.ɪd/",
    pos: "adjective",
    definitions: [
      "Fearless; adventurous.",
      "Resolutely courageous in facing danger."
    ],
    synonyms: ["dauntless", "valiant", "courageous", "fearless", "audacious"],
    antonyms: ["timid", "cowardly", "craven", "fearful"],
    examples: [
      "The intrepid photojournalist crossed active front lines to document the civilian refugee crisis.",
      "Intrepid speleologists squeezed through submerged passages to map the vast subterranean cavern.",
      "She took an intrepid career leap, leaving a lucrative law partnership to launch a non-profit sanctuary."
    ]
  },
  {
    word: "inundate",
    phonetic: "/ˈɪn.ʌn.deɪt/",
    pos: "verb",
    definitions: [
      "To overwhelm someone with things or people to be dealt with.",
      "To flood or cover with water."
    ],
    synonyms: ["overwhelm", "swamp", "deluge", "flood", "submerge"],
    antonyms: ["drain", "underwhelm", "parch", "starve"],
    examples: [
      "Following the televised investigation, customer support lines were inundated with refund requests.",
      "The sudden burst in the canal levy inundated five thousand acres of prime farmland.",
      "She was inundated with congratulatory messages after winning the international book prize."
    ]
  },
  {
    word: "irascible",
    phonetic: "/ɪˈræs.ɪ.bəl/",
    pos: "adjective",
    definitions: [
      "Having or showing a tendency to be easily angered.",
      "Characterized by a hot temper."
    ],
    synonyms: ["irritable", "cantankerous", "peevish", "choleric", "petulant"],
    antonyms: ["placid", "even-tempered", "affable", "serene"],
    examples: [
      "The irascible old shopkeeper was known to shout at teenagers who loitered near the magazine rack.",
      "Lack of sleep made the director unusually irascible throughout the afternoon rehearsal.",
      "Beneath his irascible bluster, the grandfather had a soft spot for his mischievous grandchildren."
    ]
  },
  {
    word: "juxtapose",
    phonetic: "/ˌdʒʌk.stəˈpoʊz/",
    pos: "verb",
    definitions: [
      "To place or deal with close together for contrasting effect.",
      "To set side-by-side to highlight comparisons."
    ],
    synonyms: ["compare", "collocate", "contrast", "align", "set side-by-side"],
    antonyms: ["separate", "isolate", "disconnect", "distance"],
    examples: [
      "The documentary cleverly juxtaposed archival footage of gilded 1920s galas with breadline bread queues.",
      "The exhibition juxtaposes contemporary street graffiti with Renaissance marble portraiture.",
      "By juxtaposing the two witness testimonies, the prosecutor highlighted irreconcilable contradictions."
    ]
  },
  {
    word: "laconic",
    phonetic: "/ləˈkɒn.ɪk/",
    pos: "adjective",
    definitions: [
      "Using very few words in speech or writing; terse.",
      "Concise to the point of seeming blunt."
    ],
    synonyms: ["terse", "succinct", "brief", "pithy", "taciturn"],
    antonyms: ["verbose", "loquacious", "garrulous", "voluble"],
    examples: [
      "His laconic reply to the lengthy five-page proposal consisted of a single word: 'Proceed.'",
      "The cowboy hero of the classic western was a laconic figure of few words and decisive actions.",
      "Known for her laconic style, she communicated more in a single sentence than others did in an hour."
    ]
  },
  {
    word: "languid",
    phonetic: "/ˈlæŋ.ɡwɪd/",
    pos: "adjective",
    definitions: [
      "Displaying or having a disinclination for physical exertion or effort; slow and relaxed.",
      "Weak or faint from illness or fatigue."
    ],
    synonyms: ["lethargic", "sluggish", "listless", "relaxed", "unhurried"],
    antonyms: ["energetic", "vigorous", "brisk", "dynamic"],
    examples: [
      "The sailboat drifted across the languid, glassy waters of the bay on a windless July afternoon.",
      "She gave a languid wave from the sun lounger and took another sip of iced lemonade.",
      "After recovering from influenza, he felt languid for nearly a fortnight before regaining his stamina."
    ]
  },
  {
    word: "laudable",
    phonetic: "/ˈlɔː.də.bəl/",
    pos: "adjective",
    definitions: [
      "Deserving praise and commendation.",
      "Meritorious or praiseworthy."
    ],
    synonyms: ["praiseworthy", "commendable", "admirable", "meritorious", "sterling"],
    antonyms: ["reprehensible", "shameful", "blameworthy", "deplorable"],
    examples: [
      "The foundation's goal of eradicating childhood malnutrition is entirely laudable.",
      "While the initiative had laudable intentions, its execution suffered from severe bureaucratic delays.",
      "His laudable honesty in returning the lost envelope containing five thousand dollars made local headlines."
    ]
  },
  {
    word: "lethargic",
    phonetic: "/ləˈθɑː.dʒɪk/",
    pos: "adjective",
    definitions: [
      "Affected by lethargy; sluggish and apathetic.",
      "Characterized by abnormal drowsiness or lack of energy."
    ],
    synonyms: ["sluggish", "torpid", "apathetic", "listless", "somnolent"],
    antonyms: ["energetic", "vivacious", "vigorous", "active"],
    examples: [
      "The high fever left the toddler unusually lethargic and reluctant to play with his toys.",
      "Warm indoor heating on gray winter afternoons often makes office workers feel profoundly lethargic.",
      "Bears become lethargic in late autumn as their metabolic rate slows in preparation for hibernation."
    ]
  },
  {
    word: "levity",
    phonetic: "/ˈlɛv.ɪ.ti/",
    pos: "noun",
    definitions: [
      "Humor or frivolity, especially the treatment of a serious matter with lack of due respect.",
      "Lightness of mind or character."
    ],
    synonyms: ["frivolity", "lightheartedness", "humor", "gaiety", "cheerfulness"],
    antonyms: ["gravity", "solemnity", "seriousness", "sobriety"],
    examples: [
      "A brief flash of spontaneous levity eased the tension in the emergency command room.",
      "The judge warned the defense attorney that levity would not be tolerated during murder trial proceedings.",
      "He introduced the solemn award ceremony with tasteful levity, putting nervous recipients at ease."
    ]
  },
  {
    word: "loquacious",
    phonetic: "/loʊˈkweɪ.ʃəs/",
    pos: "adjective",
    definitions: [
      "Tending to talk a great deal; talkative.",
      "Characterized by excessive fluency of speech."
    ],
    synonyms: ["talkative", "garrulous", "voluble", "chatty", "verbose"],
    antonyms: ["taciturn", "reticent", "laconic", "silent"],
    examples: [
      "The loquacious tour guide kept the coach entertained with historical anecdotes for four straight hours.",
      "Once you bring up vintage fountain pens, he becomes remarkably loquacious and difficult to interrupt.",
      "She was naturally reflective, in contrast to her outgoing and loquacious twin sister."
    ]
  },
  {
    word: "lucid",
    phonetic: "/ˈluː.sɪd/",
    pos: "adjective",
    definitions: [
      "Expressed clearly; easy to understand.",
      "Showing the ability to think clearly, especially in intervals between periods of confusion or insanity."
    ],
    synonyms: ["clear", "coherent", "articulate", "intelligible", "luminous"],
    antonyms: ["confused", "muddled", "obscure", "delirious"],
    examples: [
      "The textbook provides a lucid explanation of complex macroeconomic currency flows.",
      "In her lucid moments, the elderly matriarch recalled vivid childhood memories from the family farm.",
      "He gave a lucid summary of the court ruling that laypeople could readily digest."
    ]
  },
  {
    word: "luminous",
    phonetic: "/ˈluː.mɪ.nəs/",
    pos: "adjective",
    definitions: [
      "Full of or shedding light; bright or shining, especially in the dark.",
      "Very clear and easy to understand; enlightened."
    ],
    synonyms: ["radiant", "glowing", "incandescent", "brilliant", "shining"],
    antonyms: ["dim", "opaque", "somber", "gloomy"],
    examples: [
      "The midnight sky over the fjord was illuminated by the luminous green curtains of the northern lights.",
      "She wrote in a luminous, poetic style that transformed mundane landscapes into enchanted realms.",
      "Deep-sea squids use luminous photophores along their tentacles to lure prey in total darkness."
    ]
  },
  {
    word: "magnanimous",
    phonetic: "/mæɡˈnæn.ɪ.məs/",
    pos: "adjective",
    definitions: [
      "Generous or forgiving, especially toward a rival or less powerful person.",
      "Noble and generous in spirit."
    ],
    synonyms: ["generous", "benevolent", "charitable", "forgiving", "noble"],
    antonyms: ["spiteful", "petty", "vindictive", "mean"],
    examples: [
      "In a magnanimous victory speech, the newly elected governor praised her opponent's dedicated public service.",
      "He proved magnanimous in defeat, warmly shaking his rival's hand and pledging his cooperation.",
      "It was magnanimous of the retired founder to hand over company shares to frontline factory workers."
    ]
  },
  {
    word: "malevolent",
    phonetic: "/məˈlɛv.əl.ənt/",
    pos: "adjective",
    definitions: [
      "Having or showing a wish to do evil to others.",
      "Spitefully hostile or malicious."
    ],
    synonyms: ["malicious", "spiteful", "hostile", "sinister", "vicious"],
    antonyms: ["benevolent", "kind", "charitable", "compassionate"],
    examples: [
      "The fairy tale antagonist cast a malevolent glare upon the peaceful kingdom from her mountain lair.",
      "Security analysts detected a malevolent piece of ransomware designed to encrypt municipal hospital systems.",
      "His cold smile had an unmistakably malevolent edge that made everyone in the room uneasy."
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
    synonyms: ["pliable", "ductile", "adaptable", "impressionable", "flexible"],
    antonyms: ["rigid", "brittle", "intractable", "inflexible"],
    examples: [
      "Gold is the most malleable of all precious metals, able to be beaten into leaf just microns thick.",
      "Young minds are impressionable and malleable, making early education a profound moral responsibility.",
      "The copper pipes became soft and malleable when heated under the plumber's blowtorch."
    ]
  },
  {
    word: "maverick",
    phonetic: "/ˈmæv.ər.ɪk/",
    pos: "noun",
    definitions: [
      "An unorthodox or independent-minded person.",
      "An unbranded range animal, especially a calf that has become separated from its mother."
    ],
    synonyms: ["nonconformist", "individualist", "rebel", "free spirit", "iconoclast"],
    antonyms: ["conformist", "traditionalist", "follower", "adherent"],
    examples: [
      "The maverick filmmaker funded his own experimental science fiction project when major studios balked.",
      "In a senate dominated by party-line votes, the maverick legislator regularly crossed the aisle.",
      "Tech pioneers are often mavericks who refuse to conform to established institutional playbooks."
    ]
  },
  {
    word: "melancholy",
    phonetic: "/ˈmɛl.ən.kɒl.i/",
    pos: "noun",
    definitions: [
      "A feeling of pensive sadness, typically with no obvious cause.",
      "Habitual gloom or dejection."
    ],
    synonyms: ["sadness", "sorrow", "woe", "pensiveness", "gloom"],
    antonyms: ["cheerfulness", "happiness", "joy", "gaiety"],
    examples: [
      "A quiet melancholy settled over the seaside village once the summer tourists departed in autumn.",
      "The cello solo echoed with a deep, haunting melancholy that moved the entire audience to tears.",
      "He gazed out at the rain-streaked window, lost in sweet, reflective melancholy."
    ]
  },
  {
    word: "meticulous",
    phonetic: "/məˈtɪk.jʊ.ləs/",
    pos: "adjective",
    definitions: [
      "Showing great attention to detail; very careful and precise.",
      "Finicky; scrupulously thorough."
    ],
    synonyms: ["painstaking", "scrupulous", "assiduous", "punctilious", "precise"],
    antonyms: ["careless", "slapdash", "sloppy", "negligent"],
    examples: [
      "The museum restorer used meticulous precision to clean centuries of grime from the ancient oil painting.",
      "Thanks to her meticulous accounting records, the financial audit went off without a single query.",
      "He took meticulous care of his leather boots, polishing them every evening before storage."
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
    synonyms: ["alleviate", "lessen", "reduce", "diminish", "soften"],
    antonyms: ["exacerbate", "aggravate", "intensify", "compound"],
    examples: [
      "Planting mangrove barriers along coastal estuaries helps mitigate damage from storm surge waves.",
      "The doctor prescribed pain medication to mitigate post-surgical discomfort.",
      "Good insulation and double-glazed windows significantly mitigate winter heating costs."
    ]
  },
  {
    word: "mollify",
    phonetic: "/ˈmɒl.ɪ.faɪ/",
    pos: "verb",
    definitions: [
      "To appease the anger or anxiety of someone.",
      "To soften in temper or feeling."
    ],
    synonyms: ["appease", "placate", "pacify", "soothe", "conciliate"],
    antonyms: ["enrage", "provoke", "incense", "infuriate"],
    examples: [
      "The airline manager offered travel vouchers to mollify passengers furious over the six-hour delay.",
      "A sincere apology and a bouquet of fresh peonies helped mollify her injured feelings.",
      "The municipal council introduced property tax exemptions to mollify frustrated local shopkeepers."
    ]
  },
  {
    word: "morose",
    phonetic: "/məˈroʊs/",
    pos: "adjective",
    definitions: [
      "Sullen and ill-tempered; gloomy.",
      "Expressing gloom or sorrow."
    ],
    synonyms: ["sullen", "gloomy", "glum", "sour", "melancholy"],
    antonyms: ["cheerful", "ebullient", "buoyant", "jovial"],
    examples: [
      "After his football team lost the championship match, he sat in morose silence for hours.",
      "The protagonist of the Scandinavian noir thriller was a morose detective haunted by his past.",
      "Rainy Mondays tend to make the normally lively office atmosphere somewhat morose."
    ]
  },
  {
    word: "mundane",
    phonetic: "/mʌnˈdeɪn/",
    pos: "adjective",
    definitions: [
      "Lacking interest or excitement; dull.",
      "Of this earthly world rather than heavenly or spiritual."
    ],
    synonyms: ["ordinary", "routine", "humdrum", "commonplace", "everyday"],
    antonyms: ["extraordinary", "unusual", "celestial", "magical"],
    examples: [
      "Great novelists have a genius for revealing beauty hidden within mundane household chores.",
      "He yearned to escape the mundane routine of commuter trains, cubicles, and spreadsheets.",
      "Beyond the mundane concerns of corporate profit lay a deeper desire to contribute to human health."
    ]
  },
  {
    word: "munificent",
    phonetic: "/mjuːˈnɪf.ɪ.sənt/",
    pos: "adjective",
    definitions: [
      "Characterized by or displaying great generosity.",
      "Larger or more generous than is usual or necessary."
    ],
    synonyms: ["generous", "bountiful", "magnanimous", "open-handed", "lavish"],
    antonyms: ["parsimonious", "stingy", "miserly", "tight-fisted"],
    examples: [
      "A munificent bequest from an alumnus allowed the university to build a new performing arts center.",
      "The foundation was known for munificent research grants awarded to young climate scientists.",
      "He showed munificent hospitality, welcoming displaced neighbors into his guest cottages for the winter."
    ]
  },
  {
    word: "myriad",
    phonetic: "/ˈmɪr.i.əd/",
    pos: "noun",
    definitions: [
      "A countless or extremely great number.",
      "Ten thousand, in ancient Greek usage."
    ],
    synonyms: ["multitude", "profusion", "plethora", "swarm", "host"],
    antonyms: ["handful", "paucity", "scarcity", "dearth"],
    examples: [
      "Tropical coral reefs support a myriad of marine organisms, from microscopic plankton to tiger sharks.",
      "The newly appointed city mayor faced a myriad of logistical challenges after the flooding.",
      "On a crisp autumn night away from city lights, a myriad of stars blazed across the Milky Way."
    ]
  },
  {
    word: "nascent",
    phonetic: "/ˈnæs.ənt/",
    pos: "adjective",
    definitions: [
      "Just coming into existence and beginning to display signs of future potential.",
      "In the process of emerging or developing."
    ],
    synonyms: ["emerging", "budding", "incipient", "embryonic", "fledgling"],
    antonyms: ["mature", "established", "dying", "senescent"],
    examples: [
      "Venture capitalists rushed to invest in the nascent field of decentralized renewable grid storage.",
      "The university established an incubator to nurture nascent student tech startups.",
      "Historians documented the nascent stages of the civil rights movement in rural church basements."
    ]
  },
  {
    word: "nebulous",
    phonetic: "/ˈnɛb.jʊ.ləs/",
    pos: "adjective",
    definitions: [
      "In the form of a cloud or haze; hazy.",
      "Unclear, vague, or ill-defined."
    ],
    synonyms: ["vague", "hazy", "indistinct", "ambiguous", "cloudy"],
    antonyms: ["clear", "distinct", "precise", "definite"],
    examples: [
      "Her career goals were still nebulous, shifting between environmental law and documentary filmmaking.",
      "Through the amateur telescope, the Andromeda Galaxy appeared as a faint, nebulous smudge of light.",
      "The contract was criticized for its nebulous timelines regarding milestone payments."
    ]
  },
  {
    word: "nefarious",
    phonetic: "/nɪˈfɛər.i.əs/",
    pos: "adjective",
    definitions: [
      "Wicked, villainous, or criminal.",
      "Infamous for being heinous or despicable."
    ],
    synonyms: ["wicked", "villainous", "heinous", "atrocious", "evil"],
    antonyms: ["virtuous", "honorable", "noble", "righteous"],
    examples: [
      "The international syndicate used front charities to disguise their nefarious money-laundering schemes.",
      "Cybersecurity specialists dismantled a botnet designed for nefarious denial-of-service attacks.",
      "The classic gothic thriller featured an aristocratic villain harboring nefarious secrets in his cellar."
    ]
  },
  {
    word: "neophyte",
    phonetic: "/ˈniː.ə.faɪt/",
    pos: "noun",
    definitions: [
      "A person who is new to a subject, skill, or belief.",
      "A novice in a religious order."
    ],
    synonyms: ["novice", "beginner", "tyro", "initiate", "apprentice"],
    antonyms: ["veteran", "expert", "master", "virtuoso"],
    examples: [
      "As a neophyte in alpine climbing, he wisely hired a seasoned mountain guide for his first ascent.",
      "The coding bootcamp was designed specifically for neophytes with zero prior computing experience.",
      "The ancient monastery welcomed three new neophytes during the solemn Michaelmas ceremony."
    ]
  },
  {
    word: "nonchalant",
    phonetic: "/ˌnɒn.ʃəˈlɑːnt/",
    pos: "adjective",
    definitions: [
      "Feeling or appearing casually calm and relaxed; not displaying anxiety, interest, or enthusiasm.",
      "Casually unconcerned."
    ],
    synonyms: ["unconcerned", "casual", "blasé", "composed", "indifferent"],
    antonyms: ["anxious", "agitated", "concerned", "fretful"],
    examples: [
      "Despite the immense stakes of the final penalty shootout, the goalkeeper maintained a nonchalant smirk.",
      "She gave a nonchalant shrug when asked if she was nervous about opening night on Broadway.",
      "He leaned casually against the reception counter with a nonchalant charm that disarmed the staff."
    ]
  },
  {
    word: "obdurate",
    phonetic: "/ˈɒb.djʊ.rət/",
    pos: "adjective",
    definitions: [
      "Stubbornly refusing to change one's opinion or course of action.",
      "Hardened against moral influence or tender feelings."
    ],
    synonyms: ["stubborn", "obstinate", "unyielding", "intransigent", "adamant"],
    antonyms: ["pliable", "tractable", "yielding", "amenable"],
    examples: [
      "Despite mounting scientific evidence, the industrial lobby remained obdurate in opposing emissions caps.",
      "No plea from family members could soften the obdurate heart of the vengeful patriarch.",
      "The horse was famously obdurate, planting its hooves firmly whenever it did not want to cross the creek."
    ]
  },
  {
    word: "obfuscate",
    phonetic: "/ˈɒb.fʌ.skeɪt/",
    pos: "verb",
    definitions: [
      "To render obscure, unclear, or unintelligible.",
      "To bewilder or confuse intentionally."
    ],
    synonyms: ["confuse", "obscure", "blur", "muddle", "cloud"],
    antonyms: ["clarify", "elucidate", "illuminate", "simplify"],
    examples: [
      "The corporation's public relations team used convoluted corporate jargon to obfuscate the real losses.",
      "Do not let statistical technicalities obfuscate the plain moral dilemma at the heart of the case.",
      "The witness intentionally obfuscated his timeline to shield his companion from police questioning."
    ]
  },
  {
    word: "oblivious",
    phonetic: "/əˈblɪv.i.əs/",
    pos: "adjective",
    definitions: [
      "Not aware of or not concerned about what is happening around one.",
      "Lacking conscious awareness or memory."
    ],
    synonyms: ["unaware", "heedless", "unmindful", "insensible", "unconscious"],
    antonyms: ["aware", "conscious", "mindful", "alert"],
    examples: [
      "Absorbed in his headphones, the commuter walked into traffic completely oblivious to the blaring horn.",
      "She slept deeply on the night flight, oblivious to the turbulent storms rocking the aircraft.",
      "The tourists strolled along the promenade, oblivious to the pickpocket shadowing their every step."
    ]
  },
  {
    word: "obsequious",
    phonetic: "/əbˈsiː.kwi.əs/",
    pos: "adjective",
    definitions: [
      "Obedient or attentive to an excessive or servile degree.",
      "Fawning or subservient to gain favor."
    ],
    synonyms: ["servile", "sycophantic", "fawning", "subservient", "cringing"],
    antonyms: ["assertive", "domineering", "independent", "imperious"],
    examples: [
      "The store manager's obsequious bow to wealthy clientele drew quiet scoffs from ordinary shoppers.",
      "Courtiers in historical Versailles used obsequious flattery to maintain royal favor and pensions.",
      "He despised yes-men and made a point of promoting subordinates who offered candid dissent over obsequious praise."
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
    synonyms: ["stubborn", "headstrong", "pigheaded", "inflexible", "recalcitrant"],
    antonyms: ["yielding", "pliant", "amenable", "docile"],
    examples: [
      "The obstinate tenant refused to vacate the premises despite eviction notices posted on the door.",
      "She battled an obstinate chest cough that lingered for weeks after her flu had subsided.",
      "His obstinate adherence to analog photography eventually paid off when film experienced a cultural revival."
    ]
  },
  {
    word: "obtuse",
    phonetic: "/əbˈtjuːs/",
    pos: "adjective",
    definitions: [
      "Annoyingly insensitive or slow to understand.",
      "Difficult to comprehend; not sharp-pointed."
    ],
    synonyms: ["stupid", "slow-witted", "dull", "imperceptive", "insensitive"],
    antonyms: ["sharp", "astute", "incisive", "acumen"],
    examples: [
      "Are you deliberately being obtuse, or did you genuinely miss the entire point of the warning?",
      "The detective grew frustrated with the witness's obtuse answers during the recorded interrogation.",
      "He made an obtuse remark about her outfit without realizing the offense it caused."
    ]
  },
  {
    word: "onerous",
    phonetic: "/ˈoʊ.nər.əs/",
    pos: "adjective",
    definitions: [
      "Involving an amount of effort and difficulty that is oppressively burdensome.",
      "Having or involving obligations that outweigh advantages."
    ],
    synonyms: ["burdensome", "arduous", "strenuous", "taxing", "oppressive"],
    antonyms: ["easy", "effortless", "light", "breezy"],
    examples: [
      "Small business owners complained that new municipal regulations imposed an onerous paperwork burden.",
      "Caring for an elderly relative with advanced dementia is an emotionally onerous, deeply loving duty.",
      "The terms of the payday loan were notoriously onerous, trapping borrowers in endless cycles of debt."
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
    synonyms: ["nontransparent", "cloudy", "obscure", "impenetrable", "cryptic"],
    antonyms: ["transparent", "translucent", "pellucid", "clear"],
    examples: [
      "The bathroom window was made of frosted opaque glass to ensure complete privacy from the street.",
      "The agency's opaque decision-making process fueled public rumors about corruption and favoritism.",
      "Medical billing in private clinics often relies on opaque pricing models that baffle patients."
    ]
  },
  {
    word: "opulent",
    phonetic: "/ˈɒp.jʊ.lənt/",
    pos: "adjective",
    definitions: [
      "Ostentatiously rich and luxurious or lavish.",
      "Possessing great wealth or abundance."
    ],
    synonyms: ["luxurious", "sumptuous", "lavish", "affluent", "palatial"],
    antonyms: ["sparse", "austere", "penurious", "frugal"],
    examples: [
      "The Venetian palace featured opulent ballroom ceilings painted by Renaissance masters.",
      "Guests at the charity gala were treated to an opulent six-course feast of white truffles and vintage champagne.",
      "Despite his opulent surroundings, the oil baron lived a solitary, somewhat reclusive existence."
    ]
  },
  {
    word: "ostentatious",
    phonetic: "/ˌɒs.tɛnˈteɪ.ʃəs/",
    pos: "adjective",
    definitions: [
      "Characterized by vulgar or pretentious display; designed to impress or attract notice.",
      "Conspicuously showy."
    ],
    synonyms: ["showy", "flamboyant", "pretentious", "gaudy", "grandiose"],
    antonyms: ["modest", "understated", "tasteful", "unpretentious"],
    examples: [
      "He arrived at the low-key neighborhood cookout in an ostentatious gold-wrapped sports car.",
      "Her ostentatious diamond necklace drew whispered comments throughout the charity luncheon.",
      "True sophistication is quiet and refined; ostentatious displays usually signal insecurity."
    ]
  },
  {
    word: "panacea",
    phonetic: "/ˌpæn.əˈsiː.ə/",
    pos: "noun",
    definitions: [
      "A solution or remedy for all difficulties or diseases.",
      "A universal cure-all."
    ],
    synonyms: ["cure-all", "universal remedy", "elixir", "magic bullet", "sovereign remedy"],
    antonyms: ["toxin", "poison", "bane", "affliction"],
    examples: [
      "Technology is an invaluable tool, but it is not a panacea for the complex social problems facing schools.",
      "In the nineteenth century, traveling snake-oil salesmen pitched tonic bottles as a panacea for every ailment.",
      "Tax cuts alone cannot serve as an economic panacea for deeply rooted structural deficits."
    ]
  },
  {
    word: "paradigm",
    phonetic: "/ˈpær.ə.daɪm/",
    pos: "noun",
    definitions: [
      "A typical example or pattern of something; a model.",
      "A distinct set of concepts or thought patterns, including theories, research methods, and standards."
    ],
    synonyms: ["model", "archetype", "exemplar", "prototype", "framework"],
    antonyms: ["anomaly", "aberration", "deviation", "exception"],
    examples: [
      "The discovery of penicillin prompted a complete paradigm shift in the treatment of bacterial infections.",
      "Her groundbreaking social enterprise served as an inspiring paradigm for community-led agriculture.",
      "Under the old industrial paradigm, factory smoke was viewed as a proud sign of economic progress."
    ]
  },
  {
    word: "paradox",
    phonetic: "/ˈpær.ə.dɒks/",
    pos: "noun",
    definitions: [
      "A seemingly absurd or self-contradictory statement or proposition that when investigated may prove to be well founded or true.",
      "A person or situation exhibiting contradictory qualities."
    ],
    synonyms: ["contradiction", "enigma", "antinomy", "incongruity", "puzzle"],
    antonyms: ["tautology", "certainty", "consistency", "truism"],
    examples: [
      "The 'paradox of thrift' notes that if every individual saves more during a recession, aggregate demand collapses.",
      "He was a walking paradox: deeply compassionate in private life, yet a ruthless competitor in business.",
      "It is an ironic modern paradox that hyper-connectivity on social media has coincided with rising loneliness."
    ]
  },
  {
    word: "pariah",
    phonetic: "/pəˈraɪ.ə/",
    pos: "noun",
    definitions: [
      "An outcast; a person rejected by their social group.",
      "A person who is despised or avoided."
    ],
    synonyms: ["outcast", "untouchable", "exile", "leper", "outsider"],
    antonyms: ["favorite", "idol", "insider", "luminary"],
    examples: [
      "After blowing the whistle on the company's illegal dumping, she was treated as an office pariah.",
      "The rogue regime became an international pariah following its violation of chemical weapon treaties.",
      "He lived as a hermit on the outskirts of the village, a pariah shunned by conservative elders."
    ]
  },
  {
    word: "parsimonious",
    phonetic: "/ˌpɑː.sɪˈmoʊ.ni.əs/",
    pos: "adjective",
    definitions: [
      "Unwilling to spend money or use resources; stingy or frugal.",
      "Excessively frugal; penurious."
    ],
    synonyms: ["miserly", "stingy", "tightfisted", "frugal", "penurious"],
    antonyms: ["generous", "munificent", "lavish", "extravagant"],
    examples: [
      "The parsimonious landlord refused to replace the broken boiler throughout the freezing January blizzard.",
      "Despite his vast fortune in real estate, he had parsimonious habits and clipped coupons for groceries.",
      "The museum board was parsimonious with research grants, prioritizing administrative bonuses instead."
    ]
  },
  {
    word: "paucity",
    phonetic: "/ˈpɔː.sɪ.ti/",
    pos: "noun",
    definitions: [
      "The presence of something only in small or insufficient quantities or amounts; scarcity.",
      "Fewness of number or quantity."
    ],
    synonyms: ["scarcity", "dearth", "shortage", "deficiency", "lack"],
    antonyms: ["plethora", "abundance", "surfeit", "copiousness"],
    examples: [
      "A paucity of clinical data prevented the regulatory board from granting fast-track drug approval.",
      "The archeological team was hindered by a paucity of preserved papyrus fragments from that dynasty.",
      "Despite the paucity of funds, the community orchestra put on an unforgettable performance of Beethoven's Ninth."
    ]
  },
  {
    word: "pedantic",
    phonetic: "/pɪˈdæn.tɪk/",
    pos: "adjective",
    definitions: [
      "Excessively concerned with minor details and rules or with displaying academic learning.",
      "Fastidious in a dry, narrow-minded way."
    ],
    synonyms: ["punctilious", "fussy", "doctrinaire", "finicky", "scrupulous"],
    antonyms: ["informal", "broad-minded", "imprecise", "casual"],
    examples: [
      "His pedantic corrections of colleagues' casual grammar during meetings made him thoroughly unpopular.",
      "The reviewer's critique felt overly pedantic, focusing on minor font choices rather than the book's profound argument.",
      "True scholarship avoids pedantic displays of trivia and illuminates central human questions."
    ]
  },
  {
    word: "pejorative",
    phonetic: "/pɪˈdʒɒr.ə.tɪv/",
    pos: "adjective",
    definitions: [
      "Expressing contempt or disapproval.",
      "Having a disparaging or derogatory effect."
    ],
    synonyms: ["derogatory", "disparaging", "deprecatory", "insulting", "scornful"],
    antonyms: ["complimentary", "laudatory", "approving", "commendatory"],
    examples: [
      "The term 'couch potato' is a playful yet distinctly pejorative descriptor for a sedentary person.",
      "He used the label in a pejorative sense to diminish his rival's academic credibility.",
      "Words that start as neutral descriptions can accumulate pejorative connotations over decades of political conflict."
    ]
  },
  {
    word: "penchant",
    phonetic: "/ˈpɒ̃.ʃɒ̃/",
    pos: "noun",
    definitions: [
      "A strong or habitual liking for something or tendency to do something.",
      "An inclination or leaning."
    ],
    synonyms: ["predilection", "affinity", "fondness", "proclivity", "propensity"],
    antonyms: ["aversion", "dislike", "antipathy", "disinclination"],
    examples: [
      "He had a well-known penchant for vintage mechanical pocket watches and antique fountain pens.",
      "Her penchant for candid honesty occasionally ruffled feathers among corporate executives.",
      "The chef developed an early penchant for fiery spices while traveling through southern Thailand."
    ]
  },
  {
    word: "perfunctory",
    phonetic: "/pəˈfʌŋk.tər.i/",
    pos: "adjective",
    definitions: [
      "Carried out with a minimum of effort or reflection.",
      "Performed merely as a routine duty."
    ],
    synonyms: ["cursory", "superficial", "mechanical", "casual", "hasty"],
    antonyms: ["thorough", "meticulous", "attentive", "careful"],
    examples: [
      "He offered a perfunctory nod as he passed his colleagues in the hallway, eyes glued to his tablet.",
      "The building inspection was merely perfunctory, missing severe structural cracks in the basement piers.",
      "She gave the contract a perfunctory glance and signed without reading the fine print clauses."
    ]
  },
  {
    word: "pernicious",
    phonetic: "/pəˈnɪʃ.əs/",
    pos: "adjective",
    definitions: [
      "Having a harmful effect, especially in a gradual or subtle way.",
      "Destructive or ruinous."
    ],
    synonyms: ["harmful", "destructive", "detrimental", "deleterious", "insidious"],
    antonyms: ["beneficial", "salutary", "wholesome", "harmless"],
    examples: [
      "The pernicious spread of unverified medical rumors online undermined national vaccination programs.",
      "Prolonged exposure to sulfurous industrial smog had a pernicious effect on the village's respiratory health.",
      "He warned that unbridled greed exercises a pernicious influence on public civic morality."
    ]
  },
  {
    word: "perspicacious",
    phonetic: "/ˌpɜː.spɪˈkeɪ.ʃəs/",
    pos: "adjective",
    definitions: [
      "Having a ready insight into and understanding of things.",
      "Mentally acute and discerning."
    ],
    synonyms: ["shrewd", "astute", "discerning", "insightful", "incisive"],
    antonyms: ["obtuse", "foolish", "dull", "naive"],
    examples: [
      "The perspicacious investment analyst foresaw the housing bubble collapse months before it occurred.",
      "Her perspicacious observations on human psychology made her novels rich and deeply convincing.",
      "A perspicacious detective notices the small inconsistencies that others overlook."
    ]
  },
  {
    word: "pervade",
    phonetic: "/pəˈveɪd/",
    pos: "verb",
    definitions: [
      "To spread through and be perceived in every part of.",
      "To permeate or be present throughout."
    ],
    synonyms: ["permeate", "suffuse", "saturate", "imbue", "penetrate"],
    antonyms: ["drain", "recede", "vacate", "isolate"],
    examples: [
      "The comforting aroma of freshly baked sourdough and cinnamon rolls pervaded the small kitchen.",
      "A palpable sense of anticipation pervaded the concert hall as the house lights began to dim.",
      "Corruption had pervaded the provincial police department from the rank-and-file up to headquarters."
    ]
  },
  {
    word: "petulant",
    phonetic: "/ˈpɛtʃ.ʊ.lənt/",
    pos: "adjective",
    definitions: [
      "Childishly sulky or bad-tempered.",
      "Easily irritated over trivial matters."
    ],
    synonyms: ["peevish", "sulky", "fractious", "irritable", "querulous"],
    antonyms: ["even-tempered", "patient", "affable", "placid"],
    examples: [
      "When his smartphone was confiscated at the dinner table, the teenager gave a petulant scowl.",
      "The tennis star was fined by the sports committee for a petulant outburst directed at the line umpire.",
      "She ignored his petulant complaints about the hotel room and focused on enjoying the ocean view."
    ]
  },
  {
    word: "platitude",
    phonetic: "/ˈplæt.ɪ.tjuːd/",
    pos: "noun",
    definitions: [
      "A remark or statement, especially one with a moral content, that has been used too often to be interesting or thoughtful.",
      "A trite, stale, or banal observation."
    ],
    synonyms: ["cliché", "truism", "commonplace", "banality", "bromide"],
    antonyms: ["epigram", "originality", "witticism", "insight"],
    examples: [
      "Politicians often retreat into empty platitudes when pressed for concrete policy details.",
      "Grieving families need compassionate presence, not tired platitudes like 'everything happens for a reason.'",
      "His graduation address was a string of weary platitudes that left the graduating seniors yawning."
    ]
  },
  {
    word: "plethora",
    phonetic: "/ˈplɛθ.ər.ə/",
    pos: "noun",
    definitions: [
      "A large or excessive amount of something.",
      "An overabundance."
    ],
    synonyms: ["excess", "overabundance", "surfeit", "profusion", "glut"],
    antonyms: ["dearth", "scarcity", "paucity", "shortage"],
    examples: [
      "The digital streaming age offers consumers a plethora of choices, often leading to decision fatigue.",
      "A plethora of complaints regarding train delays landed on the transportation minister's desk.",
      "The garden nursery offered a vibrant plethora of heirloom tomato varieties for spring planting."
    ]
  },
  {
    word: "polemic",
    phonetic: "/pəˈlɛm.ɪk/",
    pos: "noun",
    definitions: [
      "A strong verbal or written attack on someone or something.",
      "Passionate disputation or controversial argument."
    ],
    synonyms: ["diatribe", "tirade", "invective", "critique", "broadside"],
    antonyms: ["eulogy", "panegyric", "commendation", "tribute"],
    examples: [
      "His latest book is a fierce polemic against the deregulation of Wall Street investment banks.",
      "Rather than writing a measured history, the author produced a partisan polemic that alienated scholars.",
      "She listened calmly to his impassioned polemic before responding with documented statistical facts."
    ]
  },
  {
    word: "pragmatic",
    phonetic: "/præɡˈmæt.ɪk/",
    pos: "adjective",
    definitions: [
      "Dealing with things sensibly and realistically in a way that is based on practical rather than theoretical considerations.",
      "Focused on workable solutions."
    ],
    synonyms: ["practical", "sensible", "utilitarian", "hardheaded", "matter-of-fact"],
    antonyms: ["idealistic", "quixotic", "impractical", "visionary"],
    examples: [
      "Faced with declining tax revenue, the city took a pragmatic approach and consolidated overlapping departments.",
      "Her pragmatic advice helped the young entrepreneur survive the perilous first year of retail operation.",
      "Rather than debating endless theoretical proposals, they adopted a pragmatic plan for river flood defenses."
    ]
  },
  {
    word: "precarious",
    phonetic: "/prɪˈkɛər.i.əs/",
    pos: "adjective",
    definitions: [
      "Not securely held or in position; dangerously likely to fall or collapse.",
      "Dependent on chance; uncertain."
    ],
    synonyms: ["uncertain", "insecure", "hazardous", "perilous", "shaky"],
    antonyms: ["secure", "stable", "safe", "firm"],
    examples: [
      "The ancient mountain hut sat in a precarious position on the edge of the sheer granite cliff.",
      "Many gig economy workers find themselves in a precarious financial situation without sickness benefits.",
      "The coalition government maintained a precarious two-vote majority throughout the legislative session."
    ]
  },
  {
    word: "precocious",
    phonetic: "/prɪˈkoʊ.ʃəs/",
    pos: "adjective",
    definitions: [
      "Of a child: having developed certain abilities or proclivities at an earlier age than usual.",
      "Indicative of early or advanced development."
    ],
    synonyms: ["gifted", "advanced", "talented", "forward", "premature"],
    antonyms: ["backward", "slow", "delayed", "retarded"],
    examples: [
      "The precocious pianist performed complex Chopin nocturnes in public concert halls at age seven.",
      "Her precocious understanding of global geography astonished all her elementary school teachers.",
      "Wolfgang Amadeus Mozart is history's classic example of a precocious musical genius."
    ]
  },
  {
    word: "propensity",
    phonetic: "/prəˈpɛn.sɪ.ti/",
    pos: "noun",
    definitions: [
      "An inclination or natural tendency to behave in a particular way.",
      "A predisposition or leaning."
    ],
    synonyms: ["tendency", "inclination", "predisposition", "proclivity", "penchant"],
    antonyms: ["aversion", "disinclination", "reluctance", "antipathy"],
    examples: [
      "He had a documented propensity for taking calculated financial risks in volatile tech markets.",
      "The breed of sheepdog has a natural, instinctive propensity for herding livestock across fields.",
      "She recognized her own propensity to overwork and deliberately scheduled screen-free weekends."
    ]
  },
  {
    word: "prosaic",
    phonetic: "/prəˈzeɪ.ɪk/",
    pos: "adjective",
    definitions: [
      "Having the style or diction of prose; lacking poetic beauty.",
      "Commonplace; unromantic."
    ],
    synonyms: ["ordinary", "uninspired", "mundane", "humdrum", "commonplace"],
    antonyms: ["poetic", "imaginative", "lyrical", "inspired"],
    examples: [
      "Beneath the romantic legend of the gold rush lay the prosaic reality of mud, scurvy, and broken pickaxes.",
      "His explanation for the broken heirloom vase was disappointingly prosaic: the cat knocked it over.",
      "The novel's opening description was somewhat prosaic, but the dialogue in chapter two was brilliant."
    ]
  },
  {
    word: "puerile",
    phonetic: "/ˈpjʊə.raɪl/",
    pos: "adjective",
    definitions: [
      "Childishly silly and trivial.",
      "Immature or infantile in conduct."
    ],
    synonyms: ["childish", "immature", "infantile", "juvenile", "inane"],
    antonyms: ["mature", "adult", "sensible", "grave"],
    examples: [
      "The debate devolved into puerile name-calling that embarrassed party supporters on both sides.",
      "Making prank phone calls to emergency hotlines is not just puerile; it is criminal.",
      "The professor dismissed the student's excuse as a puerile attempt to avoid taking responsibility."
    ]
  },
  {
    word: "pugnacious",
    phonetic: "/pʌɡˈneɪ.ʃəs/",
    pos: "adjective",
    definitions: [
      "Eager or quick to argue, quarrel, or fight.",
      "Combative in disposition."
    ],
    synonyms: ["combative", "belligerent", "truculent", "aggressive", "antagonistic"],
    antonyms: ["peaceable", "amicable", "docile", "conciliatory"],
    examples: [
      "The small terrier had a pugnacious temperament, barking boldly at dogs four times its stature.",
      "His pugnacious demeanor in corporate negotiations alienated potential joint-venture partners.",
      "The defense lawyer's pugnacious cross-examination rattled the prosecution's key star witness."
    ]
  },
  {
    word: "punctilious",
    phonetic: "/pʌŋkˈtɪl.i.əs/",
    pos: "adjective",
    definitions: [
      "Showing great attention to detail or correct behavior.",
      "Extremely fastidious regarding social etiquette or procedural rules."
    ],
    synonyms: ["meticulous", "conscientious", "scrupulous", "exacting", "perfectionist"],
    antonyms: ["careless", "slapdash", "informal", "sloppy"],
    examples: [
      "The royal equerry was punctilious about diplomatic seating arrangements and dinner protocol.",
      "He was punctilious in repaying even the smallest borrowed loan down to the exact cent.",
      "Her punctilious proofreading caught dozen subtle typography errors in the final book proofs."
    ]
  },
  {
    word: "quagmire",
    phonetic: "/ˈkwæɡ.maɪər/",
    pos: "noun",
    definitions: [
      "A soft boggy area of land that gives way underfoot.",
      "An awkward, complex, or hazardous situation."
    ],
    synonyms: ["morass", "bog", "predicament", "dilemma", "quandary"],
    antonyms: ["firm ground", "solution", "clear path", "simplicity"],
    examples: [
      "Heavy rains transformed the music festival grounds into a slippery, knee-deep quagmire.",
      "Military historians warned that foreign intervention could easily turn into an unwinnable quagmire.",
      "The dispute over intellectual property rights created an intractable legal quagmire for the startup."
    ]
  },
  {
    word: "quandary",
    phonetic: "/ˈkwɒn.dər.i/",
    pos: "noun",
    definitions: [
      "A state of perplexity or uncertainty over what to do in a difficult situation.",
      "A practical dilemma."
    ],
    synonyms: ["dilemma", "predicament", "plight", "quagmire", "perpexity"],
    antonyms: ["certainty", "resolution", "clarity", "solution"],
    examples: [
      "She faced a painful ethical quandary: blow the whistle on her boss or protect her family's income.",
      "The chess champion sat in deep contemplation, pondering his tactical quandary across the board.",
      "Caught between two attractive scholarship offers, the student found himself in an enviable quandary."
    ]
  },
  {
    word: "querulous",
    phonetic: "/ˈkwɛr.ʊ.ləs/",
    pos: "adjective",
    definitions: [
      "Complaining in a petulant or whining manner.",
      "Habitually fretful or discontented."
    ],
    synonyms: ["petulant", "peevish", "whiny", "fractious", "complaining"],
    antonyms: ["content", "affable", "placid", "cheerful"],
    examples: [
      "The long bus delay brought out a querulous tone in even the most patient passengers.",
      "His querulous voice grated on his traveling companions after five days on the winding trail.",
      "She was tired of hearing querulous complaints from people who refused to contribute to solutions."
    ]
  },
  {
    word: "quiescent",
    phonetic: "/kwiˈɛs.ənt/",
    pos: "adjective",
    definitions: [
      "In a state or period of inactivity or dormancy.",
      "Quiet, still, or at rest."
    ],
    synonyms: ["dormant", "inactive", "latent", "passive", "quiescent"],
    antonyms: ["active", "dynamic", "eruptive", "restless"],
    examples: [
      "The volcano had remained quiescent for over three centuries before suddenly spewing ash.",
      "During the freezing winter months, tree sap sits quiescent deep within the root system.",
      "The political controversy lay quiescent until leaked emails revived public fury."
    ]
  },
  {
    word: "quintessential",
    phonetic: "/ˌkwɪn.tɪˈsɛn.ʃəl/",
    pos: "adjective",
    definitions: [
      "Representing the most perfect or typical example of a quality or class.",
      "Of the pure and essential nature of something."
    ],
    synonyms: ["archetypal", "exemplary", "classic", "consummate", "definitive"],
    antonyms: ["atypical", "anomalous", "unrepresentative", "divergent"],
    examples: [
      "Afternoon tea at the Ritz is considered the quintessential British luxury experience.",
      "Humphrey Bogart in Casablanca became the quintessential cinematic portrait of world-weary romanticism.",
      "The small cobblestone harbor with fishing trawlers was the quintessential coastal Maine postcard."
    ]
  },
  {
    word: "quixotic",
    phonetic: "/kwɪkˈsɒt.ɪk/",
    pos: "adjective",
    definitions: [
      "Exceedingly idealistic; unrealistic and impractical.",
      "Chivalrous or romantic to an extravagant or absurd degree."
    ],
    synonyms: ["idealistic", "visionary", "romantic", "impractical", "unrealistic"],
    antonyms: ["pragmatic", "practical", "realistic", "hardheaded"],
    examples: [
      "His quixotic mission to clean the city river by hand was scoffed at, yet it inspired thousands to join him.",
      "Investing family savings in an underwater hotel seemed like a charmingly quixotic enterprise.",
      "Don Quixote's tilting at windmills remains the defining literary metaphor for quixotic endeavor."
    ]
  },
  {
    word: "quotidian",
    phonetic: "/kwoʊˈtɪd.i.ən/",
    pos: "adjective",
    definitions: [
      "Of or occurring every day; daily.",
      "Ordinary or everyday, especially when mundane."
    ],
    synonyms: ["daily", "everyday", "commonplace", "mundane", "routine"],
    antonyms: ["extraordinary", "rare", "unusual", "exceptional"],
    examples: [
      "The morning commute, grocery shopping, and washing dishes are the quotidian rhythms of life.",
      "Great documentary photography captures beauty in the most quotidian street moments.",
      "He was so distracted by metaphysical questions that quotidian chores like paying bills were neglected."
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
    synonyms: ["bitterness", "animosity", "malice", "spite", "enmity"],
    antonyms: ["amity", "goodwill", "benevolence", "forgiveness"],
    examples: [
      "The divorce was settled without rancor, with both parents prioritizing the well-being of their children.",
      "Years of political rivalry ended in bitter rancor that poisoned friendships across the small town.",
      "Despite being fired without notice, he spoke of his former employer without any visible rancor."
    ]
  },
  {
    word: "recalcitrant",
    phonetic: "/rɪˈkæl.sɪ.trənt/",
    pos: "adjective",
    definitions: [
      "Having an obstinately uncooperative attitude toward authority or discipline.",
      "Hard to deal with, manage, or operate."
    ],
    synonyms: ["unruly", "insubordinate", "defiant", "intractable", "refractory"],
    antonyms: ["compliant", "docile", "submissive", "tractable"],
    examples: [
      "The teacher spent extra hours mentoring the recalcitrant student, eventually discovering his hidden artistic talent.",
      "The recalcitrant mule refused to budge from the mountain trail, regardless of bribery with fresh carrots.",
      "International sanctions were imposed on the recalcitrant regime following treaty violations."
    ]
  },
  {
    word: "recondite",
    phonetic: "/ˈrɛk.ən.daɪt/",
    pos: "adjective",
    definitions: [
      "Of a subject or knowledge: little known; abstruse.",
      "Dealing with profound or obscure matters."
    ],
    synonyms: ["obscure", "abstruse", "arcane", "esoteric", "cryptic"],
    antonyms: ["familiar", "commonplace", "simple", "accessible"],
    examples: [
      "The medieval library contained recondite manuscripts on alchemy and forgotten Arabic astronomy.",
      "Her doctoral dissertation explored a recondite dialect spoken by fewer than three hundred villagers.",
      "Few people outside high-energy physics comprehend the recondite mathematical proofs behind string theory."
    ]
  },
  {
    word: "redolent",
    phonetic: "/ˈrɛd.əl.ənt/",
    pos: "adjective",
    definitions: [
      "Strongly reminiscent or suggestive of something.",
      "Fragrant or full of a specified smell."
    ],
    synonyms: ["reminiscent", "evocative", "fragrant", "aromatic", "scented"],
    antonyms: ["unscented", "odorless", "unreminiscent", "bland"],
    examples: [
      "The old seaside cabin was redolent of pine needles, woodsmoke, and salty ocean breeze.",
      "His lyrical poetry is redolent of ancient Irish myths and misty Atlantic headlands.",
      "The bakery air was deliciously redolent of roasted cardamom, cinnamon, and caramelizing sugar."
    ]
  },
  {
    word: "refractory",
    phonetic: "/rɪˈfræk.tər.i/",
    pos: "adjective",
    definitions: [
      "Stubborn or unmanageable; resistant to a process or stimulus.",
      "Of a substance: resistant to heat; hard to melt or fuse."
    ],
    synonyms: ["obstinate", "intractable", "stubborn", "recalcitrant", "resistant"],
    antonyms: ["obedient", "pliable", "malleable", "responsive"],
    examples: [
      "The patient suffered from a refractory bacterial infection that resisted common antibiotics.",
      "Furnace interiors in the steel mill are lined with refractory brick that withstands extreme thermal stress.",
      "The refractory toddler crossed his arms and refused to get into his stroller."
    ]
  },
  {
    word: "relegate",
    phonetic: "/ˈrɛl.ɪ.ɡeɪt/",
    pos: "verb",
    definitions: [
      "To consign or dismiss to an inferior rank or position.",
      "To transfer or banish to a place of obscurity."
    ],
    synonyms: ["demote", "downgrade", "consign", "banish", "subordinate"],
    antonyms: ["promote", "elevate", "advance", "upgrade"],
    examples: [
      "After finishing last in the Premier League, the historic football club was relegated to the second division.",
      "Important philosophical questions are often unfairly relegated to late-night dormitory bull sessions.",
      "She refused to let her career be relegated to minor clerical duties after returning from maternity leave."
    ]
  },
  {
    word: "remiss",
    phonetic: "/rɪˈmɪs/",
    pos: "adjective",
    definitions: [
      "Lacking care or attention to duty; negligent.",
      "Careless or slack in fulfilling obligations."
    ],
    synonyms: ["negligent", "lax", "careless", "derelict", "inattentive"],
    antonyms: ["conscientious", "diligent", "meticulous", "scrupulous"],
    examples: [
      "I would be remiss if I did not thank the tireless volunteer crew who made tonight's gala possible.",
      "The landlord was severely remiss in ignoring tenant warnings about faulty electrical wiring.",
      "Security guards were found remiss in their duties after sleeping through an overnight breach."
    ]
  },
  {
    word: "repudiate",
    phonetic: "/rɪˈpjuː.di.eɪt/",
    pos: "verb",
    definitions: [
      "To refuse to accept or be associated with.",
      "To deny the truth or validity of."
    ],
    synonyms: ["reject", "renounce", "disavow", "abandon", "deny"],
    antonyms: ["embrace", "acknowledge", "endorse", "affirm"],
    examples: [
      "The newly elected prime minister moved swiftly to repudiate the previous administration's trade treaties.",
      "She publicly repudiated the hateful remarks made by a former member of her advisory committee.",
      "Scientists repudiated the falsified drug study after raw data failed independent scrutiny."
    ]
  },
  {
    word: "rescind",
    phonetic: "/rɪˈsɪnd/",
    pos: "verb",
    definitions: [
      "To revoke, cancel, or repeal a law, order, or agreement.",
      "To make void by higher authority."
    ],
    synonyms: ["revoke", "cancel", "repeal", "annul", "nullify"],
    antonyms: ["enact", "validate", "affirm", "reinstate"],
    examples: [
      "Facing intense public backlash, the university board voted to rescind the proposed tuition increase.",
      "The municipal council rescinded the controversial parking bylaw after merchant protests.",
      "The sports federation rescinded the cyclist's medal following confirmation of doping infractions."
    ]
  },
  {
    word: "resilient",
    phonetic: "/rɪˈzɪl.i.ənt/",
    pos: "adjective",
    definitions: [
      "Able to withstand or recover quickly from difficult conditions.",
      "Of a substance: able to recoil or spring back into shape after bending or compression."
    ],
    synonyms: ["tough", "adaptable", "durable", "buoyant", "robust"],
    antonyms: ["fragile", "vulnerable", "brittle", "delicate"],
    examples: [
      "Local communities proved remarkably resilient in rebuilding their homes after the hurricane.",
      "Natural rubber is prized by industrial manufacturers for its highly resilient elastic properties.",
      "A resilient mindset allows entrepreneurs to treat early business failures as valuable learning experiments."
    ]
  },
  {
    word: "reticent",
    phonetic: "/ˈrɛt.ɪ.sənt/",
    pos: "adjective",
    definitions: [
      "Not revealing one's thoughts or feelings readily.",
      "Reserved or restrained in communication."
    ],
    synonyms: ["reserved", "withdrawn", "taciturn", "uncommunicative", "guarded"],
    antonyms: ["outgoing", "loquacious", "candid", "effusive"],
    examples: [
      "The war veteran was famously reticent when asked by family members about his frontline service.",
      "She was naturally reticent in large social gatherings, preferring quiet one-on-one conversations.",
      "Government officials remained reticent about details of the ongoing hostage negotiations."
    ]
  },
  {
    word: "sagacious",
    phonetic: "/səˈɡeɪ.ʃəs/",
    pos: "adjective",
    definitions: [
      "Having or showing keen mental discernment and good judgment; shrewd.",
      "Wise in understanding human character and practical affairs."
    ],
    synonyms: ["wise", "shrewd", "astute", "perspicacious", "prudent"],
    antonyms: ["foolish", "naive", "obtuse", "fatuous"],
    examples: [
      "The tribal elders were renowned for sagacious counsel that resolved disputes without bloodshed.",
      "Thanks to her sagacious investments in green technology, the foundation's endowment quadrupled.",
      "A sagacious leader knows when to compromise on minor details to preserve the core objective."
    ]
  },
  {
    word: "salient",
    phonetic: "/ˈseɪ.li.ənt/",
    pos: "adjective",
    definitions: [
      "Most noticeable or important.",
      "Prominent; projecting outward."
    ],
    synonyms: ["prominent", "conspicuous", "notable", "striking", "essential"],
    antonyms: ["insignificant", "obscure", "minor", "hidden"],
    examples: [
      "The executive summary neatly distilled the salient points of the five-hundred-page environmental report.",
      "Her speech touched on the salient moral dilemmas confronting artificial intelligence developers today.",
      "The most salient feature of the gothic cathedral is its skyward-pointing twin limestone spires."
    ]
  },
  {
    word: "salutary",
    phonetic: "/ˈsæl.jʊ.tər.i/",
    pos: "adjective",
    definitions: [
      "Producing good effects; beneficial, especially with reference to something that is unwelcome or unpleasant.",
      "Promoting physical health."
    ],
    synonyms: ["beneficial", "advantageous", "salubrious", "wholesome", "healthful"],
    antonyms: ["detrimental", "deleterious", "harmful", "injurious"],
    examples: [
      "The economic downturn delivered a salutary warning to families living beyond their financial means.",
      "His unexpected defeat in the primary proved a salutary experience that sharpened his political focus.",
      "Fresh mountain air and regular exercise had an immediate, salutary effect on the patient's recovery."
    ]
  },
  {
    word: "sanctimonious",
    phonetic: "/ˌsæŋk.tɪˈmoʊ.ni.əs/",
    pos: "adjective",
    definitions: [
      "Making a show of being morally superior to other people.",
      "Hypocritically pious."
    ],
    synonyms: ["holier-than-thou", "self-righteous", "pious", "pharisaic", "smug"],
    antonyms: ["humble", "sincere", "unpretentious", "modest"],
    examples: [
      "The television commentator gave a sanctimonious lecture on family values shortly before his own scandal broke.",
      "I cannot stand his sanctimonious lectures on recycling when he drives a gas-guzzling pickup truck.",
      "She rolled her eyes at the sanctimonious moralizing published in the tabloid editorial."
    ]
  },
  {
    word: "sanguine",
    phonetic: "/ˈsæŋ.ɡwɪn/",
    pos: "adjective",
    definitions: [
      "Optimistic or positive, especially in an apparently bad or difficult situation.",
      "Having a healthy reddish complexion."
    ],
    synonyms: ["optimistic", "hopeful", "buoyant", "confident", "cheerful"],
    antonyms: ["pessimistic", "gloomy", "morose", "despondent"],
    examples: [
      "Despite dismal quarterly earnings, the startup founder remained remarkably sanguine about next year's prospects.",
      "His sanguine disposition helped buoy team spirits through the long, freezing polar winter.",
      "The doctor gave a sanguine prognosis, expecting a full recovery within three months."
    ]
  },
  {
    word: "sardonic",
    phonetic: "/sɑːˈdɒn.ɪk/",
    pos: "adjective",
    definitions: [
      "Grimly mocking or cynical.",
      "Characterized by bitter or scornful derision."
    ],
    synonyms: ["mocking", "satirical", "sarcastic", "ironic", "scathing"],
    antonyms: ["gentle", "sincere", "kind", "complimentary"],
    examples: [
      "He greeted the politician's grand promise with a sardonic chuckle under his breath.",
      "Her novels are celebrated for their dry, sardonic humor dissecting modern high society vanity.",
      "The veteran detective wore a sardonic smile that suggested he had seen this crime play out many times before."
    ]
  },
  {
    word: "scrupulous",
    phonetic: "/ˈskruː.pjʊ.ləs/",
    pos: "adjective",
    definitions: [
      "Diligent, thorough, and extremely attentive to details.",
      "Very concerned to avoid doing wrong; having strict moral integrity."
    ],
    synonyms: ["meticulous", "painstaking", "conscientious", "honorable", "principled"],
    antonyms: ["unscrupulous", "careless", "dishonest", "lax"],
    examples: [
      "The lab technician took scrupulous care to prevent cross-contamination between biological cultures.",
      "He was scrupulous in all business dealings, never taking advantage of a partner's legal vulnerability.",
      "A scrupulous audit confirmed that every dollar donated to the charity went directly to famine relief."
    ]
  },
  {
    word: "serendipity",
    phonetic: "/ˌsɛr.ənˈdɪp.ɪ.ti/",
    pos: "noun",
    definitions: [
      "The occurrence and development of events by chance in a happy or beneficial way.",
      "Good fortune discovered unexpectedly."
    ],
    synonyms: ["chance", "happy accident", "fluke", "providence", "luck"],
    antonyms: ["misfortune", "adversity", "design", "misfortune"],
    examples: [
      "Finding her grandmother's lost wedding ring inside an old book was pure serendipity.",
      "Many of the greatest breakthroughs in medical science, from penicillin to X-rays, began as acts of serendipity.",
      "By happy serendipity, the rain stopped just as the bride walked down the garden path."
    ]
  },
  {
    word: "soporific",
    phonetic: "/ˌsɒp.ərˈɪf.ɪk/",
    pos: "adjective",
    definitions: [
      "Tending to induce drowsiness or sleep.",
      "Tediously boring or monotonous."
    ],
    synonyms: ["sleep-inducing", "sedative", "monotonous", "drowsy", "tranquilizing"],
    antonyms: ["invigorating", "stimulating", "energizing", "exciting"],
    examples: [
      "The steady, rhythmic hum of the ceiling fan had a delightfully soporific effect in the summer heat.",
      "A warm mug of chamomile tea and honey served as a gentle, natural soporific before bedtime.",
      "The guest lecturer's monotone voice was so soporific that several graduate students nodded off in the back row."
    ]
  },
  {
    word: "specious",
    phonetic: "/ˈspiː.ʃəs/",
    pos: "adjective",
    definitions: [
      "Superficially plausible, but actually wrong.",
      "Misleading in appearance or argument."
    ],
    synonyms: ["misleading", "deceptive", "fallacious", "spurious", "plausible-sounding"],
    antonyms: ["sound", "valid", "genuine", "truthful"],
    examples: [
      "A closer look at the advertisement exposed its specious claims regarding effortless weight loss.",
      "The politician built his campaign upon a specious argument that scapegoated foreign trade partners.",
      "Do not be swayed by specious reasoning that sounds impressive until you examine the underlying facts."
    ]
  },
  {
    word: "spurious",
    phonetic: "/ˈspjʊər.i.əs/",
    pos: "adjective",
    definitions: [
      "Not being what it purports to be; false or fake.",
      "Illegitimate in origin or basis."
    ],
    synonyms: ["bogus", "fake", "counterfeit", "fraudulent", "inauthentic"],
    antonyms: ["authentic", "genuine", "real", "legitimate"],
    examples: [
      "The antique dealer was arrested for selling spurious Roman coins crafted in a modern garage workshop.",
      "Scientists easily debunked the spurious study connecting 5G signals to influenza outbreaks.",
      "He attempted to justify his tardiness with a spurious excuse about a flat tire on his bicycle."
    ]
  },
  {
    word: "stoic",
    phonetic: "/ˈstoʊ.ɪk/",
    pos: "adjective",
    definitions: [
      "A person who can endure pain or hardship without showing their feelings or complaining.",
      "Belonging to the school of philosophy founded by Zeno of Citium."
    ],
    synonyms: ["philosophical", "resigned", "phlegmatic", "uncomplaining", "impassive"],
    antonyms: ["complaining", "emotional", "hysterical", "fragile"],
    examples: [
      "The injured football player showed stoic resolve, limping off the field without a single grimace.",
      "Faced with natural disasters, the islanders adopted a stoic mindset and began rebuilding immediately.",
      "Marcus Aurelius remains history's most celebrated example of a stoic ruler facing profound adversity."
    ]
  },
  {
    word: "strident",
    phonetic: "/ˈstraɪ.dənt/",
    pos: "adjective",
    definitions: [
      "Loud and harsh; grating.",
      "Presenting a point of view, especially a controversial one, in an unpleasantly forceful way."
    ],
    synonyms: ["harsh", "grating", "shrill", "raucous", "vociferous"],
    antonyms: ["soft", "dulcet", "soothing", "mild"],
    examples: [
      "The fire alarm let out a strident shriek that sent office workers hurrying down the stairwells.",
      "Her strident rhetoric in television interviews polarized public opinion on the environmental bill.",
      "Cicadas filled the humid evening air with their strident, pulsating chorus."
    ]
  },
  {
    word: "sublime",
    phonetic: "/səˈblaɪm/",
    pos: "adjective",
    definitions: [
      "Of such excellence, grandeur, or beauty as to inspire great admiration or awe.",
      "Elevated in thought, feeling, or dignity."
    ],
    synonyms: ["exalted", "magnificent", "transcendent", "glorious", "majestic"],
    antonyms: ["crude", "mediocre", "ordinary", "base"],
    examples: [
      "From the mountain summit at dawn, the sea of clouds below presented a truly sublime spectacle.",
      "Mozart's Requiem achieves moments of sublime musical transcendence rarely matched in history.",
      "The chef combined caramelized figs and aged balsamic glaze to sublime culinary perfection."
    ]
  },
  {
    word: "succinct",
    phonetic: "/səkˈsɪŋkt/",
    pos: "adjective",
    definitions: [
      "Especially of something written or spoken: briefly and clearly expressed.",
      "Condensed into a small compass."
    ],
    synonyms: ["concise", "terse", "pithy", "compact", "brief"],
    antonyms: ["verbose", "wordy", "prolix", "rambling"],
    examples: [
      "The memo gave a succinct summary of the executive board's strategic restructuring decisions.",
      "In five succinct sentences, the physicist dismantled decades of flawed theoretical assumptions.",
      "She appreciated his succinct feedback, which told her exactly what to edit without wasting time."
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
    synonyms: ["surplus", "redundant", "excess", "unneeded", "gratuitous"],
    antonyms: ["essential", "necessary", "indispensable", "vital"],
    examples: [
      "A talented editor trims away superfluous adjectives to let the core narrative shine.",
      "Packing three winter parkas for a trip to the Caribbean is completely superfluous.",
      "He removed superfluous bureaucratic steps from the application process, speeding up approvals by a month."
    ]
  },
  {
    word: "supplant",
    phonetic: "/səˈplɑːnt/",
    pos: "verb",
    definitions: [
      "To supersede and replace.",
      "To take the place of another, often through force or strategy."
    ],
    synonyms: ["supersede", "replace", "displace", "oust", "usurp"],
    antonyms: ["reinstate", "restore", "retain", "preserve"],
    examples: [
      "Digital streaming platforms quickly supplanted video rental stores across the globe.",
      "The young chess prodigy eventually supplanted the reigning world champion in a tense twelve-game match.",
      "Automated robotic assembly lines have supplanted many traditional manual factory roles."
    ]
  },
  {
    word: "surreptitious",
    phonetic: "/ˌsʌr.əpˈtɪʃ.əs/",
    pos: "adjective",
    definitions: [
      "Kept secret, especially because it would not be approved of.",
      "Conducted with stealth or stealthy secrecy."
    ],
    synonyms: ["clandestine", "secret", "stealthy", "covert", "furtive"],
    antonyms: ["overt", "open", "public", "blatant"],
    examples: [
      "He cast a surreptitious glance at his wristwatch while his colleague droned on during the slide presentation.",
      "The lovers exchanged surreptitious notes tucked inside hollow library books.",
      "Security cameras caught the employee making surreptitious copies of proprietary blueprints."
    ]
  },
  {
    word: "sycophant",
    phonetic: "/ˈsɪk.ə.fænt/",
    pos: "noun",
    definitions: [
      "A person who acts obsequiously toward someone important in order to gain advantage.",
      "A servile flatterer or toady."
    ],
    synonyms: ["toady", "flatterer", "fawner", "yes-man", "courtier"],
    antonyms: ["critic", "dissenter", "maverick", "straight-shooter"],
    examples: [
      "Surrounded by sycophants who never challenged his ideas, the emperor lost touch with economic reality.",
      "The director promoted honest innovators rather than sycophants who simply agreed with everything he said.",
      "He despised corporate sycophants who laughed loudly at every unfunny joke told by the CEO."
    ]
  },
  {
    word: "taciturn",
    phonetic: "/ˈtæs.ɪ.tɜːn/",
    pos: "adjective",
    definitions: [
      "Of a person: reserved or uncommunicative in speech; saying little.",
      "Habitually silent."
    ],
    synonyms: ["untalkative", "reticent", "quiet", "reserved", "laconic"],
    antonyms: ["talkative", "loquacious", "garrulous", "voluble"],
    examples: [
      "The veteran lighthouse keeper was a taciturn man who spoke only when urgent matters required it.",
      "Despite his taciturn reputation, he proved to be a warm, witty conversationalist once you earned his trust.",
      "Her taciturn response during the debate gave the impression that she had little to contribute to the discussion."
    ]
  },
  {
    word: "tenacious",
    phonetic: "/təˈneɪ.ʃəs/",
    pos: "adjective",
    definitions: [
      "Tending to keep a firm hold of something; clinging or adhering closely.",
      "Not readily relinquishing a position or course of action; persistent."
    ],
    synonyms: ["persistent", "resolute", "determined", "stubborn", "unyielding"],
    antonyms: ["irresolute", "yielding", "vacillating", "weak"],
    examples: [
      "Her tenacious investigation over three years finally brought down the corrupt municipal contracting ring.",
      "Ivy has a tenacious grip on ancient brick masonry, surviving harsh winter frosts.",
      "The underdog boxer showed tenacious grit, rising from the canvas twice to win the championship."
    ]
  },
  {
    word: "tirade",
    phonetic: "/taɪˈreɪd/",
    pos: "noun",
    definitions: [
      "A long, angry speech of criticism or accusation.",
      "A protracted and bitter denunciation."
    ],
    synonyms: ["diatribe", "harangue", "screed", "invective", "rant"],
    antonyms: ["compliment", "eulogy", "paean", "praise"],
    examples: [
      "The manager launched into an unexpected tirade after discovering that the quarterly sales target was missed.",
      "Rather than offering constructive critiques, the frustrated customer unleashed a furious tirade on the clerk.",
      "Her editorial avoided angry personal tirades and focused instead on verified fiscal data."
    ]
  },
  {
    word: "torpid",
    phonetic: "/ˈtɔː.pɪd/",
    pos: "adjective",
    definitions: [
      "Mentally or physically inactive; lethargic.",
      "Dormant or hibernating."
    ],
    synonyms: ["lethargic", "sluggish", "inactive", "somnolent", "dormant"],
    antonyms: ["active", "energetic", "vigorous", "dynamic"],
    examples: [
      "After the massive Thanksgiving feast, the entire family sat in a torpid state watching football.",
      "The desert lizards remain torpid under flat rocks until the morning sun warms their scales.",
      "The city's economy lay torpid for years before a massive technology campus brought new jobs."
    ]
  },
  {
    word: "tractable",
    phonetic: "/ˈtræk.tə.bəl/",
    pos: "adjective",
    definitions: [
      "Of a person or animal: easy to control or influence.",
      "Of a situation or problem: easy to deal with."
    ],
    synonyms: ["malleable", "compliant", "manageable", "amenable", "docile"],
    antonyms: ["intractable", "stubborn", "recalcitrant", "unruly"],
    examples: [
      "Golden Retrievers are celebrated for their gentle, tractable nature, making them ideal service animals.",
      "With modern software tools, complex architectural modeling has become far more tractable.",
      "A tractable negotiator is willing to adjust timelines to help both parties achieve their goals."
    ]
  },
  {
    word: "transient",
    phonetic: "/ˈtræn.zi.ənt/",
    pos: "adjective",
    definitions: [
      "Lasting only for a short time; impermanent.",
      "Staying or working in a place for only a short time."
    ],
    synonyms: ["fleeting", "ephemeral", "temporary", "momentary", "evanescent"],
    antonyms: ["permanent", "enduring", "everlasting", "eternal"],
    examples: [
      "The vibrant colors of the sunset were beautiful yet transient, fading into twilight within minutes.",
      "Financial anxiety is often transient, dissipating once a stable employment routine is established.",
      "The resort town relies heavily on transient seasonal workers to staff ski lodges in the winter."
    ]
  },
  {
    word: "trenchant",
    phonetic: "/ˈtrɛn.tʃənt/",
    pos: "adjective",
    definitions: [
      "Vigorous or incisive in expression or style.",
      "Having a sharp edge or point; cutting."
    ],
    synonyms: ["incisive", "penetrating", "sharp", "keen", "acute"],
    antonyms: ["bland", "dull", "vague", "platitudinous"],
    examples: [
      "Her trenchant analysis of the housing crisis cut straight to the core of municipal zoning failures.",
      "The columnist was famous for his trenchant wit, puncturing political vanity with a single sentence.",
      "He delivered a trenchant critique of the proposed curriculum during the school board meeting."
    ]
  },
  {
    word: "trepidation",
    phonetic: "/ˌtrɛp.ɪˈdeɪ.ʃən/",
    pos: "noun",
    definitions: [
      "A feeling of fear or agitation about something that may happen.",
      "Tremulous motion or vibration."
    ],
    synonyms: ["apprehension", "dread", "anxiety", "fear", "consternation"],
    antonyms: ["calm", "serenity", "equanimity", "confidence"],
    examples: [
      "With considerable trepidation, the young scientist stepped up to the podium to present before five Nobel laureates.",
      "The hikers entered the dark underground cavern with feelings of trepidation and heightened wonder.",
      "She opened the sealed university admissions envelope with trembling fingers and breathless trepidation."
    ]
  },
  {
    word: "truculent",
    phonetic: "/ˈtrʌk.jʊ.lənt/",
    pos: "adjective",
    definitions: [
      "Eager or quick to argue or fight; aggressively defiant.",
      "Cruel or ferocious in nature."
    ],
    synonyms: ["belligerent", "pugnacious", "defiant", "aggressive", "hostile"],
    antonyms: ["peaceable", "amicable", "cooperative", "gentle"],
    examples: [
      "The truculent hockey player was sent to the penalty box after initiating his third fight of the period.",
      "His truculent tone during the interview alienated the hiring committee within five minutes.",
      "The editorial took a truculent stance against government overreach in environmental regulation."
    ]
  },
  {
    word: "ubiquitous",
    phonetic: "/juːˈbɪk.wɪ.təs/",
    pos: "adjective",
    definitions: [
      "Present, appearing, or found everywhere.",
      "Existing or being everywhere at the same time."
    ],
    synonyms: ["omnipresent", "pervasive", "universal", "widespread", "all-over"],
    antonyms: ["rare", "scarce", "uncommon", "isolated"],
    examples: [
      "Smartphones and contactless payment terminals have become ubiquitous features of urban life.",
      "The ubiquitous green and white coffee shop logo can be found on street corners across forty countries.",
      "Microplastic pollution is now ubiquitous, detected even in high Arctic snow and deep ocean trenches."
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
    synonyms: ["sycophantic", "fawning", "oily", "greasy", "smarmy"],
    antonyms: ["sincere", "candid", "blunt", "genuine"],
    examples: [
      "The corrupt lobbyist's unctuous mannerisms made honest politicians instinctively distrust him.",
      "He delivered his praise in an unctuous tone that sounded thoroughly insincere and calculated.",
      "The rich French facial cream had a luxuriant, unctuous texture that hydrated weathered skin."
    ]
  },
  {
    word: "usurp",
    phonetic: "/juːˈzɜːp/",
    pos: "verb",
    definitions: [
      "To take a position of power or importance illegally or by force.",
      "To encroach upon or seize without right."
    ],
    synonyms: ["seize", "arrogate", "commandeer", "expropriate", "supplant"],
    antonyms: ["relinquish", "surrender", "abdicate", "yield"],
    examples: [
      "The rebellious general attempted to usurp the throne while the legitimate monarch was abroad on crusade.",
      "Algorithms should assist human physicians with diagnostics, not usurp their ultimate medical judgment.",
      "She accused her ambitious colleague of trying to usurp her role as project director."
    ]
  },
  {
    word: "vacillate",
    phonetic: "/ˈvæs.ɪ.leɪt/",
    pos: "verb",
    definitions: [
      "To alternate or waver between different opinions or actions; be indecisive.",
      "To sway steadily between choices."
    ],
    synonyms: ["waver", "hesitate", "fluctuate", "dither", "oscillate"],
    antonyms: ["decide", "resolve", "stand firm", "persevere"],
    examples: [
      "The committee vacillated for three weeks between hiring an external CEO or promoting from within.",
      "Do not vacillate when emergency strikes; swift and clear decisions save lives.",
      "His moods vacillated wildly between enthusiastic optimism and brooding, silent melancholy."
    ]
  },
  {
    word: "vapid",
    phonetic: "/ˈvæp.ɪd/",
    pos: "adjective",
    definitions: [
      "Offering nothing that is stimulating or challenging; bland.",
      "Lacking spirit, liveliness, or significance."
    ],
    synonyms: ["insipid", "bland", "dull", "uninspiring", "colorless"],
    antonyms: ["stimulating", "lively", "vibrant", "compelling"],
    examples: [
      "The magazine profile was criticized as a vapid piece of celebrity promotion with no real journalism.",
      "He found the cocktail party chatter vapid and slipped away to read in the host's library.",
      "A talented actor can occasionally elevate even the most vapid script with subtle physical performance."
    ]
  },
  {
    word: "vehement",
    phonetic: "/ˈviː.ə.mənt/",
    pos: "adjective",
    definitions: [
      "Showing strong feeling; forceful, passionate, or intense.",
      "Characterized by great physical energy or vigor."
    ],
    synonyms: ["passionate", "forceful", "fervent", "ardent", "impassioned"],
    antonyms: ["apathetic", "lukewarm", "mild", "indifferent"],
    examples: [
      "The mayor issued a vehement denial regarding the bribery allegations reported in the morning paper.",
      "Environmental groups mounted a vehement campaign against the proposed deep-sea mining exploration.",
      "Despite her vehement objections, the school board voted to shorten summer vacation by one week."
    ]
  },
  {
    word: "venerable",
    phonetic: "/ˈvɛn.ər.ə.bəl/",
    pos: "adjective",
    definitions: [
      "Accorded a great deal of respect, especially because of age, wisdom, or character.",
      "Hallowed by historical or religious associations."
    ],
    synonyms: ["revered", "hallowed", "respected", "honored", "august"],
    antonyms: ["disreputable", "disgraced", "shameful", "dishonorable"],
    examples: [
      "The venerable judge was greeted with a standing ovation from both prosecutors and defense attorneys.",
      "Oxford University's Bodleian Library is one of the most venerable intellectual institutions in the world.",
      "Beneath the boughs of the venerable thousand-year-old oak tree, village elders held their assemblies."
    ]
  },
  {
    word: "verbose",
    phonetic: "/vɜːˈboʊs/",
    pos: "adjective",
    definitions: [
      "Using or expressed in more words than are needed.",
      "Wordy and long-winded."
    ],
    synonyms: ["wordy", "loquacious", "long-winded", "prolix", "garrulous"],
    antonyms: ["concise", "succinct", "laconic", "pithy"],
    examples: [
      "His verbose legal brief ran over eighty pages, testing the patience of the presiding magistrate.",
      "Good technical writing avoids verbose jargon and communicates clear instructions in plain English.",
      "The professor's lecture was so verbose that he completed only three of his scheduled ten slides."
    ]
  },
  {
    word: "vilify",
    phonetic: "/ˈvɪl.ɪ.faɪ/",
    pos: "verb",
    definitions: [
      "To speak or write about in an abusively disparaging manner.",
      "To defame or denigrate maliciously."
    ],
    synonyms: ["defame", "denigrate", "slander", "malign", "traduce"],
    antonyms: ["commend", "laud", "praise", "extol"],
    examples: [
      "The tabloid newspaper launched an aggressive smear campaign to vilify the whistleblower.",
      "In polarized political campaigns, opponents often vilify one another rather than debate actual legislation.",
      "History has a way of vindicating leaders who were unjustly vilified during their lifetimes."
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
    synonyms: ["acquit", "exonerate", "absolve", "justify", "validate"],
    antonyms: ["condemn", "incriminate", "blame", "convict"],
    examples: [
      "The discovery of ancient trade ledgers vindicated her controversial historical hypothesis.",
      "He felt completely vindicated when the jury returned a verdict of not guilty within two hours.",
      "Her bold decision to invest in solar storage was vindicated when the energy market spiked."
    ]
  },
  {
    word: "vivacious",
    phonetic: "/vɪˈveɪ.ʃəs/",
    pos: "adjective",
    definitions: [
      "Attractively lively and animated, typically used of a woman.",
      "Full of high spirits and vitality."
    ],
    synonyms: ["lively", "animated", "effervescent", "ebullient", "spirited"],
    antonyms: ["morose", "dull", "languid", "lethargic"],
    examples: [
      "Her vivacious laughter and storytelling lit up the entire garden party.",
      "The actress brought a vivacious, sparkling energy to the stage in her Broadway debut.",
      "Even in her nineties, the matriarch remained remarkably vivacious, swimming in the sea every morning."
    ]
  },
  {
    word: "vociferous",
    phonetic: "/voʊˈsɪf.ər.əs/",
    pos: "adjective",
    definitions: [
      "Expressing or characterized by vehement opinions; loud and forceful.",
      "Clamorous or shouting out."
    ],
    synonyms: ["clamorous", "vehement", "outspoken", "vocal", "strident"],
    antonyms: ["quiet", "silent", "taciturn", "reticent"],
    examples: [
      "The proposed highway expansion drew vociferous protests from historic conservationists.",
      "Despite vociferous objections from the opposition party, the emergency budget passed by four votes.",
      "He was a vociferous critic of unvetted algorithms in automated credit scoring systems."
    ]
  },
  {
    word: "volatile",
    phonetic: "/ˈvɒl.ə.taɪl/",
    pos: "adjective",
    definitions: [
      "Liable to change rapidly and unpredictably, especially for the worse.",
      "Easily evaporated at normal temperatures."
    ],
    synonyms: ["unpredictable", "capricious", "turbulent", "unstable", "mercurial"],
    antonyms: ["stable", "constant", "steady", "predictable"],
    examples: [
      "Stock markets remained volatile throughout the morning as geopolitical tensions escalated.",
      "His volatile temper made colleagues hesitant to bring bad news to his office directly.",
      "Ether and acetone are highly volatile organic solvents that must be stored in specialized safety cabinets."
    ]
  },
  {
    word: "voracious",
    phonetic: "/vəˈreɪ.ʃəs/",
    pos: "adjective",
    definitions: [
      "Wanting or devouring great quantities of food.",
      "Having a very eager approach to an activity or study."
    ],
    synonyms: ["insatiable", "ravenous", "unquenchable", "avid", "greedy"],
    antonyms: ["indifferent", "apathetic", "moderate", "frugal"],
    examples: [
      "From an early age, she was a voracious reader who finished three library books every weekend.",
      "Teenage athletes often have voracious appetites that require four full meals a day.",
      "The young scholar had a voracious curiosity about ancient Babylonian cuneiform tablets."
    ]
  },
  {
    word: "wanton",
    phonetic: "/ˈwɒn.tən/",
    pos: "adjective",
    definitions: [
      "Of a cruel or violent action: deliberate and unprovoked.",
      "Sexually unrestrained; immodest."
    ],
    synonyms: ["unprovoked", "malicious", "gratuitous", "willful", "reckless"],
    antonyms: ["justified", "deliberate", "restrained", "moral"],
    examples: [
      "The vandalism of the community center was an act of wanton malice that shocked the neighborhood.",
      "The timber company was fined heavily for wanton destruction of virgin old-growth redwood groves.",
      "He squandered his family inheritance on wanton extravagance and late-night gambling casinos."
    ]
  },
  {
    word: "zealot",
    phonetic: "/ˈzɛl.ət/",
    pos: "noun",
    definitions: [
      "A person who is fanatical and uncompromising in pursuit of their religious, political, or other ideals.",
      "An ardent partisan or champion."
    ],
    synonyms: ["fanatic", "extremist", "partisan", "ideologue", "militant"],
    antonyms: ["moderate", "pragmatist", "skeptic", "neutral"],
    examples: [
      "He was a fitness zealot who rose at four every morning to run ten miles and track his macros to the gram.",
      "Religious zealots historically clashed when tolerance and secular coexistence broke down.",
      "A true statesman listens to varied perspectives rather than yielding to political zealots."
    ]
  },
  {
    word: "zeitgeist",
    phonetic: "/ˈtsaɪt.ɡaɪst/",
    pos: "noun",
    definitions: [
      "The defining spirit or mood of a particular period of history as shown by the ideas and beliefs of the time.",
      "The cultural and intellectual atmosphere of an era."
    ],
    synonyms: ["spirit of the age", "mood", "ethos", "temper", "milieu"],
    antonyms: ["anachronism", "timelessness", "isolation"],
    examples: [
      "The novel captured the restless, countercultural zeitgeist of late 1960s San Francisco.",
      "Fashion designers must keep a finger on the cultural zeitgeist to anticipate consumer desires.",
      "The tech revolution has become the defining economic and social zeitgeist of the twenty-first century."
    ]
  }
];

newEntries.forEach(entry => {
  wordMap.set(entry.word.toLowerCase(), entry);
});

console.log('Total words in new master bank:', wordMap.size);

// Save updated bank
const finalBank = Array.from(wordMap.values());
const jsContent = 'window.WORD_BANK = ' + JSON.stringify(finalBank, null, 2) + ';\n';
fs.writeFileSync('words.js', jsContent, 'utf8');
console.log('Successfully updated words.js with rich entries! File size:', jsContent.length);
