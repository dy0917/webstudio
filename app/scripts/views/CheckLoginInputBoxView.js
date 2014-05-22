Webstudio.CheckLoginInputBoxView = Ember.TextField.extend({
    keyDown: function(event) {
        if (event.keyCode === 13) {
            this.get('controller').send("createMessage");
            //  console.log();
            //     this.get('controller').send("login");

        }
    },
    click: function(e) {
        alert('btnClicked');
    },
});

