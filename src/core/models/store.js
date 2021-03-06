function store(mediator, config, key, collection) {
    this._mediator = mediator;
    this._config = config;
    this._key = key;
    this._collection = collection;
}
store.prototype = {
    init: function(list, callback, scope) {
        var _callback = callback || function() {},
            scp = scope || this;
        this.__collection(function(err, collection) {
            if($.exists(err)) _callback.call(scp, err, null);
            else collection.init(list).save(function(err) {
                _callback.call(scp, err, this);
            }, this);
        }, this);
        return this;
    },
    find: function(criteria, callback, scope) {
        var config = this.__config(),
            _callback = callback || function() {},
            scp = scope || this;

        this.__collection(function(err, collection) {
            if($.exists(err)) _callback.call(scp, err, null);
            else {
                var results = collection.find(criteria);
                _callback.call(scp, null, results);
                if ($.exists(config.find)) this._mediator.notify(config.find, data);
            }
        }, this)
    },
    insert: function(dto, callback, scope) {
        var config = this.__config(),
            message = $.str.format("Cannot insert invalid type: {1} into Collection[\"{0}\"]", config.name, dto),
            _callback = callback || function() {},
            scp = scope || this;

        this.__collection(function(err, collection) {
            if($.exists(err)) _callback.call(scp, err, null);
            else if(!$.exists(dto)) throw $.ku4exception("Collection", message);
            else collection.insert(dto).save(function(err) {
                _callback.call(scp, err, this);
                if($.exists(config.insert)) this._mediator.notify(config.insert, collection);
            }, this);
        }, this);
        return this;
    },
    insertList: function(list, callback, scope) {
        var config = this.__config(),
            _callback = callback || function() {},
            scp = scope || this;

        this.__collection(function(err, collection) {
            if($.exists(err)) _callback.call(scp, err, null);
            else collection.insertList(list).save(function(err) {
                _callback.call(scp, err, this);
                if($.exists(config.insert)) this._mediator.notify(config.insert, collection);
            }, this);
        }, this);
        return this;
    },
    update: function(criteria, dto, callback, scope) {
        var config = this.__config(),
            _message = $.str.format("Cannot update type: {1} into Collection[\"{0}\"]", config.name, dto),
            _callback = callback || function() {},
            scp = scope || this;

        if(!$.exists(dto)) throw $.ku4exception("Collection", _message);
        var obj = ($.exists(dto.toObject)) ? dto.toObject() : dto;

        this.__collection(function(err, collection) {
            if($.exists(err)) _callback.call(scp, err, null);
            else collection.update(criteria, obj).save(function(err) {
                _callback.call(scp, err, this);
                if($.exists(config.update)) this._mediator.notify(config.update, collection);
            }, this);
        }, this);
        return this;
    },
    remove: function(dto, callback, scope) {
        var dtoIsFunction = $.isFunction(dto),
            _dto = (dtoIsFunction) ? null : dto,
            _callback = (dtoIsFunction) ? dto : callback,
            _scope = (dtoIsFunction) ? callback : scope,
            obj = ($.exists(_dto) && $.exists(_dto.toObject)) ? _dto.toObject() : _dto,
            config = this.__config(),
            __callback = _callback || function() {},
            scp = _scope || this;

        this.__collection(function(err, collection){
            if($.exists(err)) __callback.call(scp, err, null);
            else collection.remove(obj).save(function(err) {
                __callback.call(scp, err, this);
                if($.exists(config.remove)) this._mediator.notify(config.remove, collection);
            }, this);
        }, this);
        return this;
    },
    join: function() {
        var config = this._config,
            name = arguments[0],
            arg1 = arguments[1],
            arg2 = arguments[2],
            arg3 = arguments[3],
            arg4 = arguments[4],
            arg5 = arguments[5],

            threeArg =  arguments.length == 3,  //(name,    method(),   callback())
            fourArg =   arguments.length == 4,  //(name,    method(),   "direction",    callback())
            fiveArg =   arguments.length == 5,  //(name,    "key",      "value",        "direction",    callback())

            collectionConfig = config[name],
            joinName = ($.exists(collectionConfig)) ? collectionConfig.name : name,

            _callback = (threeArg) ? arg2 : (fourArg) ? arg3 : arg4,
            _scope = (threeArg) ? arg3 : (fourArg) ? arg4 : arg5,
            __callback = _callback || function() {},
            scp = _scope || this;

        this.__collection(function(err, collection1) {
            this.__store().read(joinName, function(err, collection2) {
                var join = (function() {
                    if(threeArg)    return collection1.join(collection2, arg1);
                    if(fourArg)     return collection1.join(collection2, arg1, arg2);
                    if(fiveArg)     return collection1.join(collection2, arg1, arg2, arg3);
                    return null;
                })();

                if(!$.exists(join)) __callback.call(scp, $.ku4exception("$.ku4webApp.store", "Join exception"));
                else {
                    var join_name = join.name(),
                        newConfig = $.hash(config).replicate().add(join_name, { name: join_name }).toObject(),
                        joinStore = new store(this._mediator, newConfig, join_name, join);
                    __callback.call(scp, err, joinStore);
                }
            }, this);
        }, this);
    },
    exec: function(func, callback, scope) {
        var _callback = callback || function() {},
            scp = scope || this;

        this.__collection(function(err, collection) {
            if($.exists(err)) _callback.call(scp, err, null);
            else {
                var execStore = new store(this._mediator, this._config, this._key, collection.exec(func));
                _callback.call(scp, err, execStore);
            }
        }, this);
        return this;
    },
    __config: function() {
        return classRefcheck("Collection", "config", this._config[this._key]);
    },
    __store: function() {
        var storeType = this._config.ku4StoreType;
        switch(storeType) {
            case "memory": return $.ku4memoryStore();
            case "indexedDB": return $.ku4indexedDbStore();
            default: return $.ku4localStorageStore();
        }
    },
    __collection: function(callback, scope) {
        var collection = this._collection,
            scp = scope || this;

        if($.exists(collection)) callback.call(scp, null, collection);
        else this.__store().read(this.__config().name, callback, scp);
    }
};
$.ku4webApp.store = function(mediator, config, key, collection) {
    return new store(mediator, config, key, collection);
};