Player = (function () {
    var box, dice, waitingTurns;

    function Player(name, totalBox) {
        var lastBox;
        this.name = name;
        lastBox = totalBox;
    }

    box = 0;

    waitingTurns = 0;

    dice = new Dice();

    Player.prototype.moveToBox = function (newBox) {
        return box = newBox;
    };

    Player.prototype.currentBox = function () {
        return box;
    };

    Player.prototype.setWaitingTurns = function (turn) {
        return waitingTurns = turn;
    };

    Player.prototype.turn = function () {
        var returned;
        returned = {};
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

    return Player;

})();
