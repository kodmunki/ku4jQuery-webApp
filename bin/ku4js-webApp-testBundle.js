(function(c){$.ku4webApp_testBundle={};$.ku4webAppUT={};function i(){var j=$.ku4webApp_testBundle.app();this._mediator=j.mediator;this._navigator=j.navigator;this._app=j}i.prototype={mediator:function(){return this._mediator},navigator:function(){return this._navigator},logErrors:function(){this._mediator.logErrors();this._navigator.logErrors();return this},throwErrors:function(){this._mediator.throwErrors();this._navigator.throwErrors();return this},catchErrors:function(){this._mediator.catchErrors();this._navigator.catchErrors();return this},callback:function(j){$.ku4webApp_testBundle.callback=j;return this},onModelCall:function(k,j){$.ku4webApp_testBundle.onModelCall=j;return this},form:function(j){return this._app.formFactory.create(j)},model:function(j){var k=this._app.prodModel();return $.ku4webApp.models[j](this._mediator,k.serviceFactory,k.socketFactory,k.storeFactory,k.validatorFactory)},view:function(j){return $.ku4webApp.views[j](this._app.prodModel())},controller:function(j){return $.ku4webApp.controllers[j](this._app.stubModel())},template:function(j){return this._app.prodModel().templateFactory.create(j)}};$.ku4webAppUT.bundle=function(){return new i()};function b(){var j=$.ku4webApp;this.mediator=$.mediator();this.serviceFactory=$.ku4webApp_testBundle.serviceFactory(this.mediator,j.config.services);this.socketFactory=$.ku4webApp_testBundle.socketFactory(this.mediator,j.config.sockets);this.storeFactory=j.storeFactory(this.mediator,j.config.collections);this.validatorFactory=j.validatorFactory(j.config.validators);this.templateFactory=j.templateFactory(j.config.templates);this.formFactory=j.formFactory(j.config.forms);this.prodModel();this.navigator=j.navigator(this.modelFactory,j.config.navigator)}b.prototype={logErrors:function(){this.mediator.logErrors();return this},throwErrors:function(){this.mediator.throwErrors();return this},stubModel:function(){this.modelFactory=$.ku4webApp_testBundle.stubModelFactory(this.mediator,this.serviceFactory,this.socketFactory,this.storeFactory,this.validatorFactory);return this},prodModel:function(){this.modelFactory=$.ku4webApp_testBundle.testModelFactory(this.mediator,this.serviceFactory,this.socketFactory,this.storeFactory,this.validatorFactory);return this}};$.ku4webApp_testBundle.app=function(){return new b()};function g(l,j,n){var m=$.str.format("$.ku4webApp.{0}",l),k=$.str.format("Requires a valid {0}. {0}= {1}",j,n);if(!$.exists(n)){throw $.ku4exception(m,k)}else{return n}}$.ku4webApp_testBundle.onModelCall=function(){return};$.ku4webApp_testBundle.model=function(l,j,t,k,m,r){var s=$.ku4webApp.models[l](j,t,k,m,r),q={};function p(){$.ku4webApp_testBundle.onModelCall.apply(this,arguments);$.ku4webApp_testBundle.onModelCall=function(){return}}for(var o in s){q[o]=p}return q};function f(k,j){this._mediator=k;this._config=j}f.prototype={call:function(m){var k=this._config,n=$.ku4webApp_testBundle.callback||function(o){return o},j=n(m),l=/^__error__$/i.test(j);if(!$.exists(k)){throw $.ku4exception("$.service","Test Bundle services require a valid config containing a 'success':[data] and an 'error':[data] configuration.")}if($.exists(k.error)&&l){this._mediator.notify(k.error,j)}else{if($.exists(k.success)){this._mediator.notify(k.success,j)}}$.ku4webApp_testBundle.callback=function(o){return o};return this}};$.ku4webApp_testBundle.service=function(k,j){return new f(k,j)};function h(m,j,k,n,l){this._mediator=m;this._serviceFactory=j;this._socketFactory=k;this._storeFactory=n;this._validatorFactory=l}h.prototype={create:function(j){return $.ku4webApp.models[j](this._mediator,this._serviceFactory,this._socketFactory,this._storeFactory,this._validatorFactory)}};$.ku4webApp_testBundle.testModelFactory=function(m,j,k,n,l){return new h(m,j,k,n,l)};function e(k,j){this._mediator=k;this._config=j}e.prototype={create:function(j){return $.ku4webApp_testBundle.service(this._mediator,this._config[j])}};$.ku4webApp_testBundle.serviceFactory=function(k,j){return new e(k,j)};function a(k,j){this._mediator=k;this._config=j}a.prototype={create:function(j){return $.ku4webApp_testBundle.service(this._mediator,this._config[j])}};$.ku4webApp_testBundle.socketFactory=function(k,j){return new a(k,j)};function d(m,j,k,n,l){this._mediator=m;this._serviceFactory=j;this._socketFactory=k;this._storeFactory=n;this._validatorFactory=l}d.prototype={create:function(j){return $.ku4webApp_testBundle.model(j,this._mediator,this._serviceFactory,this._socketFactory,this._storeFactory,this._validatorFactory)}};$.ku4webApp_testBundle.stubModelFactory=function(m,j,k,n,l){return new d(m,j,k,n,l)}})();