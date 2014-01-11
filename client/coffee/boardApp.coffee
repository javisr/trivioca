class window.BoardApp
  constructor: ->
    @printBoard()

  players = [new Player('Player1'), new Player('Player2')]
  currentPlayer = @whoStart();

  star: ->
    players[currentPlayer].turn()

  whoStart= ->
    # TODO change it by a real function
    0

  throwDice: ->
    Math.floor Math.random() * 6 + 1

  printBoard: ->
    @printNumbers()

  printNumbers: ->
    boxes = $("#board td")
    for box in boxes
      id = box.id
      id = parseInt id.replace('box_', '')
      boxDiv = "<div class=\"box\"> #{id+1} </div>"
      $(box).html boxDiv




