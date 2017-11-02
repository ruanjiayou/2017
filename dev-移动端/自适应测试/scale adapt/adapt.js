function adapt(designWidth, rem2px) {
    var scale = 1 / devicePixelRatio;
    var str = "";
    str += "scale:"+scale+";dpr:"+devicePixelRatio+";<br/>window.innerWidth:"+window.innerWidth+"clientWidth:"+document.documentElement.clientWidth;
    window.onload = function(){document.getElementById("test").innerHTML+=str;}
    
    document.querySelector('meta[name="viewport"]').setAttribute('content','width=device-width,initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
    var d = window.document.createElement('div');
    d.style.width = '1rem';
    d.style.display = "none";
    var head = window.document.getElementsByTagName('head')[0];
    head.appendChild(d);
    var defaultFontSize = parseFloat(window.getComputedStyle(d, null).getPropertyValue('width'));
    d.remove();
    //document.documentElement.style.fontSize = window.innerWidth / designWidth * rem2px / defaultFontSize * 100 + '%';
    document.documentElement.style.fontSize = window.innerWidth / designWidth * rem2px / defaultFontSize * 16 + 'px';
    str+="size:"+document.documentElement.style.fontSize+"";
    
    return defaultFontSize
};
//说明：每个页面必须引入，控制页面宽度100%，计算默认字体大小
//使用方式：在head标签中调用adapt(designWidth, defaultFontSize)方法
//          <script>adapt(1242, 40);</script>
var defaultFontSize = adapt(1242, 40);//
/*
function adapt(designWidth, rem2px) {
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
var defaultFontSize = adapt(1242, 40);//
*/