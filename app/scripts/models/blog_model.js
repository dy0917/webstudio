/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Webstudio.Blog = DS.Model.extend({
    title: DS.attr('string', {defaultValue: ""}),
    body: DS.attr('string', {defaultValue: ""}),
    type: DS.attr('string', {defaultValue: ""}),
    author_id: DS.attr('string', {defaultValue: ""}),
    displayname: DS.attr('string', {defaultValue: ""}),
    created: DS.attr('string', {defaultValue: ""}),
    last_update: DS.attr('string', {defaultValue: ""}),
    imageUrl: DS.attr('string', {defaultValue: ""}),
    gettimeago: function()
    {
        return jQuery.timeago(this.get("last_update"));
    }.property('last_update'),
    formattedHtml: function() {
        var str = this.get('body');
        str = str.replace(/\n\r?/g, '<br/>');
        str = str.replace(/\!\[\w+\]\(/g, '<img src="http://');
        str = str.replace(/\.jpg\)/g, '.jpg">');
        return str;
    }.property('body'),
    getCurrentUrl: function()
    {
        return document.URL;
    }.property('id')
});