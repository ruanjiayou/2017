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
            self.wrap($('<div></div>').css({ position: 'relative', zoom: '1', border: 'none', background: 'none', padding: 'none', margin: 'none' }));
            var pos = self.position(), h = self.outerHeight(true), paddingleft = self.css('padding-left'), paddingTop = self.css("padding-top"), paddingBottom = self.css("padding-bottom"), borderTop = self.css("border-top");
            var holder = $('<p></p>').text(txt).css({ position: 'absolute', left: parseInt(pos.left)+ parseInt(self.css("margin-left"))+"px", top: pos.top, height: h+"px", lineHeight: h+"px", paddingLeft: paddingleft, paddingTop: paddingTop, paddingBottom: paddingBottom, color: '#aaa', borderTop: borderTop+" solid transparent" }).appendTo(self.parent());
            
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