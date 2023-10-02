const arithmetic = {
    numberOne : 0,
    numberTwo : 0,
    numberThree: null,
    result : [],
    level : sessionStorage.getItem("Level") ? Number(sessionStorage.getItem("Level")) :  1,
    points : sessionStorage.getItem("points") ? Number(sessionStorage.getItem("points")) : 0,
    negativePoints : sessionStorage.getItem("neg_points") ? Number(sessionStorage.getItem("neg_points")) : 0,
    setLevel : function (lvl) {
        sessionStorage.setItem("Level",lvl)
    },
    setPoints : function (pts) {
        sessionStorage.setItem("points",pts)
    },
    setNegPoints : function (npts) {
        sessionStorage.setItem("neg_points",npts)
    },
    getRandomInteger : function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    },
    changeGameData : function (lev,pts,negpts) {
        this.level = lev;
        this.points = pts;
        this.negativePoints = negpts;
        this.setLevel(this.level);
        this.setPoints(this.points);
        this.setNegPoints(this.negativePoints);
    },
    calculateResult : function() {
        this.numberOne = this.getRandomInteger(1,this.level*10);
        this.numberTwo = this.getRandomInteger(1,this.level*10);
        let n1 = this.numberOne;
        let n2 = this.numberTwo;
        let operator;
        let divisionCheck = n1/n2 - Math.trunc(n1/n2);
        divisionCheck == 0 ?  operator = this.getRandomInteger(1,4)
            : operator = this.getRandomInteger(1,3);
        operator == 1 ? this.result = ["+",n1 + n2]
            : operator == 2 ? this.result = ["-",n1 - n2]
                : operator == 3 ? this.result = ["*",n1 * n2]
                    : this.result = ["/",n1 / n2];
        return this.result[1];
    },
    calculateLevel : function () {
        let pointsPerLevel = this.level * 10;
        if (this.points == pointsPerLevel) {
            if (this.level >= 10) {
                this.gameWon();
            } else {
                this.changeGameData(this.level + 1,0,0);
                }
        } else if (this.negativePoints >= 3) {
            if (this.level < 2) {
                this.gameFailed();
            } else {
                this.changeGameData(this.level - 1,0,0);
                }
        }
    },
    gameWon : function () {
        this.changeGameData(1,0,0);
        location.replace("./game-won.html")      
    },
    gameFailed : function () {
        this.changeGameData(1,0,0);
        location.replace("./game-failed.html")       
    }
}


function updateUserInputNumber(event) {
    arithmetic.numberThree = event.target.value;
}
function changeUserInputNumber(event) {
    let userInputNumber = event.target.value || arithmetic.numberThree;
    if (userInputNumber == arithmetic.result[1]) {
        arithmetic.points += 1;
        arithmetic.setPoints(arithmetic.points);
        arithmetic.calculateLevel();
        mathResult.innerText = userInputNumber;
        userPoints.innerText = "Punkty: " + arithmetic.points;
        userLevel.innerText = "Poziom: " + arithmetic.level;
        setTimeout(() => {
            location.reload();
        }, 1000);
    } else {
        arithmetic.negativePoints += 1;
        arithmetic.setNegPoints(arithmetic.negativePoints);
        arithmetic.calculateLevel();
        mathResult.innerText = "?";
        userPoints.innerText = "Punkty: " + arithmetic.points;
        userLevel.innerText = "Poziom: " + arithmetic.level;
        setTimeout(() => {
            location.reload();
        }, 1000);
    }
}
function updateUserNumberFromButton(number) {
    arithmetic.numberThree == null ? arithmetic.numberThree = number : arithmetic.numberThree = arithmetic.numberThree + `${number}`;
    userInputNumber.value = arithmetic.numberThree;
}
function makeUserNumberNegative () {
    if (arithmetic.numberThree == null) {
        arithmetic.numberThree = '-';
        userInputNumber.value = arithmetic.numberThree;
    } else if (arithmetic.numberThree[0] != '-') {
        arithmetic.numberThree = '-' + arithmetic.numberThree;
        userInputNumber.value = arithmetic.numberThree;
        }
}
function makeUserNumberPositive() {
    if (arithmetic.numberThree && arithmetic.numberThree[0] == '-') {
        arithmetic.numberThree = arithmetic.numberThree.slice(1);
        userInputNumber.value = arithmetic.numberThree;
        }
}
function deleteUserInputNumber() {
    userInputNumber.value = '';
    arithmetic.numberThree = '';
}
function toggleButtonStyle(element) {
    element.className == null ? element.className = 'pressed_button'
        : element.className == 'pressed_button' ? element.className = null
            : element.className = 'pressed_button'
}
function exitGame() {
    arithmetic.changeGameData(1,0,0);
    location.replace("./index.html")  
}

const firstNumber = document.getElementById('first_number');
const secondNumber = document.getElementById('second_number');
const mathResult = document.getElementById('math_result');
const mathOperation = document.getElementById('math_operation');
const userPoints = document.getElementById('points');
const userLevel = document.getElementById('level');
const userInputNumber = document.querySelector('input');
const buttons = document.getElementsByTagName('button');

for (let i = 0; i < buttons.length; i++) {
    const arrayElement = buttons[i];
    arrayElement.addEventListener('mousedown', function() {toggleButtonStyle(arrayElement)});
    arrayElement.addEventListener('mouseup', function() {toggleButtonStyle(arrayElement)});   
}

if (firstNumber) {
    arithmetic.calculateResult();
    firstNumber.innerText = arithmetic.numberOne;
    secondNumber.innerText = arithmetic.numberTwo;
    mathOperation.innerText = arithmetic.result[0];
    mathResult.innerText = "?";
    userPoints.innerText = "Punkty: " + arithmetic.points;
    userLevel.innerText = "Poziom: " + arithmetic.level;
    userInputNumber.addEventListener('change',changeUserInputNumber);
    userInputNumber.addEventListener('input',updateUserInputNumber);
    userInputNumber.focus();
    document.getElementById("X").addEventListener('click', deleteUserInputNumber);
    document.getElementById("OK").addEventListener('click', changeUserInputNumber);
    document.getElementById("1").addEventListener('click', function() {updateUserNumberFromButton(1)});
    document.getElementById("2").addEventListener('click', function() {updateUserNumberFromButton(2)});
    document.getElementById("3").addEventListener('click', function() {updateUserNumberFromButton(3)});
    document.getElementById("4").addEventListener('click', function() {updateUserNumberFromButton(4)});
    document.getElementById("5").addEventListener('click', function() {updateUserNumberFromButton(5)});
    document.getElementById("6").addEventListener('click', function() {updateUserNumberFromButton(6)});
    document.getElementById("7").addEventListener('click', function() {updateUserNumberFromButton(7)});
    document.getElementById("8").addEventListener('click', function() {updateUserNumberFromButton(8)});
    document.getElementById("9").addEventListener('click', function() {updateUserNumberFromButton(9)});
    document.getElementById("0").addEventListener('click', function() {updateUserNumberFromButton(0)});
    document.getElementById("-").addEventListener('click', makeUserNumberNegative);
    document.getElementById("+").addEventListener('click', makeUserNumberPositive);
    document.getElementById("exit").addEventListener('click', exitGame);
}
