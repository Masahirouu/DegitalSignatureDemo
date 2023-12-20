import numpy as np

def gcd(p, q):
    while q != 0:
        temp = q
        q = p % q
        p = temp
    return p

def lcm(p, q):
    return (p * q) // gcd(p, q)

def generate_keys(p, q):
    N = p * q
    L = lcm(p - 1, q - 1)
    for i in range(2, L):
        if gcd(i, L) == 1:
            E = i
            break
    for i in range(2, L):
        if (E * i) % L == 1:
            D = i
            break
    print("Public Key: ","e=",E," n=",N)
    print("Private Key: ","d=",D," n=",N)
    # quit()
    return (E, N), (D, N)

def hash_message(message):
    hash_value = 1
    for i in message:
      hash_value *= i
    hash_value %= n
    return hash_value

def pow(base, exponent, modulus):
    result = 1
    for _ in range(exponent):
        result = (result * base) % modulus
    return result



##########################################
### Generating private and public keys ###
##########################################
p = 137 # Prime number
q = 19  # Prime number
publicKey, privateKey = generate_keys(p,q)
e = publicKey[0] #7 5
d = privateKey[0] #823 245
n = p * q  # 7*823=2123 137*19=2603
print("================")
print("p=",p)
print("q=",q)
print("e=",e)
print("d=",d)
print("n=",n)
# quit()

####################################
### Generating digital signature ###
####################################
message = [17,160,218,29,38,74,28]
hash_value = hash_message(message) #268
print("message=", message)
print("hash_value=", hash_value)
signature = pow(hash_value, d, n)
print('signature=',signature) #1241
# quit()

##########################################
### Receiver will verify the signature ###
##########################################
received_message = [17,160,218,29,38,74,28]
received_hash_value = hash_message(received_message) #268

decryped_signature = pow(signature,e,n)
print("Decrypted hash", decryped_signature)
print("================")

if(received_hash_value == decryped_signature):
    print("Verification True: This received message is original.")
else:
    print("Verification False: This received message is modified.")

print("end")
quit()
