window.boardApp = new BoardApp()

console.log 'asdfasdfasdfdsaf'

$('#questionWrapper').on 'click', '.answer', ->
  # event.preventDefault()
  alert 'holaaaaa'


window.loadQuestion = (category='sport') ->
  categoryQuestions = questionDB[category]
  return null unless categoryQuestions?
  categoryQuestions[Math.floor( Math.random() * categoryQuestions.length)]


window.printQuestion = (questionData) ->
  # HTML template
  questionHTML = $("#question").clone()

  # set question text
  questionHTML.find(".questionText").html(questionData.questionText)

  # rmeove answer and create for each one
  answerHTML = questionHTML.find(".answer").remove()
  answerList = questionHTML.find(".answerList")

  for answerData in questionData.answers
    element = answerHTML.clone().html(answerData.text)
    element.data("valid", answerData.valid)
    answerList.append(element)

  delete answersHTML

  # by default this is hide, showing up!
  questionHTML.css('display', '')

  $("#questionWrapper").html(questionHTML.html())

window.showQuestion = ->
  printQuestion(loadQuestion())
