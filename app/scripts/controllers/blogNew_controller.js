/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Webstudio.BlogNewController = Ember.Controller.extend({
    blog: "",
    init: function()
    {
        //  console.log("BlogNewController");

        this.blog = this.store.createRecord('blog', {
            title: 'Rails is Omakase',
            body: 'Lorem ipsum'
        });
    },
    submit: function()
    {
        
        this.blog.save();
        
    }.observes('isCompleted')

});
