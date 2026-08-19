# Hero Background Film — Generation Brief

**Wells Roofing · 26-Q3-WELL-01**

Four photoreal clips that crossfade into each other forever. No clip has to loop
on itself — `HeroVideo.tsx` hands off between them, so the film simply never
ends and never visibly restarts.

---

## 1. The rules that make a hero video work

Most hero videos fail for the same four reasons. Every prompt below is written to avoid them.

| Rule | Why |
|---|---|
| **Slow, single, continuous camera move** | Any cut, whip pan or zoom inside a clip reads as a glitch behind static text. One move, one direction, start to finish. |
| **Keep the lower-left third calm** | That's where the headline, paragraph and buttons sit. Detail belongs upper-right. |
| **Bright highlights, deep shadows, empty mid-tones** | A navy scrim sits at 55–95% over the footage. Flat grey mid-tone footage turns to mud. Golden-hour rim light survives the scrim; overcast does not. |
| **No faces, no text, no logos, no branded vehicles** | AI faces are uncanny at scale, and any signage locks you into a fake company. Gloved hands and backs of shoulders are safe. |

**Format:** 16:9, 3840×2160 if the tool allows (downscale to 1080p on export), 24fps, 8–10 seconds, no audio.

---

## 2. The loop script — four movements

Think of it as one continuous 40-second film about a roof, not four ads. Each clip
hands to the next on a matched tone: **wide → texture → craft → wide**. Because
clip 4 ends on sky and clip 1 opens on sky, the cycle closes invisibly.

| # | Movement | Duration | Feeling | Filename |
|---|---|---|---|---|
| 1 | **The Approach** — aerial glide toward a slate roofline at golden hour | 8s | Arrival, scale, prestige | `hero-01-approach.mp4` |
| 2 | **The Material** — macro drift across wet natural slate, raking light | 8s | Quality, depth, permanence | `hero-02-slate-texture.mp4` |
| 3 | **The Craft** — gloved hands setting a slate tile, shallow focus | 8s | Human skill, care | `hero-03-craft.mp4` |
| 4 | **The Roofline** — slow rise revealing a heritage gable against dusk sky | 8s | Legacy, completion | `hero-04-roofline.mp4` |

Drop these into `public/video/`. Filenames are already wired in `src/config/site.ts`.

---

## 3. The prompts

Master structure used throughout: **Subject → Camera → Lens → Light → Motion → Atmosphere → Grade → Negative.**

### Clip 1 — The Approach

```
Photorealistic cinematic aerial footage, slow forward drone push toward the
roofline of a grand heritage home in coastal Victoria, Australia. The roof is
natural dark blue-grey Spanish slate laid in clean overlapping courses, tiles
catching low golden sunlight along every edge. Manicured established garden and
mature eucalyptus below, calm ocean horizon far in the background.

Camera: DJI Inspire aerial, single continuous slow forward dolly, no rotation,
no cuts. Subject sits in the upper-right two-thirds of frame; lower-left is open
sky and soft shadow.
Lens: 35mm equivalent, deep focus, natural lens compression.
Light: golden hour, sun low and behind camera-left, long raking shadows across
the slate courses, strong specular glint on tile edges, deep cool shadow in the
eaves.
Motion: extremely slow and smooth, gimbal-stabilised, glacial pace.
Atmosphere: clear air, faint warm haze, a few high clouds drifting.
Grade: cinematic teal-and-amber, deep navy shadows, crushed blacks, filmic
highlight rolloff, subtle 35mm grain, high dynamic range.

Negative: no people, no faces, no text, no logos, no watermarks, no vehicles,
no signage, no fast motion, no zoom, no cuts, no camera shake, no lens flare
artefacts, no cartoon or CGI look, no oversaturation, no timelapse clouds,
no birds, no drone visible, no distorted architecture, no melting geometry.
```

### Clip 2 — The Material

```
Photorealistic extreme close-up macro footage of natural Spanish slate roof
tiles, still wet from recent rain. Individual tiles show cleaved stone texture,
fine mineral layering, subtle blue-grey and charcoal colour variation, sharp
hand-cut edges, a single bead of water tracing slowly down one tile face.

Camera: slow lateral drift left to right across the tile courses, macro
probe-lens feel, single continuous move, no cuts.
Lens: 100mm macro, very shallow depth of field, foreground tiles softly out of
focus, focal plane gliding across the surface.
Light: hard low-angle raking sunlight from frame right, grazing across the stone
to reveal every ridge and flake, deep shadow in the tile laps, brilliant
specular highlight on the wet surface.
Motion: slow, hypnotic, steady.
Atmosphere: fine mist of evaporating moisture catching the light.
Grade: cool desaturated stone tones with warm highlight, rich blacks, filmic
contrast, fine grain.

Negative: no people, no hands, no text, no logos, no watermarks, no fast motion,
no cuts, no camera shake, no CGI or plastic texture, no repeating tile pattern,
no oversaturation, no artificial blue tint, no moss, no damage, no debris.
```

### Clip 3 — The Craft

```
Photorealistic cinematic close-up of a skilled roofer's gloved hands carefully
positioning a single natural slate tile into place on a batten, then tapping a
copper nail home. Worn leather gloves, weathered hands, slate dust on the
fingertips. Stack of slate tiles resting beside. Shot from behind and slightly
above the hands — no face visible at any point.

Camera: slow arcing push in toward the hands, single continuous move, no cuts.
Lens: 50mm, shallow depth of field, background falling away into soft bokeh.
Light: warm late-afternoon sun from frame left, rim lighting the edge of the
slate and the glove, deep shadow behind.
Motion: unhurried, deliberate, patient craftsmanship — the hands move slowly and
precisely.
Atmosphere: fine dust motes floating in the sunbeam.
Grade: warm amber highlights against cool blue-grey slate, deep navy shadows,
cinematic contrast, subtle film grain.

Negative: no face, no head, no portrait, no eye contact, no text, no logos, no
brand names on gloves or tools, no watermarks, no fast motion, no cuts, no
shaky camera, no extra fingers, no deformed hands, no CGI look, no blood,
no unsafe working position, no power tools.
```

### Clip 4 — The Roofline

```
Photorealistic cinematic footage slowly craning upward to reveal the gable and
ridgeline of a restored heritage home, silhouetted against a vast dusk sky.
Crisp natural slate roof, copper flashing and a capped chimney catching the last
warm light, clean architectural lines against gradient sky.

Camera: slow vertical crane up, single continuous move, no rotation, no cuts.
The roofline enters from the lower frame and settles in the lower third,
leaving the upper frame as open graded sky.
Lens: 24mm, deep focus, minimal distortion, architecturally correct verticals.
Light: blue hour just after sunset, deep indigo sky above fading to warm amber
at the horizon, roofline in near-silhouette with warm rim light along the ridge,
faint warm glow from windows below frame.
Motion: extremely slow and smooth, almost imperceptible.
Atmosphere: still air, a few soft high clouds, first stars faintly emerging.
Grade: deep navy and amber, rich crushed blacks, cinematic highlight rolloff,
fine 35mm grain.

Negative: no people, no faces, no text, no logos, no watermarks, no aircraft, no
birds, no fast motion, no timelapse, no cuts, no camera shake, no lens flare
artefacts, no CGI look, no oversaturated sunset, no HDR halo, no distorted or
bending architecture, no impossible roof geometry.
```

---

## 4. Tool-specific adjustments

| Tool | What to change |
|---|---|
| **Veo 3** | Paste the prompt as-is — it handles the prose structure natively. Add `no audio` (it generates sound by default). Ask for 8s. |
| **Kling 2.x** | Put Subject + Light in the positive box and the entire `Negative:` list in the negative box. Set **Creativity/CFG low (~0.3)** — high creativity invents architecture. Use *Professional* mode. |
| **Runway Gen-4** | Trim to ~2 sentences of subject + the camera move; Runway degrades with long prompts. Best results from **image-to-video**: generate a still first, then apply only the camera move. |
| **Higgsfield** | Use its camera-move presets rather than describing the move in text — pick *Slow Push In* (clip 1), *Slow Pan* (clip 2), *Crane Up* (clip 4). Keep the prompt to subject + light. |
| **Sora** | Handles the full prompt well. Explicitly add `single continuous shot, no cuts` — it likes to invent edits. |

**Highest-quality route:** generate a still image first (Midjourney / Flux / Higgsfield) until the frame is genuinely right, *then* image-to-video with only the camera move described. You get far more control over composition, and composition is what makes a hero video look expensive.

---

## 5. Export & encoding

Hero video is the single heaviest thing on the page. Budget **≤ 2.5 MB per clip**.

```bash
# MP4 (H.264) — universal
ffmpeg -i raw-01.mov -vf "scale=1920:-2,fps=24" \
  -c:v libx264 -profile:v high -crf 27 -preset slow \
  -pix_fmt yuv420p -an -movflags +faststart \
  hero-01-approach.mp4

# WebM (VP9) — smaller on Chrome/Firefox, optional
ffmpeg -i raw-01.mov -vf "scale=1920:-2,fps=24" \
  -c:v libvpx-vp9 -crf 36 -b:v 0 -an \
  hero-01-approach.webm

# Poster frame — pull from clip 1 so the handoff to video is invisible
ffmpeg -i hero-01-approach.mp4 -vf "select=eq(n\,0)" -q:v 2 -frames:v 1 \
  ../photography/hero-poster.jpg
```

Checklist before commit:

- [ ] `-an` applied — no audio track (silent autoplay requirement)
- [ ] `+faststart` applied — video begins before full download
- [ ] Each file ≤ 2.5 MB
- [ ] Poster exported from **frame 0 of clip 1** and set as `heroVideo.poster`
- [ ] Watched with the navy scrim on — headline must stay readable on every frame

---

## 6. How it's wired

`src/config/site.ts` → `heroVideo.clips` is the playlist. Add, remove or reorder
clips there; nothing else needs touching.

`HeroVideo.tsx` runs two stacked `<video>` layers. As the visible clip approaches
its final 1.5 seconds the next one starts underneath and opacity swaps; once the
fade completes, the retired layer silently preloads the following clip. Because
only two layers ever exist, memory stays flat no matter how many clips are in the
playlist.

It also handles, without configuration:

- `prefers-reduced-motion` → poster only, **no video is ever downloaded**
- scrolled off screen → playback pauses
- decode/network failure or a missing file → falls back to the poster

So the page is fully functional today with zero video files present — drop the
clips into `public/video/` and the film simply starts.

**Tuning:** `fade` on `<HeroVideo>` (default `1.5s`) and the `opacity-45` wrapper
in `Hero.tsx` control blend length and footage strength. If the headline ever
fights the footage, lower the opacity before touching the scrim.
