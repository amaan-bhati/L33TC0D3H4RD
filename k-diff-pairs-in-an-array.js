
function findPairs(nums: number[], k: number): number {
    let left = 0, right = 1, pairs = 0;
    nums = nums.sort((a, b) => a - b);

    while (left < right && right < nums.length) {
        if ((nums[right] - nums[left]) < k) {
            right++;
        } else if ((nums[right] - nums[left]) > k) {
            if (right === left + 1) {
                right++;
…                right = left + 1;
            }
        }
    }

    return pairs;
};
