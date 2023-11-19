
var minCost = function (n, cuts) {
    cuts.sort((a, b) => a - b); 
    cuts.unshift(0);
    cuts.push(n);
    const memo = {}; 
    return rec(0, cuts.length - 1);
    function rec(start, end) {
        if (start + 1 === end) return 0; 
        const memoKey = `${start}-${end}`;
        if (memo[memoKey] !== undefined) return memo[memoKey];
        let minCost = Infinity; 
        for (let i = start + 1; i < end; i++) { 
            const cost = cuts[end] - cuts[start] + rec(start, i) + rec(i, end);
            minCost = Math.min(minCost, cost);
        }
        memo[memoKey] = minCost; 
        return minCost;
    }
};
                                                                            
                                                                            
