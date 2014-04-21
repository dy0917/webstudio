Webstudio.BlogsNewRoute = Ember.Route.extend({
    // admittedly, this should be in IndexRoute and not in the
    // top level ApplicationRoute; we're in transition... :-)
    
      setupController: function(controller, model) {
          console.log("blogs new route");
  },
    
    model: function () {
console.log("blogs new route");
    },
    
        renderTemplate: function() {
    this.render('blogNew',{into:'test'});
  }
});
