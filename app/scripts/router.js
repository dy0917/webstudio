Webstudio.Router.map(function() {
    // Add your routes here
    this.resource("index", {path: '/'});
    this.resource("blogs", {path: '/blogs'},function() {
   // this.resource("blogNew", {path: '/new'});
  });
    this.resource("blogNew", {path: '/blog/new'});  
    this.resource("blog", {path: '/blog/:id'});
    this.resource("blogEdit", {path: '/blog/edit/:id'});

    this.resource("home", {path: '/home'});

});
