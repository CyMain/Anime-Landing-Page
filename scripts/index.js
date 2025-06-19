import {animes, charas} from './data.js';

let light = true;
let currChar = 1;

charAction(currChar);

document.querySelector('.toggle-mode').addEventListener('click', ()=>{
    //mode button
    toggleMode();
})

function charAction(currCharInd){
    let char;
    charas.find(chara =>{
        if(chara.id == currCharInd){
            char = chara;
            console.log(chara);
        }
    })
    setInterval(()=>{
        char.charIMGs.forEach((imgURL, index) =>{
            if(index !== 0){
                setTimeout(()=>{
                    changeCharIMG(imgURL);
                    console.log(`changed to ${imgURL}`);
                }, 4000)
            }
        })
    }, 12000)
}

function changeCharIMG(nextCharImg){
    let imgTag = document.querySelector('.char-img-js');
    imgTag.style.animation ="fade-slide-away-left 1s ease-in-out forwards";
    setTimeout(()=>{
        imgTag.src = nextCharImg;
        imgTag.style.animation ="fade-slide-left 1s ease-in-out forwards";
    },1000);
}

function toggleMode(){
    if(light){
        document.body.classList.add('dark-mode');
        light = false;
    } else{
        document.body.classList.remove('dark-mode');
        light = true;
    }
}

//Make characters of an anime change periodically.
//And make the colors change too(CSS)
//Error: from line 21. Code runs all at once after 4 seconds instead of once every 4 seconds