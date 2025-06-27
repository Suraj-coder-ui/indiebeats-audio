const apiKey = "AIzaSyA7lC4ZbcFprbJja2AUnRbW6QrkGfsR_g4";
let tracks = [], currentIndex = -1;
const player = document.getElementById("audioPlayer");
const nowPlaying = document.getElementById("nowPlaying");

function searchSongs() {
  const query = document.getElementById("searchInput").value.trim();
  if (!query) return;

  fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=${apiKey}&maxResults=10&type=video&videoEmbeddable=true`)
    .then(res => res.json())
    .then(data => {
      tracks = data.items;
      displayResults(tracks);
    });
}

function displayResults(items) {
  const results = document.getElementById("results");
  results.innerHTML = "";

  items.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.snippet.title}</span>
      <button onclick="playTrack(${index})">▶️ Play</button>
    `;
    results.appendChild(li);
  });
}

function playTrack(index) {
  const videoId = tracks[index].id.videoId;
  const title = tracks[index].snippet.title;

  nowPlaying.textContent = `Now Playing: ${title}`;
  player.src = `https://yt1s.ltd/audio?video=${videoId}`; // Replace later with backend
  player.play();

  currentIndex = index;
}

function togglePlay() {
  if (player.paused) {
    player.play();
  } else {
    player.pause();
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

