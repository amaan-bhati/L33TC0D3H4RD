var findCriticalAndPseudoCriticalEdges = function (n, edges) {
    let indexedEdges = edges.map((edge, index) => [...edge, index]);
    indexedEdges.sort((a, b) => a[2] - b[2]);
    const find = (disjointSet, x) => {
        if (disjointSet[x] !== x) {
            disjointSet[x] = find(disjointSet, disjointSet[x]);
        }
        return disjointSet[x];
    }
    const calculateMST = (n, indexedEdges, ignoreEdgeIndex, preselectEdgeIndex) => {
        let disjointSet = Array(n).fill(0).map((_, index) => index);
        let weight = 0;
        let count = 0;
        if (preselectEdgeIndex !== null) {
            let [u, v, w] = indexedEdges[preselectEdgeIndex];
            disjointSet[find(disjointSet, u)] = find(disjointSet, v);
            weight += w;
            count++;
        }
        for (let i = 0; i < indexedEdges.length; i++) {
            if (i === ignoreEdgeIndex) continue;
            let [u, v, w] = indexedEdges[i];
            if (find(disjointSet, u) !== find(disjointSet, v)) {
                disjointSet[find(disjointSet, u)] = find(disjointSet, v);
                weight += w;
                count++;
            }
        }
        if (count === n - 1) {
            return weight;
        } else {
            return Infinity;
        }
    }
    let mstWeight = calculateMST(n, indexedEdges, null, null);

    let criticalEdges = [];
    let pseudoCriticalEdges = [];
    for (let i = 0; i < indexedEdges.length; i++) {

        if (calculateMST(n, indexedEdges, i, null) > mstWeight) {
            criticalEdges.push(indexedEdges[i][3]);
        } else if (calculateMST(n, indexedEdges, null, i) === mstWeight) {
            pseudoCriticalEdges.push(indexedEdges[i][3]);
        }
    }

    return [criticalEdges, pseudoCriticalEdges];
};
