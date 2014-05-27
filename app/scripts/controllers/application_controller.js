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
        switchLogin: function() {

            this.set("isloginclick", !this.get("isloginclick"));
        },
        autoLogin: function()
        {
            var that = this;
            var session_id = getCookiebyName("session_id");
            if (session_id != null || session_id != undefined) {
                requiredBackEnd("site", "autoLogin", '{"session_id":"' + session_id + '"}', "post", function(params) {
                    if (params !== "SESSION_MISSING") {
                        var user = that.store.find('user', params);
                        that.set("loginedUser", user);
                        that.set("islogin", true);
                    }
                });
            } else {
                console.log("dont have session_id");
            }
        }
    }
    ,
    getuserid: function()
    {
        var user_id = 3;
        if (this.get("loginedUser") != null || this.get("loginedUser") != undefined)
        {
            user_id = this.get("loginedUser").get("id");
        }
        return user_id;
    }
});
