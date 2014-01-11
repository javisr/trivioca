class window.Player
  constructor: (@name, totalBox) ->
    lastBox = totalBox
  box = 0
  waitingTurns = 0
  dice = new Dice();

  moveToBox: (newBox) ->
    box = newBox

  currentBox: ->
    box

  setWaitingTurns: (turn)->
    waitingTurns = turns

  turn: ->
    if waitingTurns is 0

      box += dice.throw()
    else
      waitingTurns--




