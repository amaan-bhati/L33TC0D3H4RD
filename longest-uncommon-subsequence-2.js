

var findLUSlength = function (strs) {
    let maxLength = -1;
    for (let i = 0; i < strs.length; i++) {
        let isSubsequence = false;
        for (let j = 0; j < strs.length; j++) {
            if (i === j) {
                continue;
            }
            if (isSubseq(strs[i], strs[j])) {
                isSubsequence = true;
                break;
            }
        }
        if (!isSubsequence) {
            maxLength = Math.max(maxLength, strs[i].length);
        }
    }
    return maxLength;
};

function isSubseq(s1, s2) {
    let i = 0;
    for (let j = 0; j < s2.length && i < s1.length; j++) {
        if (s1.charAt(i) === s2.charAt(j)) {
            i++;
        }
    }
    return i === s1.length;
}
