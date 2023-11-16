class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = this.right = null;
    }
}

var recoverFromPreorder = function (traversal) {
    const stack = [];
    let i = 0;

    while (i < traversal.length) {
        let depth = 0;
        while (i < traversal.length && traversal[i] === '-') {
            depth++;
            i++;
        }

        let value = 0;
        while (i < traversal.length && traversal[i] !== '-') {
            value = value * 10 + parseInt(traversal[i]);
            i++;
        }

        const node = new TreeNode(value);

        while (stack.length > depth) {
            stack.pop();
        }

        if (stack.length > 0) {
            if (!stack[stack.length - 1].left) {
                stack[stack.length - 1].left = node;
            } else {
                stack[stack.length - 1].right = node;
            }
        }

        stack.push(node);
    }

    return stack[0];
};

