!(function ($) {
    var KeyBoard = $.createNode('div', { 'class': 'soft_keyboard', 'id': 'soft_keyboard', 'name': 'soft_keyboard' });
    KeyBoard.innerHTML = '<div class="shuzi" id="shuzi">' +
        '<table width="100%" cellspacing="0" cellpadding="0" border="0" align="center">' +
        '<tbody>' +
        '<tr>' +
        '<td><input class="sk_key sk__num" value="7" type="button"></td>' +
        '<td><input class="sk_key sk__num" value="8" type="button"></td>' +
        '<td><input class="sk_key sk__num" value="9" type="button"></td>' +
        '</tr>' +
        '<tr>' +
        '<td><input class="sk_key sk__num" value="4" type="button"></td>' +
        '<td><input class="sk_key sk__num" value="5" type="button"></td>' +
        '<td><input class="sk_key sk__num" value="6" type="button"></td>' +
        '</tr>' +
        '<tr>' +
        '<td><input class="sk_key sk__num" value="1" type="button"></td>' +
        '<td><input class="sk_key sk__num" value="2" type="button"></td>' +
        '<td><input class="sk_key sk__num" value="3" type="button"></td>' +
        '</tr>' +
        '<tr>' +
        '<td><input class="sk_key sk__btn" value="清空" type="button"></td>' +
        '<td><input class="sk_key sk__num" value="0" type="button"></td>' +
        '<td><input class="sk_key sk__ok" value="确认" type="button"></td>' +
        '</tr>' +
        '</tbody>' +
        '</table>' +
        '</div>';

    KeyBoard.Input = null;
    KeyBoard.closed = true;
    $(KeyBoard).click(function () {
        KeyBoard.closed = false;
    });

    //显示键盘
    KeyBoard.Show = function (dialog) {
        this.closed = false;
        if (this.Input) {
            //input距离文档
            var l = 0, t = 0;
            //iframe距离文档
            //var dl = 0, dt = 0;
            l = $(this.Input).offset().left;
            t = $(this.Input).offset().top + this.Input.offsetHeight;
            if (dialog) {
                l += parseInt($(dialog.oDialogBox).css('left'));
                t += (dialog.oTitle.offsetHeight + parseInt($(dialog.oDialogBox).css('top')));
            }

            //如果底部被遮住
            if (t + this.Input.offsetHeight + this.offsetHeight < $(window).height()) {
                $(this).css({ 'left': l + 'px', 'top': t + 'px' });
            }
            else {
                $(this).css({ 'left': l + 'px', 'top': t - this.Input.offsetHeight - this.offsetHeight + 'px' });
            }

        }
        $(this).addClass('show');
        if (document.initKeyBoard === false) {
            $(document).click(function (e) {
                e = e ? e.target : window.event.srcElement;
                if (KeyBoard.closed === true) {
                    KeyBoard.Hide();
                    document.initKeyBoard = false;
                    $(this).unbind('click', arguments.callee);
                }
                KeyBoard.closed = true;
                if (e === KeyBoard.Input) {
                    return;
                }
            });
            document.initKeyBoard = true;
        }
        return this;
    };
    //隐藏键盘
    KeyBoard.Hide = function () {
        $(this).removeClass('show');
        KeyBoard.closed = true;
        return this;
    };
    //清空
    KeyBoard.Clear = function () {
        if (this.Input) {
            $(this.Input).val('');
        }
        return this;
    };
    //按键
    $(KeyBoard).find('input').on('click', function () {
        switch (this.value) {
            case '清空':
                KeyBoard.Clear();
                break;
            case '确认':
                KeyBoard.Hide();
                break;
            default:
                if (KeyBoard.Input) {
                    KeyBoard.Input.value += this.value;
                }
                break;
        }
    });

    $.sheet({
        '.input_cur': 'border:1px solid #f00;',
        '.soft_keyboard': 'position: fixed; left: 0; top: 0; display: inline-block; background-color: #333; text-align: center; padding: 15px; visibility: hidden; ',
        '.soft_keyboard.show': 'visibility: visible; z-index: 1000;',
        '.soft_keyboard td': 'padding: 4px;',
        '.sk_key': 'border:none; height:40px; width:50px; outline: none; font-size:16px; font-family:微软雅黑; background-color:#666; color:#fff;',
        '.sk_key:active': 'background-color:#999;'
    });
    $.extend({
        KeyBoard: KeyBoard
    });
    $(function () {
        document.body.appendChild(KeyBoard);
    });
}(jQuery));

