Board = (function () {
    var numBoxes, boxesData, questions;

    function Board() {
        boxesData = boardData.boxData;
        numBoxes = boxesData.length;
        questions = questionDB;
        this.printBoard();
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

    Board.prototype.getBoxData = function (box) {
        if (box >= 0 && box < numBoxes-1) {
            return boxesData[box];
        } else {
            console.log('Box no puede ser menor que 0 ni mayor que el total del boxes-1');
            return false;
        }
    };

    Board.prototype.printBoard = function () {
        var board_size, _j, count;
        // HTML vars:
        var table, tbody, tr, td, boxDiv;

        // Get board size:
        board_size = Math.floor(Math.sqrt(numBoxes));

        tbody = $(document.createElement('tbody'));
        count = 0;
        while (count < numBoxes) {
            // Create new tr:
            tr = $(document.createElement('tr'));
            for (_j = 0; _j < board_size && count < numBoxes; _j++) {
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

    
    Board.prototype.getBoxPos = function (pos_box) {
        var p = $(".box_" + pos_box);
        var position = p.offset();

        return position;
    }

    return Board;

})();


/*
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
