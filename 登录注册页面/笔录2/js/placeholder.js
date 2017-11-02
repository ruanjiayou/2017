//IE9支持placeholder
$.holder = {
    //检测
    _check: function () {
        return 'placeholder' in document.createElement('input');
    },
    //初始化
    init: function () {
        if (!this._check()) this.fix();
    },
    //修复
    fix: function () {
        $(':input[placeholder]').each(function (index, element) {
            if (typeof this.initHolder == "undefined") this.initHolder = true;
            else return;
            var self = $(this), txt = self.attr('placeholder');
            self.wrap($('<div></div>').css({ position: 'relative', zoom: '1', border: 'none 0', background: 'none', padding: 'none', margin: 'none' }));
            var pos = self.position();
            console.log(self.css("border-left-width"));
            var holder = $('<span></span>').text(txt).css({  position: 'absolute', left: pos.left, top: pos.top, height: self.css("height"),lineHeight: self.css("line-height"), paddingLeft: self.css("padding-left"), paddingTop: self.css("padding-top"), color: '#aaa', borderTop: self.css("border-top-width")+" solid transparent", borderLeft: self.css("border-left-width")+" solid transparent" }).appendTo(self.parent());
            
            holder.click(function () { self.focus();});
            self.on("keyup", function () {
                if (this.value == "") 
                    holder.show();
                else 
                    holder.hide();
            });
        });
    }
};
//usage
//$.holder.init();