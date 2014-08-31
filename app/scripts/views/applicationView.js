Webstudio.ApplicationView = Ember.View.extend({
    templateName: 'application',
    actions: {
        sidemenuclick: function() {
            //  var controller = this.get('controller');
        
      $("#body").toggleClass("menu-active");
          console.log("asdfasdfa");
            // controller.test;
            //    this.test();
        }}
});

