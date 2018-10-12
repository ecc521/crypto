# JavaScript Function Librarys

**Undergoing major changes soon. The plan:**
1. Redisign library to make it easy to use only the parts you want
2. Add a few more features to RSA.js so that RSA is easy to implement - eg. randprime, modinv

## About the Librarys

### lib.js
lib.js is all the librarys here in one big bundle.

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
**Warning: Tucker.Random may return values greater than the maximum. THIS IS A BUG. The rsa.js random number generator does not have this issue, and is MUCH faster (4-160 times quicker depending on input)**
