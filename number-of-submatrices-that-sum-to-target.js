var numSubmatrixSumTarget = function (matrix, target) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    let count = 0;
    for (let row = 0; row < rows; row++) {
        for (let col = 1; col < cols; col++) {
            matrix[row][col] += matrix[row][col - 1];
        }
    }

    for (let col1 = 0; col1 < cols; col1++) {
        for (let col2 = col1; col2 < cols; col2++) {
            const prefixSumMap = new Map();
            prefixSumMap.set(0, 1);
            let currentSum = 0;

            for (let row = 0; row < rows; row++) {
                const sum = matrix[row][col2] - (col1 > 0 ? matrix[row][col1 - 1] : 0);
                currentSum += sum;

                if (prefixSumMap.has(currentSum - target)) {
                    count += prefixSumMap.get(currentSum - target);
                }

                prefixSumMap.set(currentSum, (prefixSumMap.get(currentSum) || 0) + 1);
            }
        }
    }

    return count;
};

