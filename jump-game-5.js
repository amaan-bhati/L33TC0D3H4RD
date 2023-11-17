function maxJumps(arr, d) {
    const n = arr.length;
    const dp = new Array(n).fill(1);

    const getMaxJumps = (i) => {
        if (dp[i] !== 1) {
            return dp[i];
        }

        let max = 1;

        for (let x = 1; x <= d && i + x < n && arr[i + x] < arr[i]; x++) {
            max = Math.max(max, 1 + getMaxJumps(i + x));
        }

        for (let x = 1; x <= d && i - x >= 0 && arr[i - x] < arr[i]; x++) {
            max = Math.max(max, 1 + getMaxJumps(i - x));
        }

        dp[i] = max;
        return max;
    };

    for (let i = 0; i < n; i++) {
        getMaxJumps(i);
    }

    return Math.max(...dp);
}

