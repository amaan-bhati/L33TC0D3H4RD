/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumGap = function(nums) {
       if (nums.length < 2) {
        return 0;
    }

    const n = nums.length;
    const minNum = Math.min(...nums);
    const maxNum = Math.max(...nums);
    
    // Calculate the minimum possible gap based on the range of values
    const minGap = Math.ceil((maxNum - minNum) / (n - 1));
    
    // Create buckets to store min and max values in each bucket
    const bucketMin = new Array(n - 1).fill(Infinity);
    const bucketMax = new Array(n - 1).fill(-Infinity);

    // Distribute the numbers into buckets
    for (const num of nums) {
        if (num === minNum || num === maxNum) {
            continue;
        }
        const index = Math.floor((num - minNum) / minGap);
        bucketMin[index] = Math.min(bucketMin[index], num);
        bucketMax[index] = Math.max(bucketMax[index], num);
    }

    // Calculate the maximum gap
    let prevMax = minNum;
    let maxGap = 0;
    
    for (let i = 0; i < n - 1; i++) {
        if (bucketMin[i] === Infinity && bucketMax[i] === -Infinity) {
            continue;
        }
        maxGap = Math.max(maxGap, bucketMin[i] - prevMax);
        prevMax = bucketMax[i];
    }
    
    maxGap = Math.max(maxGap, maxNum - prevMax);
    
    return maxGap;
};
