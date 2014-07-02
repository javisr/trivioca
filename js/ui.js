var UI = (function () {

    var ui, game, html;
    var clock;
    function UI(_game) {

        game = _game;
        ui = this;
        this.init();
        html = $('.principal-wrapper');
        html.on('click', '#add_player_btn', this.addPlayer)
            .on('keypress', '#player',this.enterOnPlayerInput )
            .on('click', '#no_more_players', this.startGame)
            .on('click', '#play_btn', this.startTurn)

    };

    UI.prototype.init = function(){
        clock = $('#countdown').remove();
    }


    UI.prototype.addPlayer = function () {
        if ($("#player").length > 0 && $("#players_list ol").length > 0) {
            var player = $("#player").val();
            if(player != ''){
                game.newPlayer(player);
                $("#players_list ol").append('<li>' + player + '</li>');
                $("#player").val("");
            }
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
           html.find('#play_btn').show();
            html.find('#add_users_block').remove();
        } else {
            //TODO
            alert('Minimo dos jugadores');
        }

    };

    UI.prototype.startTurn = function(){
        var turnBtn = html.find('#play_btn');
        turnBtn.prop('disabled' , true );
        html.find('#right_bar').append(clock);
        game.play();
    };

    UI.prototype.prepareTurn = function(){
        var turnBtn = html.find('#play_btn');
        html.find('#countdown').remove();
        html.find('#questionWrapper').html('');
        turnBtn.prop('disabled' , false );
    }

    return UI;

})();


