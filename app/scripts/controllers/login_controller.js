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
    isProcessing: false,
    btnlogin: "",
    actions: {
        login: function()
        {//btn spinner start

            this.send("setLoginStatus", true);
            this.set("isError", false);
            var that = this;
            requiredBackEnd("site", "login", '{"email":"' + this.get('username') + '","password":"' + this.get("password") + '"}', "post", function(params) {

                that.send("afterlogin", params);
            });

        },
        afterlogin: function(feedback) {
            var lbtnlogin = Ladda.create(this.get("btnlogin"));
            var feedback = JSON.stringify(feedback);
            var objfeeback = JSON.parse(feedback);
            var that = this;
            if (objfeeback.error === "ERROR_USERNAME_INVALID")
            {
                this.set("isError", true);
                this.send("setLoginStatus", false);
            }
            else if (objfeeback.error === "ERROR_PASSWORD_INVALID")
            {
                this.set("isError", true);
                this.send("setLoginStatus", false);
            }
            else
            {//login sucessful
                var user = this.store.find('user', objfeeback.id);
                var applicationController = this.get('controllers.application');
                applicationController.set("loginSession", objfeeback.session_id);
                user.then(function() {
                    applicationController.set("loginedUser", user);
                    applicationController.set("islogin", true);
                    applicationController.send("loginclick");
                    that.send("setLoginStatus", false);
                    that.set("username", "");
                    that.set("password", "");
                    setCookie("session_id", objfeeback.session_id);
                });
            }
        },
        closewindow: function()
        {
            var applicationController = this.get('controllers.application');
            applicationController.send("loginclick");
        },
        setLoginStatus: function(bool)
        {

            this.set("btnlogin", document.getElementById('btnlogin'));
            var lbtnlogin = Ladda.create(this.get("btnlogin"));
            // this.set("isProcessing", bool);
            if (bool) {
                lbtnlogin.start();
            } else {
                lbtnlogin.stop();
            }

        }

    }


});
