(function(p){$=p;$.ku4webApp={config:{templates:{}},templates:{},models:{},controllers:{},views:{}};function d(l){d.base.call(this);$.list(l).each(this._add,this)}d.prototype={_add:function(l){var t=$[l.type](l.selector);if($.exists(l.spec)){t.spec(l.spec)}if(l.required&&$.exists(t.required)){t.required()}this.add(t.dom().name,t)}};$.Class.extend(d,$.form.Class);$.ku4webApp.form=function(l){return new d(l)};function g(l){this._container=$(l);this._display="css-responsebox-show"}g.prototype={show:function(l){this._container.html(l).addClass(this._display)},hide:function(){this._container.html("").removeClass(this._display)}};$.ku4webApp.responsebox=function(l){return new g(l)};function i(l){this._config=l}i.prototype={validate:function(u){var l=this._config,w=true,t=$.hash({}),v=u||$.dto();$.list(l).each(function(A){var y=A.name,x=A.spec,z=A.message,B=v.find(y);if(x.isSatisfiedBy(B)){return}w=false;t.add(y,z)});return{isValid:w,messages:t.toObject()}}};$.ku4webApp.validator=function(l){return new i(l)};function k(){var w=$.ku4webApp,u=$.mediator(),l=w.serviceFactory(u,w.config.services),v=w.storeFactory(u,w.config.collections),t=w.validatorFactory(w.config.validators);this.mediator=u;this.modelFactory=w.modelFactory(u,l,v,t);this.templateFactory=w.templateFactory(w.config.templates);this.formFactory=w.formFactory(w.config.forms);this.responsebox=w.responsebox(".ku4webApp-responsebox")}k.prototype={throwErrors:function(){this.mediator.throwErrors();return this}};$.ku4webApp.app=function(){return new k()};function r(u,l,w){var v=$.str.format("$.ku4webApp.{0}",u),t=$.str.format("Requires a valid {0}. {0}= {1}",l,w);if(!$.exists(w)){throw $.ku4exception(v,t)}else{return w}}function c(t,l){this._modelFactory=r("controllers","modelFactory",t);this._formFactory=r("controllers","formFactory",l)}c.prototype={$model:function(l){return this._modelFactory.create(l)},$form:function(l){return this._formFactory.create(l)}};$.ku4webApp.abstractController=c;$.ku4webApp.controller=function(t,u){function l(x,v,w){l.base.call(this,x,v,w)}l.prototype=u;$.Class.extend(l,c);$.ku4webApp.controllers[t]=function(x){var v=$.str.format("$.ku4webApp.controllers.{0}",t),w=$.str.format("Requires a valid app. app= {0}",x);if(!$.exists(x)){throw $.ku4exception(v,w)}return new l(x.modelFactory,x.formFactory,x.validatorFactory)}};function n(u,l,v,t){this._mediator=r("models","mediator",u);this._serviceFactory=r("models","serviceFactory",l);this._storeFactory=r("models","storeFactory",v);this._validatorFactory=r("models","validatorFactory",t)}n.prototype={$collection:function(l){return this._storeFactory.create(l)},$service:function(l){return this._serviceFactory.create(l)},$validator:function(l){return this._validatorFactory.create(l)},$notify:function(){var l=this._mediator;l.notify.apply(l,arguments);return this}};$.ku4webApp.abstractModel=n;$.ku4webApp.model=function(t,u,v){function l(y,w,z,x){l.base.call(this,y,w,z,x)}l.prototype=u;$.Class.extend(l,n);$.ku4webApp.models[t]=function(y,w,z,x){var A=new l(y,w,z,x);if($.exists(v)){$.hash(v).each(function(B){y.subscribe(B.key,A[B.value],A)})}return A}};function s(t,l){this._mediator=t;this._config=l}s.prototype={call:function(t){var l=this._config,u=this._mediator,v=(!$.exists(t))?"":($.exists(t.toQueryString))?t.toQueryString():$.dto(t).toQueryString();$.service()[l.verb]().uri(l.uri).onSuccess(function(w){var x=$.dto.parseJson(w).toObject();if(x.isError&&$.exists(l.error)){u.notify(x,l.error)}else{if($.exists(l.success)){u.notify(x,l.success)}}},this).onError(function(w){if($.exists(l.error)){u.notify(w,l.error)}},this).call(v);return this}};$.ku4webApp.service=function(t,l){return new s(t,l)};function j(t,l){this._mediator=t;this._config=l}j.prototype={insert:function(u){var t=r("Collection","config",this._config),l=$.str.format('Cannot insert invalid type: {1} into Collection["{0}"]',t.name,u);if(!$.exists(u)){throw $.ku4exception("Collection",l)}var v=($.exists(u.toObject))?u.toObject():u,w=$.ku4store().read(t.name);w.insert(v);w.save();if($.exists(t.insert)){this._mediator.notify(w,t.insert)}return this},find:function(v){var l=r("Collection","config",this._config),u=$.ku4store().read(l.name),t=u.find(v);if($.exists(l.find)){this._mediator.notify(t,l.find)}return t},update:function(u){var t=r("Collection","config",this._config),l=$.str.format('Cannot update type: {1} into Collection["{0}"]',t.name,u);if(!$.exists(u)){throw $.ku4exception("Collection",l)}var v=($.exists(u.toObject))?u.toObject():u,w=$.ku4store().read(t.name).update({_ku4Id:v._ku4Id},v).save();if($.exists(t.update)){this._mediator.notify(w,t.update)}return this},remove:function(t){var l=r("Collection","config",this._config),u=($.exists(t)&&$.exists(t.toObject))?t.toObject():t,v=$.ku4store().read(l.name).remove(u).save();if($.exists(l.remove)){this._mediator.notify(v,l.remove)}return this}};$.ku4webApp.store=function(t,l){return new j(t,l)};function o(l){this._config=r("templates","config",l)}o.prototype={$config:function(l){return($.exists(l))?this._config[l]:this._config},$forms:function(l){return($.exists(l))?this._config.forms[l]:this._config.forms},$views:function(l){return($.exists(l))?this._config.views[l]:this._config.views},$render:function(l,t){return $.str.render(l,t)},$renderList:function(u,t){var l="";$.list(t).each(function(v){l+=this.$render(u,v)},this);return l},$renderListWithAction:function(t,u){var l="";$.list(t).each(function(v){l+=u.call(this,v)},this);return l}};$.ku4webApp.abstractTemplate=o;$.ku4webApp.template=function(l,u){function t(v){t.base.call(this,v)}t.prototype=u;$.Class.extend(t,o);$.ku4webApp.templates[l]=function(v){var w=r($.str.format("templates.{0}",l),"config",v);return new t(w)}};function a(t,l){this._templateFactory=r("views","templateFactory",t);this._formFactory=r("views","formFactory",l)}a.prototype={$template:function(l){return this._templateFactory.create(l)},$form:function(l){return this._formFactory.create(l)}};$.ku4webApp.abstractView=a;$.ku4webApp.view=function(t,u,v){function l(x,w){l.base.call(this,x,w)}l.prototype=u;$.Class.extend(l,a);$.ku4webApp.views[t]=function(y){var w=$.str.format("$.ku4webApp.views.{0}",t),x=$.str.format("Requires a valid app. app= {0}",y);if(!$.exists(y)){throw $.ku4exception(w,x)}var z=new l(y.templateFactory,y.formFactory);if($.exists(v)){$.hash(v).each(function(A){y.mediator.subscribe(A.key,z[A.value],z)})}return z}};function e(l){this._config=l}e.prototype={create:function(l){return $.ku4webApp.form(this._config[l])}};$.ku4webApp.formFactory=function(l){return new e(l)};function h(u,l,v,t){this._mediator=u;this._serviceFactory=l;this._storeFactory=v;this._validatorFactory=t}h.prototype={create:function(l){return $.ku4webApp.models[l](this._mediator,this._serviceFactory,this._storeFactory,this._validatorFactory)}};$.ku4webApp.modelFactory=function(u,l,v,t){return new h(u,l,v,t)};function b(t,l){this._mediator=t;this._config=l}b.prototype={create:function(l){return $.ku4webApp.service(this._mediator,this._config[l])}};$.ku4webApp.serviceFactory=function(t,l){return new b(t,l)};function q(t,l){this._mediator=t;this._config=l}q.prototype={create:function(l){return $.ku4webApp.store(this._mediator,this._config[l])}};$.ku4webApp.storeFactory=function(t,l){return new q(t,l)};function m(l){this._config=l}m.prototype={create:function(l){return $.ku4webApp.templates[l](this._config)}};$.ku4webApp.templateFactory=function(l){return new m(l)};function f(l){this._config=l}f.prototype={create:function(l){return $.ku4webApp.validator(this._config[l])}};$.ku4webApp.validatorFactory=function(l){return new f(l)}})(jQuery);