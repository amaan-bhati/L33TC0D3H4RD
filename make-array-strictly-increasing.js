function minOperationsToMakeIncreasing(arr1, arr2) {
    const n = arr1.length;
    const m = arr2.length;

    arr2.sort((a, b) => a - b);

    const dp = new Array(n).fill(null).map(() => new Array(m + 1).fill(Number.MAX_SAFE_INTEGER));

    dp[0][0] = 0;
…            prevMinOps = Math.min(prevMinOps, dp[i - 1][j]);
        }
    }

    const result = Math.min(...dp[n - 1]);

    return result === Number.MAX_SAFE_INTEGER ? -1 : result;
}
