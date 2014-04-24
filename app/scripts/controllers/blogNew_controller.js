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

            this.blog.save();
            
            
           this.set('blog',null);
           this.transitionToRoute('blogs');
      
        }.observes('isCompleted')
    }
});
