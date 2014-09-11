Webstudio.BlogsRoute = Ember.Route.extend({
    // admittedly, this should be in IndexRoute and not in the
    // top level ApplicationRoute; we're in transition... :-)

    setupController: function(controller, arr) {

       // this.store.find('blog');
        var blogs = this.store.filter('blog', function(blog) {
            return blog.get('id') !== null;
        });

        controller.set('content', blogs);

    },
    model: function() {

        var blogs = this.store.find('blog');

        return blogs;
    },
    renderTemplate: function() {
        this.render('blogs');
    }
});
