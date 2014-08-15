/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Webstudio.RegisterformController = Ember.Controller.extend( {
    username: "",
    password: "",
    needs: ["application"],
    isError: false,
    isProcessing: false,
    registerErrorMessage: [],
    registeremail: "",
    registerpassword1: "",
    registerpassword2: "",
    actions: {
        closewindow: function()
        {
            var applicationController = this.get('controllers.application');
            this.set("username", "");
            this.set("password", "");
            applicationController.send("switchLogin");
        },
        setProcessingStatus: function(btn_id, bool)
        {

            this.set("btnlogin", document.getElementById(btn_id));
            var lbtnlogin = Ladda.create(this.get("btnlogin"));
            if (bool) {
                lbtnlogin.start();
            } else {
                lbtnlogin.stop();
            }

        },
        registerClick: function()
        {
            
            this.get("registerErrorMessage").clear();
            var that = this;
            if (this.checkemail() && this.checkregisterPassword())
            {
                var user = {};
                user["displayname"] = this.get("registeremail").split("@")[0];
                user["email"] = this.get("registeremail");
                user["password"] = this.get("registerpassword1");
                var json_user = JSON.stringify(user);

                requiredBackEnd("users", "createwithoutSocialMedia", json_user, "post", function(params) {
                    alert("please log in with your email and password");
                }, function(params)

                {
                    if (params.responseText === "EMAIL_REGISTERED")
                    {
                        that.get("registerErrorMessage").pushObject("Email have been registered.");
                    }
                });


            }

        }
    },
    checkemail: function()
    {

        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var isCorrectEmail = false;
        isCorrectEmail = re.test(this.get("registeremail"));
        if (!isCorrectEmail)
        {
            this.get("registerErrorMessage").pushObject("Your email format is not correct.");
        }
        return re.test(this.get("registeremail"));

    },
    checkregisterPassword: function()
    {
        var isMatchPassword = false;
        isMatchPassword = (this.get("registerpassword1") === this.get("registerpassword2"));
        if (!isMatchPassword)
        {

            this.get("registerErrorMessage").pushObject("Password must match.");
        }
        return isMatchPassword;
    }
});
