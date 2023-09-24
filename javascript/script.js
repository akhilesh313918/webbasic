//word vs keyword ✅
//chcacha = word
//for = keyword

//var let const ✅
var dulha = "lab";
var dulhan = "labby";

console.log(dulha + " weds " + dulhan); //'lab weds labby'
dulha = "haramzyada";
console.log(dulha + " weds " + dulhan); //'haramzyada weds labby'

//hoisting - ✅
//variable and function are hoisted which means their declartion is moved on the top of code. 
console.log(a); // undefined
var a = 12;

//console.log(b); // not defined

//Types in js
//primitive and reference ✅
//primitives = number, sting, null, undefined, bool;
//reference = [] () {}
var c = [1,2,3,4];
var d = c;
c.pop();
console.log(c);  [1, 2, 3]
console.log(d);   [1, 2, 3]

//conditionals - if else esle-if ✅
//jb baat agar magar pr aati h

if(11>12){
    console.log("if");
}else if(12>13){
    console.log("else if");
}
else{
    console.log("else");
}

//loops ✅
//loop ka matlab repeat
for(let i=0; i<10; i++){
    console.log(i);
}

var e = 12;
while(e<20){
    console.log(e);
    e++;
}

//functions ✅
// 1) jab aaapka code aap turant nhi chalana chaate future mei chalana chaate ho
// 2) jab aapla code aap reuse karana chahte ho
// 2) jab aap code chalana chaate ho har bar with different data

function helobolo(){
    console.log("HEllo");
}
helobolo();

//arguments : - original values which is passed
//parameters : - variable values which will be accepted in a func.

//Arrays ✅
var arr = [1,2,3,4,5,6,7];
arr.push(8);
console.log(arr); // [1, 2, 3, 4, 5, 6, 7, 8]
arr.pop();
console.log(arr); // [1, 2, 3, 4, 5, 6, 7]
arr.unshift(0);
console.log(arr); // [0, 1, 2, 3, 4, 5, 6, 7]
arr.shift();
console.log(arr); // [1, 2, 3, 4, 5, 6, 7]
arr.splice(2,1);
console.log(arr); // [1, 2, 4, 5, 6, 7]

//Objects ✅
//ek se jaada bande ki baat ki to hua array, ek bande ke baare mei saari baat ki to hua object
//object hai ek badnde ki details ko hold krna, in akey value pair
// 1) 
var obj = {} //this is a plain object

var obj = {  // properties and values
    name: "Akhilesh",
    age: 32,
    sayhello : function(){
        console.log("hi this is Akhi!");
    }
}
obj.sayhello();

//the difference b/w var let const
//var old js mei ES5
//var function scoped hota hai => var apne parent func mei kahi b use ho skta h
//var adds itself to the window object -> type window in browser console and check there will var present

function abcd(){
    for(var i =1; i<12; i++){
        console.log(i);
    }
    console.log(">>> "+i);
}
abcd();

//let const new js mei hai ES6
//let const braces scoped hota hai
//let const doesn't adds itself to the window object
function efg(){
    for(let i =1; i<12; i++){
        console.log(i);
    }
    //console.log(">>> "+i);
}
efg();

//console.log, alert, setInterval, fetch are not part of js these are part of window

//Execution context ✅
//execution context is a container where the functions code is executed and its created whenever a function is called, 
//it contains 3 things, variables, functions and lexical environment.

//Lexical environment ✅
//lexical environment hota hai ek chart jisme ye likha hota hai ke aapka particular function ki cheejo ko access kar sakta hai and kinko nhi,
//matlab ki its holds its scope and scope and scope chain

//copy reference values ✅
var a = [1,2,3,4,5];
var b = [...a];
a.pop();
console.log(a);
console.log(b);

var obj = {name: "Akhilesh"};
var copyobj = {...obj};
obj.name = "Priyanka"
console.log(obj);
console.log(copyobj);

//Truthy Falsy ✅
//js mei kch b likho wo mainly do prakar mei se kisi ek prakar ko belong karti h
// falsy values ye hai = 0, false, undefined, null, NaN, document.all
// truthy values - > falsy values yad krlo, truthy woh value hogi jo fasly mei se belong nhi krti h

if(7){
console.log("thruthy"); // thruthy
}else{
    console.log("falsy");
}

if(NaN){
    console.log("falsy");
    }else{
        console.log("thruthy"); //thruthy
    }

//Loops ✅    
//foreach or forin
//foreach loop sirf array pe chalta hai, matlab ki jb bhi tumhare pass ek array ho,, tab use mei kaun aata hai foreach loop.
//forech kabhi b by default aapke array mei change nhi karta wo aapko changes krke deta hai array ko temprory copy par jiske wajah se array humesha same rehta hai

var a = [1,2,3,4,5,6,7,8,9,10];

//for in - objects par kam krne ke liye hotai h forin loop


