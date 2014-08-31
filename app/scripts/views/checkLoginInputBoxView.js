Webstudio.CheckLoginInputBoxView = Ember.TextField.extend({
    //controller: this.get('controller'),
    keyDown: function(event) {
        if (event.keyCode === 13) {
            this.get('controller').send("createMessage");
            console.log(this.get('controller'));
        }
    },
    click: function(e) {
      //  var controller = this.get('controller');
              this.get('controller').send('turnItUp', 11);
       // controller.test;
        //    this.test();
    },
    test: function()
    {
        this.get('controller').send("createMessage");
        console.log("asdfasdfasdfasfd");
    }

});

