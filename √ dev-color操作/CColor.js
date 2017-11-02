; (function () {
    var Color = function (str) {
        this.m_str = (str + "").trim().toLowerCase();
        this.m_rgba = { R: 0, G: 0, B: 0, A: 0 };
        this.m_hsla = { H: 0, L: 0, S: 0, A: 0 };
        this.m_hex = "000000";
        return this;
    };
    Color.prototype.re = {
        "reHex3": /^#([0-9a-f]{3})$/,
        "reHex6": /^#([0-9a-f]{6})$/,
        "reRgbInteger": /^rgb\(\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*\)$/,
        "reRgbPercent": /^rgb\(\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*\)$/,
        "reRgbaInteger": /^rgba\(\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*,\s*([-+]?\d+(?:\.\d+)?)\s*\)$/,
        "reRgbaPercent": /^rgba\(\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)\s*\)$/,
        "reHsl": /^hsl\(\s*([-+]?\d+(?:\.\d+)?)\s*,\s*([-+]?\d+(?:\.\d+)?)\s*,\s*([-+]?\d+(?:\.\d+)?)\s*\)$/,
        "reHsla": /^hsla\(\s*([-+]?\d+(?:\.\d+)?)\s*,\s*([-+]?\d+(?:\.\d+)?)\s*,\s*([-+]?\d+(?:\.\d+)?)\s*,\s*([-+]?\d+(?:\.\d+)?)\s*\)$/,
        "reHslPercent": /^hsl\(\s*([-+]?\d+(?:\.\d+)?)\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*\)$/,
        "reHslaPercent": /^hsla\(\s*([-+]?\d+(?:\.\d+)?)\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)\s*\)$/
    };
    Color.prototype.NickName = {
        "aliceblue": "F0F8FF",
        "antiquewhite": "FAEBD7",
        "aqua": "00FFFF",
        "aquamarine": "7FFFD4",
        "azure": "F0FFFF",
        "beige": "F5F5DC",
        "bisque": "FFE4C4",
        "black": "000000",
        "blanchedalmond": "FFEBCD",
        "blue": "0000FF",
        "blueviolet": "8A2BE2",
        "brown": "A52A2A",
        "burlywood": "DEB887",
        "cadetblue": "5F9EA0",
        "chartreuse": "7FFF00",
        "chocolate": "D2691E",
        "coral": "FF7F50",
        "cornflowerblue": "6495ED",
        "cornsilk": "FFF8DC",
        "crimson": "DC143C",
        "cyan": "00FFFF",
        "darkblue": "00008B",
        "darkcyan": "008B8B",
        "darkgoldenrod": "B8860B",
        "darkgray": "A9A9A9",
        "darkgreen": "006400",
        "darkkhaki": "BDB76B",
        "darkmagenta": "8B008B",
        "darkolivegreen": "556B2F",
        "darkorange": "FF8C00",
        "darkorchid": "9932CC",
        "darkred": "8B0000",
        "darksalmon": "E9967A",
        "darkseagreen": "8FBC8F",
        "darkslateblue": "483D8B",
        "darkslategray": "2F4F4F",
        "darkturquoise": "00CED1",
        "darkviolet": "9400D3",
        "deeppink": "FF1493",
        "deepskyblue": "00BFFF",
        "dimgray": "696969",
        "dodgerblue": "1E90FF",
        "firebrick": "B22222",
        "floralwhite": "FFFAF0",
        "forestgreen": "228B22",
        "fuchsia": "FF00FF",
        "gainsboro": "DCDCDC",
        "ghostwhite": "F8F8FF",
        "gold": "FFD700",
        "goldenrod": "DAA520",
        "gray": "808080",
        "green": "008000",
        "greenyellow": "ADFF2F",
        "honeydew": "F0FFF0",
        "hotpink": "FF69B4",
        "indianred": "CD5C5C",
        "indigo": "4B0082",
        "ivory": "FFFFF0",
        "khaki": "F0E68C",
        "lavender": "E6E6FA",
        "lavenderblush": "FFF0F5",
        "lawngreen": "7CFC00",
        "lemonchiffon": "FFFACD",
        "lightblue": "ADD8E6",
        "lightcoral": "F08080",
        "lightcyan": "E0FFFF",
        "lightgoldenrodyellow": "FAFAD2",
        "lightgreen": "90EE90",
        "lightgrey": "D3D3D3",
        "lightpink": "FFB6C1",
        "lightsalmon": "FFA07A",
        "lightseagreen": "20B2AA",
        "lightskyblue": "87CEFA",
        "lightslategray": "778899",
        "lightsteelblue": "B0C4DE",
        "lightyellow": "FFFFE0",
        "lime": "00FF00",
        "limegreen": "32CD32",
        "linen": "FAF0E6",
        "magenta": "FF00FF",
        "maroon": "800000",
        "mediumaquamarine": "66CDAA",
        "mediumblue": "0000CD",
        "mediumorchid": "BA55D3",
        "mediumpurple": "9370D8",
        "mediumseagreen": "3CB371",
        "mediumslateblue": "7B68EE",
        "mediumspringgreen": "00FA9A",
        "mediumturquoise": "48D1CC",
        "mediumvioletred": "C71585",
        "midnightblue": "191970",
        "mintcream": "F5FFFA",
        "mistyrose": "FFE4E1",
        "moccasin": "FFE4B5",
        "navajowhite": "FFDEAD",
        "navy": "000080",
        "oldlace": "FDF5E6",
        "olive": "808000",
        "olivedrab": "6B8E23",
        "orange": "FFA500",
        "orangered": "FF4500",
        "orchid": "DA70D6",
        "palegoldenrod": "EEE8AA",
        "palegreen": "98FB98",
        "paleturquoise": "AFEEEE",
        "palevioletred": "D87093",
        "papayawhip": "FFEFD5",
        "peachpuff": "FFDAB9",
        "peru": "CD853F",
        "pink": "FFC0CB",
        "plum": "DDA0DD",
        "powderblue": "B0E0E6",
        "purple": "800080",
        "red": "FF0000",
        "rosybrown": "BC8F8F",
        "royalblue": "4169E1",
        "saddlebrown": "8B4513",
        "salmon": "FA8072",
        "sandybrown": "F4A460",
        "seagreen": "2E8B57",
        "seashell": "FFF5EE",
        "sienna": "A0522D",
        "silver": "C0C0C0",
        "skyblue": "87CEEB",
        "slateblue": "6A5ACD",
        "slategray": "708090",
        "snow": "FFFAFA",
        "springgreen": "00FF7F",
        "steelblue": "4682B4",
        "tan": "D2B48C",
        "teal": "008080",
        "thistle": "D8BFD8",
        "tomato": "FF6347",
        "turquoise": "40E0D0",
        "violet": "EE82EE",
        "wheat": "F5DEB3",
        "white": "FFFFFF",
        "whitesmoke": "F5F5F5",
        "yellow": "FFFF00",
        "yellowgreen": "9ACD32"
    };
    Color.prototype.parse = function (str) {
        if (str) this.m_str = str;
        if (this.m_str in this.NickName) {
            this.m_hex = this.NickName[this.m_str];
            this.m_rgba = this.HEX2RGBA(this.m_hex);
            this.m_hsla = this.RGBA2HSLA(this.m_rgba);
            return null;
        }
        var m = null;
        if (this.re.reHex3.exec(this.m_str)) {
            m = parseInt(this.re.reHex3.exec(this.m_str)[1], 16);
            this.m_rgba = { R: (m >> 8 & 0xf) | (m >> 4 & 0x0f0), G: (m >> 4 & 0xf) | (m & 0xf0), B: ((m & 0xf) << 4) | (m & 0xf), A: 1 };
            this.m_hex = this.RGB2HEX(this.m_rgba);
            this.m_hsla = this.RGBA2HSLA(this.m_rgba);
        } else if (this.re.reHex6.exec(this.m_str)) {
            m = parseInt(this.re.reHex6.exec(this.m_str)[1], 16)
            this.m_rgba = { R: m >> 16 & 0xff, G: m >> 8 & 0xff, B: m & 0xff, A: 1 };
            this.m_hex = this.RGB2HEX(this.m_rgba);
            this.m_hsla = this.RGBA2HSLA(this.m_rgba);
        } else if (this.re.reRgbInteger.exec(this.m_str)) {
            m = this.re.reRgbInteger.exec(this.m_str);
            this.m_rgba = { R: parseInt(m[1]), G: parseInt(m[2]), B: parseInt(m[3]), A: 1 };
            this.m_hex = this.RGB2HEX(this.m_rgba);
            this.m_hsla = this.RGBA2HSLA(this.m_rgba);
        } else if (this.re.reRgbPercent.exec(this.m_str)) {
            m = this.re.reRgbPercent.exec(this.m_str)
            var r = 255 / 100
            this.m_rgba = { R: parseInt(m[1] * r), G: parseInt(m[2] * r), B: parseInt(m[3] * r), A: parseInt(m[3]) / 100 };
            this.m_hex = this.RGB2HEX(this.m_rgba);
            this.m_hsla = this.RGBA2HSLA(this.m_rgba);
        } else if (this.re.reRgbaInteger.exec(this.m_str)) {
            m = this.re.reRgbaInteger.exec(this.m_str);
            this.m_rgba = { R: m[1], G: m[2], B: m[3], A: parseFloat(m[4]) };
            this.m_hex = this.RGB2HEX(this.m_rgba);
            this.m_hsla = this.RGBA2HSLA(this.m_rgba);
        } else if (this.re.reRgbaPercent.exec(this.m_str)) {
            m = this.re.reRgbaPercent.exec(this.m_str);
            var r = 255 / 100;
            this.m_rgba = { R: parseInt(m[1] * r), G: parseInt(m[2] * r), B: parseInt(m[3] * r), A: parseFloat(m[4]) };
            this.m_hex = this.RGB2HEX(this.m_rgba);
            this.m_hsla = this.RGBA2HSLA(this.m_rgba);
        } else if (this.re.reHsl.exec(this.m_str)) {
            m = this.re.reHsl.exec(this.m_str);
            this.m_hsla = { H: +m[1], S: +m[2], L: +m[3], A: 1 };
            this.m_rgba = this.HSLA2RGBA(this.m_hsla);
            this.m_hex = this.RGB2HEX(this.m_rgba);
            console.log(m);
            console.log("hsl");
        }
        else if (this.re.reHslPercent.exec(this.m_str)) {
            m = this.re.reHslPercent.exec(this.m_str);
            this.m_hsla = { H: parseInt(m[1]), S: m[2] / 100, L: m[3] / 100, A: 1 }
            this.m_rgba = this.HSLA2RGBA(this.m_hsla);
            this.m_hex = this.RGB2HEX(this.m_rgba);
        } else if (this.re.reHslaPercent.exec(this.m_str)) {
            m = this.re.reHslaPercent.exec(this.m_str)
            this.m_hsla = { H: parseInt(m[1]), S: m[2] / 100, L: m[3] / 100, A: parseFloat(m[4]) };
            this.m_rgba = this.HSLA2RGBA(this.m_hsla);
            this.m_hex = this.RGB2HEX(this.m_rgba);
        } else {
            console.log("parse Erro: " + this.m_str);
        }
        return this;
    };
    Color.prototype.ToString = function (type) {
        var res = "#" + this.m_hex;//默认hex格式
        if (type === undefined || type === null) return res;
        switch (type.toLowerCase()) {
            case "rgb":
                res = "rgb(" + this.m_rgba.R + ", " + this.m_rgba.G + ", " + this.m_rgba.B + ")";
                break;
            case "rgba":
                res = "rgba(" + this.m_rgba.R + ", " + this.m_rgba.G + ", " + this.m_rgba.B + ", " + this.m_rgba.A + ")";
                break;
            case "hsl":
                res = "hsl(" + this.m_hsla.H + ", " + this.m_hsla.S + ", " + this.m_hsla.L + "%)";
                break;
            case "hsla":
                res = "hsla(" + this.m_hsla.H + ", " + this.m_hsla.S + ", " + this.m_hsla.L + ", " + this.m_hsla.A + ")";
                break;
            default: break;
        };
        return res;
    };
    //传入rgb json数据返回6位十六进制字符串
    Color.prototype.RGB2HEX = function (rgb) {
        var r = parseInt(rgb.R).toString(16);
        var g = parseInt(rgb.G).toString(16);
        var b = parseInt(rgb.B).toString(16);
        r = r.length === 1 ? "0" + r : r;
        g = g.length === 1 ? "0" + g : g;
        b = b.length === 1 ? "0" + b : b;
        return (r + g + b).toUpperCase();
    };
    Color.prototype.HEX2RGB = function (hex) {
        var r = parseInt(hex.substring(0, 2), 16);
        var g = parseInt(hex.substring(2, 4), 16);
        var b = parseInt(hex.substring(4, 6), 16);
        return { R: r, G: g, B: b, A: 1 };
    };
    Color.prototype.RGBA2HEX = function (rgba) {
        var hex = this.RGB2HEX(rgba);
        var a = parseInt(rgba.A * 255).toString(16)
        if (a.length === 1) a = "0" + a;
        return hex + a;
    };
    Color.prototype.HEX2RGBA = function (hex) {
        var rgba = this.HEX2RGB(hex);
        if (hex.length === 8) {
            rgba.A = parseFloat(hex.substring(6, 8)) << 8;
        }
        return rgba;
    };
    Color.prototype.RGB2HSL = function (rgb) {
        var r = rgb.R / 255.0;
        var g = rgb.G / 255.0;
        var b = rgb.B / 255.0;
        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        var diff = max - min;
        var add = max + min;
        var h = 0, s = 0, l = 0;
        if (min === max)
            h = 0;
        else if (r === max)
            h = ((60 * (g - b) / diff) + 360) % 360;
        else if (g === max)
            h = (60 * (b - r) / diff) + 120;
        else
            h = (60 * (r - g) / diff) + 240;

        l = 0.5 * add;

        if (l === 0 || max === min)
            s = 0;
        else if (l === 1)
            s = 1;
        else if (l <= 0.5)
            s = diff / add;
        else
            s = diff / (2 - add);

        h = Math.round(h);
        s = Math.round(s * 10000) / 10000;
        l = Math.round(l * 10000) / 10000;

        return { H: h, S: s, L: l, A: 1 };
    };
    Color.prototype.HSL2RGB = function (hsl) {
        var h = hsl.H / 360;
        var s = hsl.S;
        var l = hsl.L;

        if (l <= 0.5)
            var q = l * (1 + s);
        else
            var q = l + s - (l * s);

        var p = 2 * l - q;

        var tr = h + (1 / 3);
        var tg = h;
        var tb = h - (1 / 3);

        var r = Math.round(hueToRGB(p, q, tr) * 255);
        var g = Math.round(hueToRGB(p, q, tg) * 255);
        var b = Math.round(hueToRGB(p, q, tb) * 255);
        return { R: r, G: g, B: b, A: 1 };

        function hueToRGB(p, q, h) {
            if (h < 0)
                h += 1;
            else if (h > 1)
                h -= 1;

            if ((h * 6) < 1)
                return p + (q - p) * h * 6;
            else if ((h * 2) < 1)
                return q;
            else if ((h * 3) < 2)
                return p + (q - p) * ((2 / 3) - h) * 6;
            else
                return p;
        }
    };
    Color.prototype.RGBA2HSLA = function (rgba) {
        var hsla = this.RGB2HSL(rgba);
        hsla.A = rgba.A;
        return hsla;
    };
    Color.prototype.HSLA2RGBA = function (hsla) {
        var rgba = this.HSL2RGB(hsla);
        rgba.A = hsla.A;
        return rgba;
    };
    Color.prototype.reverse = function () {
        this.m_rgba.R = 0xff - this.m_rgba.R;
        this.m_rgba.G = 0xff - this.m_rgba.G;
        this.m_rgba.B = 0xff - this.m_rgba.B;
        this.m_hsla = this.RGBA2HSLA(this.m_rgba);
        this.m_hex = this.RGBA2HEX(this.m_rgba);
        this.m_str = "rgba(" + this.m_rgba.R + "," + this.m_rgba.G + "," + this.m_rgba.B + "," + this.m_rgba.A + ")";
        return this;
    }
    Color.prototype.lighten = function (level) {
        if (level == undefined || level == null) level = 0.05;
        this.m_rgba.R = parseInt(level * (255 - this.m_rgba.R) + this.m_rgba.R);
        this.m_rgba.G = parseInt(level * (255 - this.m_rgba.G) + this.m_rgba.G);
        this.m_rgba.B = parseInt(level * (255 - this.m_rgba.B) + this.m_rgba.B);
        this.m_hsla = this.RGBA2HSLA(this.m_rgba);
        this.m_hex = this.RGBA2HEX(this.m_rgba);
        this.m_str = "rgba(" + this.m_rgba.R + "," + this.m_rgba.G + "," + this.m_rgba.B + "," + this.m_rgba.A + ")";
        return this;
    }
    Color.prototype.darken = function (level) {
        if (level == undefined || level == null) level = 0.05;
        this.m_rgba.R = Math.floor(this.m_rgba.R * (1 - level));
        this.m_rgba.G = Math.floor(this.m_rgba.G * (1 - level));
        this.m_rgba.B = Math.floor(this.m_rgba.B * (1 - level));
        this.m_hsla = this.RGBA2HSLA(this.m_rgba);
        this.m_hex = this.RGBA2HEX(this.m_rgba);
        this.m_str = "rgba(" + this.m_rgba.R + "," + this.m_rgba.G + "," + this.m_rgba.B + "," + this.m_rgba.A + ")";
        return this;
    }
    window.Color = Color;
})();
//unit test 
var testData = {
//测试RGB2HEX() RGBA2HSLA()
    //测试：re.reHex3
    parseHexShort:{
        title: "测试3位Hex的解析，如#35a。",
        input: "#35a",
        output: "Color: m_hex m_str m_rgba m_hsla"
    },
    //测试：re.reHex6
    parseHexNormal:{
        title: "测试6位Hex的解析，如#3355aa。",
        input: "#3355aa",
        output: "Color: m_hex m_str m_rgba m_hsla"
    },
    //parseHexLong:{
    //    title: "测试8位Hex的解析，如#1289ae33",
    //    input: "#1289ae33",
    //    output: "Color: m_hex m_str m_rgba m_hsla"
    // },
    //测试：re.reRgbInteger
    parseRGBInt:{
        title: "测试整数RGB，如rgb( 51, 85 ,170)。",
        input: "rgb( 51, 85 ,170)",
        output: "Color: m_hex m_str m_rgba m_hsla"
    },
    //测试：re.reRgbPercent
    parseRGBPercent:{
        title: "测试百分比RGB，如rgb( 20%, 33.33% ,66.67%)。",
        input: "rgb( 20%, 33.33% ,66.67%)",
        output: "Color: m_hex m_str m_rgba m_hsla"
    },
    //测试：re.reRgbInteger
    parseRGBAInt:{
        title: "测试整数RGBA，如rgba( 51, 85 ,170,0.8 )。",
        input: "rgba( 51, 85 ,170,1 )",
        output: "Color: m_hex m_str m_rgba m_hsla"
    },
    //测试：re.reRgbPercent
    parseRGBAPercent:{
        title: "测试百分比RGBA，如rgba( 20%, 33.33% ,66.67%, 0.8 )。",
        input: "rgba( 20%, 33.33% ,66.67%, 0.8 )",
        output: "Color: m_hex m_str m_rgba m_hsla"
    },
    //测试HSL2RGBA() RGB2HEX()
    //测试：re.Hsl
    parseHSL:{
        title: "测试HSLPercent，如hsl( 223, 0.5385 , 0.4333 )。",
        input: "hsl( 223, 0.5385 , 0.4333 )",
        output: "Color: m_hex m_str m_rgba m_hsla"
    },
    //测试：re.reHslPercent
    parseHSLPercent:{
        title: "测试HSLPercent，如hsl( 223, 53.85% , 43.33% )。",
        input: "hsl( 223, 53.85% , 43.33% )",
        output: "Color: m_hex m_str m_rgba m_hsla"
    },
    //测试：re.HslaPercent
    parseHSLAPercent:{
        title: "测试hslaPercent，如hsla( 223, 53.85% , 43.33%, 0.8)。",
        input: "hsla( 223, 53.85% , 43.33%, 0.8)",
        output: "Color: m_hex m_str m_rgba m_hsla"
    }
};
//for(var k in testData){
//    console.log(testData[k]["title"]);
//    console.log(testData[k]["output"]);
//    console.dir(new Color(testData[k]["input"]).parse());
//}
//var testToString = new Color("#c00").parse();
//console.log(testToString.ToString());
//console.log(testToString.ToString("rgb"));
//console.log(testToString.ToString("rgba"));
//console.log(testToString.ToString("hsl"));
//console.log(testToString.ToString("hsla"));
//HSL百分比 hslaPercent 有问题 

//2017-3-7 08:59:29 补充 reverse函数和 lighten darken 操作
//RGBA2HEX()修正两点：A不用除以100 以及字符串 与 + 符号的问题
console.log("测试reverse函数操作");
console.dir(new Color().parse("#000").reverse());
console.dir(new Color().parse("#fff").reverse());
console.dir(new Color().parse("#123456").reverse());
console.log("测试减淡效果");
//console.log(new Color().parse("#00ff00").lighten(0.5));