if (typeof S_LIB === "undefined") var S_LIB = {};

S_LIB.Math = {
    ...(function () { const newObj = {}; Object.getOwnPropertyNames(globalThis.Math).forEach(key => newObj[key] = globalThis.Math[key]); return newObj; })(),
    clon32(integer) {
        return this.clz32(~integer);
    },
    ctrz32(integer) {
        integer >>>= 0; // coerce to Uint32
        if (integer === 0) {
            // skipping this step would make it return -1
            return 32;
        }
        integer &= -integer; // equivalent to `int = int & (~int + 1)`
        return 31 - this.clz32(integer);
    },
    ctron32(integer) {
        return this.ctrz32(~integer);
    },
    iadd(a, b) {
        return (a + b) | 0;
    },
    getCryptoSecureRandomInt() {
        return crypto.getRandomValues(new Uint32Array(1))[0]; // cryptographically secure pseudorandom number generator
    },
    getRandomArbitrary(min, max) {
        return this.random() * (max - min) + min;
    },
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(this.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    },
    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(this.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
    }
};

export var Math = S_LIB.Math;
