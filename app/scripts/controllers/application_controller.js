/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Webstudio.ApplicationController = Ember.Controller.extend({
    
    username:"",
    password:"",
    actions: {
        init: function()
        {    
          
        },
        login: function()
        {
            requiredBackEnd("site","login","{a:a,b:b}","post",this.printout);
            
            console.log(this.get("username")+" "+this.get("password"));
            this.set("username","");
            this.set("password","");
        },
        printout:function()
        {
            console.log("print out");
        }
    }
});
