Webstudio.PopupboxView = Ember.View.extend({
    templateName: 'popupbox',
    actions: {
        Collapse: function(element_id)
        {
            console.log(element_id);
            $(".modal-body").slideToggle(500, function() {

            });

        }
    }
});

