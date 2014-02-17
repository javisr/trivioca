Dice = (function () {
    function Dice() {
    }

    Dice.prototype.throw = function () {
        return Math.floor(Math.random() * 6 + 1);
    };

    return Dice;

})();
