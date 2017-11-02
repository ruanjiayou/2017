/**
作者：max
时间：2017-3-13 17:12:21
说明：使用，Placeholder.init()
**/
//ie 6/7/8/9支持placeholder polyfill
!(function () {
    var Placeholder = {
        //检测
        _check: function () {
            return 'placeholder' in document.createElement('input');
        },
        //初始化
        init: function () {
            if (!this._check()) {
                this.fix();
            }
        },
        //修复
        fix: function () {
            $(':input[placeholder]').each(function () {
                if (typeof this.initHolder === 'undefined') {
                    this.initHolder = true;
                }
                else {
                    return;
                }
                var self = $(this),
                    txt = self.attr('placeholder'),
                    pos,
                    h,
                    paddingleft,
                    paddingTop,
                    paddingBottom,
                    borderTop,
                    indent,
                    holder;
                self.wrap($('<div></div>').css({ position: 'relative', zoom: '1', border: 'none', background: 'none', padding: 'none', margin: 'none' }));
                pos = self.position(), h = self.outerHeight(true), paddingleft = self.css('padding-left'), paddingTop = self.css('padding-top'), paddingBottom = self.css('padding-bottom'), borderTop = self.css('border-top'), indent = self.css('text-indent');
                holder = $('<p></p>').text(self.val().trim() === '' ? txt : '').css({ position: 'absolute', left: pos.left, top: pos.top, height: h, lineHeight: h + 'px', paddingLeft: paddingleft, paddingTop: paddingTop, paddingBottom: paddingBottom, color: '#aaa', borderTop: borderTop + ' solid transparent', textIndent: indent }).appendTo(self.parent());

                holder.click(function () { self.focus(); });
                self.on('keyup', function () {
                    if (this.value === '') {
                        holder.show();
                    }
                    else {
                        holder.hide();
                    }
                });
            });
        }
    };
    $(function () {
        Placeholder.init();
    });
}());
