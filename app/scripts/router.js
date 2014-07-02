Webstudio.Router.map(function() {
    // Add your routes here
    this.resource("init", {path: '/'}, function()
    {
        this.resource("blogs", {path: '/'});
        this.resource("blogs", {path: '/blogs'});
        this.resource("blogNew", {path: '/blog/new'});
        this.resource("blog", {path: '/blog/:id'});
        this.resource("blogEdit", {path: '/blog/edit/:id'});
        this.resource("home", {path: '/home'});
    }

    );


});
