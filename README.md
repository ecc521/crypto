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
If you are currently using tucker.js, please note that it is not receiving some **HUGE** performance improvements going into rsa.js
(Tucker.random() is receiving a performance improvement of 30-160 times for ranges under 2^32. Larger numbers not tested yet.)
