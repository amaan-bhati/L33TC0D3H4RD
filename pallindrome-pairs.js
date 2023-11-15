class TrieNode {
    constructor() {
        this.children = new Map();
        this.index = -1;
        this.palindromeIndices = [];
    }
}

function isPalindrome(str, start, end) {
    while (start < end) {
        if (str[start] !== str[end]) {
            return false;
        }
        start++;
        end--;
    }
    return true;
}

function addWordToTrie(root, word, index) {
    let node = root;
    for (let i = word.length - 1; i >= 0; i--) {
        const char = word[i];
        if (!node.children.has(char)) {
            node.children.set(char, new TrieNode());
        }
        if (isPalindrome(word, 0, i)) {
            node.palindromeIndices.push(index);
        }
        node = node.children.get(char);
    }
    node.index = index;
    node.palindromeIndices.push(index);
}

function searchPalindromePairs(words) {
    const result = [];

    // Build Trie
    const root = new TrieNode();
    for (let i = 0; i < words.length; i++) {
        addWordToTrie(root, words[i], i);
    }

    // Search for Palindrome Pairs
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        let node = root;

        for (let j = 0; j < word.length; j++) {
            if (node.index !== -1 && node.index !== i && isPalindrome(word, j, word.length - 1)) {
                result.push([i, node.index]);
            }

            node = node.children.get(word[j]);
            if (!node) {
                break;
            }
        }

        if (!node) {
            continue;
        }

        for (const index of node.palindromeIndices) {
            if (index !== i) {
                result.push([i, index]);
            }
        }
    }

    return result;
}
