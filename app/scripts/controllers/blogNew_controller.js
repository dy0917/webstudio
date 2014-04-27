/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Webstudio.BlogNewController = Ember.Controller.extend({
    blog: "",
    actions: {
        init: function()
        {

        },
        setModel: function(model)

        {
            this.blog = model;
        },
        submit: function()
        {
            var that = this;
            this.blog.save().then(function() {
                that.set('blog', null);
                that.transitionToRoute('blogs');

            });

        }.observes('isCompleted')
    }
});
