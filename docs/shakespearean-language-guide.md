# A practical rulebook for The Bard’s Tongue

Shakespeare wrote Early Modern English, not Old English. This is a stylistic translator, not a historical reconstruction, quotation generator, or metre scanner. Rules below distinguish historical conventions from deliberate implementation choices.

## Research and sources

Consulted 7 November 2026:

- [David and Ben Crystal: verb inflections](https://www.shakespeareswords.com/Public/LanguageCompanion/ThemesAndTopics.aspx?TopicId=40): second-person -(e)st, variable third-person -(e)th, auxiliaries and metrical variation.
- [Crystal: thou and you](https://www.shakespeareswords.com/Public/LanguageCompanion/ThemesAndTopics.aspx?TopicId=39): number, intimacy, status and changes of relationship. The setting simplifies a much richer social system; thou is not universally polite.
- [Crystal: hither, thither and whither](https://www.shakespeareswords.com/Public/LanguageCompanion/ThemesAndTopics.aspx?TopicId=20): directional rather than indiscriminately locative vocabulary.
- [Folger: Reading Shakespeare’s Language](https://www.folger.edu/explore/shakespeares-works/romeo-and-juliet/reading-shakespeares-language-romeo-and-juliet/): flexible syntax, performance context and rhetorical effects. The implementation does not copy arbitrary inversions.
- [University of Melbourne: wherefore](https://pursuit.unimelb.edu.au/articles/shakespeare-wherefore-art-thou-meaning): why, not where.

## Pronouns and address

| Function | Familiar singular | Formal or plural |
|---|---|---|
| Subject you | thou | you |
| Object you, including after prepositions | thee | you |
| Determiner your | thy | your |
| Independent yours | thine | yours |
| Reflexive yourself | thyself | yourself |

Default is familiar singular. Explicit you all, you both, you two, you and another subject, and yourselves conservatively preserve modern address throughout that sentence. This is a predictable heuristic, not discourse resolution. Subject inference uses clause boundaries, finite-verb candidates and auxiliary inversion. Object-control constructions such as “I want you to go” take thee. Coordinated subjects are preserved. Unrecognized predicates keep you and their modern grammar. Ambiguous bare you remains you.

Thine can precede a vowel sound historically, but the engine uses thy by default and a small allowlist (eyes, ears, own, honour/honor, hour). It does not infer pronunciation from the first letter. Independent yours always becomes thine in familiar mode.

## Finite verbs

| Modern with you | Familiar | Notes |
|---|---|---|
| are / were | art / wast | wert reserved for recognizable if/wish counterfactual contexts |
| have / had | hast / hadst | participle stays unchanged |
| do / did | dost / didst | following verb remains bare |
| will / shall | wilt / shalt | infinitive stays bare |
| can / could | canst / couldst | preserve ability and tense |
| may / might | mayst / mightst | preserve uncertainty |
| would / should | wouldst / shouldst | no invented obligation |
| speak / know / love | speakest / knowest / lovest | finite present only |
| saw / went / spoke | sawest / wentest / spakest | curated past forms |

Finite verbs are selected from a curated lexicon. Productive spelling is applied only to recognized roots: final e + st, consonant-y → iest, otherwise est. Recognized regular past forms use -st after -ed. Unknown verbs remain modern with their subject to avoid inventing forms. An auxiliary is inflected once; participles, progressive forms and infinitives are never given a second ending. Present continuous “you are reading” becomes “thou art reading”; perfect “you have read” becomes “thou hast read”; modal “you can read” becomes “thou canst read”.

Classic uses hath and doth with recognized he/she/it subjects, keeping other modern third-person endings. Dramatic permits a curated set of additional -eth forms. Shakespeare used -s and -eth concurrently; neither is universally mandatory. Existing archaic forms are left alone.

## Sentence construction

- Auxiliary questions retain their original order: “Do you remember?” → “Dost thou remember?”; “Why are you waiting?” → “Wherefore art thou waiting?”
- Known auxiliary negatives preserve not: “You do not agree” → “Thou dost not agree”.
- A narrow first-person present do-not construction with know/tell/understand/believe/remember becomes lexical verb + not. It is not generalized to past tense, imperatives, modals or emphatic contrast.
- Contractions expand structurally: you’re → you are; you’ve → you have; didn’t → did not. Ambiguous ’d/’s expand only when the following participle or predicate supports had/would/is/has. Other cases remain unchanged.
- Imperatives keep base verbs. Embedded clauses are handled only where local cues are clear. Relative clauses, coordination, ellipsis and long dependencies can exceed this heuristic analyzer.

## Vocabulary and rhetoric

Classic: perhaps → perchance; indeed → verily; yes → aye; sentence-initial interrogative why → wherefore. Please becomes prithee only before a recognized imperative. Come here/go there become come hither/go thither; static “I am here” remains unchanged. Soon becomes anon only in limited near-future temporal contexts. No blanket before/ere substitution (spatial before is ambiguous). Beautiful and angry are left alone in Classic; Dramatic can use fair and wroth in recognized predicative contexts. Proper names, identifiers, URLs, emails, numbers, Unicode text and unfamiliar terms are preserved.

Dramatic is creative styling, not a documented historical law: restrained elevated diction and “I pray thee/you” for an explicit request. It does not add invented motives, similes, exclamations, facts or universal metaphors. Some inputs legitimately produce identical outputs in both styles.

## Worked examples and pitfalls

- You know me; I know you. → Thou knowest me; I know thee.
- This is your book. → This is thy book.
- This book is yours. → This book is thine.
- You have forgotten your promise. → Thou hast forgotten thy promise.
- I saw you. → I saw thee. / You saw me. → Thou sawest me.
- You will not help. → Thou wilt not help.
- Do you all know? → Do you all know?
- Thou art kind. → unchanged.

Never write I love thou, thou are, dost thou knowest, this is thy (for independent possession), wherefore for location, or hither for a stationary place. Never randomly reorder a sentence. Preserve uncertainty, tense, polarity, person, numbers and names ahead of decorative diction.

## Pipeline and limitations

Normalize line endings; tokenize protected spans, words, whitespace and punctuation; expand supported contractions; analyze local subject/finite-verb relationships; apply pronoun/agreement rules; apply context-gated vocabulary/style; reconstruct with original separators. Every replacement records its real before/after/reason for optional explanations. No input leaves the browser. Input is limited to 1,500 Unicode code points.

This engine does not possess semantic understanding. It can misread ambiguous you, unfamiliar grammatical roles, coordinated predicates, quotations, dialect, subjunctives or contractions. It cannot guarantee idempotence for every stylistic phrase, historical attestation of every composition, verse rhythm, perfect meaning preservation, or complete translation of arbitrary English. Conservative unchanged language is intentional. Future improvement should add a tested local dependency parser, broader annotated corpora and expert review before expanding transformations.

## Advanced engine upgrade

See [expanded construction catalog](shakespearean-syntax-rules.md) for systematic sources, 50 distinct constructions, status, constraints and risk. Syntax intensity is independent of diction: Subtle retains the original word order policy; Shakespearean permits one validated structural candidate per bounded clause; Theatrical permits stronger topicalization/interpolation and optatives. The parser and planner preserve uncertainty rather than claiming a full semantic parse. Full implementation notes and executed test/evaluation results are recorded in the upgrade report.
