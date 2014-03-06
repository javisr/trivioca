var Question = (function () {

    var bindAnswer, responsed, response,questionData;

    function Question(_questionData) {
        responsed = false;
        questionData = _questionData;

    }

    Question.prototype.wasResponsed = function(){
        return responsed;
    }
    Question.prototype.getResponse = function(){
        return response;
    }

    Question.prototype.printQuestion = function () {

        var answerData, answerHTML, answerList, element, questionHTML, _i, _len, _ref;
        questionHTML = $("#question").clone();
        questionHTML.find(".questionText").html(questionData.questionText);
        answerHTML = questionHTML.find(".answer").remove();
        answerList = questionHTML.find(".answerList");
        _ref = $.shuffle(questionData.answers);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            answerData = _ref[_i];
            element = answerHTML.clone().html(answerData.text);
            element.attr("data-valid", answerData.valid);
            answerList.append(element);
        }
        delete answersHTML;
        questionHTML.css('display', '');
        $("#questionWrapper").html(questionHTML.html());

        bindAnswer();
        timer(5);
    };

    timer = function (seconds) {
        $("#timer").html(seconds);
        if (seconds == 0) {
            $("#timer").html('');
            responsed = false;
            response = false;
        }
        else {
            seconds--;
            setTimeout("timer(" + seconds + ")", 1000); // 30 segundos
        }
    }

    bindAnswer =  function () {
        $('#questionWrapper .answer').unbind('click').bind('click', function (event) {
            event.preventDefault();
            response = $(this).data('valid');
            responsed = true;
            $(this).closest("#questionWrapper").html('');
        });

    };

    return Question;

})();
