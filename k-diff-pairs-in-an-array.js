    function binarySearch(arr, left, right, target) {
        if (left > right) return Infinity;
        let mid = Math.floor((left + right) / 2);
        if (Math.abs(arr[mid] - target) === k) {
            return arr[mid];
        } else if (Math.abs(arr[mid] - target) > k) {
            return binarySearch(arr, left, mid - 1, target)
        } else {
            return binarySearch(arr, mid + 1, right, target)
        }
    }
    let map = new Map();
    let count = 0;
    nums.sort((a, b) => a - b);
    for (let i = 0; i < nums.length; i++) {
        let x = nums[i];
        let y = binarySearch(nums, i + 1, nums.length - 1, x);
        if (y === Infinity) continue;
        let key = `${x},${y}`;
        if (!map.has(key)) {
            count++;
            map.set(key, true);
        }
    }
    return count;
};
