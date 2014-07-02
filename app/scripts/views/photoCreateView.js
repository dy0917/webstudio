

Webstudio.Droppable = Ember.Mixin.create({
    dragEnter: function(event) {
        $("#dropbox").addClass("active");
        event.preventDefault();
        return false;
    },
    dragOver: function(event) {
        $("#dropbox").addClass("active");
        event.preventDefault();
        return false;
    },
    dragLeave: function(event) {
        $("#dropbox").removeClass("active");
        event.preventDefault();
        return false;
    },
    drop: function(event) {
        //        console.log("drop");
//        var viewId = event.originalEvent.dataTransfer.getData('Text');
//        Ember.View.views[viewId].destroy();        
        event.preventDefault();
        return false;
    }
});


Webstudio.PhotoCreateView = Ember.View.extend(Webstudio.Droppable, {
    contentBinding: "photoCreate",
    drop: function(event) {
        //     document.getElementById("txtarea").value = " afadfasdfasdfasdf";

        var el = document.getElementById("txtarea");
        var that = this;
        var userid = 3;
        if (that.getLoginedUser() !== null)
        {
            userid = that.getLoginedUser().get("id");
        }
        var dataTransfer = event.originalEvent.dataTransfer;
        var files = dataTransfer.files;

        var filesize = 0;

        for (var i = 0; i < files.length; i++) {
            (function(file) {

                var name = file.name;
                var type = file.type;
                filesize = file.size;
                if (filesize >= 25000000)
                {
                    alert("The limit size of uploading is 25MB");
                }
                else
                {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        var photoName = name.replace(/[)\(]/gi, '');
                        photoName = photoName.replace(/\s/g, '_');
                        var target = getTarget(e, "pural");
                        var src = target.result;
                        //   var currentdate = new Date();
                        var guid = createGuid();
                        var uploadingdisplaystring = "![" + guid + "]()";
                        that.insertTextAtCursor(el, uploadingdisplaystring + "\n\r");
                        requiredBackEnd("imageCreate", "writeimage", '{"src":"' + src + '","type":"' + type + '","userid":"' + userid
                                + '","imagename":"' + photoName + '"}', "post", function(params) {
                                    el.value = el.value.replace(uploadingdisplaystring, "![" + guid + "](" + params + ")");
                                    var blog = that.get("controller").get('blog');
                                    blog.set("body", el.value);
                                });
                    }, reader.readAsDataURL(files[i]);
                }
            })(files[i]);
        }
        $("#dropbox").removeClass("active");
        return false;
    },
    insertTextAtCursor: function(el, text) {
        var val = el.value, endIndex, range;
        var blog = this.get("controller").get('blog');
        if (typeof el.selectionStart != "undefined" && typeof el.selectionEnd != "undefined") {
            endIndex = el.selectionEnd;
            el.value = val.slice(0, el.selectionStart) + text + val.slice(endIndex);
            el.selectionStart = el.selectionEnd = endIndex + text.length;
        } else if (typeof document.selection != "undefined" && typeof document.selection.createRange != "undefined") {
            el.focus();
            range = document.selection.createRange();
            range.collapse(false);
            range.text = text;
            range.select();
        }
        //   blog.set("body", blog.get("body") + "a");

    },
    getLoginedUser: function()
    {
        var applicationController = this.get("controller").get('controllers.application');
        var loginedUser = applicationController.get("loginedUser");
        return loginedUser;
    }

});
