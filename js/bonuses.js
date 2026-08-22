/* =========================================================
   LOOKSMAX CLICKER
   BONUSES SYSTEM
========================================================= */


/* =========================================================
   CLICK BONUS
========================================================= */


function tryClickBonus(
    x,
    y
){


    const random =
        Math.random();



    let chance =
        0;




    for(
        const bonus of clickBonuses
    ){


        chance +=
            bonus.chance;




        if(
            random < chance
        ){



            const value =
                bonus.value *
                prestigeMultiplier;




            looks +=
                value;





            playBonusSound();





            createFloatingBonus(
                value,
                x,
                y,
                `🎁 ${bonus.text}`
            );





            checkRank();



            updateUI();



            saveGame();





            return bonus;


        }


    }





    return null;


}







/* =========================================================
   AD BONUS
========================================================= */


let adCooldownUntil = 0;

const AD_COOLDOWN = 5 * 60 * 1000; // 5 минут
const AD_REWARD_SECONDS = 60;       // 1 минута дохода
const AD_MIN_REWARD = 100;






function giveAdBonus(){

    // Проверяем настоящий КД
    if(Date.now() < adCooldownUntil){
        return;
    }

    // Запускаем КД сразу после получения награды
    adCooldownUntil = Date.now() + AD_COOLDOWN;

    /*
        Награда:
        1 минута текущего пассивного дохода.
        Это масштабируется вместе с прогрессом,
        но не ломает раннюю экономику.
    */

    let bonusValue =
        looksPerSecond *
        prestigeMultiplier *
        AD_REWARD_SECONDS;


    // Минимальная награда
    if(bonusValue < AD_MIN_REWARD){
        bonusValue = AD_MIN_REWARD;
    }


    looks += bonusValue;


    playBonusSound();


    if(adBonus){

        adBonus.textContent =
            `🎁 +${formatNumber(bonusValue)}`;

    }


    if(adStatus){

        adStatus.textContent =
            "✅ Бонус получен!";

        setTimeout(()=>{

            adStatus.textContent = "";

        },3000);

    }


    createFloatingBonus(

        bonusValue,

        window.innerWidth / 2,
        window.innerHeight / 2,

        `🎁 +${formatNumber(bonusValue)}`

    );


    checkRank();

    updateUI();

    saveGame();

}







/* =========================================================
   TEMPORARY INCOME BOOST
========================================================= */


let incomeBoostTimer =
    0;



function activateIncomeBoost(){



    if(incomeBoostTimer > 0)
        return;





    incomeBoostTimer =
        300;



    const oldMultiplier =
        prestigeMultiplier;





    prestigeMultiplier *= 2;





    const timer =
        setInterval(()=>{



            incomeBoostTimer--;





            if(incomeBoostTimer <= 0){



                clearInterval(timer);



                prestigeMultiplier =
                    oldMultiplier;



                updateUI();


            }




        },1000);




    updateUI();


}