/* =========================================================
   LOOKSMAX CLICKER
   MAIN
========================================================= */


/* =========================================================
   DOM
========================================================= */

const resetButton =
    document.getElementById(
        "resetButton"
    );



/* =========================================================
   CLICK
========================================================= */

if(clickButton){

    clickButton.addEventListener(
        "click",
        handleClick
    );

}



/* =========================================================
   BLACKPILL
========================================================= */

if(blackpillButton){

    blackpillButton.addEventListener(
        "click",
        prestige
    );

}



/* =========================================================
   RESET
========================================================= */

if(resetButton){

    resetButton.addEventListener(
        "click",
        ()=>{

            const confirmReset =
                confirm(

`⚠️ СБРОС ПРОГРЕССА


Ты потеряешь:

- все очки могга
- покупки магазина
- текущий ранг
- BLACKPILL


Начать заново?`

                );


            if(!confirmReset)
                return;


            // Удаляем старое сохранение

            localStorage.removeItem(
                SAVE_KEY
            );


            // Полностью сбрасываем состояние

            resetGameState();


            // Обновляем интерфейс

            updateUI();


            console.log(
                "Прогресс полностью сброшен."
            );

        }
    );

}



/* =========================================================
   START GAME
========================================================= */

async function startGame(){

    console.log(
        "Looksmax Clicker запускается..."
    );


    // Создаём магазин

    createShop();


    // Загружаем сохранение

    loadGame();


    // Проверяем ранг

    checkRank();


    // Обновляем интерфейс

    updateUI();


    // Пассивный доход

    setInterval(
        passiveIncome,
        1000
    );


    // Яндекс SDK

    await initYandexSDK();


    console.log(
        "Looksmax Clicker готов."
    );

}



/* =========================================================
   RUN
========================================================= */

startGame();