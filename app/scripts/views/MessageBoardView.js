Webstudio.MessageBoardView = Ember.View.extend({
    templateName: 'messageBoard',
    keyDown: function(event) {
        if (event.keyCode === 13) {
            this.get('controller').send("createMessage");

        }
    }
});

