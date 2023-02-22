const crypto = require("crypto");


const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;


const sha3_512 = (data) => crypto.createHash("sha3-512").update(data).digest("hex");


exports.deterministicPartitionKey = (event) => {
  // short-circuit empty inputs
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  const givenPartitionKey = event.partitionKey;

  // an explicit partition key is not provided, simply return the hash
  if (!givenPartitionKey) {
    return sha3_512(JSON.stringify(event));
  }

  let candidate = givenPartitionKey;
  // short-circuit empty inputs
  if (!candidate) {
    return TRIVIAL_PARTITION_KEY;
  }
  // avoid re-encoding inputs
  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }
  // given partitionKey is too long, force hash it!
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = sha3_512(candidate);
  }
  return candidate;
};
