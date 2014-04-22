Webstudio.BlogsRoute = Ember.Route.extend({
    // admittedly, this should be in IndexRoute and not in the
    // top level ApplicationRoute; we're in transition... :-)
    
      setupController: function(controller, arr) {
   //  if     (controller.get('content').get('length')===0){
         //  controller.get('content').clear;
         var blogs = this.store.filter('blog', function (blog) {
				return blog.get('isValid');
			});
         
    controller.set('content', blogs);
 //    }
  },
    
    model: function () {
        
      var blogs= this.store.find('blog');
      
        return blogs;
    }
});
