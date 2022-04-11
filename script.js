const keys = document.querySelectorAll('.key');

const startPlaying = key => {
    key.querySelector('audio').play();
    key.classList.add('key_played');
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


  