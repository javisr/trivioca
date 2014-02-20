Board = (function () {

    // VARIABLES PRIVADAS ACCESIBLES DESDE LOS PROTOTYPES
    var currentPlayer, lastBox, players,numPlayers;

    //funciones privadas
    var whoStart, loadUsers;

    function Board(data) {

        lastBox = data.boxData.length;
        numPlayers = data.numPlayer;
        players = loadUsers();
        currentPlayer = whoStart();

        this.printBoard();

        this.test();
    }


    whoStart = function () {
        return Math.floor((Math.random()*numPlayers)+1);
    };

    loadUsers = function(){
        var _players = [];

        for(var i = 1; i<=numPlayers; i++){
            var _name = 'Player' + i;
            _players.push(new Player(_name, lastBox));
        }

        return _players;
    };

    Board.prototype.test = function(){
        console.log('Current Player ' + currentPlayer);
        console.log('Last Box ' + lastBox);
        console.log('Num Players ' + numPlayers);
        console.log('Players');
        console.log(players);
    };

    Board.prototype.start = function () {
        players[currentPlayer].turn();
        return currentPlayer++;

    };

    Board.prototype.nextPlayer = function () {

        currentPlayer++;

        if (currentPlayer === players.length) {
            currentPlayer = 0;
        }

    };

    Board.prototype.turn = function(){

      return players[currentPlayer].turn();
    };
    Board.prototype.printBoard = function () {
        return this.printNumbers();
    };

    Board.prototype.printNumbers = function () {
        var box, boxDiv, boxes, id, _i, _len, _results;
        boxes = $("#board td");
        _results = [];
        for (_i = 0, _len = boxes.length; _i < _len; _i++) {
            box = boxes[_i];
            id = box.id;
            id = parseInt(id.replace('box_', ''));
            boxDiv = "<div class=\"box\"> " + (id + 1) + " </div>";
            _results.push($(box).html(boxDiv));
        }
        return _results;
    };


    Board.prototype.getCurrentPlayer = function () {

        return players[currentPlayer];

    }


    Board.prototype.gameStatus= function(){
        var gameStatus ="<tr><td>Nombre</td><td>Posicion</td></tr>";
        for (var i=0; i<numPlayers;i++){
            gameStatus = gameStatus+"<tr><td>"+players[i].name+"</td><td>"+players[i].currentBox()+"</td></tr>";
        }
        $("#gameStatus")[0].innerHTML=gameStatus;
    }


    return Board;

})();
