(function() {
    
//This function adds the methods to the passed object
let loader = function(appendto){
      
if (!appendto || typeof appendto !== "object") {
    throw new Error("You must pass an object as parameter number 1. The methods will be added to that object.")
}
    
//In order to greatly improve random() performance, store values in a list 
//These must be private - we can't have the same values used twice
var randlist = crypto.getRandomValues(new Uint32Array(256));
//Picked 256 as it is not that slow on each call, and under 10% less effecient than 16384.
var listcount = 0

appendto.random = function(min,max) {
    //Auxillary functions
    function getnum() {
        //Returns a random 32 bit unsigned integer
        //Check if we have used up all the values
        if (listcount === randlist.length) {
            //Refresh the random values and counter
            randlist = crypto.getRandomValues(randlist)
            listcount = 0
        }
        return randlist[listcount++]
    }
    
    function rand(max) {
        //Returns a value between 0 and max
        //We start at 0, not 1. Add 1 to max
        max += 1
        //To avoid skew, identify the maximum number that we can mod without skew.
        let toss = ((2**32) - (2**32%max))-1
        let val = getnum()
        while (val > toss) {val = getnum()}
        //Since toss%max is equal to max-1, we can mod without skew
        return val%max
    }
    
    min = BigInt(min)
    max = BigInt(max)
    
    if (min>max) {
        //Fancy way to swap variables
        max = [min, min=max][0];
    }
    
    let range = max-min
    
    let gen;
    if (range < 2**32) {
        gen = BigInt(rand(Number(range)))
    }
    else {
        let str = String(range) //This line is a HUGE poriton of the execution time.
        //If anybody can figure out how to eliminate the above line, tell me. It would offer a HUGE performance increase
        let arr = []
        let o = 0
        for (let i = str.length%9;i<=str.length;i+=9) {
            arr.push(Number(str.slice(o,i)))
            o = i
        }

        
        //Array.join() is significantly slower than just adding the strings: http://jsben.ch/FTm6D
        
        function pad(val) {
            val = String(val)           
            return "0".repeat(9-val.length)+val
        }
        
        let output = ""
        //Obey the maximums until a random call returns lower
        let i = 0
        for (i=0;i<arr.length;i++) {
            let res = rand(arr[i])
            output += pad(res)
            if (res < arr[i]) {
                i++
                break;
                //Go to the next loop - otherwise it won't be fully random
            }
        }
        for (;i<arr.length;i++) {
            output += pad(rand(999999999))

        }
        gen = BigInt(output)   
    }
    
    
    return gen+min
    
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
   
if (!self.lib) {self.lib = {}}
else if (typeof self.lib !== "object") {
    self.lib = {}
    console.warn("Overwrite non-object value of self.lib")
}
loader(lib)    
}());
