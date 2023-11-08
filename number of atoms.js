function countOfAtoms(formula) {
    const stack = [];
    const counts = new Map();
    let i = 0;

    function parseNumber() {
        let num = 0;
        while (i < formula.length && /^\d$/.test(formula[i])) {
            num = num * 10 + parseInt(formula[i]);
            i++;
…
