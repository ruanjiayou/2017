/**
作者：阮家友
时间：2017-3-31 11:22:58
说明：
    
**/
!(function ($) {
    //normal|normal
    function zoomView(type, size) {
        var oMask = $.createNode('div', { 'style': 'position:fixed;left:0;top:0;width:100%;height:100%;background-color:rgba(0,0,0,0.4);visibility:hidden;' });
        var oBox = $.createNode('div', { 'class': 'zoomview' });
        var oImage = $.createNode('img', { 'style': 'position: absolute;' });
        var oClose = $.createNode('div', { 'class': 'zoomview-close' });
        oBox.appendChild(oImage);
        oMask.appendChild(oBox);
        oMask.appendChild(oClose);
        oImage.onload = function () {
            top.document.body.appendChild(oMask);
            if (size) {
                $(oImage.css(size));
            }
            //对齐 默认center center/normal
            if ('center' === type) {
                $(oImage).css({ 'left': '50%', 'top': '50%', 'margin-left': -this.offsetWidth / 2 + 'px', 'margin-top': -this.offsetHeight / 2 + 'px' });
            }
            oMask.style.visibility = 'visible';
        };
        oImage.onerror = function () {
            alert('加载图片失败!');
        };
        oImage.src = this.src;
        oClose.onclick = function () {
            oMask.parentNode.removeChild(oMask);
        };
    }
    window.zoomView = zoomView;
})(jQuery);
