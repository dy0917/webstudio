Webstudio.BlogsRoute = Ember.Route.extend({
    // admittedly, this should be in IndexRoute and not in the
    // top level ApplicationRoute; we're in transition... :-)
    model: function () {
      var blogs=  this.store.find('blog');
       console.log(blogs);
        return ['red', 'yellow', 'blue'];
    }
});
