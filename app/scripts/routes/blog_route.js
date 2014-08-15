Webstudio.BlogRoute = Ember.Route.extend({
    // admittedly, this should be in IndexRoute and not in the
    // top level ApplicationRoute; we're in transition... :-)

    setupController: function(controller, model) {

        controller.set('model', model);
        controller.send("config");
    },
    model: function(param) {
        var blog = this.store.find('blog', param.id);
        return blog;
    }
});
