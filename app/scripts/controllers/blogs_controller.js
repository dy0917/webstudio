/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Webstudio.BlogsController = Ember.ArrayController.extend({
     
    init: function()
    {
    console.log("init");
    },
   
   initial:function()
   {
       console.log(this.get("content").objectAt(0).get("blog_title"));
   }
});
