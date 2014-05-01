/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Webstudio.ApplicationController = Ember.Controller.extend({
    username: "",
    password: "",
    loginUser: null,
    loginSession: null,
    islogin: false,
    isloginclick: false,
    actions: {
        init: function()
        {

        },
        login: function()
        {
            var that = this;
            requiredBackEnd("site", "login", '{"email":"' + this.get('username') + '","password":"' + this.get("password") + '"}', "post", function(params) {

                that.send("afterlogin", params);
                that.set("username", "");
                that.set("password", "");
            });


        },
        afterlogin: function(feedback) {
            var feedback = JSON.stringify(feedback);
            var objfeeback = JSON.parse(feedback);
            if (objfeeback.error === "ERROR_USERNAME_INVALID")
            {
                console.log(objfeeback.error);
            }
            else if (objfeeback.error === "ERROR_PASSWORD_INVALID")
            {
                console.log(objfeeback.error);
            }
            else
            {
                var that = this;
                var user = this.store.find('user', objfeeback.id);
                that.set("loginSession", objfeeback.session_id);
                user.then(function() {
                    that.set("loginUser", user);
                    that.set("islogin", true);

                });

            }
        },
        logout: function() {
            var that = this;
            requiredBackEnd("site", "logout", '{"logout":"' + that.get("loginSession") + '"}', "post", function(params) {
                that.set("islogin", false);

            });
        },
        loginclick: function() {

            this.set("isloginclick", !this.get("isloginclick"));
        }
    }
});
