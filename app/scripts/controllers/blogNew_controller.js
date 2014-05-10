/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Webstudio.BlogNewController = Ember.Controller.extend({
    blog: "",
    isWriteSwitch: true,
    needs: ["application"],
    actions: {
        init: function()
        {

        },
        setModel: function(model)

        {
            this.blog = model;

        },
        printout: function() {
            console.log(this.get("inputtext"));
        },
        setWriteSwitch: function()
        {
            this.set("isWriteSwitch", !this.get("isWriteSwitch"));
        },
        submit: function()
        {
            var that = this;
            this.blog.save().then(function() {
                that.set('blog', null);
                that.transitionToRoute('blogs');

            });

        }
    }
});
