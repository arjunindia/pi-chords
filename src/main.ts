import './style.css';
import PI from './Pi100KDP.txt?raw';
import * as Tone from 'tone';

const Notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A5', 'B5', 'C5', 'D5', 'E5'];

document.querySelector('#btn')!.addEventListener('click', () => {
  document.querySelector('#app')!.innerHTML = `
      <div>
        <canvas id="canvas"></canvas>
      </div>
      `;
  const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!;
  canvas.width = 800;
  canvas.height = 800;
  const c = canvas.getContext('2d')!;
  c.font = '48px system-ui';
  function clear() {
    c.clearRect(0, 0, 800, 800);
    c.fillStyle = 'hsl(175 65% 3.04%)';
    c.fillRect(0, 0, 800, 800);
    c.fillStyle = 'hsl(175 100% 38%)';
    c.fillRect(0, 400, 800, 10);
  }
  clear();
  const synth = new Tone.PolySynth(Tone.Synth).toDestination();
  synth.volume.value = -6;
  let isPlaying = false;
  let count = 0;
  function draw() {
    clear();
    c.fillStyle = 'White';

    c.fillText('Pi Chords', 250, 400);

    c.fillText(PI[count * 3], 400 - 200, 250);
    c.fillText(PI[count * 3 + 1], 400, 250);
    c.fillText(PI[count * 3 + 2], 400 + 200, 250);

    const notes = [
      Notes[Math.round(Number(PI[count * 3]))],
      Notes[Math.round(Number(PI[count * 3 + 1]))],
      Notes[Math.round(Number(PI[count * 3 + 2]))],
    ];

    c.fillText(notes[0], 400 - 200, 600);
    c.fillText(notes[1], 400, 600);
    c.fillText(notes[2], 400 + 200, 600);
    if (!isPlaying) {
      let pianoPart = new Tone.Part(
        function (time, chord) {
          synth.triggerAttackRelease(chord, '8n', time);
        },
        [['0:0', notes]]
      ).start();

      pianoPart.loop = false;
      pianoPart.start();
    }
  }
  Tone.Transport.scheduleRepeat(() => {
    draw();
    count++;
  }, '4n');
  Tone.Transport.start();
});
