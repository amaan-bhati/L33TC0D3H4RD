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

        // Calculate the maximum path sum for the left and right subtrees
        const leftSum = Math.max(maxPathSumHelper(node.left), 0);
        const rightSum = Math.max(maxPathSumHelper(node.right), 0);

        // Update the maximum path sum considering the current node
        const currentPathSum = node.val + leftSum + rightSum;
        maxSum = Math.max(maxSum, currentPathSum);

        // Return the maximum path sum achievable starting from the current node
        return node.val + Math.max(leftSum, rightSum);
    }

    maxPathSumHelper(root);
    return maxSum;
};

