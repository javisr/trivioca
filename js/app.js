board = new Board(boardData);

  $('#questionWrapper').on('click', '.answer', function(event) {
    event.preventDefault();
    alert($(this).data('valid'));
    var currentPlayer = board.getCurrentPlayer();
    var boxInfoPosition = boardData.boxData[currentPlayer.currentBox()];
    var func;
    var funcArgs;
    if ($(this).data('valid') == 'true'){
        func = boxInfoPosition['success_function'];
        funcArgs = boxInfoPosition['success_function_args'];
    }else{
        func = boxInfoPosition['fail_function'];
        funclArgs = boxInfoPosition['fail_function_args'];
    }
    currentPlayer[func](funcArgs);
    board.turn();
    return $(this).closest("#questionWrapper").html('');
  });

  window.loadQuestion = function(category) {
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

  window.printQuestion = function(questionData) {
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

  window.showQuestion = function() {
    return printQuestion(loadQuestion());
  };
