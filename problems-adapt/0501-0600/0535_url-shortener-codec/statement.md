# URL Shortener Codec

## Description

A URL shortening service maps a long URL to a short alias and back. Build a
codec with no restrictions on its scheme beyond one invariant: any URL encoded
by an object must decode to the original URL through the same object.

Implement the `UrlCodec` class:

- `UrlCodec()` creates an empty codec.
- `String shorten(String longUrl)` returns the tiny URL for `longUrl`.
- `String expand(String shortUrl)` returns the original URL that produced
  `shortUrl`. It is guaranteed that `shortUrl` was returned by this object's
  `shorten`.

For a deterministic answer, the scheme is pinned: each object appends every
encoded URL to its internal list and returns `http://tinyurl.com/` followed by
the URL's 1-based position in that list written in lowercase base-36 digits
(`0`–`9`, then `a`–`z`, no leading zeros). The first encode returns
`http://tinyurl.com/1`, the tenth `http://tinyurl.com/a`, the 36th
`http://tinyurl.com/10`. Encoding the same URL twice spends two positions —
there is no deduplication. Both methods are judged exactly against this scheme.

### Example 1

```text
Input:
["UrlCodec", "shorten", "shorten", "expand"]
[[], ["https://coderpuzzle.example/a"], ["https://coderpuzzle.example/b"], ["http://tinyurl.com/2"]]
Output: [null, "http://tinyurl.com/1", "http://tinyurl.com/2", "https://coderpuzzle.example/b"]
Explanation: The second encoded URL gets position 2, so expanding
"http://tinyurl.com/2" recovers "https://coderpuzzle.example/b".
```

### Constraints

- `1 <= url.length <= 10⁴`
- `url` is a valid URL.
