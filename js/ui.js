var UI = (function () {

    var ui, game, html;
    var clock; //this var will load the tpl for the timer
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

        var setClock = function(template){
            if(typeof  template === 'string'){
                clock = $(template);
            }
        }
        $.getTemplate('tpl/timer.html').done(setClock);
    }


    UI.prototype.addPlayer = function () {
        if ($("#player").length > 0 && $("#players_list ol").length > 0) {
            var player = $("#player").val();
            if(player != ''){
                player = game.newPlayer(player);
                $("#players_list ol").append('<li id="player-item-' + player.id + '">' + player.name + '</li>');
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


