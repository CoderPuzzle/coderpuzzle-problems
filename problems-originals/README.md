# problems-originals — the archive both adaptations derive from

4,031 bundles, one per crawl problem: the curated bettercode originals
(schema-2 since the 2026-09-05 manifest backfill; see
[MAPPING.md](../problems-adapt/MAPPING.md) in the adapted tree for how each
was adapted) and the crawl-keyed extend originals —
statements verbatim from `~/code/lc-crawl` (restored superscripts, nothing
invented), cases from structurally different oracle cross-checks, and the
canonical solution in every language the crawl's wire family ships. Which
ids belong to the bettercode subset is recorded in
[BETTERCODE-SUBSET.md](../BETTERCODE-SUBSET.md). Conventions and the
wire-class map live in `coderpuzzle/docs/AUTHORING-GUIDE.md`; the bundle format
is `../FORMAT.md` (authoritative).

Shard layout: `NNNN-NNNN/` hundreds buckets,
`shard = (id - 1) // 100 * 100 + 1`; bundle key `<id>_<slug>` with the
id zero-padded to 4 digits.

Thirteen source problems were crawled into both corpora (ids 0120 0121 0128
0139 0167 0169 0174 0432 1803 2297 3040 3049 3055). The bettercode original
keeps the canonical name; the extend-side twin carries a `-crawl` slug
suffix. Whole-set consistency is checked by
`coderpuzzle/scripts/verify_corpus.py` (coverage, slug parity, shard
placement, file shape) — run it after any tree surgery. This archive is
frozen: it is not covered by CI, and it IS the served tree (the bank's
`problems` symlink points here as of 2026-09-05). Suspect a
corpus/judge-data contradiction? Do not edit frozen `cases.json` —
surface it with evidence instead.
