import {animes, charas} from '/scripts/data.js';

let light = true;
let currChar = 1;
let view;
let timeouts = [];
let intervals = [];

siteInitializer();




function siteInitializer(animeInd, charInd){
    if(window.innerWidth < 870.5){
        view = 'small';
    }else{
        view = 'large';
    }
    //requires index of anime in animes and index of character in its parent anime array.
    clearAllTimeoutsAndIntervals();
    let startAnime = (animeInd ? animes[animeInd] : animes[0]);
    const animeNameTag = document.querySelector('.anime-name');
    const charName = document.querySelector('.char-name');
    const charDesc = document.querySelector('.char-desc');
    const charIMG = document.querySelector('.char-img-js');
    animeNameTag.textContent = startAnime.name;
    document.querySelector('.watch-btn').href = startAnime.watchURL;
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
    document.querySelector('.animes-link').onclick = (e)=>{
        dropDown('animes', e.target.dataset.openClose, e.target);
    };
    document.querySelector('.chars-link').onclick = (e)=>{
        dropDown('chars', e.target.dataset.openClose, e.target);
    };
    document.querySelector('.menu-icon').onclick = (e)=>{
        toggleSideBar('open');
    };
    document.querySelector('.close-menu-button').onclick = (e)=>{
        toggleSideBar('close');
    };
    document.querySelector('.dim-screen').onclick = (e)=>{
        toggleSideBar('close');
    };
}

function dropdownGenerator(animeID){
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
                                    //cindex is now the index in animes.char
                                }
                            })
                            charsListHTML += `
                                <li class="select-list-item"><a href="#" data-anime-ind="${aindex}" data-char-ind="${cindex}" data-open-close="open" class="select-link char-link">${chara.name}</a></li>
                            `;
                        } 
                    })
                })
            }
        })
    }
    animesListTag.innerHTML = animeListHTML;
    charsListTag.innerHTML = charsListHTML;
    document.querySelector('.animes-link').dataset.openClose = "open";
    document.querySelector('.chars-link').dataset.openClose = "open";
    
    document.querySelectorAll('.char-link').forEach(link=>{
        link.addEventListener('click', (e)=>{
            siteInitializer(e.target.dataset.animeInd, e.target.dataset.charInd);
            toggleSideBar('close');
        });
    })
    document.querySelectorAll('.anime-link').forEach(link=>{
        link.addEventListener('click', (e)=>{
            siteInitializer(e.target.dataset.animeInd);
            toggleSideBar('close');
        });
    });
    
}
function toggleSideBar(openClose){
    const dimScreen = document.querySelector('.dim-screen');
    const closeButton = document.querySelector('.close-menu');
    if(window.innerWidth < 870.5){
        closeButton.style.display = 'flex';
        dimScreen.style.display = 'flex';
        console.log('small screen ver')
        if(openClose === 'open'){
            console.log('open sidebar');
            const navMenu = document.querySelector('.nav-options');
            dimScreen.style.display = 'flex';
            dimScreen.style.animation = 'fade-slide-right 0.5s ease-in-out forwards';
            closeButton.style.display = 'flex';
            navMenu.style.display = "flex";
            navMenu.style.animation = "fade-slide-right 0.5s ease-in-out forwards";
        } else if(openClose === 'close'){
            console.log('close sidebar.');
            closeButton.style.display = 'none';
            const navMenu = document.querySelector('.nav-options');
            dropDown('char', 'close', document.querySelector('.chars-link'));
            dropDown('animes', 'close', document.querySelector('.animes-link'));
            if(dimScreen.style.display === 'flex'){
                dimScreen.style.animation = 'fade-slide-away-left 0.5s ease-in-out forwards';
            }
            navMenu.style.animation = "fade-slide-away-left 0.5s ease-in-out forwards";
            setTimeout(()=>{
                navMenu.style.display = "none";
                dimScreen.style.display = 'none';
            }, 500);
            
        }
    } else{
        console.log('close sidebar.');
        closeButton.style.display = 'none';
        dropDown('char', 'close', document.querySelector('.chars-link'));
        dropDown('animes', 'close', document.querySelector('.animes-link'));
        dimScreen.style.display = 'none';
        
        console.error("Screen width too large to toggle sidebar.");
        console.error("Close button or menu icon should not available.");
    }
}
function dropDown(type, openClose, target){
    
    if(type === 'animes'){
        if(openClose==='open'){
            target.dataset.openClose = "close";
            const list = document.querySelector('.animes-list-js');
            list.style.display = "flex";
            dropDown('chars', 'close', document.querySelector('.chars-link'));
            document.querySelector('.animes-dd-icon').style.animation = "icon-rotate-down 0.2s ease-in-out forwards";
            setTimeout(() => {
                document.querySelectorAll('.animes-select-link').forEach(link=>{
                    if(window.innerWidth <871){
                        link.style.animation = "none";
                        void link.offsetWidth;
                        link.style.animation = "fade-slide-right 0.5s ease-in-out forwards";
                    }else{
                        link.style.animation = "none";
                        void link.offsetWidth;
                        link.style.animation = "fade-slide-down 0.5s ease-in-out forwards";
                    }
                });
            }, 0);
        } else if(openClose === 'close'){
            target.dataset.openClose = "open";
            document.querySelector('.animes-dd-icon').style.animation = "icon-rotate-up 0.2s ease-in-out forwards";
            setTimeout(()=>{
                document.querySelectorAll('.animes-select-link').forEach(link=>{
                    if(window.innerWidth <871){
                        link.style.animation = "none"; // Remove animation
                        void link.offsetWidth;        
                        link.style.animation = "fade-slide-away-left 0.5s ease-in-out forwards";
                    }else{
                        link.style.animation = "none"; // Remove animation
                        void link.offsetWidth;        
                        link.style.animation = "fade-slide-away-up 0.5s ease-in-out forwards";
                    }
                })
            }, 0);
            
            document.querySelector('.animes-list-js').style.display = "none";
        }   
    } else if(type === 'chars'){
        if (openClose === 'open'){
            target.dataset.openClose = "close";
            document.querySelector('.chars-list-js').style.display = "flex";
            dropDown('animes', 'close', document.querySelector('.animes-link'));
            document.querySelector('.chars-dd-icon').style.animation = "icon-rotate-down 0.2s ease-in-out forwards";
            setTimeout(()=>{
                document.querySelectorAll('.chars-select-link').forEach(link=>{
                    if(window.innerWidth <871){
                        link.style.animation = "none"; // Remove animation
                        void link.offsetWidth;        
                        link.style.animation = "fade-slide-right 0.5s ease-in-out forwards";
                    }else{
                        link.style.animation = "none"; // Remove animation
                        void link.offsetWidth;        
                        link.style.animation = "fade-slide-down 0.5s ease-in-out forwards";
                    }
                });
            }, 0);
            
        } else if(openClose === 'close'){
            target.dataset.openClose = "open";
            document.querySelector('.chars-dd-icon').style.animation = "icon-rotate-up 0.2s ease-in-out forwards";
            document.querySelectorAll('.chars-select-link').forEach(link=>{
                link.style.animation = "none"; // Remove animation
            })
            setTimeout(()=>{
                document.querySelectorAll('.chars-select-link').forEach(link=>{
                    if(window.innerWidth <871){
                        void link.offsetWidth;        
                        link.style.animation = "fade-slide-away-left 0.5s ease-in-out forwards";
                    }else{
                        void link.offsetWidth;        
                        link.style.animation = "fade-slide-away-up 0.5s ease-in-out forwards";
                    }
                })
            }, 0);
            document.querySelector('.chars-list-js').style.display = "none";
        }
    }
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
        if(chara.id === currCharInd){
            char = chara;
        }
    })
    imgsLength = char.charIMGs.length;
    let intervalID = setInterval(()=>{
        if(currIndex >= imgsLength){
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
    },1000);
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
window.addEventListener('resize', () => {
    const navMenu = document.querySelector('.nav-options');
    const dimScreen = document.querySelector('.dim-screen');
    const closeButton = document.querySelector('.close-menu');

    // Detect view change
    const isNowLarge = window.innerWidth > 870.5;
    // Update view state
    view = isNowLarge ? 'large' : 'small';

    if (isNowLarge) {
        // Restore navMenu for desktop
        navMenu.style.display = "flex";
        navMenu.style.animation = "none";
        dimScreen.style.display = "none";
        dimScreen.style.animation = "none";
        closeButton.style.display = "none";
        // Also close any dropdowns
        dropDown('char', 'close', document.querySelector('.chars-link'));
        dropDown('animes', 'close', document.querySelector('.animes-link'));
    } else {
        // Hide navMenu and overlays for mobile
        navMenu.style.display = "none";
        navMenu.style.animation = "none";
        dimScreen.style.display = "none";
        dimScreen.style.animation = "none";
        closeButton.style.display = "none";
        // Also close any dropdowns
        dropDown('char', 'close', document.querySelector('.chars-link'));
        dropDown('animes', 'close', document.querySelector('.animes-link'));
    }
});

function clearAllTimeoutsAndIntervals(){
    timeouts.forEach(timeout =>{
        clearTimeout(timeout);
    })

    intervals.forEach(interval=>{
        clearInterval(interval);
    })
}

//Make watch buttons go to anime site
//Error: if window resized while sidebar is open, it retains the close button.

//Done Tasks:
//Make characters of an anime change periodically.
//And make the colors change too(CSS)

//Fixed Errors:
//Error: from line 21. Code runs all at once after 4 seconds instead of once every 4 seconds
//Interval timer issue