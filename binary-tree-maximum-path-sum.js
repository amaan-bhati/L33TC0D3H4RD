class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = this.right = null;
    }
}

var maxPathSum = function (root) {
    let maxSum = Number.MIN_SAFE_INTEGER;

    function maxPathSumHelper(node) {
        if (node === null) {
            return 0;
        }

        const leftSum = Math.max(maxPathSumHelper(node.left), 0);
        const rightSum = Math.max(maxPathSumHelper(node.right), 0);

        const currentPathSum = node.val + leftSum + rightSum;
        maxSum = Math.max(maxSum, currentPathSum);
        return node.val + Math.max(leftSum, rightSum);
    }

    maxPathSumHelper(root);
    return maxSum;
};

