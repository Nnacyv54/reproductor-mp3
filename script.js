document.addEventListener("DOMContentLoaded", function () {
    const audioPlayer = document.getElementById("audioPlayer");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const stopBtn = document.getElementById("stopBtn");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const repeatBtn = document.getElementById("repeatBtn");
    const shuffleBtn = document.getElementById("shuffleBtn");
    const seekBar = document.getElementById("seekBar");
    const songList = document.getElementById("songList");

    let isShuffle = false;
    let isRepeat = false;

    const songs = [
        "music/cancion1.mp3",
        "music/cancion2.mp3",
        "music/cancion3.mp3"
        // Agrega más canciones según sea necesario
    ];

    let currentSongIndex = 0;

    function playPause() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseBtn.innerText = "Pause";
        } else {
            audioPlayer.pause();
            playPauseBtn.innerText = "Play";
        }
    }

    function stop() {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        playPauseBtn.innerText = "Play";
    }

    function playNext() {
        if (isShuffle) {
            currentSongIndex = getRandomIndex();
        } else {
            currentSongIndex = (currentSongIndex + 1) % songs.length;
        }
        loadAndPlaySong();
    }

    function playPrev() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadAndPlaySong();
    }

    function repeat() {
        isRepeat = !isRepeat;
        audioPlayer.loop = isRepeat;
        repeatBtn.classList.toggle("active", isRepeat);
    }

    function shuffle() {
        isShuffle = !isShuffle;
        shuffleBtn.classList.toggle("active", isShuffle);
    }

    function getRandomIndex() {
        return Math.floor(Math.random() * songs.length);
    }

    function loadAndPlaySong() {
        audioPlayer.src = songs[currentSongIndex];
        audioPlayer.load();
        audioPlayer.play();
        playPauseBtn.innerText = "Pause";
    }

    function populateSongList() {
        songs.forEach((song, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.text = song;
            songList.add(option);
        });
    }

    function updateSelectedSong() {
        currentSongIndex = parseInt(songList.value, 10);
        loadAndPlaySong();
    }

    playPauseBtn.addEventListener("click", playPause);
    stopBtn.addEventListener("click", stop);
    nextBtn.addEventListener("click", playNext);
    prevBtn.addEventListener("click", playPrev);
    repeatBtn.addEventListener("click", repeat);
    shuffleBtn.addEventListener("click", shuffle);
    songList.addEventListener("change", updateSelectedSong);

    audioPlayer.addEventListener("timeupdate", function () {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;

        seekBar.value = (currentTime / duration) * 100;
    });

    seekBar.addEventListener("input", function () {
        const seekTime = (seekBar.value / 100) * audioPlayer.duration;
        audioPlayer.currentTime = seekTime;
    });

    audioPlayer.addEventListener("ended", function () {
        if (isRepeat) {
            audioPlayer.play();
        } else {
            playNext();
        }
    });

    // Inicia la primera canción
    loadAndPlaySong();
    populateSongList();
});
