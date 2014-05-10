Webstudio.IndexRoute = Ember.Route.extend({
    setupController: function(controller, model) {
    },
       model: function(param) {

       console.log("IndexRoute");
    },
    renderTemplate: function() {
        this.render('home');
    }
});
