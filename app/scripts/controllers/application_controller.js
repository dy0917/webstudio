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
    test: "this is test attribute",
    actions: {
        init: function()
        {

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
        liToggle: function()
        {
            $('li').toggleclass("active");
        }

    }
});
