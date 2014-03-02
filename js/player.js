var Player = (function () {

    var currentBox, waitingTurns, haveTurn, number;

    function Player(name) {
        haveTurn = false;
        currentBox = 0;
        waitingTurns = 0;

        this.name = name;

    }


    Player.prototype.test = function () {
        console.log('currentBox: ' + currentBox);
        console.log('waitingTurns: ' + waitingTurns);
        console.log('haveTurn: ' + haveTurn);
    };
    Player.prototype.getNumber = function () {
        return number;
    }

    Player.prototype.setNumber = function (_number) {
        number = _number;
    }

    Player.prototype.jumpTo = function (newBox) {
        currentBox = newBox;
        haveTurn = false;
        return currentBox;
    };

    Player.prototype.decreaseIn = function (cells) {
        currentBox = currentBox - cells;
        haveTurn = false;
        return currentBox;
    };

    Player.prototype.increaseIn = function (cells) {
        currentBox = currentBox + cells;
        haveTurn = false;
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

    Player.prototype.throwDice = function (dice) {
        //TODO check the type of dice
        var diceResult;

        //throw dice
        diceResult = dice.throw();

        //increase currentBox
        this.increaseIn(diceResult);


        toReturn = {
            'diceResult': diceResult,
            'currentBox': currentBox
        }

        return toReturn;
    }

    Player.prototype.canPlay = function () {
        var canPlay = (waitingTurns === 0 ) ? true : false;
        return canPlay;
    };

    Player.prototype.setTurn = function () {
        haveTurn = true;
    };

    Player.prototype.doStillHaveTurn = function () {
        return haveTurn;
    };

    Player.prototype.update = function(_boxInfo, _response){

        var boxInfo = _boxInfo;
        //TODO proteger el caso en que func y funcArgs sean undefined
        if (answer) {
            func = boxInfo['success_function'];
            funcArgs = boxInfo['success_function_args'];
        } else {
            func = boxInfo['fail_function'];
            funcArgs = boxInfo['fail_function_args'];
        }

        this[func](funcArgs);//currentPlayer[func](funcArgs);
    }


    //Return the object Player :)
    return Player;
})();
