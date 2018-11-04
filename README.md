# JavaScript Function Librarys

## About the Librarys

### random.js
- High performance cryptographically secure random number generation
- Uses crypto.getRandomValues()
- Always returns a BigInt
- Does not throw if min > max

Call using lib.random(min, max) 


### indexeddb.js
- localStorage in indexedDB






## The following are currently undergoing major changes

#### rsa.js
rsa.js is a function library for anything related to RSA. Examples include:
- Modular Exponentation
- Cryptographically Secure Random Number Generation
- Miller-Rabin Test
- Fermat Test
- Trial Factoring
- Modular Inverse (Not added Yet)
- Safe Prime Tester (Not added Yet)
- Strong Prime Tester (Not added Yet)
- RSA Prime Generator (Not added Yet)

All rsa.js functions return BigInt's if applicable



#### tucker.js
*tucker.js is being shut down. Do not start using it.*
**Warning: Tucker.Random may return values greater than the maximum. THIS IS A BUG. random.js does not have this issue, and is MUCH faster (4-160 times quicker depending on input)**
