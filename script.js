const arithmetic = {
    numberOne : 0,
    numberTwo : 0,
    numberThree: null,
    result : [],
    level : sessionStorage.getItem("Level") ? Number(sessionStorage.getItem("Level")) :  1,
    points : sessionStorage.getItem("points") ? Number(sessionStorage.getItem("points")) : 0,
    negativePoints : sessionStorage.getItem("neg_points") ? Number(sessionStorage.getItem("neg_points")) : 0,
    setLevel : function (lvl) {sessionStorage.setItem("Level",lvl)},
    setPoints : function (pts) {sessionStorage.setItem("points",pts)},
    setNegPoints : function (npts) {sessionStorage.setItem("neg_points",npts)},
    getRandomInteger : function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
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
            if (this.level == 10) {
                this.gameWon();
            } else {
                this.level += 1;
                this.points = 0;
                this.negativePoints = 0;
                this.setLevel(this.level);
                this.setPoints(this.points);
                this.setNegPoints(this.negativePoints);
                }
        } else if (this.negativePoints >= 3) {
            if (this.level < 2) {
                this.gameFailed();
            } else {
                this.level -= 1;
                this.points = 0;
                this.negativePoints = 0;
                this.setLevel(this.level);
                this.setPoints(this.points);
                this.setNegPoints(this.negativePoints);
                }
        }
    },
    gameWon : function () {
        this.level = 1;
        this.points = 0;
        this.negativePoints = 0;
        this.setLevel(this.level);
        this.setPoints(this.points);
        this.setNegPoints(this.negativePoints);
        location.replace("./game-won.html")      
    },
    gameFailed : function () {
        this.level = 1;
        this.points = 0;
        this.negativePoints = 0;
        this.setLevel(this.level);
        this.setPoints(this.points);
        this.setNegPoints(this.negativePoints);
        location.replace("./game-failed.html")       
    }
}


function userInputFinal(event) {
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
function userInput(event) {
    arithmetic.numberThree = event.target.value;
    console.log(arithmetic.numberThree);
}
function keyboardButton(number) {
    console.log(arithmetic.numberThree);
    arithmetic.numberThree == null ? arithmetic.numberThree = number : arithmetic.numberThree = arithmetic.numberThree + `${number}`;
    document.querySelector('input').value = arithmetic.numberThree;
    console.log(number, arithmetic.numberThree);
}
function minusButton () {
    if (arithmetic.numberThree == null) {
        arithmetic.numberThree = '-';
        document.querySelector('input').value = arithmetic.numberThree;
        console.log(arithmetic.numberThree);
    } else if (arithmetic.numberThree[0] != '-') {
        arithmetic.numberThree = '-' + arithmetic.numberThree;
        document.querySelector('input').value = arithmetic.numberThree;
        console.log(arithmetic.numberThree);
        }
}
function plusButton() {
    if (arithmetic.numberThree[0] == '-') {
        arithmetic.numberThree = arithmetic.numberThree.slice(1);
        document.querySelector('input').value = arithmetic.numberThree;
        console.log(arithmetic.numberThree);
        }
}
function deleteInput() {
    document.querySelector('input').value = '';
    arithmetic.numberThree = '';
    console.log(arithmetic.numberThree);
}
function exitGame() {
    arithmetic.setLevel(1);
    arithmetic.setPoints(0);
    arithmetic.setNegPoints(0);
}

const firstNumber = document.getElementById('first_number');
const secondNumber = document.getElementById('second_number');
const mathResult = document.getElementById('math_result');
const mathOperation = document.getElementById('math_operation');
const userPoints = document.getElementById('points');
const userLevel = document.getElementById('level');

arithmetic.calculateResult();
firstNumber.innerText = arithmetic.numberOne;
secondNumber.innerText = arithmetic.numberTwo;
mathOperation.innerText = arithmetic.result[0];
mathResult.innerText = "?";
userPoints.innerText = "Punkty: " + arithmetic.points;
userLevel.innerText = "Poziom: " + arithmetic.level;
document.querySelector('input').addEventListener('change',userInputFinal);
document.querySelector('input').addEventListener('input',userInput);
document.querySelector('input').focus();
document.getElementById("X").addEventListener('click', deleteInput);
document.getElementById("OK").addEventListener('click', userInputFinal);
document.getElementById("1").addEventListener('click', function() {keyboardButton(1)});
document.getElementById("2").addEventListener('click', function() {keyboardButton(2)});
document.getElementById("3").addEventListener('click', function() {keyboardButton(3)});
document.getElementById("4").addEventListener('click', function() {keyboardButton(4)});
document.getElementById("5").addEventListener('click', function() {keyboardButton(5)});
document.getElementById("6").addEventListener('click', function() {keyboardButton(6)});
document.getElementById("7").addEventListener('click', function() {keyboardButton(7)});
document.getElementById("8").addEventListener('click', function() {keyboardButton(8)});
document.getElementById("9").addEventListener('click', function() {keyboardButton(9)});
document.getElementById("0").addEventListener('click', function() {keyboardButton(0)});
document.getElementById("-").addEventListener('click', minusButton);
document.getElementById("+").addEventListener('click', plusButton);
document.getElementById("exit").addEventListener('click', exitGame);