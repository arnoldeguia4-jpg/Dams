---
name: wangbu
description: WANGBU — the full "Why…? / That's why…" cartoon explainer short pipeline, start to finish. Same machine as PALDO and PALDONT, but every video answers one curious WHY question (why do flamingos stand on one leg, why is a stop sign red, why do we say "OK"…) with a true story or real science. The narration always OPENS with "Why …?" and ENDS with "That's why …". In English, voiced by ElevenLabs' Nick. It offers 10 verified why-questions, writes the script, generates the voiceover, animates it as a vertical 3D-cartoon MP4 with music and SFX, makes a thumbnail (Shorts + YouTube), and writes the title, description, tags and hashtags. Use this whenever the user says "WANGBU", "wangbu", "why video", "why short", "gawa tayo ng why", "that's why video", or asks for a short that explains why something is the way it is, even if they only ask for one stage. For plain history stories use PALDO; for alamat/myths use PALDONT.
---

# WANGBU: why-question → "Why…? … That's why…" script → Nick voiceover → animated short → thumbnail → title, description, tags

WANGBU is the third sister of PALDO and PALDONT. The engine, render, mix, thumbnail and publishing steps are **identical**. What changes:
- **Topic:** one everyday **WHY** question with a surprising, *true* answer (science, history, language, animals, food, the body, design, sports, space).
- **Shape:** the narration's **first words are "Why…?"** (the question itself) and its **last sentence starts with "That's why…"** (the payoff that answers it).
- **Language:** **English** narration, on-screen text and thumbnail. The user still talks to you in Tagalog/Taglish.
- **Voice:** ElevenLabs **Nick**, the same narrator as PALDO.

The output is a 1080×1920, 30 fps vertical MP4: flat 2D bean-head cartoon cards in a toon-shaded 3D world with black ink outlines, depth of field and gliding cameras. It has Nick's voiceover, a synthesized score that fits the topic (playful plucks, march, lab bleeps, ocean pads…) and SFX at 50 % of the voice level, two thumbnails, and a copy-paste publishing pack.

Everything needed is bundled in `kit/` (engine with the ink-fog fix and the `lowday`/`forest` light presets, toon character library, vendored three.js r160, render/mix/finish/thumbnail scripts). The worked projects in the repo (`penicillin/`, `bakit-mataas-ang-langit/`, `luyang-naging-ginto/`) are good references for sets, cast and story code.

## One-command mode (`/wangbu`): the default
When WANGBU is invoked as `/wangbu`, `/wangbu <why question>` or just "WANGBU", run all stages, 1 → 9, back to back without waiting. Pause only where a choice is truly the user's. Defaults:
- **Starting point:** ideas + script, unless the user attached a voiceover or a script.
- **Length:** 45–60 s, about 135–145 words for Nick.
- **Topic:** if `/wangbu <question>` names one (e.g. `/wangbu why are stop signs red`), verify it and go straight to the script. Otherwise post the 10 ideas, then **pick the strongest one yourself** and say which and why in one line. Only wait for a number if the user writes `/wangbu pili`, "ako pipili", or similar.
- **Voice:** Nick (Relatable & Engaging Friend), 2 takes. Use the take closest to the target length and send both.
- **Credits:** if they aren't enough for the takes, stop and ask. That is the only hard stop.
- **Sends during the run:** the script, the voice takes, the stills sheet, the MP4, the thumbnails, and finally the publishing pack.
- **Re-arm the monitor** during the ~1 h render, and give a progress line every 250 frames.

`/wangbu` can also run one stage: `/wangbu thumbnail`, `/wangbu description`, `/wangbu voice`, `/wangbu ideas`. These act on the latest WANGBU project folder in the repo.

## How to talk to the user
- The user writes in **Tagalog/Taglish**, so reply in Tagalog. The video, its on-screen text, thumbnail text and publishing pack are **English**. Keep code and file names in English.
- Keep the user posted at each stage with a short line. Send previews with SendUserFile: the stills sheet before the long render, then the MP4, then the thumbnails.
- Use AskUserQuestion only for real choices (starting point, length, idea number, take). Don't ask about things that have a sensible default.
- When the user asks "tapos na ba?", check the real frame count and give the number. Don't guess.
- The render runs in the cloud. Tell the user they can close the app, but must not archive or delete the session.

## Rules
- **The answer must be true.** Verify every why-answer with WebSearch before offering it. Many popular "why" answers are myths (e.g. "Napoleon was short", "we use 10 % of our brain"). Label each idea **True / Partly true / Popular myth (we'll bust it)**. If the honest answer is "nobody knows for sure", say so in the script ("the best guess is…") and still end with "That's why…" on the part that *is* known. Credit sources in the reply.
- Stories, characters and shots are original. Never recreate another creator's video, and never use real living people as jokes, brand mascots or logos. Real brands/logos don't appear; use generic look-alikes (a "cola", a "phone").
- No captions unless asked. Diegetic text such as signs, labels or a calendar is fine, but it must read correctly and never be mirrored.
- Never edit or re-time the voice, not even with atempo. The picture is timed to the voice.
- Mix with `kit/mix.py`. Music goes at exactly −6 dB vs the voice's gated RMS. SFX go at or below −6 dB, with peaks ≤ 0.7× the voice peak. Use one linear gain plus a limiter at the end.
- Commit and push the project to the session's branch after major steps. The repo `.gitignore` already ignores `**/frames/`, `**/stills/`, `**/node_modules/`, `**/work/*.log` and `**/out/*.wav`.

## Stage 1: Intake
Ask one AskUserQuestion: **"Where are you starting from?"** The options are: need ideas + script / have a script / voiceover ready. Also ask the length: 20–30 s or 45–60 s. Default for this user: **45–60 s**.

## Stage 2: 10 why-questions
Give exactly 10 ideas, numbered, mixed across fields: animals, the human body, food, everyday objects and design, words and sayings, history quirks, space and weather, sports, tech, money. Avoid ten "it's evolution" answers in a row; favour answers with a **person, an accident or a decision** behind them.

For each idea give:
- the **Why question** exactly as Nick will open with it ("Why are stop signs red?")
- the **surprising answer** in one line
- the **"That's why…" payoff line** as it will close the video
- **Why it animates well**: 2–3 big visual moments
- **True / Partly true / Popular myth**, with the caveat

Run the WebSearch checks for the candidates in parallel in one turn, then end with a "Sources:" list. Ask the user to reply with a number or "more".

Good why-ideas have:
- a question people have actually wondered about, short enough to read on a thumbnail
- one physical cause and effect you can show
- an everyman, an animal or an object as the "hero"
- a set built from boxes, cylinders and cones (street, kitchen, lab, field, ship, stadium)

## Stage 3: Script
**Fixed shape:**
1. **Open with the question, word one:** "Why …?" Nothing before it.
2. A quick wrong-guess or tease beat ("Most people think… Nope.").
3. Setting: year/place or the scene, with one concrete detail.
4. 2–4 escalating beats with one exaggeration joke.
5. Pivot ("But…" / "You see,").
6. **Close with "That's why …"** as the final sentence, echoing the question's words so the loop feels complete (Q: "Why are stop signs red?" → "That's why stop signs are red.").

Plain spoken English, contractions, numbers written as words.

**Word budget for Nick:** about **2.45 words/s including pauses** (148 words came out at 60.7 s on the marathon short; 198 words at 77 s on penicillin). Numbers spelled out ("nineteen-oh-eight") read slowly:
- **≈ 135 words for 55 s**
- **≈ 145 words for 60 s**

Reply with the script in a code block, the word count and estimated length, a one-paragraph visual plan, and fact notes. Keep the final text in `script.txt` (one paragraph per line). It drives the timing.

## Stage 4: Voiceover with ElevenLabs (Nick)
Use the **ElevenLabs connector** (`mcp__ElevenLabs__*`; load the tools with ToolSearch). If the connector is missing, offer `request_credential` for `api.elevenlabs.io` with header `xi-api-key`.

1. `account_get_usage` shows the credits. One ~150-word take costs ~800–900 credits. Check that the takes fit before generating.
2. Find the voice with `creative_list_voices` (search "Nick", languages ["en"]). The pick is **"Nick – Relatable & Engaging Friend"**, `voice_id 7jynqzOvnVP89nA7TB0m`. Re-confirm the ID from the list; it should only come from the tool.
3. Run `creative_create_flow` first. Then `creative_generate_speech` with model `eleven_v4`, run with `estimate_only` first, then for real with the default 2 takes. Poll `creative_get_flow_run_status`.
4. Download the takes with curl (`elevenlabsusercontent.com`). If curl gets a 403 from the proxy, call `get_environment` and then `update_environment` with `add_allowed_hosts`.
5. Measure each take with ffprobe and silencedetect, send both takes, and use the one closest to the target. Report the length honestly. If a take is over 60 s, offer: keep it, shorten the script, or regenerate.
6. The account is on the **Starter** plan, so commercial use is allowed; still put "Voiceover generated with ElevenLabs" in the description.

## Stage 5: Build the animation (see `references/engine.md`)
1. Set up the project inside the repo as `<slug>/` (e.g. `why-stop-signs-are-red/`). Copy `kit/` there (`cp -r kit/* <slug>/`), then `cp takes/takeN.mp3 voice.mp3`. The vendored `web/three.module.js` needs no npm install.
2. Get the timing: `mkdir -p work out && python3 timing.py voice.mp3 script.txt --out work` writes `work/phrases.json`. Total frames = round(duration × 30). Use `ffmpeg -af silencedetect=n=-35dB:d=0.25` to find exact word gaps for key beats.
3. Write the shot plan by rewriting `web/story.js`. Each SHOT has frames a..b, a light preset, a shadow centre, camera keys, kicks and a dof function. Usually one shot per phrase; the reaction lands 0–3 frames before its word.
   - **The "Why…?" opener:** a big, curious image of the thing in question (push-in, a "?" mark pop), then a quick flash into the story.
   - **The "That's why…" closer:** the music stops on "That's why", the camera pushes in with a slight roll on the thing from the question, now seen with the answer (a burst or glow).
4. Build the sets in `web/world.js` (several sets far apart on x) and the cast in `web/cast.js` (outfits, ARM poses, PROPs, fx drawings). Rewrite `web/main.js` so it only touches handles your world returns.
5. For stills, run `node render.mjs stills/a "<mid-frame of every shot>"` and then `python3 sheet.py stills/a stills/sheet_a.jpg`. Read the sheet, fix the traps listed in `references/engine.md`, re-render only the fixed frames, and repeat. Then **send the sheet to the user**.

## Stage 6: Sound
`audio.py` has the music block and an SFX cue table at the bottom (frames/30). Match the score to the topic, set `STOP` to the "That's why" frame, and write cues for every visual hit. Run `python3 audio.py`, then `python3 mix.py voice.mp3 out/music.wav out/sfx.wav`. Confirm it prints music **−6.0 dB** vs voice, and SFX ≤ −6 dB with a peak ≤ 0.70×.

## Stage 7: Render, finish, deliver
- **Render:** start two workers in parallel with `RESUME=1 nohup node render.mjs frames "0-<N/2>"` and `"<N/2+1>-<N-1>"`, writing logs to `work/r1.log` and `work/r2.log`. That is ≈ 3.3–5 s/frame each, so about 45–70 min for a minute of video on 4 cores.
- **Monitor:** watch it with a Monitor loop that reports every 250 frames and exits on DONE ×2, an error, or the processes exiting. Re-arm it after 30 minutes.
- **Finish:** run `bash finish.sh "Title"`. It applies a linear gain toward −14 LUFS and a two-stage limiter (true peak under −1 dBFS), encodes H.264 CRF 17 with AAC 192k, runs the freeze, black and loudness QA, and writes `out/qa_sheet.jpg`.
- **Deliver:** read the QA sheet, then send the MP4 with SendUserFile. Give a short Tagalog summary: the QA numbers and one line per shot. Commit and push.

## Stage 8: Thumbnail
1. Add a `thumb` shot at frame 9000 to `story.js`: an MCU of the hero with a shocked or curious face next to the thing from the question (scaled up), with a glow and burst behind it. Keep big props as their own fx card (not a hand prop) so nothing is clipped by the card edge or hidden behind the head.
2. Render it with `node render.mjs stills/thumb "9000"`, then edit the text in `thumb.py` and run `python3 thumb.py`. This writes `out/thumbnail_vertical.jpg` (1080×1920) and `out/thumbnail_youtube.jpg` (1280×720).
3. Text: the **white** lines are the question ("WHY ARE STOP / SIGNS RED?"), the **yellow** lines are the teaser ("IT WASN'T / ALWAYS!"). Inter Black with a dark stroke and drop shadow. A red arrow points at the key object.
4. Check the composite and send both. Keep the text off the face, inside the margins, and ≤ 112 px for long lines.

## Stage 9: Title, description, tags (see `references/publish.md`)
Give copy-paste code blocks: the title (the why question + one emoji), the long YouTube description (the question, the answer recap with dates and names, a sources line, an "original animation" note, and the ElevenLabs credit), a short Shorts/TikTok caption, the YouTube tags (comma-separated) and 10–15 hashtags. Add the upload tips: "Not made for kids" unless sure, and the "Altered or synthetic content" toggle for the AI voice. Save it as `out/publish.md` too.
