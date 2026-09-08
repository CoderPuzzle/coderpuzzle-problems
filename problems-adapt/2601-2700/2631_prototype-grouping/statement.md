# Prototype Grouping

## Description

Teach JavaScript's array type a new trick: once your code has run, any
array should accept a `groupBy(fn)` call and answer with that array's items
collected under the keys the selector produces.

The selector `fn` is called once per item and returns a string. The result
is a plain object whose keys are those selector outputs and whose value for
each key is the list of items that produced it, kept in the order they
appear in the array. The order of the keys themselves is up to you.

Do not reach for lodash's `_.groupBy` — building the grouping is the point.

**Note (CoderPuzzle):** this problem is offered in JavaScript and TypeScript
only. Your submission declares `class Solution` with the method
`groupBy(bucketCase)`, where `bucketCase` is a bundle-provided `BucketCase`
carrying `.fn`, the callable built from the case's function source, and
`.array`, the array to group. Enhance `Array.prototype` with `groupBy`,
then return the value of invoking
`bucketCase.array.groupBy(bucketCase.fn)`. Each value list keeps its items
in array order; the judged comparison treats the returned object's key
order as irrelevant, matching "any order of keys is acceptable".

### Example 1

```text
Input:
array = [
  {"kind":"apple"},
  {"kind":"pear"},
  {"kind":"apple"},
  {"kind":"plum"},
  {"kind":"pear"}
],
fn = function (item) {
  return item.kind;
}
Output:
{
  "apple": [{"kind": "apple"}, {"kind": "apple"}],
  "pear": [{"kind": "pear"}, {"kind": "pear"}],
  "plum": [{"kind": "plum"}]
}
Explanation:
Output is from array.groupBy(fn).
The selector reads each item's "kind" field. The two apples land in one
bucket, the two pears in another, and the single plum in its own.
```

### Example 2

```text
Input:
array = [
  ["no", "yes"],
  ["a"],
  ["to", "be"],
  ["x"],
  ["up"]
]
fn = function (words) {
  return String(words.length);
}
Output:
{
  "2": [["no", "yes"], ["to", "be"]],
  "1": [["a"], ["x"], ["up"]]
}
Explanation:
Here every item is itself an array, and the key is its length as a string.
The two two-word arrays share a bucket; each one-word array sits in the
other.
```

### Example 3

```text
Input:
array = [3, 8, 5, 12, 7, 4]
fn = function (n) {
  return n % 2 === 0 ? "even" : "odd";
}
Output:
{
  "odd": [3, 5, 7],
  "even": [8, 12, 4]
}
Explanation:
The selector names each number's parity, so odd values and even values
collect into separate buckets.
```

### Constraints

- `0 <= array.length <= 10⁵`
- `fn returns a string`

## Hints

### Hint 1

One plain object is enough to hold every bucket you will need.

### Hint 2

Walk the array front to back — inside the method you attach, `this` is the
array the call was made on.

### Hint 3

The key for each item is `fn(item)`. Create the bucket as an empty array
the first time a key appears, then append the item to it.
