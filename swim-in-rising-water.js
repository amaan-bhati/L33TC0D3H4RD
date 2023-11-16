var swimInWater = function (grid) {
    const n = grid.length;
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

    // Helper function to perform DFS and check if it's possible to reach the destination with the given time
    const canReachDestination = (time) => {
        const visited = new Array(n).fill(0).map(() => new Array(n).fill(false));
        const stack = [[0, 0]]; // Start from the top-left corner

        while (stack.length > 0) {
            const [x, y] = stack.pop();

            if (x === n - 1 && y === n - 1) {
                return true; // Reached the destination
            }

            visited[x][y] = true;

            for (const [dx, dy] of directions) {
                const nx = x + dx;
                const ny = y + dy;

                if (
                    nx >= 0 && nx < n &&
                    ny >= 0 && ny < n &&
                    !visited[nx][ny] &&
                    grid[nx][ny] <= time
                ) {
                    stack.push([nx, ny]);
                }
            }
        }

        return false; // Cannot reach the destination
    };

    // Binary search to find the minimum time required to reach the destination
    let left = 0;
    let right = n * n - 1;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);

        if (canReachDestination(mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    return left;
};
