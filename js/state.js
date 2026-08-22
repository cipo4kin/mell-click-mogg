/* =========================================================
   LOOKSMAX CLICKER
   GAME STATE
========================================================= */


/* =========================================================
   ОСНОВНОЕ СОСТОЯНИЕ ИГРЫ
========================================================= */


// Текущие очки могга
let looks = 0;


// Индекс текущего персонажа / ранга
let characterIndex = 0;


// Доход в секунду
let looksPerSecond = 1;


// Сила обычного клика
let clickPower = 1;


// Постоянный множитель после BLACKPILL
let prestigeMultiplier = 1;


// Количество перерождений
let prestigeCount = 0;


// Будущий флаг для разблокировки BLACKPILL
let blackpillUnlocked = false;


// Будущая система уровней магазина
let shopLevels = [];

function resetGameState(){

    looks = 0;

    characterIndex = 0;

    looksPerSecond = 1;

    clickPower = 1;

    prestigeMultiplier = 1;

    prestigeCount = 0;

    blackpillUnlocked = false;

    shopLevels = [];


    shopItems.forEach(item=>{

        item.bought = false;

    });


    saveGame();

    updateUI();

    checkRank();


    console.log("Игра полностью сброшена");

}