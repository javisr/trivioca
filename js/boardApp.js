BoardApp = (function () {

    // VARIABLES PRIVADAS ACCESIBLES DESDE LOS PROTOTYPES
    var currentPlayer, lastBox, players,numPlayers;

    //funciones privadas
    var whoStart, loadUsers;

    function BoardApp(data) {

        lastBox = data.boxData.length;
        numPlayers = data.numPlayer;
        players = [new Player('Player1', lastBox), new Player('Player2', lastBox)];
        currentPlayer = whoStart();

        this.printBoard();

        this.test();
    }


    whoStart = function () {
        return 0;
    };

    loadUsers = function(){

    };

    BoardApp.prototype.test = function(){
        console.log(currentPlayer);
        console.log(lastBox);
        console.log(numPlayers);
        console.log(players);
    };

    BoardApp.prototype.start = function () {
        players[currentPlayer].turn();
        return currentPlayer++;
    };

    BoardApp.prototype.nextTurn = function () {
        if (currentPlayer === players.length) {
            currentPlayer--;
        }
        return players[currentPlayer].turn();
    };


    BoardApp.prototype.printBoard = function () {
        return this.printNumbers();
    };

    BoardApp.prototype.printNumbers = function () {
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


    return BoardApp;

})();