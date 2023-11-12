var cutOffTree = function (forest) {
    const rows = forest.length;
    const cols = forest[0].length;

    const trees = [];
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (forest[i][j] > 1) {
                trees.push({ row: i, col: j, height: forest[i][j] });
            }
        }
    }

    trees.sort((a, b) => a.height - b.height);

    let totalSteps = 0;
    let start = { row: 0, col: 0 };

    for (let tree of trees) {
        const steps = bfs(start, tree, forest);

        if (steps === -1) {
            return -1;
        }

        totalSteps += steps;
        start = tree;
    }

    return totalSteps;
};

function bfs(start, target, forest) {
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    const rows = forest.length;
    const cols = forest[0].length;

    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    const queue = [{ ...start, steps: 0 }];

    while (queue.length > 0) {
        const current = queue.shift();

        if (current.row === target.row && current.col === target.col) {
            return current.steps;
        }

        for (let dir of directions) {
            const newRow = current.row + dir[0];
            const newCol = current.col + dir[1];

            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && !visited[newRow][newCol] && forest[newRow][newCol] !== 0) {
                visited[newRow][newCol] = true;
                queue.push({ row: newRow, col: newCol, steps: current.steps + 1 });
            }
        }
    }

    return -1;
}
