/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Webstudio.ApplicationController = Ember.Controller.extend({
    username: "",
    password: "",
    loginUser: null,
    actions: {
        init: function()
        {

        },
        login: function()
        {
            var that = this;
            requiredBackEnd("site", "login", '{"email":"' + this.get('username') + '","password":"' + this.get("password") + '"}', "post", function(params) {
                //  console.log(params);

                that.send("printout", params);
            });

            this.set("username", "");
            this.set("password", "");
        },
        printout: function(feedback) {
            var feedback = JSON.stringify(feedback);
            var t = JSON.parse(feedback);
            if (t.error === "ERROR_USERNAME_INVALID")
            {
                console.log(t.error);
            }
            else if (t.error === "ERROR_PASSWORD_INVALID")
            {
                console.log(t.error);
            }
            else
            {
                var that = this;
                var user = this.store.find('user', t.id);
                user.then(function() {
                    that.set("loginUser", user);
                    console.log(that.get("loginUser").get("displayname"));
                });

            }
//            var q = JSON.stringify(feedback);
//            var t = JSON.parse(q);
//            console.log(t.displayname);

        }
    }
});
