Board = (function () {

    // VARIABLES PRIVADAS ACCESIBLES DESDE LOS PROTOTYPES
    var currentPlayer, numBox, players,numPlayers;

    //funciones privadas
    var whoStart, loadUsers;

    function Board(data) {

        numBox = data.boxData.length;
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
            _players.push(new Player(_name, numBox));
        }

        return _players;
    };

    Board.prototype.test = function(){
        console.log('Current Player ' + currentPlayer);
        console.log('Last Box ' + numBox);
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
        var boxes, num_columns, num_rows, _i, _j, count;
        // HTML vars:
        var table, tbody, tr, td, boxDiv;

        // Get number of boxes:
        boxes = boardData.boxData.length;
        // Get table size : num_columns, num_rows:
        num_columns = Math.floor(Math.sqrt(boxes));
        num_rows = (num_columns < Math.sqrt(boxes)) ? num_columns + 1 : num_columns;

        tbody = $(document.createElement('tbody'));
        count = 0;
        for (_i = 0; _i < num_rows; _i++) {
            tr = $(document.createElement('tr'));
            for (_j = 0; _j < num_columns && count < boxes; _j++) {
                // Create td:
                td = $(document.createElement('td'));
                td.addClass('box_' + ++count);
                boxDiv = "<div class=\"box\"> " + count + " </div>";
                td.append(boxDiv);
                // Add new td to tr:
                tr.append(td);
            }
            // Add new tr to tbody:
            tbody.append(tr);
        }

        // Generate table:
        table = $(document.createElement('table'));
        table.attr('id','table-board');
        table.append(tbody);
        $('#board').html(table);
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
