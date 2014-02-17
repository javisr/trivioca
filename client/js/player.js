Player = (function () {

    //VARIABLES PRIVADAS DE LA CLASE ACCESIBLES SÓLO DESDE MÉTODOS
    var dice; //dado
    var waitingTurns; //Turnos que tiene de penalización el player
    var lastBox; //última casilla del tablero
    var currentBox; //casilla actual
    //////////////////////////////////////////////////////////////


    /*
    *  Este es el constructor de la clase Player.
    *  - name: nombre del jugador.
    *  - totalBox: número total de casillas del tablero.
     */
    function Player(name, totalBox) {
        this.name = name; //nombre del player
        lastBox = totalBox;  //--> ejemplo de variable privada de la clase.
    }

    currentBox = 0;

    waitingTurns = 0;

    dice = new Dice();

    /*
    * Mover el jugador a la casilla X
    * - newBow: nueva casilla
     */
    Player.prototype.jumpTo = function (newBox) {
        //TODO cotrol that newBox is a int value;
        return currentBox = newBox;
    };

    /*
     * currentBox getter
     */
    Player.prototype.getCurrentBox = function () {
        return currentBox;
    };

    /*
    * waitingTurns setter
     */
    Player.prototype.setWaitingTurns = function (turn) {
        return waitingTurns = turn;
    };

    /*
    * tiradas
     */
    Player.prototype.turn = function () {
        console.log(lastBox);
        var returned = {};
        if (waitingTurns === 0) { //si no tiene turnos de espera
            currentBox += dice["throw"]();

            if (currentBox > lastBox) {
                currentBox -= currentBox - lastBox;
            }
            //TODO poner una animación?
            
            returned = {
                'next': false, //False para que no salte ya al siguiente jugador
                'box': currentBox //casilla nueva.
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
