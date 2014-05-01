
Webstudio.PhotoCreateController = Ember.ArrayController.extend({
    inputtext: "",
    actions: {printout: function() {
            console.log(this.get("inputtext"));
        }
    }

});

