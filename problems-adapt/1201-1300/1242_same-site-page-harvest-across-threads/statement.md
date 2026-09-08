# Same-Site Page Harvest Across Threads

## Description

Starting from one page, collect every page that lives under the same
hostname — but this time the crawl must actually run in parallel, with
worker threads harvesting different pages at the same time.

Your crawler:

- starts at the page `startUrl`;
- calls `LinkIndex.linksFrom(url)` to read the links listed on a page;
- never harvests the same URL twice, even when two workers discover it
  simultaneously;
- keeps only links whose hostname matches `startUrl`'s hostname.

For simplicity every URL uses the http protocol with no port. The hostname
is the authority part of the URL. Treat a trailing slash as significant —
`"http://news.example.com"` and `"http://news.example.com/"` are different
URLs.

![diagram](figures/1242-1.svg)

The `LinkIndex` interface is defined as such:

```text
interface LinkIndex {
  // Return a list of all urls listed on the page of the given url.
  public List<String> linksFrom(String url);
}
```

A test case is described by three variables — `urls`, `edges`, and
`startUrl` — but your code only ever receives `startUrl` (wrapped with the
`LinkIndex`); the graph itself is hidden behind the interface.

Implement `harvestSite(startUrl, linkIndex)` so the harvest is performed
concurrently by multiple threads, and return every harvested URL in any
order.

**Note (CoderPuzzle):** the judge builds the page graph described by `urls` and
`edges` (an edge `[i, j]` means page `urls[i]` lists `urls[j]`), hands your
method a thread-safe `LinkIndex` over it, and compares the set of URLs you
return against the expected set, order-insensitively.

### Example 1

![diagram](figures/1242-2.svg)

```text
Input:
urls = [
  "http://news.yahoo.com",
  "http://news.yahoo.com/news",
  "http://news.yahoo.com/news/topics/",
  "http://news.google.com",
  "http://news.yahoo.com/us"
]
edges = [[2,0],[2,1],[3,2],[3,1],[0,4]]
startUrl = "http://news.yahoo.com/news/topics/"
Output: ["http://news.yahoo.com","http://news.yahoo.com/news","http://news.yahoo.com/news/topics/","http://news.yahoo.com/us"]
```

### Example 2

![diagram](figures/1242-3.svg)

```text
Input:
urls = [
  "http://news.yahoo.com",
  "http://news.yahoo.com/news",
  "http://news.yahoo.com/news/topics/",
  "http://news.google.com"
]
edges = [[0,2],[2,1],[3,2],[3,1],[3,0]]
startUrl = "http://news.google.com"
Output: ["http://news.google.com"]
```

### Constraints

- `1 <= urls.length <= 1000`
- `1 <= urls[i].length <= 300`
- `startUrl` is one of the `urls`.
- Any two URLs that share a hostname are under that same hostname.

## Hints

### Hint 1

A shared work queue plus a shared visited set parallelizes the crawl —
the hard part is that both structures are now touched by many threads.

### Hint 2

Every access to the visited set must be atomic with respect to the check
and the insert, or two workers will both expand the same page.
