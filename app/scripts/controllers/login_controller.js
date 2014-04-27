/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Webstudio.LoginController = Ember.Controller.extend({
    username: "",
    password: "",
    needs: ["application"],
    isError: false,
    actions: {
        login: function()
        {
            this.set("isError", false);
            var that = this;
            requiredBackEnd("site", "login", '{"email":"' + this.get('username') + '","password":"' + this.get("password") + '"}', "post", function(params) {

                that.send("afterlogin", params);
            });

            this.set("username", "");
            this.set("password", "");
        },
        afterlogin: function(feedback) {
            var feedback = JSON.stringify(feedback);
            var objfeeback = JSON.parse(feedback);
            if (objfeeback.error === "ERROR_USERNAME_INVALID")
            {
                this.set("isError", true);
            }
            else if (objfeeback.error === "ERROR_PASSWORD_INVALID")
            {
                this.set("isError", true);
            }
            else
            {
                var user = this.store.find('user', objfeeback.id);
                var applicationController = this.get('controllers.application');
                applicationController.set("loginSession", objfeeback.session_id);
                user.then(function() {
                    applicationController.set("loginUser", user);
                    applicationController.set("islogin", true);
                    applicationController.send("loginclick");
                });
            }
        },
        closewindow: function()
        {
            var applicationController = this.get('controllers.application');
            applicationController.send("loginclick");
        },
        
    }


});
