function maximalRectangle(matrix) {
    if (matrix.length === 0) return 0;

    const numRows = matrix.length;
    const numCols = matrix[0].length;
    const heights = Array(numCols).fill(0);
    let maxArea = 0;

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
…                                                                                                                                                                                    
