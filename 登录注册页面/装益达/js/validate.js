if (String.trim == undefined) {
    String.prototype.trim = function () {
        return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }
}
//获取变量类型 -m
$.getType = function (o) {
    var _t;
    return ((_t = typeof (o)) == "object" ? o == null && "null" || Object.prototype.toString.call(o).slice(8, -1) : _t).toLowerCase();
}
;(function () {
    function FormValidate() {
        this.Group = {};
    }
    //用到的样式常量
    FormValidate.prototype.success = "validate-success";
    FormValidate.prototype.error = "validate-error";
    FormValidate.prototype.tip = "validate-tip";
    FormValidate.prototype.ok = "validate-ok";
    FormValidate.prototype.uok = "validate-uok";
    FormValidate.prototype.hasGroup = function (group) {
        return this.Group.hasOwnProperty(group);
    }
    //添加一个验证项
    FormValidate.prototype.AddOne = function (group, o) {
        //绑定的事件中药用到this
        var oThis = this;
        var type = $.getType(group);
        //1.group组名 必须是不为空的字符串
        if (type == "string" && group.trim() != "") {
            //2.不存在组则新增组
            if (this.hasGroup(group) == false) this.Group[group] = [];
            //o 为#id .class 原生Node节点
            var node = $(o);
            if (node.length <= 0) {
                console.log("Not Found node:" + o);
                return;
            }
            var data = node.attr("data-validate");
            if (data != undefined) {
                this.Group[group].push(node);
                data = eval("(" + data + ")");
                //2016-9-7 21:09:02 程序健壮性处理
                //2016-9-28 13:56:21 设置默认的数据 精简代码
                if (data.empty != undefined && data.empty === true) node.val("");
                else data.empty = false;
                if (data.required == undefined) data.required = true;//默认必填
                if (data.tip == undefined) data.tip = "";//设置默认tip
                node[0].vdata = data;
                //5.事件监控
                node.bind("blur", function () {
                    //验证
                    oThis.CheckRules($(this));
                });
                node.bind("keyup", function () {
                    oThis.CheckRules($(this));
                    if (this.value.trim() == "") $(this).removeClass(oThis.success + " " + oThis.error);
                });
            }
            else {
                console.log("这个验证项不需要data-validate？");
            }
        }
        else {
            console.log("组名不符合规则");
        }
    }
    //group组名 必须是不为空的字符串，o 可以是#id .class 或原生Node节点 或三者组合的数组
    FormValidate.prototype.Add = function (group, o) {
        if ($.getType(o) == "array") {
            for (var i = 0; i < o.length; i++) {
                try {
                    this.AddOne(group, o[i]);
                }
                catch (e) {
                    console.log(e);
                    console.log("validate error!");
                    console.log(o[i]);
                }
            }
        }
        else this.AddOne(group, o);
    }
    //删除验证项
    FormValidate.prototype.Del = function (group, o) {
        if (this.hasGroup(group) == false) return;
        if (o == null) {
            //...

        }
        else {
            //...

            //this.Group[group];
        }
    }
    //恢复初始状态
    FormValidate.prototype.Reset = function (group) {
        var data = null;
        var o = null;
        if (this.hasGroup(group)) {
            for (var i = 0; i < this.Group[group].length; i++) {
                o = this.Group[group][i];
                //value和class复位
                o.removeClass(this.success + " " + this.error);
                this.ShowTip(this.Group[group][i][0], "", "");//提示信息复位
            }
        }
    }
    //ok "123" true "-123" false "12.3" false
    FormValidate.prototype.CheckInt = function (v) {
        return /^\d+$/.test(v);
    }
    //ok "123" true "-123" true "12.3" true "123." false "1.2.3" false ".123" false
    FormValidate.prototype.CheckFloat = function (v) {
        return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(v);
    }
    FormValidate.prototype.CheckEmail = function (v) {
        return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(v);
    }
    FormValidate.prototype.CheckPhone = function (v) {
        return /^\d{11}$/.test(v);
    }
    FormValidate.prototype.CheckEmailPhone = function (v) {
        return (this.CheckEmail(v) || this.CheckPhoneNumber(v));
    }
    FormValidate.prototype.CheckID = function (v) {
        if (v.length != 18) return false;
        var sum = 0;
        var weight = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        var validate = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
        for (m = 0; m < v.length - 1; m++) sum += v[m] * weight[m];
        mode = sum % 11;
        if (v[17] == validate[mode]) {
            return true;
        } else {
            return false;
        }
    }
    //ok "2016-08-25" false "2016/08/25" true "2016/08-25" false IE里这个是true
    //   "2016 08 25" true  ff可以 IE不可以
    FormValidate.prototype.CheckDate = function (v) {
        return !/Invalid|NaN/.test(new Date(v));
    }
    FormValidate.prototype.CheckUrl = function (v) {
        return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(v);
    }
    //OK
    FormValidate.prototype.EqulTo = function (v, ele) {
        return v == $(ele).val();
    }
    FormValidate.prototype.CheckChar = function (v) {
        return /^[0-9a-zA-Z]+$/.test(v);
    }
    //自定义
    FormValidate.prototype.Custom = function (v, reg) {
        return reg.test(v);
    }
    FormValidate.prototype.CheckRule = function (type, item) {
        var res = { valid: false, tip: "" };
        var v = item.val().trim();
        var data = item[0].vdata;
        switch (type) {
            case "int":
                res.valid = this.CheckInt(v);
                res.tip = "请输入一个整数";
                break;
            case "float":
                res.valid = this.CheckFloat(v);
                res.tip = "数值无效";
                break;
            case "url":
                res.valid = this.CheckUrl(v);
                res.tip = "请输入一个url";
                break;
            case "email":
                res.valid = this.CheckEmail(v);
                res.tip = "请输入邮箱地址";
                break;
            case "phone":
                res.valid = this.CheckPhone(v);
                res.tip = "请输入手机号";
                break;
                /*
                 case "emailphone":
                 res.valid = this.CheckEmailPhone(v);
                 res.tip = "请输出邮箱或手机号";
                 break;
                 */
            case "id":
                res.valid = this.CheckID(v);
                res.tip = "请输入身份证号";
                break;
            case "date":
                res.valid = this.CheckDate(v);
                res.tip = "请输入日期";
                break;
            case "equlto":
                if (data.equlto != undefined) {
                    res.valid = this.EqulTo(v, data.equlto);
                    res.tip = "密码不一致";
                    if(v=="")
                        res.valid = false;
                }
                break;
            case "char":
                res.valid = this.CheckChar(v);
                res.tip = "请输入字母或数字";
                break;
            case "custom":
                //...
                res.valid = this.Custom(v, new RegExp(data.reg));
                res.tip = "格式错误";
                break;
            case "string":
                res.valid = true;
                if (data.required == true && v == "") res.valid = false;
                break;
            case "file":
                if (item.val() == "") {
                    res.valid = false;
                    res.tip = "请上传文件";
                }
                break;
            default: break;
        }
        if (data.tip != "" && new RegExp("|").test(data.vtype) === true) {
            res.tip = data.tip;
        }
        //new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&mdash;—|{}【】‘；：”“'。，、？]").test("123")
        // /\\<>?/&#|:'\./
        if (type != "file" && /[\\<>\?\/&#\|\:\'\"\.]/.test(v) === true) {
            res.tip = "存在非法字符!";
            res.valid = false;
        }
        if (res.valid) res.tip = "";
        //字符类验证有最大最小长度限定
        if (res.valid && (type == "char" || type == "string")) {
            //同时定义了maxlength和minlength
            if (data.maxlength != undefined && data.minlength != undefined) {
                if (v.length > data.maxlength || v.length < data.minlength) {
                    res.valid = false;
                    res.tip = "长度应在" + data.minlength + "~" + data.maxlength + "之间";
                }
            }
            else {
                //如果定义了maxlength
                if (data.maxlength != undefined && v.length > data.maxlength) {
                    res.tip = "长度不能大于" + data.maxlength;
                    res.valid = false;
                }
                //如果定义了minlength
                if (data.minlength != undefined && v.length < data.minlength) {
                    res.tip = "长度不能小于" + data.minlength;
                    res.valid = false;
                }
            }
        }
        //数值类验证有最大最小值的限定
        if (res.valid && (type == "int" || type == "float")) {
            var n = null;
            if (type == "int") n = parseInt(v);
            else n = parseFloat(v);
            //同时定义了max min
            if (data.max != undefined && data.min != undefined) {
                if (n > max || n < min) {
                    res.tip = "数值必须在" + data.min + "与" + data.max + "之间";
                    res.valid = false;
                }
            }
            else {
                //如果定义了max
                if (data.max != undefined && n > data.max) {
                    res.tip = "数值不能大于" + data.max;
                    res.valid = false;
                }
                //如果定义了min
                if (data.min != undefined && n < data.min) {
                    res.tip = "数值不能小于" + data.min;
                    res.valid = false;
                }
            }
        }
        return res;
    }
    //验证一项 item jQuery获取的节点 data json数据
    FormValidate.prototype.CheckRules = function (item) {
        //var data = eval("(" + item.attr("data-validate") + ")");//验证数据
        var data = item[0].vdata;
        var required = data.required;
        var bValid = false;
        var bvtyped = false;//验证有定义好的 组合 自定义三种 此标志用于标识是否已经被
        var tipMsg = "";
        var t = null;//保存CheckRule返回的{valid:true,tip:""}
        var v = item.val().trim();
        if (required == true && v === "") {
            bValid = false;
            tipMsg = data.required;
            bvtyped = true;
        }
        //校验类型 1.已定义类型/2.自定义类型/3.已定义组合
        //组合
        if (bvtyped == false && /\|/.test(data.vtype)) {
            bvtyped = true;
            var rules = data.vtype.split("|");
            bValid = false;
            tipMsg = "";
            for (var i = 0; i < rules.length; i++) {
                t = this.CheckRule(rules[i].trim(), item);
                tipMsg = t.tip;
                if (t.valid) {
                    bValid = true;
                    break;
                }
            }
        }
        if (bvtyped == false) {
            t = this.CheckRule(data.vtype, item);
            bValid = t.valid;
            tipMsg = t.tip;
        }
        item.removeClass(this.success + " " + this.error);
        if (bValid) {
            item.addClass(this.success);
            this.ShowTip(item[0], "", this.ok);
        }
        else {
            item.addClass(this.error);
            this.ShowTip(item[0], tipMsg, this.uok);
        }

        return bValid;
    }
    //验证组
    FormValidate.prototype.Validate = function (group) {
        var bValid = true, t;//t 让每个表单项都得到验证 而不是验证到一半就直接返回false
        if (this.hasGroup(group)) {
            for (var i = 0; i < this.Group[group].length; i++) {
                t = this.CheckRules(this.Group[group][i]);
                if (bValid) bValid = t;
            }
        }
        else {
            bValid = false;
            console.log(group + "组不存在！");
        }
        return bValid;
    }
    //验证提示
    FormValidate.prototype.ShowTip = function (node, msg, sclass) {
        var off = node.vdata.parent;
        var tclass = "";
        if (sclass == this.ok) tclass = this.success;
        if (sclass == this.uok) tclass = this.error;
        if (off != undefined) {
            while (off--) node = node.parentNode;
            $(node).removeClass(this.success + " " + this.error).addClass(tclass);
        }
        var tip = node.nextSibling;
        while (tip != null && (tip.nodeType == 3 || tip.nodeName.toLowerCase() != "span" || !/\b(validate-tip)\b/.test(tip.className))) tip = tip.nextSibling;
        if (tip != null) {
            tip.innerHTML = msg;
            if (sclass != null) $(tip).removeClass(this.ok + " " + this.uok).addClass(sclass);
        }
    }
    window.FormValidate = FormValidate;
})();