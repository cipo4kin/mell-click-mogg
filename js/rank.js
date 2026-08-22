/* =========================================================
   LOOKSMAX CLICKER
   RANK SYSTEM
========================================================= */


/* =========================================================
   ПРОВЕРКА НОВОГО РАНГА
========================================================= */

function checkRank() {


    let changed = false;



    while (

        characterIndex < characters.length - 1 &&

        looks >= characters[characterIndex + 1].required

    ) {


        characterIndex++;


        changed = true;



        const newRank =
            characters[characterIndex].rank;



        /* -------------------------
           ЗВУК MOGGED
        ------------------------- */


        playMoggedSound();




        /* -------------------------
           ВИЗУАЛ
        ------------------------- */


        showRankUpScreen(
            newRank
        );


    }



    return changed;


}






/* =========================================================
   MOGGED SCREEN
========================================================= */

function showRankUpScreen(rank) {


    const oldBanner =
        document.querySelector(
            ".mogged-banner"
        );



    if(oldBanner){

        oldBanner.remove();

    }




    const banner =
        document.createElement("div");



    banner.className =
        "mogged-banner";



    banner.innerHTML = `

        <div class="mogged-banner-line"></div>


        <div class="mogged-banner-text">
            MOGGED!
        </div>


        <div class="mogged-banner-line"></div>

    `;



    document.body.appendChild(
        banner
    );




    requestAnimationFrame(()=>{


        banner.classList.add(
            "mogged-banner-show"
        );


    });






    setTimeout(()=>{


        banner.classList.remove(
            "mogged-banner-show"
        );


        banner.classList.add(
            "mogged-banner-hide"
        );



    },650);






    setTimeout(()=>{


        banner.remove();



    },1000);



}