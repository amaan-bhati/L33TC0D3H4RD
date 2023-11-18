function swimInWater(grid) {
    const n = grid.length;
    const priorityQueue = new PriorityQueue((a, b) => a[2] - b[2]);
    const visited = new Set();
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    priorityQueue.enqueue([0, 0, grid[0][0]]);

    while (!priorityQueue.isEmpty()) {
        const [row, col, time] = priorityQueue.dequeue();
        if (row === n - 1 && col === n - 1) {
            return time;
        }

        visited.add(`${row}-${col}`);

        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;

            if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < n && !visited.has(`${newRow}-${newCol}`)) {
                const newTime = Math.max(time, grid[newRow][newCol]);
                priorityQueue.enqueue([newRow, newCol, newTime]);
            }
        }
    }

    return -1;
}

class PriorityQueue {
    constructor(compareFunction) {
        this.queue = [];
        this.compare = compareFunction || ((a, b) => a - b);
    }

    enqueue(element) {
        this.queue.push(element);
        this.queue.sort(this.compare);
    }

    dequeue() {
        return this.queue.shift();
    }

    isEmpty() {
        return this.queue.length === 0;
    }
}

const param_1 = [
    [0, 2],
    [1, 3]
];
const ret = swimInWater(param_1);
console.log(ret);

