var maxScoreWords = function (words, letters, score) {
    let count = Array(26).fill(0), n = words.length, result = 0;

    for (const char of letters) count[char.charCodeAt() - 97]++;

    outer:
    for (let i = 0; i < 1 << n; i++) {

        let tempCount = Array(26).fill(0), sum = 0;

        for (let j = 0; j < n; j++) {
            if (i & (1 << j)) {
                for (const char of words[j]) tempCount[char.charCodeAt() - 97]++;
            }
        }

        for (let j = 0; j < 26; j++) {
            if (tempCount[j] > count[j]) continue outer;
            sum += tempCount[j] * score[j];
        }

        result = Math.max(result, sum);
    }

    return result;
};
