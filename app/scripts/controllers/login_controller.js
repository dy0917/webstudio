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
            var that = this;

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
                var applicationController = this.get('controllers.application');
                applicationController.set("loginSession", objfeeback.session_id);
                setCookie("session_id", objfeeback.session_id);
                this.send("setUserByID", objfeeback.id);

            }
        },
        closewindow: function()
        {
            var applicationController = this.get('controllers.application');
            this.set("username", "");
            this.set("password", "");
            applicationController.send("switchLogin");
        },
        setLoginStatus: function(bool)
        {

            this.set("btnlogin", document.getElementById('btnlogin'));
            var lbtnlogin = Ladda.create(this.get("btnlogin"));
            if (bool) {
                lbtnlogin.start();
            } else {
                lbtnlogin.stop();
            }

        },
        fb_login: function() {
            var that = this;
            this.send("setLoginStatus", true);
            FB.getLoginStatus(function(response) {
                if (response.status === 'connected') {
                    that.send("getFacebookUser");
                }
                else {
                    FB.login(function(response) {
                        if (response.authResponse) {
                            access_token = response.authResponse.accessToken; //get access token
                            user_id = response.authResponse.userID; //get FB UID
                            that.send("getFacebookUser");
                        } else {
                            //user hit cancel button
                            console.log('User cancelled login or did not fully authorize.');
                        }
                    });
                }
            });

        }, createNewAccount: function(response)
        {
            var user = this.store.createRecord('user', {displayname: response.name, social_media_id: response.id
            });
            //  var applicationController = this.get('controllers.application');
            var that = this;
            user.save().then(function() {
                var applicationController = that.get('controllers.application');
                applicationController.set("loginedUser", user);
                applicationController.set("islogin", true);
                applicationController.send("switchLogin");
                that.send("setLoginStatus", false);
            });
        }, setUserByID: function(userid)
        {
            var user = this.store.find('user', userid);
            var applicationController = this.get('controllers.application');
            var that = this;
            user.then(function() {
                applicationController.set("loginedUser", user);
                applicationController.set("islogin", true);
                applicationController.send("switchLogin");
                that.send("setLoginStatus", false);
                that.set("username", "");
                that.set("password", "");

            });
        }, getFacebookUser: function() {
            var that = this;
            FB.api('/me', function(response) {
                requiredBackEnd("users", "checksocialID", '{"social_media_id":"' + response.id + '"}', "post", function(params) {
                    if (params === "ID_NOT_FOUND")
                    {
                        that.send("createNewAccount", response);
                    }
                    else
                    {
                        that.send("setUserByID", params);
                    }
                });
            }, {scope: 'email'});
        }



    }


});
