export interface RingtoneDefinition {
  id: string;
  label: string;
  emoji: string;
  desc: string;
}

export const RINGTONES: RingtoneDefinition[] = [
  { id: "pulse",   label: "Пульс",       emoji: "💓", desc: "Стандартный звонок" },
  { id: "classic", label: "Классический", emoji: "📞", desc: "Двойной сигнал" },
  { id: "melody",  label: "Мелодия",      emoji: "🎵", desc: "Восходящая гамма" },
  { id: "gentle",  label: "Нежный",       emoji: "🌙", desc: "Мягкий перезвон" },
  { id: "retro",   label: "Ретро",        emoji: "☎️", desc: "Старинный телефон" },
];

export function getSelectedRingtone(): string {
  return localStorage.getItem("pulse-ringtone") || "pulse";
}

type StopFn = () => void;

function playNotes(
  ctx: AudioContext,
  notes: { freq: number; type?: OscillatorType; start: number; dur: number }[],
  gainValue: number,
) {
  const master = ctx.createGain();
  master.gain.value = gainValue;
  master.connect(ctx.destination);
  for (const note of notes) {
    const osc = ctx.createOscillator();
    osc.type = note.type ?? "sine";
    osc.frequency.value = note.freq;
    osc.connect(master);
    osc.start(ctx.currentTime + note.start);
    osc.stop(ctx.currentTime + note.start + note.dur);
  }
}

/** Play one "cycle" of a ringtone pattern. Returns duration in ms. */
function playOneCycle(ctx: AudioContext, id: string): number {
  switch (id) {
    case "pulse":
      // Simple 660 Hz beep, 0.4 s on
      playNotes(ctx, [{ freq: 660, start: 0, dur: 0.4 }], 0.09);
      return 400;

    case "classic":
      // Two quick beeps: 880 Hz × 2
      playNotes(ctx, [
        { freq: 880, start: 0,   dur: 0.25 },
        { freq: 880, start: 0.35, dur: 0.25 },
      ], 0.1);
      return 600;

    case "melody":
      // Ascending C-E-G-C5 arpeggio
      playNotes(ctx, [
        { freq: 523,  start: 0,    dur: 0.15 },
        { freq: 659,  start: 0.18, dur: 0.15 },
        { freq: 784,  start: 0.36, dur: 0.15 },
        { freq: 1047, start: 0.54, dur: 0.35 },
      ], 0.1);
      return 950;

    case "gentle":
      // Soft overlapping chimes
      playNotes(ctx, [
        { freq: 1047, start: 0,   dur: 0.7 },
        { freq: 1319, start: 0.3, dur: 0.7 },
      ], 0.065);
      return 1050;

    case "retro": {
      // Dual-tone rotary phone: 425 + 480 Hz together for 1.5 s
      const master = ctx.createGain();
      master.gain.value = 0.08;
      master.connect(ctx.destination);
      for (const freq of [425, 480]) {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = freq;
        osc.connect(master);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 1.5);
      }
      return 1500;
    }

    default:
      playNotes(ctx, [{ freq: 660, start: 0, dur: 0.4 }], 0.09);
      return 400;
  }
}

/** Gap (silence) between cycles for each ringtone, in ms. */
function gapMs(id: string): number {
  switch (id) {
    case "pulse":   return 1600;
    case "classic": return 2000;
    case "melody":  return 1500;
    case "gentle":  return 2500;
    case "retro":   return 3500;
    default:        return 1600;
  }
}

/** Start a looping ringtone. Returns a stop function. */
export function playRingtone(ringtoneId: string): StopFn {
  let stopped = false;
  let ctx: AudioContext | null = null;
  const timeouts: ReturnType<typeof setTimeout>[] = [];

  const tick = () => {
    if (stopped) return;
    ctx = new AudioContext();
    const cycleDur = playOneCycle(ctx, ringtoneId);
    const closeAt = cycleDur + 50;
    timeouts.push(
      setTimeout(() => {
        ctx?.close();
        ctx = null;
        if (!stopped) timeouts.push(setTimeout(tick, gapMs(ringtoneId)));
      }, closeAt),
    );
  };

  timeouts.push(setTimeout(tick, 200));

  return () => {
    stopped = true;
    timeouts.forEach(clearTimeout);
    ctx?.close();
    ctx = null;
  };
}

/** Preview a ringtone once (for Settings picker). */
export function previewRingtone(ringtoneId: string): void {
  try {
    const ctx = new AudioContext();
    playOneCycle(ctx, ringtoneId);
    setTimeout(() => ctx.close(), 2500);
  } catch {}
}

/** Telecom-standard ringback tone for the caller.
 *  440 Hz, 2 s ON → 4 s silence → repeat.
 */
export function playRingbackTone(): StopFn {
  let stopped = false;
  let ctx: AudioContext | null = null;
  const timeouts: ReturnType<typeof setTimeout>[] = [];

  const tick = () => {
    if (stopped) return;
    ctx = new AudioContext();
    playNotes(ctx, [{ freq: 440, start: 0, dur: 2 }], 0.06);
    timeouts.push(
      setTimeout(() => {
        ctx?.close();
        ctx = null;
        if (!stopped) timeouts.push(setTimeout(tick, 4000));
      }, 2100),
    );
  };

  timeouts.push(setTimeout(tick, 300));

  return () => {
    stopped = true;
    timeouts.forEach(clearTimeout);
    ctx?.close();
    ctx = null;
  };
}
