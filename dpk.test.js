const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the literal '0' when given undefined", () => {
    const key = deterministicPartitionKey(undefined);
    expect(key).toBe("0");
  });

  it("Returns the literal '0' when given empty str", () => {
    const key = deterministicPartitionKey("");
    expect(key).toBe("0");
  });

  it("Returns the literal '0' when given null", () => {
    const key = deterministicPartitionKey(null);
    expect(key).toBe("0");
  });

  it("Returns the given partitionKey as-is", () => {
    const key = deterministicPartitionKey({partitionKey: "SomeHexDigest1234"});
    expect(key).toBe("SomeHexDigest1234");
  });

  it("Returns the given partitionKey as a JSON-stringified object", () => {
    const key = deterministicPartitionKey({partitionKey: {theKey: "SomeHexDigest1234"}});
    expect(key).toBe(`{"theKey":"SomeHexDigest1234"}`);
  });

  it("If the given partitionKey is too long, re-hashes it", () => {
    const key = deterministicPartitionKey({partitionKey: "SomeHexDigest1234".repeat(50)});
    expect(key).toBe("172e7c41b652bf7a59d2cf421793e78305db30f38e5f572a1459d0f87af72957a24c5ed5f35682cc05ec2b53a48cf51bc082530b62df2c36a59ad4adb819fc99");
  });

  it("If the given partitionKey is null, returns the hex digest of the string `null`", () => {
    const key = deterministicPartitionKey({partitionKey: null});
    expect(key).toBe("58540d4d440df8c6c6da0d79cfce715bc92953c6cde8be9f749790004ef2d5a7322d0fd5170eac9a37d57ee0cc975cfca068a60b01622529d9e0fd657f71b8e2");
  });

  it("Returns the computed partition key as a hex digest from a string", () => {
    const key = deterministicPartitionKey("Hello, World!");
    expect(key).toBe("5240ef3a83697791f3250e0ac26aa1ca87702a0e75d9f38f1fc9df31db409fce8e9fbbe54d613d6391d8902c51a995b06c03117103423010fffafc10a3cb1a5d");
  });

  it("Returns the computed partition key as a hex digest from an object", () => {
    const key = deterministicPartitionKey({foo: "bar"});
    expect(key).toBe("a419a15de4a65c3dba49c38b4485cd4dce1dde4d18f5b965d90f0649bef54252ec4e76dbcaa603708e8e8ebbe848ba484e81e23b7823808b5b8e5f4222d122e8");
  });
});
