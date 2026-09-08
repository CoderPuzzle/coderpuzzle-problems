# coderpuzzle-problems

Problem sets for [OpenOJ](https://github.com/CoderPuzzle/coderpuzzle) — a self-hosted,
self-motivated learning framework. Nothing here is secret: every testcase
and its expected output is public data by design.

The bank comes as a matched pair of trees, each sharded into id-range
subdirectories of 100 (`0001-0100/…`) with one directory per problem
carrying its statement, machine schema, testcase corpus, generated
starters, and recommended solutions in every offered language
(see [FORMAT.md](FORMAT.md) for the complete specification):

- `problems-adapt/` — the adapted set (4,031 problems). Two
  provenances share it: 838 bettercode-derived bundles and 3,193
  extend-derived bundles, all numbered by their original ids.
  [MAPPING.md](problems-adapt/MAPPING.md) is the bettercode side's adaptation
  ledger (old API → new API per bundle); [BETTERCODE-SUBSET.md](BETTERCODE-SUBSET.md)
  lists which ids belong to that subset. Thirteen ids exist in both
  provenances — the same source problem adapted twice, with distinct
  slugs.
- `problems-originals/` — the archive both adaptations derive from:
  the bettercode originals and the crawl-keyed extend originals
  (the extend originals of the thirteen shared ids carry a `-crawl`
  slug suffix). The originals keep their legacy manifests and are not
  covered by CI.
- `problems` — a **symlink** naming whichever tree the judge serves;
  the app takes the repository's `problems/` subdirectory as its
  package root. It points at `problems-originals` as of
  2026-09-05, the whole tree being schema-2 serveable since the 838
  bettercode-era manifests were backfilled. CI,
  `scripts/`, and the authoring loop always address `problems-adapt`
  by name, never through the symlink.

Python starters follow provenance: bettercode-derived bundles generate
modern (PEP 585/604) annotations, extend-derived bundles the original
`typing` style; `problems-adapt/MAPPING.json` decides.

## Adding or changing a problem

1. Create `problems-adapt/<range>/<id>_<slug>/` (range = the inclusive 100-id
   shard, e.g. `0001-0100`) with `problem.json`, `cases.json`, and
   `statement.md` (handwritten, non-derived content only).
2. Run `python3 scripts/gen_starters.py` to generate every `starter.*`.
3. Author `solution.<ext>` for each generated starter, on top of it.
4. Run `python3 scripts/format.py` — everything is formatted with the
   pinned toolchain (see [FORMAT.md](FORMAT.md#formatting)); CI rejects
   unformatted files.
5. Check locally before pushing — CI is the last-step guardian, not the
   first:

   ```bash
   python3 scripts/check.py --skip-runtime                    # static
   python3 scripts/check.py --problems=<your-keys>            # + runtime
   ```

   The runtime tier needs a running OpenOJ serving this repository, e.g.
   from a coderpuzzle checkout:

   ```bash
   OPENOJ_PROBLEMS_PATH=$PWD/problems-adapt OPENOJ_PROBLEMS=/problems \
     docker compose up -d --build api web runner
   python3 scripts/check.py --problems=all --api http://localhost:8081
   ```

## CI

On every push, a format check and a static completeness check run over
the whole adapted tree (`problems-adapt/`, both provenances); the runtime judge
sweep covers the bettercode-derived bundles on dispatch and weekly (see
`.github/workflows/check.yml`). Extend-derived bundles are
judge-verified out-of-band from a coderpuzzle checkout:
`python3 scripts/verify_solution.py problems-adapt/<shard>/<key>`.

## Serving this set

```bash
OPENOJ_PROBLEMS=CoderPuzzle/coderpuzzle-problems docker compose up --build
```
