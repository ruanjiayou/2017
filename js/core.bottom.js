/*
作者：max
时间：2017-3-13 15:20:11
说明：Firefox IE7/8/9都好的 
注意：body 要求 position relative,js会设置body的padding-bottom
      最好不要设最外层的margin padding是可以的
      div要设置overflow：不然出现莫名的滚动条
      关于resize事件：还没处理
      2017-3-18 17:52:54
      关于在div中固定在底部的需求：
      原先设置body的方法不适用，新思路：容器(position不为static)底部放个div高度与要固定在底部的部分高度一致，固定底部分别position absolute
      这样只需设置容器的高度 不用管padding了
      不过这个高度的单位是个问题 px与rem
      2017-3-28 13:13:23 zy中本月签到次数不在body尾部 不好固定在底部~~
      2017-4-6 16:45:44 修改了 即使固定部分默认不在body底部
      2017-8-7 22:31:17 又bug啊 有时底部logo不显示！！！
      2017-8-9 14:21:32 TODO 改写为$.fixElement 底部、顶部
*/
/**
 * 将元素固定在顶部
 * @param {*} selector 
 */
// eslint-disable-next-line
function BottomElement(selector) {
    var ob = $(selector),
        offT = ob.offset().top;
    //console.log('offsetTop:'+offT+' ;height:'+$(window).height());
    if (ob.length > 0 && ob.height() + offT < $(window).height()) {
        //console.log(ob.get(0).parentNode.nodeName);
        //console.log($(window).height() - offT +'px');
        $(document.body).css({ 'position': 'relative', 'min-height': $(window).height() + 'px', 'padding-bottom': ob.height() + 'px' });
        document.body.appendChild($.createNode('div', { 'style': 'height:' + ob.children('div').height() + 'px' }));
        //document.body.appendChild
        (ob.css({ 'position': 'absolute', 'bottom': 0, 'width': '100%', 'visibility': 'visible' }).get(0));
    }
}