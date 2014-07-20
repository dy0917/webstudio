/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Webstudio.testmixin = Ember.Mixin.create({
    arr: ["asdfasdf", "sdfasdfa", "dddddddddddddd"],
    edit: function() {
        console.log(this.get("arr").get("length"));
        console.log(this.get("controller"));
        this.set('isEditing', true);
    },
    isEditing: false
});
