Webstudio.BlogEditRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        var controller = this.controllerFor("blogNew");
        controller.send('setModel', model);
    },

    renderTemplate: function() {
        this.render('blogNew');
    }
});
