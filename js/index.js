let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
let forwardIcon = document.querySelector(".fa-forward");
let backwardIcon = document.querySelector(".fa-backward");

let songs = []; // Array to store fetched songs
let currentSongIndex = 0;

function displayMusic() {
    fetch("http://localhost:3000/tracks")
        .then((response) => response.json())
        .then((data) => {
            songs = data; // Store fetched songs in the array

            const musicList = document.getElementById("musicList");
            musicList.innerHTML = ""; // Clear the content of the list

            songs.forEach((track, index) => {
                const li = document.createElement("li");
                li.classList.add("track", "item");
                li.textContent = track.name;

                li.addEventListener("click", () => {
                    // Set current song index when a track is clicked
                    currentSongIndex = index;
                    loadSong();
                    playSong();
                });

                musicList.appendChild(li);
            });
        })
        .catch((error) => console.error("Error fetching or parsing tracks", error));
}

function loadSong() {
    const track = songs[currentSongIndex];
    song.src = track.trackUrl;
    document.getElementById("trackImage").src = track.img;
    document.getElementById("songTitle").textContent = track.name;
    document.getElementById("artistName").textContent = track.uNm;

    console.log("Track URL:", track.trackUrl);
}

function playSong() {
    song.play();
    ctrlIcon.classList.remove("fa-play");
    ctrlIcon.classList.add("fa-pause");
}

function pauseSong() {
    song.pause();
    ctrlIcon.classList.remove("fa-pause");
    ctrlIcon.classList.add("fa-play");
}

forwardIcon.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong();
    playSong(); // Ensure song plays after moving to the next
});

backwardIcon.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong();
    playSong(); // Ensure song plays after moving to the previous
});

ctrlIcon.addEventListener("click", () => {
    if (song.paused) {
        playSong();
    } else {
        pauseSong();
    }
});

song.addEventListener("timeupdate", () => {
    progress.value = song.currentTime;
});

progress.onchange = function () {
    song.currentTime = progress.value;
    if (song.paused) {
        playSong();
    }
};

displayMusic();
