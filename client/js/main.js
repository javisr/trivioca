boardApp = new BoardApp(boardData);

$('#questionWrapper').on('click', '.answer', function (event) {
    event.preventDefault();
    alert($(this).data('valid'));
    return $(this).closest("#questionWrapper").html('');
});