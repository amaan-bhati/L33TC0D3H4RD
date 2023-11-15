function shortestPalindrome(s) {
    if (s.length <= 1) {
        return s;
    }

    const reversed = s.split('').reverse().join('');
    const combined = s + '#' + reversed;
    const prefixArray = new Array(combined.length).fill(0);

    for (let i = 1, j = 0; i < combined.length;) {
        if (combined[i] === combined[j]) {
            prefixArray[i] = j + 1;
            i++;
            j++;
        } else {
            if (j !== 0) {
                j = prefixArray[j - 1];
            } else {
                prefixArray[i] = 0;
                i++;
            }
        }
    }

    const prefixLength = prefixArray[combined.length - 1];
    const suffix = s.substring(prefixLength).split('').reverse().join('');
    return suffix + s;
}
