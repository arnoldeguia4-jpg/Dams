---
name: paldont
description: PALDONT — the full "viral cartoon myth & legend short" pipeline, start to finish. Same machine as PALDO, but the story is an ALAMAT, myth or legend instead of true history. It offers 10 sourced myth/alamat ideas (Filipino alamat and world mythology), writes the narration, generates a Tagalog voiceover with ElevenLabs using the Filipino narrator voice "Padre Veles – Tagakuwento ng mga Alamat", animates it as a vertical 3D-cartoon MP4 with music and SFX, makes a thumbnail (Shorts + YouTube), and writes the title, description, tags and hashtags. Use this whenever the user says "PALDONT", "paldont", "alamat", "gawa tayo ng alamat", "myth short", "legend short", "mythology video", "alamat ng ...", "kwento ng diwata/diyos", or wants a thumbnail/description/tags for a myth short made this way, even if they only ask for one stage. For true-history shorts use PALDO instead.
---

# PALDONT: alamat/myth → script → Tagalog voiceover (Padre Veles) → animated short → thumbnail → title, description, tags

PALDONT is PALDO's sister skill. The engine, voice, render, mix, thumbnail and publishing steps are **identical** to PALDO (proven on "The Messy Desk That Saved Millions", penicillin, 77 s). The only difference is the **topic**: every PALDONT video tells an **alamat, myth or legend**, such as how something came to be, a god's trick, a monster's origin or a cursed love story, instead of a true historical event.

The output is a 1080×1920, 30 fps vertical MP4: flat 2D bean-head cartoon cards in a toon-shaded 3D world with black ink outlines, depth of field and gliding cameras. It comes with a **Tagalog** voiceover in ElevenLabs' Filipino narrator voice **Padre Veles – Tagakuwento ng mga Alamat** (deep, mysterious, made for alamat and kuwentong-bayan), a synthesized score (lean mystical/folk rather than march) and SFX at 50 % of the voice level, two thumbnails, and a copy-paste publishing pack.

Everything needed is bundled in `kit/`, so no network or other repo is required. The kit includes the engine, the worked penicillin example (as a template for structure), vendored three.js r160, and the toon character library (MIT, from mromidev/claude-animated-shorts).

## One-command mode (`/paldont`): the default
The user wants **one command to run the whole pipeline**. When PALDONT is invoked as `/paldont`, `/paldont <myth>` or just "PALDONT", run all stages, 1 → 9, back to back without waiting. Pause only where a choice is truly the user's. Use these defaults so nothing blocks:
- **Starting point:** ideas + script, unless the user attached a voiceover or a script.
- **Length:** 45–60 s, about 112–122 Tagalog words.
- **Topic:** if `/paldont <myth>` names one (e.g. `/paldont alamat ng pinya`), check its sources and go straight to the script. Otherwise post the 10 ideas, then **pick the strongest one yourself** and say which and why in one line. Only wait for a number if the user writes `/paldont pili`, "ako pipili", or similar.
- **Voice:** Padre Veles (Filipino alamat narrator), 2 takes. Use the take closest to the target length and send both.
- **Credits:** if they aren't enough for the takes, stop and ask. That is the only hard stop.
- **Sends during the run:** the script, the voice takes, the stills sheet, the MP4, the thumbnails, and finally the publishing pack.
- **Re-arm the monitor** during the ~1 h render, and give a progress line every 250 frames.

`/paldont` can also run one stage: `/paldont thumbnail`, `/paldont description`, `/paldont voice`, `/paldont ideas`. These act on the latest PALDONT project folder in the repo.

## How to talk to the user
- The user writes in **Tagalog/Taglish**, so reply in Tagalog. Keep code and file names in English. The video narration is in **Tagalog** (natural, storyteller Filipino, not deep/archaic; common English loanwords are fine). On-screen text and thumbnail text are Tagalog too. World myths keep their proper names (Zeus, Thor, Amaterasu).
- Keep the user posted at each stage with a short line. Send previews with SendUserFile: the stills sheet before the long render, then the MP4, then the thumbnails.
- Use AskUserQuestion for real choices, such as starting point, length, idea number, voice and take. Don't ask about things that have a sensible default.
- When the user asks "tapos na ba?", check the real frame count and give the number. Don't guess.
- The render runs in the cloud. Tell the user they can close the app, but must not archive or delete the session.

## Rules
- Stories are told in our own words, with original characters' designs and shots. Never recreate another creator's video, a film's or game's version of a myth (no Disney/Marvel/game designs or names that belong to them), and never use real living people as jokes, brand mascots or logos.
- **Retell the traditional story, not someone's copyrighted retelling.** Many "alamat" known from schoolbooks are 20th-century authored versions. Use the traditional core plot and write fresh narration.
- **Respect living belief.** Some myths are sacred to living communities (e.g. indigenous Philippine groups, Hindu, Shinto, Native American, Aboriginal traditions). Tell them respectfully, never as mockery of the gods or people; aim humour at situations, not at the culture. Avoid sacred stories a community asks outsiders not to retell.
- **Captions** (when the user asks, e.g. "may caption"): word-by-word Nunito Black captions burned in by `finish.sh` from `out/captions.ass`. Timing comes ONLY from real word timestamps: pin the chosen take with `creative_add_flow_asset_node`, run `creative_transcribe_audio` (eleven_scribe_v1, 0 credits), save the words to `work/words.json` (fix phonetic spellings back, e.g. "Trim" → "Thrym"), then `python3 captions.py none out/captions.ass --words work/words.json --keepcase --size 96 --y 1500`. Use the same Scribe frames for the shot timing. Keep faces and key props above y≈1350 so captions never cover them. Without a request: no captions. Diegetic text such as signs, scrolls or carvings is fine, but it must read correctly and never be mirrored.
- Never edit or re-time the voice, not even with atempo. The picture is timed to the voice.
- Mix with `kit/mix.py`. Music goes at exactly −6 dB vs the voice's gated RMS. SFX go at or below −6 dB, with peaks ≤ 0.7× the voice peak. Use one linear gain plus a limiter at the end.
- **Check every myth with WebSearch before offering it**: where it comes from (people, region, oldest known source), and the main variants. Label each idea **Traditional folktale / Ancient myth (written source) / Modern retelling**, and say which version you are telling. In narration use "legend says", "the old folks tell", "according to the Visayans…". Never present the myth as historical fact. Credit sources in the reply.
- Commit and push the project to the session's branch after major steps. A stop hook expects a clean tree, so gitignore `frames/`, `stills/`, `node_modules/`, `work/*.log` and `out/*.wav`.

## Stage 1: Intake
Ask one AskUserQuestion: **"Where are you starting from?"** The options are: need ideas + script / have a script / voiceover ready. Also ask the length: 20–30 s or 45–60 s. Default for this user: **45–60 s**.

## Stage 2: 10 myth & alamat ideas
Give exactly 10 ideas, numbered. Mix them like this:
- **4–5 Filipino**: alamat (origin tales: fruits, places, animals, volcanoes), and mythology (Bathala, Mayari, Tala, Bakunawa, Maria Makiling, Daragang Magayon, Malakas at Maganda, aswang/tikbalang/kapre lore). Spread across Luzon, Visayas and Mindanao.
- **5–6 world**: Greek, Norse, Egyptian, Japanese, Chinese, Indian, Mesoamerican, African, Polynesian, Celtic, etc.

Lean toward lesser-known stories or surprising twists on famous ones; avoid ten "why the sky is high" tales in a row. Mix themes: origin of something, trickster wins, cursed love, monster, punishment for pride or greed, gods' rivalry.

For each idea give:
- the **Title** (5–8 words)
- the **Hook** line, a strange claim told as if true ("There's a fruit with a hundred eyes, and it's because a girl wouldn't look.")
- the **Twist**, the ironic last line, usually the "and that's why…" payoff
- **Why it animates well**: 2–3 big visual moments (transformations, giant creatures, magic light)
- **Origin & type**: people/region, oldest source, Traditional / Ancient myth / Modern retelling, plus a variant note

Run the WebSearch checks for the candidates in parallel in one turn, then end with a "Sources:" list. Ask the user to reply with a number or "more".

Good myth ideas have:
- one **visible transformation or cause → effect** (girl → pineapple, tears → lake, serpent eats moons)
- a clear hero or fool and a clear lesson or irony
- escalating stakes (warning → ignored → curse)
- sets you can build from boxes, cylinders and cones: hut, forest, mountain, sea, sky palace, village

## Stage 3: Script
Write it in **Tagalog**. Formula: hook (the strange claim, no setup) → setting ("Noong unang panahon, sa isang nayon sa paanan ng Mayon…", with one concrete detail) → 2–4 escalating beats with one exaggeration joke → pivot ("But…" / "You see,") → twist as the last words (often the origin payoff: "…kaya pala ang pinya ay may sandaang mata."). Use plain spoken Tagalog, numbers written as words. Keep a storyteller voice: "ayon sa alamat", "sabi ng matatanda".

**Word budget for Padre Veles (Tagalog):** measured on "Bakit Mataas ang Langit" (134 words → 64.6 s and 66.2 s): about **2.05 words/s including pauses**:
- **≈ 112 words for 55 s**
- **≈ 122 words for 60 s**

Reply with the script in a code block, the word count and estimated length, a one-paragraph visual plan, and source notes (which version, from where). Keep the final text in `script.txt` (one paragraph per line). It drives the timing.

## Stage 4: Voiceover with ElevenLabs (Padre Veles, Tagalog)
Use the **ElevenLabs connector** (`mcp__ElevenLabs__*`; load the tools with ToolSearch). If the connector is missing, offer `request_credential` for `api.elevenlabs.io` with header `xi-api-key`.

1. `account_get_usage` shows the credits. The free tier has 10k credits a month, and one ~200-word take costs ~1,130. Check that the takes fit before generating.
2. Find the voice with `creative_list_voices` (search "Padre Veles", languages ["fil"], use_cases ["narrative_story"]). The pick is **"Padre Veles – Tagakuwento ng mga Alamat"**, `voice_id NHa18FgjMx6FymEV1Vcl`: a deep, mysterious Filipino male storyteller made for alamat, kuwentong-bayan and kababalaghan. Re-confirm the ID from the list; it should only come from the tool. Backups if it's gone or the user wants another: **Nessy Storyteller** (female, folk legends) `ZvRtav8q9fOfg1kBt4Ez`, **Noel Urbano** (older male) `xk0YQH4VnJhJ44RGrzas`.
3. Run `creative_create_flow` first. Then `creative_generate_speech` with model `eleven_v4` and language Filipino (`fil`), run with `estimate_only` first, then for real with the default 2 takes. Poll `creative_get_flow_run_status`.
4. Foreign names in world myths (Zeus, Amaterasu, Quetzalcoatl) may be mispronounced. If so, spell them phonetically in the speech text only (e.g. "Ket-sal-KO-wat") and keep `script.txt` in step with the same words.
5. To download the takes, `elevenlabsusercontent.com` must be an allowed host. If curl gets a 403 from the proxy, call `get_environment` and then `update_environment` with `add_allowed_hosts`.
6. Measure each take with ffprobe and silencedetect, send both takes, and let the user choose. Report the length honestly. If a take is over the target, offer three options: keep it, shorten the script (~900 credits), or use another voice.
7. Remind the user once that **free-plan audio may not be used commercially** (monetized channels need Starter+), and that the attribution "Voiceover generated with ElevenLabs" goes in the description.

## Stage 5: Build the animation (see `references/engine.md`)
1. Set up the project inside the repo as `<slug>/` (e.g. `alamat-ng-pinya/`). Copy `kit/` there, then `cp voice_take.mp3 voice.mp3`, and run `npm i three@0.160.0` (or keep the vendored `web/three.module.js`).
2. Get the timing: `python3 timing.py voice.mp3 script.txt --out work` writes `work/phrases.json`. Total frames = round(duration × 30).
3. Write the shot plan by editing `web/story.js`. Each SHOT has frames a..b, a light preset, a shadow centre, camera keys, kicks and a dof function. There is usually one shot per phrase, and the reaction lands 0–3 frames before its word. Myth look: warmer dusk/moonlight presets, glowing magic fx, and a white (or golden) flash at every transformation or time jump. At the twist, the music stops and there is a push-in with a roll on the transformed object.
4. Build the sets in `web/world.js` (several sets far apart on x: village, forest, mountain, sky) and the cast in `web/cast.js` (outfits that fit the culture respectfully, gods/creatures, ARM poses, PROPs, fx drawings like spirit glow and smoke).
5. For stills, run `node render.mjs stills/a "<mid-frame of every shot>"` and then `python3 sheet.py stills/a stills/sheet_a.jpg`. Read the sheet, fix the traps listed in `references/engine.md`, re-render only the fixed frames, and repeat. Then **send the sheet to the user**.

## Stage 6: Sound
Edit the cue table at the bottom of `audio.py`, which uses frames/30. Favour a folk/mystical score (drones, plucks, gongs/kulintang-like bells for Filipino stories) and magic SFX (shimmer, whoosh, thunder) at transformations. Run `python3 audio.py`, then `python3 mix.py voice.mp3 out/music.wav out/sfx.wav`. Confirm it prints music **−6.0 dB** vs voice, and SFX ≤ −6 dB with a peak ≤ 0.70×.

## Stage 7: Render, finish, deliver
- **Render:** start two workers in parallel with `RESUME=1 nohup node render.mjs frames "0-<N/2>"` and `"<N/2+1>-<N-1>"`, writing logs to `work/r1.log` and `work/r2.log`. That is ≈ 3.3 s/frame each, so about 1 h for 77 s on 4 cores.
- **Monitor:** watch it with a Monitor loop that reports every 250 frames and exits on DONE ×2, an error, or the processes exiting. Re-arm it after 30 minutes.
- **Finish:** run `bash finish.sh "Title"`. It applies a linear gain to about −14 LUFS and a two-stage limiter, so the true peak stays under −1 dBFS. It encodes H.264 CRF 17 with AAC 192k, runs the freeze, black and loudness QA, and writes `out/qa_sheet.jpg`.
- **Deliver:** read the QA sheet, then send the MP4 with SendUserFile. Give a short Tagalog summary: the QA numbers and one line per shot. Commit and push.

## Stage 8: Thumbnail
1. Add a `thumb` shot at frame 9000 to `story.js`. Make it an MCU of the hero (or the creature/god) with a shocked or awed face, next to the story's key magical object or transformation (scaled-up prop), with a glow and burst fx behind it. Make sure nothing is clipped by the card edge: keep the hand within about 50u of the shoulder.
2. Render it with `node render.mjs stills/thumb "9000"`, then run `python3 thumb.py`. This writes `out/thumbnail_vertical.jpg` (1080×1920) and `out/thumbnail_youtube.jpg` (1280×720).
3. Edit the two text lines in `thumb.py` to fit the story. The first is white (the setup, e.g. "AYAW NIYANG HUMANAP…") and the second is yellow (the payoff, e.g. "KAYA MAY 100 MATA!"), set in Inter Black with a dark stroke and drop shadow. A red arrow points at the key object.
4. Check the composite and send both. Keep the text off the face, and keep it inside the margins with font ≤ 112 px for long lines.

## Stage 9: Title, description, tags (see `references/publish.md`)
Give copy-paste code blocks: the title, the long YouTube description (story recap, where the myth comes from and which version, a sources line, an "original animation" note, and the ElevenLabs credit), a short Shorts/TikTok caption, the YouTube tags (comma-separated) and 10–15 hashtags. Add the upload tips: "Not made for kids" unless sure, and the "Altered or synthetic content" toggle for the AI voice.
