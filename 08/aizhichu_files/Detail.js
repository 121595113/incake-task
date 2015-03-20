/// <reference path="jq.min.js" />
$(function () {
    $(".go_buy").click(function () {
        var _data = {
            Action: "ShopCart",
            pang: $(".goods_btn").find(".price_on").attr("value"), //所选磅数
            qiefen: $("#isQiefen").val(), //切分
            cid: $("#cid").val(), //商品编号
            cname: $(this).attr("data-cname"), //商品名称
            price: $(".goods_btn").find(".price_on").attr("data-price"), //价格
            cweight: $(this).attr("data-cweight"), //单位
            pic: $(this).attr("data-pic"), //图片
            danwei:$(this).attr("data-danwei"),
            iscake: "1",
            showcanju:$(this).attr("data-showfive")
        };
        $.ajax({
            url: "/ICake/cookie/CookieManage.aspx", type: "post", dataType: "json",
            data: _data,
            success: function (data) {
                if (data.errcode == "0") {
                    location.href = "/ICake/order/ShopCart.aspx";
                } else {
                    alert("网络错误");
                }
            }
        });
    });
});