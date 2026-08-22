/* =========================================================
   LOOKSMAX CLICKER
   UI SYSTEM
========================================================= */


/* =========================================================
   DOM
========================================================= */

const looksElement =
    document.getElementById("looks");


const looksPerSecondElement =
    document.getElementById("looksPerSecond");


const currentLooksElement =
    document.getElementById("currentLooks");


const requiredLooksElement =
    document.getElementById("requiredLooks");


const rankElement =
    document.getElementById("rank");


const characterElementUI =
    document.getElementById("character");


const progressFill =
    document.getElementById("progressFill");


const blackpillButton =
    document.getElementById("blackpillButton");


const blackpillDescription =
    document.getElementById("blackpillDescription");





/* =========================================================
   FORMAT NUMBER
========================================================= */


function formatNumber(number){


    number =
        Math.floor(number || 0);



    if(number >= 1000000000){


        return (
            (number / 1000000000)
            .toFixed(1)
            .replace(".0","")
            + "B"
        );


    }



    if(number >= 1000000){


        return (
            (number / 1000000)
            .toFixed(1)
            .replace(".0","")
            + "M"
        );


    }



    if(number >= 1000){


        return (
            (number / 1000)
            .toFixed(1)
            .replace(".0","")
            + "K"
        );


    }



    return number.toLocaleString("ru-RU");

}





/* =========================================================
   FLOATING BONUS
========================================================= */


function createFloatingBonus(
    value,
    x,
    y,
    text = null
){


    const element =
        document.createElement("div");



    element.className =
        "floating-bonus";



    element.textContent =
        text ||
        `+${formatNumber(value)}`;



    element.style.left =
        `${Math.min(
            x,
            window.innerWidth - 80
        )}px`;



    element.style.top =
        `${y}px`;



    document.body.appendChild(element);



    setTimeout(()=>{


        element.remove();


    },900);


}





/* =========================================================
   CLICK ANIMATION
========================================================= */


function playClickAnimation(){


    const button =
        document.getElementById(
            "clickButton"
        );



    if(!button)
        return;



    button.classList.remove(
        "click-effect"
    );



    void button.offsetWidth;



    button.classList.add(
        "click-effect"
    );


}





/* =========================================================
   CHARACTER
========================================================= */


function updateCharacter(){


    const character =
        characters[characterIndex];



    if(
        !character ||
        !characterElementUI
    )
        return;



    characterElementUI.src =
        character.image;



    characterElementUI.style.transform =
        `scale(${character.scale})`;


}





/* =========================================================
   PROGRESS
========================================================= */


function updateProgress(){


    const current =
        characters[characterIndex];



    const next =
        characters[characterIndex + 1];



    if(!current)
        return;





    if(!next){


        if(currentLooksElement)

            currentLooksElement.textContent =
                formatNumber(looks);



        if(requiredLooksElement)

            requiredLooksElement.textContent =
                "MAX";



        if(progressFill)

            progressFill.style.width =
                "100%";



        return;

    }





    const progress =
        (
            (looks - current.required) /
            (next.required - current.required)
        ) * 100;





    if(currentLooksElement)

        currentLooksElement.textContent =
            formatNumber(looks);





    if(requiredLooksElement)

        requiredLooksElement.textContent =
            formatNumber(next.required);





    if(progressFill)

        progressFill.style.width =
            `${Math.max(
                0,
                Math.min(progress,100)
            )}%`;


}





/* =========================================================
   BLACKPILL
========================================================= */


function updateBlackpill(){


    const character =
        characters[characterIndex];



    if(
        !character ||
        !blackpillButton
    )
        return;





    if(character.rank === "TRUE MOGGER"){



        blackpillButton.disabled =
            false;



        blackpillButton.textContent =
            "☠ ВОЗРОДИТЬСЯ";



        if(blackpillDescription)

        blackpillDescription.textContent =
            `Сбросить прогресс и получить ×${prestigeMultiplier * 2} к заработку.`;



    } else {



        blackpillButton.disabled =
            true;



        blackpillButton.textContent =
            "ЗАБЛОКИРОВАНО";



        if(blackpillDescription)

        blackpillDescription.textContent =
            "Достигните TRUE MOGGER, чтобы открыть BLACKPILL.";


    }


}





/* =========================================================
   SHOP
========================================================= */


function updateShop(){


    const buyButtons =
        document.querySelectorAll(
            ".buy-button"
        );



    buyButtons.forEach(
        (button,index)=>{


            const item =
                shopItems[index];



            if(!item)
                return;





            if(item.bought){


                button.textContent =
                    "КУПЛЕНО";



                button.disabled =
                    true;



                return;

            }





            button.textContent =
                formatNumber(
                    item.cost
                );



            button.disabled =
                looks < item.cost;



        }
    );


}





/* =========================================================
   UPDATE UI
========================================================= */


function updateUI(){


    const character =
        characters[characterIndex];



    if(!character)
        return;





    if(looksElement)


        looksElement.textContent =
            formatNumber(looks);





    if(looksPerSecondElement){


        const income =
            looksPerSecond *
            prestigeMultiplier;



        looksPerSecondElement.textContent =
            `+${formatNumber(income)} / сек`;


    }





    if(rankElement)


        rankElement.textContent =
            character.rank;





    updateCharacter();


    updateProgress();


    updateBlackpill();


    updateShop();


}





/* =========================================================
   AUTO UPDATE
========================================================= */


setInterval(()=>{


    updateUI();


},500);