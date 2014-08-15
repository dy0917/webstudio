Webstudio.RegisterformView = Ember.View.extend(Webstudio.testmixin, {
    templateName: 'registerform',
    keyDown: function(event) {
        if (event.keyCode === 13) {
         // this.edit();
           //   console.log("regitster");
            //  console.log(this.get('controller'));
        this.get('controller').send("registerClick");
        }
    }
});

