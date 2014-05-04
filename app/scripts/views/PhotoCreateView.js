

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
        // var controller = this.get("controller");
        //   var value = controller.get("inputtext");
        var el = document.getElementById("txtarea");
        var that = this;

        var dataTransfer = event.originalEvent.dataTransfer;
        var files = dataTransfer.files;
        var controller = this.get("controller");
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
                        var currentdate = new Date();
                        var photoid = "![" + createGuid() + "]()";
                        that.insertTextAtCursor(el, photoid);
                        //  console.log(src);
                        requiredBackEnd("images", "writeimage", '{"src":"' + src + '","type":"' + type + '","userid":"' + "3" + '"}', "post", function(params) {
                            el.value = el.value.replace(photoid, "sucess");
                            //     that.send("afterlogin", params);

                        });

                    }, reader.readAsDataURL(files[i]);
                }

            })(files[i]);
        }
        $("#dropbox").removeClass("active");
        return false;
    },
    insertTextAtCursor: function(el, text) {
        console.log(text);
        var val = el.value, endIndex, range;
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
    }


});
