
var minCost = (nums, cost) => {
    const min = findCost(nums, cost, 1); /* Time O(N) | Space O(1) */

    return binarySearch(nums, cost, min);/* Time O(N * log(N)) | Space O(1) */
}

const findCost = (nums, cost, x, min = 0) => {
    for (let i = 0; i < nums.length; i++) {/* Time O(N) */
        const num = Math.abs(nums[i] - x);

        min += (num * cost[i]);
    }

    return min;
}

const binarySearch = (nums, cost, min) => {
    let [left, right] = getPointers(nums);/* Time O(N) */

    while (left < right) {/* Time O(log(N)) */
        const mid = ((left + right) >> 1);
        const [x, y] =      /* Time O(N) */
            [findCost(nums, cost, mid), findCost(nums, cost, (mid + 1))];

        min = Math.min(x, y);

        const isGreater = (y <= x)
        if (isGreater) left = (mid + 1);

        const isLess = (x < y)
        if (isLess) right = mid;
    }

    return min;
}

const getPointers = (nums) => {
    let [left, right] = [1, 1000000];

    for (const num of nums) {/* Time O(N) */
        [left, right] = [Math.min(num, left), Math.max(num, right)];
    }

    return [left, right];
}
