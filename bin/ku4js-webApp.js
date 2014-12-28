(function(s){$.ku4webApp={config:{templates:{}},templates:{},models:{},controllers:{},views:{}};function e(l){e.base.call(this);$.list(l).each(this._add,this)}e.prototype={_add:function(l){var w=$[l.type](l.selector);if($.exists(l.spec)){w.spec(l.spec)}if(l.required&&$.exists(w.required)){w.required()}if($.isNullOrEmpty(w.dom().name)){throw $.ku4exception("form","Form requires all field DOM elements have a valid 'name' attribute")}else{this.add(w.dom().name,w)}}};$.Class.extend(e,$.form.Class);$.ku4webApp.form=function(l){return new e(l)};function i(l){this._container=$(l);this._display="css-responsebox-show"}i.prototype={show:function(l){this._container.html(l).addClass(this._display)},hide:function(){this._container.html("").removeClass(this._display)}};$.ku4webApp.responsebox=function(l){return new i(l)};function m(l){this._config=l}m.prototype={validate:function(x){var l=this._config,z=true,w=$.hash({}),y=x||$.dto();$.list(l).each(function(D){var B=D.name,A=D.spec,C=D.message,E=y.find(B);if(A.isSatisfiedBy(E)){return}z=false;w.add(B,C)});return{isValid:z,messages:w.toObject()}}};$.ku4webApp.validator=function(l){return new m(l)};function d(x,w,l){this._modelFactory=u("controllers","modelFactory",x);this._formFactory=u("controllers","formFactory",w);this._navigator=l}d.prototype={$model:function(l){return this._modelFactory.create(l)},$form:function(l){return this._formFactory.create(l)},$navigator:function(){return this._navigator}};$.ku4webApp.abstractController=d;$.ku4webApp.controller=function(w,x){function l(A,z,y){l.base.call(this,A,z,y)}l.prototype=x;$.Class.extend(l,d);$.ku4webApp.controllers[w]=function(A){var y=$.str.format("$.ku4webApp.controllers.{0}",w),z=$.str.format("Requires a valid app. app= {0}",A);if(!$.exists(A)){throw $.ku4exception(y,z)}return new l(A.modelFactory,A.formFactory,A.navigator)}};function q(x,l,y,w){this._mediator=u("models","mediator",x);this._serviceFactory=u("models","serviceFactory",l);this._storeFactory=u("models","storeFactory",y);this._validatorFactory=u("models","validatorFactory",w);this._state=new k()}q.prototype={$collection:function(l){return this._storeFactory.create(l)},$service:function(l){return this._serviceFactory.create(l)},$validator:function(l){return this._validatorFactory.create(l)},$state:function(){return this._state},$appState:function(l){if(!$.exists(l)){return a}a=new k(l);return this},$notify:function(){var l=this._mediator;l.notify.apply(l,arguments);return this}};$.ku4webApp.abstractModel=q;$.ku4webApp.model=function(w,x,y){function l(B,z,C,A){l.base.call(this,B,z,C,A)}l.prototype=x;$.Class.extend(l,q);$.ku4webApp.models[w]=function(B,z,C,A){var D=new l(B,z,C,A);if($.exists(y)){$.hash(y).each(function(F){var E=F.key;B.unsubscribe(E,w).subscribe(E,D[F.value],D,w)})}return D}};function v(w,l){this._mediator=w;this._config=l;this._noCache=false}v.prototype={noCache:function(){this._noCache=true;return this},call:function(y){var w=this._config,x=this._mediator,l=$.service()[w.verb]().uri(w.uri);l.contentType(w.contentType);if(this._noCache){l.noCache()}l.onSuccess(function(z){if($.exists(w.success)){x.notify(z,l.processId(),w.success)}},this).onError(function(z){if($.exists(w.error)){x.notify(z,l.processId(),w.error)}},this).call(y);return l}};$.ku4webApp.service=function(w,l){return new v(w,l)};function k(l){this._value=l;this._data=$.hash()}k.prototype={is:function(l){return this._value===l},set:function(l){this._value=l;return this},read:function(l){return this._data.findValue(l)},write:function(l,w){this._data.update(l,w);return this}};var a=new k("__ku4appStarted__");function n(x,l,w,y){this._mediator=x;this._config=l;this._key=w;this._collection=y}n.prototype={init:function(l){this._collection=null;this.__collection().init(l).save();return this},find:function(x){var l=this.__config(),w=this.__collection().find(x);if($.exists(l.find)){this._mediator.notify(w,l.find)}return w},insert:function(x){var l=this.__config(),w=$.str.format('Cannot insert invalid type: {1} into Collection["{0}"]',l.name,x),y=this.__collection();if(!$.exists(x)){throw $.ku4exception("Collection",w)}y.insert(x).save();if($.exists(l.insert)){this._mediator.notify(y,l.insert)}return this},insertList:function(l){this.__collection().insertList(l).save();return this},update:function(A,x){var w=this.__config(),l=$.str.format('Cannot update type: {1} into Collection["{0}"]',w.name,x);if(!$.exists(x)){throw $.ku4exception("Collection",l)}var y=($.exists(x.toObject))?x.toObject():x;var z=this.__collection().update(A,y).save();if($.exists(w.update)){this._mediator.notify(z,w.update)}return this},remove:function(w){var x=($.exists(w)&&$.exists(w.toObject))?w.toObject():w,l=this.__config(),y=this.__collection().remove(x).save();if($.exists(l.remove)){this._mediator.notify(y,l.remove)}return this},join:function(){var y=this._config,l=arguments[0],E=arguments[1],x=arguments[2],G=arguments[3],F=y[l],A=($.exists(F))?F.name:l,C=this.__collection(),z=$.ku4store().read(A),w=C.join(z,E,x,G),D=w.name(),B=$.hash(y).replicate().add(D,{name:D}).toObject();return new n(this._mediator,B,D,w)},exec:function(l){this._collection=this.__collection().exec(l);return this},__config:function(){return u("Collection","config",this._config[this._key])},__collection:function(){var l=this._collection;return($.exists(l))?l:$.ku4store().read(this.__config().name)}};$.ku4webApp.store=function(x,l,w,y){return new n(x,l,w,y)};function f(y,w){var x=this;function l(){if(!x._isInternalChange&&$.exists(w)){var D=w[x.read()];if($.exists(D)){var z=D.model,A=D.method;if($.exists(z)&&$.exists(A)){try{var B=y.create(z);B[A]()}catch(C){throw $.ku4exception("ku4webApp.navigator",$.str.format("Invalid configuration. model: {0}, method: {1}, \\error: {2}",z,A,C.message))}}}}x._isInternalChange=false}if($.exists(window.addEventListener)){window.addEventListener("hashchange",l)}else{if($.exists(window.attachEvent)){window.attachEvent("onhashchange",l)}}this._isInternalChange=false}f.prototype={hash:function(l){return($.exists(l))?this.write(l):this.read()},read:function(){return location.hash.substr(1)},write:function(w){var l=this.read();this._isInternalChange=(l==w)?false:true;location.hash=w;return this},forward:function(){window.history.forward();return this},back:function(){window.history.back();return this}};$.ku4webApp.navigator=function(w,l){return new f(w,l)};function r(l){this._config=u("templates","config",l)}r.prototype={$config:function(l){return($.exists(l))?this._config[l]:this._config},$forms:function(l){return($.exists(l))?this._config.forms[l]:this._config.forms},$views:function(l){return($.exists(l))?this._config.views[l]:this._config.views},$render:function(l,w){return $.str.render(l,w)},$renderList:function(x,w){var l="";$.list(w).each(function(y){l+=this.$render(x,y)},this);return l},$renderListWithAction:function(w,x){var l="";$.list(w).each(function(y){l+=x.call(this,y)},this);return l}};$.ku4webApp.abstractTemplate=r;$.ku4webApp.template=function(l,x){function w(y){w.base.call(this,y)}w.prototype=x;$.Class.extend(w,r);$.ku4webApp.templates[l]=function(y){var z=u($.str.format("templates.{0}",l),"config",y);return new w(z)}};function b(x,w,l){this._templateFactory=u("views","templateFactory",x);this._formFactory=u("views","formFactory",w);this._navigator=u("models","navigator",l)}b.prototype={$template:function(l){return this._templateFactory.create(l)},$form:function(l){return this._formFactory.create(l)},$navigator:function(){return this._navigator}};$.ku4webApp.abstractView=b;$.ku4webApp.__views={};$.ku4webApp.view=function(w,x,y){function l(B,A,z){l.base.call(this,B,A,z)}l.prototype=x;$.Class.extend(l,b);$.ku4webApp.views[w]=function(B){var z=$.str.format("$.ku4webApp.views.{0}",w),A=$.str.format("Requires a valid app. app= {0}",B);if(!$.exists(B)){throw $.ku4exception(z,A)}if(!$.exists($.ku4webApp.__views[w])){var C=new l(B.templateFactory,B.formFactory,B.navigator);if($.exists(y)){$.hash(y).each(function(D){B.mediator.subscribe(D.key,C[D.value],C)})}$.ku4webApp.__views[w]=C}return $.ku4webApp.__views[w]}};function g(l){this._config=l}g.prototype={create:function(l){return $.ku4webApp.form(this._config[l])}};$.ku4webApp.formFactory=function(l){return new g(l)};function j(x,l,y,w){var z=$.hash();$.hash($.ku4webApp.models).each(function(A){z.add(A.key,A.value(x,l,y,w))},this);this._models=z}j.prototype={create:function(l){return this._models.find(l)}};$.ku4webApp.modelFactory=function(x,l,y,w){return new j(x,l,y,w)};function c(w,l){this._mediator=w;this._config=l}c.prototype={create:function(l){return $.ku4webApp.service(this._mediator,this._config[l])}};$.ku4webApp.serviceFactory=function(w,l){return new c(w,l)};function t(w,l){this._mediator=w;this._config=l}t.prototype={create:function(l){return $.ku4webApp.store(this._mediator,this._config,l)}};$.ku4webApp.storeFactory=function(w,l){return new t(w,l)};function p(l){this._config=l}p.prototype={create:function(l){return $.ku4webApp.templates[l](this._config)}};$.ku4webApp.templateFactory=function(l){return new p(l)};function h(l){this._config=l}h.prototype={create:function(l){return $.ku4webApp.validator(this._config[l])}};$.ku4webApp.validatorFactory=function(l){return new h(l)};function o(){var z=$.ku4webApp,x=$.mediator(),l=z.serviceFactory(x,z.config.services),y=z.storeFactory(x,z.config.collections),w=z.validatorFactory(z.config.validators);this.modelFactory=z.modelFactory(x,l,y,w);this.templateFactory=z.templateFactory(z.config.templates);this.formFactory=z.formFactory(z.config.forms);this.navigator=z.navigator(this.modelFactory,z.config.hash);this.mediator=x}o.prototype={logErrors:function(){this.mediator.logErrors();return this},throwErrors:function(){this.mediator.throwErrors();return this}};$.ku4webApp.app=function(){return new o()};function u(x,l,z){var y=$.str.format("$.ku4webApp.{0}",x),w=$.str.format("Requires a valid {0}. {0}= {1}",l,z);if(!$.exists(z)){throw $.ku4exception(y,w)}else{return z}}})();