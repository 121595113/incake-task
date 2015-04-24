function setpassword() {
    if ($("#pwd").val() == "") {
        CommenMsg("请您输入新密码！");
        return false;
    }

    if ($("#pwd").val().length < 6) {
        CommenMsg("密码长度不能少于6位！");
        return false;
    }
    if ($("#pwdok").val() == "") {
        CommenMsg("请您再次输入新密码！");
        return false;
    }

    if ($("#pwd").val() != "" && $("#pwdok").val() != "" && $("#pwd").val() != $("#pwdok").val()) {
        CommenMsg("两次输入密码不一致，请您重新输入！");
        return false;
    }
    return true;
}

var setpass = function () {
    if (setpassword()) {
        $.ajax({
            url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
            data: { "type": "_passwordset", "_newpassword": $("#pwd").val() },
            success: function (data) {
                if (data.msg == "1") {
                    location.href = "findpasssuccess.html";
                }
                else if (data.msg == "2") {
                    CommenMsg("手机号不存在！");
                }
                else {
                    CommenMsg("该用户名不存在！");
                }
            },
            error: function () {
                CommenMsg("网络错误！");
            }
        });
    }
}


function yanzhengma() {
    if ($("#duanxin").val() == "") {
        CommenMsg("请您输入短信验证码！");
        return false;
    }

    return true;
}

var nextCode = function () {
    if (yanzhengma()) {
        $.ajax({
            url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
            data: { "type": "_duanxincode", "_duanxin": $("#duanxin").val() },
            success: function (data) {
                if (data.msg == "1") {
                    location.href = "findpassset.html";
                }
                else if (data.msg == "2") {
                    CommenMsg("短信验证码失效，请您重新发送验证码！");
                }
                else {
                    CommenMsg("短信验证码错误，请您重新输入！");
                }

            },
            error: function () {
                CommenMsg("网络错误！");
            }
        });
    }
}



function yanzheng() {
    if ($("#phone").val() == "") {
        CommenMsg("请您输入手机号！");
        return false;
    }
    if ($("#phone").val() != "") {
        if (isPhone(trim($("#phone").val())) == false) {
            CommenMsg("请输入您的正确手机号码！");
            return false;
        }
    }
    if ($("#code").val() == "") {
        CommenMsg("请您输入验证码！");
        return false;
    }

    return true;
}

var nextPass = function () {
    if (yanzheng()) {
        $.ajax({
            url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
            data: { "type": "_yanzhengcode", "_phone": $("#phone").val(), "_code": $("#code").val() },
            success: function (data) {
                if (data.msg == "1") {
                    location.href = "findcode.html";
                }
                else if (data.msg == "2") {
                    CommenMsg("该帐号不存在！");
                }
                else {
                    CommenMsg("验证码错误，请您重新输入！");
                }

            },
            error: function () {
                CommenMsg("网络错误！");
            }
        });
    }
}



//2.13-2.21 当天配送时间为两小时
function changetime() {
    var peisongdate = $("#txt_Day").val();
    if (peisongdate >= "2015-02-13" && peisongdate <= "2015-02-21") {
        loadtime("1");
    }

    //母亲节活动
    var stime = $("#hid_MStime").val();  //配送开始时间
    var dtime = $("#hid_MDtime").val();  //配送结束时间

    if (peisongdate >= stime && peisongdate <= dtime && $("#hid_muqinjie").val() == "1") {

        $("#hid_mqjtime").val("1"); //可用活动状态
        if ($("#hid_mqjtime").val() == "1") {
            loadtime("2");  //配送时间间隔3小时
        }

        $("#mqj").show();  //显示“妈妈您辛苦了”生日牌
    }
    else {
        $("#hid_mqjtime").val("0"); //默认是0
        $("#mqj").hide(); //隐藏“妈妈您辛苦了”生日牌
        $("#mqj_card").attr("checked", true);
    }

    if (peisongdate >= stime && peisongdate <= dtime) {

        $("#hid_mqjtime").val("1"); //可用活动状态
        if ($("#hid_mqjtime").val() == "1") {
            loadtime("2");  //配送时间间隔3小时
        }
    }
    else {

        $("#hid_mqjtime").val("0"); //默认是0
        if ($("#hid_dizhi").val() != "") {
            loadtime($("#hid_dizhi").val());
        }
    }
}

// 交通银行9折活动，不能选择支付宝和新生意卡
$(function () {
    if ($("#hid_jiaohang").val() == "1") {
        $("input[hide='Isdisplay']").attr("disabled", true);
        $("input[hide='display']").attr("checked", true);
    }
});


$(function () {
    if ($("#senlin").val() == "1") {
        $("#youhuixinxi").hide();
    }
    //    if ($("#hid_JDid").val() == "1") {
    //        $("input[name='incakecard']").attr("disabled", true);
    //        $("#dbirth").hide();
    //    }

    if ($("#hid_zhifu").val() == "1") {
        $("#ZhiFu").hide();
        $("#more_bank").hide();
    }

    if ($("#hid_IsCard").val() == "0") {
        $("input[hide='IsCard']").attr("disabled", true);
    }
    if ($("#hid_IsVoucher").val() == "0") {
        $("input[hide='IsVoucher']").attr("disabled", true);
    }
    if ($("#hid_IsECoupon").val() == "0") {
        $("input[hide='IsECoupon']").attr("disabled", true);
    }
    if ($("#hid_IsFaPiao").val() == "0") {
        $("input[hide='IsFaPiao']").attr("disabled", true);
    }
    if ($("#hid_Birth").val() == "0") {
        $("input[hide='Birth']").attr("disabled", true);
    }
    if ($("#hid_IsHeCard").val() == "0") {
        $("input[hide='IsHeCard']").attr("disabled", true);
    }

})
//-------------闪电购---------------------





function check(str) {
    var temp = "";
    for (var i = 0; i < str.length; i++)
        if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 255)
            temp += str.charAt(i)
return temp;
}
function ShaCode() {
    if ($("#code").val() == "") {
        CommenMsg("请输入短信验证码！");
        return false;
    }

    $.ajax({
        url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
        async: false,
        data: { "type": "_shacodeyanzheng", "_code": $("#code").val(), "_phone": $("#phone").val() },
        success: function (data) {
            if (data.msg == "0") {
                $("#hid_code").val(data.msg);
            }
            else if (data.msg == "1") {
                $("#hid_code").val(data.msg);
                CommenMsg("短信验证码错误，请您重新输入！");
            }
            else if (data.msg == "2") {
                $("#hid_code").val(data.msg);
                CommenMsg("短信验证码失效，请您重新发送验证码！");
            }
            else if (data.msg == "3") {
                $("#hid_code").val(data.msg);
                CommenMsg("手机号不一致，请您重新输入手机号！");
            }
        },
        error: function () {
            CommenMsg("网络错误！");
        }
    });
    if ($("#hid_code").val() == "1") {
        return false;
    }
    if ($("#hid_code").val() == "2") {
        return false;
    }
    if ($("#hid_code").val() == "3") {
        return false;
    }
    return true;
}


//订货人信息
$(function () {
    $(".order_page_box .write .link_btnDing").click(function () {
        if (CheckDing() && ShaCode()) {
            $("#code").val("");
            $(this).parents(".write").hide();
            $(this).parents(".write").next(".result").show();
            $("#Dinghr").val($("#name").val() + "☀" + $("#phone").val());
            $("#Ding").html($("#name").val() + " " + $("#phone").val());
        }
    });
})

//收货人信息
var btnshou = function () {
    if (CheckShou()) {
        $("#Shouhr").val($("#txt_name").val() + "☀" + $("#sel_c1").val() + "☀" + $("#sel_c2").val() + "☀" + $("#sel_c3").val() + "☀" + $("#txt_address").val() + "☀" + $("#txt_movephone").val() + "☀" + $("#txt_fixphone").val());
        $.ajax({
            url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
            data: { "type": "_shou", "_sel_c3": $("#sel_c3").val(), "_address": $("#Shouhr").val() },
            success: function (data) {
                $("#shouhoulist").html(data.msg)
                yunhuilist(data.info, data.areaid);
                //loadtime(data.areaid);
                loadtime(data.waihuan);
                $("#hid_dizhi").val(data.waihuan);
            },
            error: function () {
                // alert("网络错误！");
            }
        });
    }
}


//提交订单
var ShaCheckOrder = function () {

    //闪电购
    var dingHuo = $("#Dinghr").val();
    var check1address = $("#Shouhr").val();
    var check2address = $("input[name='ConsigneeInfo']:checked").val();
    var shouHuo = $("#hid_in").val() == "1" ? $("#Shouhr").val() : $("input[name='address']:checked").val();
    var cjson = "";
    var Invoice = $("input[name='fp_Invoice']:checked").val(); //是否要发票
    var fpkey = $("input[name='fp']:checked").val(); //选择发票的ID
    var birthday = $("input[name='fp_birthday']:checked").val(); //是否要生日牌 
    var annexarticle = escape($("input[name='annexarticle']:checked").val()); //选择生日牌 中文,英文,
    var anner = 0;
    if (annexarticle == "") { annexarticle = escape($("#birthcard").val()); anner = 1; }
    var fp_heka = $("input[name='fp_heka']:checked").val(); //是否要贺卡 0
    var hk_type = $("input[name='hk_type']:checked").val(); //选择贺卡类型,
    var hekareiRong = escape($("#txt_content").val());
    var beizhu = escape($("input[name='fp_beizhu']:checked").val()); //是否要订单备注
    var benzhuRong = escape($("#txt_benzhu").val());
    var peisongdate = $("#txt_Day").val();
    var peisongtime1 = $("#hourSelect").val();
    var peisongtime2 = $("#hourEndSelect").val();
    var xiawucha = $("#hid_xiawucha").val();
    var Fzpeisong = $("#hid_Fzpeisong").val(); //福州配送

    if (peisongdate == "2015-02-18" && Fzpeisong == "1" && (parseInt(peisongtime1) >= 170000 || parseInt(peisongtime2) > 170000)) {
        CommenMsg("2.18日订单只能配送到下午17点,给您带来的不便敬请谅解。");
        return false;
    }

    if (peisongdate == "2015-02-02" && (parseInt(peisongtime1) >= 160000 || parseInt(peisongtime2) > 160000)) {
        CommenMsg("2.2日订单只能配送到下午4点,给您带来的不便敬请谅解。");
        return false;
    }

    if ((peisongdate == "2015-02-19" || peisongdate == "2015-02-20" || peisongdate == "2015-02-21") && xiawucha == "1") {
        CommenMsg("春节期间，2月19日至2月21日“下午茶”暂停配送，给您造成的不便，敬请谅解！。");
        return false;
    }

    if (trim($("#phone").val()) == "18650713121") {
        CommenMsg("您好，由于系统原因，该帐号已被锁定，不能提交订单，给您造成的不便，敬请谅解！");
        return false;
    }

    var fapiao = $("input[name='fp']:checked").val(); //发票信息
    var SysNo = $("#hid_SysNo").val(); //优惠券ID
    var DefrayManner = escape($("input[name='DefrayManner']:checked").val()); //选择付款方式,sel_payType
    var payType = $("#sel_payType").val(); //选择付款方式,sel_payType
    var SN = $("#hidSN").val(); //选择付款方式,sel_payTypeo
    var ChaPrice = $("#Sp_ChaPrice").html(); //蛋糕补差价   
    var time = '';
    var str = $("#txt_Day").val();
    var s = Array();
    s = str.split('-');
    for (var i = 0; i < s.length; i++) {
        time += trim(s[i]);
    }
    //用户未登录 提示收货地址不能为空
    if (dingHuo == "" && $("#hid_in").val() == "1") { CommenMsg("请确定您的定货人信息"); return false; }
    if (shouHuo == "" && $("#hid_in").val() == "2") { CommenMsg("请确定您的收货地址"); return false; }
    if (shouHuo == "" && $("#hid_in").val() == "1") { CommenMsg("请确定您的收货地址"); return false; }
    // if (shouHuo == "0" && $("#hid_in").val() == "1") { alert("请确定您的收货地址"); return false; }
    if (parseInt($("#hidchecktime").val()) >= parseInt(time)) { CommenMsg("收货时间不能小于当前时间"); return false; }
    if (check1address == "" && check2address == "0") { CommenMsg("请确定您的收货地址"); return false; }
    if ($("#txt_Day").val() == "") { CommenMsg("请您选择收货时间"); return false; }
    if ($("#hid_vip").val() == "1") { CommenMsg("抱歉，此VIP用户不能下订单"); return false; }
    if (anner == 1 && maxlen($("#birthcard").val()) > 14) { CommenMsg("生日牌为7个汉字或14个英文字母"); return false; }


    $.ajax({
        url: "../WebPage/AddOrder.aspx", dataType: "json", type: "post", timeout: "10000",
        data: { "fapiao": fapiao, "cjson": cjson, "CashPay": $("#Sp_Pay").html(), "yunfei": $("#hid_yunfei").val(), "InValue": $("#hid_InValue").val(), "OtherValue": $("#hid_OtherValue").val(), "card1": $("#card_1").html(), "PcValue": $("#hid_PcValue").val(), "qgid": $("#hid_qgid").val(), "tgid": $("#hid_tgid").val(), "packid": $("#hid_packid").val(), "json": $("#hid_json").val(), "huodong": $("#Sp_huodong").html(), "discount": $("#hid_zk").val(), "product": $("#hid_p").val(), "vip": $("#hid").val(), "YouHui": $("#Sp_YouHui").html(), "Active": $("#Sp_Active").html(), "code": SN, "card": $("#card_0").html(), "Total": $("#Sp_Total").html(), "payType": payType, "DefrayManner": DefrayManner, "SysNo": SysNo, "peisongtime1": peisongtime1, "peisongtime2": peisongtime2, "peisongdate": peisongdate, "peisongtime1": peisongtime1, "beizhu": beizhu, "benzhuRong": benzhuRong, "hk_type": hk_type, "hekareiRong": hekareiRong, "hk_type": hk_type, "hekareiRong": hekareiRong, "annexarticle": annexarticle, "fp_heka": fp_heka, "dinghuo": dingHuo, "shouHuo": shouHuo, "sha": "0", "Invoice": Invoice, "fpkey": fpkey, "birthday": birthday, "buchaprice": ChaPrice, "panic": $("#panic").val() },
        success: function (data) {
            if (data.msg == "订单生成成功") {
                $(".ui_popup").hide();
                $("#coupon_ture").popupFn();
                if ($("#hid").val() == "0") {
                    __msv_m("order", unescape(data.orderid));
                }
                var time = setInterval(goLink, 5000); //延迟参数
                var url = data.url;
                function goLink() {
                    clearInterval(time); 		//待方法执行完后清除
                    location.href = url;
                };
            }
            else if (data.msg == "1") {
                CommenMsg("20点以后不能提交次日订单，请您重新选择收货日期，谢谢！");
            }
            else if (data.msg == "已售完") {
                CommenMsg(data.name);
            }
            else if (data.msg == "订单量已满") {
                CommenMsg(data.name);
            }
            else {
                $(".ui_popup").hide();
                $("#conlost").popupFn();
                CommenMsg(data.msg);
            }
        },
        error: function () {
            //alert("网络错误！");
        }
    });
}

//验证收货人信息
function CheckShou() {
    if ($("#txt_name").val() == "") {
        $("#txt_name").focus();
        CommenMsg("请输入收货人姓名！");
        return false;
    }
    else if ($("#txt_name").val().length < 2) {
        $("#txt_name").focus();
        CommenMsg("收货人姓名不能少于两个字！");
        return false;
    }
    else if ($("#sel_c3").val() == "0") {
        $("#sel_c1").focus();
        CommenMsg("请选择收货人所在的区域");
        return false;
    }
    else if ($("#txt_address").val() == "") {
        $("#txt_address").focus();
        CommenMsg("请输入收货人所在地的详细地址");
        return false;
    }
    else if ($("#txt_movephone").val() == "" && $("#txt_fixphone").val() == "") {
        CommenMsg("请输入手机号或电话号码！");
        return false;
    }
    if ($("#txt_fixphone").val() != "") {
        if (isTelephone(trim($("#txt_fixphone").val())) == false) {
            $("#txt_fixphone").focus();
            CommenMsg("您输入的电话号码有错误。区号和电话号码之间请用-分割！");
            return false;
        }
    }
    if ($("#txt_movephone").val() != "") {
        if (isPhone(trim($("#txt_movephone").val())) == false) {
            $("#txt_movephone").focus();
            CommenMsg("请输入您的正确手机号码！");
            return false;
        }
    }
    return true;
}
//验证定货人信息
function CheckDing() {

    if ($("#name").val() == "") {
        $("#name").focus();
        CommenMsg("请输入订货人姓名！");
        return false;
    }
    else if ($("#name").val().length < 2) {
        $("#name").focus();
        CommenMsg("订货人姓名不能少于两个字！");
        return false;
    }
    else if ($("#phone").val() == "") {
        CommenMsg("请输入手机号！");
        return false;
    }
    if ($("#phone").val() != "") {
        if (isPhone(trim($("#phone").val())) == false) {
            $("#phone").focus();
            CommenMsg("请输入您的正确手机号码！");
            return false;
        }
    }

    if ($("#code").val() == "") {
        CommenMsg("请输入短信验证码！");
        return false;
    }

    return true;
}

//订货人信息编辑
var EditDing = function () {
    var str = $("#Dinghr").val();
    var s = Array();
    s = str.split('☀');
    for (var i = 0; i < s.length; i++) {
        $("#name").val(s[0]);
        $("#phone").val(s[1]);
    }
    $("#Dinghr").val("")
    $(".write").show();
    $(".write").next(".result").hide();
}
//收货人信息编辑
var EditShou = function () {
    var str = $("#Shouhr").val();
    var s = Array();
    s = str.split('☀');
    for (var i = 0; i < s.length; i++) {
        $("#txt_name").val(s[0]);
        $("#txt_address").val(s[4]);
        $("#txt_movephone").val(s[5]);
        $("#txt_fixphone").val(s[6]);
    }
    $(".write").show();
    $(".write").next(".result").hide();
}
//----------------------------------------------
var edit_Aaddress = function () {
    if (checkUserInfo7()) {// $("#hid_UserViewID").val(ID);
        $.ajax({
            url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
            data: { "type": "_edit_aaddress", "_UserViewID": $("#hid_UserViewID").val(), "_UserID": $("#hid_AddRessID").val(), "_RealName": $("#txt_RealName1").val(), "_sel_c3": $("#sel_c31").val(), "_Addresses": $("#txt_Addresses1").val(), "_Phone": $("#txt_Phone1").val(), "_Telephone": $("#txt_Telephone1").val() },
            success: function (data) {
                if (data.msg >= 1) {
                    laodaddrealist();
                    $("#edit_invoice").hide();
                    CommenMsg("修改成功!");
                }
                else {
                    CommenMsg("修改收货地址失败，请您重试!");
                }
            },
            error: function () {
                CommenMsg("网络错误!");
            }
        });
    }
}
function checkUserInfo7() {
    if ($("#txt_RealName1").val() == "") {
        $("#txt_RealName1").focus();
        CommenMsg("请输入收货人姓名!");
        return false;
    }
    else if ($("#sel_c31").val() == "0") {
        $("#sel_c31").focus();
        CommenMsg("请选择收货人所在的区域!");
        return false;
    }
    else if ($("#txt_Addresses1").val() == "") {
        $("#txt_Addresses1").focus();
        CommenMsg("请输入收货人所在地的详细地址!");
        return false;
    }
    else if ($("#txt_Telephone1").val() != "") {
        if (isTelephone(trim($("#txt_Telephone1").val())) == false) {
            CommenMsg("您输入的电话号码有错误。区号和电话号码之间请用-分割!");
            return false;
        }
    }
    else if ($("#txt_Telephone1").val() == "" && $("#txt_Phone1").val() == "") {
        CommenMsg("请您填写您的电话号码或手机号其中一项!");
        return false;
    }
    //  /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/  手机号验证
    else if ($("#txt_Phone1").val() != "") {
        if (isPhone(trim($("#txt_Phone1").val())) == false) {
            $("#txt_Phone1").focus();
            CommenMsg("请输入您的正确手机号码!");
            return false;
        }
    }
    return true;
}
function Load_A() {
    $.ajax({
        url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
        data: { "type": "_load_a", "_UserID": $("#hid_AddRessID").val(), "_UserViewID": $("#hid_UserViewID").val() },
        success: function (data) {
            if (data.msg >= 1) {
                $("#edit_invoice").html(data.option);
                $("#edit_invoice").show();
                $("#add_invoice").hide();
                location.href = "#edit_invoice";
            }
            else {
                CommenMsg("加载待编辑收货地址失败，请您重试!");
            }
        },
        error: function () {
            CommenMsg("网络错误!");
        }
    });
}
//编辑收货人地址
function Edit_AddRess(ID) {
    $("#hid_UserViewID").val(ID);
    Load_A();
    //laodaddrealist();
}
$(function () {
    $(".add_Address").click(function () {
        if (checkUserInfo6()) {
            $.ajax({
                url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
                data: { "type": "_addaddress", "_UserID": $("#hid_AddRessID").val(), "_RealName": $("#txt_RealName").val(), "_sel_c3": $("#sel_c3").val(), "_Addresses": $("#txt_Addresses").val(), "_Phone": $("#txt_Phone").val(), "_Telephone": $("#txt_Telephone").val() },
                success: function (data) {
                    if (data.msg >= 1) {
                        laodaddrealist();
                        $("#add_invoice").hide();
                        CommenMsg("添加收货地址成功!");
                    }
                    else {
                        CommenMsg("添加失败，请您重试！");
                    }
                },
                error: function () {
                    CommenMsg("网络错误！");
                }
            });
        }
    })
})
function checkUserInfo6() {
    if ($("#txt_RealName").val() == "") {
        $("#txt_RealName").focus();
        CommenMsg("请输入收货人姓名");
        return false;
    }
    else if ($("#sel_c3").val() == "0") {
        $("#sel_c3").focus();
        CommenMsg("请选择收货人所在的区域");
        return false;
    }
    else if ($("#txt_Addresses").val() == "") {
        $("#txt_Addresses").focus();
        CommenMsg("请输入收货人所在地的详细地址");
        return false;
    }
    else if ($("#txt_Telephone").val() != "") {
        if (isTelephone(trim($("#txt_Telephone").val())) == false) {
            CommenMsg("您输入的电话号码有错误。区号和电话号码之间请用-分割");
            return false;
        }
    }
    else if ($("#txt_Telephone").val() == "" && $("#txt_Phone").val() == "") {
        CommenMsg("请您填写您的电话号码或手机号其中一项");
        return false;
    }
    //     /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/  手机号验证
    else if ($("#txt_Phone").val() != "") {
        if (isPhone(trim($("#txt_Phone").val())) == false) {
            $("#txt_Phone").focus();
            CommenMsg("请输入您的正确手机号码！");
            return false;
        }
    }
    return true;
}
function Delete_AddRess(AddRessID) {
    $.ajax({
        url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
        data: { "type": "_Deladdress", "_AddRessID": AddRessID },
        success: function (data) {
            if (data.msg == "1") {
                laodaddrealist();
            }
            else {
                CommenMsg("设置收货地址失败");
            }
        },
        error: function () {
            CommenMsg("网络错误");
        }
    });
}
function MoRen_AddRess(AddRessID) {
    $.ajax({
        url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
        data: { "type": "_Morenaddress", "_AddRessID": AddRessID },
        success: function (data) {
            if (data.msg == "1") {
                laodaddrealist();
            }
            else {
                CommenMsg("设置收货地址失败");
            }
        },
        error: function () {
            CommenMsg("网络错误");
        }
    });
}
function laodaddrealist() {
    $.ajax({
        url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
        data: { "type": "_loadaddress", "_AddRessID": $("#hid_AddRessID").val() },
        success: function (data) {
            if (data.msg == "1") {
                $("#addresslist").html(data.option);
            }
            else {
                CommenMsg("加载收货地址失败");
            }
        },
        error: function () {
            CommenMsg("网络错误");
        }
    });
}
//$(document).ready(function () {
//    laodaddrealist();
//})
$(function () {
    $(".link_btnok").click(function () {
        if (checkUserInfo5()) {
            $.ajax({
                url: "WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
                data: { "type": "_findpass", "_UserName": $("#txt_UserName").val(), "_Phone": $("#txt_Phone").val() },
                success: function (data) {
                    if (data.msg == "1") {
                        CommenMsg('新密码已发送至您的手机，请您及时查收！');
                    }
                    else {
                        CommenMsg("发送失败，请您重试！");
                    }
                },
                error: function () {
                    CommenMsg("网络错误！");
                }
            });
        }
    })
})
function checkUserInfo5() {
    if ($("#txt_UserName").val() == "") {
        $("#txt_UserName").focus();
        CommenMsg("请输入您的用户名");
        return false;
    }
    else if ($("#txt_Phone").val() == "") {
        $("#txt_Phone").focus();
        CommenMsg("请输入您的手机号");
        return false;
    }
    else if (isPhone(trim($("#txt_Phone").val())) == false) {
        $("#txt_Phone").focus();
        CommenMsg("请输入您的正确手机号码！");
        return false;
    }
    return true;
}
$(function () {
    $(".reg_add").click(function () {
        if (checkUserInfo4()) {
            $.ajax({
                url: "WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
                data: { "type": "_cInfoadd", "_UserName": $("#txt_UserName").val(), "_PassWord1": $("#txt_PassWord1").val(), "_Email": $("#txt_Email").val(), "_yanzhengma": $("#txt_yanzhengma").val() },
                success: function (data) {
                    if (data.msg == "注册成功") {
                        __msv_m("reg");
                        location.href = "/manage/center.html";
                    }
                    else if (data.msg == "验证码错误") {
                        CommenMsg(data.msg);
                    }
                    else if (data.msg == "验证码无效") {
                        CommenMsg("验证码无效,请您重新发送验证码");
                    }
                    else {
                        CommenMsg(data.msg); //系统错误，请重试
                    }
                },
                error: function () {
                    CommenMsg("网络错误！");
                }
            });
        }
    })
})
function checkUserInfo4() {
    if ($("#txt_UserName").val() == "") {
        $("#txt_UserName").focus();
        CommenMsg("请输入您的手机号码");
        return false;
    }
    else if (isPhone(trim($("#txt_UserName").val())) == false) {
        $("#txt_UserName").focus();
        CommenMsg("请输入您的正确手机号码");
        return false;
    }
    else if ($("#txt_PassWord1").val() == "") {
        $("#txt_PassWord1").focus();
        CommenMsg("请输入您的密码");
        return false;
    }
    else if ($("#txt_PassWord2").val() == "") {
        $("#txt_PassWord2").focus();
        CommenMsg("请输入您的密码");
        return false;
    }
    else if ($("#txt_PassWord1").val() != $("#txt_PassWord2").val()) {
        $("#txt_PassWord2").focus();
        CommenMsg("两次密码输入不一致");
        return false;
    }
    else if ($("#txt_PassWord1").val().length < 6) {
        $("#txt_PassWord1").focus();
        CommenMsg("密码长度不能少于6位");
        return false;
    }
    else if ($("#txt_Email").val() == "") {
        $("#txt_Email").focus();
        CommenMsg("请输入您的真实姓名");
        return false;
    }
    else if ($("#txt_yanzhengma").val() == "") {
        $("#txt_yanzhengma").focus();
        CommenMsg("请输入短信验证码");
        return false;
    }

    return true;
}
$(function () {
    $(".login").click(function () {
        if (checkUserInfo()) {
            $.ajax({
                url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
                data: { "type": "_login", "_user": $("#txt_Name").val(), "_vip": $("#hidvip").val(), "_pass": $("#txt_pass").val(), "ck_pass": $("#ck_pass").attr("checked") == "checked" ? 0 : 1, "_kehu": $("#hid_kehu").val() },
                success: function (data) {
                    if (data.msg == "登录成功") {
                        if ($("#hid_go").val() != "") {
                            __msv_m("login");
                            location.href = $("#hid_go").val();
                        }
                        else if (data.kehu == "1") {
                            __msv_m("login");
                            location.href = "/kehumanage/checkcard.html";
                        }
                        else {
                            __msv_m("login");
                            location.href = "/manage/center.html";
                        }
                    } else { CommenMsg(data.msg); }
                },
                error: function () {
                    CommenMsg("网络错误！");
                }
            });
        }
    });
});
function checkUserInfo() {
    if ($("#txt_Name").val() == "") {
        $("#txt_Name").focus();
        CommenMsg("请输入您的Email或手机号码");
        return false;
    }
    if ($("#txt_pass").val() == "") {
        CommenMsg("请输入您的登录密码"); $("#txt_pass").focus(); return false;
    }
    return true;
}
//密码是否修改成功
$(function () {
    $(".link_btn3").click(function () {
        if (checkUserInfo2()) {
            $.ajax({
                url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
                data: { "type": "_passedit", "_old": $("#txt_Old").val(), "_newpass": $("#txt_New").val() },
                success: function (data) {
                    if (data.msg == "1") {
                        CommenMsg('您的密码修改成功,请您牢记！');
                        $("#txt_Old").val("");
                        $("#txt_New").val("");
                        $("#txt_New1").val("");
                    }
                    else {
                        CommenMsg("您的密码修改失败,请您重试！");
                    }
                },
                error: function () {
                    CommenMsg("网络错误！");
                }
            });
        }
    });
});
function checkUserInfo2() {
    if ($("#txt_Old").val() == "") {
        $("#txt_Old").focus();
        CommenMsg("请输入您的原始密码！");
        return false;
    }
    if ($("#txt_New").val() == "") {
        $("#txt_New").focus();
        CommenMsg("请输入您的新密码！");
        return false;
    }
    if ($("#txt_New1").val() == "") {
        $("#txt_New1").focus();
        CommenMsg("请您输入确认密码！");
        return false;
    }
    if ($("#txt_New").val().length < 6) {
        $("#txtNew").focus();
        CommenMsg("密码长度不能少于6位！");
        return false;
    }
    if ($("#txt_New").val() != $("#txt_New1").val()) {
        $("#txt_New1").focus();
        CommenMsg("两次密码输入不一致！");
        return false;
    }
    return true;
}
function trim(str) {
    for (var i = 0; i < str.length && str.charAt(i) == " "; i++);
    for (var j = str.length; j > 0 && str.charAt(j - 1) == " "; j--);
    if (i > j) return "";
    return str.substring(i, j);
}
var XmlHttp = null;
function createXMLHttpRequest() {
    XmlHttp = null;
    var XMLHttpFactories = [
		function () { return new XMLHttpRequest() },
		function () { return new ActiveXObject("Msxml2.XMLHTTP") },
		function () { return new ActiveXObject("Msxml3.XMLHTTP") },
		function () { return new ActiveXObject("Microsoft.XMLHTTP") },
	];
    for (var i = 0; i < XMLHttpFactories.length; i++) {
        try {
            XmlHttp = XMLHttpFactories[i]();
        }
        catch (e) {
            continue;
        }
        break;
    }
}
function city_chanage11() {
    var classID = document.getElementById("sel_c11").value;
    createXMLHttpRequest();
    var sendInfo = "classID=" + classID + "&type=0";
    XmlHttp.open("POST", "../WebPage/SaveInfo.aspx", false);
    XmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    XmlHttp.send(sendInfo);
    var val = unescape(XmlHttp.responseText);
    var AllArray = new Array(2);
    var FirstArray = new Array();
    var secondArray = new Array();
    AllArray = val.split(";");
    FirstArray = AllArray[0].split(",");
    secondArray = AllArray[1].split(",");
    document.getElementById("sel_c21").length = 0;
    for (var i = 0; i < FirstArray.length; i++) {
        var oOption = document.createElement("OPTION");
        oOption.text = secondArray[i];
        oOption.value = FirstArray[i];
        document.getElementById("sel_c21").options.add(oOption);
    }
    document.getElementById("sel_c31").length = 0;
    var NOption = document.createElement("OPTION");
    NOption.text = "";
    NOption.value = "0";
    document.getElementById("sel_c31").options.add(NOption);
}
function city_chanage21() {
    var classID = document.getElementById("sel_c21").value;
    createXMLHttpRequest();
    var sendInfo = "classID=" + classID + "&type=1";
    XmlHttp.open("POST", "../WebPage/SaveInfo.aspx", false);
    XmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    XmlHttp.send(sendInfo);
    var val = unescape(XmlHttp.responseText);
    var AllArray = new Array(2);
    var FirstArray = new Array();
    var secondArray = new Array();
    AllArray = val.split(";");
    FirstArray = AllArray[0].split(",");
    secondArray = AllArray[1].split(",");
    document.getElementById("sel_c31").length = 0;
    for (var i = 0; i < FirstArray.length; i++) {
        var oOption = document.createElement("OPTION");
        oOption.text = secondArray[i];
        oOption.value = FirstArray[i];
        document.getElementById("sel_c31").options.add(oOption);
    }
}


function city_chanage1() {
    var classID = document.getElementById("sel_c1").value;
    createXMLHttpRequest();
    var sendInfo = "classID=" + classID + "&type=0";
    XmlHttp.open("POST", "../WebPage/SaveInfo.aspx", false);
    XmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    XmlHttp.send(sendInfo);
    var val = unescape(XmlHttp.responseText);
    var AllArray = new Array(2);
    var FirstArray = new Array();
    var secondArray = new Array();
    AllArray = val.split(";");
    FirstArray = AllArray[0].split(",");
    secondArray = AllArray[1].split(",");
    document.getElementById("sel_c2").length = 0;
    for (var i = 0; i < FirstArray.length; i++) {
        var oOption = document.createElement("OPTION");
        oOption.text = secondArray[i];
        oOption.value = FirstArray[i];
        document.getElementById("sel_c2").options.add(oOption);
    }
    document.getElementById("sel_c3").length = 0;
    var NOption = document.createElement("OPTION");
    NOption.text = "";
    NOption.value = "0";
    document.getElementById("sel_c3").options.add(NOption);
}
function city_chanage2() {
    var classID = document.getElementById("sel_c2").value;
    createXMLHttpRequest();
    var sendInfo = "classID=" + classID + "&type=1";
    XmlHttp.open("POST", "../WebPage/SaveInfo.aspx", false);
    XmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    XmlHttp.send(sendInfo);
    var val = unescape(XmlHttp.responseText);
    var AllArray = new Array(2);
    var FirstArray = new Array();
    var secondArray = new Array();
    AllArray = val.split(";");
    FirstArray = AllArray[0].split(",");
    secondArray = AllArray[1].split(",");
    document.getElementById("sel_c3").length = 0;
    for (var i = 0; i < FirstArray.length; i++) {
        var oOption = document.createElement("OPTION");
        oOption.text = secondArray[i];
        oOption.value = FirstArray[i];
        document.getElementById("sel_c3").options.add(oOption);
    }
}
$(function () {
    $(".link_btn4").click(function () {
        if (checkUserInfo3()) {
            $.ajax({
                url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
                data: { "type": "_cinfoedit", "_RealName": $("#txt_RealName").val(), "_Sex": $("input[name='sex']:checked").val(), "_Birthday": $("#txt_Birthday").val(), "_sel_c3": $("#sel_c3").val(), "_Addresses": $("#txt_Addresses").val(), "_Telephone": $("#txt_Telephone").val(), "_Phone": $("#txt_Phone").val(), "_Email": $("#txt_Email").val() },
                success: function (data) {
                    if (data.msg == "修改成功") {
                        CommenMsg('您的信息修改成功,请您牢记！');
                    }
                    else {
                        CommenMsg("您的信息修改失败,请您重试！");
                    }
                },
                error: function () {
                    CommenMsg("网络错误！");
                }
            });
        }
    })
})
function checkUserInfo3() {
    if ($("#txt_RealName").val() == "") {
        $("#txt_RealName").focus();
        CommenMsg("请输入您的姓名");
        return false;
    } if ($("#sel_c3").val() == "0") {
        $("#sel_c3").focus();
        CommenMsg("请选择您所在的区域");
        return false;
    }
    if ($("#txt_Birthday").val() == "") {
        $("#txt_Birthday").focus();
        CommenMsg("请选择您的生日");
        return false;
    }
    if ($("#txt_Addresses").val() == "") {
        $("#txt_Addresses").focus();
        CommenMsg("请输入您所在地的详细地址");
        return false;
    }
    if (isTelephone(trim($("#txt_Telephone").val())) == false) {
        $("#txt_Telephone").focus();
        CommenMsg("您输入的电话号码有错误。区号和电话号码之间请用-分割");
        return false;
    }
    if ($("#txt_Telephone").val() == "" && $("#txt_Phone").val() == "") {
        $("#txt_Telephone").focus();
        CommenMsg("请您填写您的电话号码或手机号其中一项");
        return false;
    }
    //     /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/  手机号验证
    if (isPhone(trim($("#txt_Phone").val())) == false) {
        $("#txt_Phone").focus();
        CommenMsg("请输入您的正确手机号码");
        return false;
    }
    if (isEmail(trim($("#txt_Email").val())) == false) {
        $("#txt_Email").focus();
        CommenMsg("请输入有效的邮箱!");
        return false;
    }
    return true;
}
function isPhone(inputString) {
    var partten = /^1[3,5,8]\d{9}$/;
    var fl = false;
    if (partten.test(inputString)) {
        return true;
    }
    else {
        return false;
    }
}
function isEmail(inputString) {
    var partten = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if (partten.test(inputString)) {
        return true;
    }
    else {
        return false;
    }
}
function isTelephone(inputString) {
    var partten = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
    if (partten.test(inputString)) {
        return true;
    }
    else {
        return false;
    }
}
var CancelOrder = function (opt) {
    $.ajax({
        url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
        data: { "type": "_cancel", "_OrderID": opt },
        success: function (data) {
            if (data.msg == "取消成功") {
                CommenMsg(data.msg);

                $(".canelorder").click(function () {
                    location.href = "/manage/myOrder.html?flag=3";
                });

            } else {
                CommenMsg(data.msg);
            }
        },
        error: function () {
            CommenMsg("网络错误！");
        }
    });
}


$(function () {
    $("#btn_search").click(function () {
        if (checksearchInfo()) {
            location.href = "/manage/myOrder.html?flag=" + $("#hid_falg").val() + "&key=" + escape($("#txt_search").val());
        }
    });
});
function checksearchInfo() {
    if ($("#txt_search").val() == "输入订单号...") {
        $("#txt_search").focus();
        CommenMsg("请输入您要查找的订单号");
        return false;
    }
    return true;
}



//自定义信息提示
function CommenMsg(msg) {
    $(".ui_popup").hide();
    $("#coupon_turemsg").popupFn();
    $("#commenmsg").html(msg);
}


var CommendPage = function (npage) {
    var classID = document.getElementById("key").value;
    createXMLHttpRequest();
    var sendInfo = "Product=" + classID + "&page=" + npage;
    XmlHttp.open("POST", "../WebPage/ProductPage.aspx", false);
    XmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    XmlHttp.send(sendInfo);
    var val = unescape(XmlHttp.responseText);
    $("#dp_page").html(val)
}



var addressnoexistes = function (ID) {
    $.ajax({
        url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
        data: { "type": "_ordershouhuoloanding", "ID": ID },
        success: function (data) {

            $("#hid_cons").val(ID);
            $("#new_add").slideDown(300);
            $("#new_add").html(data.info);
        },
        error: function () {
            CommenMsg("网络错误！");
        }
    });
}

//加载收货地址列表
var ordershouhuolist = function () {
    $.ajax({
        url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
        data: { "type": "_ordershouhuolist", "ID": $("#hid_cons").val(), "zt": $("#hid_zt").val() }, //zt
        success: function (data) {
            if (data.userid > 0) {
                if ($("#hid_zt").val() == -2) {
                    $("#hid_in").val("2");
                    $("#dmsg").hide();
                    $("#shr").html("收货人信息&nbsp;&nbsp;&nbsp;&nbsp;<a href='/about/DeliveryRange.html' target='_blank' class='cblue'>查看配送范围</a>");
                }
            }
            if (data.info == -5) {
                addressnoexistes("0");
                $("#shouhoulist").html(''); //删除收货地址/最后一条没有了
            }
            else {
                $("#shouhoulist").html(data.msg)
            }
            yunhuilist(data.info, "0");
            //loadtime(data.areaid);
            loadtime(data.waihuan);
            $("#hid_dizhi").val(data.waihuan);
        },
        error: function () {
            CommenMsg("网络错误！");
        }
    });
}

//加载收货时间
var loadtime = function (waihuan) {
    if (waihuan == undefined) {
        waihuan = "0"; //默认内环
    }


    if ($("#hid_mqjtime").val() == "0") {
        $.ajax({
            url: "../WebPage/InvoicePage.aspx", dataType: "json", type: "post", timeout: "10000",
            data: { "type": "_loadingtime", "waihuan": waihuan, "time": $("#txt_Day").val(), "_mqj": $("#hid_mqjtime").val() },
            success: function (data) {
                $("#Hid_Max1").val(data.max1);
                $("#Hid_Max2").val(data.max2);
                var FirstArray = new Array();
                var secondArray = new Array();
                FirstArray = data.begintime1.split(";");
                secondArray = data.begintime2.split(";");
                document.getElementById("hourSelect").length = 0;
                for (var i = 0; i < FirstArray.length; i++) {
                    if (FirstArray[i] != "") {
                        var oOption = document.createElement("OPTION");
                        oOption.text = FirstArray[i];
                        oOption.value = secondArray[i];
                        document.getElementById("hourSelect").options.add(oOption);
                    }

                }
                FirstArray = data.endtime1.split(";");
                secondArray = data.endtime2.split(";");
                document.getElementById("hourEndSelect").length = 0;
                for (var i = 0; i < FirstArray.length; i++) {
                    if (FirstArray[i] != "") {
                        var oOption = document.createElement("OPTION");
                        oOption.text = FirstArray[i];
                        oOption.value = secondArray[i];
                        document.getElementById("hourEndSelect").options.add(oOption);
                    }
                }
            },
            error: function () {
                CommenMsg("网络错误！");
            }
        });
    }
    else if ($("#hid_mqjtime").val() == "1") {
        waihuan = "2";
        $.ajax({
            url: "../WebPage/InvoicePage.aspx", dataType: "json", type: "post", timeout: "10000",
            data: { "type": "_loadingtime", "waihuan": waihuan, "time": $("#txt_Day").val(), "_mqj": $("#hid_mqjtime").val() },
            success: function (data) {
                $("#Hid_Max1").val(data.max1);
                $("#Hid_Max2").val(data.max2);
                var FirstArray = new Array();
                var secondArray = new Array();
                FirstArray = data.begintime1.split(";");
                secondArray = data.begintime2.split(";");
                document.getElementById("hourSelect").length = 0;
                for (var i = 0; i < FirstArray.length; i++) {
                    if (FirstArray[i] != "") {
                        var oOption = document.createElement("OPTION");
                        oOption.text = FirstArray[i];
                        oOption.value = secondArray[i];
                        document.getElementById("hourSelect").options.add(oOption);
                    }

                }
                FirstArray = data.endtime1.split(";");
                secondArray = data.endtime2.split(";");
                document.getElementById("hourEndSelect").length = 0;
                for (var i = 0; i < FirstArray.length; i++) {
                    if (FirstArray[i] != "") {
                        var oOption = document.createElement("OPTION");
                        oOption.text = FirstArray[i];
                        oOption.value = secondArray[i];
                        document.getElementById("hourEndSelect").options.add(oOption);
                    }
                }
            },
            error: function () {
                CommenMsg("网络错误！");
            }
        });
    }
}
//删除收货地址
var deleteshouhuo = function (ID) {
    $.ajax({
        url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
        data: { "type": "_ordershouhuodelete", "ID": ID },
        success: function (data) {
            if (data.msg == "1") {
                ordershouhuolist();
            }
            else { CommenMsg("删除失败"); }
        },
        error: function () {
            CommenMsg("网络错误！");
        }
    });
}
function checkOrderShouHuo() {
    if ($("#txt_name").val() == "") {
        $("#txt_name").focus();
        CommenMsg("请输入收货人姓名");
        return false;
    }
    if ($("#txt_name").val().length < 2) {
        $("#txt_name").focus();
        CommenMsg("收货人姓名不少于两位");
        return false;
    }
     if ($("#sel_c3").val() == "0") {
        $("#sel_c3").focus();
        CommenMsg("请您选择收货人所在区域");
        return false;
    }
    if ($("#txt_address").val() == "") {
        $("#txt_address").focus();
        CommenMsg("请您输入您的街道地址");
        return false;
    }
    if ($("#txt_movephone").val() == "" && $("#txt_fixphone").val() == "") {
        $("#txt_Telephone").focus();
        CommenMsg("手机号或电话号码至少填写其中的一项");
        return false;
    }
    if (isPhone(trim($("#txt_movephone").val())) == false && $("#txt_movephone").val() != "") {
        $("#txt_movephone").focus();
        CommenMsg("请输入您的正确手机号码");
        return false;
    }
    if (isTelephone(trim($("#txt_fixphone").val())) == false && $("#txt_fixphone").val() != "") {
        $("#txt_fixphone").focus();
        CommenMsg("请您正确输入您的电话号码");
        return false;
    }
    return true;
}
var EditOrderShouHou = function () {
    if (checkOrderShouHuo()) {
        $.ajax({
            url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
            data: { "type": "_ordershouhuoedit", "_ID": $("#hid_cons").val(), "_RealName": $("#txt_name").val(), "_AreaID": $("#sel_c3").val(), "_Address": $("#txt_address").val(), "_Movephone": $("#txt_movephone").val(), "_Fixphone": $("#txt_fixphone").val() },
            success: function (data) {
                if (data.msg == "1") {
                    $("#new_add").slideUp(300);
                    ordershouhuolist();
                }
                else {
                    CommenMsg("您的信息修改失败,请您重试！");
                }
            },
            error: function () {
                CommenMsg("网络错误！");
            }
        });
    }
}
var yunhuilist = function (ID, areaid) {
    $.ajax({
        url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
        data: { "type": "_yunhuilist", "ID": ID, "_areaid": areaid },
        success: function (data) {
            if (data.msg == "1") {
                $("#sp_yunfen").html(data.yunfen);
                $("#hid_yunfei").val(data.yunfen);
                $("#yunhui").html(data.info);
                $("#hid_cjson").val(data.cjson);
                totalOrderPrice();
            }
            else { CommenMsg("数据加载失败，请重试"); }
        },
        error: function () {
            CommenMsg("网络错误！");
        }
    });
}
var selectshouhuo = function (ID) {
    $("#new_add").slideUp(300);

    var areaid = Array();
    areaid = ID.split(',');
    var id = areaid[0];
    var waihuan = areaid[1];

    yunhuilist(id, "0");
    loadtime(waihuan);
    $("#hid_dizhi").val(waihuan)
}
//------------------------
//编辑加载数据列表
var editshouhuo = function (ID) {
    $.ajax({
        url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
        data: { "type": "_ordershouhuoloanding", "ID": ID, "Shouhr": $("#Shouhr").val() },
        success: function (data) {
            if ($("#hid_in").val() == "1") {
                $("#shouhoulist").html(data.msg)
                yunhuilist(data.info, "0");
                //loadtime(data.areaid);
                loadtime(data.waihuan);
                $("#Shouhr").val("");
            }
            else {
                $("#hid_cons").val(ID);
                $("#new_add").slideDown(300);
                $("#new_add").html(data.info);
                yunhuilist(ID, "0");
            }
            //            }
            //            else { alert("数据加载失败"); }
        },
        error: function () {
            CommenMsg("网络错误！");
        }
    });
}
//加载发票列表
var orderinvoicelist = function () {
    $.ajax({
        url: "../WebPage/InvoicePage.aspx", dataType: "json", type: "post", timeout: "10000",
        data: { "type": "_orderinvoicelist", "ID": $("#hid_invoice").val() },
        success: function (data) {
            $("#invoicelist").html(data.msg)
        },
        error: function () {
            CommenMsg("网络错误！");
        }
    });
}
//删除发票信息
var deleteinvoice = function (ID) {
    $.ajax({
        url: "../WebPage/InvoicePage.aspx", dataType: "json", type: "post", timeout: "10000",
        data: { "type": "_orderinvoicedelete", "ID": ID },
        success: function (data) {
            if (data.msg == "1") {
                orderinvoicelist();
            }
            else { CommenMsg("删除失败！"); }
        },
        error: function () {
            CommenMsg("网络错误！");
        }
    });
}
function checkInVioce() {
    if ($("input[name='taitou']:checked").val() == 1 && $("#txt_danwei").val() == "") {
        $("#txt_danwei").focus();
        CommenMsg("请您输入单位名称！");
        return false;
    }
    return true;
}
var saveinvoice = function () {
    if (checkInVioce()) {
        $.ajax({
            url: "../WebPage/InvoicePage.aspx", dataType: "json", type: "post", timeout: "10000",
            data: { "type": "_orderinvoiceedit", "_ID": $("#hid_invoice").val(), "_danwei": $("#txt_danwei").val(), "_taitou": $("input[name='taitou']:checked").val(), "_reirong": $("#sel_Invoice").val() }, //
            success: function (data) {
                if (data.msg == "1") {
                    $("#new_fp").slideUp(300);
                    orderinvoicelist();
                }
                else {
                    CommenMsg("您的信息修改失败,请您重试！");
                }
            },
            error: function () {
                CommenMsg("网络错误！");
            }
        });
    }
}
var editinvoice = function (ID) {
    $.ajax({
        url: "../WebPage/InvoicePage.aspx", dataType: "json", type: "post", timeout: "10000",
        data: { "type": "_orderinvoiceloanding", "ID": ID },
        success: function (data) {
            if (data.msg == "1") {
                $("#hid_invoice").val(ID);
                $("#new_fp").slideDown(300);
                $("#new_fp").html(data.info)
            }
            else { CommenMsg("数据加载失败！"); }
        },
        error: function () {
            CommenMsg("网络错误！");
        }
    });
}
var selectinvoice = function (ID) {
    if (ID == 0) { $("#tr_company").slideUp(300); $("#txt_danwei").val("") }
    else { $("#tr_company").slideDown(300); }
}

//闪电购 发票编辑
var shaeditinvoice = function () {
    var fpkey = $("input[name='fp']:checked").val();
    var voice = Array();
    voice = fpkey.split(',');
    if (voice[1] == "个人") {
        $("#geren").attr("checked", true);
        $("#tr_company").hide();
        if (voice[3] == "蛋糕") {
            $("#sel_Invoice").val("蛋糕");
        }
        else {
            $("#sel_Invoice").val("食品");
        }
    }
    else if (voice[1] == "公司") {
        $("#gongsi").attr("checked", true);
        $("#tr_company").show();
        $("#txt_danwei").val(voice[2]);
        if (voice[3] == "蛋糕") {
            $("#sel_Invoice").val("蛋糕");
        }
        else {
            $("#sel_Invoice").val("食品");
        }
    }
    $("#new_fp").slideDown(300);
}

//闪电购 发票添加
var ShaSaveinvoice = function () {
    if (checkInVioce()) {
        $.ajax({
            url: "../WebPage/InvoicePage.aspx", dataType: "json", type: "post", timeout: "10000",
            data: { "type": "_shasaveinvoice", "_ID": $("#hid_invoice").val(), "_danwei": $("#txt_danwei").val(), "_taitou": $("input[name='taitou']:checked").val(), "_reirong": $("#sel_Invoice").val() }, //
            success: function (data) {
                if (data.msg == "1") {
                    $("#invoicelist").html(data.info)
                    $("#new_fp").slideUp(300);
                }
                else {
                    CommenMsg("您的发票添加失败,请您重试！");
                }
            },
            error: function () {
                CommenMsg("网络错误！");
            }
        });
    }
}

//蛋糕卡验证
function checkincakeCard(codetype) {
    if (codetype == 0) {
        if ($("#txt_code").val() == "") {
            $("#txt_code").focus();
            CommenMsg("请您输入蛋糕卡ID的后五位 ");
            return false;
        }
        if ($("#txt_code").val().length != 5) {
            $("#txt_code").focus();
            CommenMsg("请您输入蛋糕卡ID的后五位 ");
            return false;
        }
        if ($("#txt_word").val() == "") {
            $("#txt_word").focus();
            CommenMsg("请您输入蛋糕卡密码");
            return false;
        }
    }
    else if (codetype == 1) {
        if ($("#txt_xinjinID").val() == "") {
            $("#txt_xinjinID").focus();
            CommenMsg("请您输入现金券ID的后五位 ");
            return false;
        }
        if ($("#txt_xinjinID").val().length != 5) {
            $("#txt_xinjinID").focus();
            CommenMsg("请您输入现金券ID的后五位 ");
            return false;
        }
        if ($("#txt_xinjinCode").val() == "") {
            $("#txt_xinjinCode").focus();
            CommenMsg("请您输入现金券密码");
            return false;
        }
    }
    else if (codetype == 2) {
        if ($("#txt_tuan").val() == "") {
            $("#txt_tuan").focus();
            CommenMsg("请您优惠/团购券密码");
            return false;
        }
    }

    return true;
}



///客户蛋糕卡验证开始
var kuhuCheckCard = function (codetype) {
    if (checkincakeCard(codetype)) {
        var CodeID = $("#txt_code").val();
        var CodeWord = $("#txt_word").val();
        $("#hidSN").val(CodeWord);
        $.ajax({
            url: "../WebPage/InvoicePage.aspx", dataType: "json", type: "post", timeout: "10000",
            data: { "type": "_kehucodeyuanzheng", "_codetype": codetype, "_codeID": CodeID, "_codeCode": CodeWord }, //
            success: function (data) {
                if (data.msg == "验证成功") {
                    var cakemsg = "验证成功，蛋糕卡面额值：" + data.cakevalue
                    $("#yangzhengcake").html(cakemsg);

                    $(".ui_popupcakeok").hide();
                    $("#coupon_turecakeok").popupFn();
                }
                else {
                    CommenMsg(data.msg);
                }
            },
            error: function () {
                CommenMsg("网络错误！");
            }
        });
    }
}
///客户蛋糕卡验证结束


var CheckCard = function (codetype) {
    $("#rhzfh").attr("checked", true);
    changepos("");
    var CodeID = ''; var CodeWord = '';
    if (codetype == 0) {
        CodeID = $("#txt_code").val();
        CodeWord = $("#txt_word").val();
        $("#card_1").html("0");
    }
    else if (codetype == 1) {
        CodeID = $("#txt_xinjinID").val();
        CodeWord = $("#txt_xinjinCode").val();
        $("#card_1").html("0");
    }
    else if (codetype == 2) {
        CodeWord = $("#txt_tuan").val();
    }
    if (checkincakeCard(codetype)) {
        $.ajax({
            url: "../WebPage/InvoicePage.aspx", dataType: "json", type: "post", timeout: "10000",
            data: { "type": "_codeyuanzheng", "_codetype": codetype, "_codeID": CodeID, "_codeCode": CodeWord, "_codepang": $("#hid_pang").val(), "sn": $("#hidSN").val(), "sha": $("#sha").val(), "_remark": $("#hid_remark").val(), "_proinfo": $("#hid_proinfo").val() }, //
            success: function (data) {
                if (data.msg == "验证成功") {
                    $("#Sp_Active").html("0");
                    var code = $("#hidSN").val() + "," + data.code + ","
                    $("#hidSN").val(code);
                    ordercardlist(data.codetype);
                    if (data.mess == "1") {
                        CommenMsg("您输入的蛋糕卡可以在[老客户兑换专区]使用可免补差价");
                    }
                    else if (data.mess == "2") {
                        CommenMsg("此蛋糕卡是母亲节升磅卡，如参加升磅活动请去[老客户兑换专区]兑换");
                    }
                }
                else {
                    CommenMsg(data.msg);
                }
            },
            error: function () {
                CommenMsg("网络错误！");
            }
        });
    }
}
var ordercardlist = function (codetype) {
    //    var id = $("#hid_productid").val();
    //    var str = id.split('-');
    //    for (var i = 0; i < str.length; i++) {
    //        if (str[i] == "372" || str[i] == "373") {
    //            alert("此蛋糕不能用蛋糕卡");
    //        }
    //    }
    $.ajax({
        url: "../WebPage/InvoicePage.aspx", dataType: "json", type: "post", timeout: "10000",
        data: { "type": "_cardlist", "cardtype": codetype, "sn": $("#hidSN").val(), "pricenum": $("#hid_PriceNum").val(), "pricenum1": $("#hid_PriceNum1").val() },
        success: function (data) {
            $("#tbcard").html(data.info);
            if ($("#hid_iscake").val() == "1" && data.info != "" && codetype == "0") {

                CommenMsg("此蛋糕卡仅限蛋糕使用");
            }
            else if ($("#hid_iscake").val() == "1" && data.info != "" && codetype == "1") {
                CommenMsg("此现金券仅限蛋糕使用");
            }
            if (codetype == "2") {  //其他优惠券
                $("#card_1").html(data.value);
            }
            else {
                $("#card_0").html(data.value);  //代金卡
            }
            $("#Sp_ChaPrice").html(data.chaprice);
            totalOrderPrice();
        },
        error: function () {
            CommenMsg("网络错误！");
        }
    });
}
var deletecard = function (temp) {
    $.ajax({
        url: "../WebPage/InvoicePage.aspx", dataType: "json", type: "post", timeout: "10000",
        data: { "type": "_carddelete", "ID": temp, "sn": $("#hidSN").val() },
        success: function (data) {
            if (data.msg == "删除成功") {
                $("#hidSN").val(data.code);
                ordercardlist("");
            }
            else { CommenMsg(data.msg); }
        },
        error: function () {
            CommenMsg("网络错误！");
        }
    });
}
var CheckChooseQuan = function (ID) {


    $(".syouhui").attr("checked", false);
    $("#Sp_YouHui").html("0"); //我的优惠券清空
    $("#hid_SysNo").val("0"); //我的优惠券清空
    $("#hidSN").val("");
    $("#card_1").html("0"); //优惠/团购券清空
    ordercardlist("");
    if (ID != 6) {
        for (var i = 0; i <= 2; i++) {
            if (i == ID) { $("#k" + ID).slideDown(300); }
            else { $("#k" + i).slideUp(300); }
        }
        $("#k_list").slideDown(300);
    }
}

var CheckDefrayManner = function () {
    if ($("#sel_payType").val() == "2") {

        var peisongdate = $("#txt_Day").val();
        if (peisongdate >= "2015-05-08" && peisongdate <= "2015-05-10" && $("#hid_muqinjie").val() == "1") {
            //            if ($("#hid_mqjtime").val() == "1") {
            //                loadtime("2");
            //            }
            //$("#mqj").show();
            //$("#youhuixinxi").hide();
            $("#rhzfh").attr("checked", true); //货到付款选择
            $("#SpActive").slideUp(300);
        }
        else {
            $("#SpActive").slideDown(300);
        }
    }
    else {
        $("#rhzfh").attr("checked", true); //货到付款选择
        $("#SpActive").slideUp(300);
    }
}
var changepos = function (defa) {
    if (defa != "") { CheckChooseQuan(6); } //活动不共享
    $.ajax({
        url: "../WebPage/InvoicePage.aspx", dataType: "json", type: "post", timeout: "10000",
        data: { "type": "_active", "EmpNo": defa, "sha": $("#sha").val() },
        success: function (data) {
            if (data.msg == "1") {
                if (defa != "") {
                    $(".syouhui").attr("checked", false);
                    $("#Sp_YouHui").html("0"); //我的优惠券清空
                    $("#hid_SysNo").val("0"); //我的优惠券清空
                    $("#Sp_Active").html(data.value);
                }
                else { $("#Sp_Active").html(data.value); }
                totalOrderPrice();
            }
            else { CommenMsg(data.msg); }
        },
        error: function () {
            CommenMsg("网络错误！");
        }
    });
}
function getmyqan() {
    $("#myquan").slideDown(300);
}
function totalOrderPrice() {
    var STotal = 0.00;
    var YouHui = 0.00;
    var Active = 0.00;
    var card = 0.00;
    var yunfen = 0.00;
    var Pay = 0.00;
    var ChaPrice = 0.00;
    var huidong = 0.00;

    var InValue = 0.00;
    var OtherValue = 0.00;
    var PcValue = 0.00;
    var card1 = 0.00;

    STotal = parseFloat($("#Sp_Total").html());

    InValue = parseFloat($("#hid_InValue").val());  //incake总金额
    OtherValue = parseFloat($("#hid_OtherValue").val()); //其他公司总金额

    YouHui = parseFloat($("#Sp_YouHui").html());
    Active = parseFloat($("#Sp_Active").html());
    card = parseFloat($("#card_0").html());  //代金卡
    card1 = parseFloat($("#card_1").html());  //其它优惠
    yunfen = parseFloat($("#sp_yunfen").html());
    ChaPrice = parseFloat($("#Sp_ChaPrice").html());
    huidong = parseFloat($("#hid_YouHui").val());

    if (YouHui + Active + card + card1 > 0) { $("#Sp_huodong").html("0"); huidong = 0; }
    else { $("#Sp_huodong").html(huidong); }

    if (InValue < card) {
        PcValue = InValue - card;
    }



    if (ChaPrice > 0) {
        Pay = STotal + yunfen - YouHui - Active - card - card1 - ChaPrice - huidong - PcValue;
    }
    else {
        Pay = STotal + yunfen - YouHui - Active - card - card1 - huidong - PcValue;
    }

    if (Pay < 0) { Pay = 0; }
    $("#Sp_Pay").html(Pay);
    $("#hid_PcValue").val(PcValue);
    if (YouHui + card + card1 + Active > 0) { $("#tbfapiao").slideUp(300); }
    else { $("#tbfapiao").slideDown(300); }
}
var quanorderpage = function (npage) {
    $.ajax({
        url: "../WebPage/MyQuanPage.aspx", dataType: "json", type: "post", timeout: "10000",
        data: { "page": npage, "_remark": $("#hid_remark").val(), "_proinfo": $("#hid_proinfo").val() },
        success: function (data) {
            $("#tb1").html(data.info);
            $("#tb2").html(data.page);
        },
        error: function () {
            CommenMsg("网络错误！");
        }
    });
}
var changequan = function (id) {
    $.ajax({
        url: "../WebPage/InvoicePage.aspx", dataType: "json", type: "post", timeout: "10000",
        data: { "type": "_yuanzhengsingequan", "id": id, "totalvalue": $("#Sp_Total").html(), "proid": $("#hid_jd").val(), "remark": $("#hid_remark").val(), "proinfo": $("#hid_proinfo").val() },
        success: function (data) {
            if (data.msg == "所需消费金额不满足要求") {
                $(".syouhui").attr("checked", false); //货到付款选择single
                CommenMsg(data.msg);
            }
            else if (data.msage = "1" && data.errormsg != "") {
                $(".syouhui").attr("checked", false);
                CommenMsg(data.errormsg);
            } else if (data.msage = "2" && data.errormsg != "") {
                $(".syouhui").attr("checked", false);
                CommenMsg(data.errormsg);
            } else if (data.msage = "3" && data.errormsg != "") {
                $(".syouhui").attr("checked", false);
                CommenMsg(data.errormsg);
            }
            else if (data.msg == "1") {
                //$("#dgk").show();
                if (data.value1 == "1") {
                    //$("#dgk").hide();
                    $("#tbcard").html("");
                    $("#hidSN").val("");
                    $("#Sp_YouHui").html("0");
                    $("#Sp_huodong").html("0");
                    $("#Sp_Active").html("0");
                    $("#card_0").html("0");
                    $("#card_1").html("0");
                    $("#hid_PcValue").val("0");
                    $("#Sp_ChaPrice").html("0");
                }
                youhuichange();
                $("#Sp_YouHui").html(data.value);
                $("#hid_SysNo").val(id); //我的优惠券清空
            }
            else { CommenMsg(data.msg); }
            $("#rhzfh").attr("checked", true);
            $("#Sp_Active").html("0"); //活动清空
            totalOrderPrice();
        },
        error: function () {
            CommenMsg("网络错误！");
        }
    });
}
var youhuichange = function () {
    //$("#hidSN").val("");
    $("#tbcard").html("");
    for (var i = 0; i <= 2; i++)
    { $("#k" + i).slideUp(300); }
    $("#k_list").slideUp(300);
    $("#card_0").html("0"); //我的优惠券清空
}
//
var regNum = /^\d+$/;
function TimeLoading(C1, C2) {
    document.getElementById("Hid_Max1").value = C1;
    document.getElementById("Hid_Max2").value = C2;
}
function AddLoading() { }
function txt_1() {
    var maxvalue = parseInt(document.getElementById("Hid_Max1").value);
    var nowvalue = 0;
    var endvalue = 0;
    if (document.getElementById("hourSelect").value == '090000') { nowvalue = 90000; }
    else if (document.getElementById("hourSelect").value == '093000') { nowvalue = 93000; }
    else {
        var nowvalue = parseInt(document.getElementById("hourSelect").value);
        var endvalue = parseInt(document.getElementById("hourEndSelect").value);

    }
    var s1 = document.getElementById("hourEndSelect");
    if (endvalue > nowvalue + maxvalue) {
        //结束时间大于开始时间，不用判断
    }
    else {
        for (var i = 0; i < s1.options.length; i++) {
            if (parseInt(s1.options[i].value) >= nowvalue + maxvalue) { s1.options[i].selected = true; break; }
        }
    }
}
function txt_2() {
    var nowvalue = 0;
    if (document.getElementById("hourEndSelect").value == '100000') { nowvalue = 90000; }
    else { nowvalue = parseInt(document.getElementById("hourSelect").value); }
    var endvalue = parseInt(document.getElementById("hourEndSelect").value);
    var maxvalue = parseInt(document.getElementById("Hid_Max2").value); ;
    if (document.getElementById("hourEndSelect").value == '100000') { document.getElementById("hourSelect")[0].selected = true; }
    else {
        var s1 = document.getElementById("hourSelect");
        if (nowvalue + maxvalue < endvalue) {
            //结束时间大于开始时间，不用判断
        }
        else {
            for (var i = s1.options.length - 1; i >= 0; i--) {
                if (parseInt(s1.options[i].value) < endvalue - maxvalue) { s1.options[i].selected = true; break; }
            }
        }
    }
}

function maxlen(s) {
    var l = 0; var a = s.split("");
    for (var i = 0; i < a.length; i++)
    { if (a[i].charCodeAt(0) < 299) { l++; } else { l += 2; } }
    return l;
}


var CheckOrder = function () {
    var shouHuo = $("input[name='ConsigneeInfo']:checked").val();
    var Invoice = $("input[name='fp_Invoice']:checked").val(); //是否要发票
    var fpkey = $("input[name='fp']:checked").val(); //选择发票的ID
    var birthday = $("input[name='fp_birthday']:checked").val(); //是否要生日牌 
    var annexarticle = escape($("input[name='annexarticle']:checked").val()); //选择生日牌 中文,英文,
    var anner = 0;
    if (annexarticle == "") { annexarticle = escape($("#birthcard").val()); anner = 1; }
    var fp_heka = $("input[name='fp_heka']:checked").val(); //是否要贺卡 0
    var hk_type = $("input[name='hk_type']:checked").val(); //选择贺卡类型,
    var hekareiRong = escape($("#txt_content").val());
    var beizhu = escape($("input[name='fp_beizhu']:checked").val()); //是否要订单备注
    var benzhuRong = escape($("#txt_benzhu").val());
    var peisongdate = $("#txt_Day").val();
    var peisongtime1 = $("#hourSelect").val();
    var peisongtime2 = $("#hourEndSelect").val();
    var xiawucha = $("#hid_xiawucha").val();
    var Fzpeisong = $("#hid_Fzpeisong").val(); //福州配送


    if (peisongdate == "2015-02-18" && Fzpeisong == "1" && (parseInt(peisongtime1) >= 170000 || parseInt(peisongtime2) > 170000)) {
        CommenMsg("2.18日订单只能配送到下午17点,给您带来的不便敬请谅解。");
        return false;
    }

    if (peisongdate == "2015-02-02" && (parseInt(peisongtime1) >= 160000 || parseInt(peisongtime2) > 160000)) {
        CommenMsg("2.2日订单只能配送到下午4点,给您带来的不便敬请谅解。");
        return false;
    }

    if ((peisongdate == "2015-02-19" || peisongdate == "2015-02-20" || peisongdate == "2015-02-21") && xiawucha == "1") {
        CommenMsg("春节期间，2月19日至2月21日“下午茶”暂停配送，给您造成的不便，敬请谅解！");
        return false;
    }

    if ($("#hid_usersid").val() == "220299") {
        CommenMsg("您好，由于系统原因，该帐号已被锁定，不能提交订单，给您造成的不便，敬请谅解！");
        return false;
    }

    var fapiao = $("input[name='fp']:checked").val(); //发票信息
    var Consignee = $("#hid_cjson").val(); //收货人地址
    var SysNo = $("#hid_SysNo").val(); //优惠券ID
    var DefrayManner = escape($("input[name='DefrayManner']:checked").val()); //选择付款方式,sel_payType
    var payType = $("#sel_payType").val(); //选择付款方式,sel_payType
    var SN = $("#hidSN").val(); //选择付款方式,sel_payType
    var ChaPrice = $("#Sp_ChaPrice").html(); //蛋糕补差价 
    var time = '';
    var str = $("#txt_Day").val();
    var s = Array();
    s = str.split('-');
    for (var i = 0; i < s.length; i++) {
        time += trim(s[i]);
    }
    if (shouHuo == 0) { CommenMsg("请输入您的收货地址"); return false; }
    if ($("#txt_Day").val() == "") { CommenMsg("请您选择收货时间"); return false; }
    if (parseInt($("#hidchecktime").val()) >= parseInt(time)) { CommenMsg("收货时间不能小于当前时间"); return false; }
    //if ($("#hid_vip").val() == "1") { alert("抱歉，此VIP用户不能下订单"); return false; }
    if (anner == 1 && maxlen($("#birthcard").val()) > 14) { CommenMsg("生日牌为7个汉字或14个英文字母"); return false; }


    $.ajax({
        url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
        data: { "type": "_checkusernum", "panic": $("#hid_paniccake").val() },
        success: function (data) {
            if (data.msg == "0") {
                // "cjson": Consignee, 
                $.ajax({
                    url: "../WebPage/AddOrder.aspx", dataType: "json", type: "post", timeout: "10000",
                    data: { "fapiao": fapiao, "cjson": Consignee, "CashPay": $("#Sp_Pay").html(), "InValue": $("#hid_InValue").val(), "OtherValue": $("#hid_OtherValue").val(), "card1": $("#card_1").html(), "PcValue": $("#hid_PcValue").val(), "qgid": $("#hid_qgid").val(), "tgid": $("#hid_tgid").val(), "packid": $("#hid_packid").val(), "json": $("#hid_json").val(), "huodong": $("#Sp_huodong").html(), "discount": $("#hid_zk").val(), "product": $("#hid_p").val(), "vip": $("#hid").val(), "YouHui": $("#Sp_YouHui").html(), "Active": $("#Sp_Active").html(), "code": SN, "card": $("#card_0").html(), "Total": $("#Sp_Total").html(), "payType": payType, "DefrayManner": DefrayManner, "SysNo": SysNo, "peisongtime2": peisongtime2, "peisongdate": peisongdate, "peisongtime1": peisongtime1, "beizhu": beizhu, "benzhuRong": benzhuRong, "hk_type": hk_type, "hekareiRong": hekareiRong, "hk_type": hk_type, "hekareiRong": hekareiRong, "annexarticle": annexarticle, "fp_heka": fp_heka, "shouHuo": shouHuo, "Invoice": Invoice, "fpkey": fpkey, "birthday": birthday, "buchaprice": ChaPrice, "panic": $("#panic").val(), "paniccake": $("#hid_paniccake").val() },
                    success: function (data) {
                        if (data.msg == "订单生成成功") {
                            $(".ui_popup").hide();
                            $("#coupon_ture").popupFn();
                            if ($("#hid").val() == "0") {
                                __msv_m("order", unescape(data.orderid));
                            }
                            var time = setInterval(goLink, 5000); //延迟参数
                            var url = data.url;
                            function goLink() {
                                clearInterval(time); 		//待方法执行完后清除
                                location.href = url;
                            };
                        }
                        else if (data.msg == "1") {
                            CommenMsg("20点以后不能提交次日订单，请您重新选择收货日期，谢谢！");
                        }
                        else if (data.msg == "已售完") {
                            CommenMsg(data.name);
                        }
                        else if (data.msg == "订单量已满") {
                            CommenMsg(data.name);
                        }
                        else {
                            $(".ui_popup").hide();
                            $("#conlost").popupFn();
                            CommenMsg(data.msg);
                        }
                    },
                    error: function () {
                        CommenMsg("网络1错误！");
                    }
                });
            }
            else if (data.msg == "2") {
                $(".ui_popupone").hide();
                $("#coupon_tureone").popupFn();
                // alert("该蛋糕每个用户只能购买一个，请下次再来抢购");
            }
            else {
                $(".ui_popupover").hide();
                $("#coupon_tureover").popupFn();
                // alert("该蛋糕已抢购完，请下次再来抢购");
            }

        },
        error: function () {
            CommenMsg("网络2错误！");
        }
    });
}
var pay_online_order = function () {
    var OrderID = $("#hid_OrderID").val();
    var DefrayManner = $("input[name='DefrayManner']:checked").val();
    $.ajax({
        url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
        data: { "type": "_payorder", "DefrayManner": DefrayManner, "OrderID": OrderID },
        success: function (data) {
            if (data.msg == "1") {
                location.href = data.url;
            }
            else {
                CommenMsg("服务器请求超时间，请重试！");
            }
        },
        error: function () {
            CommenMsg("网络错误！");
        }
    });
}
/////////////0813
var big_btnReset = function () {
    $("#txt_companyName").val("");
    $("#txt_compandyAddress").val("");
    $("#txt_companyNumber").val("");
    $("#txt_dept").val("");
    $("#drp_position").val("0");
    $("#sel_CityCode").val("");
    $("#txt_number").val("");
    $("#txt_name").val("");
    $("#txt_Tel").val("");
    $("#txt_MobilePhone").val("");
}

$(function () {
    $(".big_btnSave").click(function () {
        if (btnshichi()) {
            $.ajax({
                url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
                data: { "type": "_submitshichi", "_companName": $("#txt_companyName").val(), "_compandyAddress": $("#txt_compandyAddress").val(), "_companyNumber": $("#txt_companyNumber").val(), "_dept": $("#txt_dept").val(), "_position": $("#drp_position").val(), "_CityCode": $("#sel_CityCode").val(), "_number": $("#txt_number").val(), "_name": $("#txt_name").val(), "_Tel": $("#txt_Tel").val(), "_MobilePhone": $("#txt_MobilePhone").val() },
                success: function (data) {
                    if (data.msg >= 1) {
                        location.href = "shichitongzhi.html";
                    }
                    else { CommenMsg(data.msg); }
                },
                error: function () {
                    CommenMsg("网络错误！");
                }
            });
        }
    })
})
//判断是否是数字的全局变量
var regNum = /^\d+$/;
var btnshichi = function () {
    if (trim(document.getElementById("txt_companyName").value) == "") {
        CommenMsg("公司名称不能为空");
        //document.getElementById("txt_companyName").focus();
        return false;
    }
    else if (trim(document.getElementById("txt_compandyAddress").value) == "") {
        CommenMsg("公司地址不能为空");
        document.getElementById("txt_compandyAddress").focus();
        return false;
    }
    else if (trim(document.getElementById("txt_companyNumber").value) == "") {
        CommenMsg("公司人数不能为空");
        document.getElementById("txt_companyNumber").focus();
        return false;
    }
    else if (regNum.test(trim(document.getElementById("txt_companyNumber").value)) == false) {
        CommenMsg("请输入正确的公司人数"); document.getElementById("txt_companyNumber").focus();
        return false;
    }
    else if ($("#txt_dept").val() == "") {
        CommenMsg("申请品尝活动的部门不能为空");
        $("#txt_dept").focus();
        return false;
    }
    else if (trim(document.getElementById("drp_position").value) == "0") {
        CommenMsg("请选择品尝地点");
        document.getElementById("drp_position").focus();
        return false;
    }
    else if (trim(document.getElementById("sel_CityCode").value) == "") {
        CommenMsg("请选择您公司所在的区域");
        document.getElementById("sel_CityCode").focus();
        return false;
    }
    else if (trim(document.getElementById("txt_number").value) == "") {
        CommenMsg("参与活动人员数量不能为空");
        document.getElementById("txt_number").focus();
        return false;
    }
    else if (regNum.test(trim(document.getElementById("txt_number").value)) == false) {
        CommenMsg("请输入正确的活动人员数量"); document.getElementById("txt_number").focus();
        return false;
    }
    else if (parseInt(document.getElementById("txt_number").value) > parseInt(document.getElementById("txt_companyNumber").value)) {
        CommenMsg("活动人数不能大于公司人数"); document.getElementById("txt_number").focus();
        return false;
    }
    else if (trim(document.getElementById("txt_name").value) == "") {
        CommenMsg("联系人姓名不能为空");
        document.getElementById("txt_name").focus();
        return false;
    }
    else if (trim(document.getElementById("txt_Tel").value) == "") {
        CommenMsg("办公电话不能为空");
        document.getElementById("txt_Tel").focus();
        return false;
    }
    else if (trim(document.getElementById("txt_MobilePhone").value) == "") {
        CommenMsg("手机号码不能为空");
        document.getElementById("txt_MobilePhone").focus();
        return false;
    }
    else { return true; }
}
//发票管理---------------
function Edit_invoice(ID) {
    $("#hid_ID").val(ID);
    Load_Ainvoice();
}
function Load_Ainvoice() {
    $.ajax({
        url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
        data: { "type": "_load_ainvoice", "_ID": $("#hid_ID").val() },
        success: function (data) {
            $("#add_fapiao").slideDown(0);
            $("#add_fapiao").html(data.msg);
            location.href = "#add_fapiao";
        },
        error: function () {
            CommenMsg("网络错误！");
        }
    });
}
function Del_invoice(ID) {
    $.ajax({
        url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
        data: { "type": "_delinvoice", "_ID": ID },
        success: function (data) {
            if (data.msg == "1") {
                laodInvoicelist();
                CommenMsg("删除发票成功！");
            }
            else {
                CommenMsg("删除发票失败！");
            }
        },
        error: function () {
            CommenMsg("网络错误！");
        }
    });
}
function laodInvoicelist() {
    $.ajax({
        url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
        data: { "type": "_loadinvoice" },
        success: function (data) {
            if (data.msg == "1") {
                $("#addinvoicelist").html(data.option);
                $("#count").html("已有" + data.count + "个发票信息")
            }
            else {
                CommenMsg("加载收货地址失败!");
            }
        },
        error: function () {
            CommenMsg("网络错误!");
        }
    });
}
function checkfapiao() {
    if ($("#selc_1").val() == "") {
        $("#selc_1").focus();
        CommenMsg("请选择发票类型!");
        return false;
    }
    else if ($("input[name='title']:checked").val() == "1" && $("#txt_InvoiceCompany").val() == "") {
        $("#txt_InvoiceCompany").focus();
        CommenMsg("请输入公司名称!");
        return false;
    }
    else if ($("#selc_2").val() == "") {
        $("#selc_2").focus();
        CommenMsg("请选择发票内容!");
        return false;
    }
    return true;
}
var changefapiaoadd = function (ID) {
    if (ID == 0) { $("#companyhh").slideUp(300); $("#txt_InvoiceCompany").val(""); }
    else { $("#companyhh").slideDown(0); }
}
var saveuserInvoice = function () {
    if (checkfapiao()) {
        $.ajax({
            url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
            data: { "type": "_addinvoice", "_ID": $("#hid_ID").val(), "_InvoiceType": $("#selc_1").val(), "_InvoiceTitle": $("input[name='title']:checked").val() == 0 ? "个人" : "公司", "_InvoiceCompany": $("#txt_InvoiceCompany").val(), "_InvoiceContent": $("#selc_2").val() },
            success: function (data) {
                if (data.msg >= 1) {
                    laodInvoicelist();
                    $("#add_fapiao").slideUp(300);
                    if ($("#hid_ID").val() == "0") { CommenMsg("添加发票信息成功!"); }
                    else { CommenMsg("修改发票信息成功!"); }

                }
                else {
                    if ($("#hid_ID").val() == "0") { CommenMsg("添加发票信息失败，请您重试！"); }
                    else { CommenMsg("修改发票信息失败，请您重试！"); }
                }
            },
            error: function () {
                CommenMsg("网络错误!");
            }
        });
    }
}

//纪念日
var editmemorialday = function () {
    if (editjiyuanri()) {
        $.ajax({
            url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
            data: { "type": "_editmemorialday", "_ID": $("#hid_ID").val(), "_MemorialTitle": $("#sel_MemorialTitle1").val(), "_MemorialMonth": $("#sel_month1").val(), "_MemorialDay": $("#sel_day1").val(), "_Detail": $("#txt_Detail1").val() },
            success: function (data) {
                if (data.msg >= 1) {
                    laodMemorialdaylist();
                    $("#edit_memorialday").hide();
                    CommenMsg("修改纪念日信息成功!");
                }
                else {
                    CommenMsg("修改纪念日信息失败，请您重试！");
                }
            },
            error: function () {
                CommenMsg("网络错误！");
            }
        });
    }
}
function editjiyuanri() {
    if ($("#sel_month1").val() == "") {
        $("#sel_month1").focus();
        CommenMsg("请选择月份！");
        return false;
    }
    else if ($("#sel_day1").val() == "") {
        $("#sel_day1").focus();
        CommenMsg("请选择日期！");
        return false;
    }
    else if ($("#sel_MemorialTitle1").val() == "") {
        $("#sel_MemorialTitle1").focus();
        CommenMsg("请纪念日名称！");
        return false;
    }
    else if ($("#txt_Detail1").val() == "") {
        $("#txt_Detail1").focus();
        CommenMsg("请输入纪念日备注！");
        return false;
    }
    return true;
}
function Edit_memorialday(ID) {
    $("#hid_ID").val(ID);
    Load_Amemorialday();

}
function Load_Amemorialday() {
    $.ajax({
        url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
        data: { "type": "_load_amemorialday", "_ID": $("#hid_ID").val() },
        success: function (data) {
            if (data.msg >= 1) {
                $("#sel_month1").val(data.month);
                $("#sel_day1").val(data.day);
                $("#sel_MemorialTitle1").val(data.title);
                $("#txt_Detail1").val(data.detail);
                $("#edit_memorialday").show();
                $("#add_memorialday").hide();
                location.href = "#edit_memorialday";
            }
            else {
                CommenMsg("加载待编辑发票信息失败，请您重试！");
            }
        },
        error: function () {
            CommenMsg("网络错误！");
        }
    });
}
$(function () {
    $(".add_memorialday").click(function () {
        $("#edit_memorialday").hide();
        $("#add_memorialday").show();
    })
})
function Del_memorialday(ID) {
    $.ajax({
        url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
        data: { "type": "_delmemorialday", "_ID": ID },
        success: function (data) {
            if (data.msg == "1") {
                laodMemorialdaylist();
                $("#edit_memorialday").hide();
                CommenMsg("删除纪念日成功!");
            }
            else {
                CommenMsg("删除纪念日失败!");
            }
        },
        error: function () {
            CommenMsg("网络错误");
        }
    });
}
function laodMemorialdaylist() {
    $.ajax({
        url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
        data: { "type": "_loadmemorialday" },
        success: function (data) {
            if (data.msg == "1") {
                $("#addmemorialdaylist").html(data.option);
                $("#count").html("已有" + data.count + "个纪念日")
            }
            else {
                CommenMsg('加载收货地址失败');
            }
        },
        error: function () {
            CommenMsg('网络错误');
        }
    });
}
$(function () {
    $(".link_btnSave1").click(function () {
        if (checkUserInfo10()) {
            $.ajax({
                url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
                data: { "type": "_addmemorialday", "_MemorialTitle": $("#sel_MemorialTitle").val(), "_MemorialMonth": $("#sel_month").val(), "_MemorialDay": $("#sel_day").val(), "_Detail": $("#txt_Detail").val() },
                success: function (data) {
                    if (data.msg >= 1) {
                        $("#add_memorialday").hide();
                        laodMemorialdaylist();
                        $("#sel_MemorialTitle").val("");
                        $("#sel_month").val("");
                        $("#sel_day").val("");
                        $("#txt_Detail").val("");
                        CommenMsg('添加纪念日成功');
                    }
                    else {
                        CommenMsg("添加失败，请您重试！");
                    }
                },
                error: function () {
                    CommenMsg("网络错误！");
                }
            });
        }
    })
})
function checkUserInfo10() {
    if ($("#sel_month").val() == "") {
        $("#sel_month").focus();
        CommenMsg("请选择月份！");
        return false;
    }
    else if ($("#sel_day").val() == "") {
        $("#sel_day").focus();
        CommenMsg("请选择日期！");
        return false;
    }
    else if ($("#sel_MemorialTitle").val() == "") {
        $("#sel_MemorialTitle").focus();
        CommenMsg("请纪念日名称！");
        return false;
    }
    else if ($("#txt_Detail").val() == "") {
        $("#txt_Detail").focus();
        CommenMsg("请输入纪念日备注！");
        return false;
    }
    return true;
}

var quanpage = function (npage) {
    createXMLHttpRequest();
    var sendInfo = "type=_quan&page=" + npage;
    XmlHttp.open("POST", "../WebPage/SaveInfo.aspx", false);
    XmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    XmlHttp.send(sendInfo);
    var val = unescape(XmlHttp.responseText);
    // alert(val);
    var datearray = new Array();
    datearray = val.split("*");
    $("#tb1").html(datearray[0]);
    $("#tb2").html(datearray[1]);
    $("#tb3").html(datearray[2]);
}
function checkquanvalue() {
    if ($("#txt_code").val() == "") {
        $("#txt_code").focus();
        //alert("请您输入券的密码");
        CommenMsg("请您输入券的密码");
        return false;
    }
    return true;
}
//添加优惠券 提示
$(function () {
    $(".quanmsg").click(function () {
        $(".ui_popup").hide();
        $("#add_coupon").popupFn();
    });
});

$(function () {
    $(".addquan").click(function () {
        if (checkquanvalue()) {
            $.ajax({
                url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
                data: { "type": "_addquan", "code": $("#txt_code").val() },
                success: function (data) {
                    if (data.msg >= 1) {
                        quanpage(1);
                        $("#txt_code").val("");
                        $("#preirong").html("兑换成功");
                        $(".ui_popup").hide();
                        $("#coupon_ture").popupFn();
                    }
                    else {
                        $("#preirong").html("您输入的优惠券或团购号码有误，请您重新输入！");
                        $(".ui_popup").hide();
                        $("#coupon_ture").popupFn();
                    }
                },
                error: function () {
                    CommenMsg("网络错误！");
                }
            });
        }
    })
})
function checkaddreview(id) {
    if ($("#txt_detail" + id).val() == "") {
        $("#txt_detail" + id).focus();
        CommenMsg("请您输入对蛋糕的评价");
        return false;
    }
    else if ($("#txt_detail" + id).val() == "蛋糕口感怎么样？评价一下吧") {
        $("#txt_detail" + id).focus();
        CommenMsg("请您输入对蛋糕的评价");
        return false;
    }
    return true;
}
var addreview = function (order, product, orderid) {
    if (checkaddreview(order)) {
        var Gird = $("#Gird" + order).children(".on").length;
        var Taste = $("#Taste" + order).children(".on").length;
        var Guise = $("#Guise" + order).children(".on").length;
        var Service = $("#Service" + order).children(".on").length;
        var detail = escape($("#txt_detail" + order).val());
        createXMLHttpRequest();
        var sendInfo = "type=_pinglun&_orderid=" + orderid + "&Gird=" + Gird + "&Taste=" + Taste + "&Guise=" + Guise + "&Service=" + Service + "&detail=" + detail + "&_productid=" + product + "&cid=" + order;
        XmlHttp.open("POST", "../WebPage/SaveInfo.aspx", false);
        XmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
        XmlHttp.send(sendInfo);
        var val = unescape(XmlHttp.responseText);
        if (val == "2") {
            CommenMsg("您已对此商品已发表评论");
        }
        else if (val == "1") {
            CommenMsg("评论成功，谢谢您的参与！");

            $(".quanmsg").click(function () {
                if ($("#hid_go").val() == "0") {
                    location.href = "/manage/my-review.html?flag=0";
                }
                else { location.href = "/manage/OrderInfo-" + $("#hid_go").val() + ".html"; }
            });
        }
        else { CommenMsg("服务超时，请您重试！"); }
    }
}
function checkjifen(ID) {
    $("#ID").val(ID);

    $.ajax({
        url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
        data: { "type": "_messaage", "_ID": ID },
        success: function (data) {
            if (data.msg >= 1) {
                $(".ui_popup").hide();
                $("#duihuanok").popupFn();
                //
                $("#point").html(data.point)
                $("#remark").html(data.remark)
                $("#passTime").html("有效期:" + data.passtime)
                $("#Price").val(data.price);
                $("#Remark").val(data.remark);
                $("#PassTime").val(data.passtime1);
                $("#Point").val(data.point);
                $("#GiftName").val(data.giftname);
            }
            else if (data.msg == "登录") {
                location.href = "/login.html";
            }
            else {
                $(".ui_popup").hide(); //登录
                $("#coupon_ok").popupFn();
                $("#phtml").html(data.msg);
            }
        },
        error: function () {
            CommenMsg("网络错误！");
        }
    });
}
$(function () {
    $(".jifencheck").click(function () {
        $.ajax({
            url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
            data: { "type": "_youhuiq", "_ID": $("#ID").val() },
            success: function (data) {
                $("#ahtml").html("兑换中...");
                if (data.msg == "兑换成功") {
                    $(".ui_popup").hide();
                    $("#coupon_ok").popupFn();
                    $("#phtml").html(data.msg);
                    if ($("#hidpage").val() == "1") { location.href = "/manage/myquan.html"; }
                } else {
                    $(".ui_popup").hide();
                    $("#coupon_ok").popupFn();
                    $("#phtml").html(data.msg);
                }
                $("#ahtml").html("确定");
            },
            error: function () {
                CommenMsg("网络错误！");
                $("#ahtml").html("确定");
            }
        });
    });
});
//VIP
$(function () {
    $(".loginvip").click(function () {
        if (CheckVip()) {
            $("#hid_name").val($("#txt_Name").val());
            $.ajax({
                url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
                data: { "type": "_vipyz", "_user": trim($("#txt_Name").val()), "_pass": $("#txt_pass").val() },
                success: function (data) {
                    if (data.msg == "验证成功") {
                        $("#hid_phone").val(data.IsPhone);
                        if (data.IsPhone == "1") {
                            $("#hid_vipyanzheng").show();
                            $("#hid_rzemail").hide();
                            $("#loginuser").show();
                            $("#hid_vip").val(data.vip);
                            $(".ui_popup").hide();
                            $("#add_coupon").popupFn();
                            $("#phtml").html(data.msg);
                        }
                        else {
                            $("#hid_vipyanzheng").show();
                            $("#hid_rzemail").show();
                            $("#loginuser").hide();
                            $("#sp_e").html(data.email);
                            $("#hid_code").val(data.email);
                            $("#hid_vip").val(data.vip);
                            $(".ui_popup").hide();
                            $("#add_coupon").popupFn();
                            $("#phtml").html(data.msg);
                        }
                    } else {
                        $(".ui_popup").hide();
                        $("#coupon_ture").popupFn();
                        $("#preirong").html(data.msg);
                    }
                },
                error: function () {
                    //alert("网络错误！");
                    CommenMsg("网络错误！");
                }
            });
        }
    });
});
function CheckEmail() {
    if ($("#txt_Email").val() == "") {
        $("#txt_Email").focus();
        MsgXianshi("请您输入您的邮箱");
        return false;
    }
    $.ajax({
        url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
        data: { "type": "_checkvipemail", "email": $("#txt_Email").val() + $("#hid_code").val() },
        success: function (data) {
            if (data.msg >= 1) {
                $("#hid_s").val(data.code);
                $("#hid_en").val($("#txt_Email").val());
                MsgXianshi("邮件已发送至您的邮箱，请您查收");
            }
            else {
                $(".ui_popup").hide();
                $("#coupon_ture").popupFn();
                $("#preirong").html(data.msg);
            }
        },
        error: function () {
            MsgXianshi("网络错误！");
        }
    });
}
$(function () {
    $("#txt_MovePhoe").blur(function () {
        $.ajax({
            url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
            data: { "type": "_vipusername", "_UserName": $("#txt_MovePhoe").val(), "_vip": $("#hid_vip").val() },
            success: function (data) {
                if (data.msg == '1') {
                }
                else {
                    txt_MovePhoe("该用户已存在！");
                    $("#txt_MovePhoe").focus();
                }
            },
            error: function () {
                txt_MovePhoe("网络错误！");
            }
        });
    });
})


function CheckVipEmail() {
    if ($("#txt_CodeYuanZheng").val() == "") {
        $("#txt_CodeYuanZheng").focus();
        MsgXianshi("请您输入您的验证码");
        return false;
    }
    if ($("#txt_CodeYuanZheng").val() != $("#hid_s").val()) {
        $("#txt_CodeYuanZheng").focus();
        MsgXianshi("验证码不相符");
        return false;
    }
    $("#hid_yz").val("1");
    $("#p_emil").html('您的注册邮箱：' + $("#hid_en").val() + $("#hid_code").val());
    $("#p_shu").slideUp(300);
    $("#p_m").slideUp(300);
    $("#p_emil").slideDown(300);
    return true;
}

//ViP认证 验证信息显示
function MsgXianshi(msg) {
    $("#selectMsg").show();
    $("#Msgxinxi").html(msg);
}
//验证信息隐藏
$(function () {
    $(".Msgclose").click(function () {
        $("#selectMsg").hide();
    });
});


function checkVipreg(name) {

    if ($("#hid_yz").val() == "0" && name == "0") {
        $("#txt_Email").focus();
        MsgXianshi("您先验证您的邮箱");
        return false;
    }
    else if ($("#txt_MovePhoe").val() == "") {
        $("#txt_MovePhoe").focus();
        MsgXianshi("请输入您的手机号码");
        return false;
    }
    else if (isPhone(trim($("#txt_MovePhoe").val())) == false) {
        $("#txt_MovePhoe").focus();
        MsgXianshi("请输入您的正确手机号码");
        return false;
    }
    else if ($("#txt_RealName").val() == "") {
        $("#txt_RealName").focus();
        MsgXianshi("请输入您的姓名");
        return false;
    }
    else if ($("#txt_Word1").val() == "") {
        $("#txt_Word1").focus();
        MsgXianshi("请输入您的密码");
        return false;
    }
    else if ($("#txt_Word1").val().length < 6) {
        $("#txt_Word1").focus();
        MsgXianshi("密码长度不能少于6位");
        return false;
    }
    else if ($("#txt_Word2").val() == "") {
        $("#txt_Word2").focus();
        MsgXianshi("请输入您的确认密码");
        return false;
    }
    else if ($("#txt_Word1").val() != $("#txt_Word2").val()) {
        $("#txt_PassWord2").focus();
        MsgXianshi("两次密码输入不一致");
        return false;
    }
    return true;
}
$(function () {
    $(".addvipreg").click(function () {
        var name = $("#hid_phone").val();
        if (checkVipreg(name)) {
            $.ajax({
                url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
                data: { "type": "_vipregster", "_isphone": name, "_UserName": $("#hid_en").val() + $("#hid_code").val(), "_Password": $("#txt_Word1").val(), "_Phone": $("#txt_MovePhoe").val(), "_RealName": $("#txt_RealName").val(), "_vip": $("#hid_vip").val() },
                success: function (data) {
                    if (data.msg == '注册成功') {
                        location.href = "/manage/center.html";
                    }
                    else {
                        CommenMsg("您的信息注册失败,请您重试！");
                    }
                },
                error: function () {
                    CommenMsg("网络错误！");
                }
            });
        }
    })
})

//自定义信息提示
function ComMsg(msg) {
    $(".ui_popup").hide();
    $("#couponmsg").popupFn();
    $("#commsg").html(msg);
    $("#hid_vipyanzheng").hide();
}


function CheckVip() {
    if ($("#txt_Name").val() == "") {
        $("#txt_Name").focus();
        ComMsg("请您输入VIP认证用户名");
        return false;
    }
    if ($("#txt_pass").val() == "") {
        ComMsg("请您输入VIP认证登录密码");
        $("#txt_pass").focus();
        return false;
    }
    return true;
}
function incakeserver() {
    $(".ui_popup").hide();
    $("#shop_sale").popupFn();
}
function ck_Agg() {
    if ($("#ck_red").attr("checked") == "checked") {
        $("#shop_zt").attr("disabled", false);
        $("#new_add").slideUp(300);
    }
    else {
        $("#shop_zt").attr("disabled", true);
        $("#shop_zt").attr("checked", false);
        $("#hid_zt").val("1");
        ordershouhuolist();
    }
}
function ck_zt() {
    if ($("#shop_zt").attr("checked") == "checked") {
        $("#hid_zt").val("0");
        $("#new_add").slideUp(300);
        ordershouhuolist();
    }
    else {
        $("#hid_zt").val("1");
        ordershouhuolist();
    }
}