# CLOSEOUT_TESTS_PREREGISTER.md: the tests that fail on origin/main in a copy, made to run anywhere (closeout block D a)

Written 2026-10-22 20:07Z, before the change. The same text is in each repo touched; each repo's branch is
closeout-tests-2026-10-22.

## Red (measured)
research analysis/tests_all_main.stage0.jsonl: every test of every repo, on an archive copy of origin/main, with the
network blocked. 8 fail:
- **(a) git-dependent, a comparison with git HEAD:**
  - nba clv_collect/test_time_check.py T5;
  - tennis test_runlive_floor.py R3/R4;
  - worldcup test_payload_keys.py K2/K3.
- **(b) mine, written tonight:**
  - baseball tools/c_fields/test_gen_fields.py (copies the tree with `git ls-files`);
  - baseball tools/d4/test_resettle.py (check 1 tests the change itself, and main already holds it);
  - baseball tools/odds_guard/test_odds_guard.py (test 5 reads StatsAPI).
- **(c) stale:** preview tools/c_review/test_review.py and test_pending.py test the D15 fixed key sets, which
  C_MLB_FIELDS replaced.

## The change (test files only; no engine, page or data file)
- **(a):** when `git show HEAD:...` cannot run (no repository), the HEAD comparison prints "SKIP: no git HEAD in this
  copy (not measured)" and is not counted as a failure. Every other check is unchanged. In a git checkout the
  comparison runs as before.
- **(b):**
  - test_gen_fields copies the tree with shutil.copytree (ignoring .git), not git;
  - test_resettle: when the 18 rows already carry the change (main), it checks the state instead of the transition:
    each row's values against its own game, the 5 EXCLUDED, and applying the script again changes nothing. On a
    journal without the change, it tests the transition as before;
  - test_odds_guard test 5 prints "SKIP: StatsAPI unreachable (not measured)" when the schedule cannot be read. The
    fixture tests 1-4 are unchanged.
- **(c):** test_review and test_pending check what replaced them (C_MLB_FIELDS_PREREGISTER.md): no fixed key set, the
  review label read from totReview, and "no result" from the row's own state. Their names stay, so nothing is
  deleted.

## Green (to be measured)
- The same runner on an archive copy of each branch: 0 failures.
- Every test also passes in a git worktree of the branch, where the comparisons with HEAD run.
- No published number or page changes: only test files change, so the 30-day replay is unchanged by construction.
  This is stated, not run.
