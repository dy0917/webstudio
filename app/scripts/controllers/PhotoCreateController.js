
Webstudio.PhotoCreateController = Ember.ArrayController.extend({
    inputtext: "",
    actions: {printout: function() {
            console.log(this.get("inputtext"));
        },
        gethtml: function()
        {
            var str = this.get("inputtext");
            var res = str.replace(/\!\[\w+\]\(/g, "&#60;image src");
            res = res.replace(/\.jpg\)/g, " &#62;");
            return res;
        }
    }

});

