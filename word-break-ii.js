function wordBreak(s, wordDict) {
    const wordSet = new Set(wordDict);
    const memo = new Map();

    function wordBreakHelper(start) {
        if (start === s.length) {
            return [[]];
        }

        if (memo.has(start)) {
…}
