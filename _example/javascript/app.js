var cardController;
$(function(){
    var app = $.ku4webApp.app("example");

    cardController = $.ku4webApp.controllers.card(app);
    $.ku4webApp.views.card(app);

    app.navigator.tryRouteOrHash("card.list");
});