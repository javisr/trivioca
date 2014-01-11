
window.boardApp = new BoardApp(boardData)

$('#questionWrapper').on 'click', '.answer', (event) ->
  event.preventDefault()
  alert $(@).data('valid')
  $(@).closest("#questionWrapper").html('')
