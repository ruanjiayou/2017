//修改alloy finger手势库 在pc中使用
/*
时间：2016-11-21 16:28:28
作者：阮家友
邮箱：1439120442
说明：主要是参考TouchSlide中触摸的功能检测 使alloyfinger能住pc上使用
*/
; (function () {
    function getLen(v) { return Math.sqrt(v.x * v.x + v.y * v.y); }
    function dot(v1, v2) { return v1.x * v2.x + v1.y * v2.y; }
    function getAngle(v1, v2) {
        var mr = getLen(v1) * getLen(v2);
        if (mr === 0) return 0;
        var r = dot(v1, v2) / mr;
        if (r > 1) r = 1;
        return Math.acos(r);
    }
    function cross(v1, v2) { return v1.x * v2.y - v2.x * v1.y; }
    function getRotateAngle(v1, v2) {
        var angle = getAngle(v1, v2);
        if (cross(v1, v2) > 0) angle *= -1;
        return angle * 180 / Math.PI;
    }
    var AlloyFinger = function (el, option) {

        this.element = typeof el == 'string' ? document.querySelector(el) : el;
        this.element.addEventListener( this.hasTouch ? "touchstart" : "mousedown", this.start.bind(this), false);
        this.element.addEventListener(this.hasTouch ? "touchmove" : "mousemove", this.move.bind(this), false);
        this.element.addEventListener(this.hasTouch ? "touchend" : "mouseup", this.end.bind(this), false);
        this.element.addEventListener("touchcancel", this.cancel.bind(this), false);

        this.preV = { x: null, y: null };
        this.pinchStartLen = null;
        this.scale = 1;
        this.isDoubleTap = false;
        this.bStarted = false;
        var noop = function () { };

        this.rotate = option.rotate || noop;
        this.touchStart = option.touchStart || noop;
        this.multipointStart = option.multipointStart || noop;
        this.multipointEnd = option.multipointEnd || noop;
        this.pinch = option.pinch || noop;
        this.swipe = option.swipe || noop;
        this.tap = option.tap || noop;
        this.doubleTap = option.doubleTap || noop;
        this.longTap = option.longTap || noop;
        this.singleTap = option.singleTap || noop;
        this.pressMove = option.pressMove || noop;
        this.touchMove = option.touchMove || noop;
        this.touchEnd = option.touchEnd || noop;
        this.touchCancel = option.touchCancel || noop;

        this.delta = null;
        this.last = null;
        this.now = null;
        this.tapTimeout = null;
        this.touchTimeout = null;
        this.longTapTimeout = null;
        this.swipeTimeout = null;
        this.x1 = this.x2 = this.y1 = this.y2 = null;
        this.preTapPosition = { x: null, y: null };
    };

    AlloyFinger.prototype = {
        start: function (evt) {
            if (!evt.touches && this.hasTouch == true) return;
            var point = this.hasTouch ? evt.touches[0] : evt;
            this.x1 = point.pageX;
            this.y1 = point.pageY; 
            this.bStarted = true;
            this.now = Date.now();
            this.delta = this.now - (this.last || this.now);
            this.touchStart(evt);
            if (this.preTapPosition.x !== null) {
                this.isDoubleTap = (this.delta > 0 && this.delta <= 250 && Math.abs(this.preTapPosition.x - this.x1) < 30 && Math.abs(this.preTapPosition.y - this.y1) < 30);
            }
            this.preTapPosition.x = this.x1;
            this.preTapPosition.y = this.y1;
            this.last = this.now;
            var preV = this.preV,
                len;
            if (this.hasTouch && evt.touches.length > 1) {
                len = evt.touches.length
                this._cancelLongTap();
                var v = { x: evt.touches[1].pageX - this.x1, y: evt.touches[1].pageY - this.y1 };
                preV.x = v.x;
                preV.y = v.y;
                this.pinchStartLen = getLen(preV);
                this.multipointStart(evt);
            }
            this.longTapTimeout = setTimeout(function () {
                this.longTap(evt);
            }.bind(this), 750);
        },
        move: function (evt) {
            //if (this.hasTouch && !evt.touches) return;
            var preV = this.preV,
                point = this.hasTouch ? evt.touches[0] : evt,
                len;
            var currentX = point.pageX,
                currentY = point.pageY;
            this.isDoubleTap = false;
            if (this.hasTouch && (len = evt.touches.length) > 1) {
                var v = { x: evt.touches[1].pageX - currentX, y: evt.touches[1].pageY - currentY };

                if (preV.x !== null) {
                    if (this.pinchStartLen > 0) {
                        evt.scale = getLen(v) / this.pinchStartLen;
                        this.pinch(evt);
                    }

                    evt.angle = getRotateAngle(v, preV);
                    this.rotate(evt);
                }
                preV.x = v.x;
                preV.y = v.y;
            } else {
                if (this.x2 !== null) {
                    evt.deltaX = currentX - this.x2;
                    evt.deltaY = currentY - this.y2;

                } else {
                    evt.deltaX = 0;
                    evt.deltaY = 0;
                }
                if(this.bStarted) this.pressMove(evt);
            }
            if(this.bStarted) this.touchMove(evt);

            this._cancelLongTap();
            this.x2 = currentX;
            this.y2 = currentY;
            if (this.hasTouch==false || evt.touches.length > 1) {
                this._cancelLongTap();
                evt.preventDefault();
            }
        },
        end: function (evt) {
            this.bStarted = false;
            if (this.hasTouch && !evt.changedTouches) return;
            this._cancelLongTap();
            var self = this;
            if (this.hasTouch && evt.touches.length < 2) {
                this.multipointEnd(evt);
            }
            this.touchEnd(evt);
            //swipe
            if ((this.x2 && Math.abs(this.x1 - this.x2) > 30) ||
                (this.y2 && Math.abs(this.preV.y - this.y2) > 30)) {
                evt.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2);
                this.swipeTimeout = setTimeout(function () {
                    self.swipe(evt);

                }, 0)
            } else {
                this.tapTimeout = setTimeout(function () {
                    self.tap(evt);
                    // trigger double tap immediately
                    if (self.isDoubleTap) {
                        self.doubleTap(evt);
                        clearTimeout(self.touchTimeout);
                        self.isDoubleTap = false;
                    } else {
                        self.touchTimeout = setTimeout(function () {
                            self.singleTap(evt);
                        }, 250);
                    }
                }, 0)
            }

            this.preV.x = 0;
            this.preV.y = 0;
            this.scale = 1;
            this.pinchStartLen = null;
            this.x1 = this.x2 = this.y1 = this.y2 = null;
        },
        cancel: function (evt) {
            clearTimeout(this.touchTimeout);
            clearTimeout(this.tapTimeout);
            clearTimeout(this.longTapTimeout);
            clearTimeout(this.swipeTimeout);
            this.touchCancel(evt);
        },
        _cancelLongTap: function () {
            clearTimeout(this.longTapTimeout);
        },
        _swipeDirection: function (x1, x2, y1, y2) {
            return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
        },
        hasTouch: 'ontouchstart' in window
    };

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = AlloyFinger;
    } else {
        window.AlloyFinger = AlloyFinger;
    }
})();
