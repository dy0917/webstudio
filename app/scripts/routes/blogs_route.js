Webstudio.BlogsRoute = Ember.Route.extend({
    // admittedly, this should be in IndexRoute and not in the
    // top level ApplicationRoute; we're in transition... :-)
    
      setupController: function(controller, model) {
          
    controller.set('content', model);

    controller.initial();
  },
    
    model: function () {
      var blogs= this.store.find('blog');
     // setTimeout(function(){console.log(blogs);},1000);

  // console.log(blog.get('id'));
        return blogs;
    }
});
