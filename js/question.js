var Question = (function () {

    var _bindAnswer,_printQuestion, _responsed, _response;

    _printQuestion = function (questionData) {
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
        return $("#questionWrapper").html(questionHTML.html());
    };

    _bindAnswer =  function () {
        $('#questionWrapper').unbind('click').bind('click', '.answer', function (event) {
            event.preventDefault();
            _response = $(this).data('valid');
            $(this).closest("#questionWrapper").html('');
        });

    };


    function Question(questionData) {
        _responsed = false;
        _printQuestion(questionData);
        _bindAnswer();

    }

    Question.prototype.wasResponsed = function(){
        return _responsed;
    }
    Question.prototype.getResponse = function(){
        return _response;
    }

    return Question;

})();