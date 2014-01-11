class window.BoardApp
  constructor: (board_data)->
    @printBoard()
    boardData = board_data

  star: ->
    players[currentPlayer].turn()
    currentPlayer++

  nextTurn: ->
    if(currentPlayer is players.length)
      currentPlayer--
    players[currentPlayer].turn()


  whoStart = ->
    # TODO change it by a real function
    0

  printBoard: ->
    @printNumbers()

  printNumbers: ->
    boxes = $("#board td")
    for box in boxes
      id = box.id
      id = parseInt id.replace('box_', '')
      boxDiv = "<div class=\"box\"> #{id+1} </div>"
      $(box).html boxDiv


  lastBox = boardData.length
  players = [new Player('Player1', lastBox), new Player('Player2',lastBox)]
  currentPlayer = whoStart();

  loadQuestion: (category='sport') ->
    categoryQuestions = questionDB[category]
    return null unless categoryQuestions?
    categoryQuestions[Math.floor( Math.random() * categoryQuestions.length)]

  printQuestion : (questionData) ->
    # HTML template
    questionHTML = $("#question").clone()

    # set question text
    questionHTML.find(".questionText").html(questionData.questionText)

    # rmeove answer and create for each one
    answerHTML = questionHTML.find(".answer").remove()
    answerList = questionHTML.find(".answerList")

    for answerData in questionData.answers
      element = answerHTML.clone().html(answerData.text)
      element.attr("data-valid", answerData.valid)
      answerList.append(element)

    delete answersHTML

    # by default this is hide, showing up!
    questionHTML.css('display', '')

    $("#questionWrapper").html(questionHTML.html())

  showQuestion : ->
    printQuestion(loadQuestion())


