(window._gsQueue || (window._gsQueue = [])).push(function() {
    "use strict";
    var t = Math.PI / 180,
        e = function(t, e, i, r, s) {
            this.p = e, this.f = "function" == typeof t[e], this.start = this.value = this.f ? t[e.indexOf("set") || "function" != typeof t["get" + e.substr(3)] ? e : "get" + e.substr(3)]() : parseFloat(t[e]), this.velocity = i || 0, this.v = this.velocity / s, r || 0 === r ? (this.acceleration = r, this.a = this.acceleration / (s * s)) : this.acceleration = this.a = 0
        },
        i = Math.random(),
        r = window._gsDefine.globals.com.greensock.core.Animation._rootFramesTimeline,
        s = window._gsDefine.plugin({
            propName: "physics2D",
            API: 2,
            init: function(i, s, n) {
                this._target = i, this._tween = n, this._runBackwards = n.vars.runBackwards === !0, this._step = 0;
                for (var a, o = n._timeline, l = Number(s.angle) || 0, h = Number(s.velocity) || 0, u = Number(s.acceleration) || 0, _ = s.xProp || "x", p = s.yProp || "y", f = s.accelerationAngle || 0 === s.accelerationAngle ? Number(s.accelerationAngle) : l; o._timeline;) o = o._timeline;
                return this._stepsPerTimeUnit = a = o === r ? 1 : 30, s.gravity && (u = Number(s.gravity), f = 90), l *= t, f *= t, this._friction = 1 - Number(s.friction || 0), this._overwriteProps.push(_), this._overwriteProps.push(p), this._x = new e(i, _, Math.cos(l) * h, Math.cos(f) * u, a), this._y = new e(i, p, Math.sin(l) * h, Math.sin(f) * u, a), this._skipX = this._skipY = !1, !0
            },
            set: function() {
                var t, e, i, r, s, n, a = this._tween._time,
                    o = this._x,
                    l = this._y;
                if (this._runBackwards === !0 && (a = this._tween._duration - a), 1 === this._friction) i = .5 * a * a, t = o.start + (o.velocity * a + o.acceleration * i), e = l.start + (l.velocity * a + l.acceleration * i);
                else {
                    if (a *= this._stepsPerTimeUnit, r = n = (0 | a) - this._step, s = a % 1, n >= 0)
                        for (; --n > -1;) o.v += o.a, l.v += l.a, o.v *= this._friction, l.v *= this._friction, o.value += o.v, l.value += l.v;
                    else
                        for (n = -n; --n > -1;) o.value -= o.v, l.value -= l.v, o.v /= this._friction, l.v /= this._friction, o.v -= o.a, l.v -= l.a;
                    t = o.value + o.v * s, e = l.value + l.v * s, this._step += r
                }
                this._skipX || (o.r && (t = 0 | t + (0 > t ? -.5 : .5)), o.f ? this._target[o.p](t) : this._target[o.p] = t), this._skipY || (l.r && (e = 0 | e + (0 > e ? -.5 : .5)), l.f ? this._target[l.p](e) : this._target[l.p] = e)
            }
        }),
        n = s.prototype;
    n._kill = function(t) {
        return null != t[this._x.p] && (this._skipX = !0), null != t[this._y.p] && (this._skipY = !0), this._super._kill(t)
    }, n._roundProps = function(t, e) {
        (t.physics2D || t[this._x.p]) && (this._x.r = e), (t.physics2D || t[this._y.p]) && (this._y.r = e)
    }, s._autoCSS = !0, s._cssRegister = function() {
        var t = window._gsDefine.globals.CSSPlugin;
        if (t) {
            var e = t._internals,
                r = e._parseToProxy,
                n = e._setPluginRatio,
                a = e.CSSPropTween;
            e._registerComplexSpecialProp("physics2D", {
                parser: function(t, e, o, l, h, u) {
                    u = new s;
                    var _, p = e.xProp || "x",
                        f = e.yProp || "y",
                        c = {};
                    return c[p] = c[f] = i++, _ = r(t, c, l, h, u), h = new a(t, "physics2D", 0, 0, _.pt, 2), h.data = _, h.plugin = u, h.setRatio = n, u._onInitTween(_.proxy, e, l._tween), h
                }
            })
        }
    }
}), window._gsDefine && window._gsQueue.pop()();