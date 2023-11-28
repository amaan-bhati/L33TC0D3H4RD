/**
 * @param {number[][]} nums
  * @return {number[]}
   */

class MinHeapP {
    constructor(comparator = (a, b) => a > b) {
        this.comparator = comparator;
        this.heap = [null]

    };
    size = function () {
        return this.heap.length
    }

    insert = function (val) {
        let heap = this.heap
        heap.push(val);
        let idx = heap.length - 1;
        while (idx > 1) {
            let parent = Math.floor(idx / 2);

            if (this.comparator(heap[parent], heap[idx])) {
                //swap
                [heap[idx], heap[parent]] = [heap[parent], heap[idx]];
                idx = parent;
            } else {
                return;
            }
        }

    }
    remove = function () {
        let heap = this.heap;
        let smallest = heap[1];
        let size = heap.length - 1;
        if (heap.length < 2) {
            return
        }
        heap[1] = heap[heap.length - 1];
        heap.pop();
        size--;

        let idx = 1;
        while (idx < heap.length - 1) {
            let left = 2 * idx;
            let right = 2 * idx + 1;

            if (left <= size && right <= size && (this.comparator(heap[idx], heap[left]) || this.comparator(heap[idx], heap[right]))) {

                if (this.comparator(heap[right], heap[left])) {
                    [heap[left], heap[idx]] = [heap[idx], heap[left]];
                    idx = left;
                } else {
                    [heap[right], heap[idx]] = [heap[idx], heap[right]];
                    idx = right
                }

            } else if (left <= size && right > size && this.comparator(heap[idx], heap[left])) {
                //only left exist
                //swap

                [heap[left], heap[idx]] = [heap[idx], heap[left]];
                idx = left;

            } else {
                // no exist
                break;
            }

        }
        return smallest

    }
    print = function () {
        console.log(this.heap, this.heap.length);
    };


};
class Node {
    constructor(data, row, column) {
        this.data = data;
        this.row = row;
        this.column = column;

    }
}

var smallestRange = function (nums) {

    // minheap to store elements and one min max elementns
    let minHeap = new MinHeapP((a, b) => a.data > b.data);
    let max = -Infinity;
    let ansEnd = Infinity;
    let ansStart = 0;

    // intitialise heap
    for (let i = 0; i < nums.length; i++) {
        //update max
        max = Math.max(max, nums[i][0]);

        let node = new Node(nums[i][0], i, 0)
        minHeap.insert(node);
    }

    //check
    while (minHeap.heap.length) {
        let mini = minHeap.remove();
        // update ans
        if ((max - mini.data) < (ansEnd - ansStart)) {
            ansEnd = max;
            ansStart = mini.data;

        }

        // iterate further
        let row = mini.row;
        let column = mini.column;

        if (column + 1 < nums[row].length) {
            max = Math.max(max, nums[row][column + 1]);

            let node = new Node(nums[row][column + 1], row, column + 1);
            minHeap.insert(node);

        } else {
            // if any column end ie no further element as then range won't form since one list is out of option
            break;
        }



    }

    return [ansStart, ansEnd]
};
