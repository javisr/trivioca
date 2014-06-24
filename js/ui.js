var UI = (function () {

    var ui, game;

    function UI(_game) {
        game = _game;
        ui = this;
    }

    UI.prototype.functions = {
        'add_player_btn' : {
            'click' : function(){
                //Get the player name inserted
                var player = $("#player").val();
                game.newPlayer(player);
                //Add player to the list
                $("#players_list ol").append('<li>'+player+'</li>');
                //Clear input
                $("#player").val("");

            }
        },

    };


    UI.prototype.handleCustomEvent = function(event){
        var target = $(event.target);
        var id = target.prop('id');
        var eventType = event.type;
        if(typeof ui.functions[id] != 'undefined'){
            if( $.isFunction(ui.functions[id][eventType])){
                ui.functions[id][eventType]();
            }
        }
    }

    return UI;

})();


/*
 $("#add_player_btn").click(function() {
 //Get the player name inserted
 var player = $("#player").val();
 game.newPlayer(player);
 //Add player to the list
 $("#players_list ol").append('<li>'+player+'</li>');
 //Clear input
 $("#player").val("");
 });
 $('#player').keypress(function(e){
 if(e.which == 13){//Enter key pressed
 $('#add_player_btn').click();//Trigger same click event
 }
 });
 $("#start_btn").click(function() {
 if(game.getPlayersNumber()>=2){
 game.startGame();
 game.play();
 }else{
 //TODO
 alert('Minimo dos jugadores');
 }
 });
 */