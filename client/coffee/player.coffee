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
    waitingTurns = turn

  turn: ->
    returned = {}
    if waitingTurns is 0
        box += dice.throw()
        box -= (box - lastBox) if (box > lastBox)
        returned = {'next': false, 'box': box }
    else
      waitingTurns--
      returned = {'next': true}
    returned




