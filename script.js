const apiKey = "AIzaSyA7lC4ZbcFprbJja2AUnRbW6QrkGfsR_g4";
let tracks = [];
let currentIndex = -1;

const audioPlayer = document.getElementById("audioPlayer");
const nowPlaying = document.getElementById("nowPlaying");
const playPauseBtn = document.getElementById("playPauseBtn");

function searchSongs() {
  const query = document.getElementById("searchInput").value.trim();
  if (!query) return;

  fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=${apiKey}&maxResults=10&type=video&videoEmbeddable=true`)
    .then(res => res.json())
    .then(data => {
      tracks = data.items;
      currentIndex = -1;
      displayResults();
    });
}

function displayResults() {
  const results = document.getElementById("results");
  results.innerHTML = "";

  tracks.forEach((track, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${track.snippet.title}</span>
      <button onclick="playTrack(${index})">Play</button>
    `;
    results.appendChild(li);
  });
}

function playTrack(index) {
  const track = tracks[index];
  const videoId = track.id.videoId;
  const title = track.snippet.title;

  // NOTE: Replace this with your own backend API for audio-only stream
 const audioURL = `https://indiebeats-audio-backend.onrender.com/audio?videoId=${videoId}`;

  audioPlayer.src = audioURL;
  audioPlayer.play();

  nowPlaying.textContent = `Now Playing: ${title}`;
  currentIndex = index;
  playPauseBtn.textContent = "⏸️";
}

function togglePlay() {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseBtn.textContent = "⏸️";
  } else {
    audioPlayer.pause();
    playPauseBtn.textContent = "▶️";
  }
}

function prevSong() {
  if (currentIndex > 0) {
    playTrack(currentIndex - 1);
  }
}

function nextSong() {
  if (currentIndex < tracks.length - 1) {
    playTrack(currentIndex + 1);
  }
}
