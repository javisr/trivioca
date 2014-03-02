var Player = (function () {

    var currentBox, waitingTurns, haveTurn;

    function Player(name) {
        haveTurn = false;
        currentBox = 0;
        waitingTurns = 0;

        this.name = name;

    }

    Player.prototype.test = function () {
        console.log('currentBox: ' + currentBox);
        console.log('waitingTurns: ' + waitingTurns);
        console.log('haveTurn: '+ haveTurn);
    };
    Player.prototype.jumpTo = function (newBox) {
        currentBox = newBox;
        return currentBox;
    };

    Player.prototype.decreaseIn = function (cells) {
        currentBox = currentBox - cells;
        return currentBox;
    };

    Player.prototype.increaseIn = function (cells){
        currentBox = currentBox + cells;
        return currentBox;

    }

    Player.prototype.getCurrentBox = function () {
        return currentBox;
    };

    Player.prototype.setWaitingTurns = function (turns) {
        return waitingTurns = turns;
    };


    Player.prototype.repeatTurn = function () {
        haveTurn = true;
    }


    Player.prototype.throwDice = function (dice){
        //TODO check the type of dice
        var diceResult;

        //throw dice
        diceResult = dice.throw();

        //increase currentBox
        this.increaseIn(diceResult);


        toReturn = {
            'diceResult' : diceResult,
            'currentBox' : currentBox
        }

        return toReturn;
    }

    Player.prototype.canPlay = function(){
        var canPlay = (waitingTurns === 0 ) ? true: false;
        return canPlay;
    };

    Player.prototype.setTurn = function(){
        haveTurn = true;
    };

   Player.prototype.doStillHaveTurn = function(){
       return haveTurn;
   };


    //Return the object Player :)
    return Player;
})();





/*
 Player.prototype.turn = function () {
 var returned=  {};
 if (waitingTurns === 0) {
 haveTurn = true;
 currentBox += dice["throw"]();
 if (currentBox > totalBoxex) {
 currentBox -= currentBox - totalBoxex;
 }
 returned = {
 'next': false,
 'currentBox': currentBox
 };
 } else {
 waitingTurns--;
 returned = {
 'next': true
 };
 }
 return returned;
 };
 */