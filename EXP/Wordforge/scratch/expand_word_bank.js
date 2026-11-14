const fs = require('fs');

global.window = global;
require('../words.js');
const currentBank = global.WORD_BANK || [];
console.log('Current bank has:', currentBank.length);

const bankMap = new Map();
currentBank.forEach(w => bankMap.set(w.word.toLowerCase(), w));

// Extended master vocabulary entries with handcrafted rich definitions and diverse, non-repeating sentences!
const extendedWords = [
  {
    word: "acquiesce",
    phonetic: "/ˌæk.wiˈɛs/",
    pos: "verb",
    definitions: [
      "To accept something reluctantly but without protest.",
      "To comply silently or agree by silence."
    ],
    synonyms: ["consent", "comply", "accede", "concede", "assent"],
    antonyms: ["dissent", "protest", "resist", "rebel"],
    examples: [
      "Faced with overwhelming public pressure, the governor chose to acquiesce to the committee's recommendations.",
      "She refused to acquiesce in a corrupt system that rewarded cronyism over competence.",
      "After hours of spirited debate, the minority caucus decided to acquiesce and allow the vote."
    ]
  },
  {
    word: "acerbic",
    phonetic: "/əˈsɜː.bɪk/",
    pos: "adjective",
    definitions: [
      "Sharp and forthright in speech or manner.",
      "Tasting sour or bitter."
    ],
    synonyms: ["sharp", "sarcastic", "caustic", "scathing", "mordant"],
    antonyms: ["sweet", "mild", "gentle", "complimentary"],
    examples: [
      "The theater critic's acerbic review sent shockwaves through the production company.",
      "Beneath his acerbic wit, he possessed a genuine concern for young investigative journalists.",
      "Her acerbic remarks during the live debate caught her diplomatic opponents off guard."
    ]
  },
  {
    word: "adroit",
    phonetic: "/əˈdrɔɪt/",
    pos: "adjective",
    definitions: [
      "Clever or skillful in using the hands or mind.",
      "Resourceful and adept in handling delicate situations."
    ],
    synonyms: ["adept", "deft", "skillful", "dexterous", "nimble"],
    antonyms: ["clumsy", "maladroit", "inept", "awkward"],
    examples: [
      "Through adroit diplomatic maneuvering, she averted a costly trade war between the two nations.",
      "The pianist's adroit fingers flew effortlessly across the keyboard during the difficult cadenza.",
      "An adroit negotiator knows how to make opponents feel respected even when conceding points."
    ]
  },
  {
    word: "aggrandize",
    phonetic: "/əˈɡræn.daɪz/",
    pos: "verb",
    definitions: [
      "To increase the power, status, or wealth of someone or something.",
      "To enhance the reputation of someone beyond what is justified by facts."
    ],
    synonyms: ["exalt", "magnify", "elevate", "inflate", "amplify"],
    antonyms: ["belittle", "diminish", "debase", "humble"],
    examples: [
      "The emperor used conquests and lavish monuments to aggrandize his royal legacy.",
      "Critics argued the biography served only to aggrandize the industrialist while ignoring his workers.",
      "He sought political office not to serve the community, but to aggrandize his personal business empire."
    ]
  },
  {
    word: "ambivalent",
    phonetic: "/æmˈbɪv.ə.lənt/",
    pos: "adjective",
    definitions: [
      "Having mixed feelings or contradictory ideas about something or someone.",
      "Unable to decide between two conflicting courses of action."
    ],
    synonyms: ["equivocal", "uncertain", "conflicted", "undecided", "torn"],
    antonyms: ["resolute", "decisive", "unequivocal", "certain"],
    examples: [
      "She felt ambivalent about leaving her hometown for the prestigious fellowship in London.",
      "Voters remained ambivalent toward both major candidates, leading to record numbers of undecided ballots.",
      "His ambivalent response to the promotion surprised colleagues who expected immediate excitement."
    ]
  },
  {
    word: "anachronism",
    phonetic: "/əˈnæk.rə.nɪ.zəm/",
    pos: "noun",
    definitions: [
      "A thing belonging or appropriate to a period other than that in which it exists.",
      "An act of attributing a custom, event, or object to an improper chronological period."
    ],
    synonyms: ["chronological error", "misplacement", "relic", "archaisms", "curiosity"],
    antonyms: ["contemporary", "timeliness", "sync"],
    examples: [
      "Seeing a modern digital wristwatch on the Roman gladiator in the film was a hilarious anachronism.",
      "In our cashless digital economy, written paper checks have increasingly become an anachronism.",
      "The historic estate was a charming anachronism nestled among glassy twentieth-century skyscrapers."
    ]
  },
  {
    word: "animus",
    phonetic: "/ˈæn.ɪ.məs/",
    pos: "noun",
    definitions: [
      "Hostility or ill feeling.",
      "Motivation, purpose, or intention in psychological theory."
    ],
    synonyms: ["hostility", "animosity", "antagonism", "rancor", "enmity"],
    antonyms: ["goodwill", "friendship", "amity", "sympathy"],
    examples: [
      "The investigator found no evidence of personal animus behind the zoning commissioner's decision.",
      "Old family animus resurfaced during the reading of the disputed real estate will.",
      "Her fiery critique seemed driven more by ideological animus than by factual analysis."
    ]
  },
  {
    word: "apogee",
    phonetic: "/ˈæp.ə.dʒiː/",
    pos: "noun",
    definitions: [
      "The highest point in the development of something; a climax or culmination.",
      "The point in the orbit of the moon or a satellite at which it is furthest from the earth."
    ],
    synonyms: ["zenith", "pinnacle", "culmination", "apex", "acme"],
    antonyms: ["nadir", "perigee", "bottom", "trough"],
    examples: [
      "The philosopher's career reached its apogee with the publication of her groundbreaking ethical treatise.",
      "At its apogee in the sixteenth century, the maritime republic dominated Mediterranean commercial trade.",
      "The satellite transmitted high-resolution sensor data as it reached the apogee of its elliptical orbit."
    ]
  },
  {
    word: "approbation",
    phonetic: "/ˌæp.rəˈbeɪ.ʃən/",
    pos: "noun",
    definitions: [
      "Approval or praise, especially formal or official.",
      "Commendation or sanction."
    ],
    synonyms: ["approval", "acceptance", "endorsement", "commendation", "applause"],
    antonyms: ["censure", "disapproval", "condemnation", "rebuke"],
    examples: [
      "The architectural proposal received the enthusiastic approbation of the municipal historic board.",
      "He performed not for financial reward, but for the warm approbation of the classical concert hall audience.",
      "Without the official approbation of regulatory authorities, clinical trials could not proceed."
    ]
  },
  {
    word: "archetype",
    phonetic: "/ˈɑː.kɪ.taɪp/",
    pos: "noun",
    definitions: [
      "A very typical example of a certain person or thing; an original model.",
      "In Jungian psychology: a primitive mental image inherited from earliest human ancestors."
    ],
    synonyms: ["prototype", "epitome", "model", "quintessence", "paragon"],
    antonyms: ["anomaly", "derivative", "copy", "replica"],
    examples: [
      "Sherlock Holmes has become the cultural archetype for brilliant yet eccentric detective figures.",
      "The myth of the wandering hero is a universal archetype found across ancient global literatures.",
      "Her design studio created the archetype that modern electric city runabouts now emulate."
    ]
  },
  {
    word: "artless",
    phonetic: "/ˈɑːt.ləs/",
    pos: "adjective",
    definitions: [
      "Without guile or deception; natural and simple.",
      "Without artificiality or sophisticated pretension."
    ],
    synonyms: ["ingenuous", "guileless", "innocent", "unpretentious", "candid"],
    antonyms: ["cunning", "artful", "deceitful", "scheming"],
    examples: [
      "The little boy disarmed the stern police officer with his artless smile and honest apology.",
      "Her artless prose style felt like a refreshing conversation with a trusted childhood companion.",
      "He gave an artless account of the events, completely unaware that his words exonerated his friend."
    ]
  },
  {
    word: "aspersion",
    phonetic: "/əˈspɜː.ʒən/",
    pos: "noun",
    definitions: [
      "An attack on the reputation or integrity of someone or something.",
      "A disparaging remark or slanderous accusation."
    ],
    synonyms: ["slander", "calumny", "defamation", "slur", "vilification"],
    antonyms: ["eulogy", "praise", "commendation", "compliment"],
    examples: [
      "The diplomat refused to cast aspersions on the motives of foreign delegates during the peace summit.",
      "She considered it unethical to win an election by spreading malicious aspersions about an opponent's family.",
      "His integrity was beyond reproach, and colleagues rallied to dismiss the baseless aspersions."
    ]
  },
  {
    word: "astringent",
    phonetic: "/əˈstrɪn.dʒənt/",
    pos: "adjective",
    definitions: [
      "Sharp or severe in manner or style.",
      "Causing the contraction of skin cells and body tissues."
    ],
    synonyms: ["severe", "sharp", "stern", "austere", "constrictive"],
    antonyms: ["mild", "lenient", "soothing", "gentle"],
    examples: [
      "The editor's astringent comments on the draft stung, but they undoubtedly made the manuscript tighter.",
      "Witch hazel lotion has natural astringent properties that tighten facial pores and soothe minor inflammation.",
      "Her astringent wit punctured pompous egos at the academic reception."
    ]
  },
  {
    word: "auspicious",
    phonetic: "/ɔːˈspɪʃ.əs/",
    pos: "adjective",
    definitions: [
      "Conducive to success; favorable.",
      "Giving or being a sign of future success."
    ],
    synonyms: ["favorable", "propitious", "promising", "providential", "felicitous"],
    antonyms: ["ominous", "inauspicious", "ill-omened", "unfavorable"],
    examples: [
      "Clear sunny skies and a gentle breeze provided an auspicious beginning to the transatlantic voyage.",
      "The startup's debut on the stock market marked an auspicious start to its international expansion.",
      "In many Eastern traditions, spring festivals are viewed as an auspicious time for starting new ventures."
    ]
  },
  {
    word: "baleful",
    phonetic: "/ˈbeɪl.fʊl/",
    pos: "adjective",
    definitions: [
      "Threatening harm; menacing.",
      "Having a harmful or destructive effect."
    ],
    synonyms: ["menacing", "sinister", "malevolent", "threatening", "pernicious"],
    antonyms: ["benevolent", "friendly", "wholesome", "favorable"],
    examples: [
      "The captured spy cast a baleful look at his interrogators and refused to utter a single word.",
      "Dark, baleful storm clouds gathered over the mountain pass, warning the hikers to turn back.",
      "Uncontrolled industrial pollution had a baleful influence on marine ecology in the bay."
    ]
  },
  {
    word: "beguile",
    phonetic: "/bɪˈɡaɪl/",
    pos: "verb",
    definitions: [
      "To charm or enchant someone, sometimes in a deceptive way.",
      "To help time pass pleasantly."
    ],
    synonyms: ["charm", "enchant", "captivate", "bewitch", "fascinate"],
    antonyms: ["repel", "disenchant", "offend", "bore"],
    examples: [
      "The charismatic con artist beguiled wealthy patrons with promises of secret sunken treasure.",
      "She beguiled the long winter evenings by reading Greek myths aloud by the fireside.",
      "Tourists were beguiled by the old harbor's colorful boats and acoustic folk musicians."
    ]
  },
  {
    word: "behemoth",
    phonetic: "/bɪˈhiː.mɒθ/",
    pos: "noun",
    definitions: [
      "A huge or monstrous creature.",
      "Something enormous, especially a large and powerful organization."
    ],
    synonyms: ["giant", "leviathan", "colossus", "titan", "mammoth"],
    antonyms: ["dwarf", "midget", "micro-entity", "pipsqueak"],
    examples: [
      "The regional bookstore struggled to survive against the online retail behemoth.",
      "A colossal steel behemoth of a container ship slowly navigated into the deepwater harbor.",
      "Financial regulators scrutinized the proposed merger between the two banking behemoths."
    ]
  },
  {
    word: "belie",
    phonetic: "/bɪˈlaɪ/",
    pos: "verb",
    definitions: [
      "To fail to give a true notion or impression of something; disguise or contradict.",
      "To fail to fulfill or justify a claim or expectation."
    ],
    synonyms: ["contradict", "disprove", "disguise", "mask", "misrepresent"],
    antonyms: ["reveal", "manifest", "verify", "attest"],
    examples: [
      "Her calm demeanor during the medical crisis belied the intense panic churning inside her.",
      "The small cottage's modest exterior belies an extraordinarily spacious, architect-designed interior.",
      "His frail physical appearance belied an iron willpower that overcame every obstacle."
    ]
  },
  {
    word: "benign",
    phonetic: "/bɪˈnaɪn/",
    pos: "adjective",
    definitions: [
      "Gentle and kindly in disposition.",
      "Of a disease: not harmful in effect, not malignant."
    ],
    synonyms: ["gentle", "harmless", "favorable", "benevolent", "innocuous"],
    antonyms: ["malignant", "malevolent", "harmful", "destructive"],
    examples: [
      "The grandfather had a benign, twinkling gaze that made neighborhood children feel instantly safe.",
      "The biopsy results brought immense relief to the family, confirming the growth was completely benign.",
      "A benign climate with mild winters made the valley ideal for growing sensitive citrus groves."
    ]
  },
  {
    word: "bucolic",
    phonetic: "/bjuːˈkɒl.ɪk/",
    pos: "adjective",
    definitions: [
      "Relating to the pleasant aspects of the countryside and country life.",
      "Rustic, pastoral, or rural."
    ],
    synonyms: ["pastoral", "rustic", "rural", "country", "idyllic"],
    antonyms: ["urban", "metropolitan", "industrial", "city"],
    examples: [
      "The landscape painter spent his summers capturing the bucolic charm of rolling Vermont pastures.",
      "Tired of traffic congestion, the young couple traded their loft for a bucolic homestead with an orchard.",
      "The travel memoir transported readers to bucolic French hamlets where cheese was aged in stone cellars."
    ]
  },
  {
    word: "calumny",
    phonetic: "/ˈkæl.əm.ni/",
    pos: "noun",
    definitions: [
      "The making of false and defamatory statements in order to damage someone's reputation; slander.",
      "A false accusation maliciously made."
    ],
    synonyms: ["slander", "defamation", "libel", "vilification", "aspersion"],
    antonyms: ["praise", "acclaim", "vindication", "tribute"],
    examples: [
      "The statesman spent years clearing his family name from political calumny propagated by rivals.",
      "She endured vicious press calumny with stoic poise until the courts issued a formal retraction.",
      "Spreading calumny behind anonymous internet accounts violates the core tenets of ethical journalism."
    ]
  },
  {
    word: "castigate",
    phonetic: "/ˈkæs.tɪ.ɡeɪt/",
    pos: "verb",
    definitions: [
      "To reprimand someone severely.",
      "To criticize harshly or punish in order to correct."
    ],
    synonyms: ["reprimand", "rebuke", "chastise", "scold", "censure"],
    antonyms: ["praise", "commend", "applaud", "compliment"],
    examples: [
      "The editor castigated the young reporter for relying on single unverified anonymous sources.",
      "The parliamentary committee castigated pharmaceutical executives over unconscionable price hikes.",
      "Judges often castigate defense attorneys who intentionally delay criminal proceedings."
    ]
  },
  {
    word: "catalyst",
    phonetic: "/ˈkæt.əl.ɪst/",
    pos: "noun",
    definitions: [
      "A person or thing that precipitates an event or change.",
      "A substance that increases the rate of a chemical reaction without itself undergoing any permanent change."
    ],
    synonyms: ["stimulus", "spark", "impetus", "generator", "trigger"],
    antonyms: ["inhibitor", "deterrent", "impediment", "obstacle"],
    examples: [
      "Rosa Parks' historic defiance was the catalyst that ignited the modern civil rights bus boycott.",
      "The unexpected corporate bankruptcy served as a catalyst for sweeping financial regulation reforms.",
      "Platinum acts as an efficient catalyst in automotive converters, transforming toxic exhaust gases."
    ]
  },
  {
    word: "catharsis",
    phonetic: "/kəˈθɑː.sɪs/",
    pos: "noun",
    definitions: [
      "The process of releasing, and thereby providing relief from, strong or repressed emotions.",
      "Pumping out of emotional tension through artistic experience."
    ],
    synonyms: ["purging", "cleansing", "release", "relief", "exorcism"],
    antonyms: ["repression", "suppression", "tension", "burden"],
    examples: [
      "Writing the memoir served as an emotional catharsis, allowing him to process childhood traumas.",
      "Aristotle argued that ancient tragic plays provided viewers with a psychological catharsis through pity and fear.",
      "Sobbing openly during the movie's poignant climax gave her a surprising sense of catharsis."
    ]
  },
  {
    word: "celerity",
    phonetic: "/sɪˈlɛr.ɪ.ti/",
    pos: "noun",
    definitions: [
      "Swiftness of movement.",
      "Rapid dispatch of business or action."
    ],
    synonyms: ["speed", "swiftness", "rapidity", "alacrity", "haste"],
    antonyms: ["sluggishness", "delay", "torpor", "lethargy"],
    examples: [
      "Emergency rescue crews responded with remarkable celerity, reaching the trapped miners within an hour.",
      "The agile cheetah pursued the gazelle across the savannah with breathtaking celerity.",
      "When market conditions shifted, the investment fund reorganized its portfolio with surgical celerity."
    ]
  },
  {
    word: "chicanery",
    phonetic: "/ʃɪˈkeɪ.nər.i/",
    pos: "noun",
    definitions: [
      "The use of trickery to achieve a political, financial, or legal purpose.",
      "Deceptive or fraudulent manipulation."
    ],
    synonyms: ["trickery", "deception", "duplicity", "subterfuge", "fraud"],
    antonyms: ["honesty", "candor", "probity", "fairness"],
    examples: [
      "The corporate fraud trial exposed extensive accounting chicanery designed to inflate stock values.",
      "Voters grew disgusted by political chicanery that manipulated voting district borders for partisan advantage.",
      "A scrupulous legal advisor avoids tactical chicanery and relies on sound statutory arguments."
    ]
  },
  {
    word: "choleric",
    phonetic: "/ˈkɒl.ər.ɪk/",
    pos: "adjective",
    definitions: [
      "Bad-tempered or irritable.",
      "Easily moved to anger."
    ],
    synonyms: ["irascible", "peevish", "cantankerous", "testy", "hot-tempered"],
    antonyms: ["placid", "phlegmatic", "affable", "calm"],
    examples: [
      "The choleric sea captain was notorious for barking furious orders at junior sailors on watch.",
      "Excessive caffeine and lack of sleep transformed the mild-mannered scholar into a choleric boss.",
      "In medieval medicine, a choleric temperament was attributed to an excess of yellow bile."
    ]
  },
  {
    word: "circumlocution",
    phonetic: "/ˌsɜː.kəm.ləˈkjuː.ʃən/",
    pos: "noun",
    definitions: [
      "The use of many words where fewer would do, especially in a deliberate attempt to be vague or evasive.",
      "Roundabout speaking or writing."
    ],
    synonyms: ["periphrasis", "wordiness", "prolixity", "evasiveness", "verbiage"],
    antonyms: ["conciseness", "brevity", "terseness", "directness"],
    examples: [
      "The politician used elaborate circumlocution to avoid answering whether taxes would rise next year.",
      "Her legal brief was marred by tedious circumlocution that exhausted the presiding judge.",
      "Rather than saying 'he died,' the Victorian speaker used the circumlocution 'he departed this earthly vale.'"
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
    synonyms: ["secret", "covert", "surreptitious", "stealthy", "furtive"],
    antonyms: ["open", "overt", "public", "conspicuous"],
    examples: [
      "The rebels held clandestine strategy sessions in abandoned railway cars late at night.",
      "Diplomats maintained clandestine back-channel communication to resolve the border dispute.",
      "The regulatory agency launched a probe into the investment firm's clandestine offshore holdings."
    ]
  },
  {
    word: "conundrum",
    phonetic: "/kəˈnʌn.drəm/",
    pos: "noun",
    definitions: [
      "A confusing and difficult problem or question.",
      "A question asked for amusement, typically one with a pun in its answer; a riddle."
    ],
    synonyms: ["puzzle", "enigma", "riddle", "quandary", "dilemma"],
    antonyms: ["solution", "clarity", "answer", "certainty"],
    examples: [
      "Balancing regional economic growth with aggressive wetlands conservation is a classic urban conundrum.",
      "The mathematician spent years attacking the cryptographic conundrum before finding an elegant proof.",
      "Ethicists wrestled with the moral conundrum of programming emergency self-driving car algorithms."
    ]
  },
  {
    word: "corporeal",
    phonetic: "/kɔːˈpɔː.ri.əl/",
    pos: "adjective",
    definitions: [
      "Relating to a person's body, especially as opposed to their spirit.",
      "Having an objective, physical, or material existence."
    ],
    synonyms: ["bodily", "physical", "fleshy", "tangible", "material"],
    antonyms: ["spiritual", "ethereal", "incorporeal", "intangible"],
    examples: [
      "Monks practiced ascetic fasting to transcend corporeal desires and attain spiritual enlightenment.",
      "The ghost story revolved around a specter longing to experience the simple corporeal sensation of touch.",
      "Law recognizes corporeal property such as real estate as distinct from intellectual copyright."
    ]
  },
  {
    word: "credulous",
    phonetic: "/ˈkrɛdʒ.ʊ.ləs/",
    pos: "adjective",
    definitions: [
      "Having or showing too great a readiness to believe things.",
      "Easily deceived or cheated; gullible."
    ],
    synonyms: ["gullible", "naive", "impressionable", "trusting", "unsuspecting"],
    antonyms: ["skeptical", "incredulous", "suspicious", "discerning"],
    examples: [
      "The fortune teller took advantage of credulous tourists seeking romantic predictions.",
      "A healthy dose of scientific skepticism protects the public from credulous belief in internet hoaxes.",
      "He was so credulous that he fell for an email claiming he had won a lottery he never entered."
    ]
  },
  {
    word: "debilitating",
    phonetic: "/dɪˈbɪl.ɪ.teɪ.tɪŋ/",
    pos: "adjective",
    definitions: [
      "Of a disease or condition: making someone very weak and infirm.",
      "Tending to impair the strength or energy of something."
    ],
    synonyms: ["weakening", "enervating", "crippling", "paralyzing", "exhausting"],
    antonyms: ["restorative", "invigorating", "strengthening", "salutary"],
    examples: [
      "Rheumatoid arthritis is a debilitating chronic condition that inflames joints and restricts mobility.",
      "The startup suffered a debilitating cash shortfall when its primary venture partner withdrew funding.",
      "Chronic migraines can be entirely debilitating, leaving sufferers unable to tolerate sound or light."
    ]
  },
  {
    word: "decorous",
    phonetic: "/ˈdɛk.ər.əs/",
    pos: "adjective",
    definitions: [
      "In keeping with good taste and propriety; polite and restrained.",
      "Marked by proper social manners and decorum."
    ],
    synonyms: ["polite", "proper", "seemly", "genteel", "dignified"],
    antonyms: ["indecorous", "unseemly", "unruly", "vulgar"],
    examples: [
      "The state banquet was a decorous affair where guests adhered strictly to royal dining protocol.",
      "She offered a decorous greeting to her former rival, burying past resentments under gracious politeness.",
      "The courtroom proceedings were decorous and solemn under the watchful eye of the veteran magistrate."
    ]
  },
  {
    word: "demure",
    phonetic: "/dɪˈmjʊər/",
    pos: "adjective",
    definitions: [
      "Reserved, modest, and shy, typically used of a woman.",
      "Affectedly modest or serious."
    ],
    synonyms: ["modest", "reserved", "coy", "prim", "reticent"],
    antonyms: ["brazen", "bold", "shameless", "assertive"],
    examples: [
      "Behind her demure appearance lay a fiercely competitive chess champion who never backed down.",
      "She gave a demure nod when complimented on her piano recital performance.",
      "The Victorian portrait depicted a demure maiden seated beside a wicker basket of lavender."
    ]
  },
  {
    word: "denigrate",
    phonetic: "/ˈdɛn.ɪ.ɡreɪt/",
    pos: "verb",
    definitions: [
      "To criticize unfairly; disparage.",
      "To blacken the reputation of someone."
    ],
    synonyms: ["disparage", "belittle", "defame", "deprecate", "vilify"],
    antonyms: ["praise", "extol", "laud", "magnify"],
    examples: [
      "It is petty to denigrate the accomplishments of others simply because you disagree with their politics.",
      "The review unfairly denigrated the indie film's technical craftsmanship despite its micro-budget.",
      "He spent his energy building up young apprentices rather than denigrating rival tradesmen."
    ]
  },
  {
    word: "desiccated",
    phonetic: "/ˈdɛs.ɪ.keɪ.tɪd/",
    pos: "adjective",
    definitions: [
      "Having had the moisture removed; dried out.",
      "Lacking vitality, passion, or interest."
    ],
    synonyms: ["dried", "parched", "dehydrated", "shriveled", "lifeless"],
    antonyms: ["hydrated", "moist", "lush", "vital"],
    examples: [
      "Archeologists discovered desiccated lotus seeds inside the Egyptian tomb that still sprouted when watered.",
      "The lecture on municipal tax regulations was dry and desiccated, sending half the hall to sleep.",
      "Severe summer heat left the prairie grass brown, brittle, and desiccated."
    ]
  },
  {
    word: "despondent",
    phonetic: "/dɪˈspɒn.dənt/",
    pos: "adjective",
    definitions: [
      "In low spirits from loss of hope or courage.",
      "Depressed or dejected."
    ],
    synonyms: ["dejected", "downhearted", "disheartened", "morose", "crestfallen"],
    antonyms: ["buoyant", "cheerful", "sanguine", "hopeful"],
    examples: [
      "After his third consecutive business venture failed, he grew despondent and withdrawn.",
      "A compassionate mentor encouraged the despondent graduate student to revise and resubmit her paper.",
      "Despite initial despondent feelings after the injury, the athlete began physical therapy with renewed grit."
    ]
  },
  {
    word: "diaphanous",
    phonetic: "/daɪˈæf.ə.nəs/",
    pos: "adjective",
    definitions: [
      "Especially of fabric: light, delicate, and translucent.",
      "Characterized by delicacy of texture or ethereal lightness."
    ],
    synonyms: ["sheer", "translucent", "gossamer", "ethereal", "delicate"],
    antonyms: ["opaque", "thick", "heavy", "dense"],
    examples: [
      "Diaphanous silk curtains fluttered in the gentle morning breeze entering through the open balcony doors.",
      "The dancer wore a diaphanous veil that floated like mist as she spun across the stage.",
      "In the early dawn, a diaphanous layer of ground fog blanketed the meadow flowers."
    ]
  },
  {
    word: "discomfit",
    phonetic: "/dɪsˈkʌm.fɪt/",
    pos: "verb",
    definitions: [
      "To make someone feel uneasy or embarrassed.",
      "To defeat or baffle someone's plans."
    ],
    synonyms: ["embarrass", "disconcert", "unsettle", "fluster", "perplex"],
    antonyms: ["comfort", "reassure", "soothe", "embolden"],
    examples: [
      "The sudden direct question about his past tax filings thoroughly discomfited the candidate.",
      "She was discomfited by the eerie silence in the abandoned country hospital.",
      "Tactical questions from the junior researcher discomfited the senior professor during the panel."
    ]
  },
  {
    word: "disparage",
    phonetic: "/dɪˈspær.ɪdʒ/",
    pos: "verb",
    definitions: [
      "To regard or represent as being of little worth.",
      "To belittle or bring reproach upon."
    ],
    synonyms: ["belittle", "denigrate", "deprecate", "demean", "undervalue"],
    antonyms: ["praise", "extol", "compliment", "laud"],
    examples: [
      "Never disparage the humble efforts of beginners who are courageously learning a new skill.",
      "The rival coach disparaged the tournament hosts, claiming the playing field was substandard.",
      "She rose above colleagues who sought to disparage her innovative research in corporate meetings."
    ]
  },
  {
    word: "dissemble",
    phonetic: "/dɪˈsɛm.bəl/",
    pos: "verb",
    definitions: [
      "To conceal one's true motives, feelings, or beliefs.",
      "To give a false appearance to something."
    ],
    synonyms: ["dissimulate", "feign", "masquerade", "camouflage", "conceal"],
    antonyms: ["reveal", "confess", "disclose", "manifest"],
    examples: [
      "He dissembled his intense anxiety behind a bright smile and jovial jokes.",
      "Spies are trained to dissemble their identities under the most rigorous interrogations.",
      "Rather than dissemble with empty promises, the executive candidly admitted the quarterly losses."
    ]
  },
  {
    word: "dissuade",
    phonetic: "/dɪˈsweɪd/",
    pos: "verb",
    definitions: [
      "To persuade someone not to take a particular course of action.",
      "To deter by advice or argument."
    ],
    synonyms: ["deter", "discourage", "divert", "disincline", "prevent"],
    antonyms: ["persuade", "encourage", "incite", "urge"],
    examples: [
      "Family members attempted to dissuade the solo sailor from attempting the treacherous Cape Horn crossing.",
      "Nothing could dissuade the young doctor from volunteering in the remote field hospital.",
      "High import tariffs were designed to dissuade domestic consumers from purchasing foreign vehicles."
    ]
  },
  {
    word: "distend",
    phonetic: "/dɪˈstɛnd/",
    pos: "verb",
    definitions: [
      "To swell or cause to swell by pressure from inside.",
      "To expand or dilate."
    ],
    synonyms: ["swell", "bloat", "dilate", "expand", "inflate"],
    antonyms: ["contract", "shrink", "deflate", "compress"],
    examples: [
      "Severe malnutrition can paradoxically cause the abdomen to distend in young children.",
      "The python's stomach distended alarmingly after swallowing the large antelope whole.",
      "Excess steam pressure inside the boiler caused the iron tank to distend dangerously."
    ]
  },
  {
    word: "dissonance",
    phonetic: "/ˈdɪs.ə.nəns/",
    pos: "noun",
    definitions: [
      "A lack of harmony among musical notes.",
      "A tension or clash resulting from the combination of two disharmonious or contradictory elements."
    ],
    synonyms: ["discord", "disharmony", "stridency", "incongruity", "discrepancy"],
    antonyms: ["harmony", "concord", "euphony", "accord"],
    examples: [
      "Modern jazz often utilizes deliberate dissonance to create emotional tension before resolving into melody.",
      "Cognitive dissonance occurs when an individual's personal actions contradict their moral beliefs.",
      "There was a glaring dissonance between the politician's lavish lifestyle and his populist campaign rhetoric."
    ]
  },
  {
    word: "droll",
    phonetic: "/droʊl/",
    pos: "adjective",
    definitions: [
      "Curious or unusual in a way that provokes dry amusement.",
      "Oddly comical."
    ],
    synonyms: ["funny", "humorous", "wry", "whimsical", "quirky"],
    antonyms: ["serious", "somber", "humorless", "grave"],
    examples: [
      "The comedian had a wonderfully droll delivery, never smiling while delivering devastating punchlines.",
      "His droll observations about life in suburbia kept dinner guests quietly chuckling all evening.",
      "The author has a droll sense of irony that permeates every chapter of the travel memoir."
    ]
  },
  {
    word: "ebullient",
    phonetic: "/ɪˈbʊl.i.ənt/",
    pos: "adjective",
    definitions: [
      "Cheerful and full of energy; exuberant.",
      "Overflowing with enthusiasm or excitement."
    ],
    synonyms: ["exuberant", "buoyant", "effervescent", "high-spirited", "vivacious"],
    antonyms: ["depressed", "morose", "somber", "subdued"],
    examples: [
      "The ebullient crowd flooded the pitch in celebration as the final whistle blew.",
      "Her ebullient greeting always brightened the spirits of colleagues arriving on rainy Monday mornings.",
      "Even after eight hours of mountain hiking, the children remained ebullient and full of chatter."
    ]
  },
  {
    word: "edify",
    phonetic: "/ˈɛd.ɪ.faɪ/",
    pos: "verb",
    definitions: [
      "To instruct or improve someone morally or intellectually.",
      "To enlighten or uplift spiritually."
    ],
    synonyms: ["enlighten", "instruct", "educate", "illuminate", "uplift"],
    antonyms: ["corrupt", "debase", "mislead", "befuddle"],
    examples: [
      "The ancient philosophical dialogues were intended to edify citizens, not merely entertain them.",
      "A well-curated museum exhibition should both captivate the senses and edify the intellect.",
      "She sought books that would edify her understanding of global historical injustices."
    ]
  },
  {
    word: "effigy",
    phonetic: "/ˈɛf.ɪ.dʒi/",
    pos: "noun",
    definitions: [
      "A sculpture or model of a person.",
      "A roughly made model of a particular person, made in order to be damaged or destroyed as a protest or expression of anger."
    ],
    synonyms: ["statue", "figure", "model", "sculpture", "likeness"],
    antonyms: ["original", "living person"],
    examples: [
      "Stone effigies of medieval knights lie recumbent upon marble tombs in the cathedral chancel.",
      "Protesters in the capital burned an effigy of the corrupt prime minister in front of parliament.",
      "Ancient Celtic tribes reportedly wove giant wicker effigies for seasonal solstice bonfires."
    ]
  },
  {
    word: "effusive",
    phonetic: "/ɪˈfjuː.sɪv/",
    pos: "adjective",
    definitions: [
      "Expressing feelings of gratitude, pleasure, or approval in an unrestrained or heartfelt manner.",
      "Overflowing with emotion."
    ],
    synonyms: ["gushing", "unrestrained", "demonstrative", "enthusiastic", "profuse"],
    antonyms: ["reserved", "restrained", "taciturn", "undemonstrative"],
    examples: [
      "The theater director was effusive in his praise for the young understudy who stepped into the lead role.",
      "She received an effusive welcome from her relatives when she stepped off the plane in Athens.",
      "His effusive gratitude for the small loan felt slightly embarrassing to the modest benefactor."
    ]
  },
  {
    word: "egalitarian",
    phonetic: "/ɪˌɡæl.ɪˈtɛər.i.ən/",
    pos: "adjective",
    definitions: [
      "Believing in or based on the principle that all people are equal and deserve equal rights and opportunities.",
      "Promoting social equality."
    ],
    synonyms: ["equal", "democratic", "classless", "impartial", "equitable"],
    antonyms: ["elitist", "hierarchical", "authoritarian", "stratified"],
    examples: [
      "The Scandinavian nation is widely cited as an egalitarian society with minimal income disparity.",
      "The startup adopted an egalitarian workplace model where everyone, including executives, shared open desks.",
      "She dedicated her career as a civil rights jurist to building a more egalitarian legal framework."
    ]
  },
  {
    word: "elegiac",
    phonetic: "/ˌɛl.ɪˈdʒaɪ.ək/",
    pos: "adjective",
    definitions: [
      "Relating to or characteristic of an elegy; expressing sorrow or lamentation.",
      "Mournfully wistful."
    ],
    synonyms: ["mournful", "plaintive", "melancholy", "sorrowful", "lamenting"],
    antonyms: ["joyful", "celebratory", "festive", "cheerful"],
    examples: [
      "The cello suite had an elegiac quality that brought a hush over the packed concert hall.",
      "His final documentary was an elegiac tribute to the disappearing pastoral communities of the highlands.",
      "The poet wrote in an elegiac tone, grieving the loss of his childhood wilderness to suburban sprawl."
    ]
  },
  {
    word: "elusive",
    phonetic: "/ɪˈluː.sɪv/",
    pos: "adjective",
    definitions: [
      "Difficult to find, catch, or achieve.",
      "Difficult to remember, define, or pin down."
    ],
    synonyms: ["evasive", "intangible", "fleeting", "slippery", "indefinable"],
    antonyms: ["accessible", "tangible", "obvious", "achievable"],
    examples: [
      "The snow leopard is famously elusive, thriving in the sheer rocky ridges of the high Himalayas.",
      "Lasting peace in the border region remained frustratingly elusive despite years of bilateral negotiations.",
      "The exact chemical formula for the ancient Roman concrete remains an elusive secret to modern engineers."
    ]
  },
  {
    word: "emaciated",
    phonetic: "/ɪˈmeɪ.ʃi.eɪ.tɪd/",
    pos: "adjective",
    definitions: [
      "Abnormally thin or weak, especially because of illness or a lack of food.",
      "Gaunt and wasted away."
    ],
    synonyms: ["gaunt", "skeletal", "scraggy", "wasted", "starved"],
    antonyms: ["plump", "corpulent", "fleshy", "healthy"],
    examples: [
      "Rescue workers discovered emaciated livestock wandering the drought-stricken plains.",
      "After forty days lost in the boreal wilderness, the hiker returned gaunt and severely emaciated.",
      "Volunteers provided nutrient-dense broth to the emaciated survivors of the shipwreck."
    ]
  },
  {
    word: "embellish",
    phonetic: "/ɪmˈbɛl.ɪʃ/",
    pos: "verb",
    definitions: [
      "To make something more attractive by the addition of decorative details or features.",
      "To make a story or statement more interesting by adding false or exaggerated details."
    ],
    synonyms: ["decorate", "adorn", "ornament", "exaggerate", "elaborate"],
    antonyms: ["simplify", "understate", "strip", "bare"],
    examples: [
      "Medieval scribes embellished opening manuscript capitals with gleaming gold leaf and lapis lazuli.",
      "He was notorious for embellishing fishing tales with colossal sea monsters that always got away.",
      "She embellished her simple cotton summer dress with hand-stitched floral embroidery along the hem."
    ]
  },
  {
    word: "emulate",
    phonetic: "/ˈɛm.jʊ.leɪt/",
    pos: "verb",
    definitions: [
      "To match or surpass a person or achievement, typically by imitation.",
      "To imitate with effort to equal or excel."
    ],
    synonyms: ["imitate", "copy", "mirror", "follow", "reproduce"],
    antonyms: ["originate", "disregard", "differ", "shun"],
    examples: [
      "Aspiring young chefs from around the globe attempt to emulate her innovative sourdough techniques.",
      "The apprentice sought to emulate his master's patience and microscopic precision in wood carving.",
      "Developing nations often seek to emulate the high educational outcomes achieved by Finnish schools."
    ]
  },
  {
    word: "endemic",
    phonetic: "/ɛnˈdɛm.ɪk/",
    pos: "adjective",
    definitions: [
      "Of a disease or condition: regularly found among particular people or in a certain area.",
      "Native or restricted to a certain place."
    ],
    synonyms: ["native", "indigenous", "local", "prevalent", "widespread"],
    antonyms: ["alien", "introduced", "foreign", "epidemic"],
    examples: [
      "Malaria remains endemic in warm, low-lying tropical regions around the equator.",
      "The kangaroo and koala are endemic to the Australian continent and found nowhere else in the wild.",
      "Bureaucratic corruption had become endemic in the provincial licensing authority."
    ]
  },
  {
    word: "enervate",
    phonetic: "/ˈɛn.ər.veɪt/",
    pos: "verb",
    definitions: [
      "To cause someone to feel drained of energy or vitality; weaken.",
      "To deprive of physical or nervous vigor."
    ],
    synonyms: ["exhaust", "debilitate", "weaken", "drain", "sap"],
    antonyms: ["invigorate", "energize", "strengthen", "revitalize"],
    examples: [
      "The suffocating midday desert heat enervated the travelers before they reached the oasis.",
      "Prolonged hospital bedrest can enervate elderly patients, making physical rehabilitation essential.",
      "Endless circular committee arguments served only to enervate team enthusiasm for the project."
    ]
  },
  {
    word: "ephemeral",
    phonetic: "/ɪˈfɛm.ər.əl/",
    pos: "adjective",
    definitions: [
      "Lasting for a very short time.",
      "Transitory; quickly fading or disappearing."
    ],
    synonyms: ["fleeting", "transient", "momentary", "brief", "passing"],
    antonyms: ["permanent", "enduring", "everlasting", "eternal"],
    examples: [
      "The ephemeral beauty of morning frost on window panes vanishes as soon as the sun climbs.",
      "Viral fame on the internet is notoriously ephemeral, burning brightly for days before fading into obscurity.",
      "The artist specialized in ephemeral ice sculptures designed to melt gracefully back into the river."
    ]
  },
  {
    word: "equanimity",
    phonetic: "/ˌɛk.wəˈnɪm.ɪ.ti/",
    pos: "noun",
    definitions: [
      "Mental calmness, composure, and evenness of temper, especially in a difficult situation.",
      "Steadiness of mind under extreme pressure."
    ],
    synonyms: ["composure", "calmness", "serenity", "sangfroid", "aplomb"],
    antonyms: ["anxiety", "agitation", "perturbation", "panic"],
    examples: [
      "The veteran flight controller handled the twin aircraft emergency with remarkable equanimity.",
      "She received both blistering criticism and lavish praise with the same calm, detached equanimity.",
      "Years of Zen meditation helped the doctor maintain internal equanimity in the trauma center."
    ]
  },
  {
    word: "equivocal",
    phonetic: "/ɪˈkwɪv.ə.kəl/",
    pos: "adjective",
    definitions: [
      "Open to more than one interpretation; ambiguous.",
      "Uncertain or questionable in nature."
    ],
    synonyms: ["ambiguous", "vague", "indeterminate", "dubious", "obscure"],
    antonyms: ["unequivocal", "clear", "explicit", "unambiguous"],
    examples: [
      "The laboratory test results were equivocal, necessitating a second round of biopsy samples.",
      "He gave an equivocal response when asked if he would support his party's controversial tax bill.",
      "The treaty's equivocal phrasing regarding maritime borders eventually provoked a naval standoff."
    ]
  },
  {
    word: "erratic",
    phonetic: "/ɪˈræt.ɪk/",
    pos: "adjective",
    definitions: [
      "Not even or regular in pattern or movement; unpredictable.",
      "Deviating from the usual or proper course in conduct or opinion."
    ],
    synonyms: ["unpredictable", "inconsistent", "irregular", "mercurial", "variable"],
    antonyms: ["consistent", "reliable", "steady", "predictable"],
    examples: [
      "The old car's erratic steering made driving on narrow mountain winding roads terrifying.",
      "His erratic attendance and missed deadlines cost him his position at the architectural firm.",
      "Geologists studied the erratic granite boulder left behind on the limestone plain by retreating glaciers."
    ]
  },
  {
    word: "eschew",
    phonetic: "/ɪsˈtʃuː/",
    pos: "verb",
    definitions: [
      "To deliberately avoid using; abstain from.",
      "To shun on moral or practical grounds."
    ],
    synonyms: ["abstain from", "shun", "avoid", "renounce", "forgo"],
    antonyms: ["embrace", "adopt", "indulge in", "pursue"],
    examples: [
      "A true minimalist chooses to eschew unnecessary consumer gadgets and fast fashion.",
      "Throughout his long political career, the senator eschewed personal attacks on his opponents.",
      "The gourmet bakery eschewed artificial preservatives, using only organic stoneground flour and sea salt."
    ]
  },
  {
    word: "esoteric",
    phonetic: "/ˌɛs.əˈtɛr.ɪk/",
    pos: "adjective",
    definitions: [
      "Intended for or likely to be understood by only a small number of people with a specialized knowledge or interest.",
      "Confined to an inner circle of initiates."
    ],
    synonyms: ["abstruse", "obscure", "arcane", "recondite", "cryptic"],
    antonyms: ["exoteric", "commonplace", "familiar", "simple"],
    examples: [
      "The academic conference was filled with esoteric lectures on medieval Byzantine monetary reform.",
      "He had an esoteric hobby: collecting and restoring nineteenth-century mechanical music boxes.",
      "Quantum computing principles can seem completely esoteric to anyone lacking advanced physics training."
    ]
  },
  {
    word: "evanescent",
    phonetic: "/ˌɛv.əˈnɛs.ənt/",
    pos: "adjective",
    definitions: [
      "Soon passing out of sight, memory, or existence; quickly fading or disappearing.",
      "Ephemeral or fleeting."
    ],
    synonyms: ["fleeting", "transitory", "ephemeral", "fugitive", "vanishing"],
    antonyms: ["permanent", "enduring", "lasting", "eternal"],
    examples: [
      "The rainbow across the waterfall was an evanescent wonder that dissolved as soon as clouds passed over the sun.",
      "Childhood summers often seem like an evanescent dream when viewed through adult memory.",
      "The scent of night-blooming jasmine is evanescent, strongest for just an hour after sunset."
    ]
  },
  {
    word: "exacting",
    phonetic: "/ɪɡˈzæk.tɪŋ/",
    pos: "adjective",
    definitions: [
      "Making great demands on one's skill, attention, or other resources.",
      "Rigid or severe in requirements."
    ],
    synonyms: ["demanding", "rigorous", "onerous", "arduous", "meticulous"],
    antonyms: ["easy", "lenient", "forgiving", "undemanding"],
    examples: [
      "Restoring Renaissance oil paintings is an exacting craft that requires hundreds of hours of brushwork under magnification.",
      "The Olympic gymnastics coach was notoriously exacting, demanding flawless posture on every dismount.",
      "Surgical residency involves an exacting physical and mental schedule that tests human endurance."
    ]
  },
  {
    word: "exigent",
    phonetic: "/ˈɛk.sɪ.dʒənt/",
    pos: "adjective",
    definitions: [
      "Pressing; demanding immediate attention or action.",
      "Requiring urgent aid or remedy."
    ],
    synonyms: ["urgent", "pressing", "critical", "imperative", "acute"],
    antonyms: ["unimportant", "trivial", "deferrable", "routine"],
    examples: [
      "Under exigent circumstances, police officers are legally permitted to enter premises without a prior search warrant.",
      "The sudden flash flood created exigent demands on regional emergency medical crews.",
      "Rising inflation placed exigent pressure on the central bank to hike interest rates."
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
    synonyms: ["convenient", "advantageous", "pragmatic", "utilitarian", "opportune"],
    antonyms: ["inexpedient", "principled", "unwise", "disadvantageous"],
    examples: [
      "The government found it politically expedient to delay the controversial carbon tax vote until after the election.",
      "A temporary timber bridge was an expedient solution until the permanent steel crossing could be engineered.",
      "He chose the expedient path of silence rather than defending his unfairly accused colleague."
    ]
  },
  {
    word: "expurgate",
    phonetic: "/ˈɛk.spər.ɡeɪt/",
    pos: "verb",
    definitions: [
      "To remove matter thought to be objectionable or unsuitable from a book or account.",
      "To cleanse or purge of offensive material."
    ],
    synonyms: ["censor", "bowdlerize", "cleanse", "purge", "sanitize"],
    antonyms: ["corrupt", "adulterate", "contaminate"],
    examples: [
      "Nineteenth-century publishers frequently expurgated classical plays before allowing school performances.",
      "The heavily expurgated edition of the memoirs omitted several scandalous references to royal courtiers.",
      "Modern literary historians prefer unexpurgated manuscripts that preserve the author's raw voice."
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
    synonyms: ["flippant", "glib", "frivolous", "waggish", "tongue-in-cheek"],
    antonyms: ["serious", "grave", "solemn", "earnest"],
    examples: [
      "His facetious remarks about the company's sinking stock price infuriated senior board members.",
      "I was only being facetious when I suggested selling the office photocopier to pay for coffee beans.",
      "A funeral is not an appropriate venue for facetious humor or sarcastic commentary."
    ]
  },
  {
    word: "facile",
    phonetic: "/ˈfæs.aɪl/",
    pos: "adjective",
    definitions: [
      "Appearing neat and comprehensive only by ignoring the true complexities of an issue; superficial.",
      "Easily achieved; effortless."
    ],
    synonyms: ["superficial", "oversimplified", "glib", "effortless", "simplistic"],
    antonyms: ["thorough", "profound", "arduous", "complex"],
    examples: [
      "The talk show host offered a facile solution to the housing crisis that ignored basic supply-and-demand realities.",
      "Critics panned the thriller for its facile conclusion, where all complex geopolitical dilemmas were resolved in five minutes.",
      "He had a facile charm that dazzled casual acquaintances but lacked genuine emotional depth."
    ]
  },
  {
    word: "fallow",
    phonetic: "/ˈfæl.oʊ/",
    pos: "adjective",
    definitions: [
      "Of farmland: plowed and harrowed but left unsown for a period in order to restore its fertility as part of a crop rotation.",
      "Inactive or unproductive mentally or creatively."
    ],
    synonyms: ["uncultivated", "dormant", "idle", "inactive", "untilled"],
    antonyms: ["cultivated", "fertile", "productive", "fecund"],
    examples: [
      "Farmers leave one third of their acreage fallow each year to allow soil nitrogen levels to replenish.",
      "After publishing three novels in four years, the author enjoyed a fallow season of rest and travel.",
      "Her creative imagination, long fallow during her corporate law career, reawakened when she picked up painting."
    ]
  },
  {
    word: "fervent",
    phonetic: "/ˈfɜː.vənt/",
    pos: "adjective",
    definitions: [
      "Having or displaying a passionate intensity.",
      "Hot, burning, or glowing."
    ],
    synonyms: ["passionate", "ardent", "impassioned", "fervid", "vehement"],
    antonyms: ["apathetic", "indifferent", "cool", "lukewarm"],
    examples: [
      "She made a fervent plea to the town council to save the hundred-year-old oak trees along Main Street.",
      "The young activist was a fervent believer in the power of grassroots democratic organizing.",
      "He offered a fervent prayer for the safe return of his comrades trapped in the blizzard."
    ]
  },
  {
    word: "flippant",
    phonetic: "/ˈflɪp.ənt/",
    pos: "adjective",
    definitions: [
      "Not showing a serious or respectful attitude.",
      "Glíbly disrespectful."
    ],
    synonyms: ["frivolous", "facetious", "disrespectful", "glib", "pert"],
    antonyms: ["respectful", "serious", "reverent", "grave"],
    examples: [
      "His flippant attitude toward safety regulations eventually caused a serious machinery accident.",
      "The witness was reprimanded by the magistrate for offering flippant answers during cross-examination.",
      "She regretted her flippant dismissal of his concerns once she realized how deeply troubled he was."
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
    synonyms: ["accidental", "serendipitous", "lucky", "providential", "chance"],
    antonyms: ["calculated", "intentional", "deliberate", "planned"],
    examples: [
      "A fortuitous meeting in a train compartment led to their thirty-year partnership in documentary filmmaking.",
      "The rain stopped at the fortuitous moment when outdoor wedding guests arrived at the botanical garden.",
      "His discovery of the rare medieval manuscript in a rural attic was entirely fortuitous."
    ]
  },
  {
    word: "garrulous",
    phonetic: "/ˈɡær.ə.ləs/",
    pos: "adjective",
    definitions: [
      "Excessively talkative, especially on trivial matters.",
      "Rambling in speech."
    ],
    synonyms: ["talkative", "loquacious", "voluble", "verbose", "chatty"],
    antonyms: ["taciturn", "reticent", "laconic", "quiet"],
    examples: [
      "The garrulous barber gave us an unsolicited account of city hall politics while trimming my hair.",
      "A couple of pints of cider turned the usually reserved stonemason into an amusingly garrulous storyteller.",
      "She took a window seat on the train, hoping to avoid conversation with overly garrulous commuters."
    ]
  },
  {
    word: "germane",
    phonetic: "/dʒɜːˈmeɪn/",
    pos: "adjective",
    definitions: [
      "Relevant to a subject under consideration.",
      "Pertinent and fitting."
    ],
    synonyms: ["relevant", "pertinent", "applicable", "apposite", "material"],
    antonyms: ["irrelevant", "extraneous", "inappropriate", "immaterial"],
    examples: [
      "The judge instructed the jury to disregard testimony that was not directly germane to the charges.",
      "Please keep your questions germane to the agenda items outlined in the board meeting packet.",
      "Her personal background in marine biology was highly germane to her appointment as fisheries commissioner."
    ]
  },
  {
    word: "glib",
    phonetic: "/ɡlɪb/",
    pos: "adjective",
    definitions: [
      "Of words or the person speaking them: fluent and voluble but insincere and shallow.",
      "Characterized by ease and superficiality."
    ],
    synonyms: ["slick", "fluent", "superficial", "smooth-talking", "insincere"],
    antonyms: ["sincere", "thoughtful", "inarticulate", "profound"],
    examples: [
      "The politician had a glib answer ready for every complex question regarding the national deficit.",
      "Beware of salespeople with glib promises who refuse to put warranties in written contracts.",
      "His glib dismissal of climate data disappointed scientists who had hoped for a serious policy debate."
    ]
  },
  {
    word: "gregarious",
    phonetic: "/ɡrɪˈɡɛər.i.əs/",
    pos: "adjective",
    definitions: [
      "Of a person: fond of company; sociable.",
      "Of animals: living in flocks or loosely organized communities."
    ],
    synonyms: ["sociable", "companionable", "outgoing", "convivial", "extroverted"],
    antonyms: ["reclusive", "solitary", "unsociable", "withdrawn"],
    examples: [
      "He was a gregarious host who loved nothing more than filling his long farmhouse table with lively guests.",
      "Dolphins and wolves are highly gregarious species that hunt and travel in cooperative family pods.",
      "Her gregarious personality made her an exceptional campaign manager and event organizer."
    ]
  },
  {
    word: "hackneyed",
    phonetic: "/ˈhæk.nid/",
    pos: "adjective",
    definitions: [
      "Lacking significance through having been overused; unoriginal and trite.",
      "Stale or clichéd."
    ],
    synonyms: ["overused", "clichéd", "trite", "banal", "platitudinous"],
    antonyms: ["original", "fresh", "novel", "innovative"],
    examples: [
      "The script relied on hackneyed tropes of brooding detectives and corrupt mayors with secret bank accounts.",
      "Commencement speeches too often fall back on hackneyed clichés about spreads wings and conquering the world.",
      "A gifted songwriter breathes fresh emotional vitality into themes that lesser artists render hackneyed."
    ]
  },
  {
    word: "harangue",
    phonetic: "/həˈræŋ/",
    pos: "noun",
    definitions: [
      "A lengthy and aggressive speech.",
      "A tirade or diatribe."
    ],
    synonyms: ["tirade", "diatribe", "lecture", "screed", "invective"],
    antonyms: ["eulogy", "panegyric", "compliment", "praise"],
    examples: [
      "The passengers were forced to endure an angry harangue from the conductor about keeping tickets visible.",
      "Rather than explaining policy, the mayor launched into a twenty-minute harangue against local journalists.",
      "She ignored her supervisor's emotional harangue and calmly documented the procedural violations."
    ]
  },
  {
    word: "hegemony",
    phonetic: "/hɪˈɡɛm.ə.ni/",
    pos: "noun",
    definitions: [
      "Leadership or dominance, especially by one country or social group over others.",
      "Cultural or economic preponderance."
    ],
    synonyms: ["dominance", "supremacy", "ascendancy", "mastery", "control"],
    antonyms: ["subordination", "subjugation", "autonomy", "equality"],
    examples: [
      "The ancient maritime league contested the military and economic hegemony of Sparta across the Aegean.",
      "Critics argued the tech conglomerate was attempting to establish monopolistic hegemony over cloud computing.",
      "Throughout the nineteenth century, the British navy maintained undisputed hegemony over global shipping routes."
    ]
  },
  {
    word: "hermetic",
    phonetic: "/hɜːˈmɛt.ɪk/",
    pos: "adjective",
    definitions: [
      "Of an enclosure or seal: complete and airtight.",
      "Insulated or protected from the outside world; esoteric."
    ],
    synonyms: ["airtight", "sealed", "insulated", "esoteric", "impervious"],
    antonyms: ["permeable", "open", "leaky", "accessible"],
    examples: [
      "The space capsule maintained a hermetic seal against the vacuum and freezing temperatures of orbital space.",
      "The reclusive author lived a hermetic life in a remote stone cottage on the windswept Scottish coast.",
      "Antique pocket watches often feature hermetic inner casings to protect delicate balance wheels from dust."
    ]
  },
  {
    word: "hubris",
    phonetic: "/ˈhjuː.brɪs/",
    pos: "noun",
    definitions: [
      "Excessive pride or self-confidence.",
      "In Greek tragedy: arrogance toward the gods leading to nemesis and downfall."
    ],
    synonyms: ["arrogance", "conceit", "haughtiness", "presumption", "pomposity"],
    antonyms: ["humility", "modesty", "meekness", "timidity"],
    examples: [
      "Claiming the unsinkable ship could withstand any ocean iceberg was history's tragic lesson in hubris.",
      "His political hubris blinded him to simmering discontent among working-class voters in the provinces.",
      "Classical Greek tragedy teaches that unchecked hubris inevitably invites catastrophic ruin from the gods."
    ]
  },
  {
    word: "iconoclast",
    phonetic: "/aɪˈkɒn.ə.klæst/",
    pos: "noun",
    definitions: [
      "A person who attacks cherished beliefs or institutions.",
      "A destroyer of religious images."
    ],
    synonyms: ["rebel", "dissident", "maverick", "nonconformist", "heretic"],
    antonyms: ["conformist", "traditionalist", "orthodox", "follower"],
    examples: [
      "Galileo was an intellectual iconoclast who dismantled the geocentric worldview despite intense institutional opposition.",
      "The modern architectural iconoclast eschewed traditional glass facades in favor of raw volcanic basalt.",
      "She had the reputation of a boardroom iconoclast, regularly challenging legacy business assumptions."
    ]
  },
  {
    word: "idiosyncrasy",
    phonetic: "/ˌɪd.i.əˈsɪŋ.krə.si/",
    pos: "noun",
    definitions: [
      "A mode of behavior or way of thought peculiar to an individual.",
      "A distinctive or peculiar feature."
    ],
    synonyms: ["eccentricity", "quirk", "singularity", "mannerism", "peculiarity"],
    antonyms: ["conformity", "normality", "standard", "commonality"],
    examples: [
      "Her charming idiosyncrasy of naming every houseplant after a French philosopher amused her roommates.",
      "Every vintage printing press has mechanical idiosyncrasies that only the master pressman understands.",
      "He had a curious culinary idiosyncrasy: he put a pinch of ground cinnamon on his morning fried eggs."
    ]
  },
  {
    word: "ignominious",
    phonetic: "/ˌɪɡ.nəˈmɪn.i.əs/",
    pos: "adjective",
    definitions: [
      "Deserving or causing public disgrace or shame.",
      "Humiliating or dishonorable."
    ],
    synonyms: ["humiliating", "shameful", "disgraceful", "dishonorable", "inglorious"],
    antonyms: ["glorious", "honorable", "triumphant", "noble"],
    examples: [
      "The defending champions suffered an ignominious defeat, failing to score a single goal in the tournament.",
      "His public career suffered an ignominious collapse after internal financial embezzlement records leaked.",
      "The general was spared the ignominious humiliation of a court-martial by resigning his commission."
    ]
  },
  {
    word: "impecunious",
    phonetic: "/ˌɪm.pɪˈkjuː.ni.əs/",
    pos: "adjective",
    definitions: [
      "Having little or no money; penniless.",
      "Habitually poor."
    ],
    synonyms: ["penniless", "indigent", "destitute", "impoverished", "insolvent"],
    antonyms: ["wealthy", "opulent", "affluent", "rich"],
    examples: [
      "As an impecunious art student in Paris, he painted on discarded wooden fruit crates to save money.",
      "The grand aristocratic family was privately impecunious, struggling to pay winter heating bills for their manor.",
      "He dedicated his pro bono legal work to defending impecunious tenants facing illegal evictions."
    ]
  },
  {
    word: "imperious",
    phonetic: "/ɪmˈpɪər.i.əs/",
    pos: "adjective",
    definitions: [
      "Assuming power or authority without justification; arrogant and domineering.",
      "Urgent or commanding."
    ],
    synonyms: ["domineering", "overbearing", "dictatorial", "authoritarian", "imperative"],
    antonyms: ["humble", "submissive", "meek", "servile"],
    examples: [
      "With an imperious snap of her fingers, the diva demanded a fresh cup of organic herbal tea.",
      "His imperious management style alienated key software engineers who promptly departed for competitors.",
      "Extreme sub-zero cold asserted an imperious demand that forced the mountaineers to descend immediately."
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
      "Her impetuous purchase of a derelict stone windmill in Tuscany surprised all her sensible friends.",
      "He regretted his impetuous resignation letter the very next morning when cooler judgment prevailed.",
      "The impetuous mountain river carved sheer granite gorges over millions of years of surging meltwater."
    ]
  },
  {
    word: "inchoate",
    phonetic: "/ɪnˈkoʊ.ət/",
    pos: "adjective",
    definitions: [
      "Just begun and so not fully formed or developed; rudimentary.",
      "Disorganized in early stages."
    ],
    synonyms: ["rudimentary", "nascent", "embryonic", "incipient", "unformed"],
    antonyms: ["mature", "complete", "finished", "refined"],
    examples: [
      "The manuscript was still in an inchoate state, consisting of disjointed diary entries and character sketches.",
      "A vague, inchoate suspicion gnawed at the detective as he reviewed the suspect's flawless alibi.",
      "In its inchoate phase, the internet was primarily a decentralized academic file-sharing network."
    ]
  },
  {
    word: "indolent",
    phonetic: "/ˈɪn.dəl.ənt/",
    pos: "adjective",
    definitions: [
      "Wanting to avoid activity or exertion; lazy.",
      "Slow to develop or heal."
    ],
    synonyms: ["lazy", "slothful", "idle", "lethargic", "inactive"],
    antonyms: ["industrious", "diligent", "active", "assiduous"],
    examples: [
      "They spent an indolent Saturday afternoon drifting in a wooden punt along the leafy river Cam.",
      "His indolent attitude toward morning lectures resulted in a stern warning from his university tutor.",
      "The tropical midday humidity encouraged an indolent lifestyle centered on shady verandah siestas."
    ]
  },
  {
    word: "ineffable",
    phonetic: "/ɪnˈɛf.ə.bəl/",
    pos: "adjective",
    definitions: [
      "Too great or extreme to be expressed or described in words.",
      "Sacred beyond utterance."
    ],
    synonyms: ["indescribable", "inexpressible", "transcendent", "sublime", "unutterable"],
    antonyms: ["definable", "mundane", "describable", "ordinary"],
    examples: [
      "Standing upon the glacier beneath the northern lights, the travelers felt an ineffable serenity.",
      "The grief she bore after the loss of her child was ineffable, far beyond the reach of sympathy cards.",
      "Renaissance religious painters attempted to convey the ineffable mystery of divine grace through golden halos."
    ]
  },
  {
    word: "inexorable",
    phonetic: "/ɪnˈɛk.sər.ə.bəl/",
    pos: "adjective",
    definitions: [
      "Impossible to stop or prevent.",
      "Unpersuadable; relentless."
    ],
    synonyms: ["relentless", "unstoppable", "unavoidable", "implacable", "inflexible"],
    antonyms: ["yielding", "flexible", "preventable", "lenient"],
    examples: [
      "The inexorable advance of glacial ice carved out deep U-shaped valleys across the continent.",
      "Time marches with an inexorable rhythm that no amount of human wealth can delay.",
      "The defense lawyer fought against what seemed like the inexorable tide of circumstantial evidence."
    ]
  },
  {
    word: "insidious",
    phonetic: "/ɪnˈsɪd.i.əs/",
    pos: "adjective",
    definitions: [
      "Proceeding in a gradual, subtle way, but with harmful effects.",
      "Treacherous or crafty."
    ],
    synonyms: ["stealthy", "subtle", "surreptitious", "cunning", "pernicious"],
    antonyms: ["straightforward", "harmless", "open", "obvious"],
    examples: [
      "Carbon monoxide poisoning is particularly insidious because the toxic gas has no scent, taste, or color.",
      "Cynicism had an insidious effect on the young volunteers, gradually eroding their idealism.",
      "The slow, insidious creep of saltwater into agricultural aquifers threatened coastal farming."
    ]
  },
  {
    word: "intransigent",
    phonetic: "/ɪnˈtræn.sɪ.dʒənt/",
    pos: "adjective",
    definitions: [
      "Unwilling or refusing to change one's views or to agree about something.",
      "Stubbornly unyielding."
    ],
    synonyms: ["uncompromising", "inflexible", "obdurate", "unyielding", "stubborn"],
    antonyms: ["flexible", "compliant", "pliable", "accommodating"],
    examples: [
      "Both union representatives and corporate executives adopted intransigent stances that dragged out the strike.",
      "The prime minister faced an intransigent coalition of backbenchers who opposed the treaty.",
      "Her intransigent refusal to accept shoddy workmanship earned her the respect of architectural clients."
    ]
  },
  {
    word: "laconic",
    phonetic: "/ləˈkɒn.ɪk/",
    pos: "adjective",
    definitions: [
      "Of a person, speech, or style of writing: using very few words.",
      "Pithily concise."
    ],
    synonyms: ["terse", "succinct", "brief", "pithy", "taciturn"],
    antonyms: ["verbose", "loquacious", "garrulous", "voluble"],
    examples: [
      "His laconic text message simply read: 'Mission accomplished.'",
      "The Spartan warriors were celebrated throughout ancient Greece for their laconic, fearless wit.",
      "She appreciated the doctor's laconic bedside manner, which delivered facts without unnecessary fluff."
    ]
  },
  {
    word: "languid",
    phonetic: "/ˈlæŋ.ɡwɪd/",
    pos: "adjective",
    definitions: [
      "Displaying or having a disinclination for physical exertion; slow and relaxed.",
      "Weak or faint from illness."
    ],
    synonyms: ["relaxed", "unhurried", "lethargic", "listless", "sluggish"],
    antonyms: ["energetic", "vigorous", "brisk", "active"],
    examples: [
      "The languid summer afternoon passed with lazy swims in the quarry and reading under the willow tree.",
      "She gave a languid wave of her hand from the hammock as the boat pulled away from the dock.",
      "A languid breeze barely stirred the white linen curtains hanging along the porch."
    ]
  },
  {
    word: "loquacious",
    phonetic: "/loʊˈkweɪ.ʃəs/",
    pos: "adjective",
    definitions: [
      "Tending to talk a great deal; talkative.",
      "Characterized by fluent discourse."
    ],
    synonyms: ["talkative", "voluble", "garrulous", "chatty", "verbose"],
    antonyms: ["taciturn", "reticent", "laconic", "quiet"],
    examples: [
      "The loquacious museum docent spent an hour explaining the historical symbolism of a single bronze coin.",
      "A glass of vintage champagne was all it took to turn the shy librarian into a loquacious party guest.",
      "He was normally quiet, but on the subject of vintage motorcycles he became remarkably loquacious."
    ]
  },
  {
    word: "magnanimous",
    phonetic: "/mæɡˈnæn.ɪ.məs/",
    pos: "adjective",
    definitions: [
      "Generous or forgiving, especially toward a rival or less powerful person.",
      "Noble and unselfish in spirit."
    ],
    synonyms: ["generous", "charitable", "benevolent", "forgiving", "noble"],
    antonyms: ["petty", "vindictive", "spiteful", "mean"],
    examples: [
      "In a magnanimous concession speech, she wished her opponent great success in governing the city.",
      "He was known for his magnanimous nature, often quietly paying the debts of struggling neighbors.",
      "It was magnanimous of the champion to praise the rookie's fierce performance after winning the title match."
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
    antonyms: ["rigid", "brittle", "inflexible", "intractable"],
    examples: [
      "Pure gold is so malleable that a single ounce can be beaten into a sheet spanning a hundred square feet.",
      "Young minds are impressionable and malleable, making early education a critical social duty.",
      "When heated red-hot in the forge, wrought iron becomes soft and malleable under the blacksmith's hammer."
    ]
  },
  {
    word: "meticulous",
    phonetic: "/məˈtɪk.jʊ.ləs/",
    pos: "adjective",
    definitions: [
      "Showing great attention to detail; very careful and precise.",
      "Scrupulously thorough."
    ],
    synonyms: ["painstaking", "scrupulous", "punctilious", "exacting", "thorough"],
    antonyms: ["careless", "slapdash", "sloppy", "negligent"],
    examples: [
      "The watchmaker used meticulous care to assemble microscopic gears under a jeweler's loupe.",
      "Thanks to her meticulous cataloging of field specimens, future botanists were able to track species loss.",
      "He was meticulous about his morning routine, timing each coffee extraction to the exact second."
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
    antonyms: ["exacerbate", "aggravate", "intensify", "worsen"],
    examples: [
      "Restoring natural coastal wetlands helps mitigate storm damage from ocean surges.",
      "The physician prescribed physical therapy to mitigate post-operative stiffness in the knee.",
      "Installing triple-glazed windows will significantly mitigate traffic noise from the busy boulevard below."
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
    antonyms: ["enrage", "infuriate", "provoke", "incense"],
    examples: [
      "The customer service manager offered travel vouchers to mollify passengers stranded by the blizzard.",
      "A sincere apology and a plate of warm freshly baked brownies helped mollify her irritated roommate.",
      "The governor attempted to mollify angry farmers by announcing emergency drought relief subsidies."
    ]
  },
  {
    word: "munificent",
    phonetic: "/mjuːˈnɪf.ɪ.sənt/",
    pos: "adjective",
    definitions: [
      "Characterized by or displaying great generosity.",
      "More generous than is usual or necessary."
    ],
    synonyms: ["generous", "bountiful", "magnanimous", "open-handed", "lavish"],
    antonyms: ["parsimonious", "stingy", "miserly", "tight-fisted"],
    examples: [
      "A munificent endowment from an anonymous alumnus funded the construction of the new cancer research wing.",
      "The community celebrated the philanthropist's munificent gift of fifty acres for a public nature sanctuary.",
      "He was renowned for munificent hospitality, regularly hosting lavish banquets for struggling local artists."
    ]
  },
  {
    word: "nefarious",
    phonetic: "/nɪˈfɛər.i.əs/",
    pos: "adjective",
    definitions: [
      "Wicked, villainous, or criminal in nature.",
      "Infamous for being heinous or despicable."
    ],
    synonyms: ["wicked", "villainous", "heinous", "atrocious", "evil"],
    antonyms: ["virtuous", "honorable", "noble", "righteous"],
    examples: [
      "The international crime syndicate ran front charities to conceal their nefarious money-laundering operations.",
      "Cybersecurity specialists dismantled a botnet designed for nefarious identity-theft campaigns.",
      "The gothic novel featured an aristocratic villain harboring nefarious secrets in his subterranean cellar."
    ]
  },
  {
    word: "obdurate",
    phonetic: "/ˈɒb.djʊ.rət/",
    pos: "adjective",
    definitions: [
      "Stubbornly refusing to change one's opinion or course of action.",
      "Hardened against moral influence or compassion."
    ],
    synonyms: ["stubborn", "obstinate", "unyielding", "intransigent", "adamant"],
    antonyms: ["pliable", "tractable", "yielding", "amenable"],
    examples: [
      "Despite overwhelming scientific consensus, the company's board remained obdurate in opposing emissions caps.",
      "No plea from family members could soften the obdurate heart of the embittered patriarch.",
      "The pack mule was famously obdurate, refusing to budge whenever heavy thunder rumbled in the distance."
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
      "The financial institution used dense legal jargon to obfuscate hidden fee structures from consumers.",
      "Do not let minor statistical technicalities obfuscate the central ethical dilemma facing our committee.",
      "The witness attempted to obfuscate his timeline to shield his companion from police questioning."
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
      "He despised corporate yes-men and preferred working with subordinates who offered candid, honest dissent."
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
    antonyms: ["poison", "toxin", "bane", "affliction"],
    examples: [
      "Technology is an invaluable tool, but it is not a panacea for the complex social problems facing public schools.",
      "In the nineteenth century, traveling snake-oil salesmen pitched tonic bottles as a panacea for every ailment.",
      "Tax cuts alone cannot serve as an economic panacea for deeply rooted structural trade deficits."
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
      "Despite his vast fortune in real estate, he had parsimonious habits and clipped newspaper coupons for groceries.",
      "The museum board was parsimonious with research grants, prioritizing administrative bonuses instead."
    ]
  },
  {
    word: "paucity",
    phonetic: "/ˈpɔː.sɪ.ti/",
    pos: "noun",
    definitions: [
      "The presence of something only in small or insufficient quantities; scarcity.",
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
    word: "quixotic",
    phonetic: "/kwɪkˈsɒt.ɪk/",
    pos: "adjective",
    definitions: [
      "Exceedingly idealistic; unrealistic and impractical.",
      "Chivalrous or romantic to an extravagant degree."
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
    word: "serendipity",
    phonetic: "/ˌsɛr.ənˈdɪp.ɪ.ti/",
    pos: "noun",
    definitions: [
      "The occurrence and development of events by chance in a happy or beneficial way.",
      "Good fortune discovered unexpectedly."
    ],
    synonyms: ["chance", "happy accident", "fluke", "providence", "luck"],
    antonyms: ["misfortune", "adversity", "design", "calamity"],
    examples: [
      "Finding her grandmother's lost wedding ring inside an old book was pure serendipity.",
      "Many of the greatest breakthroughs in medical science, from penicillin to X-rays, began as acts of serendipity.",
      "By happy serendipity, the rain stopped just as the bride walked down the garden path."
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
      "Tending to keep a firm hold of something; clinging closely.",
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
  }
];

extendedWords.forEach(entry => {
  bankMap.set(entry.word.toLowerCase(), entry);
});

console.log('Bank now contains:', bankMap.size, 'rich entries.');

const finalArr = Array.from(bankMap.values());
const outContent = 'window.WORD_BANK = ' + JSON.stringify(finalArr, null, 2) + ';\n';
fs.writeFileSync('words.js', outContent, 'utf8');
console.log('Successfully wrote words.js! Total entries:', finalArr.length);
