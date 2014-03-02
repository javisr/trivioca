Board = (function () {
    var numBoxes, boxesData, questions;

    function Board() {
        boxesData = boardData.boxData;
        numBoxes = boxesData.length;
        questions = questionDB;
    }


    Board.prototype.getQuestion = function (category) {
        var question, categoryQuestions;


        //TODO get ramdon category

        if (category == null) {
            category = 'sport';
        }

        ///////////

        categoryQuestions = questions[category];
        if (categoryQuestions == null) {
            return null;
        }

        question = categoryQuestions[Math.floor(Math.random() * categoryQuestions.length)];


        return question;
    }


    return Board;

})();


/*Board = (function () {

 // VARIABLES PRIVADAS ACCESIBLES DESDE LOS PROTOTYPES
 var currentPlayer, numBox, players, numPlayers, boxData;

 //funciones privadas
 var whoStart, loadUsers;

 function Board(data) {

 boxData = data.boxData;
 numBox = data.boxData.length;
 numPlayers = data.numPlayer;
 players = loadUsers();
 currentPlayer = whoStart();
 currentPlayer = (currentPlayer < numPlayers) ? currentPlayer : 1;

 this.printBoard();

 this.test();
 }


 whoStart = function () {
 return Math.floor((Math.random() * numPlayers) + 1);
 };

 loadUsers = function () {
 var _players = [];

 for (var i = 1; i <= numPlayers; i++) {
 var _name = 'Player' + i;
 _players.push(new Player(_name, numBox));
 }

 return _players;
 };

 Board.prototype.test = function () {
 console.log('Current Player ' + currentPlayer);
 console.log('Last Box ' + numBox);
 console.log('Num Players ' + numPlayers);
 console.log('Players');
 console.log(players);
 };
 /*
 Board.prototype.start = function () {
 players[currentPlayer].turn();
 };

 Board.prototype.applyAnswer = function (answer) {

 var func, funcArgs, haveTurn;
 var player = this.getCurrentPlayer();
 var boxInfo = boxData[player.currentBox()];
 //TODO proteger el caso en que func y funcArgs sean undefined
 if (answer) {
 func = boxInfo['success_function'];
 funcArgs = boxInfo['success_function_args'];
 } else {
 func = boxInfo['fail_function'];
 funcArgs = boxInfo['fail_function_args'];
 }

 player[func](funcArgs);//currentPlayer[func](funcArgs);


 };



 Board.prototype.nextPlayer = function () {

 currentPlayer++;

 if (currentPlayer === players.length - 1) {
 currentPlayer = 0;
 }

 this.turn();
 };

 Board.prototype.turn = function () {
 return players[currentPlayer].turn();
 };

 Board.prototype.printBoard = function () {
 var board_size, _j, count;
 // HTML vars:
 var table, tbody, tr, td, boxDiv;

 // Get board size:
 board_size = Math.floor(Math.sqrt(numBox));

 tbody = $(document.createElement('tbody'));
 count = 0;
 while (count < numBox) {
 // Create new tr:
 tr = $(document.createElement('tr'));
 for (_j = 0; _j < board_size && count < numBox; _j++) {
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
 table.attr('id', 'table-board');
 table.append(tbody);
 $('#board').html(table);
 };

 Board.prototype.getCurrentPlayer = function () {
 return players[currentPlayer - 1];
 }


 Board.prototype.gameStatus = function () {
 var gameStatus = "<tr><td>Nombre</td><td>Posicion</td></tr>";
 for (var i = 0; i < numPlayers; i++) {
 gameStatus = gameStatus + "<tr><td>" + players[i].name + "</td><td>" + players[i].currentBox() + "</td></tr>";
 }
 $("#gameStatus")[0].innerHTML = gameStatus;
 }


 return Board;

 })();
 */