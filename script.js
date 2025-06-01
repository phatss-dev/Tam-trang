const audio = document.getElementById('audio');
const playButton = document.getElementById('play-button');
const playIcon = playButton.querySelector('i');
const progressFilled = document.getElementById('progress-filled');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const songName = document.getElementById('song-name');
const playlistSelect = document.getElementById('playlistSelect');
const circleImage = document.getElementById('circle-image');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

//Chỉnh sửa nhạc ở đây

const playlist = [
  { file: './remix/callofsilencexfakelove.mp3', title: 'CALL OF SILENCE x FAKE LOVE'},
  { file: './remix/devilinsideme.mp3', title: 'DEVIL INSIDE ME'},
  { file: './remix/deanhluongthien.mp3', title: 'Để Anh Lương Thiện' },
  { file: './remix/emcuoiroia.mp3', title: 'Em Cưới Rồi À' },
  { file: './remix/onceuponatime.mp3', title: 'Once Upon A Time'},
  { file: './remix/sixuvav2.mp3', title: 'Six UVA V2' },
  { file: './remix/thaproitudo.mp3', title: 'Tháp Rơi Tự Do' },
  { file: './remix/thoithethethoi.mp3', title: 'Thời Thế Thế Thời' },
  { file: './remix/vetxuoc.mp3', title: 'Vết Xước'}
];

let currentSong = -1;

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

function loadSong(index, autoPlay = false) {
  currentSong = index;
  audio.src = playlist[index].file;
  audio.load();
  audio.onloadeddata = () => {
    updateSongName();
    durationEl.textContent = formatTime(audio.duration);
    if (autoPlay) {
      audio.play();
      playIcon.className = 'fas fa-pause';
      circleImage.classList.remove('paused');
    } else {
      playIcon.className = 'fas fa-play';
      circleImage.classList.add('paused');
    }
  };
}

function playSong() {
  if (currentSong >= 0) {
    audio.play();
    playIcon.className = 'fas fa-pause';
    circleImage.classList.remove('paused');
  }
}

function pauseSong() {
  audio.pause();
  playIcon.className = 'fas fa-play';
  circleImage.classList.add('paused');
}

function togglePlay() {
  if (currentSong === -1) return;
  audio.paused ? playSong() : pauseSong();
}

function nextSong() {
  if (currentSong === -1) return;
  currentSong = (currentSong + 1) % playlist.length;
  playlistSelect.selectedIndex = currentSong + 1;
  loadSong(currentSong, true);
}

function prevSong() {
  if (currentSong === -1) return;
  currentSong = (currentSong - 1 + playlist.length) % playlist.length;
  playlistSelect.selectedIndex = currentSong + 1;
  loadSong(currentSong, true);
}

function updateSongName() {
  songName.textContent = playlist[currentSong].title || '';
}

audio.addEventListener('ended', nextSong);
audio.addEventListener('timeupdate', () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progressFilled.style.width = percent + '%';
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});

const progressBar = document.getElementById('progress-bar');
progressBar.addEventListener('click', (e) => {
  if (currentSong === -1) return;
  const width = progressBar.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
});

playButton.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

playlist.forEach((song, index) => {
  const option = document.createElement('option');
  option.value = index;
  option.textContent = song.title;
  playlistSelect.appendChild(option);
});

playlistSelect.addEventListener('change', (e) => {
  const selectedIndex = parseInt(e.target.value);
  loadSong(selectedIndex, true);
});