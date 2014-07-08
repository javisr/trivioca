var App = (function () {

    var singleInstance;


    function App() {
        if(singleInstance) return singleInstance;
        singleInstance = this;
        this.board = new Board();
        this.dice = new Dice();
        this.players = [];
        this.finished = false;
        this.started = false;
        this.UI = new UI(this);

    }

    App.prototype.test = function () {
        console.log('======================= ESTADO DEL JUEGO =======================');
        console.log('PLAYERS----------------');
        for (var i = 0; i < this.players.length; i++) {
            this.players[i].test();
        }
    }
    App.prototype.newPlayer = function (name) {
        if (this.started === false && name) {
            var player = new Player(name);
            player.setNumber(this.players.length)
            
            this.players.push(player);
            return true;
        } else {
            console.log('No se pudo meter el jugardor');
            return false;
        }
    };
    App.prototype.whoStart = function () {
        var numPlayers = this.players.length;
        if (numPlayers >= 2) {
            return this.players[Math.floor((Math.random() * numPlayers))];
        } else {
            console.log('tiene que haber un mínimo de 2 jugadores');
            return false;
        }

    };
    App.prototype.startGame = function () {
        this.currentPlayer = this.whoStart();
        if (this.currentPlayer != false) {
            this.started = true;
            return true;
        } else {
            return false
        }
    };
    App.prototype.currentPlayer = function () {
        if (this.started !== false)
            return this.currentPlayer;
        else
            return false;
    };
    App.prototype.nextPlayer = function () {
        var current = this.currentPlayer.getNumber();
        if (current == (this.players.length - 1)) {
            this.currentPlayer = this.players[0];
        } else {
            current++;
            this.currentPlayer = this.players[current];
        }
    };
    App.prototype.play = function () {

        if (this.started && !this.finished) {

            if (this.currentPlayer.canPlay()) {

                
                this.currentPlayer.setTurn();
                var result = this.currentPlayer.throwDice(this.dice);

                //TODO MOVE PLAYER IN BOARD

                var box = this.board.getBoxData(result.currentBox);

                var question = new Question(this.board.getQuestion());

                var self = this;
                var turnCallback = function () {
                    var response = false;
                    if (question.wasResponsed() == true) {
                        response = question.getResponse();
                    }
                    self.currentPlayer.update(box, response);

                    if (!self.currentPlayer.doStillHaveTurn()) {
                        self.nextPlayer();
                    }

                    question.destroy();
                    delete question;
                    self.UI.prepareTurn();
                };
                question.printQuestion(turnCallback);

            } else {
                this.nextPlayer();
                this.UI.prepareTurn();
            }

        }
    }
    App.prototype.getPlayersNumber = function(){
        return this.players.length;
    };
    App.prototype.initGame = function(){

    }

    return App;

})();

var game = new App();