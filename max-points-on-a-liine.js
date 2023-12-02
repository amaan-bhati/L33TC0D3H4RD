
var maxPoints = function (points) {
    if (points.length === 1) return 1 
    const slopes = {} 
    let maxSet = 0

    for (let i = 0; i < points.length - 1; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const [x1, y1] = points[i]
            const [x2, y2] = points[j]

…        }
    }

    return maxSet
};
