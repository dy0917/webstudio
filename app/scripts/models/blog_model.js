/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Webstudio.Blog = DS.Model.extend({
    title: DS.attr('string'),
    body: DS.attr('string'),
    type: DS.attr('string'),
    author: DS.attr('string'),
    created: DS.attr('string'),
    last_update: DS.attr('string'),
    imageUrl:DS.attr('string'),
    gettimeago:function()
    {
          return jQuery.timeago(this.get("last_update"));
    }.property('last_update')

});