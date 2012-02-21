(function(d){
    // IE compatibility stuff :-(
    var addListener = (function(w) {
        return w.addEventListener
            ? function(el, type, fn) { el.addEventListener(type, fn, false) }
        : w.attachEvent
            ? function(el, type, fn) { el.attachEvent('on'+type, fn) }
        : function(el, type, fn) { el['on'+type] = fn };
    })(window);
    var delListener = (function(w) {
        return w.removeEventListener
            ? function(el, type, fn) { el.removeEventListener(type, fn, false) }
        : w.detachEvent
            ? function(el, type, fn) { el.detachEvent('on'+type, fn) }
        : function(el, type, fn) { delete el['on'+type] };
    })(window);
    var preventDefault = function(ev) {
        if (ev.preventDefault) ev.preventDefault();
        else                   ev.returnValue = false;
    };

    var resultList = {0:"1", 1:"2", 2:"3", 3:"4", 4:"5", 5:"6", 6:"7"};
    var show = function(n, rs) {
        rs.innerHTML = resultList[n];
    }
    var cellColored = function(cells, n) {
        for (var i=0;i<=n;i++) {
            cells[i].firstChild.style.width = "100%";
        }
    }
    var addSliderEvents = function(me, rs, n){
        var move, mdown, mmove, mup, tstart, tmove, tend;
        var sliderArray = [0,15,30,45,60,75,95];
        me.cells = me.querySelectorAll(".cell");;

        if(n != undefined) {
            show(n, rs);
            cellColored(me.cells, n);
        }

        move = function(clientX, rect){
            var width = clientX - rect.left,
            max = rect.right - rect.left;
            width = width < 0 ? 0 : max < width ? max : width;
            for (var i=0,m=me.cells.length;i<m;i++) {
                me.cells[i].firstChild.style.width = "0%";
            }

            for (i=0,m=me.cells.length;i<m;i++) {
                var w = width - me.cells[i].clientWidth;
                var fc = me.cells[i].firstChild;
                if (w >= 0) {
                    fc.style.width = "100%";
                } else {
                    fc.style.width = width+"px";
                }
                if (w <= 0) {
                    show(i, rs);
                    return;
                }
                width = w;
            }
        };
        mdown = function(ev){
            addListener(d, 'mousemove', mmove);
            addListener(d, 'mouseup', mup);
            mmove(ev);
        };
        mmove = function(ev){
            move(ev.clientX, me.getBoundingClientRect());
            preventDefault(ev);
        };
        mup = function(ev){
            delListener(d, 'mousemove', mmove);
            delListener(d, 'mousedown', mup);
        };
        addListener(me, 'mousedown', mdown);

        tstart = function(ev){
            addListener(d, 'touchmove', tmove);
            addListener(d, 'touchend', tend);
            tmove(ev);
        }
        tmove = function(ev){
            move(ev.touches[0].clientX, me.getBoundingClientRect());
            preventDefault(ev);
        };
        tend = function(ev){
            delListener(d, 'touchmove', tmove);
            delListener(d, 'touchend', tend);
        };
        addListener(me, 'touchstart', tstart);
    };

    addSliderEvents(d.getElementById('slider'), d.getElementById('result'), 1);
    addSliderEvents(d.getElementById('slider2'), d.getElementById('result2'), 1);
})(document);