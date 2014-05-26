WB2.anyWhere(function(W){
    W.widget.publish({
        'id' : 'wb_publish',
        'default_text' : '预置方案　& \r\n我可以换行.',
        'callback' : function(o) {
            //do something...
        }
    });


  W.widget.connectButton({
        id: "wb_connect_btn",
       
        callback: {
            login: function (o) { //登录后的回调函数
                alert("login: " + o.screen_name);
console.log(o);
            },
            logout: function () { //退出后的回调函数
                alert('logout');
            }
        }
    });

});