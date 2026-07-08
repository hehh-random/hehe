const PASSWORD = "2524";


const birthdayDate = {
    month: 7,   // Change month (1-12)
    day: 8      // Change birthday date
};



/* ===============================
ELEMENTS
===============================*/


const loadingScreen =
document.getElementById("loadingScreen");


const vaultScreen =
document.getElementById("vaultScreen");


const midnightScreen =
document.getElementById("midnightScreen");


const homeScreen =
document.getElementById("homeScreen");


const treasureScreen =
document.getElementById("treasureScreen");


const passwordInput =
document.getElementById("passwordInput");


const passwordMessage =
document.getElementById("passwordMessage");


const continueBtn =
document.getElementById("continueBtn");


const beginAdventure =
document.getElementById("beginAdventure");



/* ===============================
LOADING SCREEN
===============================*/


window.addEventListener(
"load",
()=>{


setTimeout(()=>{


loadingScreen.classList.remove("active");


vaultScreen.classList.add("active");


},3500);


});



/* ===============================
PASSWORD SYSTEM
===============================*/


let enteredPassword = "";



const keys =
document.querySelectorAll(".key");


keys.forEach(key=>{


key.addEventListener(
"click",
()=>{


if(enteredPassword.length < 4){


enteredPassword += key.innerText;


passwordInput.value =
"•".repeat(
enteredPassword.length
);


}


});


});



document
.getElementById("clearBtn")
.addEventListener(
"click",
()=>{


enteredPassword="";

passwordInput.value="";

passwordMessage.innerHTML="";


});



document
.getElementById("enterBtn")
.addEventListener(
"click",
()=>{


if(
enteredPassword === PASSWORD
){


unlockVault();


}

else{


wrongPassword();


}


});



function unlockVault(){


passwordMessage.innerHTML =
"Unlocked ❤️";


vaultScreen.classList.add(
"vault-unlock"
);


setTimeout(()=>{


vaultScreen.classList.remove(
"active"
);


midnightScreen.classList.add(
"active"
);


startClock();


},1000);



}



function wrongPassword(){


passwordMessage.innerHTML =
"Oops... that's not the right birthday code 💗";


const box =
document.querySelector(".vault-card");


box.classList.add(
"shake"
);


setTimeout(()=>{


box.classList.remove(
"shake"
);


},500);


}



/* ===============================
MIDNIGHT CLOCK
===============================*/


function startClock(){


updateClock();


setInterval(
updateClock,
1000
);


}



function updateClock(){


const now =
new Date();



const hours =
String(
now.getHours()
)
.padStart(2,"0");


const minutes =
String(
now.getMinutes()
)
.padStart(2,"0");


const seconds =
String(
now.getSeconds()
)
.padStart(2,"0");



document
.getElementById("digitalClock")
.innerText =

`${hours}:${minutes}:${seconds}`;



checkBirthday(
now
);


}



function checkBirthday(now){


const birthday =
new Date(
now.getFullYear(),
birthdayDate.month-1,
birthdayDate.day,
0,0,0
);



const countdownText =
document.getElementById(
"countdownText"
);



const countdownTitle =
document.getElementById(
"countdownTitle"
);



if(now >= birthday){


countdownTitle.innerHTML =
"It's finally your birthday!! 🎉";


countdownText.innerHTML =
"Your magical surprise is ready ❤️";


return;


}



let difference =
birthday - now;



let h =
Math.floor(
difference /1000/60/60
);



let m =
Math.floor(
(difference/1000/60)%60
);



let s =
Math.floor(
(difference/1000)%60
);



countdownTitle.innerHTML =
"Almost time... 🌙";



countdownText.innerHTML =

`Only ${String(h).padStart(2,"0")}:
${String(m).padStart(2,"0")}:
${String(s).padStart(2,"0")}
until your surprise.`;



}



/* ===============================
PAGE NAVIGATION
===============================*/


continueBtn.onclick =
()=>{


midnightScreen
.classList.remove(
"active"
);


homeScreen
.classList.add(
"active"
);


};



beginAdventure.onclick =
()=>{


homeScreen
.classList.remove(
"active"
);


treasureScreen
.classList.add(
"active"
);


};




/* ===============================
GIFT SYSTEM
===============================*/


let openedGifts =
JSON.parse(
localStorage.getItem(
"openedGifts"
)
)
||
[];



const giftCards =
document.querySelectorAll(
".gift-card"
);



const progressText =
document.getElementById(
"giftProgress"
);



const progressFill =
document.getElementById(
"progressFill"
);



function updateProgress(){


const count =
openedGifts.length;



progressText.innerHTML =

`${count} / 6 Gifts`;



progressFill.style.width =

`${(count/6)*100}%`;



if(count===6){


const finalButton =
document.getElementById(
"finalButton"
);


finalButton.disabled=false;


finalButton.innerHTML =
"✨ Open Final Surprise";


}


}



giftCards.forEach(card=>{


const id =
card.dataset.gift;



if(
openedGifts.includes(id)
){


card.classList.add(
"completed"
);


}



card
.querySelector(".openGift")
.addEventListener(
"click",
()=>{


openGift(id,card);


});


});



function openGift(id,card){


card.classList.add(
"opening"
);


if(
!openedGifts.includes(id)
){


openedGifts.push(id);


localStorage.setItem(

"openedGifts",

JSON.stringify(
openedGifts
)

);


}



updateProgress();



setTimeout(()=>{


openGiftModal(id);



},600);



}



updateProgress();




/* ===============================
END PART 1
NEXT:
Gift Modal
Love Letter
Polaroids
Cake
=========================================================*/
