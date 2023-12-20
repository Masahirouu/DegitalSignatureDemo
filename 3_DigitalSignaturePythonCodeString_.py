import hashlib
from math import gcd

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
    print("Public Key: ","E=",E," N=",N)
    print("Private Key: ","D=",D," N=",N)
    # quit()
    return (E, N), (D, N)

def hash_message(message):
    '''
    Calculating its hashed value by SHA-256
    '''
    hashedValue=hashlib.sha256(message.encode()).hexdigest()
    print("Hashed value=",hashedValue)
    # quit()
    return hashedValue

def sign(message, private_key):
    '''
    Making a signiture of the target message with private_key
    '''
    D, N = private_key
    message_hash = hash_message(message)
    hash_integers = [ord(char) for char in message_hash]
    print("hash_integers=",hash_integers, " length:",len(hash_integers))
    signature = [pow(i, D, N) for i in hash_integers]
    print('signature=',signature)
    # quit()
    return signature

def verify(signature, message, public_key):
    '''
    Verifying the signature with public_key
    '''
    E, N = public_key
    decrypted_hash = [pow(i, E, N) for i in signature]
    print("=========================================")
    print("Public Key: ","E=",E," N=",N)
    print("decrypted_hash=",decrypted_hash)
    decrypted_message = ''.join(chr(i) for i in decrypted_hash)
    print("decrypted_message=",decrypted_message)
    # quit()
    return decrypted_message == hash_message(message)

# Generating Public key and Private key
public_key, private_key = generate_keys(103, 3259)

# Target Message
message = 'Meet at 3pm on February 10th at Room 999.'
modifiedMessage = 'Meet at 3pm on February 10th at Room 999.'

# Making digital signature
signature = sign(message, private_key)

# Verifying the target message with the digital signature
is_verified = verify(signature, modifiedMessage, public_key)

print("Original Message:", message)
print("Received Message:", modifiedMessage)
print("Can you verify the message?", is_verified)
print('end')
quit()
