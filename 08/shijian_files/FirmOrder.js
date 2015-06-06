/// <reference path="jq.min.js" />
$(function () {
    //运费改变
    $(".add_box :radio[name='add']").click(function () {
        $("#tdyunfei").text("￥" + $(this).val());
        $("#hdyunfei").val($(this).val());
        $("#spanquyu").text($(this).attr("quyu"));
        BindAllPrice();
        ChangHour();
    });

    //使用优惠券
    $("#myCoupon").change(function () {
        //使用其它优惠，不能使用优惠券
        if (parseFloat($("#hdcardyouhui").val()) > 0) {
            alert("您已享受其它优惠,不能使用我的优惠券！");
            $("#myCoupon").val(0);
            $("#myCoupon").selectmenu('refresh', true);
            return;
        }
        var youhuiPrice = $(this).find("option:selected").attr("price");
        $("#hdyouhui").val("0.00");
        $("#hdcouponyouhui").val(youhuiPrice);
        BindAllPrice();
    });

    //生日牌，发票，贺卡改变
    $("#shengripai,#fapiao,#hecard").click(function () {
        $this = $(this);
        if ($this.hasClass("ui-radio-on")) {
            $this.parents("ul").find(":radio").parents("div").removeClass("ui-disabled");
            $this.parents("ul").find(":input").removeAttr("disabled").removeClass("ui-disabled");
            $this.parents("div").find("#custom").removeAttr("disabled").removeClass("ui-disabled");
            $this.parents("div").find("#hecardcontent").removeAttr("disabled").removeClass("ui-disabled");
        } else {
            $this.parents("ul").find(":radio").attr("disabled", "disabled").removeClass("ui-input-text");
            $this.parents("ul").find(":input").attr("disabled", "disabled").css("background-color", "white");
            $this.parents("div").find("#custom").attr("disabled", "disabled").addClass("ui-disabled");
            $this.parents("div").find("#hecardcontent").attr("disabled", "disabled").addClass("ui-disabled");
        }
    });



    //限定收货日期
    var opt = {}
    opt.date = { preset: 'date', minDate: new Date(curr, currM, currD, 9, 22), maxDate: new Date(_curr, _currM, _currD, 15, 44), stepMinute: 5 };
    opt.datetime = { preset: 'datetime', minDate: new Date(2012, 3, 10, 9, 22), maxDate: new Date(2014, 7, 30, 15, 44), stepMinute: 5 };
    opt.time = { preset: 'time' };
    $('#ConsigneeDateTime').scroller('destroy').scroller($.extend(opt['date'], { theme: 'ios', mode: 'scroller', display: 'bottom', lang: 'zh', dateOrder: 'yymmdd', dateFormat: 'yy-mm-dd' }));


    //验证蛋糕卡
    $("#verifycard").click(function () {
        if ($("#verifycard").attr("disabled") == "disabled") {
            return;
        }
        var cardno = $(this).parents("div").find("input:text").eq(0).val();
        var cardpass = $(this).parents("div").find("input:text").eq(1).val();
        if (cardno == "") {
            alert("请输入蛋糕卡后5位"); return;
        } if (cardno.length != 5) {
            alert("蛋糕卡号错误"); return;
        }
        if (cardpass == "") {
            alert("请输入蛋糕卡密码"); return;
        }

        if (parseFloat($("#hdcouponyouhui").val()) > 0) {
            alert("您已享受其它优惠，不能使用蛋糕卡！");
            return;
        }

        var cardlist = $("#cardlist").val();
        if (!IsRepeat(cardlist, cardpass)) {
            $("#verifycard").attr("disabled", "disabled");
            $.ajax({
                url: "/Icake/order/firmorder.aspx", dataType: "json", type: "post",
                data: { "Action": "Verify", "CardNo": cardno, "CardPass": cardpass, "CardType": "0" },
                success: function (data) {
                    if (data.errcode == "0") {
                        //更改金额
                        $("#hdyouhui").val("0.00");
                        var pcmark = 0.00;
                        $("#hdcardyouhui").val(parseFloat($("#hdcardyouhui").val()) + parseFloat(data.PromotionValue));
                        //补差
                        if (ispcmark == "1" && parseFloat(data.PromotionValue) == 149 && parseFloat($("#hdPcMake").val()) == 0 && $("#hdcity").val() == "021") {
                            $("#hdPcMake").val("10.00");
                            pcmark = 10.00;
                        }
                        BindAllPrice();
                        //增加蛋糕卡列表
                        $("#cardlist").val($("#cardlist").val() + cardpass + ",");
                        //增加蛋糕卡总金额
                        $("#cardvalue").val(parseFloat($("#cardvalue").val()) + parseFloat(data.PromotionValue));
                        //插入HTML
                        $("#cardlist").before("<span class=\"spanlabel\" ttype=\"card\" price=\"" + data.PromotionValue + "\" pcmark=\"" + pcmark + "\">" + cardpass + "</span>");
                        //清空输入框
                        $("#verifycard").parents("div").find("input:text").each(function () { $(this).val(""); });
                        //选中当前选项卡
                        $("#verifycard").parents("div").find("li[data-role='tab-li']").eq(0).attr("selected", "selected").siblings("[data-role='tab-li']").removeAttr("selected");
                        //更改文本显示
                        $("#spantext").text("蛋糕卡金额：");

                    } else if (data.errcode == "-1") {
                        if (data.errmsg == "") { alert("蛋糕卡号或者密码错误"); } else {
                            alert(data.errmsg);
                        }
                    } else {
                        alert(data.errmsg);
                    }
                    $("#verifycard").removeAttr("disabled");
                }, error: function () {
                    $("#verifycard").removeAttr("disabled");
                }
            });
        } else {
            alert("请勿重复使用蛋糕卡");
        }

    });
    // 验证现金券
    $("#verifymoney").click(function () {
        if ($("#verifymoney").attr("disabled") == "disabled") {
            return;
        }
        var cardno = $(this).parents("div").find("input:text").eq(0).val();
        var cardpass = $(this).parents("div").find("input:text").eq(1).val();
        if (cardno == "") {
            alert("请输入现金券后5位"); return;
        } if (cardno.length != 5) {
            alert("现金券号错误"); return;
        }
        if (cardpass == "") {
            alert("请输入现金券密码"); return;
        }
        if (parseFloat($("#hdcouponyouhui").val()) > 0) {
            alert("您已享受其它优惠，不能使用现金券！");
            return;
        }


        var cardlist = $("#moneylist").val();
        if (!IsRepeat(cardlist, cardpass)) {
            $("#verifymoney").attr("disabled", "disabled");
            $.ajax({
                url: "/Icake/order/firmorder.aspx", dataType: "json", type: "post",
                data: { "Action": "Verify", "CardNo": cardno, "CardPass": cardpass, "CardType": "1" },
                success: function (data) {
                    if (data.errcode == "0") {
                        //更改金额
                        $("#hdyouhui").val("0.00");
                        $("#hdcardyouhui").val(parseFloat($("#hdcardyouhui").val()) + parseFloat(data.PromotionValue));
                        BindAllPrice();
                        //增加蛋糕卡列表
                        $("#moneylist").val($("#moneylist").val() + cardpass + ",");
                        //增加蛋糕卡总金额
                        $("#moneyvalue").val(parseFloat($("#moneyvalue").val()) + parseFloat(data.PromotionValue));
                        //插入HTML
                        $("#moneylist").before("<span class=\"spanlabel\" price=\"" + data.PromotionValue + "\" pcmark=\"0.00\">" + cardpass + "</span>");
                        //清空输入框
                        $("#verifymoney").parents("div").find("input:text").each(function () { $(this).val(""); });
                        //选中当前选项卡
                        $("#verifymoney").parents("div").find("li[data-role='tab-li']").eq(1).attr("selected", "selected").siblings("[data-role='tab-li']").removeAttr("selected");
                        //更改文本显示
                        $("#spantext").text("现金券金额：");
                    } else if (data.errcode == "-1") {
                        if (data.errmsg == "") { alert("现金券号或者密码错误"); } else {
                            alert(data.errmsg);
                        }
                    } else {
                        alert(data.errmsg);
                    }
                    $("#verifymoney").removeAttr("disabled");
                }, error: function () {
                    $("#verifymoney").removeAttr("disabled");
                }
            });
        }
    });

    //验证团购券
    $("#verifygroup").click(function () {
        //防止重复提交
        if ($("#verifygroup").attr("disabled") == "disabled") {
            return;
        }
        var cardpass = $(this).parents("div").find("input:text").eq(0).val();
        if (cardpass == "") {
            alert("请输入优惠券/团购券密码"); return;
        }
        if (parseFloat($("#hdcouponyouhui").val()) > 0) {
            alert("您已享受其它优惠，不能使用团购券！");
            return;
        }

        var grouplist = $("#grouplist").val();
        if (grouplist != "") {
            alert("优惠券/团购券只能使用一张。");
            return;
        }
        $.ajax({
            url: "/Icake/order/firmorder.aspx", dataType: "json", type: "post",
            data: { "Action": "Group", "CardNo": "", "CardPass": cardpass, "CardType": "2" },
            success: function (data) {
                if (data.errcode == "0") {
                    //更改金额
                    $("#hdyouhui").val("0.00");
                    $("#hdcardyouhui").val(parseFloat(data.PromotionValue));
                    BindAllPrice();
                    //增加优惠券总金额
                    $("#groupvalue").val(data.PromotionValue);
                    //增加团购券文本框
                    $("#grouplist").val(cardpass + ",");
                    //插入HTML
                    $("#grouplist").before("<span class=\"spanlabel\" price=\"" + data.PromotionValue + "\" pcmark=\"0.00\">" + cardpass + "</span>");
                    //清空输入框
                    $("#verifygroup").parents("div").find("input:text").each(function () { $(this).val(""); });
                    //选中当前选项卡
                    $("#verifygroup").parents("div").find("li[data-role='tab-li']").eq(2).attr("selected", "selected").siblings("[data-role='tab-li']").removeAttr("selected");
                    //更改文本显示
                    $("#spantext").text("优惠/团购券金额：");
                } else { alert(data.errmsg); }
            }
        });
    });

    //取消使用蛋糕卡、现金券，团购券
    $(".box .code_box .spanlabel").live("click", function () {
        $this = $(this);
        $("#hdcardyouhui").val(parseFloat($("#hdcardyouhui").val()) - parseFloat($this.attr("price")));
        $this.nextAll(":hidden").eq(0).val($this.nextAll(":hidden").eq(0).val().toString().replace($this.text() + ",", ""));
        $this.nextAll(":hidden").eq(1).val(parseFloat($this.nextAll(":hidden").eq(1).val()) - parseFloat($this.attr("price")));
        //$("#cardvalue").val(parseFloat($("#cardvalue").val()) - parseFloat($this.attr("price")));
        //$("#cardlist").val($("#cardlist").val().toString().replace($this.text() + ",", ""));
        if (parseFloat($this.attr("pcmark")) > 0) {
            $("#hdPcMake").val(parseFloat($("#hdPcMake").val()) - parseFloat($this.attr("pcmark")))
        }
        BindAllPrice();
        $this.remove();
    });


    //提交订单
    $("#submitorder").click(function () {
        if ($("#submitorder").attr("disabled") == "disabled") {
            return;
        }
        if (CheckItems()) {
            PostOrder();
        }
    });

    /*初始化绑定*/
    ChangHour();
    $(":radio[name='add']:checked").click();
    BindAllPrice();

    //优惠信息选项卡改变宽度
    var length = $("#tbyouhui .tabnav li").find(":hidden").length;
    var _width = 100 / (4 - length);
    $("#tbyouhui .tabnav li").css("width", _width + "%");
    $("#tbyouhui .code_box div[data-role='tab-li']:visible:first").addClass("on");
    $("#tbyouhui .tabnav li:visible:first").addClass("on").siblings("[data-role='tab-li']").removeClass("on");

    //其它信息选项卡改变宽度
    var len = $("#tbqita .tabnav li").find(":hidden").length;
    var width = 100 / (4 - len);
    $("#tbqita .tabnav li").css("width", width + "%");
    $("#tbqita .code_box div[data-role='tab-li']:visible:first").addClass("on");
    $("#tbqita .tabnav li:visible:first").addClass("on").siblings("[data-role='tab-li']").removeClass("on");
});

//绑定各种价格
var BindAllPrice = function () {
    var ilist = $(".index_goods_list .index_price").find("i");

    var totalprice = parseFloat($("#hdtotalprice").val()); //商品总金额
    var oldprice = parseFloat($("#hdoldyouhui").val());
    var otherprice = parseFloat($("#hdyouhui").val()); //初始优惠金额
    var yunfei = parseFloat($("#hdyunfei").val()); //运费
    var cakeprice = parseFloat($("#hdcakeprice").val()); //蛋糕金额
    var teaprice = parseFloat($("#hdteaprice").val());   //下午茶金额
    var couponprice = parseFloat($("#hdcouponyouhui").val()); //我的优惠券金额
    var cardprice = parseFloat($("#hdcardyouhui").val()) + parseFloat($("#hdPcMake").val());  //蛋糕卡金额
    var dixiaoprice = (cakeprice + yunfei - cardprice) < 0 ? cakeprice + yunfei : cardprice; //蛋糕卡抵消
    if (cardprice == 0.00 && couponprice == 0.00) {
        otherprice = parseFloat(oldprice);
    }
    //    if (couponprice > 0) {
    //        var xztype = $("#myCoupon").find("option:selected").attr("xztype");
    //        if
    //    }
    var result = totalprice + yunfei - otherprice - dixiaoprice - couponprice;
    if (result < 0) {
        result = 0;
    }
    //    var totalprice = parseFloat($("#hdtotalprice").val()); //商品总金额
    //    var otherprice = parseFloat($("#hdyouhui").val()); //优惠金额
    //    var cardprice = parseFloat($("#hdcardyouhui").val()) + parseFloat($("#hdPcMake").val());
    //    var couponprice = parseFloat($("#hdcouponyouhui").val());
    //    var yunfei = parseFloat($("#hdyunfei").val());
    //    if (cardprice == 0.00 && couponprice == 0.00) {
    //        otherprice = parseFloat($("#hdoldyouhui").val());
    //    }
    //    var total = totalprice - otherprice - cardprice - couponprice + yunfei;
    $("#hdresulttotal").val(result);
    ilist.eq(0).text("￥" + totalprice.toFixed(2));
    ilist.eq(1).text("￥" + otherprice.toFixed(2));
    ilist.eq(2).text("￥" + cardprice.toFixed(2));
    ilist.eq(3).text("￥" + couponprice.toFixed(2));
    ilist.eq(4).text("￥" + yunfei.toFixed(2));
    ilist.eq(5).text("￥" + result.toFixed(2));
};

//是否重复使用蛋糕卡,现金券
var IsRepeat = function (list, str) {
    var result = false;
    if (list.indexOf('' + str + '') != -1) {
        result = true;
    }
    return result;
};

//改变小时
var ChangHour = function () {
    var number = 1;
    var selectRadio = $(".add_box :radio[name='add']:checked");
    if (selectRadio != undefined && selectRadio.attr("waihuan") == "1") {
        $("#starttimehour option[value='9']").remove();
        $("#starttimehour option[value='20']").remove();
        number = 2;
    } else {
        if ($("#starttimehour option[value='9']").val() == undefined && $("#starttimehour option[value='20']").val() == undefined) {
            $("#starttimehour").prepend("<option value=\"9\">09</option>");
            $("#starttimehour").append("<option value=\"20\">20</option>");
        }
        if ($("#starttimehour").val() == "9" && $("#starttimeminte option[value='00']").val() != undefined) {
            $("#starttimeminte option[value='00']").remove();
        }
    }
    if ($("#starttimehour").val() != "9" && $("#starttimeminte option[value='00']").val() == undefined) {
        $("#starttimeminte").prepend("<option value=\"00\">00</option>");
    }

    //
    var ConsigneeDate = $("#ConsigneeDateTime").val().replace("-", "/");
    if (Date.parse(ConsigneeDate) > Date.parse("2015/02/12") && Date.parse(ConsigneeDate) < Date.parse("2015/02/22")) {
        number = 2;
    }

    hour = $("#starttimehour").val();
    $("#endtimehour").val(parseInt(hour) + number);
    $("#starttimehour").selectmenu('refresh', true);
    $("#endtimehour").selectmenu('refresh', true);
    $("#starttimeminte").selectmenu('refresh', true);
    ChangMinte();
};

//改变分钟
var ChangMinte = function () {
    var val = $("#starttimeminte").val();
    $("#endtimeminte").val(val);
    $("#endtimeminte").selectmenu('refresh', true);
};


//检查各个选项
var CheckItems = function () {
    if ($(".add_box :radio:checked").length == 0) {
        alert("请选择您的收货地址");
        return false;
    }
    if ($("#fapiao").hasClass("ui-radio-on")) {
        if ($(":radio[name='fp']:checked").val() == "gongsi") {
            if ($("#txtgongsi").val() == "") {
                alert("请输入公司发票抬头"); return false;
            }
        }
    }
    if ($("#shengripai").hasClass("ui-radio-on")) {
        if ($(":radio[name='card']:checked").attr("tp") == "3" && getlengthB($("#custom").val()) > 14) {
            alert("生日牌不能超过7个汉字或14个字母"); return false;
        }
    }
    return true;
};


//正式提交订单
var PostOrder = function () {
    if ($("#submitorder").attr("disabled") == "disabled") {
        return;
    }
    $("#submitorder").attr("disabled", "disabled");

    var address = $(".add_box :radio:checked"); //收货人信息
    var _Payable = "", _NeedInvoice = "0", _Contents = "", PromotionCode = "", PromotionValue = "", ECouponCode = "", ECouponValue = "0.00",
    NeedBirth = "0", Birth = "", NeedHecard = "0", HecardType = "", HecardContent = "";
    //发票
    if ($("#fapiao").hasClass("ui-radio-on")) {
        _NeedInvoice = "1";
        _Payable = $(":radio[name='fp']:checked").val() == "geren" ? "" : $("#txtgongsi").val();
        _Contents = $(":radio[name='nr']:checked").val();
    }
    //生日牌
    if ($("#shengripai").hasClass("ui-radio-on")) {
        NeedBirth = "1";
        Birth = ($(":radio[name='card']:checked").attr("tp") == "3" ? $("#custom").val() : $(":radio[name='card']:checked").val());
    }

    //贺卡
    if ($("#hecard").hasClass("ui-radio-on")) {
        NeedHecard = "1";
        HecardType = $(":radio[name='ss']:checked").val();
        HecardContent = $("#hecardcontent").val();
    }


    PromotionCode = ($("#cardlist").val() == "" ? $("#moneylist").val() : $("#cardlist").val());
    PromotionValue = (parseFloat($("#cardvalue").val()) <= 0 ? $("#moneyvalue").val() : $("#cardvalue").val());
    if ($("#myCoupon").val() != "0") {
        ECouponCode = $("#myCoupon").find("option:selected").attr("otitle") + "-" + $("#myCoupon").val();
        ECouponValue = $("#myCoupon").find("option:selected").attr("Price");
    }
    var _data = {
        "Consignee": address.attr("RealName"), "ConsigneePhone": address.attr("Phone"), "ConsigneeTel": address.attr("telphone"),
        "Province": address.attr("Province"), "City": address.attr("City"), "adr": address.attr("adr"), "quyu": address.attr("quyu"),
        "ConsigneeDateTime": ($("#ConsigneeDateTime").val() + " " + $("#starttimehour").val() + ":" + $("#starttimeminte").val() + ":00"),
        "NeedInvoice": _NeedInvoice, "Payable": _Payable, "Contents": _Contents, "DefrayManner": $(":radio[name='zf']:checked").attr("tvalue"),
        "ConsigneeEndTime": ($("#ConsigneeDateTime").val() + " " + $("#endtimehour").val() + ":" + $("#endtimeminte").val() + ":00"),
        "AreaID": address.attr("areaid"), "PcMake": $("#hdPcMake").val(), "Freight": address.val(), "CashPay": $("#hdresulttotal").val(),
        "PromotionCode": PromotionCode, "PromotionValue": PromotionValue, "Remark": $("#txtRemark").val(), "ECouponCode": ECouponCode,
        "ECouponValue": ECouponValue, "Voucher": $("#grouplist").val(), "VoucherValue": $("#groupvalue").val(),
        "Action": "PostOrder", "NeedBirth": NeedBirth, "BirthPai": Birth, "NeedHecard": NeedHecard,
        "HeCardType": HecardType, "HeCardContent": HecardContent, "Tcid": tcid, "NumKey": $("#hdnumkey").val()
    };

    $.ajax({
        url: "/ICake/order/FirmOrder.aspx", dataType: "json", type: "post",
        data: _data, success: function (data) {
            $("#submitorder").removeAttr("disabled");
            alert(data.errmsg);
            if (data.errcode == "0") {
                var oid = data.oid;
                $.ajax({
                    url: "/ICake/cookie/CookieManage.aspx", type: "post", dataType: "json",
                    data: { "Action": "ClearCookie", "Type": "ICake", "Name": "shopcart" }, success: function (data) {
                        location.href = "/pay/payIndex.aspx?orderid=" + oid + "&showwxpaytitle=1";
                    }
                });

            } else if (data.errcode == "1") {
                $.ajax({
                    url: "/ICake/cookie/CookieManage.aspx", type: "post", dataType: "json",
                    data: { "Action": "ClearCookie", "Type": "ICake", "Name": "shopcart" }, success: function (data) {
                        location.href = "/user/UserInfo.aspx";
                    }
                });

            }
        }, error: function () {
            $("#submitorder").removeAttr("disabled");
            alert("提交订单失败");
        }
    });
};


// 计算字符长度
var getlengthB = function (str) {
    return str.replace(/[^\x00-\xff]/g, "**").length;
};
