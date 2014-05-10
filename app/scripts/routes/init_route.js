Webstudio.InitRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        var controller = this.controllerFor("application");
        controller.send("autoLogin");
    },
    model: function(param) {


    }
});
