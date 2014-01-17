(function(g){$=g;$.ku4webApp={config:{templates:{}},templates:{},controllers:{},views:{}};function b(l){b.base.call(this);$.list(l).each(this._add,this)}b.prototype={_add:function(l){var q=$[l.type](l.selector);if($.exists(l.spec)){q.spec(l.spec)}if(l.required&&$.exists(q.required)){q.required()}this.add(q.dom().name,q)}};$.Class.extend(b,$.form.Class);$.ku4webApp.form=function(l){return new b(l)};function f(l){this._container=$(l);this._display="css-responsebox-show"}f.prototype={show:function(l){this._container.html(l).addClass(this._display)},hide:function(){this._container.html("").removeClass(this._display)}};$.ku4webApp.responsebox=function(l){return new f(l)};function j(l){this._config=l}j.prototype={validate:function(s){var q=this._config,t=true,r=$.hash({}),l=s.fields();$.list(q).each(function(w){var u=w.name,v=w.message,x=l.find(u);if(!$.exists(x)||x.isValid()){return}t=false;r.add(u,v)});return{isValid:t,messages:r.toObject()}}};$.ku4webApp.validator=function(l){return new j(l)};function e(){var l=$.ku4webApp;this.mediator=$.mediator();this.serviceFactory=l.serviceFactory(this.mediator,l.config.services);this.store=l.store(this.mediator,l.config.store);this.templateFactory=l.templateFactory(l.config.templates);this.formFactory=l.formFactory(l.config.forms);this.validatorFactory=l.validatorFactory(l.config.validators);this.responsebox=l.responsebox(".ku4webApp-responsebox")}$.ku4webApp.app=function(){return new e()};function h(t,r,l,q,s){this._mediator=t;this._serviceFactory=r;this._store=l;this._formFactory=q;this._validatorFactory=s}h.prototype={$mediator:function(){return this._mediator},$store:function(){return this._store},$service:function(l){return this._serviceFactory.create(l)},$validate:function(q){var r=this._formFactory.create(q),l=this._validatorFactory.create(q);return l.validate(r)},$read:function(l){return this._formFactory.create(l).read()},$clear:function(l){this._formFactory.create(l).clear();return this},$notify:function(){var l=this._mediator;l.notify.apply(l,arguments);return this}};$.ku4webApp.abstractController=h;$.ku4webApp.controller=function(q,r){function l(w,u,s,t,v){l.base.call(this,w,u,s,t,v)}l.prototype=r;$.Class.extend(l,h);$.ku4webApp.controllers[q]=function(s){return new l(s.mediator,s.serviceFactory,s.store,s.formFactory,s.validatorFactory)}};function m(q,l){this._mediator=q;this._config=l}m.prototype={call:function(q){var l=this._config,r=this._mediator,s=(!$.exists(q))?"":($.exists(q.toQueryString))?q.toQueryString():$.dto(q).toQueryString();$.service()[l.verb]().uri(l.uri).onSuccess(function(t){var u=$.dto.parseJson(t).toObject();if(u.isError&&$.exists(l.error)){r.notify(u,l.error)}else{if($.exists(l.success)){r.notify(u.data,l.success)}}},this).onError(function(t){if($.exists(l.error)){r.notify(t,l.error)}},this).call(s);return this}};$.ku4webApp.service=function(q,l){return new m(q,l)};function o(q,l){this._mediator=q;this._config=l}o.prototype={create:function(q,r){var l=this._config[q],s=$.ku4store().read(l.collection);s.insert(r.toObject());s.save();if($.exists(l.create)){this._mediator.notify(s,l.create)}},read:function(q,t){var l=this._config[q],s=$.ku4store().read(l.collection),r=s.find(t);if($.exists(l.read)){this._mediator.notify(r,l.read)}return r},update:function(q,r){var l=this._config[q],s=r.toObject(),t=$.ku4store().read(l.collection).update({_ku4Id:s._ku4Id},s).save();if($.exists(l.update)){this._mediator.notify(t,l.update)}},remove:function(q,r){var l=this._config[q],s=$.ku4store().read(l.collection).remove(r.toObject()).save();if($.exists(l.remove)){this._mediator.notify(s,l.remove)}}};$.ku4webApp.store=function(q,l){return new o(q,l)};function p(l){this._config=l}p.prototype={$localization:function(l){return this._config.localization[l]},$config:function(l){return($.exists(l))?this._config[l]:this._config},$forms:function(l){return($.exists(l))?this._config.forms[l]:this._config.forms},$views:function(l){return($.exists(l))?this._config.views[l]:this._config.views},$render:function(l,q){return $.str.render(l,q)},$renderList:function(r,q){var l="";$.list(q).each(function(s){l+=this.$render(r,s)},this);return l},$renderWithAction:function(q,l){return l.call(this,q)},$renderListWithAction:function(q,r){var l="";$.list(q).each(function(s){l+=this.$renderWithAction(s,r)},this);return l}};$.ku4webApp.abstractTemplate=p;$.ku4webApp.template=function(l,r){function q(s){q.base.call(this,s)}q.prototype=r;$.Class.extend(q,p);$.ku4webApp.templates[l]=function(s){return new q(s)}};function a(s,q,r,l){this._mediator=s;this._responsebox=q;this._templateFactory=r;this._formFactory=l}a.prototype={$mediator:function(){return this._mediator},$template:function(l){return this._templateFactory.create(l)},$show:function(l){this._responsebox.show(l)},$hide:function(){this._responsebox.hide()},$write:function(l,r){var q=($.exists(r.find))?r:$.dto(r);return this._formFactory.create(l).write(q)}};$.ku4webApp.abstractView=a;$.ku4webApp.view=function(q,r,s){function l(w,u,v,t){l.base.call(this,w,u,v,t)}l.prototype=r;$.Class.extend(l,a);$.ku4webApp.views[q]=function(u){var t=u.mediator,v=new l(t,u.responsebox,u.templateFactory,u.formFactory);if($.exists(s)){$.hash(s).each(function(w){t.subscribe(w.key,v[w.value],v)})}return v}};function n(l){this._config=l}n.prototype={create:function(l){return $.ku4webApp.form(this._config[l])}};$.ku4webApp.formFactory=function(l){return new n(l)};function k(q,l){this._mediator=q;this._config=l}k.prototype={create:function(l){return $.ku4webApp.service(this._mediator,this._config[l])}};$.ku4webApp.serviceFactory=function(q,l){return new k(q,l)};function c(q,l){this._mediator=q;this._config=l}c.prototype={create:function(l){return $.ku4webApp.store(this._mediator,this._config[l])}};$.ku4webApp.storeFactory=function(q,l){return new c(q,l)};function d(l){this._config=l}d.prototype={create:function(l){return $.ku4webApp.templates[l](this._config)}};$.ku4webApp.templateFactory=function(l){return new d(l)};function i(l){this._config=l}i.prototype={create:function(l){return $.ku4webApp.validator(this._config[l])}};$.ku4webApp.validatorFactory=function(l){return new i(l)}})(jQuery);