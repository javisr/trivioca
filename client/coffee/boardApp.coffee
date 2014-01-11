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

