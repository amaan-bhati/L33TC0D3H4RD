
const makeLargestSpecial = (s, r = []) => {
   
    if (s.length < 2) {
        return s
    }
    let start = 0
    // set count for recode `1`
    let count = 0

    for (let i = 0; i < s.length; i++) {
        count += s[i] === '1' ? 1 : -1

        // find a special string if count is `0`
        if (!count) {
            // search special string by recursive
            const special = makeLargestSpecial(s.substring(start + 1, i))

            // fill in the first and last `1` and `0`
            r.push('1' + special + '0')

            // set start as next
            start = i + 1
        }
    }

    // sorting method for string comparison
    r.sort((a, b) => {
        if (a === b) {
            return 0
        }

        // for get first
        let i = 0

        while (a[i] && b[i] && a[i] === b[i]) {
            i++
        }

        if (a[i + 1] && !b[i + 1]) {
            return -1
        }
        if (!a[i + 1] && b[i + 1]) {
            return 1
        }

        return b[i] - a[i]
    })

    return r.join('')
};
