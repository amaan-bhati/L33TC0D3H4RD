 const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;

    const queue = [];
    queue.push(beginWord);

    let level = 1;

    while (queue.length > 0) {
        const size = queue.length;

        for (let i = 0; i < size; i++) {
            const currentWord = queue.shift();

            if (currentWord === endWord) return level;

            for (let j = 0; j < currentWord.length; j++) {
                for (let k = 97; k <= 122; k++) {
                    const newWord = currentWord.slice(0, j) + String.fromCharCode(k) + currentWord.slice(j + 1);

                    if (wordSet.has(newWord)) {
                        queue.push(newWord);
                        wordSet.delete(newWord);
                    }
                }
            }
        }

        level++;
    }

    return 0;
