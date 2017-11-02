//功能描述
//1.
// √ 如果当前页不是第一页，则首页可跳转 上一页可跳转
// √ 如果当前页不是最后一页，则尾页可跳转 下一页可跳转
//2.
// √ 上一页跳转前：显示起始页是当前页：跳转后，如果计算的起始页正常，则设置当前页是最终页，否则第一页是起始页
// √                       不是当前页：起始页不变，当前页-1
//3.
// √ 下一页跳转前：显示最终页是当前页：跳转后，如果最终页大于尾页，则设尾页是最终页，否则当前页就是起始页
// √                       不是当前页：起始页不变，当前页+1
//4.
// √ 点击跳转，跳转前，当前页是起始页：与上一页一样
// √                   当前页是最终页：与下一页一样
// √ 按钮跳转：如果当前页还在起始页与最终页之间，起始页不变。当前页最好在起始页和最终页中间，若当前页与首页或尾页距离小于显示页数的一半，设置第一页为起始页或最终页。若首页和尾页可以一起显示则全部正常显示
// √ 5.输入框里的回车事件
//6.← →箭头事件 看情况这个比上面的5简单多了
var pagination = {
    //数据
    data:{
        //总记录的数量
        ItemsNumber: 613,
        //每页显示数量
        ItemsPerPage: 20,
        //起始页码
        OriginPage: 1,
        //当前页面页码
        CurrPageIndex: 1,
        //页面最多显示页码的数量
        MaxPagesPerPage: 10,
        //总页数
        AllPages: 0
    },
    PNode: null,
    Input: null,
    Button: null,
    //初始化
    init: function(box, inputs, btns){
        //从cookie中获取数据
        var s1 = Cookie.getKey("ItemsNumber");
        var s2 = Cookie.getKey("ItemsPerPage");
        var s3 = Cookie.getKey("OriginPage");
        var s4 = Cookie.getKey("CurrPageIndex");
        var s5 = Cookie.getKey("MaxPagesPerPage");
        if(s1!="" && s2!="" && s3!="" && s4!="" && s5!=""){
            this.data["ItemsNumber"]    = parseInt(s1);
            this.data["ItemsPerPage"]   = parseInt(s2);
            this.data["OriginPage"]     = parseInt(s3);
            this.data["CurrPageIndex"]  = parseInt(s4);
            this.data["MaxPagesPerPage"]= parseInt(s5);
        }
        
        this.PNode = document.getElementById(box);
        EventInit.addEvent(this.PNode,"click",goPage);
        this.data.AllPages = Math.ceil(this.data.ItemsNumber/this.data.ItemsPerPage);
        //
        this.Input = newObject("input", {"class": inputs, "type": "text", "value": "", "cols": 2});
        this.Button = newObject("button", {"class": btns, "type": "button"}, "跳");
        this.render();
        
        this.Input.onfocus = function(){
            var oThis = this;
            EventInit.addEvent(oThis, "keydown", goInput);
            EventInit.addEvent(oThis, "blur", InputBlur);
        };
        EventInit.addEvent(this.Button, "click", goButton);
    },
    //根据数据渲染DOM
    render: function(){
        Cookie.setKey({
            "ItemsNumber": this.data["ItemsNumber"],
            "ItemsPerPage":  this.data["ItemsPerPage"],
            "OriginPage":  this.data["OriginPage"],
            "CurrPageIndex":  this.data["CurrPageIndex"],
            "MaxPagesPerPage":  this.data["MaxPagesPerPage"]
            });
        var DOMList = [];
        var i = this.data.OriginPage;
        var end = this.data.OriginPage + this.data.MaxPagesPerPage;
        var temp = null;
        //首页是否可以跳转
        temp = newObject("li");
        if(this.data.CurrPageIndex == 1){
            temp.appendChild(newObject("a", {"class": "disabled", "href": "javascript:void(0);"}, "首页"));
        }
        else{
            temp.appendChild(newObject("a", {"href": "javascript:void(0);"}, "首页"));
        }
        DOMList.push(temp);
        
        //上一页是否可以跳转
        temp = newObject("li");
        if(this.data.CurrPageIndex == 1){
            temp.appendChild(newObject("a", {"class": "disabled", "href": "javascript:void(0);"}, "上一页"));
        }
        else{
            temp.appendChild(newObject("a", {"href": "javascript:void(0);"}, "上一页"));
        }
        DOMList.push(temp);
        
        for(var j = 1; i <= this.data.AllPages && j <= this.data.MaxPagesPerPage; i++,j++){
            temp = newObject("li");
            if( i == this.data.CurrPageIndex ){
                temp.appendChild(newObject("a", {"class": "CurrPage", "href": "javascript:void(0);"}, "" + i));
            }
            else{
                temp.appendChild(newObject("a", {"href": "javascript:void(0);"}, "" + i));
            }
            DOMList.push(temp);
        };
        //下一页是否可以跳转
        temp = newObject("li");
        if( this.data.CurrPageIndex == this.data.AllPages){
            temp.appendChild(newObject("a", {"class": "disabled", "href": "javascript:void(0);"}, "下一页"));
        }
        else{
            temp.appendChild(newObject("a", {"href": "javascript:void(0);"}, "下一页"));
        }
        DOMList.push(temp);
        //尾页是否可以跳转
        temp = newObject("li");
        if( this.data.AllPages == this.data.CurrPageIndex ){
            temp.appendChild(newObject("a", {"class": "disabled", "href": "javascript:void(0);"}, "尾页"));
        }
        else{
            temp.appendChild(newObject("a", {"href": "javascript:void(0);"}, "尾页"));
        }
        DOMList.push(temp);
        //goto
        temp = newObject("li");
        temp.appendChild(this.Input);
        temp.appendChild(this.Button);
        DOMList.push(temp);
        //信息
        temp = newObject("li",{},"共"+this.data.ItemsNumber+"条 第"+this.data.CurrPageIndex+"页/共"+this.data.AllPages+"页");
        DOMList.push(temp);
        this.PNode.innerHTML = "";
        for(var i = 0; i < DOMList.length; i++){
            this.PNode.appendChild(DOMList[i]);
        }
    },
    //首页
    goHome: function(){
        this.data.OriginPage = 1;
        this.data.CurrPageIndex = 1;
        this.refresh();
    },
    //尾页
    goLast: function(){
        this.data.OriginPage = pagination.data.AllPages - pagination.data.MaxPagesPerPage +1 ;
        this.data.CurrPageIndex = pagination.data.AllPages;
        this.refresh();
    },
    //上一页
    goPrev: function(){
        if(this.data.CurrPageIndex > 1)
            this.data.CurrPageIndex--;
        else return;
        if(this.data.OriginPage > this.data.CurrPageIndex ){
            this.data.OriginPage = this.data.CurrPageIndex - this.data.MaxPagesPerPage + 1;
            if( this.data.OriginPage < 1 ) this.data.OriginPage = 1;
        }
        this.refresh();
    },
    //下一页
    goNext: function(){
        if(this.data.CurrPageIndex < this.data.AllPages)
            this.data.CurrPageIndex++;
        if(this.data.CurrPageIndex > this.data.OriginPage + this.data.MaxPagesPerPage - 1 ){
            this.data.OriginPage = this.data.CurrPageIndex ;
            if(this.data.OriginPage + this.data.MaxPagesPerPage -1 > this.data.AllPages){
                this.data.OriginPage = this.data.AllPages - this.data.MaxPagesPerPage + 1;
            }
        }
        this.refresh();
    },
    //跳到指定页
    goTo: function(x){
        var bFound = false;
        var page = parseInt(x);
        var start = this.data.OriginPage,
            end = this.data.OriginPage + this.data.MaxPagesPerPage - 1;
        if(isNaN(page) || page<1 || page > this.data.AllPages){
            return;
        }
        this.data.CurrPageIndex = page;
        //分5段
        if(bFound == false && page < start){
            bFound = true;
            this.data.OriginPage = page - Math.ceil(this.data.MaxPagesPerPage/2);
            if(this.data.OriginPage < 1){
                this.data.OriginPage = 1;
            }
            this.refresh();
        }
        if(bFound == false && page == start){
            bFound = true;
            this.data.CurrPageIndex++;
            this.goPrev();
        }
        if(bFound == false && page > start && page < end){
            bFound = true;
            this.data.CurrPageIndex++;
            this.goPrev();//goPrev和goNext都一样
        }
        if(bFound == false && page == end){
            bFound = true;
            this.data.CurrPageIndex--;
            this.goNext();
        }
        if(bFound == false && page > end){
            bFound = true;
            if(page + Math.ceil(this.data.MaxPagesPerPage/2) <= this.data.AllPages){
                this.data.OriginPage = page - Math.ceil(this.data.MaxPagesPerPage/2) + 1;
                if(this.data.OriginPage < 1){
                    this.data.OriginPage = 1;
                }
            }
            else{
                this.data.OriginPage = this.data.AllPages - this.data.MaxPagesPerPage + 1;
            }
            this.refresh();
        }
    },
    //刷新当前页
    refresh: function(){
        Cookie.setKey({
            "ItemsNumber": this.data["ItemsNumber"],
            "ItemsPerPage": this.data["ItemsPerPage"],
            "OriginPage": this.data["OriginPage"],
            "CurrPageIndex": this.data["CurrPageIndex"],
            "MaxPagesPerPage": this.data["MaxPagesPerPage"]
        });
        window.location.reload();
    },
    //设置每页数量
    setPageItemsNumber: function(No){
        this.data.PageItemsNumber = No;
        this.render();
    }
};
function goPage(e){
    e = e||window.event;
    //捕获分页容器 #pagination里所有的单击事件 因为是动态操作DOM生成的分页 不好立即给标签添加事件
    var o = e.target? e.target:e.srcElement;
    var n = new RegExp(/^\d+$/g);
    var t = null;
    //1.按输入页码跳转
    if(o.nodeName.toUpperCase()=="BUTTON" && hasClass(o,"goto")){
        //console.log(obj(pagination.PNode,".pageInput")[0].value);
        t = obj(pagination.PNode,".pageInput")[0];
        if(n.test(t.value)) pagination.goTo(parseInt(t.value));
        else{ t.value=""; alert("请输入页码的有误！");return;}
    }
    //2.按点击的标签里的数字跳转
    if(o.nodeName.toUpperCase()=="A" && false==hasClass(o,"CurrPage disabled") ){
        t = o.innerHTML;
        switch(t){
            case "首页":
                pagination.goHome();
            break;
            case "尾页":
                pagination.goLast();
            break;
            case "上一页":
                pagination.goPrev();
            break;
            case "下一页":
                pagination.goNext();
            break;
            default:
                //根据页码跳转
                if(n.test(t)){
                    pagination.goTo(parseInt(t));
                }
            break;
        }
    }
}
function goInput(e){
    e = window.event || e;
    if(e.keyCode == 13){
        pagination.Button.click();
    }
}
function InputBlur(e){
    var oThis = this;
    console.log("解除绑定！");
    EventInit.delEvent(pagination.Input,"keydown",goInput);
    EventInit.delEvent(pagination.Input,"blur",oThis);
}
//没问题
function goButton(e){
    pagination.goTo(pagination.Input.value);
}