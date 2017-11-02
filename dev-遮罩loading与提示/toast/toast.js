function Sheet(rulers){
    this.style = (function(){
        var style = document.createElement("style");
        document.getElementsByTagName("head")[0].appendChild(style);
        //style.appendChild(document.createTextNode(""));/* For Safari */
        return style;
    })();
    this.sheet = this.style.styleSheet || this.style.sheet;;
    if(rulers) this.addCSSRulers(rulers);
    return this;
}
Sheet.prototype.addCSSRulers = function(rulerJson){
    for(var k in rulerJson)
        this.addCSSRuler(k,rulerJson[k]);
    return this;
}
Sheet.prototype.addCSSRuler = function(selector,ruler){
    if(this.sheet.insertRule)
        this.sheet.insertRule(selector+" {"+ruler+"}",this.sheet.cssRules.length);
    else if("addRule" in this.sheet)
        this.sheet.addRule(selector,ruler,-1);
    return this;
}
Sheet.prototype.empty = function(){
    return this;
}
//创建Node节点
function NewObject(tag, attrs, txt) {
    var res = document.createElement(tag);
    if (attrs != null)
        for (var k in attrs) {
            if(k=="className"){
                res.className = attrs[k];
                continue;
            }
            if (typeof attrs[k] == "object" && k == "style") ;//$(res).css(attrs[k]);
            else res.setAttribute(k,attrs[k]);//$(res).attr(k, attrs[k]);
        };
    if (txt != null) {
        if(tag=="input" || tag=="select" || tag=="textarea")
            res.value = txt;
        else
        res.appendChild(document.createTextNode(txt));
    }
    return res;
}
window.onload = function(){
    //1.插入样式
    new Sheet({
        ".toast": "position: fixed; left: 50%; top: 50%; transform: translate(-50%,-50%); display: flex; align-items: center; justify-content: center; flex-direction: column;",
        ".toast.hidden": "visibility: hidden;",
        ".toast.fadeout": "-webkit-animation: fadeout 3s ease;",
        ".toast > div": "border-radius: 5px; padding: 2rem; color: #fff; background-color: rgba(0,0,0,0.6);",
        "@-webkit-keyframes fadeout": "0%{ opacity: 0.2; } 50%{ opacity: 1; } 100%{ opacity: 0; }"
    });
    //2.插入HTML
    var odiv = NewObject("div",{"className": "toast hidden"});
    odiv.appendChild(NewObject("div"));
    document.body.appendChild(odiv);
    //3.绑定事件
    odiv.addEventListener('animationend', function(){
        this.className = this.className.replace(/\b(fadeout)\b/,"")+" hidden";
    });
    //提供接口API
    window.ShowToast = function(txt,fn){
        var oc = odiv.getElementsByTagName("div")[0];
        if(txt){
            oc.innerHTML = txt;
        }
        if(/\b(fadeout)\b/.test(odiv.className)==false) odiv.className = odiv.className.replace(/\bhidden\b/,"")+" fadeout";
        if(txt && fn) fn();
    }
}