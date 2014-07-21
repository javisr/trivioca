var Question = (function () {

    var  answered, answer, questionData;

    var clockTimer;

    function Question(_questionData) {
        answered = false;
        questionData = _questionData;

    }

    Question.prototype.wasAnswered = function(){
        return answered;
    }
    Question.prototype.getAnswer = function(){
        return answer;
    }
    Question.prototype.printQuestion = function (handler) {

        var whenAvailableTemplate = function(template){
            if(typeof  template === 'string'){

                var questionHTML = $(template);
                var answerData, answerHTML, answerList, element, _i, _len, _ref;

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

                $("#questionWrapper").html(questionHTML.html());


                bindAnswer(handler);
                timer(30, handler, this);

            }
        }

        $.getTemplate('tpl/question.html').done(whenAvailableTemplate);

    };

    Question.prototype.destroy = function(){
        clearInterval(clockTimer);
    }

    function timer(seconds, handler, question) {
        $(".timer").html(seconds);
        if (seconds == 0) {
            $(".timer").html('');
            answered = false;
            answer = false;
            if ($.isFunction(handler)) {
                handler();
            }
        }
        else {
            seconds--;
            //var self = this;
            clockTimer = setTimeout(function(){
                timer(seconds, handler, question);
            }, 1000);
        }
    }
    function bindAnswer(handler) {
        if($('#questionWrapper').length){
            $('#questionWrapper').off('click').on('click', '.answer',function (event) {
                event.preventDefault();
                answer = $(this).data('valid');
                answered = true;
                $(this).closest("#questionWrapper").html('');
                if ($.isFunction(handler)) {
                    handler();
                }
            });
        }else{
            alert('falló porque todavia no existen las preguntas');
        }


    };

    return Question;

})();
