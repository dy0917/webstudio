Webstudio.BlogNewRoute = Ember.Route.extend({

    setupController: function(controller, model) {
      
      
       controller.send('setModel',model);
    },
    
    
    model: function () {
        
          var blog=   this.store.createRecord('blog', {
            });
  
        return blog;
    },
    
    renderTemplate: function() {
        this.render('blogNew');
    }


});
