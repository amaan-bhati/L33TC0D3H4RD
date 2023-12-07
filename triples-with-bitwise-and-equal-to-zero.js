
//#region Tensor
/**
 * @template TItem
  */
class Tensor {
    /**
       * @param {number} capacity The max capacity of the tensor
          * @param {number[] | undefined} dimensions
             */
    constructor(capacity, dimensions) {
        /**
             * @private
                  * @type {TItem[]}
                       */
        this._data = new Uint16Array(capacity);

        /**
             * @private
                  * @type {number[]}
                       */
        this._dimensions;

        /**
             * @private
                  * @type {number}
                       */
        this._total = 0;

        this.resize(...dimensions);

        /**
             * An array of indices whole sole purpose is to avoid recreating array for some operations such as **forEach**
                  * @type {number[]}
                       * @private
                            */
        this.__indices = [];
    }

    /**
       * @param {...number} dimensions
          */
    resize(...dimensions) {
        this._dimensions = dimensions;
        if (!this._dimensions?.length) this._total = 0;
        else {
            this._total = 1;
            for (let i = 0; i < this._dimensions.length; i++)
                this._total *= this._dimensions[i];
        }
    }

    /**
       * @param {TItem} value
          */
    fill(value) {
        if (!this._dimensions)
            throw `Call "resize" to initialize the dimensions of the Tensor first.`;
        this._data.fill(value, 0, this._total);
    }

    /**
       * @private
          * @param {number[]} indices
             */
    _getFlattenIndex(indices) {
        if (!this._dimensions)
            throw `Call "resize" to initialize the dimensions of the Tensor first.`;
        let n = indices.length;
        if (n != this._dimensions.length)
            throw `The number of dimensions does not match`;
        if (!n) return 0;

        if (indices[0] < 0 || indices[0] >= this._dimensions[0])
            throw `The ${0}-th dimension should be in range [0, ${this._dimensions[0]
            })`;

        let result = indices[0];
        for (let i = 1; i < n; i++) {
            if (indices[i] < 0 || indices[i] >= this._dimensions[i])
                throw `The ${i}-th dimension should be in range [0, ${this._dimensions[i]})`;
            result = result * this._dimensions[i] + indices[i];
        }

        return result;
    }

    /**
       * @param  {...number} indices
          */
    at(...indices) {
        return this._data[this._getFlattenIndex(indices)];
    }

    /**
       * @param  {TItem} value
          * @param  {...number} indices
             */
    set(value, ...indices) {
        this._data[this._getFlattenIndex(indices)] = value;
    }

    /**
       * @param  {TItem} value
          * @param  {...number} indices
             */
    setMin(value, ...indices) {
        let flattenIndex = this._getFlattenIndex(indices);
        this._data[flattenIndex] = Math.min(value, this._data[flattenIndex]);
    }

    /**
       * @param  {TItem} value
          * @param  {...number} indices
             */
    setMax(value, ...indices) {
        let flattenIndex = this._getFlattenIndex(indices);
        this._data[flattenIndex] = Math.max(value, this._data[flattenIndex]);
    }

    /**
       * @param  {TItem} amount
          * @param  {...number} indices
             */
    inc(amount, ...indices) {
        let flattenIndex = this._getFlattenIndex(indices);
        this._data[flattenIndex] += amount;
    }

    /**
       * WARNING: Don't mutate indices array
          * @param {(value: TItem, indices: number[], set: (value: TItem) => void) =>} cb
             */
    forEach(cb) {
        if (!this._dimensions)
            throw `Call "resize" to initialize the dimensions of the Tensor first.`;

        const indices = this.__indices;
        const d = this._dimensions.length;

        while (indices.length < d) indices.push(0);
        indices.fill(0, 0, d);

        let i = 0;
        const set = (value) => {
            this._data[i] = value;
        };

        cb(this._data[0], indices, set);

        for (i = 1; i < this._total; i++) {
            let j = d;
            do {
                j--;
                indices[j]++;
                if (indices[j] == this._dimensions[j]) indices[j] = 0;
            } while (!indices[j]);

            cb(this._data[i], indices, set);
        }
    }
}
//#endregion

function count1s(mask) {
    let res = 0;
    while (mask) {
        res++;
        mask -= mask & -mask;
    }
    return res;
}

let MAX = 65536;
let laz = new Tensor(MAX * 16, [MAX, 16]);
let pri = new Uint16Array(MAX);
let cnt = new Uint16Array(MAX);

for (let i = 0; i < MAX; ++i) {
    cnt[i] = count1s(i);
    pri[i] = i;
}
pri.sort((a, b) => cnt[b] - cnt[a]);

/**
 * @param {number[]} nums
  * @return {number}
   */
var countTriplets = function (nums) {
    laz.fill(0);
    let n = nums.length;

    for (let i = 0; i < n; ++i) laz.inc(1, nums[i], 0);
    let res = 0;

    for (let i = 0; i < MAX; ++i) {
        let num = pri[i];
        let c = 0;

        for (let b = 0; b < 16; ++b) {
            let l = laz.at(num, b);
            if (!l) continue;

            c += l;
            for (let bb = b; bb < 16; ++bb) {
                if (!(num & (1 << bb))) continue;
                laz.inc(l, num & ~(1 << bb), bb);
            }
        }

        if (cnt[num] % 2) res -= c ** 3;
        else res += c ** 3;
    }

    return res;
};
