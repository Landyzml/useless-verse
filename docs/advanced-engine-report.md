# Advanced linguistic engine upgrade

## Research summary

Research covered Early Modern case/agreement, variable do-support, lexical questions and negation, topic and predicate fronting, auxiliary inversion, constituent interruption, conditions, explicit optatives, relative attachment, coordination, ellipsis, word-class flexibility and rhetorical schemes. The [50-construction catalog](shakespearean-syntax-rules.md) gives per-rule prerequisites, evidence, risks, register policy, feasibility and implementation status. The [language guide](shakespearean-language-guide.md) retains the original grammar tables.

Folger’s [As You Like It](https://www.folger.edu/explore/shakespeares-works/as-you-like-it/reading-shakespeares-language-as-you-like-it/), [Henry IV Part 2](https://www.folger.edu/explore/shakespeares-works/henry-iv-part-2/reading-shakespeares-language-henry-iv-part-2/) and [Twelfth Night](https://www.folger.edu/explore/shakespeares-works/twelfth-night/reading-shakespeares-language-twelfth-night/) explain role-preserving movement and constituent interruption. Cambridge’s [auxiliary do](https://www.cambridge.org/core/books/abs/authorship-of-shakespeares-plays/auxiliary-do/586E9DF75A7BDEB71242C9B7DBFE2972) and [historical negative syntax](https://www.cambridge.org/core/journals/english-language-and-linguistics/article/abs/negative-inversion-negative-concord-and-sentential-negation-in-the-history-of-english1/683D6F01F22AFBCAFF2DA11C332437E2) summaries establish genuine variation. Crystal supplies morphological/register constraints. British Council descriptions cross-check surviving inversion environments. [Folger’s language-of-possibility lecture](https://folgerpedia.folger.edu/Transcript_of_Shakespeare%27s_Birthday_Lecture%3A_%22Shakespeare_and_the_Language_of_Possibility%22) supports lexical would expressing a wish; the precise would-that rendering is explicitly labeled literary styling rather than a copied quotation. Folger poetry notes and the Warwick scholarly introduction add anaphora, epistrophe, polyptoton, interruption and other rhetorical patterns. No numeric historical frequency claims are made.

## Implementation

Added bounded clause/phrase analysis, typed phrase spans and candidates, independent rewrite rules, a deterministic planner and token-conservation checks. Each ordinary winning candidate retains the same subject/object token identities. Tense transfer is licensed only for known lexical paradigms. Unknown lexical do predicates cannot lose do. Relative and passive structures, technical spans, uncertain attachment and scope-sensitive negation block movement. Optatives and recoverable coordinated-subject expansion have explicit, separately bounded semantic contracts.

There are 20 positive-tested structural rule IDs (S01–S20), including tense/mood variants of shared construction families, rather than twenty wholly unrelated inventions. They cover predicate/object/topic movement, modal and negative inversion, temporal/locative placement, lexical present/past questions, negative statements/commands, were/had/should conditions, complete temporal/causal/concessive clauses, explicit wishes, parenthetical adjuncts, ditransitives and shared-subject articulation. Together with the retained pronoun, agreement, tense, auxiliary and possessive transformations, the implementation exceeds the requested 25 grammatical operations and 12 structural environments. The catalog distinguishes generated rewrites from preservation constraints and researched-only rhetoric.

Syntax Intensity defaults to Shakespearean. Subtle preserves the prior ordering policy; Theatrical admits stronger candidates. Classic/Dramatic still controls diction independently. The interface keeps input, examples, Copy, Clear, address, responsive layout and homepage integration. Added one selector, trace rule IDs and an expandable comparison reusing the actual result and trace.

Ordinary candidate score = explicit rule priority + 10 × conservative grammar-confidence gate, with a stable rule-ID tie-break. These scores are engineering preferences, not corpus likelihoods or calibrated probabilities. One candidate wins per simple clause; independently recognized coordinate clauses can each receive one. No winner is fed repeatedly through other movement rules. Original token spellings let analysis remain independent from already inflected display forms.

## Before and after

Captured the old engine’s outputs before implementation. Every row below is produced by the actual engines, not a hand-written target. Shakespearean column uses Classic/familiar/default intensity. Theatrical column changes syntax intensity only.

| Input | Original engine | Upgraded Shakespearean | Upgraded Theatrical |
|---|---|---|---|
| My sorrow is great. | My sorrow is great. | Great is my sorrow. | Great is my sorrow. |
| The night was cold. | The night was cold. | Cold was the night. | Cold was the night. |
| I know this. | I know this. | This I know. | This I know. |
| I cannot accept this fate. | I cannot accept this fate. | This fate I cannot accept. | This fate I cannot accept. |
| I will never forget you. | I will never forget thee. | Never will I forget thee. | Never will I forget thee. |
| I shall speak tomorrow. | I shall speak tomorrow. | Tomorrow shall I speak. | Tomorrow shall I speak. |
| I stood upon the hill. | I stood upon the hill. | Upon the hill I stood. | I, upon the hill, stood. |
| Do you remember these words? | Dost thou remember these words? | Rememberest thou these words? | Rememberest thou these words? |
| Did you see him? | Didst thou see him? | Sawest thou him? | Sawest thou him? |
| I do not trust you. | I do not trust thee. | I trust not thee. | I trust not thee. |
| He does not believe me. | He doth not believe me. | He believes not me. | He believes not me. |
| Do not leave. | Do not leave. | Leave not. | Leave not. |
| If I were king, I would help you. | If I were king, I would help thee. | Were I king, I would help thee. | Were I king, I would help thee. |
| If I had known, I would have helped. | If I had known, I would have helped. | Had I known, I would have helped. | Had I known, I would have helped. |
| I am afraid because the night is dark. | I am afraid because the night is dark. | Because the night is dark, I am afraid. | Because the night is dark, I am afraid. |
| I will return when the sun rises. | I will return when the sun rises. | When the sun rises, I will return. | When the sun rises, I will return. |
| You will remember these words. | Thou wilt remember these words. | These words thou wilt remember. | These words wilt thou remember. |
| I gave you this book. | I gave thee this book. | This book I gave thee. | This book I gave thee. |
| I do not know why you have forgotten my name. | I know not why thee have forgotten my name. | I know not why thou hast forgotten my name. | I know not why thou hast forgotten my name. |
| The soldier who knows you has returned. | The soldier who knows thee has returned. | The soldier who knows thee has returned. | The soldier who knows thee has returned. |
| I wish I could see him again. | I wish I could see him again. | I wish I could see him again. | I wish I could see him again. |
| I have never seen this. | I have never seen this. | Never have I seen this. | Never have I seen this. |
| I know this and I remember that. | I know this and I remember that. | This I know and that I remember. | This I know and that I remember. |
| The king killed the soldier. | The king killed the soldier. | The king killed the soldier. | The king killed the soldier. |

The embedded-wh row documents a genuine old pronoun error that was corrected. Rows that remain unchanged are intentional conservative cases, not claimed structural successes. Will is retained rather than rewritten as shall; could is not silently changed to might.

## Executed quality checks

- **199 automated tests passed**: the original 75 checks retained as explicit Subtle regressions, 106 structural/semantic/parser guard checks, and 18 held-out evaluation cases. Positive tests exercise every S01–S20 ID. Negatives cover agent/patient distinctions, auxiliary vs lexical/emphatic do, unknown predicates, relatives, passive voice, nested subordination, scope-sensitive only, negative concord, protected names/numbers/technical text, and already-fronted input. Test assertions include exact output, actual rule IDs, preservation, and rejection of invalid candidate deletions/duplications.
- Held-out cases were authored after the initial rule set and regression suite. First run passed **17/18** exact targets. “Her promise is true” exposed possessive-her versus object-her/proper-name ambiguity; the bounded NP check was corrected. Final rerun passes **18/18**. This is an engineering evaluation, not a blind external linguistic study; after that correction the set is a regression set.
- TypeScript and ESLint passed. Next.js production webpack build and static export passed.
- Browser checks also confirmed Copy success feedback, Clear and example population, and distinct Subtle/Shakespearean/Theatrical results, actual rule explanations and grammar comparison. Responsive production inspection at 1440/768/390 returned zero findings with the established exceptions for parchment, literary title and intentionally empty writing surfaces. Full assistive-technology or expert historical-language review was not performed.

## Files

New: `analyzer.ts`, `syntax-types.ts`, `syntax-rules.ts`, `planner.ts`, `validation.ts`; expanded syntax catalog and this report; structural/semantic tests and held-out evaluation tests. Updated: translator entrypoint, grammar subject cues, options/trace types, curated verb lexicon, existing Subtle tests, UI selector/comparison/explanations, a small responsive settings style extension, language guide and README. No dependencies, APIs, homepage redesign or other experiences were added.

## Limitations and deferred work

The analyzer is a conservative local grammar, not a general dependency parser or semantic model. It recognizes bounded noun phrases and known finite heads; it deliberately does not assign roles to arbitrary English. Some relative/embedded clauses receive morphological improvements while retaining order. Protected spans can prevent movement of an entire sentence. Multiword proper names, ambiguous nouns that are also verbs, passive chains, nested attachment, quotations, long phrases and unusual tense/aspect remain difficult. Token conservation cannot prove semantic equivalence; fronting intentionally changes emphasis. Confidence is not a probability.

Historical negative concord, automatic relative-pronoun substitution, generative chiasmus/antithesis, invented metaphors/blessings/curses, word-class conversion, subject/tense ellipsis, be-perfect generation and metrical elision are documented but not generated. They require discourse or semantic knowledge that this deterministic engine does not have. A future expert-annotated corpus and lightweight local dependency parser would improve coverage more safely than additional unconstrained replacement rules.

The 24-row comparison set is the saved pre-upgrade baseline; unchanged conservative examples are included to make the limits visible. Syntax changes can be more conspicuous without being historically obligatory or unique to Shakespeare. No claim of perfect verse, authentic quotations or universal semantic equivalence is made.
