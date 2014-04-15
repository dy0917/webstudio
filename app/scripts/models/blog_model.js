/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Webstudio.Blog = DS.Model.extend({        
    blog_id: DS.attr('string'),
    book_title: DS.attr('string'),
    blog_body: DS.attr('string'),
    blog_type: DS.attr('string'),
    timestamp: DS.attr('string'),
    author: DS.attr('string')
});

Webstudio.Blog.reopenClass({
    getAllBlog: function() {
        return $.ajax({
            url: "http://api.localhost/blogs.php",
            type: "POST",
            data: JSON.stringify({})
        }).then(function(response) {
            console.log(response);
            return response;
        });
    }
});