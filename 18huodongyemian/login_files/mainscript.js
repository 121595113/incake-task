/// <reference path="../ICake/js/jq.min.js" />该文件适用登录、注册页面
$(function () {
    //用户登录
    $("#userlogin").click(function () {
        if (LoginCheck()) {
            var _data = {
                "Action": "Login",
                "Name": $("#loginName").val(),
                "Pass": $("#loginPass").val()
            }, _url = $("#url").val();


            $.ajax({
                url: "/Login.aspx", dataType: "json", type: "post",
                data: _data,
                success: function (data) {
                    alert(data.errmsg);
                    if (data.errcode == "0") {
                        if (_url == "") {
                            location.href = "/Index.aspx";
                        } else {
                            location.href = _url;
                        }
                    }
                }, error: function () {
                    alert("网络错误");
                }
            });
        }
    });

    //用户注册
    $("#userregister").click(function () {
        if (RegisterCheck()) {
            var _data = {
                "Action": "Sava",
                "UserName": $("#UserName").val(),
                "UserPass": $("#UserPass").val(),
                "UserPhone": $("#UserMail").val(),
                "UserMail": $("#UserMail").val(),
                "SmsCode": $("#SmsCode").val(),
                "NewId": $("#newid").val()
            }, _url = $("#url").val();

            $.ajax({
                url: "/Register.aspx", type: "post", dataType: "json",
                data: _data,
                success: function (data) {
                    alert(data.errmsg);
                    if (data.errcode == "0") {
                        if (_url == "") {
                            location.href = "/Index.aspx";
                        } else {
                            location.href = _url;
                        }
                    }
                },
                error: function () {
                    alert("网络错误");
                }
            });
        }
    });


});

var LoginCheck = function () {
    if ($("#loginName").val() == "") {
        alert("请输入登录名");
        return false;
    }
    if ($("#loginPass").val() == "") {
        alert("请输入登录密码");
        return false;
    }
    return true;
}

var RegisterCheck = function () {
    if ($("#UserMail").val() == "") {
        alert("请输入手机号");
        return false;
    }
    if ($("#UserMail").val().length != 11) {
        alert("手机号错误");
        return false;
    }
    if (!new RegExp("^[0-9]*$").test($("#UserMail").val()) || $("#UserMail").val().length != 11) {
        alert("请输入正确的手机号");
        return false;
    }
    if ($("#UserName").val() == "") {
        alert("请输入用户姓名");
        return false;
    }

    if (!WidthCheck($("#UserName").val().trim(), 4)) {
        alert("用户名最少4个字符！"); return false;
    }

    if ($("#UserPass").val() == "") {
        alert("请输入用户密码");
        return false;
    }
    if ($("#UserSecondPass").val() == "") {
        alert("请输入确认密码");
        return false;
    }
    if ($("#UserPass").val() != $("#UserSecondPass").val()) {
        alert("两次密码不一致");
        return false;
    }
    if ($("#SmsCode").val() == "" || $("#SmsCode").val().length != 4) {
        alert("短信验证码错误"); return;
    }
    if ($("#newid").val() == "") {
        alert("请点击获取验证码手机验证");
        return;
    }

    return true;
}


var WidthCheck = function (s, n) {
    var w = 0;
    for (var i = 0; i < s.length; i++) {
        var c = s.charCodeAt(i);
        //单字节加1 
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            w++;
        }
        else {
            w += 2;
        }
    }
    if (w >= n) {
        return true;
    }
    return false;
}