(function(b){$=b;$.ku4webApp_testBundle={};function d(){var j=$.ku4webApp,h=$.mediator(),f=$.ku4webApp_testBundle.serviceFactory(h,j.config.services),i=$.ku4webApp.storeFactory(h,j.config.collections),g=$.ku4webApp.validatorFactory(j.config.validators);this.mediator=h;this.serviceFactory=f;this.storeFactory=i;this.validatorFactory=g;this.modelFactory=j.modelFactory(h,f,i,g);this.templateFactory=j.templateFactory(j.config.templates);this.formFactory=j.formFactory(j.config.forms)}d.prototype={logErrors:function(){this.mediator.logErrors();return this},throwErrors:function(){this.mediator.throwErrors();return this}};$.ku4webApp_testBundle.app=function(){return new d()};function e(h,f,j){var i=$.str.format("$.ku4webApp.{0}",h),g=$.str.format("Requires a valid {0}. {0}= {1}",f,j);if(!$.exists(j)){throw $.ku4exception(i,g)}else{return j}}function a(g,f){this._mediator=g;this._config=f}a.prototype={call:function(g){var h=g.find("success"),f=g.find("error");if($.exists(h)){this._mediator.notify(h,this._config.success)}else{if($.exists(f)){this._mediator.notify(f,this._config.error)}}return this}};$.ku4webApp_testBundle.service=function(g,f){return new a(g,f)};function c(g,f){this._mediator=g;this._config=f}c.prototype={create:function(f){return $.ku4webApp_testBundle.service(this._mediator,this._config[f])}};$.ku4webApp_testBundle.serviceFactory=function(g,f){return new c(g,f)}})(jQuery);