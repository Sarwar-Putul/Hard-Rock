const searchSongs = () => {
    const searchText = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
        //Load data
    fetch(url)
        .then(res => res.json())
        .then(data => displaySongs(data.data))
        .catch(error => displayError('Something went wrong.. Please try again later')); // Error massage দেওয়া হইছে।
};

// উপরের কাজটি এই ভাবেও করা যায় async ব্যবহার করে
// const searchSongs = async() => {
//     const searchText = document.getElementById('search-field').value;
//     const url = `https://api.lyrics.ovh/suggest/${searchText}`
//     const res = await fetch(url);
//     const data = await res.json();
//     displaySongs(data.data);
// };

const displaySongs = songs => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = ''; // সার্চ দেয়ার পর আগের সার্চ রেজাল্ট যেন না দেখায় সে জন্য ('') করা হয়। 

    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3'

        songDiv.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                    <source src="${song.preview}" type="audio/mpeg">    
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onClick="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
            `;
        songContainer.appendChild(songDiv);
    });

};

const getLyrics = (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayLyrics(data.lyrics))

};

// উপরের কাজটি এই ভাবেও করা যায় async ব্যবহার করে
// const getLyrics = async(artist, title) => {
//     const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
//     const res = await fetch(url);
//     const data = await res.json();
//     displayLyrics(data.lyrics);
// };

// উপরের কাজটি Error massage সহ এই ভাবেও করা যায় async ব্যবহার করে
// const getLyrics = async(artist, title) => {
//     const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
//     try {
//         const res = await fetch(url);
//         const data = await res.json();
//         displayLyrics(data.lyrics);
//     } catch (error) {
//         displayError('Sorry! I failed to load the lyric...Please try again later.')
//     }
// };

const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerText = lyrics;

};

const displayError = error => {
    errorText = document.getElementById('warning');
    errorText.innerText = error;
};