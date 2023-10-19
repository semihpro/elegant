function oddNumbers(l, r) {
    let array = [];
    for (let i = l; i <= r; i++) {
        if (i % 2 != 0)
            array.push(i);
    }
    return array;

}



/*
 * Complete the 'findNumber' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY arr
 *  2. INTEGER k
 */

function findNumber(arr, k) {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === k) {
            return "YES"
        }
    }
    return "NO"

}



