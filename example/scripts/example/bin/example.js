(function(a){$=a;$.ku4webApp.controller("example",{requestForm:function(){this.$notify("accountFormRequested")},create:function(){var b=this.$validate("example");if(!b.isValid){this.$notify(b,"accountInvalid")}else{this.$notify("accountCreated")}},cancel:function(){this.$notify("createAccountCanceled")}});$.ku4webApp.template("example",{renderForm:function(b){return this.$render(this.$forms("example"),b)},renderValidation:function(b){return this.$render(this.$views("example"),b)}});$.ku4webApp.view("validator",{showValidation:function(){console.log("Create tooltips and display them.")}},{accountInvalid:"showValidation"});$.ku4webApp.view("example",{accountFormRequested:function(){var b=this.$template("example");this.$responsebox().show(b.renderForm())},accountCreated:function(b){$(".js-validationMessages").html("Account created")},accountInvalid:function(c){var b=this.$template("example");$(".js-validationMessages").html(b.renderValidation(c.messages))},createAccountCanceled:function(b){this.$responsebox().hide()}},{accountFormRequested:"accountFormRequested",accountCreated:"accountCreated",accountInvalid:"accountInvalid",createAccountCanceled:"createAccountCanceled"});$.ku4webApp.config.forms={example:[{selector:"#username",type:"field",spec:$.fields.specs.alphaNumeric,required:true},{selector:"#password",type:"field",spec:$.fields.specs.alphaNumeric,required:true},{selector:"#firstName",type:"field",spec:$.fields.specs.alpha,required:true},{selector:"#lastName",type:"field",spec:$.fields.specs.alpha,required:true},{selector:"#email",type:"field",spec:$.fields.specs.email,required:true},{selector:"#reco",type:"select",required:false}]};$.ku4webApp.config.services={example:{verb:"GET",uri:"./response.json",success:"exampleSuccess",error:"exampleError"}};$.ku4webApp.config.templates.forms={example:'<div class="js-validationMessages"></div><form class="js-example-form css-example-form"><div class="css-field"><label for="username">Username</label><input id="username" name="username" type="text" value=""/></div><div class="css-field"><label for="password">Password</label><input id="password" name="password" type="password" value=""/></div><div class="css-field"><label for="firstName">First name</label><input id="firstName" name="firstName" type="text" value=""/></div><div class="css-field"><label for="lastName">Last name</label><input id="lastName" name="lastName" type="text" value=""/></div><div class="css-field"><label for="email">Email</label><input id="email" name="email" type="text" value=""/></div><div class="css-field"><label for="reco">Who recommended this site?</label><select id="reco" name="reco"><optgroup label="Desire"><option value="0">Advertisement.</option><option value="1">Google.</option><option value="2">Friend.</option><option value="3">I stumbled onto it.</option></optgroup></select></div><a href="#" onclick="controller.create(); return false;">Create Account</button><a href="#" onclick="controller.cancel(); return false;">Clear</button></form>'};$.ku4webApp.config.templates.views={example:'<ul class="css-example-error"><li class="css-example-error">{{username}}</li><li class="css-example-error">{{password}}</li><li class="css-example-error">{{firstName}}</li><li class="css-example-error">{{lastName}}</li><li class="css-example-error">{{email}}</li></ul>'};$.ku4webApp.config.validators={example:[{name:"username",message:"Username is Jacob."},{name:"password",message:"Password is invalid."},{name:"firstName",message:"First name is invalid."},{name:"lastName",message:"Last name is invalid."},{name:"email",message:"Email is invalid."}]}})(jQuery);