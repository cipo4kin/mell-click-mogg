/* =========================================================
   LOOKSMAX CLICKER
   SAVE SYSTEM
========================================================= */


/* =========================================================
   SAVE SETTINGS
========================================================= */


const SAVE_KEY =
    "looksmax_clicker_save";


const SAVE_VERSION = 2;





/* =========================================================
   SAVE
========================================================= */


function saveGame(){


    const saveData = {


        version:
            SAVE_VERSION,


        looks,


        characterIndex,


        looksPerSecond,


        clickPower,


        prestigeMultiplier,


        prestigeCount,


        blackpillUnlocked,



        shopBought:

            shopItems.map(
                item => item.bought === true
            )

    };



    try{


        localStorage.setItem(
            SAVE_KEY,
            JSON.stringify(saveData)
        );


    }
    catch(error){


        console.error(
            "Ошибка сохранения:",
            error
        );


    }


}





/* =========================================================
   LOAD
========================================================= */


function loadGame(){


    try{


        const saved =
            localStorage.getItem(
                SAVE_KEY
            );



        if(!saved){


            console.log(
                "Новая игра."
            );


            return;


        }




        const data =
            JSON.parse(saved);





        // старая версия игры

        if(
            data.version !== SAVE_VERSION
        ){


            console.warn(
                "Старая версия сохранения. Создана новая игра."
            );



            localStorage.removeItem(
                SAVE_KEY
            );


            return;


        }






        if(typeof data.looks === "number"){


            looks =
                Math.max(
                    0,
                    data.looks
                );


        }






        if(typeof data.characterIndex === "number"){


            characterIndex =
                Math.max(
                    0,
                    Math.min(
                        data.characterIndex,
                        characters.length - 1
                    )
                );


        }







        if(typeof data.looksPerSecond === "number"){


            looksPerSecond =
                Math.max(
                    1,
                    data.looksPerSecond
                );


        }






        if(typeof data.clickPower === "number"){


            clickPower =
                Math.max(
                    1,
                    data.clickPower
                );


        }







        if(typeof data.prestigeMultiplier === "number"){


            prestigeMultiplier =
                Math.max(
                    1,
                    data.prestigeMultiplier
                );


        }







        if(typeof data.prestigeCount === "number"){


            prestigeCount =
                Math.max(
                    0,
                    data.prestigeCount
                );


        }






        if(typeof data.blackpillUnlocked === "boolean"){


            blackpillUnlocked =
                data.blackpillUnlocked;


        }







        if(Array.isArray(data.shopBought)){


            shopItems.forEach(
                (item,index)=>{


                    item.bought =
                        data.shopBought[index] === true;


                }
            );


        }





        console.log(
            "Игра загружена."
        );



    }
    catch(error){


        console.error(
            "Ошибка загрузки:",
            error
        );



        localStorage.removeItem(
            SAVE_KEY
        );


    }


}





/* =========================================================
   AUTO SAVE
========================================================= */


setInterval(
    saveGame,
    10000
);





/* =========================================================
   SAVE ON EXIT
========================================================= */


window.addEventListener(
    "beforeunload",
    saveGame
);




window.addEventListener(
    "visibilitychange",
    ()=>{


        if(
            document.visibilityState === "hidden"
        ){


            saveGame();


        }


    }
);