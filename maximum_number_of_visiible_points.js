/**
 * @param {number[][]} points
  * @param {number} angle
   * @param {number[]} location
    * @return {number}
     */
var visiblePoints = function (points, angle, location) {
    let arr = [], extra = 0
    let [xx, yy] = location

    for (let [x, y] of points) {
        if (x == xx && y == yy) {
            extra += 1
            continue
        }
        arr.push(Math.atan2(y - yy, x - xx))
    }

    arr.sort((a, b) => a - b)
    arr = arr.concat(arr.map(x => x + 2.0 * Math.PI))
    angle = Math.PI * angle / 180

    let l = ans = 0
    for (let r = 0; r < arr.length; r++) {
        while (arr[r] - arr[l] > angle) {
            l += 1
        }
        ans = Math.max(ans, r - l + 1)
    }

    return ans + extra
}
