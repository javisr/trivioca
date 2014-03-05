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

    App.prototype.test = function(){
        console.log('======================= ESTADO DEL JUEGO =======================');
        console.log('PLAYERS----------------');
        for(var i = 0; i < players.length; i++){
            players[i].test();
        }
    }

    App.prototype.newPlayer = function (name) {
        if (started === false && name) {
            players.push(new Player(name,players.length));
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
        if(current == players.length){
            currentPlayer = players[0];
        }else{
            current++;
            currentPlayer = players[current-1];
        }
    };
    App.prototype.play = function () {
        if (started && !finished && typeof timer == 'undefined') {

                if (currentPlayer.canPlay()) {

                    currentPlayer.setTurn();

                    var result = currentPlayer.throwDice(dice);

                    //TODO MOVE PLAYER IN BOARD

                    var box = board.getBoxData(result.currentBox);

                    var question = new Question(board.getQuestion());

                    question.printQuestion();

                    var i = 0;
                    var self = this;
                    var timer = setInterval(function(){
                        if(i == 3000 || question.wasResponsed() == true) {
                            clearInterval(timer);

                            var response = question.getResponse();

                            delete question;

                            currentPlayer.update(box, response);

                            if (!currentPlayer.doStillHaveTurn()) {
                                self.nextPlayer();
                            }

                            self.play();
                        }
                        i++;
                    }, 100);



                } else {
                    this.nextPlayer();
                    this.play();
                }

        }
    }

    return App;

})();

var game = new App();

//TO REMOVE

game.newPlayer('JugadorA');
//game.newPlayer('JugadorB');
//game.newPlayer('JugadorC');
//game.startGame();
//game.play();
