---
name: paldo
description: PALDO — the full "viral cartoon history short" pipeline, start to finish. It picks an interesting true story (10 verified ideas), writes the narration, generates the voiceover with ElevenLabs using Nick's voice, animates it as a vertical 3D-cartoon MP4 with music and SFX, makes a thumbnail (Shorts + YouTube), and writes the title, description, tags and hashtags. Use this whenever the user says "PALDO", "paldo", "gawa tayo ng bagong video/short", "cartoon short", "animated history short", "like the penicillin video", asks for video ideas + script + voice + video, or wants a thumbnail/description/tags for a short made this way, even if they only ask for one stage.
---

# PALDO: idea → script → Nick voiceover → animated short → thumbnail → title, description, tags

PALDO is the workflow proven on **"The Messy Desk That Saved Millions"** (penicillin, 77 s, 2026-11-24). The output is a 1080×1920, 30 fps vertical MP4: flat 2D bean-head cartoon cards in a toon-shaded 3D world with black ink outlines, depth of field and gliding cameras. It comes with a voiceover in ElevenLabs' **Nick** voice, a synthesized march-style score and SFX at 50 % of the voice level, two thumbnails, and a copy-paste publishing pack.

Everything needed is bundled in `kit/`, so no network or other repo is required. The kit includes the engine, the worked penicillin example, vendored three.js r160, and the toon character library (MIT, from mromidev/claude-animated-shorts).

## One-command mode (`/paldo`): the default
The user wants **one command to run the whole pipeline**. When PALDO is invoked as `/paldo`, `/paldo <topic>` or just "PALDO", run all stages, 1 → 9, back to back without waiting. Pause only where a choice is truly the user's. Use these defaults so nothing blocks:
- **Starting point:** ideas + script, unless the user attached a voiceover or a script.
- **Length:** 45–60 s, about 150 words for Nick.
- **Topic:** if `/paldo <topic>` names one, verify it and go straight to the script. Otherwise post the 10 ideas, then **pick the strongest one yourself** and say which and why in one line. Only wait for a number if the user writes `/paldo pili`, "ako pipili", or similar.
- **Voice:** Nick (Relatable & Engaging Friend), 2 takes. Use the take closest to the target length and send both.
- **Credits:** if they aren't enough for the takes, stop and ask. That is the only hard stop.
- **Sends during the run:** the script, the voice takes, the stills sheet, the MP4, the thumbnails, and finally the publishing pack.
- **Re-arm the monitor** during the ~1 h render, and give a progress line every 250 frames.

`/paldo` can also run one stage: `/paldo thumbnail`, `/paldo description`, `/paldo voice`, `/paldo ideas`. These act on the latest project folder in the repo.

## How to talk to the user
- The user writes in **Tagalog/Taglish**, so reply in Tagalog. Keep code, file names and on-screen English text in English. The video itself is **English**.
- Keep the user posted at each stage with a short line. Send previews with SendUserFile: the stills sheet before the long render, then the MP4, then the thumbnails.
- Use AskUserQuestion for real choices, such as starting point, length, idea number, voice and take. Don't ask about things that have a sensible default.
- When the user asks "tapos na ba?", check the real frame count and give the number. Don't guess.
- The render runs in the cloud. Tell the user they can close the app, but must not archive or delete the session.

## Rules
- Stories, characters and shots are original. Never recreate another creator's video, and never use real living people as jokes, brand mascots or logos.
- **Always burn in captions, word by word** (the user's reference style, 2026-11-25): ONE word at a time, UPPERCASE, no punctuation, font **Luckiest Guy** (`kit/fonts/`, Apache-2.0), white with a hard dark drop shadow down-right (thin 1 px dark edge), centred at x 540, y 1490. Each word appears exactly when Nick says it and stays until the next word. `finish.sh` builds it via `captions.py` from `work/words.json` (ElevenLabs Scribe word timestamps), falling back to syllable-timed words from `work/phrases.json` (`CAPTIONS=0` to skip). Diegetic text (signs, labels, calendar) is also fine, but it must read correctly and never be mirrored.
- Never edit or re-time the voice, not even with atempo. The picture is timed to the voice.
- Mix with `kit/mix.py`. Music goes at exactly −6 dB vs the voice's gated RMS. SFX go at or below −6 dB, with peaks ≤ 0.7× the voice peak. Use one linear gain plus a limiter at the end.
- Verify every fact with WebSearch before offering it. Label each story **True / Disputed / Legend**, and use "legend says" or "probably" where the evidence is thin. Credit sources in the reply.
- Commit and push the project to the session's branch after major steps. A stop hook expects a clean tree, so gitignore `frames/`, `stills/`, `node_modules/`, `work/*.log` and `out/*.wav`.

## Script-first mode: the user's choice when credits are low (2026-11-26)
When the user asks for it ("ibigay mo muna ang script"), stop after Stage 3: send the script in a code block, with the word count and estimated length. Then **wait** for the user to send the voiceover file. Do not call ElevenLabs. When the audio arrives, copy it to `<slug>/voice.mp3` and continue from Stage 5.
- **Timing without credits:** run `timing.py voice.mp3 script.txt --out work`. Then spot-check every phrase start against silencedetect, since this method drifted 2.7 s on the Liberty short. Captions fall back to syllable-timed words from `work/phrases.json`.
- **Exact text:** the voiceover must read the script exactly. If the user changed words, update `script.txt` to match before timing.
- **Credits on the ElevenLabs website:** generating the voice there spends the same credits, so check that the user has enough first.

## Polish rules: the user's standing request, 2026-11-27 ("pulido na")
**1. Every word in the background must be readable. No cut-off signs.**
- **The problem:** on the Super Glue short, signs read "ASTMAN K" and "EW! SUPER GLU" because the vertical frame cut them.
- **Before writing camera keys,** make each sign, banner, label and board narrower than about **65% of the visible width** at its distance. Visible width = `2 · d · tan(fov/2) · 0.5625` (for example, d 5 m at fov 40 gives about 2.0 m). Shorten the text, or stack it on 2 lines, if it doesn't fit. Wall signs over 2.5 m wide only belong in wide shots.
- **In each shot,** a sign is either **fully inside the frame** (centred on the camera's look-x) or **fully outside it**. Never half.
- **Marks and bubbles:** keep the font rule `720/len` and centre them on the camera's look line. Check that each is fully on screen at its first frame and its last frame.
- **Stills review gate:** read every word on the sheet. If any word is clipped at a frame edge, covered by a character's head, or overlapped by another mark, fix it and re-render before the full render. This is a hard rule.

**2. Pleasing effects and transitions on every cut.** The kit supports these: `web/transitions.js`, the engine uniforms `zoomB`/`whip`/`iris`, and `web/main_template.js`.
- **Wiring:** export `TRANSITIONS = [[cutFrame, kind], ...]` from `story.js`, and start `main.js` from `main_template.js`.
- **`whip`:** directional smear, ±5 frames. Use it on most cuts inside the same era or place.
- **`zoom`:** radial zoom-blur and an FOV punch. Use it for reveals and time jumps. Don't put a zoom on the same frame as a FLASH, because together they wash out to white.
- **`iris`:** cartoon iris-out and iris-in to black, ±9 frames. Use **1–2 per video at most**, for example the big mid-story jump, or going into the "That's why" ending.
- **`punch`:** a quick 8% punch-in with a tiny shake. Put it on 3–5 key words: the twist word, a number, "REJECTED".
- **Keep the existing tools:** FLASHES for place or time jumps, `kicks` on hits, burst and puff fx on every reveal, and pop-in easing (`back`) on every mark.
- **Camera:** it always moves slowly. No static frame longer than about 2 s.
- **Sound:** give every whip and zoom a `whoosh` 2–4 frames before the cut, and every punch a `pop` or `thunk`.
- **Check transitions** with `node render.mjs stills/t "<cut-2>,<cut>,<cut+2>"` on 2–3 cuts before the full render.

## Stage 1: Intake
Ask one AskUserQuestion: **"Where are you starting from?"** The options are: need ideas + script / have a script / voiceover ready. Also ask the length: 20–30 s or 45–60 s. This user chose **45–60 s**.

## Story format: "WHY …? → THAT'S WHY …" (the user's standing choice, 2026-11-25)
Every story answers a **"Why …?"** question about something people see or say every day, and its cause is a **true, documented event in history**.
- **Title** is the question: "Why Is the Statue of Liberty Green?", "Why Do We Say OK?".
- **First line** of the narration asks the question. The second line teases the surprise.
- **Last line** starts with **"That's why …"** and lands the twist in the same sentence: "That's why the Statue of Liberty is green. Her 'rust' is what protects her."
- Prefer origins you can show: an object, a word, a sound, a colour or a rule, with one clear moment in history that caused it.
- Skip "why" questions whose popular answer is a myth (clinking glasses, pirate eye patches), unless the twist is that the myth is wrong. Label each idea True / Disputed / Legend as before.
- Don't repeat topics already on the user's channel (stickArts1998), such as the marathon distance, the Great Stink or the Pig War.

## Stage 2: 10 ideas
Give exactly 10 ideas, numbered, mixed across eras and themes: ancient, medieval, 1800s, modern, science, animals, inventions, disasters, weird laws, lucky accidents. For each idea give:
- the **Title** (5–8 words)
- the **Hook** line, a paradox stated as fact
- the **Twist**, the ironic last line
- **Why it animates well**: 2–3 big visual moments
- **True/legend**, with the caveat

Run the WebSearch checks for the candidates in parallel in one turn, then end with a "Sources:" list. Ask the user to reply with a number or "more".

Good ideas have:
- one physical cause and effect you can show
- an everyman hero
- escalating stakes
- a set built from boxes and cylinders, such as a lab, town, ship or stage

## Stage 3: Script
Formula: hook = the "Why …?" question (then a one-line tease) → setting (year, place, a concrete detail) → 2–4 escalating beats with one exaggeration joke → pivot ("But…" / "You see,") → final line "That's why …" with the twist. Older formula for reference: hook (the absurd fact, with no setup) → setting (year, place, a concrete detail) → 2–4 escalating beats with one exaggeration joke → pivot ("But…" / "You see,") → twist as the last words. Use plain spoken English, contractions, and numbers written as words.

**Word budget for Nick:** he reads at about **2.6 words/s including pauses**, not the usual 3.7. A 198-word script came out at 77 s. So aim for:
- **≈ 145 words for 55 s**
- **≈ 155 words for 60 s**

Reply with the script in a code block, the word count and estimated length, a one-paragraph visual plan, and fact notes. Keep the final text in `script.txt` (one paragraph per line). It drives the timing.

## Stage 4: Voiceover with ElevenLabs (Nick)
Use the **ElevenLabs connector** (`mcp__ElevenLabs__*`; load the tools with ToolSearch). The direct API key route failed: the user pasted a key without the `sk_` prefix. If the connector is missing, offer `request_credential` for `api.elevenlabs.io` with header `xi-api-key`.

1. `account_get_usage` shows the credits. The free tier has 10k credits a month, and one ~200-word take costs ~1,130. Check that the takes fit before generating.
2. Find the voice with `creative_list_voices` (search "Nick", languages ["en"]). The user's pick is **"Nick – Relatable & Engaging Friend"**, `voice_id 7jynqzOvnVP89nA7TB0m`. Re-confirm the ID from the list; it should only come from the tool.
3. Run `creative_create_flow` first. Then `creative_generate_speech` with model `eleven_v4`, run with `estimate_only` first, then for real with the default 2 takes. Poll `creative_get_flow_run_status`.
4. To download the takes, `elevenlabsusercontent.com` must be an allowed host. If curl gets a 403 from the proxy, call `get_environment` and then `update_environment` with `add_allowed_hosts`.
5. Measure each take with ffprobe and silencedetect, send both takes, and let the user choose. Report the length honestly. If a take is over the target, offer three options: keep it, shorten the script (~900 credits), or use another voice.
6. Remind the user once that **free-plan audio may not be used commercially** (monetized channels need Starter+), and that the attribution "Voiceover generated with ElevenLabs" goes in the description.

## Stage 5: Build the animation (see `references/engine.md`)
1. Set up the project inside the repo: `penicillin/` was the example, so use `<slug>/`. Copy `kit/` there, then `cp voice_take.mp3 voice.mp3`, and run `npm i three@0.160.0` (or keep the vendored `web/three.module.js`).
2. Get the timing **from real word timestamps** (the user flagged a narration/picture mismatch on the Liberty short: `timing.py`'s silence DP drifted by up to 2.7 s). Attach `voice.mp3` (raw GitHub URL) to the voice flow with `creative_attach_reference_file`, run `creative_transcribe_audio` (eleven_scribe_v1, ~300 credits/min), download `words_download_url` to `work/words.json`, then set each phrase's start/end in `work/phrases.json` to its first/last word (numbers are single tokens, e.g. "1886,"). `timing.py voice.mp3 script.txt --out work` is only a fallback; if used, spot-check every phrase start against the transcript. Total frames = round(duration × 30). Before the full render, check that each shot's first frame lands 0–3 frames before its phrase's first word.
3. Write the shot plan by editing `web/story.js` (copy `web/main_template.js` over `main.js` and add a `TRANSITIONS` list; see Polish rules). Each SHOT has frames a..b, a light preset, a shadow centre, camera keys, kicks and a dof function. There is usually one shot per phrase, and the reaction lands 0–3 frames before its word. Add white flashes at place or time jumps. At the twist, the music stops and there is a push-in with a roll.
4. Build the sets in `web/world.js` (several sets far apart on x) and the cast in `web/cast.js` (outfits, ARM poses, PROPs, fx drawings).
5. For stills, run `node render.mjs stills/a "<mid-frame of every shot>"` and then `python3 sheet.py stills/a stills/sheet_a.jpg`. Read the sheet, fix the traps listed in `references/engine.md`, re-render only the fixed frames, and repeat. Then **send the sheet to the user**.

## Stage 6: Sound
Edit the cue table at the bottom of `audio.py`, which uses frames/30. Run `python3 audio.py`, then `python3 mix.py voice.mp3 out/music.wav out/sfx.wav`. Confirm it prints music **−6.0 dB** vs voice, and SFX ≤ −6 dB with a peak ≤ 0.70×.

## Stage 7: Render, finish, deliver
- **Render:** start two workers in parallel with `RESUME=1 nohup node render.mjs frames "0-<N/2>"` and `"<N/2+1>-<N-1>"`, writing logs to `work/r1.log` and `work/r2.log`. That is ≈ 3.3 s/frame each, so about 1 h for 77 s on 4 cores.
- **Monitor:** watch it with a Monitor loop that reports every 250 frames and exits on DONE ×2, an error, or the processes exiting. Re-arm it after 30 minutes.
- **Finish:** run `bash finish.sh "Title"` (it also burns in the captions). It applies a linear gain to about −14 LUFS and a two-stage limiter, so the true peak stays under −1 dBFS. It encodes H.264 CRF 17 with AAC 192k, runs the freeze, black and loudness QA, and writes `out/qa_sheet.jpg`.
- **Deliver:** read the QA sheet, then send the MP4 with SendUserFile. Give a short Tagalog summary: the QA numbers and one line per shot. Commit and push.

## Stage 8: Thumbnail
1. Add a `thumb` shot at frame 9000 to `story.js`. Make it an MCU of the hero with a shocked or grinning face, holding or pointing at the story's key object (scaled-up prop), with a glow and burst fx behind the object. Make sure nothing is clipped by the card edge: keep the hand within about 50u of the shoulder.
2. Render it with `node render.mjs stills/thumb "9000"`, then run `python3 thumb.py`. This writes `out/thumbnail_vertical.jpg` (1080×1920) and `out/thumbnail_youtube.jpg` (1280×720).
3. Edit the two text lines in `thumb.py` to fit the story. The first is white (the setup) and the second is yellow (the payoff), set in Inter Black with a dark stroke and drop shadow. A red arrow points at the key object.
4. Check the composite and send both. Keep the text off the face, and keep it inside the margins with font ≤ 112 px for long lines.

## Stage 9: Title, description, tags (see `references/publish.md`)
Give copy-paste code blocks: the title, the long YouTube description (story recap, facts with dates, a sources line, an "original animation" note, and the ElevenLabs credit), a short Shorts/TikTok caption, the YouTube tags (comma-separated) and 10–15 hashtags. Add the upload tips: "Not made for kids" unless sure, and the "Altered or synthetic content" toggle for the AI voice.

## Stage 10: Upload + schedule (only when the user asks)
Proven 2026-11-26 on "Why Are School Buses Yellow?". Push the MP4, then call Zapier `youtube_upload_video` (YouTube app, channel stickArts1998) with `video` = the raw.githubusercontent URL **pinned to the commit hash**, `privacy_status: private`, `publish_at` in UTC (9:00 AM Manila = 01:00Z; this channel accepts it despite the "Partner only" note), the catchy title (+ `#shorts`), description, **12 distinct tags**, `category_id: "27"`, `made_for_kids: false`, `default_language`/`default_audio_language: "en"`. Confirm `publishAt` in the result. If YouTube returns 429, retry once later, never in a loop; Zapier throttles repeated attempts. If the user says they uploaded it themselves, cancel any scheduled upload task.
