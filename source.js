//Tucker.js JavaScript Function Library
//Copyright (©) 2018 Tucker Willenborg
//License is located at ecc521.github.io/crypto/license.txt


Tucker = window.Tucker || {};

Tucker = function () {

function IsSafeInteger(Num) {
    if (Num <= 9007199254740992 && Num >= -9007199254740992) {
            return true;
        }
        else {
          return false;  
        }
}
    
function ModPow(Num, Expo, Mod) {
var ReturnAsNumber = 0
if (typeof(Num) === "number" && typeof(Expo) === "number" && typeof(Mod) === "number" && Tucker.IsSafeInteger(Num) && Tucker.IsSafeInteger(Expo) && Tucker.IsSafeInteger(Mod)) {
        ReturnAsNumber = 1
}
Num = BigInt(Num)
Expo = BigInt(Expo)
Mod = BigInt(Mod)
var res = 1n;

Num = Num%Mod
while (Expo > 0) {
if (Expo%2n == 1n) {
res = res*Num
res = res%Mod
}
Expo = Expo >> 1n
Num = Num*Num
Num = Num%Mod
}

if(ReturnAsNumber === 1) {
    return Number(res)
}
return res
}

function CreateURL(Stuff) {
  return (URL.createObjectURL(new Blob([Stuff])));
}
    
function CreateWorker(scriptname) {
  //Depreciated. Removal August 15th?
  return new Worker(Tucker.CreateURL('('+scriptname+')()'))
}  

function Random(Min, Max) {
    function SmallNum() {
    var array = new Uint32Array(1);
    array = self.crypto.getRandomValues(array);
    while (array[0] > 3999999999) {
    array = self.crypto.getRandomValues(array);        
    }
    var output = String(array[0])
    while (output.length < 10) {
        output = "0" + output
    }
    output = output.slice(1)
    return output
    }
    
    function SliceToDigits(Number, Digits) {
        return Number.slice(-Digits)
    }
    
    function SmallRandom(Max) {
    var Digits = (String(Max)).length
    var Number = SliceToDigits(SmallNum(), Digits)
    while (Number > Max) {
    Number = SliceToDigits(SmallNum(), Digits)        
    }
    return Number
    }
    
    var ReturnAsNumber = 0;
    if (typeof(Min) === "number" && typeof(Max) === "number" && Tucker.IsSafeInteger(Min) && Tucker.IsSafeInteger(Max)) {
        ReturnAsNumber = 1
    }
    Min = BigInt(Min)
    Max = BigInt(Max)
    if (Min > Max) {
        var Placeholder = Max
        Max = Min
        Min = Placeholder
    }
    
    var Range = Max - Min
    
    var Digits = (String(Range)).length
    var repeats = Math.floor(Digits/9)
    var number = [];
    for (i = 0; i < repeats; i++) {
        number = SmallNum() + number
    }
    var EndRange = String(Range).slice(0, (Digits - (repeats*9)))
    number = SmallRandom(EndRange) + number
    number = BigInt(number)
    number = number + Min
    if (ReturnAsNumber === 1) {
    return Number(number)
    }
    else {
        return number
    }
}

    function FermatTest(Number, Base) {
        if (Number < 2) {
            return false
        }
        Number = BigInt(Number)
        if (Base === undefined) {
            Base = Tucker.Random(2n, (Number-2n))
            while (Base%Number === 0n) {
                Base = Tucker.Random(2n, (Number-2n))
            }
        }
        Base = BigInt(Base)
        if (Tucker.ModPow(Base, (Number-1n), Number) === 1n) {
            return true
        }
        else {
            return false
        }    
    }
    
    function MillerRabin(Number, Base) {
    Number = BigInt(Number)
    if (Number <= 1n || Number === 4n) {
    return false
    }
    if (Number < 4n) {
    return true
    }
        if (Base === undefined) {
            Base = Tucker.Random(2n, (Number-2n))
            while (Base%Number === 0n) {
                Base = Tucker.Random(2n, (Number-2n))
            }
        }
        Base = BigInt(Base)
        var Value = Number - 1n
        while (Value%2n === 0n) {
        Value = Value/2n
        }
        var Result = ModPow(Base, Value, Number)
        if (Result === 1n || Result === (Number-1n)) {
            return true;
        }
        
        while (Value !== Number-1n) {
        Result = (Result*Result) % Number
        Value = Value*2n
        if (Result === 1n) {
        return false
        }
        if (Result === (Number-1n)) {
        return true
        }
        }
  
        return false    
    }
    
    function TrialFactor(number, End, Start) {
        if (number == 1) {
            return false
        }
        if (number <= 10000) {
            var c = Math.ceil(Math.sqrt(Number(number)))
            number = Number(number)
            for (var i=2; i<=c; i++) {
                if (number%i === 0) {
                    if (i !== number) {
                        return false
                    }
                    else {
                        return true
                    }
                }
            }
        }
        
        End = BigInt(End)
        if (End > Math.sqrt(Number(number))) {
            var NewEnd = Math.floor(Math.sqrt(Number(number)*1.01))
        if (NewEnd < End) {
            End = NewEnd
        }
        }
        number = BigInt(number)
        if (Start === undefined) {
            Start = 2
        }
        Start = BigInt(Start)
        if (Start%2n === 0n) {
            if (number%Start === 0n) {
                return false
            }
        Start = Start + 1n
        }
        while (Start <= End && Start%3n !== 0n) {
            if (number%Start === 0n) {
                return false
            }
            Start = Start+2n
        }
        Start = Start + 2n
        if (number%Start === 0n) {
                return false
        }
        while (Start <= End) {
            Start = Start + 2n
        if (number%Start === 0n) {
                return false
            }            
            Start = Start + 4n
        if (number%Start === 0n) {
                return false
            }
        }
        return true;
    }
    
function LoadStorage() {
dbName = "Tucker.js Storage";
var request = indexedDB.open(dbName, 1);
request.onupgradeneeded = function(event) {
  var db = event.target.result;
  var objectStore = db.createObjectStore("Data", { keyPath: "Name" });
};
}

async function addItem(Name, Value) {
var customerData = [
  { Name: Name, Value: undefined }
];
    
var request = indexedDB.open(dbName, 1);
request.onsuccess = function(event) {
  db = event.target.result;
    var customerObjectStore = db.transaction("Data", "readwrite").objectStore("Data");
    customerData.forEach(function(customer) {
      customerObjectStore.add(customer);
    });
    customerObjectStore.succsess = function() {
    return 1;
    }
};
}

   
    
    
async function deleteItem(Name) {  
dbName = "Tucker.js Storage";
var request = indexedDB.open(dbName, 1);
request.onsuccess = function(event) {
  db = event.target.result;
var request = db.transaction(["Data"], "readwrite").objectStore("Data").delete(Name);
request.onsuccess = function(event) {
    return 1;
};
};
}
    
    
async function getItem(Name) {  
dbName = "Tucker.js Storage";
return new Promise((resolve, reject) => {
var request = indexedDB.open(dbName, 1);
request.onsuccess = function(event) {
  db = event.target.result;
var transaction = db.transaction(["Data"]);
var objectStore = transaction.objectStore("Data");
var request = objectStore.get(Name);
request.onsuccess = function(event) {
  try {
  var a = request.result.Value
  resolve(request.result.Value)
  }
  catch (e) {
      reject(new Error(e))
  }
};
};
})
}
        
    
async function setItem(Name, Value) {
dbName = "Tucker.js Storage";
return new Promise((resolve, reject) => {
var request = indexedDB.open(dbName, 1);
request.onsuccess = function(event) {
  db = event.target.result;
var objectStore = db.transaction(["Data"], "readwrite").objectStore("Data");
var request = objectStore.get(Name);
request.onsuccess = function(event) {
  var data = event.target.result;
  try {
  data.Value = Value;

  var requestUpdate = objectStore.put(data);
   requestUpdate.onsuccess = function(event) {
      resolve()
   };
   requestUpdate.onerror = function(event) {
       reject((event.srcElement.error))
   }
      
        }
  catch (e) {
      (async function AddVal() {
      await addItem(Name, Value)
      var promise = setItem(Name, Value)
      promise.then(resolve(promise))
      promise.catch(reject(promise))
      }())
          
  }
};    
}
})
}
    
function LuhnCheck(Num) {
Value = String(Num)
Value = Value.split("")
if (Value.length%2 === 0) {
    var Start = 0
}
else {
    var Start = 1
}
for (Start; Start<Value.length; Start = Start+2) {
    Num = Value[Start]
    Num = Num*2
    Num = String(Num)
    if (Num.length === 2) {
        Num = Number(Num[0]) + Number(Num[1])
    }
    Value[Start] = Number(Num)
}

Num = 0
Value = Value.join("")
for (Start = 0; Start < Value.length; Start++) {
Num = Num + Number(Value[Start])
}
if (Num%10 === 0) {
    return true;
}
else {
  return false; 
}
}
    
function ObjectToString(o){var n=[];if(null==o)return String(o);if("object"==typeof o&&null==o.join){for(prop in o)o.hasOwnProperty(prop)&&n.push(prop+": "+ObjectToString(o[prop]));return"{"+n.join(",")+"}"}if("object"==typeof o&&null!=o.join){for(prop in o)n.push(ObjectToString(o[prop]));return"["+n.join(",")+"]"}return"function"==typeof o?n.push(o.toString()):n.push(JSON.stringify(o)),n.join(",")}
    

    
async function EasyWorker() {  
// Other arguments (for the function EasyWorker executes) passed after text
return new Promise((resolve, reject) => { 
    
var CodeName = undefined
//Optional CodeName argument.
//CodeName must be a string, and must not be a valid number. Ex. Name123 is valid. 123 is not.
if ((Number(arguments[0]) === NaN || !(Number(arguments[0]) > 0)) && (arguments[0].indexOf("function") === -1)) {
    CodeName = arguments[0]
    for (var ii=1; ii<arguments.length; ii++) {
        arguments[ii-1] = arguments[ii]
    }
}

//Optional Terminate argument. Lets handle it.
var text;
var StartArg = 1;
if (Number(arguments[0]) === NaN || !(Number(arguments[0]) > 0)) {
    text = arguments[0]
}
else {
    text = arguments[1]
    StartArg = 2
}
    
    
//Handle functions passed
if (typeof(text) === "function") {
    text = String(text)
}
    
    
var Start = "("
for (i=StartArg;i<arguments.length;i++) {
    Start += (arguments[i])
    
    if (typeof(arguments[i]) === "bigint") {
        Start += "n"
    }
    
    Start += ","
}
if (arguments.length > StartArg) {
Start = Start.slice(0, -1)//Eliminate trailing comma - BUT ONLY IF THERE IS ONE
}

text = "/*The code below is a major part of the Tucker.js Library. It is licensed under the same license as Tucker.js (sites.google.com/view/tucker-js/license)\n\n---Start of Tucker.js Library---*/\n\nTucker = " + Tucker.ObjectToString(Tucker) + "\n\n/*---End of Tucker.js Library---*/\n\n\npostMessage(("+text + Start + ")))"
  
var URL = Tucker.CreateURL(text)
var EasyWorker = new Worker(URL)
window.URL.revokeObjectURL(URL);
    
    
function TimeExceeded(EasyWorker) {
    EasyWorker.terminate()
    reject("Time quota exceeded")
}
if (StartArg === 2) {
    var Killer = setTimeout(TimeExceeded, Number(arguments[0]), EasyWorker)//KILL THE WORKER!!!
}
    
if (CodeName !== undefined) {
    Tucker.WorkerList[CodeName] = EasyWorker
}
    
EasyWorker.onmessage = function(Event) {
    if (StartArg === 2) {
        clearTimeout(Killer)
    }
    EasyWorker.terminate()
    if (CodeName !== undefined) {
        delete Tucker.WorkerList[CodeName]
    }
    resolve(Event.data)
}; 
EasyWorker.onerror = function(Event) {
    if (StartArg === 2) {
        clearTimeout(Killer)
    }
    if (CodeName !== undefined) {
        delete Tucker.WorkerList[CodeName]
    }
    EasyWorker.terminate()
    reject(Event)
};
})
}   
    function deleteStorage() {
        dbName = "Tucker.js Storage";
        var request = indexedDB.deleteDatabase(dbName);
request.onerror = function(event) {
  throw "Couldn't Delete Database"
};
request.onsuccess = function(event) {
  return 1;
}
    }
    var WorkerList = {}
    
  return {
    "ModPow" :  ModPow,
    "IsSafeInteger" : IsSafeInteger,
    "CreateWorker" : CreateWorker,
    "CreateURL" : CreateURL,
    "Random" : Random,
    "FermatTest" : FermatTest,
    "MillerRabin" : MillerRabin,
    "TrialFactor" : TrialFactor,
    "LoadStorage" : LoadStorage,
    "setItem" : setItem,
    "getItem" : getItem,
    "deleteItem" : deleteItem,
    "LuhnCheck" : LuhnCheck,
    "ObjectToString" : ObjectToString,
    "IsSafeInteger" : IsSafeInteger,
    "EasyWorker" : EasyWorker,
    "WorkerList" : WorkerList,
    "deleteStorage" : deleteStorage
  }

}();
