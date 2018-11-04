//Not finished
//Currently only has modpow

(function() {
    
//This function adds the methods to the passed object
let loader = function(appendto){
    
appendto.modpow = function(num, expo, mod) {
    //Computes (num**expo)%mod somewhat effeciently
    num = BigInt(num)
    expo = BigInt(expo)
    mod = BigInt(mod)
    var res = 1n;

    num = num%mod
    while (expo > 0) {
    if (expo%2n == 1n) {
    res = res*num
    res = res%mod
    }
    expo = expo >> 1n
    num = num*num
    num = num%mod
    }
    return res
}
  
  
  
  
  
               
    //Library cloning function
    if (!appendto._duplist) {
        appendto._duplist = []
    }
    //Add the loading function
    appendto._duplist.push(loader)
    //If the user wants to duplicate the library, they call this.
    //It creates a new object, then calls the method creators on them
    appendto.duplicate = function() {
        var obj = {}
        for (let i = 0;i<appendto._duplist.length;i++) {
            appendto._duplist[i](obj)
        }
        return obj;
    }   
};
   
   
if (!window.lib) {window.lib = {}}
else if (typeof window.lib !== "object") {
    window.lib = {}
    console.warn("Overwrote non-object value of window.lib")
}
loader(lib)    
}());
