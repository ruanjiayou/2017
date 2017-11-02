/**
作者：阮家友
时间：2017-4-4 14:10:19
说明：


        oc1.setStrokeColor(dStroke).setFillColor(dFill).mGC.lineWidth = 1;
        for(var i=0;i<9;i++){
            x = i%3*2;
            y = Math.floor(i/3)*2;
            points.push({ x: i%3*2, y: Math.floor(i/3)*2});
            oc1.drawCircle({"x0": (1.5+points[i].x)*a, "y0": (1.5+points[i].y)*a,"R": a*0.5}).fillCircle({"x0": (1.5+points[i].x)*a, "y0": (1.5+points[i].y)*a,"R": a*0.1});
        }
**/
