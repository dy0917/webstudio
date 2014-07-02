Webstudio.LoginformView = Ember.View.extend({
    templateName: 'login',
    keyDown: function(event) {
        if (event.keyCode === 13) {

            this.get('controller').send("login");

        }
    }
});

