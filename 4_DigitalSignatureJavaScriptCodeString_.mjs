import crypto from "crypto";

function generateKeys() {
  // Generating Public key and Private key by RSA
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
  });
  // Getting the string value of its public key by export with spki for public key.
  const publicKeyString = publicKey.export({
    type: "spki",
    format: "pem",
  });
  console.log("publicKey=");
  console.log(publicKeyString);

  // Getting the string value of its private key by export with pkcs8 for private key.
  const privateKeyString = privateKey.export({
    type: "pkcs8",
    format: "pem",
  });
  console.log("privateKey=");
  console.log(privateKeyString);

  // console.log("stop0");
  // process.exit();
  return { publicKey, privateKey };
}

function hashMessage(message) {
  // Calculating its hashed value by SHA-256
  let HashedValue = crypto.createHash("sha256").update(message).digest("hex");
  console.log("===========================");
  console.log("HashedValue=");
  console.log(HashedValue);

  console.log("stop0.1");
  // process.exit();
  return HashedValue;
}

function sign(message, privateKey) {
  // Making a signiture of the target message with private_key
  const messageHash = hashMessage(message);
  const signature = crypto.sign(
    null,
    Buffer.from(messageHash, "utf-8"),
    privateKey
  );
  console.log("===========================");
  console.log("messageHash=");
  console.log(messageHash);
  console.log("signature=");
  console.log(signature);
  // console.log("stop0.2");
  // process.exit();
  return signature;
}

function verify(signature, message, publicKey) {
  // Verifying the signature with public_key
  const messageHash = hashMessage(message);

  return crypto.verify(
    null,
    Buffer.from(messageHash, "utf-8"),
    publicKey,
    signature
  );
}

// Generating Public key and Private key
const { publicKey, privateKey } = generateKeys();

// Target Message
const message = "Meet at 3pm on December 10th at Room 999.";
const modifiedMessage = "Meet at 3pm on December 10th at Room 999.";

// Making digital signature
const signature = sign(message, privateKey);

// Verifying the target message with the digital signature
const isVerified = verify(signature, modifiedMessage, publicKey);

console.log("===========================");
console.log("===========================");
console.log("Original Message:", message);
console.log("Received Message:", modifiedMessage);
console.log("Can you verify the message?", isVerified);
console.log("end");
