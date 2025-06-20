import {animes, charas} from './data.js';

let light = true;
let currChar = 1;
let timeouts = [];
let intervals = [];

siteInitializer();


function siteInitializer(animeInd, charInd){
    //requires index of anime in animes and index of character in its parent anime array.
    clearAllTimeoutsAndIntervals();
    console.log(animeInd, charInd);
    let startAnime = (animeInd ? animes[animeInd] : animes[0]);
    console.log(startAnime);
    const animeNameTag = document.querySelector('.anime-name');
    const charName = document.querySelector('.char-name');
    const charDesc = document.querySelector('.char-desc');
    const charIMG = document.querySelector('.char-img-js');
    animeNameTag.textContent = startAnime.name;
    dropdownGenerator(startAnime.id);
    charas.find(chara =>{
        //Charind is touching the wrong thing. We're meant to get the index in anime.chars. not charas
        if(chara.id == (charInd ? startAnime.chars[charInd] : startAnime.chars[0])){
            charName.textContent = chara.name;
            charDesc.textContent = chara.desc;
            charIMG.src = chara.charIMGs[0];
            modeHandler(chara.modeName);
            charAction(chara.id);
            charIMG.style.animation = "fade-slide-up 1s ease-in-out";
        }
    });
}

function dropdownGenerator(animeID){
    console.log('dgenerator active');
    console.log(animeID);
    const animesListTag = document.querySelector('.animes-list-js');
    const charsListTag = document.querySelector('.chars-list-js');
    let charsListHTML = ``;
    let animeListHTML = ``;
    animes.forEach((anime, index)=>{
        animeListHTML += `
            <li class="select-list-item">
                <a href="#" data-anime-ind="${index}" class="select-link anime-link">${anime.name}
                </a>
            </li>
        `;
    })
    if(animeID){
        animes.find((anime, aindex)=>{
            if(anime.id == animeID){
                anime.chars.forEach(charID=>{
                    charas.find(chara=>{
                        if(chara.id == charID){
                            let cindex;
                            anime.chars.find((id, ind)=>{
                                if(chara.id == id){
                                    cindex = ind;
                                    console.log(`cindex of ${chara.name} in animes.char is ${cindex}`);
                                    //cindex is now the index in animes.char
                                }
                            })
                            console.log(`found, ${chara}, ${chara.name}, ${cindex}`);
                            charsListHTML += `
                                <li class="select-list-item"><a href="#" data-anime-ind="${aindex}" data-char-ind="${cindex}" class="select-link char-link">${chara.name}</a></li>
                            `;
                        } 
                    })
                })
            }
        })
    }
    animesListTag.innerHTML = animeListHTML;
    charsListTag.innerHTML = charsListHTML;
    document.querySelectorAll('.char-link').forEach(link=>{
        link.addEventListener('click', (e)=>{
            console.log('char clicked');
            siteInitializer(e.target.dataset.animeInd, e.target.dataset.charInd);
        });
    })
    document.querySelectorAll('.anime-link').forEach(link=>{
        link.addEventListener('click', (e)=>{
            console.log('anime clicked.');
            siteInitializer(e.target.dataset.animeInd);
        });
    })
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
        }
    })
    imgsLength = char.charIMGs.length;
    let intervalID = setInterval(()=>{
        if(currIndex == imgsLength){
            currIndex = 0;
        }
        changeCharIMG(char.charIMGs[currIndex]);
        currIndex+=1;
    }, 6000);
    intervals.push(intervalID);
}

function changeCharIMG(nextCharImg){
    let imgTag = document.querySelector('.char-img-js');
    imgTag.style.animation ="fade-slide-away-left 1s ease-in-out forwards";
    let timeoutID = setTimeout(()=>{
        imgTag.src = nextCharImg;
        imgTag.style.animation ="fade-slide-left 1s ease-in-out forwards";
    },2000);
    timeouts.push(timeoutID);
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

function clearAllTimeoutsAndIntervals(){
    timeouts.forEach(timeout =>{
        clearTimeout(timeout);
    })

    intervals.forEach(interval=>{
        clearInterval(interval);
    })
}

//Make characters of an anime change periodically.
//And make the colors change too(CSS)

//Fixed Errors:
//Error: from line 21. Code runs all at once after 4 seconds instead of once every 4 seconds
//Interval timer issue