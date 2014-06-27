var UI = (function () {

    var ui, game, html;

    function UI(_game) {
        game = _game;
        ui = this;
        html = $('.principal-wrapper');
        html
            .on('click', '#add_player_btn', this.addPlayer)
            .on('keypress', '#player',this.enterOnPlayerInput )
            .on('click', '#start_btn', this.startGame)

    };


    UI.prototype.addPlayer = function () {
        if ($("#player").length > 0 && $("#players_list ol").lengh > 0) {
            var player = $("#player").val();
            game.newPlayer(player);
            $("#players_list ol").append('<li>' + player + '</li>');
            $("#player").val("");
        }

    };

    UI.prototype.enterOnPlayerInput = function (e) {
        if (e.which == 13) {//Enter key pressed
            $('#add_player_btn').click();//Trigger same click event
        }
    };

    UI.prototype.startGame = function () {

        if (game.getPlayersNumber() >= 2) {
            game.startGame();
            game.play();
        } else {
            //TODO
            alert('Minimo dos jugadores');
        }

    };


    return UI;

})();
