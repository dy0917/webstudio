Webstudio.BlogEditRoute = Ember.Route.extend({
   setupController: function(controller, arr) {
 controller.set('content', arr);
  },
      renderTemplate: function() {
    this.render('blogNew');
  }
});
