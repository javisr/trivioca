class window.Player
  constructor: (@name) ->

  box = 0
  waitingTurns = 0

  moveToBox: (newBox) ->
    box = newBox

  currentBox: ->
    box

  setWaitingTurns: (turn)->
    waitingTurns = turns

