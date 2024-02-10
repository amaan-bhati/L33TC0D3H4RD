var splitArray = function (nums, k) {
    let n = nums.length;
    let low = Math.max(...nums)
    let high = nums.reduce((acc, curr) => {
        return acc + curr
    }, 0)
    while (low <= high) {
        let mid = Math.floor((low + high) / 2)
        let sum = LargestSum(nums, mid)
        if (sum > k) {
            low = mid + 1
        }
        else {
            high = mid - 1
        }
    }
    return low
};
const LargestSum = (nums, mid) => {
    let n = nums.length;
    let count = 1;
    let array = 0;
    for (let i = 0; i < n; i++) {
        if (array + nums[i] <= mid) {
            array += nums[i]
        }
        else {
            count++;
            array = nums[i]
        }
    }
    return count
}
