Webstudio.dropBoxTextArea = Ember.TextArea.extend({
//Now if isInvalid is true CSS class "highlight" is applied to text field
    /* other ways include 
     isValid::error-class error-class will be applied when isValid is false
     isValid:normal-class:error-class, normal-class is applied when isValid is true else error-class is applied
     */ id: "dropboxtextarea",
    classNameBindings: ['test'],
    //If you have static classes you define them as :my-class-name
    isInvalid: function() {
        if (this.get('value').trim() === "") {
            return true;
        } else {
            return false;
        }
    }.property('value'),
    didInsertElement: function() {

    },
    keyDown: function(event) {

        if (event.keyCode === 13) {          
           
     //       document.getElementById("txtArea").value = document.getElementById("txtArea").value + "\n";
        }
    }

});