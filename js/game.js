/* =========================================================
   LOOKSMAX CLICKER
   GAME LOGIC
========================================================= */


/* =========================================================
   DOM
========================================================= */


const characterElement =
    document.getElementById("character");





/* =========================================================
   CLICK
========================================================= */


function handleClick(event){


    let gained =
        clickPower *
        prestigeMultiplier;



    if(
        isNaN(gained) ||
        gained <= 0
    ){

        gained = 1;

    }




    looks += gained;




    playClickSound();





    if(event){


        createFloatingBonus(
            gained,
            event.clientX,
            event.clientY
        );


    }





    tryClickBonus(
        event?.clientX ?? window.innerWidth / 2,
        event?.clientY ?? window.innerHeight / 2
    );





    playClickAnimation();



    checkRank();



    updateUI();


}





/* =========================================================
   BUY ITEM
========================================================= */


function buyItem(
    button,
    index
){


    const item =
        shopItems[index];



    if(
        !item ||
        item.bought
    )
        return;





    if(
        looks < item.cost
    )
        return;






    looks -= item.cost;





    looksPerSecond +=
        Number(item.income) || 0;






    item.bought = true;






    playPurchaseSound();






    if(button){



        button.classList.add(
            "purchase-effect"
        );



        setTimeout(()=>{


            button.classList.remove(
                "purchase-effect"
            );


        },300);



    }






    updateUI();



    saveGame();


}







/* =========================================================
   PASSIVE INCOME
========================================================= */


function passiveIncome(){



    let income =
        looksPerSecond *
        prestigeMultiplier;





    if(
        isNaN(income)
    ){

        income = 0;

    }





    looks += income;





    checkRank();



    updateUI();


}








/* =========================================================
   BLACKPILL
========================================================= */


function prestige(){



    const currentRank =
        characters[characterIndex]?.rank;




    if(
        currentRank !== "TRUE MOGGER"
    )
        return;






    const nextMultiplier =
        prestigeMultiplier * 2;






    const confirmPrestige =
        confirm(

`☠ BLACKPILL

Ты потеряешь:

- все очки могга
- покупки магазина

Но получишь:

×${nextMultiplier} к заработку навсегда.

Продолжить?`

        );





    if(!confirmPrestige)
        return;






    playPrestigeSound();






    looks = 0;


    characterIndex = 0;


    looksPerSecond = 1;


    clickPower = 1;






    shopItems.forEach(
        item=>{


            item.bought = false;


        }
    );






    prestigeMultiplier =
        nextMultiplier;






    prestigeCount++;








    if(characterElement){



        characterElement.classList.remove(
            "prestige-reset"
        );



        void characterElement.offsetWidth;



        characterElement.classList.add(
            "prestige-reset"
        );



        setTimeout(()=>{


            characterElement.classList.remove(
                "prestige-reset"
            );


        },1000);



    }






    updateUI();



    saveGame();


}







