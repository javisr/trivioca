var App = (function () {

    var players, dice, board, finished, started, currentPlayer;

    var _whoStart;


    function App() {
        board = new Board();
        dice = new Dice();
        players = [];
        finished = false;
        started = false;
    }


    App.prototype.newPlayer = function (name) {
        if (started === false && name) {
            var player = new Player(name);
            player.setNumber(players.length);
            players.push(player);
            return true;
        } else {
            console.log('No se pudo meter el jugardor');
            return false;
        }
    };

    _whoStart = function () {
        var numPlayers = players.length;
        if (numPlayers >= 2) {
            return players[Math.floor((Math.random() * numPlayers))];
        } else {
            console.log('tiene que haber un mínimo de 2 jugadores');
            return false;
        }

    };

    App.prototype.startGame = function () {
        currentPlayer = _whoStart();
        if (currentPlayer != false) {
            started = true;
            return true;
        } else {
            return false
        }
    };

    App.prototype.currentPlayer = function () {
        if (started !== false)
            return currentPlayer;
        else
            return false;
    };

    App.prototype.play = function () {
        if (started) {
         do
            {
                if (currentPlayer.canPlay()) {

                    currentPlayer.setTurn();

                    var result = currentPlayer.throwDice(dice);

                    //TODO MOVE PLAYER IN BOARD

                    var box = board.getBoxData(result.currentBox);

                    var question = new Question(board.getQuestion());

                    while (question.wasResponsed() === false) {
                        console.log('there is not answer yet');
                    }

                    var response = question.getResponse();

                    delete question;

                    currentPlayer.update(box, response);

                    if (!currentPlayer.doStillHaveTurn()) {
                        this.nextPlayer();
                    }

                } else {
                    this.nextPlayer();
                }

            } while (!finished)
        }
    }
    App.prototype.nextPlayer = function () {
        var current = currentPlayer.getNumber();
        if(current == players.length){
            currentPlayer = players[0];
        }else{
            current++;
            currentPlayer = players[current];
        }
    }
    return App;

})();

var game = new App();

//TO REMOVE

game.newPlayer('JugadorA');
game.newPlayer('JugadorB');
game.startGame();
/*game.play();
*/