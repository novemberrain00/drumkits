const triggers = []

class Button {
    constructor(elem, callback) {
        this.elem = elem;
        this.callback = callback;

        this.elem.addEventListener('click', () => this.callback())
    }
}

class Trigger {
    constructor(sound, posY, posX) {
        this.sound = sound;
        this.posX = posX;
        this.posY = posY;
        this.block = document.createElement('div');

        this.block.classList.add('metr__trigger');
    }

    render() {
        const { sound, block, posX, posY } = this;

        block.style.left = posX + 'px';
        block.style.top = posY + 'px';
        document.body.append(block);
        sound.play();

        triggers.push({
            posX,
            sound
        })

        console.log(triggers)

        block.addEventListener('click', () => {
            sound.play();
        });
    }
}

const metronomBtn = new Button(document.querySelector('#metr-btn'), () => {
    document.querySelector('#metronom').classList.remove('modal_closed');
});

document.querySelectorAll('.modal__closer').forEach((closer, i) => {
    closer.addEventListener('click', () => {
        document.querySelectorAll('.modal')[i].classList.add('modal_closed');
    });
});

document.querySelectorAll('.metr__line').forEach((line, i) => {
    const sound = document.querySelectorAll('.metr__road audio')[i];
    line.addEventListener('click', e => {
        new Trigger(sound, e.pageY, e.pageX).render();
    }) 
})

const metronomPlayBtn = document.querySelector('#metr-play'),
    metronomSpeed = +document.querySelector('.metr__speed').value;

metronomPlayBtn.addEventListener('click', () => {
    const endPos = parseInt(window.getComputedStyle(document.querySelector('.metr')).width),
        parser = document.querySelector('.metr__parser');
    let startPos = parseInt(window.getComputedStyle(parser).left);

    parser.style.left = '50px';

    const t = setInterval(() => {
        if(startPos < endPos - 2) {
            startPos++;
            parser.style.left = startPos + 'px';

            triggers.forEach(({posX, sound}) => {
                if(posX === parser.getBoundingClientRect().x) {
                    sound.play();
                }
            });

        } else {
            clearInterval(t);
        }
    }, metronomSpeed);

});













//старое, пока не трогать
const keys = document.querySelectorAll('.key');
let audioPlayed = false;

const startPlaying = (key, e) => {
    const audio = key.querySelector('audio');
    
    if(audioPlayed) return;

    if(audio.ended) {
        audio.play();
        key.classList.add('key_played');
    } else {
        key.classList.add('key_played');
        audio.currentTime = 0;
        audio.pause();
        audio.play();
    }

    audioPlayed = true;
    

}

const endPlaying = key => {
    key.classList.remove('key_played');
    audioPlayed = false;
}

document.addEventListener('keydown', e => {
    keys.forEach(key => {
        if(key.querySelector('.key__name').getAttribute('data-key') == e.which) {
            startPlaying(key, e);
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


  