Player = (function () {

    // VARIABLES PRIVADAS ACCESIBLES DESDE LOS PROTOTYPES
    var box, dice, waitingTurns, lastBox;

    function Player(name, totalBox) {
        //VARIABLE NO ACCESIBLE DESDE LOS PROTOTYPES
        var piticli = 'ooooo';

        box = 0;
        waitingTurns = 0;
        lastBox = totalBox;
        dice = new Dice();

        //VARIABLE ACCESIBLE DESDE EL OBJETO
        this.name = name;

    }

    Player.prototype.test = function () {
        console.log(box);
        console.log(waitingTurns);
        console.log(lastBox);
        console.log(dice);
        return true;

    };
    Player.prototype.jumpTo = function (newBox) {
        return box = newBox;
    };

    Player.prototype.currentBox = function () {
        return box;
    };

    Player.prototype.setWaitingTurns = function (turn) {
        board.nextPlayer();
        return waitingTurns = turn;
    };


    Player.prototype.turn = function () {
        var returned=  {};
        if (waitingTurns === 0) {
            box += dice["throw"]();
            if (box > lastBox) {
                box -= box - lastBox;
            }
            returned = {
                'next': false,
                'box': box
            };
        } else {
            waitingTurns--;
            returned = {
                'next': true
            };
        }
        return returned;
    };

    Player.prototype.repeatTurn = function () {
      this.turn();
    }

    return Player;

})();
