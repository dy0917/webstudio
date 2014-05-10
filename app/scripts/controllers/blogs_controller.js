/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Webstudio.BlogsController = Ember.ArrayController.extend({
    actions: {
        init: function() {

        },
        initial: function()
        {

        },
        redirect: function(id)
        {
            //   this.transitionToRoute('profile', model);
        },
        delete: function(model)
        {
            model.deleteRecord();
            model.save();

        }
    }

//   filteredContent: (function() {
//    return this.get('content').filter(function(item, index) {
//        console.log("asfasdfasdfasdfasdf");
//      return !(item.get('isDirty'));
//    });
//  }).property('content.@each')
});
