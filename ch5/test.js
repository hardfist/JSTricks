var fruits = ['Apple','Banana'];
let tmp = fruits;
tmp.forEach(function(item,index,array){
    console.log(item);
    fruits = [];
})