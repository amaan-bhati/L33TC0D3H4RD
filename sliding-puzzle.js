function slidingPuzzle(board) {
    const target = '123450';
    const start = board.flat().join('');
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const visited = new Set();

    const isValid = (state) => {
        return state === target;
    };

    const getNeighbors = (state) => {
        const neighbors = [];
        const zeroIndex = state.indexOf('0');
        const zeroRow = Math.floor(zeroIndex / 3);
        const zeroCol = zeroIndex % 3;

        for (const [dr, dc] of directions) {
            const newRow = zeroRow + dr;
            const newCol = zeroCol + dc;

            if (newRow >= 0 && newRow < 2 && newCol >= 0 && newCol < 3) {
                const newZeroIndex = newRow * 3 + newCol;
                const newState = swap(state, zeroIndex, newZeroIndex);
                neighbors.push(newState);
            }
        }

        return neighbors;
    };

    const swap = (state, i, j) => {
        const stateArray = state.split('');
        [stateArray[i], stateArray[j]] = [stateArray[j], stateArray[i]];
        return stateArray.join('');
    };

    const bfs = () => {
        const queue = [start];
        let moves = 0;

        while (queue.length > 0) {
            const size = queue.length;

            for (let i = 0; i < size; i++) {
                const current = queue.shift();

                if (isValid(current)) {
                    return moves;
                }

                if (visited.has(current)) {
                    continue;
                }

                visited.add(current);

                const neighbors = getNeighbors(current);
                queue.push(...neighbors);
            }

            moves++;
        }

        return -1;
    };

    return bfs();
}

