המקור נכתב ב-13.10 לפני הקוד (sha256 המקורי f117a3dac327, קומיט a90a8c9). שוחזר מתמליל ב-20.10 אחרי אובדן התיקייה המקומית. תוכן זהה למקור, למעט: שורת הפתיחה הזו. גוף הקובץ שחולץ מהתמליל נבדק: sha256 שלו f117a3dac327, זהה למקור. שני הפרקים המתוארכים שנכנסו לקומיטים ב-13.10 (6237222, 7bf2c6b) שוחזרו מילה במילה; פרק הזריעה הידנית לא נכנס אז לקומיט ולא משוחזר. המדידות של 13.10 בפרקים מתוארכים הן היסטוריה; המדידה החוזרת של 20.10 תיכנס בפרק מתוארך משלה.

# status.json for the hubs: expected results, fixed before the code

Written 2026-10-13, before any code of this block (KNOWN_DEFECTS 104; fields approved 2026-10-13 with one correction:
`built_utc` is written by the generator, not copied from the payload). Not touched: the payload of every app.js (not
one byte), every cron, isOffseason, the A+ rule, ratings, CALIB, and everything listed as off limits for part 2.

## Today [measured]

Both hubs download the five `preview/<sport>/app.js` to show a status line, a record and an open-call flag: 2.25 MB on
the root hub, 2.35 MB on the preview hub (headless Chromium, cache disabled, 2026-10-13). Of each payload they read:

- preview hub (`hub.app.js`, `loadStatus`), the latest real game date, lines 13-18:
  - mlb: `R.slate.date` when `R.slate.games > 0`, plus every `R.journalByDate` key with a played entry
  - nba: every `R.resultsHistory[].date`
  - worldcup: `R.matches[].date` of the decided matches
  - nfl: `R.games[].date` of the played games
  - tennis: `R.games[].date` of the played games, YYYYMMDD written as YYYY-MM-DD

  then (line 32) only the values matching YYYY-MM-DD, cut to 10 characters, sorted; the last one, or none.
- preview hub, the open-call flag, lines 22-26:
  - nfl: `R.feat != null`
  - nba: `R.feat.kind === 'today'`
  - mlb: some `R.tiles[].state === 'aplus'`
  - tennis: `R.feat.open === true`
  - worldcup: `R.feat` has a key, and not every match is decided
- root hub (`index.html`, `DERIVE`, lines 95-136): nfl `state, curWeek, season, seasonRecord, aplusSeason`; nba
  `isOffseason, nextGame.date`; mlb `slate.{date, games}, liveRecord.{season, calls, correct}`; tennis
  `quotaPauseUntil, accuracy.{journal_n, journal_acc, journal_aplus_n, journal_aplus_acc}`; worldcup: whether every
  match is decided, the latest match date, `accuracy.{n_called, n_correct, aplus}`.

## The file

`preview/<sport>/status.json`, written by `preview_build/gen_<sport>_data.py` in the same build as the payload, as a
second file (`preview_build/status.json`); the payload on stdout does not change.

    { "v": 1, "engine": "<sport>", "built_utc": "YYYY-MM-DDTHH:MM:SSZ",
      "last_data_date": "YYYY-MM-DD" or null, "open_call": true/false,
      "hub": { the root hub's fields above, copied from the payload } }

- `built_utc`: the generator's own clock at build time, ISO 8601, UTC, with Z (not the payload's builtUtc/asOf,
  which differ between engines: a date, a timestamp, or YYYYMMDD).
- `last_data_date` and `open_call`: the rules above, the same in Python as in `hub.app.js`.
- worldcup's `hub` carries `all_decided` and `last_match_date` in place of the match list.

Expected size on today's payloads: about 1.2 KB for the five files, against 2.29 MB of app.js.

## Workflows

One added line in each engine's "Publish Command-Center to preview repo" step: copy `preview_build/status.json` to
`prevrepo/<sport>/status.json` and stage it. Printed before and after. A run that pushes the payload pushes the status
with it (built_utc changes on every run, as builtUtc already does in most payloads).

## Hubs

Both hubs read `status.json` first. If it is missing, not JSON, or not of this shape (`v` 1, `engine` = the sport,
`open_call` boolean, `last_data_date` null or YYYY-MM-DD, `hub` an object), they fall back to `app.js` exactly as
today. Expected: both hubs show exactly what they show today, and download about 1.2 KB in place of about 2.3 MB.

## Tests

1. Red before the code (`tools/status/test_status.js`): for each engine, `last_data_date` and `open_call` computed
   from the payload by the rules taken out of `hub.app.js` itself, and the root hub's fields, compared with
   `status.json`. Fails: the file does not exist.
2. The payload is unchanged: sha256 of each generator's stdout without and with the change, same clock, same inputs,
   identical for the five engines.
3. Green: test 1 passes for the five engines.
4. Fallback: each hub with status.json present, missing, and broken JSON shows the same text as today.
5. On the locally built site: screenshots of both hubs before and after, the same to the eye; bytes downloaded
   before and after.

Nothing in this file is changed after the first code change; a later finding goes in a dated section.

## Added 2026-10-13, after the code (a dated section, not an amendment)

- Workflow line: it copies status.json when the payload changed or when the preview has no status.json yet, not on
  every run. Copying it on every run would commit on every run (built_utc always changes), also on runs whose data did
  not change, which today make no commit. Tested on a scratch repo: four cases, exit 0 in all.
- Generator: the call is wrapped so that a failure writing status.json is reported on stderr and never stops the
  payload.
- Results [measured, local build]:
  - test 1 red (5 of 5: no file), then green (25 of 25 checks, five engines);
  - payload: each generator's stdout without and with the change, clock frozen at 2026-10-13 20:00:00Z, same inputs:
    sha256 identical for the five (nfl 1f47247d73d6, nba c29ac6d49525, mlb bef5931e1372, tennis 3a5f720cef78,
    worldcup 2b62e8c95ba2);
  - both hubs, status.json present, missing and broken: the same text in English and in Hebrew as today (hash of the
    page text equal in the four builds); present: 5 status.json and no app.js downloaded, console clean;
  - bytes (headless Chromium, cache disabled, median of 3): root hub 2,250 KB -> 16 KB; preview hub 2,350 KB ->
    116 KB; the five files 1,128 bytes;
  - screenshots: root hub byte-identical at 390 and 1024; preview hub the same to the eye (its background sphere
    is animated, so the bytes differ).
- Order: until an engine's first run after its push writes its status.json, a hub that already reads status.json
  falls back to app.js for that engine and logs one 404 in the console. So the engines go first, the hubs after.

## Added 2026-10-13: seeding tried and deferred; the order for 2026-10-14

A hand seeding of the five files was prepared on 2026-10-13 and not pushed:
- at 23:29Z line 2 of the live app.js differed from the local build for nfl, nba, mlb and worldcup (the build
  regenerates the payload with the local data and clock); tennis was equal. So the files were built from line 2 of the
  live app.js by `status_json.py` (the module the generators call); line 2 sha256 equal to live for the five;
  test_status.js 25 of 25. That commit was dropped locally; the files are rebuilt from the live line 2 when they are
  seeded.
- Deferred: the old workflow updates app.js without status.json, so a seed pushed before the engines goes stale on
  the first run of each engine (MLB ran 5 times on 2026-10-13, NFL 4, NBA 6, tennis builds while paused); the hub
  would show a stale MLB line for about a day. Decision of 2026-10-13: everything on 2026-10-14, in one order.

The order for 2026-10-14:
1. One `/v4/account` call (not counted); report the count (before: 225). Dropped: the quota is monthly, record only.
   Still 225: ODDSPAPI_QUOTA_PLAN in force.
2. Stop: push of the engines approved by Samuel.
3. The five engines pushed one at a time, each checked before the next: nfl, baseball, nba, tennis, worldcup. For
   each: the workflow is accepted and its next run (scheduled, or one already running) does not fail. No manual run,
   no counted call. Tennis and World Cup have no run: only that the push was accepted.
4. Wait for a natural first run of NFL and of MLB (both run several times a day): status.json appears in preview/nfl
   and preview/mlb, written by the workflow, and test_status.js passes on the live line 2 against it. NBA too if its
   09:41 run has fired after the push.
5. A fresh seed for the engines still without status.json (tennis, World Cup, and NBA if it has not run): built from
   the live line 2 at that moment, the same proofs (line 2 sha256 equal, 25 of 25), a dated section, a commit.
6. Stop: push of the hubs approved by Samuel.
7. Push of preview (this file, the hub, the seed); checked live: 0 app.js and 5 status.json downloaded, the page
   text hash equal (83ddfbe8d3bc / fb1e6c41763b), console clean with no 404. Then rootsite, checked live: about 16 KB,
   hash equal (6fd4c6fafc72 / 38e49745dd42), console clean.
8. The real NBA map, `build_nba_map.py --yes`: a separate approval, not before the end of step 7; the count reported
   before and after.
