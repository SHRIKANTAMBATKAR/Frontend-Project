let audioPlayer = null;

document.addEventListener('DOMContentLoaded', function() {
    createAudioPlayer();
    initializePlayer();
    initializeCards();
    initializeNavigation();
    initializeSearch();
    initializeLikeButton();
});


function createAudioPlayer() {
    audioPlayer = new Audio();
    audioPlayer.addEventListener('timeupdate', updatePlayerTime);
    audioPlayer.addEventListener('ended', handleTrackEnd);
    audioPlayer.addEventListener('loadedmetadata', updateTrackDuration);
}

function updatePlayerTime() {
    if (duration > 0) {
        currentTime = audioPlayer.currentTime;
        const progressPercent = (currentTime / duration) * 100;
        document.querySelector('.progress-bar').value = progressPercent;
        document.querySelector('.curr-time').textContent = formatTime(currentTime);
    }
}

function updateTrackDuration() {
    duration = audioPlayer.duration;
    document.querySelector('.tot-time').textContent = formatTime(duration);
}

function handleTrackEnd() {
    nextTrack();
}


let isPlaying = false;
let currentTime = 0;
let duration = 210; 
let volume = 70;
let repeatMode = 0; 

const playlist = [
    {
        title: 'Janam Janam',
        artist: 'Shah Rukh Khan, Kajol',
        duration: 0,
        image: 'images/card1img.jpeg',
        file: 'songs/@Janam_Janam_–_Dilwale___Shah_Rukh_Khan___Kajol___Pritam___SRK___Kajol___Lyri.mp3'
    },
    {
        title: 'Har Kisi Ko Nahi Milta',
        artist: 'Akshay Kumar',
        duration: 0,
        image: 'images/card2img.jpeg',
        file: 'songs/_Har_Kisi_Ko_Nahi_Milta_Yahan_Pyaar_Zindagi_Mein__Boss_Video_Song___Akshay_K.mp3'
    },
    {
        title: 'Kabira',
        artist: 'Ranbir Kapoor, Deepika Padukone',
        duration: 0,
        image: 'images/card3img.jpeg',
        file: 'songs/_Kabira_Full_Song__Yeh_Jawaani_Hai_Deewani___Pritam___Ranbir_Kapoor%2C_Deepika_Padukone(48k).mp3'
    },
    {
        title: 'Milne Hai Mujhse',
        artist: 'Aditya Roy Kapur, Shraddha Kapoor',
        duration: 0,
        image: 'images/card4img.jpeg',
        file: 'songs/_Milne_Hai_Mujhse_Aayi_Aashiqui_2__Full_Video_Song___Aditya_Roy_Kapur%2C_Shraddha_Kapoor(256k) - Copy (2) - Copy.mp3'
    },
    {
        title: 'Nashe Si Chadh Gayi',
        artist: 'Ukraine School Series',
        duration: 0,
        image: 'images/card5img.jpeg',
        file: 'songs/_nashe_si_chadh_gayi____ukraine_school_series___nashe_si_chadh_gayi_song___juba_pe_chad_gayi_oye_kudi(256k) - Copy - Copy.mp3'
    },
    {
        title: 'Soch',
        artist: 'Hardy Sandhu',
        duration: 0,
        image: 'images/card6img.jpeg',
        file: 'songs/_Soch_Hardy_Sandhu__Full_Video_Song___Romantic_Punjabi_Song_2013(256k).mp3'
    }
];

let currentTrackIndex = 0;

function initializePlayer() {
    loadTrack(currentTrackIndex);
    
    // Play/Pause button
    const playPauseBtn = document.querySelector('.play-pause-btn');
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', togglePlayPause);
    }

    // Previous button
    const prevBtn = document.querySelectorAll('.player-btn')[1];
    if (prevBtn) {
        prevBtn.addEventListener('click', previousTrack);
    }

    // Next button
    const nextBtn = document.querySelectorAll('.player-btn')[3];
    if (nextBtn) {
        nextBtn.addEventListener('click', nextTrack);
    }

    // Progress bar
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.addEventListener('change', seekTrack);
        progressBar.addEventListener('input', updateProgressBar);
    }

    // Volume control
    const volumeSlider = document.querySelector('.volume-slider');
    if (volumeSlider) {
        volumeSlider.addEventListener('change', changeVolume);
        volumeSlider.addEventListener('input', updateVolume);
    }

    // Shuffle button
    const shuffleBtn = document.querySelectorAll('.player-btn')[0];
    if (shuffleBtn) {
        shuffleBtn.addEventListener('click', toggleShuffle);
    }

    // Repeat button
    const repeatBtn = document.querySelectorAll('.player-btn')[4];
    if (repeatBtn) {
        repeatBtn.addEventListener('click', toggleRepeat);
    }
}

function togglePlayPause() {
    const playPauseBtn = document.querySelector('.play-pause-btn');
    const icon = playPauseBtn.querySelector('i');

    isPlaying = !isPlaying;

    if (isPlaying) {
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
        playPauseBtn.style.backgroundColor = '#1ed760';
        audioPlayer.play();
    } else {
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
        playPauseBtn.style.backgroundColor = '#1db954';
        audioPlayer.pause();
    }

    showToast(isPlaying ? '▶ Playing' : '⏸ Paused');
}

function previousTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) {
        audioPlayer.play();
    }
    showToast(`⏮ ${playlist[currentTrackIndex].title}`);
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) {
        audioPlayer.play();
    }
    showToast(`⏭ ${playlist[currentTrackIndex].title}`);
}

function loadTrack(index) {
    const track = playlist[index];
    
    document.getElementById('song-title').textContent = track.title;
    document.getElementById('artist-name').textContent = track.artist;
    document.querySelector('.imagealbum').src = track.image;
    
    audioPlayer.src = track.file;
    audioPlayer.load();
    
    duration = 0;
    currentTime = 0;
    document.querySelector('.progress-bar').value = 0;
    document.querySelector('.curr-time').textContent = '00:00';
    document.querySelector('.tot-time').textContent = '00:00';
}

function seekTrack(e) {
    if (duration > 0) {
        const seekPercent = (e.target.value / 100);
        audioPlayer.currentTime = seekPercent * duration;
        currentTime = audioPlayer.currentTime;
        document.querySelector('.curr-time').textContent = formatTime(currentTime);
    }
}

function updateProgressBar(e) {
    const progressPercent = (e.target.value / 100) * duration;
    document.querySelector('.curr-time').textContent = formatTime(progressPercent);
}

function changeVolume(e) {
    volume = e.target.value;
    audioPlayer.volume = volume / 100;
    updateVolumeIcon();
}

function updateVolume(e) {
    volume = e.target.value;
    audioPlayer.volume = volume / 100;
}

function updateVolumeIcon() {
    const volumeIcon = document.querySelector('.volume-control i');
    if (volume == 0) {
        volumeIcon.classList.remove('fa-volume-high');
        volumeIcon.classList.add('fa-volume-xmark');
    } else if (volume < 50) {
        volumeIcon.classList.remove('fa-volume-xmark', 'fa-volume-high');
        volumeIcon.classList.add('fa-volume-low');
    } else {
        volumeIcon.classList.remove('fa-volume-xmark', 'fa-volume-low');
        volumeIcon.classList.add('fa-volume-high');
    }
}

function toggleShuffle() {
    const btn = document.querySelectorAll('.player-btn')[0];
    btn.style.color = btn.style.color === 'rgb(29, 185, 84)' ? '#b3b3b3' : '#1db954';
    showToast(btn.style.color === 'rgb(29, 185, 84)' ? '🔀 Shuffle ON' : '🔀 Shuffle OFF');
}

function toggleRepeat() {
    const btn = document.querySelectorAll('.player-btn')[4];
    const states = ['🔁 Repeat OFF', '🔁 Repeat ONE', '🔁 Repeat ALL'];
    
    repeatMode = (repeatMode + 1) % 3;
    btn.dataset.repeatState = repeatMode;

    if (repeatMode === 0) {
        btn.style.color = '#b3b3b3';
    } else {
        btn.style.color = '#1db954';
    }
    showToast(states[repeatMode]);
}

function handleRepeatMode() {
    if (repeatMode === 0) {
        nextTrack();
    } else if (repeatMode === 1) {
        audioPlayer.currentTime = 0;
        audioPlayer.play();
    } else if (repeatMode === 2) {
        nextTrack();
    }
}

function simulatePlayback() {
   
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}


function initializeCards() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach((card, index) => {
        const playButton = card.querySelector('.card-play-button');
        if (playButton) {
            playButton.addEventListener('click', function(e) {
                e.stopPropagation();
                const title = card.querySelector('.card-title').textContent;
                playPlaylist(title, index);
            });
        }

        card.addEventListener('click', function() {
            showToast(`📂 Opening ${card.querySelector('.card-title').textContent}`);
        });
    });
}

function playPlaylist(playlistName, index) {
    currentTrackIndex = index % playlist.length;
    loadTrack(currentTrackIndex);
    
    isPlaying = true;
    const playPauseBtn = document.querySelector('.play-pause-btn');
    const icon = playPauseBtn.querySelector('i');
    
    icon.classList.remove('fa-play');
    icon.classList.add('fa-pause');
    playPauseBtn.style.backgroundColor = '#1ed760';
    
    audioPlayer.play();

    showToast(`▶ Now playing: ${playlistName}`);
}


function initializeLikeButton() {
    const likeBtn = document.getElementById('like-btn');
    if (likeBtn) {
        likeBtn.addEventListener('click', function() {
            const isLiked = this.classList.contains('liked');
            if (isLiked) {
                this.classList.remove('liked');
                this.style.color = '#b3b3b3';
                showToast('Removed from Liked Songs');
            } else {
                this.classList.add('liked');
                this.style.color = '#1db954';
                showToast(' Added to Liked Songs');
            }
        });
    }
}


function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-option a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            handleNavigation(href);
        });
    });

    const explorePremiumBtn = document.querySelector('.badge.nav-item');
    if (explorePremiumBtn) {
        explorePremiumBtn.addEventListener('click', function() {
            showToast('🎵 Explore Premium - Coming Soon!');
        });
    }

    const installAppBtn = document.querySelector('.dark-badge');
    if (installAppBtn) {
        installAppBtn.addEventListener('click', function() {
            showToast('📲 Installing App...');
        });
    }

    const userIcon = document.querySelector('.sticky-nav-option i');
    if (userIcon) {
        userIcon.addEventListener('click', function() {
            showToast('👤 User Profile - Coming Soon!');
        });
    }
}

function handleNavigation(href) {
    const page = href.substring(1);
    
    switch(page) {
        case 'home':
            showToast('🏠 Loading Home...');
            break;
        case 'search':
            showToast('🔍 Opening Search...');
            openSearch();
            break;
        case 'playlists':
            showToast('📂 Opening Playlists...');
            break;
        case 'liked':
            showToast('❤️ Opening Liked Songs...');
            break;
        default:
            showToast('Loading...');
    }
}


function initializeSearch() {
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            openSearch();
        }
    });
}

function openSearch() {
    const searchInput = prompt('🔍 Search for songs, artists, or playlists:', '');
    if (searchInput) {
        showToast(`🔍 Searching for "${searchInput}"...`);
        setTimeout(() => {
            showToast(`Found ${Math.floor(Math.random() * 50) + 1} results for "${searchInput}"`);
        }, 1000);
    }
}


function showToast(message) {
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 120px;
        right: 20px;
        background-color: #1db954;
        color: #000;
        padding: 12px 24px;
        border-radius: 24px;
        font-weight: 600;
        font-size: 14px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .liked {
        color: #1db954 !important;
    }

    /* Smooth transitions */
    * {
        transition: color 0.2s ease;
    }

    /* Active states for buttons */
    .player-btn:active,
    .control-btn:active {
        transform: scale(0.95);
    }
`;
document.head.appendChild(style);


const createPlaylistBtn = Array.from(document.querySelectorAll('.badge'))
    .find(btn => btn.textContent.includes('Create playlist'));

if (createPlaylistBtn) {
    createPlaylistBtn.addEventListener('click', function() {
        const playlistName = prompt('Enter playlist name:', 'My Playlist');
        if (playlistName) {
            showToast(`✅ Created playlist "${playlistName}"`);
        }
    });
}

const browsePodcastsBtn = Array.from(document.querySelectorAll('.badge'))
    .find(btn => btn.textContent.includes('Browse podcasts'));

if (browsePodcastsBtn) {
    browsePodcastsBtn.addEventListener('click', function() {
        showToast('🎙️ Browsing Podcasts...');
    });
}


document.addEventListener('keydown', function(e) {
    if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        document.querySelector('.play-pause-btn').click();
    }

    if (e.key === 'ArrowRight') {
        document.querySelectorAll('.player-btn')[3].click(); // Next
    }
    if (e.key === 'ArrowLeft') {
        document.querySelectorAll('.player-btn')[1].click(); // Previous
    }
});


window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
        document.body.style.fontSize = '14px';
    } else {
        document.body.style.fontSize = '16px';
    }
});


console.log('%c🎵 Spotify Clone Initialized! ', 'background: #1db954; color: #000; font-weight: bold; padding: 10px;');
console.log('%cUse Keyboard Shortcuts:', 'font-weight: bold;');
console.log('Space - Play/Pause | Arrow Keys - Next/Previous | Ctrl+K - Search');
