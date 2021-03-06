var __ku4socket, io;
function socketInstance() {
    if($.isUndefined(__ku4socket)) __ku4socket = ($.exists(io)) ? io() : null;
    return __ku4socket;
}
function socket(mediator, config) {

    if(!$.exists(config.event)) throw new Error("Invalid socket event configuration");
    this._event = config.event;

    var socket = socketInstance();

    if(!$.exists(socket)) throw new Error("Missing socket.io dependency. Add socket.io to your application.");
    if($.exists(config.success))
        socket.on(this._event, function(data) { mediator.notify(config.success, data); });
    if($.exists(config.error))
        socket.on("error", function(data) { mediator.notify(config.error, data); });
}
socket.prototype = {
    call: function(data) { socketInstance().emit(this._event, data); }
};
$.ku4webApp.socket = function(mediator, config) {
    return new socket(mediator, config);
};