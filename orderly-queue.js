function getLexicographicallySmallestString(s, k) {
    let result = '';

    while (k > 0) {
        let smallestChar = s[0];
        let smallestIndex = 0;

        // Find the smallest character within the first k characters
        for (let i = 1; i <= k; i++) {
            if (s[i] < smallestChar) {
…    }

    return result;
}

