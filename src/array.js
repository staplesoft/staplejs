if (typeof S_LIB === "undefined") var S_LIB = {};

S_LIB.Array = class extends Array {
	static dimensionsOf(...lengths) {
		var arr = new Array(lengths[0] ?? 0), i = lengths[0];

		if (lengths.length > 1) {
			var args = lengths.slice(1);
			while(i--) arr[lengths[0] - 1 - i] = this.dimensionsOf(...args);
		}

		return arr;
	}
}

export var Array = S_LIB.Array;