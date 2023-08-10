/**
 * @param {number[][]} points
 * @return {number}
 */
var maxPoints = function (points) {
    const n = points.length;
    if (n <= 2) {
        return n; // If there are 2 or fewer points, they all lie on the same line.
    }

    let maxPointsOnLine = 0;

    for (let i = 0; i < n; i++) {
        const slopes = new Map(); // Map to store the count of points with each slope.
        let duplicate = 0; // To track duplicate points.
        let currentMax = 0; // To track the maximum number of points on the same line passing through the current point.

        for (let j = 0; j < n; j++) {
            if (i !== j) {
                if (points[i][0] === points[j][0] && points[i][1] === points[j][1]) {
                    duplicate++;
                } else {
                    const deltaX = points[i][0] - points[j][0];
                    const deltaY = points[i][1] - points[j][1];
                    const slope = deltaY === 0 ? 'inf' : deltaY / deltaX;
                    slopes.set(slope, (slopes.get(slope) || 0) + 1);
                    currentMax = Math.max(currentMax, slopes.get(slope));
                }
            }
        }

        maxPointsOnLine = Math.max(maxPointsOnLine, currentMax + duplicate + 1); // +1 for the current point itself.
    }

    return maxPointsOnLine;
};