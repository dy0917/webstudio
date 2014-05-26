/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Webstudio.BlogController = Ember.Controller.extend({
    actions: {
        fb_share: function()
        {
            var model = this.get("model");
            console.log(this.get("model").get("title"));
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

        }
    },
    getblogid: function()
    {
        return this.get("model").get("id");
    }



});
