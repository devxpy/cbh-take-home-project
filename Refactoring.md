# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

- I refactored the crypto hash computation as a separate function so there's no duplicated code.
- Replaced the multiple nested `if`-conditions with short circuits instead. This separates the edge cases from the regular cases, and makes reasoning about the execution flow easier.
- Moved the `const`s outside the function body. This makes it easier to change them in the future and reuse them across different functions.
- Refactored the object accessor `event.partitionKey` into a variable so that changing the key `"partitionKey"` is easier in the future.
- Added comments as necessary


### Tests:

```
$ npm test

> cbh-take-home-project@1.0.0 test
> jest

 PASS  ./dpk.test.js
  deterministicPartitionKey
    ✓ Returns the literal '0' when given no input (3 ms)
    ✓ Returns the literal '0' when given undefined
    ✓ Returns the literal '0' when given empty str
    ✓ Returns the literal '0' when given null
    ✓ Returns the given partitionKey as-is (1 ms)
    ✓ Returns the given partitionKey as a JSON-stringified object (1 ms)
    ✓ If the given partitionKey is too long, re-hashes it (1 ms)
    ✓ If the given partitionKey is null, returns the hex digest of the string `null` (6 ms)
    ✓ Returns the computed partition key as a hex digest from a string (2 ms)
    ✓ Returns the computed partition key as a hex digest from an object (1 ms)

Test Suites: 1 passed, 1 total
Tests:       10 passed, 10 total
Snapshots:   0 total
Time:        0.471 s, estimated 1 s
Ran all test suites.
```