function maxSatisfaction(satisfaction) {
    satisfaction.sort((a, b) => b - a);

    let maxSum = 0;
    let currentSum = 0;

    for (const s of satisfaction) {
        currentSum += s;
        if (currentSum > 0) {
            maxSum += currentSum;
        }
    }

    return maxSum;
}

