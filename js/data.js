/* =========================================================
   LOOKSMAX CLICKER
   DATA
========================================================= */


/* =========================================================
   ПЕРСОНАЖИ / РАНГИ
========================================================= */

const characters = [

{
rank:"SUB3",
required:0,
image:"assets/characters/sub3.png",
scale:1
},

{
rank:"SUB5",
required:100,
image:"assets/characters/sub5.png",
scale:1
},

{
rank:"LTN",
required:1000,
image:"assets/characters/ltn.png",
scale:0.85
},

{
rank:"MTN",
required:10000,
image:"assets/characters/mtn.png",
scale:1
},

{
rank:"HTN",
required:100000,
image:"assets/characters/htn.png",
scale:1.05
},

{
rank:"CHAD",
required:3000000,
image:"assets/characters/chad.png",
scale:0.8
},

{
rank:"TRUE ADAM",
required:100000000,
image:"assets/characters/trueadam.png",
scale:1
},

{
rank:"TRUE MOGGER",
required:5000000000,
image:"assets/characters/truemogger.png",
scale:0.8
}

];




/* =========================================================
   МАГАЗИН
========================================================= */




const shopItems = [

/* =========================
   SOFTMAXING
========================= */

{
name:"🥗 Чистое питание",
type:"soft",
cost:50,
income:1,
bought:false
},

{
name:"🧴 Глоу-ап кожи",
type:"soft",
cost:200,
income:3,
bought:false
},

{
name:"💇 Идеальная стрижка",
type:"soft",
cost:700,
income:10,
bought:false
},

{
name:"🧼 Уход за лицом PRO",
type:"soft",
cost:2500,
income:30,
bought:false
},

{
name:"😴 Сон по режиму",
type:"soft",
cost:8000,
income:100,
bought:false
},

{
name:"🏋️ Физуха",
type:"soft",
cost:25000,
income:350,
bought:false
},

{
name:"💪 Набор массы",
type:"soft",
cost:100000,
income:1500,
bought:false
},

{
name:"👔 Стильный гардероб",
type:"soft",
cost:400000,
income:7000,
bought:false
},



/* =========================
   HARDMAXING
========================= */

{
name:"🦷 Идеальная улыбка",
type:"hard",
cost:1500000,
income:30000,
bought:false
},


{
name:"💊 Чистая кожа MAX",
type:"hard",
cost:8000000,
income:150000,
bought:false
},


{
name:"🧬 Генетический апгрейд",
type:"hard",
cost:40000000,
income:1000000,
bought:false
},


{
name:"👁 Hunter Eyes",
type:"hard",
cost:200000000,
income:8000000,
bought:false
},


{
name:"🦴 Чадская челюсть",
type:"hard",
cost:1000000000,
income:50000000,
bought:false
},


{
name:"🧪 Экстремальный глоу-ап",
type:"hard",
cost:5000000000,
income:300000000,
bought:false
},


{
name:"👑 Бог-уровень генетики",
type:"hard",
cost:25000000000,
income:2000000000,
bought:false
}

];



/* =========================================================
   СОЗДАНИЕ МАГАЗИНА
========================================================= */


function createShop(){


    const softShop =
        document.getElementById("softShop");


    const hardShop =
        document.getElementById("hardShop");



    if(!softShop || !hardShop)
        return;




    shopItems.forEach((item,index)=>{


        const html = `

        <div class="shop-item">


            <div class="item-info">


                <strong>
                    ${item.name}
                </strong>


                <span>
                    +${item.income} очков / сек
                </span>


            </div>


            <button class="buy-button">

                ${item.cost}

            </button>


        </div>

        `;



        if(item.type === "soft"){

            softShop.innerHTML += html;

        }
        else{

            hardShop.innerHTML += html;

        }


    });





    const buyButtons =
        document.querySelectorAll(".buy-button");



    buyButtons.forEach(
        (button,index)=>{


            button.addEventListener(
                "click",
                ()=>{


                    buyItem(
                        button,
                        index
                    );


                }
            );


        }
    );


}
/* =========================================================
   БОНУСЫ ЗА КЛИК
========================================================= */

const clickBonuses = [

{
    name:"МАЛЕНЬКИЙ БОНУС",
    text:"+10 очков",
    value:10,
    chance:0.03
},


{
    name:"БОНУС",
    text:"+50 очков",
    value:50,
    chance:0.015
},


{
    name:"БОЛЬШОЙ БОНУС",
    text:"+100 очков",
    value:100,
    chance:0.005
},


{
    name:"МЕГА БОНУС",
    text:"+500 очков",
    value:500,
    chance:0.001
}

];



/* =========================================================
   БОНУСЫ ЗА РЕКЛАМУ
========================================================= */

const adBonuses = [

{
    text:"+100 очков",
    value:100
},

{
    text:"+500 очков",
    value:500
},

{
    text:"+1 000 очков",
    value:1000
},

{
    text:"+5 000 очков",
    value:5000
},

{
    text:"+10 000 очков",
    value:10000
}

];