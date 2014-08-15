/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Webstudio.BlogController = Ember.Controller.extend({
    isAuthor: false,
    isAlert: false,
    needs: ["application"],
    model: "",
    actions: {
        config: function() {
            this.send("setIsAuthor");
        },
        fb_share: function()
        {
            var model = this.get("model");
            FB.ui(
                    {
                        method: 'feed',
                        name: model.get("title"),
                        caption: null,
                        description: model.get("formattedHtml"),
                        link: document.URL,
                        picture: 'http://www.fbrell.com/public/f8.jpg'
                    },
            function(response) {
                if (response && response.post_id) {
                    //    alert('Post was published.');
                } else {
                    //  alert('Post was not published.');
                }
            }
            );

        },
        editClick: function(blog)
        {
            this.transitionToRoute('blogEdit', blog);
        }
        , setIsAuthor: function()
        {
            var applicationController = this.get('controllers.application');
            var userid = applicationController.getuserid();

            var model = this.get("model");
            this.set("isAuthor", (model.get("author_id") == userid));
        },
        setIsAlert: function()
        {
            this.set("isAlert", !this.get("isAlert"));

        }, execute: function()
        {
            var model = this.get("model");
            var that = this;
            model.deleteRecord();
            model.save().then(function() {
                that.send("setIsAlert");
                that.transitionToRoute('blogs');
            });
        }
    },
    getblogid: function()
    {
        return this.get("model").get("id");
    }

});
