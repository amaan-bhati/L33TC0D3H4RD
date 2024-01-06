var largestRectangleArea = function (heights) {
    let leftStack = [];
    let stack = [];

    for (let i = 0; i < heights.length; i++) {
        while (stack.length !== 0 && heights[stack[stack.length - 1]] >= heights[i]) {
            stack.pop();
        }

   for (let i = 0; i < heights.length; i++) {
        area = (rightStack[heights.length - i - 1] - leftStack[i] - 1) * heights[i];
        max = Math.max(area, max);
    }
    return max;
};
