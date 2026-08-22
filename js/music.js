/* =========================================================
   LOOKSMAX CLICKER
   MUSIC SYSTEM
========================================================= */


const Music = {


    tracks: [

        "assets/music/music1.mp3",
        "assets/music/music2.mp3",
        "assets/music/music3.mp3",
        "assets/music/music4.mp3",
        "assets/music/music5.mp3"

    ],


    current: 0,


    enabled: false,


    player: new Audio(),




    init(){


        this.player.volume = 0.07;



        this.player.addEventListener(
            "ended",
            () => {

                this.next();

            }
        );




        const button =
            document.getElementById("musicButton");



        if(button){


            button.addEventListener(
                "click",
                () => {

                    this.toggle();

                }
            );


        }


    },







    /* =========================
       ЗАПУСК МУЗЫКИ
    ========================= */


    play(){


        if(!this.enabled)
            return;



        this.player.play()
        .catch(
            () => {

                console.log(
                    "Браузер ждёт взаимодействия"
                );

            }
        );


    },








    /* =========================
       СЛЕДУЮЩИЙ ТРЕК
    ========================= */


    next(){


        this.current++;



        if(
            this.current >= this.tracks.length
        ){

            this.current = 0;

        }




        this.player.src =
            this.tracks[this.current];



        console.log(
            "Следующий трек:",
            this.tracks[this.current]
        );



        this.player.play()
        .catch(
            () => {}
        );


    },








    /* =========================
       ВКЛ / ВЫКЛ
    ========================= */


    toggle(){


        this.enabled =
            !this.enabled;




        const button =
            document.getElementById("musicButton");




        if(!this.enabled){



            this.player.pause();



            if(button){

                button.innerHTML =
                    "🔊 ВКЛ МУЗЫКУ";

            }


        }

        else{


            /*
                Первый запуск:
                выбираем первый трек
            */


            if(
                !this.player.src
            ){

                this.player.src =
                    this.tracks[this.current];

            }



            this.play();




            if(button){

                button.innerHTML =
                    "🔇 ВЫКЛ МУЗЫКУ";

            }


        }


    }


};




Music.init();

/* =========================================================
   ПАУЗА МУЗЫКИ НА ВРЕМЯ РЕКЛАМЫ
========================================================= */

function pauseGameMusic(){

    if(
        Music.enabled &&
        !Music.player.paused
    ){

        Music.player.pause();

    }

}


/* =========================================================
   ВОЗОБНОВЛЕНИЕ МУЗЫКИ ПОСЛЕ РЕКЛАМЫ
========================================================= */

function resumeGameMusic(){

    if(
        Music.enabled &&
        Music.player.paused
    ){

        Music.player.play()
        .catch(
            ()=>{}
        );

    }

}