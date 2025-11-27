// Firebase is loaded from CDN
const firebaseConfig = {
  projectId: "live-3d-607ed",
  databaseURL:
    "https://live-3d-607ed-default-rtdb.europe-west1.firebasedatabase.app",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Get 'screen' parameter from URL, default to slider value if not present
let urlParams = new URLSearchParams(window.location.search);
let screen = urlParams.get("screen");

if (screen == "A") {
  document.body.innerHTML += `<button id="sequence_start">Start Sequence</button>`;
}

let playing_index = 0;
let screen_is_active = false;

function activity_switch() {
  if (screen_is_active) {
    document.body.style.backgroundColor = "green";
  } else {
    document.body.style.backgroundColor = "red";
  }
}

let isPlaying = false;
const startButton = document.getElementById("sequence_start");

// Only play audio files that match the current screen (e.g., end with screen number)
let audios_files = ["A1", "B1", "A2", "B2", "A3", "B3", "A4", "B4", "B5", "A5"];
let audio_objects = [];

audios_files.forEach((audio) => {
  let audioObj = new Audio(`./Audios/${audio}.mp3`);
  audioObj.addEventListener("ended", () => {
    screen_is_active = false;
    activity_switch();
    playing_index++;
    db.ref("playingIndex").set(playing_index);
    console.log("Audio ended, moving to index:", playing_index);
  });
  audio_objects.push(audioObj);
});

db.ref("sequenceActive").on("value", (snapshot) => {
  isPlaying = snapshot.val();
  if (isPlaying) {
    db.ref("playingIndex")
      .get()
      .then((snapshot) => {
        playing_index = snapshot.val();
        play_audio();
      });
  }
});

db.ref("playingIndex").on("value", (snapshot) => {
  playing_index = snapshot.val();
  play_audio();
});

function reset() {
  playing_index = 0;
  isPlaying = false;

  startButton.addEventListener("click", function () {
    isPlaying = !isPlaying;
    if (isPlaying) {
      playing_index = 0;
      isPlaying = true;
      startButton.textContent = "Stop Sequence";
    } else {
      startButton.textContent = "Start Sequence";
    }

    db.ref("sequenceActive").set(isPlaying);
    db.ref("playingIndex").set(playing_index);
  });

  db.ref("sequenceActive").set(false);
  db.ref("playingIndex").set(0);
}

function play_audio() {
  if (isPlaying && audio_objects[playing_index]) {
    // Only play if the audio file exists and ends with the current screen number
    if (
      audios_files[playing_index] &&
      audios_files[playing_index].startsWith(screen)
    ) {
      audio_objects[playing_index].play();

      screen_is_active = true;
    }
  } else {
    db.ref("sequenceActive").set(false);
    playing_index = 0;
    db.ref("playingIndex").set(playing_index);
  }
  activity_switch();
}

if (screen == "A") {
  reset();
}
