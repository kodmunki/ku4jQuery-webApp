$.ku4webApp.view = function(name, proto, subscriptions) {

    function view(templateFactory, formFactory) {
        view.base.call(this, templateFactory, formFactory);
    }
    view.prototype = proto;
    $.Class.extend(view, abstractView);

    $.ku4webApp.views[name] = function(app) {
        var className = $.str.format("$.ku4webApp.views.{0}", name),
            message = $.str.format("Requires a valid app. app= {0}", app);
        if(!$.exists(app)) throw $.ku4exception(className, message);

        if(!$.exists(this.__instance)) {
            var _view = new view(app.templateFactory, app.formFactory);
            if($.exists(subscriptions))
                $.hash(subscriptions).each(function(obj) {
                    app.mediator.subscribe(obj.key, _view[obj.value], _view);
                });
            this.__instance = _view;
        }
        return this.__instance;
    }
}