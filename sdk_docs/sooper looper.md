- Web stack approach of [[my dream [[looping pedal]]]]
- As a roam plugin
    - {{[[roam/js]]}}
        - ```javascript
let passthrough = false;
const layers = [];

console.log('starting looper!');
const AudioContext = window.AudioContext || window.webkitAudioContext;

const context = new AudioContext();
const speaker = context.destination;

initUI();

navigator.mediaDevices.getUserMedia({
  audio: true,
})
.then((mediaStream) => {
  console.log(mediaStream);

  const mediaStreamAudioSourceNode = new MediaStreamAudioSourceNode(context, { mediaStream });
  
  if (passthrough) {
    mediaStreamAudioSourceNode.connect(speaker);
  }
});

function createLayer (buffer) {
  let source = context.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  let muted = false;
  var gainNode = context.createGain();
  
  source.connect(gainNode);
  gainNode.connect(speaker);

  let lastVolume = gainNode.gain.value;
  
  return {
    get volume () { return gainNode.gain.value; },
    toggleMute () {
      muted = !muted;
      gainNode.gain.setValueAtTime(context.currentTime, muted ? 0 : lastVolume);
    },
    set volume (newValue) {
      gainNode.gain.setValueAtTime(context.currentTime, newValue);
    },
  }
}

function initUI () {
  const ui = document.createElement('div');
  ui.id = 'looper-ui';
  const playPause = document.createElement('button');
playPause.innerText = 'Start';
  playPause.id = "looperStartStop";
ui.style = 'position:absolute;bottom:0px;right:0px;z-index:999';
  ui.append(playPause);
  document.body.append(ui);
  playPause.addEventListener('click', record);
}

let startTime;
let endTime;
let mediaRecorder;
let loop;
function record() {

  const button = looperStartStop;
  if (!loop) {
    button.innerText = 'Stop';
    recording = true;
    // Maybe put the time grab below the loop call:
    startTime = Date.now();
    loop = startLoop();
  } else {
    button.innerText = 'Start';
    mediaRecorder.requestData()
    .then((blob) => {
      const layer = createLayer(blob);
      layers.push(layer);
    });
  }
}

function startLoop () {
  mediaRecorder = new MediaRecorder(mediaStream);
  return {
    startTime,
    start: () => {
      mediaRecorder.start();
    },
    stop: () => {
      mediaRecorder.stop();
    },
    requestData: async () => {
      return mediaRecorder.requestData();
    }
  };
}

```
        - 
- pros
    - Could run on any platform (even mobile: add loops from anywhere?)
    - can be internet-enabled: Anyone, anytime, could contribute to the loop(s).
    - The easiest to make highly extensible (drawing on my experience from [[[[MetaMask]] Snaps]]s)
- cons
    - likely some latency when capturing that needs to be reconciled somehow
        - The **AudioBufferSourceNode** interface is an [AudioScheduledSourceNode](https://developer.mozilla.org/en-US/docs/Web/API/AudioScheduledSourceNode) which represents an audio source consisting of in-memory audio data, stored in an [AudioBuffer](https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer).
        - This interface is especially useful for playing back audio which has particularly stringent timing accuracy requirements, such as for sounds that must match a specific rhythm and can be kept in memory rather than being played from disk or the network. To play sounds which require accurate timing but must be streamed from the network or played from disk, use a [AudioWorkletNode](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletNode) to implement its playback.
        - An AudioBufferSourceNode can only be played once; after each call to [start()](https://developer.mozilla.org/en-US/docs/Web/API/AudioScheduledSourceNode/start), you have to create a new node if you want to play the same sound again. Fortunately, these nodes are very inexpensive to create, and the actual AudioBuffers can be reused for multiple plays of the sound.
        - can loop!: https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode/loop
- https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
    - > A powerful feature of the Web Audio API is that it does not have a 
strict "sound call limitation". For example, there is no ceiling of 32 
or 64 sound calls at one time. Some processors may be capable of playing
 more than 1,000 simultaneous sounds without stuttering.
    - [walkthrough tutorial for programmers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API)
    - {{[[DONE]]}}  device input (or stream via webrtc..): https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamAudioSourceNode
        - Outputs of these nodes could be linked to inputs of others, which mix or modify these streams of sound samples into different streams.
        - This media could be from a microphone (through [getUserMedia()](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia))
            - The [MediaDevices](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices)**.getUserMedia()** method prompts the user for permission to use a media input which produces a [MediaStream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream)with tracks containing the requested types of media.
        - is created using the [AudioContext.createMediaStreamSource()](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createMediaStreamSource)method.
        - or from a remote peer on a WebRTC call (using the [RTCPeerConnection](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection)'s audio tracks).
    - {{[[TODO]]}} Recording a loop
        - ```javascript
new MediaRecorder(stream);
```
    - {{[[TODO]]}} layered looping space
        - https://developer.mozilla.org/en-US/docs/Web/API/ChannelMergerNode
        - Outputs of these nodes could be linked to inputs of others, which mix or
 modify these streams of sound samples into different streams.
        - Seems it can be easy to `Create effects nodes, such as reverb, biquad filter, panner, compressor`
        - Mixing may be a type of `Effect`
        - whoah someday [[virtual reality (VR)]] cool `The Web Audio API also allows us to control how audio is __spatialized__.`
    - {{[[TODO]]}} output to speakers
        - Need a way to re-serialize the recording blob into an audio source.
            - The **[[AudioBuffer]]** interface represents a short audio asset residing in memory, created from an audio file using the [AudioContext.decodeAudioData()](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/decodeAudioData) method, or from raw data using [AudioContext.createBuffer()](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/createBuffer).
                - Seems we would use [decodeAudioData](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/decodeAudioData) for recording the initial loop, since it can be used as-is
                - Probably using [createBuffer](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/createBuffer) for additional layers, since they will need to be padded to the base loop length.
                - Gain node per track for mixing/muting
                - ## setValueAtTime
                    - Schedules an instant change to the value of the AudioParam at a precise time, as measured against [AudioContext.currentTime](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/currentTime). The new value is given by the value parameter.
        - > Choose final destination of audio, for example your system speakers
        - > Connect the sources up to the effects, and the effects to the destination.
        - `mediaStreamAudioSourceNode.connect(context.destination);`
    - {{[[TODO]]}} stream to a peer over webrtc?
