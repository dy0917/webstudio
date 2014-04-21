Webstudio.Router.map(function() {
    // Add your routes here
    this.resource("index", {path: '/'});
    this.resource("blogs", {path: '/blogs'},function() {
   // this.resource("blogNew", {path: '/new'});
  });
    this.resource("blogNew", {path: 'blog/new'});
    this.resource("home", {path: '/home'});

});
