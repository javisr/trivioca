var Question = (function () {

    var  answered, answer, questionData;

    function Question(_questionData) {
        answered = false;
        questionData = _questionData;
        this.clockTimer =  null;

    }

    Question.prototype.wasAnswered = function(){
        return answered;
    }
    Question.prototype.getAnswer = function(){
        return answer;
    }
    Question.prototype.printQuestion = function (handler) {

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


        this.bindAnswer(handler);
        this.timer(30, handler);
    };

    Question.prototype.destroy = function(){
        clearInterval(this.clockTimer);
    }
    Question.prototype.timer = function (seconds, handler) {
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
            var self = this;
            this.clockTimer = setTimeout(function(){
                self.timer(seconds, handler);
            }, 1000);
        }
    }
    Question.prototype.bindAnswer = function (handler) {
        //TODO esto tiene qu poder hacerse sin el unbind/bind
        $('#questionWrapper .answer').unbind('click').bind('click', function (event) {
            event.preventDefault();
            answer = $(this).data('valid');
            answered = true;
            $(this).closest("#questionWrapper").html('');
            if ($.isFunction(handler)) {
                handler();
            }
        });

    };

    return Question;

})();
