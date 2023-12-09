const orderlyQueue = function (s, k) {
    if (k > 1) return s.split("").sort().join("");
    let res = s;
    const n = s.length;

    for (let i = 0; i < n; i++) {
        s = s.slice(1) + s[0];
        res = res.localeCompare(s) < 0 ? res : s;
    }

    return res;
};
