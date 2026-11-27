#!/bin/bash
# bash finish.sh "Title": loudness gain to -14 LUFS (one linear gain) + -1 dBFS limiter, H.264 CRF 17 + AAC, QA.
set -e
TITLE="$1"; cd "$(dirname "$0")"
I=$(ffmpeg -hide_banner -i out/mix.wav -af ebur128 -f null - 2>&1 | grep -E "^\s+I:" | tail -1 | awk '{print $2}')
G=$(python3 -c "print(-14 - ($I))")
echo "mix loudness $I LUFS -> gain $G dB"
ffmpeg -y -v error -i out/mix.wav -af "volume=${G}dB,alimiter=limit=0.708:level=false:attack=2:release=60,aresample=192000,alimiter=limit=0.75:level=false:attack=1,aresample=48000" -ar 48000 out/final_audio.wav
ffmpeg -y -v error -framerate 30 -i frames/f%04d.jpg -i out/final_audio.wav -map 0:v:0 -map 1:a:0 -c:v libx264 -preset slow -crf 17 -maxrate 14M -bufsize 24M -pix_fmt yuv420p \
  -c:a aac -b:a 256k -shortest -metadata title="$TITLE" -movflags +faststart "out/$(echo "$TITLE" | tr ' ' '_').mp4"
OUT="out/$(echo "$TITLE" | tr ' ' '_').mp4"
PK=$(ffmpeg -hide_banner -i "$OUT" -af ebur128=peak=true -f null - 2>&1 | grep -E "^\s+Peak:" | tail -1 | awk '{print $2}')
if python3 -c "import sys; sys.exit(0 if float('$PK') > -1.0 else 1)"; then  # AAC overshoot: tighter limiter, remux
  echo "true peak $PK dBFS after AAC -> re-limiting"
  ffmpeg -y -v error -i out/mix.wav -af "volume=${G}dB,alimiter=limit=0.63:level=false:attack=2:release=60,aresample=192000,alimiter=limit=0.66:level=false:attack=1,aresample=48000" -ar 48000 out/final_audio.wav
  ffmpeg -y -v error -i "$OUT" -i out/final_audio.wav -map 0:v:0 -map 1:a:0 -c:v copy -c:a aac -b:a 256k -shortest -movflags +faststart out/_tmp.mp4 && mv out/_tmp.mp4 "$OUT"
fi
echo "== QA"; ffprobe -v error -show_entries format=duration:stream=width,height,r_frame_rate -of compact "$OUT"
ffmpeg -hide_banner -i "$OUT" -vf "freezedetect=n=0.001:d=0.4,blackdetect=d=0.05" -an -f null - 2>&1 | grep -E "freeze_(start|duration)|black_start" || echo "no freezes >=0.4 s, no black frames"
ffmpeg -hide_banner -i "$OUT" -af ebur128=peak=true -f null - 2>&1 | grep -E "^\s+(I|Peak):" | tail -2
ffmpeg -y -v error -i "$OUT" -vf "fps=1/3,scale=180:-1,tile=9x3" -frames:v 1 out/qa_sheet.jpg
echo "$OUT"
