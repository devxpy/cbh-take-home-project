const crypto = require("crypto");


const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;


const sha3_512 = (data) => crypto.createHash("sha3-512").update(data).digest("hex");


exports.deterministicPartitionKey = (event) => {
  // short-circuit empty inputs
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  let givenPartitionKey = event.partitionKey;

  // an explicit partition key is not provided, simply return the hash
  if (!givenPartitionKey) {
    return sha3_512(JSON.stringify(event));
  }

  // avoid re-encoding inputs
  if (typeof givenPartitionKey !== "string") {
    givenPartitionKey = JSON.stringify(givenPartitionKey);
  }
  // given partitionKey is too long, force hash it!
  if (givenPartitionKey.length > MAX_PARTITION_KEY_LENGTH) {
    givenPartitionKey = sha3_512(givenPartitionKey);
  }
  return givenPartitionKey;
};
