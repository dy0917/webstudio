/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Webstudio.MessageBoardController = Ember.ArrayController.extend({
    message: "",
    sortProperties: ['id'],
    sortAscending: false,
    needs: ["application", "blog"],
    //  content: [{id: 1, message: "aaaaa"}, {id: 2, message: "svvvv"}, {id: 3, message: "ddddd"}],
    init: function()
    {
        var blogController = this.get('controllers.blog');
        var blog_id = blogController.getblogid();

        var messages = this.store.find('message', {blog_id: blog_id});
        var that = this;
        messages.then(function()
        {
            //   console.log(messages.get("length"));
            for (var i = 0; i < messages.get("length"); i++)
            {
                that.get("content").pushObject(messages.objectAt(i));
            }
        });


    },
    actions: {
        reverse: function() {
            return this.get('content').toArray().reverse();
        }.property('content.@each').cacheable(),
        createMessage: function() {
            var applicationController = this.get('controllers.application');
            var userid = applicationController.getuserid();
            var blogController = this.get('controllers.blog');
            blog_id = blogController.getblogid();
            var message = this.store.createRecord('message', {'author_id': userid, "blog_id": blog_id
            });
            message.set("body", this.get("message"));
            console.log(message);
            this.set("message", "");
            this.get("content").insertAt(0, message);
            message.save();
        }
    },
    sortedContent: (function() {
        var content;
        content = this.get("content") || [];
        return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
            content: content.toArray(),
            sortProperties: this.get('sortProperties'),
            sortAscending: this.get('sortAscending')
        });
    }).property("content.@each", 'sortProperties', 'sortAscending'),
    doSort: function(sortBy) {
        var previousSortBy;
        previousSortBy = this.get('sortProperties.0');
        if (sortBy === previousSortBy) {
            return this.set('sortAscending', !this.get('sortAscending'));
        } else {
            set('sortAscending', true);
            return this.set('sortProperties', [sortBy]);
        }
    }

});
