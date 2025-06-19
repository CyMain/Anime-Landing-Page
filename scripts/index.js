import {animes, charas} from './data.js';

let light = true;
let currChar = 1;

siteInitializer();


function siteInitializer(animeID, charID){
    let startAnime = (animeID ? animeID : animes[0]);
    const animeNameTag = document.querySelector('.anime-name');
    const charName = document.querySelector('.char-name');
    const charDesc = document.querySelector('.char-desc');
    const charIMG = document.querySelector('.char-img-js');
    animeNameTag.textContent = startAnime.name;
    charas.find(chara =>{
        console.log('looking for chara');
        if(chara.id == (charID? charID : startAnime.chars[0])){
            charName.textContent = chara.name;
            charDesc.textContent = chara.desc
            charIMG.src = chara.charIMGs[0];
            modeHandler(chara.modeName);
            charAction(chara.id);
        }
    });
}

function modeHandler(mode){
    document.body.classList.forEach(cs =>{
        if((cs !== "dark-mode") ||(cs !== mode)){
            document.body.classList.remove(cs);
        }
    })
    document.body.classList.add(mode);
}

document.querySelector('.toggle-mode').addEventListener('click', ()=>{
    //mode button
    toggleMode();
})

function charAction(currCharInd){
    let char;
    let currIndex = 1;
    let imgsLength;
    charas.find(chara =>{
        if(chara.id == currCharInd){
            char = chara;
            console.log(chara);
        }
    })
    imgsLength = char.charIMGs.length;
    setInterval(()=>{
        if(currIndex == imgsLength){
            currIndex = 0;
        }
        changeCharIMG(char.charIMGs[currIndex]);
        currIndex+=1;
    }, 6000);
}

function changeCharIMG(nextCharImg){
    let imgTag = document.querySelector('.char-img-js');
    imgTag.style.animation ="fade-slide-away-left 1s ease-in-out forwards";
    setTimeout(()=>{
        imgTag.src = nextCharImg;
        imgTag.style.animation ="fade-slide-left 1s ease-in-out forwards";
    },2000);
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

//Fixed Errors:
//Error: from line 21. Code runs all at once after 4 seconds instead of once every 4 seconds
//Interval timer issue