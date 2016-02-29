function SimilarityGraphViz() {
    var width = 720, height = 500; //default width and height.

    var _geomMath = new GeomMathUtils();
    var _svg = undefined;
    var _radius = 20;

    var _createNode = function(cx, cy, text) {
        var node = _svg.append("circle").attr("cx", cx).attr("cy", cy).attr("r", _radius)
                   .style("fill", "grey").style("stroke", "black");
        _svg.append("text").text(text).attr("font-size", "10px").attr("x", cx-_radius).attr("y", cy+_radius + 10);
        return node;
    };

    var _createEdge = function(node1, node2) {
        var nd1 = { cx: parseInt(node1.attr("cx")), cy: parseInt(node1.attr("cy")) };
        var nd2 = { cx: parseInt(node2.attr("cx")), cy: parseInt(node2.attr("cy")) };

        var pSrc = _geomMath.intersectCircumferenceSegment(nd1.cx, nd1.cy, _radius, nd2.cx, nd2.cy);
        var pDst = _geomMath.intersectCircumferenceSegment(nd2.cx, nd2.cy, _radius, nd1.cx, nd1.cy);
        var segmentLength = _geomMath.calculateSegmentLength(pSrc.x, pSrc.y, pDst.x, pDst.y);

        //CENTRAL LINE.
        var lineEq = new LineEquation(pSrc.x, pSrc.y, pDst.x, pDst.y);
        var p0up = lineEq.point0();
        var p1up = lineEq.pointAtDist(segmentLength);
        /*_svg.append("line")
            .attr("x1", p0up.x).attr("y1", p0up.y)
            .attr("x2", p1up.x).attr("y2", p1up.y)
            .style("stroke-width", "2").style("stroke", "lightgrey");*/

        //UPLINE-DOWNLINE.
        var lineEqUp = new LineEquation(pSrc.x, pSrc.y, pDst.x, pDst.y);
        var p0up = lineEqUp.translatePerpendicularly(-1.5).point0();
        var p1up = lineEqUp.pointAtDist(segmentLength);
        _svg.append("line").attr("x1", p0up.x).attr("y1", p0up.y).attr("x2", p1up.x).attr("y2", p1up.y).style("stroke-width", "1").style("stroke", "lightgrey");

        var lineEqDown = new LineEquation(pSrc.x, pSrc.y, pDst.x, pDst.y);
        var p0down = lineEqDown.translatePerpendicularly(1.5).point0();
        var p1down = lineEqDown.pointAtDist(segmentLength);
        _svg.append("line").attr("x1", p0down.x).attr("y1", p0down.y).attr("x2", p1down.x).attr("y2", p1down.y).style("stroke-width", "1").style("stroke", "lightgrey");

        //lineEq.rotate90Degree(); //(pSrc.x, pSrc.y);
        /*var tgSrc = lineEq.point0();
        var p0Up = lineEq.pointAtDist(1);
        var p0Down = lineEq.pointAtDist(-1);*/


        var song1 = "0*+2*-2*+2*+2*+1*-1*+1*+2*+2*-2*-2*-1*-2*-2*0*0*0*+2*-2*+2*+2*0*p*0*+1*-1*+1*+2*0*0*+2*-2*-2*-1*-2*-2*0*0*p*0*+2*-2*+2*+2*0*p*0*+1*-1*+1*+2*0*+2*-2*-2*-1*-2*-2*+2*-2*+2*+2*1*-1*+1*+2*+2*-2*-2*-1*-2*-2";
        var song2 = "0*0*p*+2*-2*+2*-2*+4*0*p*+1*-1*+1*-1*+3*0*p*+2*-2*+2*-2*0*p*-2*-1*+1*-1*0*p*-2*-2*-1*+1*p*0*0*p*+2*-2*+2*-2*+4*0*p*+1*+1*-1*+1*-1*+3*0*p*+2*-2*+2*-2*0*p*-2*-1*+1*-1*0*p*-2*-2*-1*+1";
        var maxSongChars = song1.length > song2.length ? song1.length : song2.length;

        var interpol = function (i, n, length) {
            return (i * length) / n;
        };//EndFunction.

        /////////////////////////////////
        /*var data = [];
        data.push({ pos: 155, length: 13 });
        data.push({ pos: 7, length: 13 });
        data.push({ pos: 97, length: 13 });

        data.push({ pos: 13, length: 11 });
        data.push({ pos: 67, length: 11 });
        data.push({ pos: 127, length: 11 });

        data.push({ pos: 24, length: 11 });
        data.push({ pos: 117, length: 11 });

        data.forEach(function(element) {
            element.pos = interpol(element.pos, maxSongChars, segmentLength);
            element.length = interpol(element.length, maxSongChars, segmentLength);

            var p0 = lineEq.pointAtDist(element.pos);
            var p1 = lineEq.pointAtDist(element.pos + element.length);

            _svg.append("line").attr("x1", p0.x).attr("y1", p0.y).attr("x2", p1.x).attr("y2", p1.y).style("stroke-width", "3").style("stroke", "red");
        });
        return;
        */

        /////////////////////////////////

        //UP.
        var data = [];
        data.push({ pos: 155, length: 13 });
        data.forEach(function(element) {
            element.pos = interpol(element.pos, maxSongChars, segmentLength);
            element.length = interpol(element.length, maxSongChars, segmentLength);

            var p0 = lineEqUp.pointAtDist(element.pos);
            var p1 = lineEqUp.pointAtDist(element.pos + element.length);

            _svg.append("line").attr("x1", p0.x).attr("y1", p0.y).attr("x2", p1.x).attr("y2", p1.y).style("stroke-width", "2").style("stroke", "rgb(244,67,54)");
        });
        var data = [];
        data.push({ pos: 7, length: 13 });
        data.push({ pos: 97, length: 13 });
        data.forEach(function(element) {
            element.pos = interpol(element.pos, maxSongChars, segmentLength);
            element.length = interpol(element.length, maxSongChars, segmentLength);

            var p0 = lineEqDown.pointAtDist(element.pos);
            var p1 = lineEqDown.pointAtDist(element.pos + element.length);

            _svg.append("line").attr("x1", p0.x).attr("y1", p0.y).attr("x2", p1.x).attr("y2", p1.y).style("stroke-width", "2").style("stroke", "rgb(244,67,54)");
        });

        //UP.
        var data = [];
        data.push({ pos: 13, length: 11 });
        data.push({ pos: 67, length: 11 });
        data.push({ pos: 127, length: 11 });
        data.forEach(function(element) {
            element.pos = interpol(element.pos, maxSongChars, segmentLength);
            element.length = interpol(element.length, maxSongChars, segmentLength);

            var p0 = lineEqUp.pointAtDist(element.pos);
            var p1 = lineEqUp.pointAtDist(element.pos + element.length);

            _svg.append("line").attr("x1", p0.x).attr("y1", p0.y).attr("x2", p1.x).attr("y2", p1.y).style("stroke-width", "2").style("stroke", "orange");
        });
        var data = [];
        data.push({ pos: 24, length: 11 });
        data.push({ pos: 117, length: 11 });
        data.forEach(function(element) {
            element.pos = interpol(element.pos, maxSongChars, segmentLength);
            element.length = interpol(element.length, maxSongChars, segmentLength);

            var p0 = lineEqDown.pointAtDist(element.pos);
            var p1 = lineEqDown.pointAtDist(element.pos + element.length);

            _svg.append("line").attr("x1", p0.x).attr("y1", p0.y).attr("x2", p1.x).attr("y2", p1.y).style("stroke-width", "2").style("stroke", "orange");
        });


        /////////////////// PREV RELEASE..
        return;
        var data = [];
        data.push({ pos: 7, length: 13 });
        data.push({ pos: 97, length: 13 });
        data.push({ pos: 155, length: 13 });

        data.forEach(function(element) {
            element.pos = interpol(element.pos, maxSongChars, segmentLength);
            element.length = interpol(element.length, maxSongChars, segmentLength);

            var p0 = _geomMath.coordinateOnSegAtDist(pSrc.x, pSrc.y, pDst.x, pDst.y, element.pos);
            var p1 = _geomMath.coordinateOnSegAtDist(pSrc.x, pSrc.y, pDst.x, pDst.y, element.pos + element.length);

            _svg.append("line")
                .attr("x1", p0.x).attr("y1", p1.y)
                .attr("x2", p1.x).attr("y2", p1.y)
                .style("stroke-width", "3").style("stroke", "red");
        });

        var data = [];
        data.push({ pos: 13, length: 11 });
        data.push({ pos: 24, length: 11 });
        data.push({ pos: 67, length: 11 });
        data.push({ pos: 127, length: 11 });
        data.push({ pos: 117, length: 11 });

        data.forEach(function(element) {
            element.pos = interpol(element.pos, maxSongChars, segmentLength);
            element.length = interpol(element.length, maxSongChars, segmentLength);

            var p0 = _geomMath.coordinateOnSegAtDist(pSrc.x, pSrc.y, pDst.x, pDst.y, element.pos);
            var p1 = _geomMath.coordinateOnSegAtDist(pSrc.x, pSrc.y, pDst.x, pDst.y, element.pos + element.length);

            _svg.append("line")
                .attr("x1", p0.x).attr("y1", p1.y)
                .attr("x2", p1.x).attr("y2", p1.y)
                .style("stroke-width", "3").style("stroke", "blue");
        });


    };

    /**
     * Generate the visualization using 'width' and 'height'.
     */
    function build() {
        _svg = d3.select("body").append("svg").attr("width", width).attr("height", height);
        var node1 = _createNode(30, 30, "Will you be there");
        var node2 = _createNode(230, 30, "I cigni di balaka");
        var edge = _createEdge(node1, node2);
        debugger;
    }//EndFunction.

    build.width = function(value) {
        if (!arguments.length) return width;
        width = value;
        return build;
    };//EndFunction.

    build.height = function(value) {
        if (!arguments.length) return height;
        height = value;
        return my;
    };//EndFunction.

    return build;

}//EndVizLibrary.