BoardApp = (function () {
    var currentPlayer, lastBox, players, whoStart;

    function BoardApp(board_data) {
        var boardData;
        this.printBoard();
        boardData = board_data;
    }

    BoardApp.prototype.star = function () {
        players[currentPlayer].turn();
        return currentPlayer++;
    };

    BoardApp.prototype.nextTurn = function () {
        if (currentPlayer === players.length) {
            currentPlayer--;
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