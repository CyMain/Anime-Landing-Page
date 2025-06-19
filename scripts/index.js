let light = true;

document.querySelector('.toggle-mode').addEventListener('click', ()=>{
    toggleMode();
})

function toggleMode(){
    if(light){
        document.body.classList.add('dark-mode');
        light = false;
    } else{
        document.body.classList.remove('dark-mode');
        light = true;
    }
}