/// <reference path="jq.min.js" />

$(function () {
    //购物车删除商品
    $(".shop_car .shop_con .del_goods").bind("click", function (even) {
        if (confirm("确定删除这件商品吗？")) {
            var _data = { "Action": "Del", "CommodityID": $(this).attr("did"), "Pang": $(this).attr("pang") };
            $.ajax({
                url: "ShopCart.aspx", dataType: "json", type: "post",
                data: _data,
                success: function (data) {
                    if (data.errcode == "0") {
                        $("a[did='" + _data.CommodityID + "'][pang='" + _data.Pang + "']").parents(".shop_con").slideUp(300, function () {
                            $(this).remove();
                            TotalCakePrice();
                        });

                    } else {
                        alert("删除失败");
                    }
                }
            });

        }
    });
    //数量框效果
    $(".ui_input_text.a_num").each(function () {
        $(this).focus(function () {
            $(this).val(""); //清空数据框
        }).blur(function () {
            var num = $(this).val();
            if (num == "") {
                $(this).val($(this).attr("num"));
            } else {
                var price = $(this).parents(".shop_con").find("input[type='hidden']").val();
                $(this).parents(".shop_con").find(".fn_right .c_red").html("￥" + (parseFloat(price) * parseInt(num)));
                $(this).attr("num", $(this).val());
                //计算总价格
                TotalCakePrice();
            }
        }).keyup(function () {
            if (!new RegExp("^[0-9]*$").test($(this).val())) {
                $(this).focus();
            }
        });
    });

    //配件点击
    $(".commend .blue_btn").click(function () {
        var _data = {
            "Action": "ShopCart",
            "cid": $(this).attr("did"),
            "pang": "0",
            "qiefen": "0",
            "cname": $(this).attr("cname"),
            "price": $(this).attr("price"),
            "cweight": $(this).attr("cweight"),
            "pic": $(this).attr("pic"),
            "danwei": "",
            "iscake": "0"
        };
        $.ajax({
            url: "/ICake/cookie/CookieManage.aspx", type: "post", dataType: "json",
            data: _data,
            success: function (data) {
                if (data.errcode == "0") {
                    alert("加入购物车成功!");
                    location.reload();
                } else {
                    alert("网络错误");
                }
            }
        });
    });

    //提交订单
    $("#gotobuy").click(function () {
        var productList = $("div[class='box']").find(".shop_con");
        var jsonData = "[";
        if (productList.length == 0) {
            if (confirm("购物车没有蛋糕，去逛逛吧？")) {
                location.href = "/ICake/List.aspx?dtype=&dname=&dc=蛋糕馆";
                return;
            } else { return };
        }

        //添加蛋糕数据[{产品编号-磅数=数量:是否切分}]
        for (var i = 0; i < productList.length; i++) {
            jsonData += "{";
            jsonData += "\"ProductID\":\"" + productList.eq(i).find(".del_goods").attr("did") + "\",";
            jsonData += "\"GuiGe\":\"" + productList.eq(i).find(".del_goods").attr("pang") + "\",";
            jsonData += "\"Num\":\"" + productList.eq(i).find(".ui_input_text.a_num").val() + "\",";
            jsonData += "\"QueFen\":\"" + (productList.eq(i).find("input[type='checkbox']").is(":checked") ? "1" : "0") + "\"},";
        }
        //添加配件数据
        var peiList = $(".box.pei_box").find(".shop_con");
        for (var i = 0; i < peiList.length; i++) {
            jsonData += "{";
            jsonData += "\"ProductID\":\"" + peiList.eq(i).find(".del_goods").attr("did") + "\",";
            jsonData += "\"GuiGe\":\"1\",";
            jsonData += "\"Num\":\"" + peiList.eq(i).find(".ui_input_text.a_num").val() + "\",";
            jsonData += "\"QueFen\":\"0\"},";
        }
        jsonData = jsonData.substring(0, jsonData.length - 1) + "]";

        $.ajax({
            url: "/ICake/cookie/CookieManage.aspx", type: "post", dataType: "json",
            data: { "Action": "FirmCode", "FirmValue": jsonData },
            success: function (data) {
                if (data.errcode == "0") {
                    location.href = "/ICake/order/FirmOrder.aspx";
                }
            }, error: function () {
                alert("网络错误,请稍后重试！");
            }
        });


    });


});

//计算总价格
var TotalCakePrice = function () {
    var total = 0.00;
    var list = $(".shop_con");
    for (var i = 0; i < list.length; i++) {
        var price = parseFloat(list.eq(i).find("input[type='hidden']").val());
        var num = parseInt(list.eq(i).find("input[type='text']").val());
        total = total + price * num;
    }
    //改变总价格
    $(".price_box.fn_clear").find("i").html("￥" + total);
}
