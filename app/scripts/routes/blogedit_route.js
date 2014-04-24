Webstudio.BlogEditRoute = Ember.Route.extend({
    setupController: function(controller, model) {
       var controller = this.controllerFor("blogNew");
      // console.log(controller);
       controller.send('setModel',model);
    },
    
    renderTemplate: function() {
        this.render('blogNew');
    }
});
