# Expanded syntax catalog and research record

Research completed before implementation, 7 November 2026. This catalog contains 50 constructions (20 structural, 16 grammatical, 14 rhetorical/historical); catalog entries are not equivalent to implemented rewrite counts. Examples are original schematic examples, not Shakespeare quotations. “Preserved” means recognized as a constraint, not generated. Implementation labels describe the intended bounded subset and must be reconciled with tests before release.

## Evidence and method

- **F1**: [source](https://www.folger.edu/explore/shakespeares-works/as-you-like-it/reading-shakespeares-language-as-you-like-it/)
- **F2**: [source](https://www.folger.edu/explore/shakespeares-works/henry-iv-part-2/reading-shakespeares-language-henry-iv-part-2/)
- **F3**: [source](https://www.folger.edu/explore/shakespeares-works/twelfth-night/reading-shakespeares-language-twelfth-night/)
- **C1**: [source](https://www.cambridge.org/core/books/abs/authorship-of-shakespeares-plays/auxiliary-do/586E9DF75A7BDEB71242C9B7DBFE2972)
- **C2**: [source](https://www.cambridge.org/core/books/abs/english-syntax/head-movement/665B9E485BC78C6D511C9493F015BCFD)
- **C3**: [source](https://www.cambridge.org/core/journals/english-language-and-linguistics/article/abs/negative-inversion-negative-concord-and-sentential-negation-in-the-history-of-english1/683D6F01F22AFBCAFF2DA11C332437E2)
- **B1**: [source](https://learnenglish.britishcouncil.org/free-resources/grammar/c1/inversion-after-negative-adverbials)
- **B2**: [source](https://learnenglish.britishcouncil.org/free-resources/grammar/c1/inversion-conditionals)
- **W1**: [source](https://www.shakespeareswords.com/Public/LanguageCompanion/ThemesAndTopics.aspx?TopicId=40)
- **W2**: [source](https://www.shakespeareswords.com/Public/LanguageCompanion/ThemesAndTopics.aspx?TopicId=39)
- **W3**: [source](https://www.shakespeareswords.com/Public/LanguageCompanion/ThemesAndTopics.aspx?TopicId=12)
- **R1**: [source](https://www.folger.edu/explore/shakespeares-works/lucrece/reading-shakespeares-language-venus-and-adonis-and-lucrece/)
- **R2**: [source](https://warwick.ac.uk/fac/arts/english/currentstudents/postgraduate/masters/modules/shakespeareinhistory/new_edition_intro.pdf)

Folger’s three introductions establish that word order can foreground objects/complements and interrupt constituents while retaining their grammatical roles. Cambridge’s accessible summaries document variable do-support and older lexical movement around negation; only those accessible summaries were used, not an inaccessible full chapter. Crystal supplies agreement and register constraints. British Council sources validate surviving conditional/negative inversion environments; these are broader English constructions, not uniquely Shakespearean inventions. Folger’s poetry discussion and the Warwick scholarly introduction supply rhetorical phenomena. No numeric corpus frequencies are claimed. Editorial policy: ordinary/subtle morphology frequent, moderate syntax at most one winning structural candidate per simple clause, strong/interpolated rhetoric theatrical only, unsafe historical phenomena disabled.

The list independently adds elision, be-perfects, lexical conversion, negative concord, ellipsis, recoverable coordination and several rhetorical edge patterns. Research is not a claim that the engine can generate them safely.

Additional optative evidence: [Folger’s language-of-possibility lecture](https://folgerpedia.folger.edu/Transcript_of_Shakespeare%27s_Birthday_Lecture%3A_%22Shakespeare_and_the_Language_of_Possibility%22) explains lexical would as wish. The engine’s would-that form is labeled a plausible literary application, not a verbatim attestation.

## Shared applicability and exception contract

Every implemented rule requires a complete bounded parse, not a guessed SVO template. Relative markers, nested subordination, protected technical spans, ambiguous noun/verb readings, unbalanced punctuation, long noun phrases, scope-sensitive not/only, and multiple competing finite heads block risky movement. Subtle disables the structural planner. Each rule applies once with a stable ID, priority and minimum intensity. Competing rules are alternatives, not cumulative shuffles. Sentence facts, names, numbers, tense, polarity and modal lemma are preserved. Emphasis can change in all fronting rules; the setting explicitly opts into that variation. These are historical phenomena reused under modern safety constraints, not universal historical laws.

### S01 — Predicate fronting
- Category / description: syntax; predicate fronting changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `The night is cold`.
- Historical or stylistic pattern / original example: `Cold is the night`.
- Prerequisites and applicability: be + bounded adjective complement; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: Changed information focus; exclude comparison, not, and relative clauses. Unknown analyses retain their input order.
- Evidence: F3. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **implemented** in the bounded environments described; researched-only entries do not generate output.

### S02 — Object topicalization
- Category / description: syntax; object topicalization changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `I know this`.
- Historical or stylistic pattern / original example: `This I know`.
- Prerequisites and applicability: personal-pronoun subject + whitelisted transitive verb + complete definite object; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: Keep agent and patient roles; exclude ambiguous personal-pronoun objects. Unknown analyses retain their input order.
- Evidence: F2. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **implemented** in the bounded environments described; researched-only entries do not generate output.

### S03 — Modal object inversion
- Category / description: syntax; modal object inversion changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `I will remember these words`.
- Historical or stylistic pattern / original example: `These words will I remember`.
- Prerequisites and applicability: modal + lexical verb + definite object; theatrical; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: Do not replace will with shall or can with may. Unknown analyses retain their input order.
- Evidence: F2. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Theatrical only.
- Feasibility / implementation: **implemented** in the bounded environments described; researched-only entries do not generate output.

### S04 — Temporal fronting
- Category / description: syntax; temporal fronting changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `I shall speak tomorrow`.
- Historical or stylistic pattern / original example: `Tomorrow shall I speak`.
- Prerequisites and applicability: one terminal temporal adverb + genuine auxiliary; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: Time is moved intact; no tense change. Unknown analyses retain their input order.
- Evidence: F3. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **implemented** in the bounded environments described; researched-only entries do not generate output.

### S05 — Locative fronting
- Category / description: syntax; locative fronting changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `I stood upon the hill`.
- Historical or stylistic pattern / original example: `Upon the hill I stood`.
- Prerequisites and applicability: known locative intransitive + terminal PP; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: Exclude attachment-ambiguous transitive PPs. Unknown analyses retain their input order.
- Evidence: F2. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **implemented** in the bounded environments described; researched-only entries do not generate output.

### S06 — Negative-adverb inversion
- Category / description: syntax; negative-adverb inversion changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `I will never forget you`.
- Historical or stylistic pattern / original example: `Never will I forget thee`.
- Prerequisites and applicability: one never/rarely/seldom + finite auxiliary; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: Rarely is frequency not logical not; do not add a second negative. Unknown analyses retain their input order.
- Evidence: B1,C3. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **implemented** in the bounded environments described; researched-only entries do not generate output.

### S07 — Present lexical questions
- Category / description: syntax; present lexical questions changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `Do you know this?`.
- Historical or stylistic pattern / original example: `Knowest thou this?`.
- Prerequisites and applicability: interrogative do + subject + known bare lexical verb; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: Exclude lexical/emphatic do, embedded questions and negative questions. Unknown analyses retain their input order.
- Evidence: C1. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **implemented** in the bounded environments described; researched-only entries do not generate output.

### S08 — Past lexical questions
- Category / description: syntax; past lexical questions changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `Did you see him?`.
- Historical or stylistic pattern / original example: `Sawest thou him?`.
- Prerequisites and applicability: did + known verb with curated past tense; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: Finite tense moves from did onto lexical verb. Unknown analyses retain their input order.
- Evidence: C1. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **implemented** in the bounded environments described; researched-only entries do not generate output.

### S09 — Lexical postverbal not
- Category / description: syntax; lexical postverbal not changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `He does not believe me`.
- Historical or stylistic pattern / original example: `He believes not me`.
- Prerequisites and applicability: auxiliary do-negative with known lexical verb; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: Keep not and tense; skip negative concord and multiple negatives. Unknown analyses retain their input order.
- Evidence: C1,C2. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **implemented** in the bounded environments described; researched-only entries do not generate output.

### S10 — Negative imperative
- Category / description: syntax; negative imperative changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `Do not leave`.
- Historical or stylistic pattern / original example: `Leave not`.
- Prerequisites and applicability: bare negative command + recognized verb; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: Do not change a negative question or subject-bearing clause. Unknown analyses retain their input order.
- Evidence: C1. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **implemented** in the bounded environments described; researched-only entries do not generate output.

### S11 — Were conditional inversion
- Category / description: syntax; were conditional inversion changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `If I were king, I would help`.
- Historical or stylistic pattern / original example: `Were I king, I would help`.
- Prerequisites and applicability: if + irrealis were with overt conditional result; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: Still a hypothesis; ordinary if-present excluded. Unknown analyses retain their input order.
- Evidence: B2. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **implemented** in the bounded environments described; researched-only entries do not generate output.

### S12 — Had conditional inversion
- Category / description: syntax; had conditional inversion changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `If I had known, I would have helped`.
- Historical or stylistic pattern / original example: `Had I known, I would have helped`.
- Prerequisites and applicability: if + had + recognized participle and modal result; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: Exclude lexical possession had a book and reported factual conditions. Unknown analyses retain their input order.
- Evidence: B2. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **implemented** in the bounded environments described; researched-only entries do not generate output.

### S13 — Should conditional inversion
- Category / description: syntax; should conditional inversion changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `If you should need help, call me`.
- Historical or stylistic pattern / original example: `Shouldst thou need help, call me`.
- Prerequisites and applicability: if + existing should + base lexical verb; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: Never insert should into an ordinary real condition. Unknown analyses retain their input order.
- Evidence: B2. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **implemented** in the bounded environments described; researched-only entries do not generate output.

### S14 — Temporal subordinate fronting
- Category / description: syntax; temporal subordinate fronting changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `I will return when the sun rises`.
- Historical or stylistic pattern / original example: `When the sun rises, I will return`.
- Prerequisites and applicability: one terminal when-clause with separately recognized subject/verb; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: Move whole subordinate; relative when antecedents excluded. Unknown analyses retain their input order.
- Evidence: F1. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **implemented** in the bounded environments described; researched-only entries do not generate output.

### S15 — Causal subordinate fronting
- Category / description: syntax; causal subordinate fronting changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `I am afraid because the night is dark`.
- Historical or stylistic pattern / original example: `Because the night is dark, I am afraid`.
- Prerequisites and applicability: one terminal because-clause; two safe clauses; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: Preserve because rather than invent reversed for-causality. Unknown analyses retain their input order.
- Evidence: F1. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **implemented** in the bounded environments described; researched-only entries do not generate output.

### S16 — Concessive subordinate fronting
- Category / description: syntax; concessive subordinate fronting changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `I will stay although the night is cold`.
- Historical or stylistic pattern / original example: `Although the night is cold, I will stay`.
- Prerequisites and applicability: one although/though clause; theatrical; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: Keep concession rather than strengthening it into a cause. Unknown analyses retain their input order.
- Evidence: F1. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Theatrical only.
- Feasibility / implementation: **implemented** in the bounded environments described; researched-only entries do not generate output.

### S17 — Optative complement promotion
- Category / description: syntax; optative complement promotion changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `I wish I were king`.
- Historical or stylistic pattern / original example: `Would that I were king`.
- Prerequisites and applicability: explicit first-person wish + irrealis were; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: Plausible literary optative, not evidence that every wish uses this form; no could→might substitution. Unknown analyses retain their input order.
- Evidence: W1. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **implemented** in the bounded environments described; researched-only entries do not generate output.

### S18 — Parenthetical locative displacement
- Category / description: syntax; parenthetical locative displacement changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `I stood upon the hill`.
- Historical or stylistic pattern / original example: `I, upon the hill, stood`.
- Prerequisites and applicability: same safe locative PP as S05; theatrical alternative; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: No split noun phrases; excludes adverbial scope ambiguity. Unknown analyses retain their input order.
- Evidence: F2. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Theatrical only.
- Feasibility / implementation: **implemented** in the bounded environments described; researched-only entries do not generate output.

### S19 — Ditransitive direct-object fronting
- Category / description: syntax; ditransitive direct-object fronting changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `I gave you this book`.
- Historical or stylistic pattern / original example: `This book I gave thee`.
- Prerequisites and applicability: curated give/send/show + pronominal recipient + definite direct object; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: Recipient stays recipient, theme stays theme. Unknown analyses retain their input order.
- Evidence: F1,F2. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **implemented** in the bounded environments described; researched-only entries do not generate output.

### S20 — Recoverable coordinated subject expansion
- Category / description: syntax; recoverable coordinated subject expansion changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `I sing and dance`.
- Historical or stylistic pattern / original example: `I sing and I dance`.
- Prerequisites and applicability: two recognized finite predicates sharing a simple overt subject; theatrical; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: No extra proposition; no auxiliary-bearing or gapped unknown conjuncts. Unknown analyses retain their input order.
- Evidence: F1,R1. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Theatrical only.
- Feasibility / implementation: **implemented** in the bounded environments described; researched-only entries do not generate output.

### G01 — Subject case
- Category / description: pronouns; subject case changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `you speak`.
- Historical or stylistic pattern / original example: `thou speakest`.
- Prerequisites and applicability: recognized singular subject; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: Coordinated/plural address excluded. Unknown analyses retain their input order.
- Evidence: W2. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **implemented** in the bounded environments described; researched-only entries do not generate output.

### G02 — Object case
- Category / description: pronouns; object case changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `I see you`.
- Historical or stylistic pattern / original example: `I see thee`.
- Prerequisites and applicability: verb/preposition object cue; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: No blind replacement of every you. Unknown analyses retain their input order.
- Evidence: W2. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **implemented** in the bounded environments described; researched-only entries do not generate output.

### G03 — Possessive determiner
- Category / description: pronouns; possessive determiner changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `your book`.
- Historical or stylistic pattern / original example: `thy book`.
- Prerequisites and applicability: familiar address; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: Not independent possession. Unknown analyses retain their input order.
- Evidence: W2. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **implemented** in the bounded environments described; researched-only entries do not generate output.

### G04 — Independent possession
- Category / description: pronouns; independent possession changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `the book is yours`.
- Historical or stylistic pattern / original example: `the book is thine`.
- Prerequisites and applicability: standalone possessive; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: Case retained. Unknown analyses retain their input order.
- Evidence: W2. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **implemented** in the bounded environments described; researched-only entries do not generate output.

### G05 — Vowel-sound thine
- Category / description: pronouns; vowel-sound thine changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `your eyes`.
- Historical or stylistic pattern / original example: `thine eyes`.
- Prerequisites and applicability: small lexical allowlist; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: Not spelling-based vowel inference. Unknown analyses retain their input order.
- Evidence: W2. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **implemented** in the bounded environments described; researched-only entries do not generate output.

### G06 — Reflexive case
- Category / description: pronouns; reflexive case changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `trust yourself`.
- Historical or stylistic pattern / original example: `trust thyself`.
- Prerequisites and applicability: familiar singular reflexive; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: No yourselves→thyself. Unknown analyses retain their input order.
- Evidence: W2. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **implemented** in the bounded environments described; researched-only entries do not generate output.

### G07 — Social and plural you
- Category / description: register; social and plural you changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `you all are`.
- Historical or stylistic pattern / original example: `you all are`.
- Prerequisites and applicability: explicit plural or formal setting; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: Social hierarchies cannot be inferred reliably. Unknown analyses retain their input order.
- Evidence: W2. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **implemented** in the bounded environments described; researched-only entries do not generate output.

### G08 — Present second person
- Category / description: morphology; present second person changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `you love`.
- Historical or stylistic pattern / original example: `thou lovest`.
- Prerequisites and applicability: curated finite present lexicon; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: No participle/infinitive suffixing. Unknown analyses retain their input order.
- Evidence: W1. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **implemented** in the bounded environments described; researched-only entries do not generate output.

### G09 — Finite past second person
- Category / description: morphology; finite past second person changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `you saw`.
- Historical or stylistic pattern / original example: `thou sawest`.
- Prerequisites and applicability: known past tense; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: Ambiguous read and irregular paradigms require caution. Unknown analyses retain their input order.
- Evidence: W1. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **implemented** in the bounded environments described; researched-only entries do not generate output.

### G10 — Be agreement
- Category / description: morphology; be agreement changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `you are`.
- Historical or stylistic pattern / original example: `thou art`.
- Prerequisites and applicability: second-person finite be; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: Subjunctive and indicative are distinct. Unknown analyses retain their input order.
- Evidence: W1. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **implemented** in the bounded environments described; researched-only entries do not generate output.

### G11 — Have/do agreement
- Category / description: morphology; have/do agreement changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `you have/do`.
- Historical or stylistic pattern / original example: `thou hast/dost`.
- Prerequisites and applicability: finite auxiliary or lexical verb; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: Dependent form unchanged. Unknown analyses retain their input order.
- Evidence: W1. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **implemented** in the bounded environments described; researched-only entries do not generate output.

### G12 — Modal agreement
- Category / description: morphology; modal agreement changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `you will/can`.
- Historical or stylistic pattern / original example: `thou wilt/canst`.
- Prerequisites and applicability: finite modal; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: Retain modal lemma and force. Unknown analyses retain their input order.
- Evidence: W1. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **implemented** in the bounded environments described; researched-only entries do not generate output.

### G13 — Selective third person
- Category / description: morphology; selective third person changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `she has`.
- Historical or stylistic pattern / original example: `she hath`.
- Prerequisites and applicability: selected present singular forms; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: -eth not universal. Unknown analyses retain their input order.
- Evidence: W1. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **implemented** in the bounded environments described; researched-only entries do not generate output.

### G14 — Aspect chain protection
- Category / description: grammar; aspect chain protection changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `you have been waiting`.
- Historical or stylistic pattern / original example: `thou hast been waiting`.
- Prerequisites and applicability: finite auxiliary + participles; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: Never inflect the participle as another finite verb. Unknown analyses retain their input order.
- Evidence: W1. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **implemented** in the bounded environments described; researched-only entries do not generate output.

### G15 — Embedded interrogative case
- Category / description: grammar; embedded interrogative case changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `I know why you wait`.
- Historical or stylistic pattern / original example: `I know why thou waitest`.
- Prerequisites and applicability: explicit embedded wh marker; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: No question inversion inside embedded wh-clause. Unknown analyses retain their input order.
- Evidence: F1. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **implemented** in the bounded environments described; researched-only entries do not generate output.

### G16 — Relative constituent protection
- Category / description: grammar; relative constituent protection changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `the man who saw you`.
- Historical or stylistic pattern / original example: `the man who saw thee`.
- Prerequisites and applicability: relative markers and antecedent attachment; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: Antecedents are not moved; no automatic who/which/that interchange. Unknown analyses retain their input order.
- Evidence: F1,F3. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **preserved** in the bounded environments described; researched-only entries do not generate output.

### R01 — Anaphora
- Category / description: rhetoric; anaphora changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `I came; I saw`.
- Historical or stylistic pattern / original example: `I came; I saw`.
- Prerequisites and applicability: existing repeated clause opening; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: Do not invent additional claims to repeat. Unknown analyses retain their input order.
- Evidence: R1. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **preserved** in the bounded environments described; researched-only entries do not generate output.

### R02 — Antithesis
- Category / description: rhetoric; antithesis changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `I love night but fear day`.
- Historical or stylistic pattern / original example: `I love night but fear day`.
- Prerequisites and applicability: existing opposing propositions; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: Never manufacture hate-day from love-night. Unknown analyses retain their input order.
- Evidence: R1. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **preserved** in the bounded environments described; researched-only entries do not generate output.

### R03 — Chiasmus/antimetabole
- Category / description: rhetoric; chiasmus/antimetabole changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `A serves B; B serves A`.
- Historical or stylistic pattern / original example: `A serves B; B serves A`.
- Prerequisites and applicability: existing semantic symmetry; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: Automatic reversal would change agents/patients. Unknown analyses retain their input order.
- Evidence: R1,R2. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **not generated** in the bounded environments described; researched-only entries do not generate output.

### R04 — Epistrophe
- Category / description: rhetoric; epistrophe changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `…for you; …for you`.
- Historical or stylistic pattern / original example: `…for thee; …for thee`.
- Prerequisites and applicability: existing repeated endings; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: Only ordinary pronoun agreement applied. Unknown analyses retain their input order.
- Evidence: R1. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **preserved** in the bounded environments described; researched-only entries do not generate output.

### R05 — Anadiplosis
- Category / description: rhetoric; anadiplosis changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `…life; life…`.
- Historical or stylistic pattern / original example: `…life; life…`.
- Prerequisites and applicability: same repeated edge word; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: Would add emphasis not implied by plain prose. Unknown analyses retain their input order.
- Evidence: R2. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **not generated** in the bounded environments described; researched-only entries do not generate output.

### R06 — Polyptoton
- Category / description: rhetoric; polyptoton changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `love/loving/loved`.
- Historical or stylistic pattern / original example: `love/loving/loved`.
- Prerequisites and applicability: related lexical forms; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: Derived forms can change proposition. Unknown analyses retain their input order.
- Evidence: R1. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **not generated** in the bounded environments described; researched-only entries do not generate output.

### R07 — Asyndeton
- Category / description: rhetoric; asyndeton changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `A and B and C`.
- Historical or stylistic pattern / original example: `A, B, C`.
- Prerequisites and applicability: rhetorical omission of conjunctions; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: Coordination scope may change. Unknown analyses retain their input order.
- Evidence: R2. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **not generated** in the bounded environments described; researched-only entries do not generate output.

### R08 — Aposiopesis
- Category / description: rhetoric; aposiopesis changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `unfinished speech…`.
- Historical or stylistic pattern / original example: `unfinished speech…`.
- Prerequisites and applicability: explicitly interrupted utterance; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: No new interruption inserted. Unknown analyses retain their input order.
- Evidence: R2. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **preserved** in the bounded environments described; researched-only entries do not generate output.

### H01 — Word-class conversion
- Category / description: lexical grammar; word-class conversion changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `a noun used as verb`.
- Historical or stylistic pattern / original example: `a noun used as verb`.
- Prerequisites and applicability: contextual creative conversion; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: Unknown verb meanings cannot be inferred. Unknown analyses retain their input order.
- Evidence: F3. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **not generated** in the bounded environments described; researched-only entries do not generate output.

### H02 — Ellipsis
- Category / description: syntax; ellipsis changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `Have you heard?`.
- Historical or stylistic pattern / original example: `Heard?`.
- Prerequisites and applicability: recoverable omitted elements; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: Deleting subject or tense is unsafe. Unknown analyses retain their input order.
- Evidence: F1. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **not generated** in the bounded environments described; researched-only entries do not generate output.

### H03 — Historical relative variation
- Category / description: grammar; historical relative variation changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `the person who…`.
- Historical or stylistic pattern / original example: `the person which…`.
- Prerequisites and applicability: attested older relative distributions; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: No exact modern semantic equivalence guarantee. Unknown analyses retain their input order.
- Evidence: F3. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **not generated** in the bounded environments described; researched-only entries do not generate output.

### H04 — Negative concord
- Category / description: negation; negative concord changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `I saw nobody`.
- Historical or stylistic pattern / original example: `I saw no one, not…`.
- Prerequisites and applicability: dialect/register-sensitive multiple negation; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: Never infer ordinary double-negation semantics. Unknown analyses retain their input order.
- Evidence: C3. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **not generated** in the bounded environments described; researched-only entries do not generate output.

### H05 — Metrical elision
- Category / description: phonology; metrical elision changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `over/even`.
- Historical or stylistic pattern / original example: `o’er/e’en`.
- Prerequisites and applicability: verse rhythm and pronunciation; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: No metre analyzer installed. Unknown analyses retain their input order.
- Evidence: W3. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **not generated** in the bounded environments described; researched-only entries do not generate output.

### H06 — Be perfects
- Category / description: aspect; be perfects changes the arrangement or grammatical realization shown below.
- Modern pattern / original example: `he has come`.
- Historical or stylistic pattern / original example: `he is come`.
- Prerequisites and applicability: historical perfect with motion verbs; shared parser/semantic contract above applies.
- Exceptions, constraints and semantic risk: Can be confused with passive/state. Unknown analyses retain their input order.
- Evidence: C2. This is broader Early Modern/literary English, not a construction exclusive to Shakespeare; B1/B2 also survive in formal modern English. Optative and clause-fronting renderings are conservative literary applications, not verbatim attested sentences.
- Frequency/register policy: Measured use; no claim of measured historical frequency.
- Feasibility / implementation: **not generated** in the bounded environments described; researched-only entries do not generate output.

## Selection and semantic risk

We retain will, shall, can, could, may and might separately. The prompt’s illustrative will→shall and could→might shifts are not adopted as equivalence rules. We do not move arbitrary personal-pronoun objects into prominent positions, replace because with for, change factual if to should, create curses/blessings, invent opposing antithesis, or split a noun phrase merely for a poetic look. Negative concord and generative metaphor remain researched-only because token conservation cannot validate their semantic equivalence.

## Implemented subset and architecture

All S01–S20 entries have exercised positive tests, with explicit intensity and parser constraints. S07/S08 and S11–S13 are separate tense/mood environments of shared construction families; these IDs are not advertised as twenty unrelated linguistic inventions. Sixteen grammatical catalog entries include protective behavior as well as morphology, so they are not all counted as new rewrites. The new work exceeds twelve tested structural environments; together with the existing pronoun, auxiliary, tense, reflexive, possessive, question and negation transformations it exceeds twenty-five working grammatical operations. Rhetorical generation beyond explicit optative/coordination/interpolation remains deliberately bounded.

`analyzer.ts` identifies bounded subjects, finite and lexical verbs, objects, recipients, complements and adjunct spans; declined analyses are null, not low-quality guesses. The original token spelling is retained separately from its inflected text. `grammar.ts` applies familiar/formal agreement and uses embedded-clause subject cues. `syntax-rules.ts` proposes independent span-based candidates; `planner.ts` handles bounded dependent/coordinate clauses and chooses one candidate per simple clause by priority plus ten times conservative grammar confidence, with a stable ID tie-break. Confidence is an engineering gate, not a calibrated probability. S01/S02 compete with S04/S06; stronger settings add candidates rather than recursively transforming the winner. Scope-sensitive negation/only, passive patient structures, complex relative attachment, protected spans and unknown predicates constrain movement.

`validation.ts` verifies exact token-identity conservation, licensed do/if deletion, finite replacement and no duplicate role tokens for ordinary candidates. Explicit optatives validate preservation of their complete complement; coordinated subject expansion licenses only a clone of an already shared personal subject. These explicit exceptions are not passed off as strict token permutations. The checks are necessary invariants, not a proof of semantic equivalence. Rules maintain subject/object references rather than exchanging them, and curated semantic regression tests verify agent, patient, polarity, tense and modal force. A full semantic model is not present.

Historical morphology runs before structural realization on token identities so moved spans carry their already agreed forms; lexical question/negative rules transfer do’s tense using a curated paradigm. Vocabulary is still selected on the original grammatical context. This avoids suffixing a moved infinitive or remapping here as hither merely because it changed position. Unknown finite paradigms and unknown lexical do predicates cannot lose their do support.
