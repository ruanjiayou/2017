/**
@author max
@time 2017-3-20 14:25:38
@description
    图片的地址要相对根路径不然会引用出错
    ie不允许修改input的type
    使用了rem效果不错 IE中记得引入对应htc文件
    事件执行了两次~需要阻止默认事件~
    2017-3-20 21:27:34 基本完成
    2017-4-15 15:49:40 增加了对check-all类的处理 无需自己每次手动写checkall效果了
    css不写在js中 因为需要用less控制项目风格
    2017-7-5 17:17:04 增加 check-all的自动效果
    2017-7-6 09:46:53 fix初始化和callback check-all与CheckBox的name保持一致
    2017-7-17 14:05:03 
**/
!(function () {
    function switchBtn(e) {
        e = e || window.event;
        var self = $(this),
            i = 0,
            len = 0,
            count = 0,
            input = self.children('input'),
            type = input.attr('type'),
            bCheckAll = self.hasClass('check-all'),
            inputAll = $('input[name="' + input.attr('name') + '"]');
        if (self.hasClass('disabled')) {
            return;
        }
        switch (type) {
            case 'radio':
                //radio类型中的inputsAll就是 相当于 check类型中的inputs
                inputAll.parent().removeClass('checked');
                self.addClass('checked');
                input.attr('checked', true);
                break;
            case 'checkbox':
                if (bCheckAll) {
                    //全选/清空 操作
                    if (self.hasClass('checked')) {
                        inputAll.attr('checked', false).parent().removeClass('checked');
                    }
                    else {
                        inputAll.attr('checked', true).parent().addClass('checked');
                    }
                }
                else {
                    //切换状态
                    if (self.hasClass('checked')) {
                        self.removeClass('checked');
                        input.attr('checked', false);
                    }
                    else {
                        self.addClass('checked');
                        input.attr('checked', true);
                    }
                    //被动 全选/全不选 效果
                    for (len = inputAll.length; i < inputAll.length; i++) {
                        if ($(inputAll[i]).parent().hasClass('check-all')) {
                            len--;
                            bCheckAll = inputAll[i];
                        }
                        else if ($(inputAll[i]).attr('checked')) {
                            count++;
                        }
                    }
                    if (count === len) {
                        $(bCheckAll).attr('checked', true).parent().addClass('checked');
                    }
                    else {
                        $(bCheckAll).attr('checked', false).parent().removeClass('checked');
                    }
                }
                break;
            default: break;
        }
        if (this.callback) {
            this.callback((type === 'checkbox' ? inputAll : input));
        }
        if (window.event) {
            window.event.returnValue = false;
        }
        if (e && e.preventDefault) {
            e.preventDefault();
        }
    }
    window.initCheckRadio = function (selector, callback) {
        $(selector).each(function () {
            if (callback !== undefined) {
                this.callback = callback;
            }
            //防止重复绑定
            if (this.inited === true) {
                return;
            }
            this.inited = true;
            var self = $(this),
                oc = self.children('input'),
                checked;
            //绑定事件
            self.bind('click', function (e) { switchBtn.call(this, e); });
            //初始化样式
            checked = oc.attr('checked') === 'checked' ? true : self.hasClass('checked');
            if (checked === true) {
                self.addClass('checked');
            }
            else {
                self.removeClass('checked');
            }
            if (oc.attr('type') === 'radio' && checked === true) {
                oc.attr('checked', true);
            }
        });
    };
})();