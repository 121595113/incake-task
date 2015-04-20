/// <reference path="jq.min.js" />
$(function () {
    //加入购物车
//    $(".go_buy.ui-link").each(function () {
//        $(this).click(function () {
//            var _data = {
//                Action: "ShopCart",
//                pang: $(this).parents(".goods_list_page").find("." + $(this).attr("data-float") + "_goods .bang_con i").attr("pang"), //所选磅数
//                qiefen: $(this).attr("data-quefen"), //切分
//                cid: $(this).attr("data-cid"), //商品编号
//                cname: $(this).attr("data-cname"), //商品名称
//                price: $(this).parents(".goods_list_page").find("." + $(this).attr("data-float") + "_goods .bang_con i").attr("price"), //价格
//                cweight: $(this).attr("data-cweight"), //单位
//                pic: $(this).attr("data-pic"), //图片
//                danwei: $(this).attr("data-danwei"),
//                iscake: "1",
//                showcanju: $(this).attr("data-showfive")
//            };
//            $.ajax({
//                url: "/ICake/cookie/CookieManage.aspx", type: "post", dataType: "json",
//                data: _data,
//                success: function (data) {
//                    if (data.errcode == "0") {
//                        if (confirm("添加成功,去购物车结算？")) {
//                            location.href = "/ICake/order/ShopCart.aspx";
//                        } else {
//                            location.reload();
//                        }
//                    } else {
//                        alert("添加购物车失败！");
//                    }
//                }
//            });


//        });
//    });

    $(".go_buy.ui-link").live("click", function () {
        var _data = {
            Action: "ShopCart",
            pang: $(this).parents(".goods_list_page").find("." + $(this).attr("data-float") + "_goods .bang_con i").attr("pang"), //所选磅数
            qiefen: $(this).attr("data-quefen"), //切分
            cid: $(this).attr("data-cid"), //商品编号
            cname: $(this).attr("data-cname"), //商品名称
            price: $(this).parents(".goods_list_page").find("." + $(this).attr("data-float") + "_goods .bang_con i").attr("price"), //价格
            cweight: $(this).attr("data-cweight"), //单位
            pic: $(this).attr("data-pic"), //图片
            danwei: $(this).attr("data-danwei"),
            iscake: "1",
            showcanju: $(this).attr("data-showfive")
        };
        $.ajax({
            url: "/ICake/cookie/CookieManage.aspx", type: "post", dataType: "json",
            data: _data,
            success: function (data) {
                if (data.errcode == "0") {
                    if (confirm("添加成功,去购物车结算？")) {
                        location.href = "/ICake/order/ShopCart.aspx";
                    } else {
                        location.reload();
                    }
                } else {
                    alert("添加购物车失败！");
                }
            }
        });

    });

    //闪电购
    $(".shan_gou.ui-link").live("click", function () {
        var jsonData = "[";
        jsonData += "{";
        jsonData += "\"ProductID\":\"" + $(this).attr("data-cid") + "\",";
        jsonData += "\"GuiGe\":\"" + $(this).parents(".goods_list_page").find("." + $(this).attr("data-float") + "_goods .bang_con i").attr("pang") + "\",";
        jsonData += "\"Num\":\"1\",";
        jsonData += "\"QueFen\":\"0\"}";
        jsonData += "]";
        $.ajax({
            url: "/ICake/cookie/CookieManage.aspx", type: "post", dataType: "json",
            data: { "Action": "FirmCode", "FirmValue": jsonData },
            success: function (data) {
                if (data.errcode == "0") {
                    location.href = "/ICake/order/SpeedOrder.aspx";
                }
            }, error: function () {
                alert("网络错误,请稍后重试！");
            }
        });
    });


    //选择磅数
    $("section").on("click", ".left_goods .bang", function () {
        $(".bang_select").hide();
        $(this).parents(".goods_list_page").find(".left_goods_select").slideToggle(300);
    });

    $("section").on("click", ".right_goods .bang", function () {
        $(".bang_select").hide();
        $(this).parents(".goods_list_page").find(".right_goods_select").slideToggle(300);
    });
    //传递磅数数值
    $(".left_goods_select .link").live("click", function (even) {
        $t = $(this).html();
        $(this).parents(".goods_list_page").find(".left_goods").find(".bang_con").html($t);
    });
    $(".right_goods_select .link").live("click", function (even) {
        $t = $(this).html();
        $(this).parents(".goods_list_page").find(".right_goods").find(".bang_con").html($t);
    });



});