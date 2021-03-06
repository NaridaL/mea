// I'd use a loop but it kills the type checker.
const ceil = Math.ceil;
const floor = Math.floor;
const abs = Math.abs;
const sign = Math.sign;
const atan2 = Math.atan2;
const atan = Math.atan;
const cos = Math.cos;
const sin = Math.sin;
const min = Math.min;
const max = Math.max;
const PI = Math.PI;
const TAU = 2 * Math.PI;
const sqrt = Math.sqrt;
const pow = Math.pow;
const round = Math.round;
const log = Math.log;
let globalId = 0;
/** @define {boolean} */
const NLA_DEBUG = true;
const NLA_PRECISION = 1 / (1 << 26);
console.log("NLA_PRECISION", NLA_PRECISION);
function SCE(o) {
    return o.sce;
}
function STR(o) {
    return o.str;
}
Object.defineProperty(Object.prototype, 'sce', { get: function () { return this.toSource(); } });
Object.defineProperty(Object.prototype, 'str', { get: function () { return this.toString(); } });
if (!Object.prototype.toSource) {
    Object.defineProperty(Object.prototype, 'toSource', { value: function () { return JSON.stringify(this); } });
}
let oldConsole = undefined;
function disableConsole() {
    oldConsole = console.log;
    console.log = function () { };
}
function enableConsole() {
    if (oldConsole) {
        console.log = oldConsole;
    }
}
function assertVectors(...vectors) {
    if (NLA_DEBUG) {
        for (let i = 0; i < arguments.length; i++) {
            if (!(arguments[i] instanceof V3 || arguments[i] instanceof NLA.Vector)) {
                throw new Error("assertVectors arguments[" + (i) + "] is not a vector. " + typeof arguments[i] + " == typeof " + arguments[i]);
            }
        }
    }
    return true;
}
function assertInst(what, ...objs) {
    if (NLA_DEBUG) {
        for (let i = 0; i < objs.length; i++) {
            if (!(objs[i] instanceof what)) {
                throw new Error("assertInst objs[" + (i) + "] is not a " + what.prototype.constructor.name + ". " + objs[i].constructor.name + objs[i]);
            }
        }
    }
    return true;
}
function assertNumbers(...numbers) {
    if (NLA_DEBUG) {
        for (let i = 0; i < numbers.length; i++) {
            if (typeof numbers[i] !== 'number') {
                throw new Error("assertNumbers arguments[" + (i) + "] is not a number. " + typeof numbers[i] + " == typeof " + numbers[i]);
            }
        }
    }
    return true;
}
function assert(value, ...messages) {
    if (NLA_DEBUG && !value) {
        throw new Error("NLA.assert failed: "
            + messages.map(message => ('function' === typeof message ? message() : message || '')).join('\n'));
    }
    return true;
}
function assertNever(value) {
    throw new Error();
}
function assertf(f, ...messages) {
    if (!f()) {
        throw new Error("NLA.assertf failed: " + f.toString()
            + messages.map(message => ('function' === typeof message ? message() : message || '')).join('\n'));
    }
}
var NLA;
(function (NLA) {
    NLA.eq0 = (x) => Math.abs(x) < NLA_PRECISION;
    NLA.eq02 = (x, precision) => Math.abs(x) < precision;
    NLA.eq = (x, y) => Math.abs(x - y) <= NLA_PRECISION;
    NLA.lt = (x, y) => x + NLA_PRECISION < y;
    NLA.gt = (x, y) => x > y + NLA_PRECISION;
    NLA.le = (x, y) => x <= y + NLA_PRECISION;
    NLA.ge = (x, y) => x + NLA_PRECISION >= y;
    NLA.eq2 = (x, y, precision) => Math.abs(x - y) < precision;
    NLA.eqAngle = (x, y) => NLA.zeroAngle(x - y);
    NLA.zeroAngle = (x) => ((x % (2 * Math.PI)) + 2 * Math.PI + NLA_PRECISION) % (2 * Math.PI) < 2 * NLA_PRECISION;
    NLA.snap = (x, to) => Math.abs(x - to) <= NLA_PRECISION ? to : x;
    NLA.snap0 = (x) => Math.abs(x) <= NLA_PRECISION ? 0 : x;
    NLA.canonAngle = (x) => ((x % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    /**
     * Decimal adjustment of a number.
     *
     * @param  f  The type of adjustment.
     * @param  value The number.
     * @param exp   The exponent (the 10 logarithm of the adjustment base).
     * @returns The adjusted value.
     */
    function decimalAdjust(f, value, exp) {
        // If the exp is undefined or zero...
        if (typeof exp === 'undefined' || +exp === 0) {
            return f(value);
        }
        value = +value;
        exp = +exp;
        // If the value is not a number or the exp is not an integer...
        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
            return NaN;
        }
        // Shift
        let vs = value.toString().split('e');
        value = f(+(vs[0] + 'e' + (vs[1] ? (+vs[1] - exp) : -exp)));
        // Shift back
        vs = value.toString().split('e');
        return +(vs[0] + 'e' + (vs[1] ? (+vs[1] + exp) : exp));
    }
    NLA.round10 = decimalAdjust.bind(undefined, Math.round);
    NLA.floor10 = decimalAdjust.bind(undefined, Math.floor);
    NLA.ceil10 = decimalAdjust.bind(undefined, Math.ceil);
    function repeatString(count, str) {
        if (count == 0) {
            return "";
        }
        count *= str.length;
        const halfCharLength = count / 2;
        let result = str;
        // double the input until it is long enough.
        while (result.length <= halfCharLength) {
            result += result;
        }
        // use substring to hit the precise length target without
        // using extra memory
        return result + result.substring(0, count - result.length);
    }
    NLA.repeatString = repeatString;
    function mod(a, b) {
        return ((a % b) + b) % b;
    }
    NLA.mod = mod;
    function arraySwap(arr, i, j) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    NLA.arraySwap = arraySwap;
    function arrayCopy(src, sstart, dst, dstart, length) {
        dstart += length;
        length += sstart;
        while (length-- > sstart) {
            dst[--dstart] = src[length];
        }
    }
    NLA.arrayCopy = arrayCopy;
    function clamp(val, min, max) {
        assertNumbers(val, min, max);
        return Math.max(min, Math.min(max, val));
    }
    NLA.clamp = clamp;
    function randomColor() {
        return Math.floor(Math.random() * 0x1000000);
    }
    NLA.randomColor = randomColor;
    function mapPush(map, key, val) {
        const array = map.get(key);
        if (array) {
            array.push(val);
        }
        else {
            map.set(key, [val]);
        }
    }
    NLA.mapPush = mapPush;
    function arrayCopyStep(src, sstart, sstep, dst, dstart, dstep, count) {
        let srcIndex = sstart + count * sstep;
        let dIndex = dstart + count * dstep;
        while (srcIndex > sstart) {
            dst[dIndex -= dstep] = src[srcIndex -= sstep];
        }
    }
    NLA.arrayCopyStep = arrayCopyStep;
    function arrayCopyBlocks(src, sstart, sstep, dst, dstart, dstep, blockSize, blockCount) {
        for (let i = 0; i < blockCount; i++) {
            NLA.arrayCopy(src, sstart + sstep * i, dst, dstart + dstep * i, blockSize);
        }
    }
    NLA.arrayCopyBlocks = arrayCopyBlocks;
    function arrayRange(startInclusive, endExclusive, step) {
        assertNumbers(startInclusive, step);
        //console.log(Math.ceil((endExclusive - startInclusive) / step))
        const result = new Array(Math.ceil((endExclusive - startInclusive) / step)); // "- startInclusive" so that chunk in the last row will also be selected, even if the row is not complete
        for (let i = 0, index = 0; i < endExclusive; i += step, index++) {
            result[index] = i;
        }
        return result;
    }
    NLA.arrayRange = arrayRange;
    function arrayFromFunction(length, f) {
        assertNumbers(length);
        assert("function" == typeof f);
        const a = new Array(length);
        let elIndex = length;
        while (elIndex--) {
            a[elIndex] = f(elIndex);
        }
        return a;
    }
    NLA.arrayFromFunction = arrayFromFunction;
    function fuzzyUniques(vals) {
        let round = val => Math.floor(val * (1 << 26)) / (1 << 26);
        let map = new Map();
        map.set(round(vals[0]), vals[0]);
        for (let i = 1; i < vals.length; i++) {
            let val = vals[i], roundVal = round(val);
            let key;
            if (!map.has(roundVal)
                && !((key = map.get(roundVal - 1 / (1 << 26))) && NLA.eq(key, val))
                && !((key = map.get(roundVal + 1 / (1 << 26))) && NLA.eq(key, val))) {
                map.set(roundVal, val);
            }
        }
        return Array.from(map.values());
    }
    NLA.fuzzyUniques = fuzzyUniques;
    function fuzzyUniquesF(vals, f) {
        let round = val => Math.floor(val * (1 << 26)) / (1 << 26);
        let map = new Map();
        for (let i = 0; i < vals.length; i++) {
            let val = vals[i], roundVal = round(f(val));
            let key;
            if (!map.has(roundVal)
                && !((key = map.get(roundVal - 1 / (1 << 26))) && NLA.eq(key, f(val)))
                && !((key = map.get(roundVal + 1 / (1 << 26))) && NLA.eq(key, f(val)))) {
                map.set(roundVal, val);
            }
        }
        return Array.from(map.values());
    }
    NLA.fuzzyUniquesF = fuzzyUniquesF;
    function addOwnProperties(target, props) {
        Object.getOwnPropertyNames(props).forEach(key => {
            //console.log(props, key)
            if (target.hasOwnProperty(key)) {
                console.warn("target ", target, " already has property ", key);
            }
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(props, key));
        });
    }
    NLA.addOwnProperties = addOwnProperties;
    function defineClass(name, parent, constructor, props, statics) {
        assert('function' == typeof constructor, "'function' == typeof constructor");
        constructor.prototype = NLA.defineObject(parent && parent.prototype, props);
        constructor.prototype.constructor = constructor;
        Object.defineProperty(constructor.prototype, 'name', { value: name });
        statics && NLA.addOwnProperties(constructor, statics);
        return constructor;
    }
    NLA.defineClass = defineClass;
    NLA.defaultRoundFunction = x => x; // Math.round10(x, -4)
    function defineObject(prot, props) {
        const o = Object.create(prot || NLA.BaseObject);
        addOwnProperties(o, props);
        return o;
    }
    NLA.defineObject = defineObject;
    NLA.BaseObject = class extends Object {
        toSource() {
            return this.toString == Object.prototype.toString ? Object.prototype.toSource.apply(this) : this.toString();
        }
    };
    function forceFinite(val) {
        val = parseFloat(val.replace(',', '.').replace(/^[^0-9,\.\-]/, ''));
        return Number.isFinite(val) ? val : 0;
    }
    NLA.forceFinite = forceFinite;
    NLA.minus = (a, b) => a - b;
    /**
     * combinations(2) will generate
     * [0,0] [0,1] [1,1] [0,2] [1,2] [2,2]
     */
    function* combinations(n) {
        for (let i = 0; i < n; i++) {
            for (let j = i; j < n; j++) {
                yield { i: i, j: j };
            }
        }
    }
    NLA.combinations = combinations;
    NLA.CLASSES = {};
    function registerClass(clazz) {
        NLA.CLASSES[clazz.name] = clazz;
    }
    NLA.registerClass = registerClass;
    /* The arithmetic-geometric mean of two non-negative numbers */
    function arithmeticGeometricMean(x, y) {
        assertf(() => NLA.lt(0, x));
        assertf(() => NLA.lt(0, y));
        let a = x, g = y;
        let i = 30;
        while (i-- && a != g) {
            [a, g] = [(a + g) / 2, Math.sqrt(a * g)];
        }
        assert(i != -1);
        return a;
    }
    NLA.arithmeticGeometricMean = arithmeticGeometricMean;
    /**
     * incomplete elliptic integral of the first kind
     * EllipticF(phi, k2) = INT[0; phi] 1 / sqrt(1 - k2 * sin²(phi)) dphi
     */
    function EllipticF(phi, k2) {
        return gaussLegendreQuadrature24(phi => Math.pow(1 - k2 * Math.pow(Math.sin(phi), 2), -0.5), 0, phi);
    }
    NLA.EllipticF = EllipticF;
    /**
     * incomplete elliptic integral of the second kind
     * EllipticE(phi, k2) = INT[0; phi] sqrt(1 - k2 * sin²(phi)) dphi
     */
    function EllipticE(phi, k2) {
        return gaussLegendreQuadrature24(phi => Math.pow(1 - k2 * Math.pow(Math.sin(phi), 2), 0.5), 0, phi);
    }
    NLA.EllipticE = EllipticE;
})(NLA || (NLA = {}));
const COLORS = {
    RD_FILL: 0x9EDBF9,
    RD_STROKE: 0x77B0E0,
    TS_FILL: 0xD19FE3,
    TS_STROKE: 0xA76BC2,
    PP_FILL: 0xF3B6CF,
    PP_STROKE: 0xEB81B4,
};
const DEG = .017453292519943295;
function rad2deg(rad) {
    //  discuss at: http://phpjs.org/functions/deg2rad/
    // original by: Enrique Gonzalez
    // improved by: Thomas Grainger (http://graingert.co.uk)
    //   example 1: deg2rad(45)
    //   returns 1: 0.7853981633974483
    return rad / DEG;
}
String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
/**
 * numberToStr(2/3) == '0.6p'
 * numberToStr(7/12) == '0.583p'
 * numberToStr(2/7) == '0.285714pppppp'
 * numberToStr(NLA_PRECISION) == '0+'
 * numberToStr(-NLA_PRECISION) == '0-'
 * numberToStr(2-NLA_PRECISION) == '2-'
 * numberToStr(0) == '0='
 *
 */
function numberToStr(value, length) {
    let minAbsDiff = Infinity, closestValue = undefined, closestValueStr = undefined;
    function test(testValue, testValueStr) {
        const absDiff = Math.abs(testValue - value);
        console.log(testValue, testValueStr, absDiff);
        if (absDiff < minAbsDiff) {
            minAbsDiff = absDiff;
            closestValue = testValue;
            closestValueStr = testValueStr;
        }
        return 0 == absDiff;
    }
    function overline(str) {
        return str.split('').map(c => c + '\u0304').join('');
    }
    if (test(parseFloat(value.toFixed(length)), value.toFixed(length)))
        return closestValueStr + '=';
    const valueStr = '' + value;
    const toDecimal = valueStr.substr(0, valueStr.indexOf('.') + 1);
    const decimals = valueStr.substr(valueStr.indexOf('.') + 1);
    for (let startPos = 0; startPos < length; startPos++) {
        for (let endPos = startPos + 1; endPos <= length; endPos++) {
            const prefixDecimals = decimals.substr(0, startPos);
            const period = decimals.substr(startPos, endPos);
            const testValue = parseFloat(toDecimal + prefixDecimals + NLA.repeatString(Math.ceil((17 - startPos) / period.length), period));
            if (test(testValue, toDecimal + prefixDecimals + overline(period)))
                return closestValueStr + '=';
        }
    }
    return closestValueStr + (closestValue < value ? '-' : '+');
}
console.log(numberToStr(29 / 99, 4));
console.log(numberToStr(77 / 99, 4));
const ARRAY_UTILITIES = {
    pushAll(arr) {
        Array.prototype.push.apply(this, arr);
    },
    sliceStep(start, step, chunkSize) {
        assertNumbers(start, step);
        chunkSize = chunkSize || 1;
        const result = new Array(Math.ceil((this.length - start) / step)); // "- start" so that chunk in the last row
        // will also be selected, even if the row is
        // not complete
        let index = 0;
        for (let i = 0; i < this.length; i += step) {
            for (let j = 0; j < chunkSize; j++) {
                result[index++] = this[start + i + j];
            }
        }
        return result;
    },
    firstMatch(f) {
        for (let i = 0; i < this.length; i++) {
            if (i in this) {
                let val = f(this[i]);
                if (val) {
                    return val;
                }
            }
        }
    },
    /**
     * Semantically identical to .map(f).filter(v => v)
     */
    mapFilter(f) {
        let length = this.length, result = [];
        for (let i = 0; i < length; i++) {
            if (i in this) {
                let val = f(this[i], i, this);
                if (val) {
                    result.push(val);
                }
            }
        }
        return result;
    },
    flatMap(f) {
        return Array.prototype.concat.apply([], this.map(f));
    },
    /**
     *
     * @returns {Array} Array.prototype.concat.apply([], this)
     */
    concatenated() {
        return Array.prototype.concat.apply([], this);
    },
    min() {
        let i = this.length, max = Infinity;
        while (i--) {
            const val = this[i];
            if (max > val)
                max = val;
        }
        return max;
    },
    max() {
        // faster and no limit on array size, see https://jsperf.com/math-max-apply-vs-loop/2
        let i = this.length, max = -Infinity;
        while (i--) {
            const val = this[i];
            if (max < val)
                max = val;
        }
        return max;
    },
    indexWithMax(f) {
        if (this.length == 0) {
            return -1;
        }
        let i = this.length, result = -1, maxVal = -Infinity;
        while (i--) {
            const val = f(this[i], i);
            if (val > maxVal) {
                maxVal = val;
                result = i;
            }
        }
        return result;
    },
    withMax(f) {
        let i = this.length, result = undefined, maxVal = -Infinity;
        while (i--) {
            const el = this[i], val = f(el);
            if (val > maxVal) {
                maxVal = val;
                result = el;
            }
        }
        return result;
    },
    /**
     Returns the sum of the absolute values of the components of this vector.
     E.g. NLA.V(1, -2, 3) === abs(1) + abs(-2) + abs(3) === 1 + 2 + 3 === 6
     */
    absSum() {
        let i = this.length;
        let result = 0;
        while (i--) {
            result += Math.abs(this[i]);
        }
        return result;
    },
    sum() {
        let i = this.length;
        let result = 0;
        while (i--) {
            result += this[i];
        }
        return result;
    },
    sumInPlaceTree() {
        if (0 == this.length)
            return 0;
        let l = this.length;
        while (l != 1) {
            const lHalfFloor = Math.floor(l / 2);
            const lHalfCeil = Math.ceil(l / 2);
            for (let i = 0; i < lHalfFloor; i++) {
                this[i] += this[i + lHalfCeil];
            }
            l = lHalfCeil;
        }
        return this[0];
    },
    isEmpty() {
        return 0 == this.length;
    },
    unique() {
        const uniqueSet = new Set(this);
        return Array.from(uniqueSet);
    },
    remove(o) {
        const index = this.indexOf(o);
        if (index != -1) {
            this.splice(index, 1);
        }
    },
    removeIndex(i) {
        const result = this[i];
        this.splice(i, 1);
        return result;
    },
    removeAll(o) {
        let i = o.length;
        while (i--) {
            this.remove(o[i]);
        }
    },
    toggle(o) {
        const index = this.indexOf(o);
        if (index != -1) {
            this.splice(index, 1);
        }
        else {
            this.push(o);
        }
    },
    binaryIndexOf(searchElement, cmp) {
        let minIndex = 0;
        let maxIndex = this.length - 1;
        let currentIndex;
        let currentElement;
        while (minIndex <= maxIndex) {
            currentIndex = (minIndex + maxIndex) / 2 | 0;
            currentElement = this[currentIndex];
            if (cmp(currentElement, searchElement) < 0) {
                minIndex = currentIndex + 1;
            }
            else if (cmp(currentElement, searchElement) > 0) {
                maxIndex = currentIndex - 1;
            }
            else {
                return currentIndex;
            }
        }
        return -minIndex - 1;
    },
    binaryInsert(el, cmp) {
        cmp = cmp || NLA.minus;
        let minIndex = 0;
        let maxIndex = this.length;
        let currentIndex;
        let currentElement;
        while (minIndex < maxIndex) {
            currentIndex = ~~((minIndex + maxIndex) / 2);
            currentElement = this[currentIndex];
            if (cmp(currentElement, el) < 0) {
                minIndex = currentIndex + 1;
            }
            else {
                maxIndex = currentIndex;
            }
        }
        this.splice(minIndex, 0, el);
    },
    last() {
        return this[this.length - 1];
    }
};
for (let key in ARRAY_UTILITIES) {
    const nlaName = "array" + key.capitalizeFirstLetter();
    assert(!NLA[nlaName]);
    NLA[nlaName] = (arr, ...rest) => ARRAY_UTILITIES[key].apply(arr, rest);
}
function isCCW(vertices, normal) {
    const dsa = doubleSignedArea(vertices, normal);
    assert(0 != dsa);
    return dsa < 0;
}
function triangulateVertices(normal, vertices, holeStarts) {
    const absMaxDim = normal.maxAbsDim(), factor = sign(normal.e(absMaxDim));
    const contour = new Float64Array(vertices.length * 2);
    let i = vertices.length;
    /*
     var [coord0, coord1] = [['y', 'z'], ['z', 'x'], ['x', 'y']][maxAbsDim]
     while (i--) {
     contour[i * 2    ] = vertices[i][coord0] * factor
     contour[i * 2 + 1] = vertices[i][coord1]
     }
     */
    while (i--) {
        // unroll disambiguation instead of accessing elements by string name ([coord0] etc)
        // as it confuses google closure
        switch (absMaxDim) {
            case 0:
                contour[i * 2] = vertices[i].y * factor;
                contour[i * 2 + 1] = vertices[i].z;
                break;
            case 1:
                contour[i * 2] = vertices[i].z * factor;
                contour[i * 2 + 1] = vertices[i].x;
                break;
            case 2:
                contour[i * 2] = vertices[i].x * factor;
                contour[i * 2 + 1] = vertices[i].y;
                break;
        }
    }
    return earcut(contour, holeStarts);
}
function doubleSignedArea(vertices, normal) {
    assert(!normal.isZero(), '!normal.isZero()');
    const absMaxDim = normal.maxAbsDim();
    // order is important, coord0 and coord1 must be set so that coord0, coord1 and maxDim span a right-hand coordinate system
    //var [coord0, coord1] = [['y', 'z'], ['z', 'x'], ['x', 'y']][maxAbsDim]
    const doubleSignedArea = vertices.map((v0, i, vertices) => {
        const v1 = vertices[(i + 1) % vertices.length];
        //return (v1[coord0] - v0[coord0]) * (v1[coord1] + v0[coord1])
        switch (absMaxDim) {
            case 0:
                return (v1.y - v0.y) * (v1.z + v0.z);
            case 1:
                return (v1.z - v0.z) * (v1.x + v0.x);
            case 2:
                return (v1.x - v0.x) * (v1.y + v0.y);
        }
    }).reduce((a, b) => a + b);
    return NLA.snap(doubleSignedArea * Math.sign(normal.e(absMaxDim)), 0);
}
/**
 * solves x² + px + q = 0
 *
 * @param p
 * @param q
 * @returns {Array.<number>}
 */
function pqFormula(p, q) {
    // 4 times the discriminant:in
    const discriminantX4 = p * p / 4 - q;
    if (discriminantX4 < -NLA_PRECISION) {
        return [];
    }
    else if (discriminantX4 <= NLA_PRECISION) {
        return [-p / 2];
    }
    else {
        const root = Math.sqrt(discriminantX4);
        return [-p / 2 - root, -p / 2 + root];
    }
}
/**
 * solves ax³ + bx² + cx + d = 0
 *
 * @returns 0-3 roots
 */
function solveCubicReal2(a, b, c, d) {
    if (NLA.eq0(a)) {
        if (NLA.eq0(b)) {
            return [-d / c];
        }
        else {
            return pqFormula(c / b, d / b);
        }
    }
    const divisor = a;
    a = b / divisor;
    b = c / divisor;
    c = d / divisor;
    const p = (3 * b - a * a) / 3, pDiv3 = p / 3, pDiv3Pow3 = pDiv3 * pDiv3 * pDiv3, q = (2 * a * a * a - 9 * a * b + 27 * c) / 27, qDiv2 = q / 2, discriminant = qDiv2 * qDiv2 + pDiv3Pow3;
    // 18abcd - 4b³d + b²c² - 4ac³ - 27a²d²
    if (discriminant < -NLA_PRECISION / 8) {
        const r = Math.sqrt(-pDiv3Pow3), t = -q / (2 * r), cosphi = t < -1 ? -1 : t > 1 ? 1 : t, // clamp t to [-1;1]
        phi = Math.acos(cosphi), t1 = 2 * Math.cbrt(r);
        const x1 = t1 * Math.cos(phi / 3) - a / 3;
        const x2 = t1 * Math.cos((phi + 2 * Math.PI) / 3) - a / 3;
        const x3 = t1 * Math.cos((phi + 4 * Math.PI) / 3) - a / 3;
        return [x1, x2, x3];
    }
    else if (discriminant <= NLA_PRECISION / 8) {
        if (0 == qDiv2) {
            // TODO: compare with NLA.isZero?
            return [-a / 3];
        }
        const u1 = Math.cbrt(Math.abs(qDiv2));
        const x1 = 2 * u1 - a / 3;
        const x2 = -u1 - a / 3;
        return [x1, x2];
    }
    else {
        const sd = Math.sqrt(discriminant);
        const u1 = Math.cbrt(-qDiv2 + sd);
        const v1 = Math.cbrt(qDiv2 + sd);
        return [u1 - v1 - a / 3];
    }
}
NLA.addOwnProperties(Array.prototype, ARRAY_UTILITIES);
function newtonIterate(f, xStart, steps = 4, EPSILON) {
    EPSILON = EPSILON || 1e-8;
    let x = xStart;
    for (let i = 0; i < steps; i++) {
        let fx = f(x);
        let dfdx = Matrix.jacobi(f, x, fx, EPSILON);
        assert(!dfdx.isZero());
        let dx = dfdx.solveLinearSystem(new NLA.Vector(new Float64Array(fx))).v;
        assert(!isNaN(dx[0]));
        //console.log("fx / dfdx", fx / dfdx)
        for (let j = 0; j < x.length; j++)
            x[j] -= dx[j];
    }
    return x;
}
function newtonIterate1d(f, xStart, steps, EPSILON) {
    steps = steps || 4;
    EPSILON = EPSILON || 1e-8;
    let x = xStart;
    for (let i = 0; i < steps; i++) {
        let fx = f(x);
        let dfdx = (f(x + EPSILON) - fx) / EPSILON;
        //console.log("fx / dfdx", fx / dfdx)
        x = x - fx / dfdx;
    }
    return x;
}
function newtonIterateWithDerivative(f, xStart, steps, df) {
    steps = steps || 4;
    let x = xStart;
    for (let i = 0; i < steps; i++) {
        let fx = f(x);
        let dfdx = df(x);
        //console.log("fx / dfdx", fx / dfdx)
        x = x - fx / dfdx;
    }
    return x;
}
function newtonIterate2d(f1, f2, sStart, tStart, steps) {
    const EPSILON = 1e-6;
    steps = steps || 4;
    let s = sStart, t = tStart;
    do {
        /*
         | a b |-1                   |  d -b |
         | c d |   = 1 / (ad - bc) * | -c  a |
         */
        var f1ts = f1(s, t), f2ts = f2(s, t);
        /*
         let df1s = (f1(s + EPSILON, t) - f1ts) / EPSILON, df1t = (f1(s, t + EPSILON) - f1ts) / EPSILON,
         df2s = (f2(s + EPSILON, t) - f2ts) / EPSILON, df2t = (f2(s, t + EPSILON) - f2ts) / EPSILON
         let det = df1s * df2t - df1t * df2s
         s = s - ( df2t * f1ts - df1t * f2ts) / det
         t = t - (-df2s * f1ts + df1s * f2ts) / det
         */
        // TODO: is this even more accurate?
        let df1s = (f1(s + EPSILON, t) - f1ts), df1t = (f1(s, t + EPSILON) - f1ts), df2s = (f2(s + EPSILON, t) - f2ts), df2t = (f2(s, t + EPSILON) - f2ts);
        let det = (df1s * df2t - df1t * df2s) / EPSILON;
        let ds = (df2t * f1ts - df1t * f2ts) / det;
        let dt = (-df2s * f1ts + df1s * f2ts) / det;
        s -= ds;
        t -= dt;
    } while (--steps && f1ts * f1ts + f2ts * f2ts > NLA_PRECISION);
    if (!steps) {
        //console.log(f1ts * f1ts + f2ts * f2ts)
        return null;
    }
    return new V(s, t, 0);
}
function newtonIterate2dWithDerivatives(f, g, sStart, tStart, steps, dfds, dfdt, dgds, dgdt) {
    steps = steps || 4;
    let s = sStart, t = tStart;
    let eps = 1e-6;
    let f1ts, f2ts;
    do {
        /*
         | a b |-1                   |  d -b |
         | c d |   = 1 / (ad - bc) * | -c  a |
         */
        f1ts = f(s, t);
        f2ts = g(s, t);
        let df1s = dfds(s, t), df1t = dfdt(s, t), df2s = dgds(s, t), df2t = dgdt(s, t);
        // TODO: is this even more accurate?
        let det = df1s * df2t - df1t * df2s;
        let ds = (df2t * f1ts - df1t * f2ts) / det;
        let dt = (-df2s * f1ts + df1s * f2ts) / det;
        s -= ds;
        t -= dt;
    } while (--steps && f1ts * f1ts + f2ts * f2ts > NLA_PRECISION / 32);
    if (!steps) {
        //console.log(f1ts * f1ts + f2ts * f2ts)
        return null;
    }
    return V(s, t, 0);
}
function integrateCurve(curve, startT, endT, steps) {
    const step = (endT - startT) / steps;
    let length = 0;
    let p = curve.at(startT);
    let i = 0, t = startT + step;
    for (; i < steps; i++, t += step) {
        const next = curve.at(t);
        length += p.distanceTo(next);
        p = next;
    }
    return length;
}
const gaussLegendre24Xs = [
    -0.0640568928626056260850430826247450385909,
    0.0640568928626056260850430826247450385909,
    -0.1911188674736163091586398207570696318404,
    0.1911188674736163091586398207570696318404,
    -0.3150426796961633743867932913198102407864,
    0.3150426796961633743867932913198102407864,
    -0.4337935076260451384870842319133497124524,
    0.4337935076260451384870842319133497124524,
    -0.5454214713888395356583756172183723700107,
    0.5454214713888395356583756172183723700107,
    -0.6480936519369755692524957869107476266696,
    0.6480936519369755692524957869107476266696,
    -0.7401241915785543642438281030999784255232,
    0.7401241915785543642438281030999784255232,
    -0.8200019859739029219539498726697452080761,
    0.8200019859739029219539498726697452080761,
    -0.8864155270044010342131543419821967550873,
    0.8864155270044010342131543419821967550873,
    -0.9382745520027327585236490017087214496548,
    0.9382745520027327585236490017087214496548,
    -0.9747285559713094981983919930081690617411,
    0.9747285559713094981983919930081690617411,
    -0.9951872199970213601799974097007368118745,
    0.9951872199970213601799974097007368118745
];
const gaussLegendre24Weights = [
    0.1279381953467521569740561652246953718517,
    0.1279381953467521569740561652246953718517,
    0.1258374563468282961213753825111836887264,
    0.1258374563468282961213753825111836887264,
    0.1216704729278033912044631534762624256070,
    0.1216704729278033912044631534762624256070,
    0.1155056680537256013533444839067835598622,
    0.1155056680537256013533444839067835598622,
    0.1074442701159656347825773424466062227946,
    0.1074442701159656347825773424466062227946,
    0.0976186521041138882698806644642471544279,
    0.0976186521041138882698806644642471544279,
    0.0861901615319532759171852029837426671850,
    0.0861901615319532759171852029837426671850,
    0.0733464814110803057340336152531165181193,
    0.0733464814110803057340336152531165181193,
    0.0592985849154367807463677585001085845412,
    0.0592985849154367807463677585001085845412,
    0.0442774388174198061686027482113382288593,
    0.0442774388174198061686027482113382288593,
    0.0285313886289336631813078159518782864491,
    0.0285313886289336631813078159518782864491,
    0.0123412297999871995468056670700372915759,
    0.0123412297999871995468056670700372915759
];
function gaussLegendreQuadrature24(f, startT, endT) {
    //let result = 0
    //for (let i = 0; i < gaussLegendre24Xs.length; i++) {
    //	// gauss-legendre goes from -1 to 1, so we need to scale
    //	let t = startT + (gaussLegendre24Xs[i] + 1) / 2 * (endT - startT)
    //	result += gaussLegendre24Weights[i] * f(t)
    //}
    //const result = NLA
    //		.arrayFromFunction(24, i => startT + (gaussLegendre24Xs[i] + 1) / 2 * (endT - startT))
    //		.map((t, i) => gaussLegendre24Weights[i] * f(t))
    //		.sumInPlaceTree()
    //99.54182500782605
    //99.54182500782602
    // again, [-1,1], so div by 2
    //return result // 2 * (endT - startT)
    return glq24_11(t => f(startT + (t + 1) / 2 * (endT - startT))) / 2 * (endT - startT);
}
function glq24_11(f) {
    return NLA.arrayFromFunction(24, i => gaussLegendre24Weights[i] * f(gaussLegendre24Xs[i])).sumInPlaceTree();
}
function glqInSteps(f, startT, endT, steps) {
    const dt = (endT - startT) / steps;
    return NLA.arrayFromFunction(steps, i => glq24_11(t => f(startT + dt * i + (t + 1) / 2 * dt))).sumInPlaceTree() / 2 * dt;
}
function midpointRuleQuadrature(f, startT, endT, steps = 32) {
    const dt = (endT - startT) / steps;
    return NLA.arrayFromFunction(steps, i => startT + dt / 2 + dt * i).map(f).sumInPlaceTree() * dt;
}
//# sourceMappingURL=NLA.js.map