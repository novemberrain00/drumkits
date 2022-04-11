const keys = document.querySelectorAll('.key');

const startPlaying = key => {
    const audio = key.querySelector('audio');
    if(audio.ended) {
        audio.play();
        key.classList.add('key_played');
    } else {
        audio.currentTime = 0;
        audio.pause();
        audio.play();
    }
}

const endPlaying = key => {
    key.classList.remove('key_played');
}

document.addEventListener('keydown', e => {
    keys.forEach(key => {
        if(key.querySelector('.key__name').getAttribute('data-key') == e.which) {
            startPlaying(key);
        };
    });
});

document.addEventListener('keyup', e => {
    keys.forEach(key => {
        if(key.querySelector('.key__name').getAttribute('data-key') == e.which) {
            endPlaying(key);
        };
    });
});

keys.forEach(key => {
    key.addEventListener('mousedown', ()=>{
        startPlaying(key);
    });
});

keys.forEach(key => {
    key.addEventListener('mouseup', ()=>{
        endPlaying(key);
    });
});


  