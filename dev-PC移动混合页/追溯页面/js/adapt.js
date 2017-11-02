/*
时间：2017-2-6 08:36:52
作者：max
说明：用于设置移动端基准字号
      控制页面宽度100%，计算默认字体大小
*/
function adapt(designWidth, rem2px) {
    if (typeof devicePixelRatio == "undefined" || devicePixelRatio == 1) {
        document.documentElement.style.fontSize = "16px";
        return 16;
    }
    var scale = 1 / devicePixelRatio;
    document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=device-width,initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
    var d = window.document.createElement('div');
    d.style.width = '1rem';
    d.style.display = "none";
    var head = window.document.getElementsByTagName('head')[0];
    head.appendChild(d);
    var defaultFontSize = parseFloat(window.getComputedStyle(d, null).getPropertyValue('width'));
    d.remove();
    document.documentElement.style.fontSize = window.innerWidth / designWidth * rem2px / defaultFontSize * 16 + 'px';
    return defaultFontSize
};
var defaultFontSize = adapt(1100, 32);