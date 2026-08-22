 /* =========================================================
   LOOKSMAX CLICKER
   SOUNDS SYSTEM
========================================================= */


/* =========================================================
   СОСТОЯНИЕ
========================================================= */

let soundsEnabled = true;




/* =========================================================
   ЗВУКИ
========================================================= */

const sounds = {


    click:
        new Audio(
            "assets/sounds/click.wav"
        ),


    purchase:
        new Audio(
            "assets/sounds/buy.mp3"
        ),


    bonus:
        new Audio(
            "assets/sounds/bonus.mp3"
        ),


    mogged:
        new Audio(
            "assets/sounds/mogged.mp3"
        ),


    prestige:
        new Audio(
            "assets/sounds/rebirth.mp3"
        )


};





/* =========================================================
   ГРОМКОСТЬ
========================================================= */

const soundVolume = {


    click:0.15,

    purchase:0.20,

    bonus:0.25,

    mogged:0.35,

    prestige:0.30


};





/* =========================================================
   НАСТРОЙКА
========================================================= */

Object.keys(sounds)
.forEach(
(name)=>{


    sounds[name].volume =
        soundVolume[name];


    sounds[name].preload =
        "auto";


});





/* =========================================================
   ОСНОВНОЕ ВОСПРОИЗВЕДЕНИЕ
========================================================= */

function playSound(name){


    if(!soundsEnabled){

        return;

    }



    const sound =
        sounds[name];



    if(!sound){

        console.warn(
            "Нет звука:",
            name
        );

        return;

    }



    sound.pause();

    sound.currentTime = 0;



    sound.play()
    .catch(
        ()=>{}
    );


}





/* =========================================================
   ОТДЕЛЬНЫЕ ЗВУКИ
========================================================= */


function playClickSound(){

    playSound(
        "click"
    );

}



function playPurchaseSound(){

    playSound(
        "purchase"
    );

}



function playBonusSound(){

    playSound(
        "bonus"
    );

}



function playMoggedSound(){

    playSound(
        "mogged"
    );

}



function playPrestigeSound(){

    playSound(
        "prestige"
    );

}





/* =========================================================
   ПЕРЕКЛЮЧЕНИЕ
========================================================= */

function toggleSounds(){


    soundsEnabled =
        !soundsEnabled;



    if(!soundsEnabled){


        Object.values(sounds)
        .forEach(
            sound=>{


                sound.pause();


            }
        );


    }


}