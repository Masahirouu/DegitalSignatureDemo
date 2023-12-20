export function gcd(p, q) {
  while (q !== 0) {
    let temp = q;
    q = p % q;
    p = temp;
  }
  return p;
}

export function lcm(p, q) {
  return (p * q) / gcd(p, q);
}

export function generateKeys(p, q) {
  let N = p * q;
  let L = lcm(p - 1, q - 1);
  let E, D;

  for (let i = 2; i < L; i++) {
    if (gcd(i, L) === 1) {
      E = i;
      break;
    }
  }

  for (let i = 2; i < L; i++) {
    if ((E * i) % L === 1) {
      D = i;
      break;
    }
  }

  console.log("Public Key: e=", E, " n=", N);
  console.log("Private Key: d=", D, " n=", N);
  return [
    [E, N],
    [D, N],
  ];
}

export function hashMessage(message, n) {
  let hashValue = 1;
  for (let i = 0; i < message.length; i++) {
    hashValue *= message[i];
    hashValue %= n;
  }
  return hashValue;
}

export function customPow(base, exponent, modulus) {
  let result = 1;
  for (let i = 0; i < exponent; i++) {
    result = (result * base) % modulus;
  }
  return result;
}

// Generating private and public keys
let p = 137; // Prime number
let q = 19; // Prime number
let keys = generateKeys(p, q);
let publicKey = keys[0];
let privateKey = keys[1];
let e = publicKey[0]; // e
let d = privateKey[0]; // d
let n = p * q; // n

console.log("================");
console.log("p=", p);
console.log("q=", q);
console.log("e=", e);
console.log("d=", d);
console.log("n=", n);

// Generating digital signature
let message = [17, 160, 218, 29, 38, 74, 28];
let hashValue = hashMessage(message, n); // hash value
console.log("message=", message);
console.log("hash_value=", hashValue);
let signature = customPow(hashValue, d, n);
console.log("signature=", signature);

// Receiver will verify the signature
let receivedMessage = [17, 160, 218, 29, 38, 74, 28];
let receivedHashValue = hashMessage(receivedMessage, n);

let decryptedSignature = customPow(signature, e, n);
console.log("Decrypted hash", decryptedSignature);
console.log("================");

if (receivedHashValue === decryptedSignature) {
  console.log("Verification True: This received message is original.");
} else {
  console.log("Verification False: This received message is modified.");
}

console.log("end");
