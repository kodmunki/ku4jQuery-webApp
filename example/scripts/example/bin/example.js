(function(a){$=a;$.ku4webApp.controller("example",{requestForm:function(){this.$model("example").requestForm()},cancel:function(){this.$model("example").cancelForm()},create:function(){this.$model("example").createAccount(this.$form("example").read())},listAccounts:function(){this.$model("example").listAccounts()}});$.ku4webApp.model("example",{requestForm:function(c){var b=this.$collection("example").find({username:c})[0];this.$notify(b,"accountFormRequested");return this},cancelForm:function(){this.$notify("createAccountCanceled");return this},createAccount:function(c){var b=this.$validator("example").validate(c);if(b.isValid){this.$service("account.create").call(c.toQueryString())}else{this.$notify(b,"accountInvalid")}return this},listAccounts:function(){this.$service("account.list").call();return this},clearAccounts:function(){this.$collection("example").remove();return this},_accountCreated:function(b){console.log("_accountCreated - ",b);this.$collection("example").insert(b);this.$notify(b,"accountCreated")},_accountsListed:function(){var b=this.$collection("example").find();this.$notify(b,"accountsListed")}},{"svc+accountCreated":"_accountCreated","svc-accountCreated":"_accountCreated","svc+accountsListed":"_accountsListed","svc-accountsListed":"_accountsListed"});$.ku4webApp.view("otherView",{accountFormRequested:function(b){console.log(b)},accountCreated:function(b){console.log(b)},accountInvalid:function(b){console.log(b)},accountsListed:function(b){console.log(b)}},{accountFormRequested:"accountFormRequested",accountCreated:"accountCreated",accountInvalid:"accountInvalid",accountsListed:"accountsListed"});$.ku4webApp.template("example",{renderForm:function(){return this.$render(this.$forms("example"))},renderValidation:function(c){var b="";$.hash(c).each(function(d){b+=this.$render(this.$views("validation").message,{message:d.value})},this);return this.$render(this.$views("validation").container,{messages:b})},renderAccountList:function(b){return this.$renderList(this.$views("account"),b)}});$.ku4webApp.view("example",{show:function(b){$(".js-responsebox").addClass("css-show").html(b);return this},hide:function(){$(".js-responsebox").addClass("css-show").html("");return this},displayList:function(b){$(".js-accountList").html(b);return this},hideList:function(){$(".js-accountList").html("");return this},accountFormRequested:function(c){var b=this.$template("example");this.show(b.renderForm()).hideList();this.$form("example").write(c)},accountCreated:function(b){this.show("Account created")},accountInvalid:function(c){var b=this.$template("example");$(".js-validationMessages").html(b.renderValidation(c.messages))},accountsListed:function(c){var b=this.$template("example");this.displayList(b.renderAccountList(c)).hide()}},{accountFormRequested:"accountFormRequested",createAccountCanceled:"hide",accountCreated:"accountCreated",accountInvalid:"accountInvalid",accountsListed:"accountsListed"});$.ku4webApp.config.collections={example:{name:"accounts"}};$.ku4webApp.config.forms={example:[{selector:"#username",type:"field",required:true},{selector:"#password",type:"field",required:true},{selector:"#firstName",type:"field",required:true},{selector:"#lastName",type:"field",required:true},{selector:"#email",type:"field",required:true},{selector:"#reco",type:"select",required:false}]};$.ku4webApp.config.services={"account.create":{verb:"POST",uri:"./response.create.json",contentType:"text/json",success:"svc+accountCreated",error:"svc-accountCreated"},"account.list":{verb:"GET",uri:"./response.list.json",contentType:"text/json",success:"svc+accountsListed",error:"svc-accountsListed"}};$.ku4webApp.config.templates.forms={example:'<div class="js-validationMessages"></div><form class="js-example-form css-example-form"><div class="css-field"><label for="username">Username</label><input id="username" name="username" type="text" value=""/></div><div class="css-field"><label for="password">Password</label><input id="password" name="password" type="password" value=""/></div><div class="css-field"><label for="firstName">First name</label><input id="firstName" name="firstName" type="text" value=""/></div><div class="css-field"><label for="lastName">Last name</label><input id="lastName" name="lastName" type="text" value=""/></div><div class="css-field"><label for="email">Email</label><input id="email" name="email" type="text" value=""/></div><div class="css-field"><label for="reco">Who recommended this site?</label><select id="reco" name="reco"><optgroup label="Desire"><option value="0">Advertisement.</option><option value="1">Google.</option><option value="2">Friend.</option><option value="3">I stumbled onto it.</option></optgroup></select></div><button href="#" onclick="controller.create(); return false;">Create Account</button><button href="#" onclick="controller.cancel(); return false;">Cancel</button></form>'};$.ku4webApp.config.templates.views={validation:{container:'<ul class="css-validation-error">{{messages}}</ul>',message:'<li class="css-validation-error">{{message}}</li>'},account:'<div><h4>{{firstName}} {{lastName}}</h4><ul class="css-account-error"><li class="css-account-data"><span class="css-label">Username: </span><span class="css-value">{{username}}</span></li><li class="css-account-data"><span class="css-label">Password: </span><span class="css-value">{{password}}</span></li><li class="css-account-data"><span class="css-label">Email: </span><span class="css-value">{{email}}</span></li></ul></div>'};$.ku4webApp.config.validators={example:[{name:"username",spec:$.fields.specs.alphaNumeric,message:"Username is invalid."},{name:"password",spec:$.fields.specs.alphaNumeric,message:"Password is invalid."},{name:"firstName",spec:$.fields.specs.alpha,message:"First name is invalid."},{name:"lastName",spec:$.fields.specs.alpha,message:"Last name is invalid."},{name:"email",spec:$.fields.specs.email,message:"Email is invalid."}]}})(jQuery);