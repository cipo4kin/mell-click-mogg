/* =========================================================
   LOOKSMAX CLICKER
   YANDEX GAMES SDK
========================================================= */


/* =========================================================
   СОСТОЯНИЕ SDK
========================================================= */

let ysdk = null;

let yandexReady = false;

let gameLanguage = "ru";
let adButton = null;
let adStatus = null;
let adBonus = null;


/* =========================================================
   ЛОКАЛЬНЫЙ РЕЖИМ
========================================================= */

function isLocalMode(){

    return (
        location.protocol === "file:" ||
        location.hostname === "localhost"
    );

}


/* =========================================================
   ЯЗЫК ИГРЫ
========================================================= */

function detectLanguage(){

    if(
        ysdk &&
        ysdk.environment &&
        ysdk.environment.i18n
    ){

        gameLanguage =
            ysdk.environment.i18n.lang;

    }

    console.log(
        "Язык игры:",
        gameLanguage
    );

}


/* =========================================================
   ИНИЦИАЛИЗАЦИЯ YANDEX SDK
========================================================= */

async function initYandexSDK(){

    try{

        if(
            typeof YaGames === "undefined"
        ){

            console.warn(
                "Yandex SDK не найден. Локальный режим."
            );

            return false;

        }

        ysdk =
            await YaGames.init();

        detectLanguage();

        yandexReady = true;

        console.log(
            "Yandex Games SDK подключен"
        );

        return true;

    }
    catch(error){

        console.error(
            "Ошибка Yandex SDK:",
            error
        );

        return false;

    }

}


/* =========================================================
   REWARDED VIDEO
========================================================= */


async function showRewardedAd(){

    if(
        Date.now() < adCooldownUntil
    ){

        updateAdCooldown();

        return;

    }


    /* =========================
       ЛОКАЛЬНЫЙ ТЕСТ
    ========================= */

    if(
        !yandexReady ||
        !ysdk
    ){

        if(
            !isLocalMode()
        ){

            if(adStatus){

                adStatus.textContent =
                    "Реклама недоступна.";

            }

            return;

        }


        if(adButton){

            adButton.disabled =
                true;

        }


        if(adStatus){

            adStatus.textContent =
                "Тестовый бонус...";

        }


        pauseGameMusic();

setTimeout(()=>{

    giveAdBonus();

    updateAdCooldown();

    resumeGameMusic();

},500);

        return;

    }


    /* =========================
       НАСТОЯЩАЯ РЕКЛАМА
    ========================= */

    try{

        if(adButton){

            adButton.disabled =
                true;

        }


        if(adStatus){

            adStatus.textContent =
                "Загрузка рекламы...";

        }


        ysdk.adv.showRewardedVideo({

            callbacks:{

                onOpen:()=>{

                    console.log(
                        "Реклама открыта"
                    );

                    pauseGameMusic();


                    if(adStatus){

                        adStatus.textContent =
                            "Смотрите рекламу...";

                    }

                },


                onRewarded:()=>{

                    console.log(
                        "Награда получена"
                    );

                    giveAdBonus();

                },


                onClose:()=>{

                    console.log(
                        "Реклама закрыта"
                    );

                    resumeGameMusic();

                    updateAdCooldown();

                },


                onError:(error)=>{

                    console.error(
                        "Ошибка рекламы:",
                        error
                    );

                    resumeGameMusic();


                    if(adButton){

                        adButton.disabled =
                            false;

                    }


                    if(adStatus){

                        adStatus.textContent =
                            "Реклама недоступна.";

                    }

                }

            }

        });

    }
    catch(error){

        console.error(
            "Ошибка показа рекламы:",
            error
        );

        resumeGameMusic();


        if(adButton){

            adButton.disabled =
                false;

        }


        if(adStatus){

            adStatus.textContent =
                "Ошибка рекламы.";

        }

    }

}


/* =========================================================
   ТАЙМЕР КД РЕКЛАМЫ
========================================================= */

function updateAdCooldown(){

    if(!adButton)
        return;


    const remaining =
        Math.max(
            0,
            adCooldownUntil - Date.now()
        );


    if(remaining <= 0){

        adButton.disabled =
            false;


        if(adStatus){

            adStatus.textContent =
                "";

        }

        return;

    }


    adButton.disabled =
        true;


    const totalSeconds =
        Math.ceil(
            remaining / 1000
        );


    const minutes =
        Math.floor(
            totalSeconds / 60
        );


    const seconds =
        totalSeconds % 60;


    if(adStatus){

        adStatus.textContent =
            `⏱️ Реклама через ${minutes}:${String(seconds).padStart(2,"0")}`;

    }

}


/* =========================================================
   ОБНОВЛЕНИЕ ТАЙМЕРА
========================================================= */

setInterval(
    updateAdCooldown,
    1000
);

/* =========================================================
   КНОПКА РЕКЛАМЫ
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    adButton = document.getElementById("adButton");
    adStatus = document.getElementById("adStatus");
    adBonus = document.getElementById("adBonus");

    if (!adButton) {
        console.error("❌ adButton не найден");
        return;
    }

    console.log("✅ Кнопка рекламы подключена");

    adButton.addEventListener(
        "click",
        showRewardedAd
    );

    updateAdCooldown();

});