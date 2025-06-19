import {animes, charas} from './data.js';

let light = true;
let currChar = 1;

document.querySelector('.toggle-mode').addEventListener('click', ()=>{
    toggleMode();
})

function changeChar(){

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