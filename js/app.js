var App = (function () {

    var players, dice, board, finished, started, currentPlayer;

    var _whoStart;


    function App() {
        board = new Board();
        dice = new Dice();
        players = [];
        finished = false;
        started = false;
        this.ui = new UI(this);

    }

    App.prototype.test = function () {
        console.log('======================= ESTADO DEL JUEGO =======================');
        console.log('PLAYERS----------------');
        for (var i = 0; i < players.length; i++) {
            players[i].test();
        }
    }
    App.prototype.newPlayer = function (name) {
        if (started === false && name) {
            var player = new Player(name);
            player.setNumber(players.length)
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
    App.prototype.nextPlayer = function () {
        var current = currentPlayer.getNumber();
        if (current == (players.length - 1)) {
            currentPlayer = players[0];
        } else {
            current++;
            currentPlayer = players[current];
        }
    };
    App.prototype.play = function () {

        if (started && !finished) {

            if (currentPlayer.canPlay()) {

                
                currentPlayer.setTurn();
                var result = currentPlayer.throwDice(dice);

                //TODO MOVE PLAYER IN BOARD

                var box = board.getBoxData(result.currentBox);

                var question = new Question(board.getQuestion());

                var self = this;
                var turnCallback = function () {
                       var response = false;
                    if (question.wasResponsed() == true) {
                        response = question.getResponse();
                    }
                    currentPlayer.update(box, response);

                    if (!currentPlayer.doStillHaveTurn()) {
                        self.nextPlayer();
                    }


                    delete question;
                    self.play();
                };
                question.printQuestion(turnCallback);

            } else {
                this.nextPlayer();
                this.play();
            }

        }
    }
    App.prototype.getPlayersNumber = function(){
        return players.length;
    };
    App.prototype.initGame = function(){

    }

    return App;

})();

var game = new App();
$(document).bind('click', game.ui.handleCustomEvent);