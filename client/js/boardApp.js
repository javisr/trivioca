BoardApp = (function () {
    var currentPlayer, lastBox, players, whoStart,boardData,numPlayer;

    function BoardApp(board_data) {

        boardData = board_data.boxData;
        numPlayer = board_data.numPlayer;
        this.printBoard();

    }

    BoardApp.prototype.start = function () {
        players[currentPlayer].turn();
        return currentPlayer++;
    };

    BoardApp.prototype.nextTurn = function () {
        if (currentPlayer === players.length) {
            currentPlayer = 0;
        }
        return players[currentPlayer].turn();
    };

    whoStart = function () {
        //TODO
        return 0;
    };

    BoardApp.prototype.printBoard = function () {
        return this.printNumbers();
    };

    BoardApp.prototype.printNumbers = function () {
        var box;
        var boxDiv;
        var boxes;
        var id;
        var results = [];
        boxes = $("#board td");

        //Aquí se puede ver un ejemplo de propiedad molona ^^
        for ( var i = 0, _len = boxes.length; i < _len; i++) {
            box = boxes[i];
            id = box.id;
            id = parseInt(id.replace('box_', ''));
            boxDiv = "<div class=\"box\"> " + (id + 1) + " </div>";
            results.push($(box).html(boxDiv));
        }
        return results;
    };

    lastBox = boardData.length;

    players = [new Player('Player1', lastBox), new Player('Player2', lastBox)];

    currentPlayer = whoStart();

    BoardApp.prototype.loadQuestion = function (category) {
        var categoryQuestions;
        if (category == null) {
            category = 'sport';
        }
        categoryQuestions = questionDB[category];
        if (categoryQuestions == null) {
            return null;
        }
        return categoryQuestions[Math.floor(Math.random() * categoryQuestions.length)];
    };

    BoardApp.prototype.printQuestion = function (questionData) {
        var answerData, answerHTML, answerList, element, questionHTML, _i, _len, _ref;
        questionHTML = $("#question").clone();
        questionHTML.find(".questionText").html(questionData.questionText);
        answerHTML = questionHTML.find(".answer").remove();
        answerList = questionHTML.find(".answerList");
        _ref = questionData.answers;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            answerData = _ref[_i];
            element = answerHTML.clone().html(answerData.text);
            element.attr("data-valid", answerData.valid);
            answerList.append(element);
        }
        delete answersHTML;
        questionHTML.css('display', '');
        return $("#questionWrapper").html(questionHTML.html());
    };

    BoardApp.prototype.showQuestion = function () {
        return printQuestion(loadQuestion());
    };

    return BoardApp;

})();