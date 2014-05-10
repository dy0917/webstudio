/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Webstudio.ApplicationController = Ember.Controller.extend({
    username: "",
    password: "",
    loginedUser: null,
    loginSession: null,
    islogin: false,
    isloginclick: false,
    actions: {
        init: function()
        {
            this.send("autoLogin");
        },
        logout: function() {
            var that = this;
            requiredBackEnd("site", "logout", '{"logout":"' + that.get("loginSession") + '"}', "post", function(params) {
                that.set("islogin", false);
            });
        },
        loginclick: function() {

            this.set("isloginclick", !this.get("isloginclick"));
        },
        autoLogin: function()
        {
            var session_id = getCookiebyName("session_id");
            if (session_id != null || session_id != undefined) {
 
                requiredBackEnd("site", "autoLogin", '{"session_id":"' + session_id + '"}', "post", function(params) {

                });
            } else {
                console.log("dont have session_id");
            }
        }

    }
});
