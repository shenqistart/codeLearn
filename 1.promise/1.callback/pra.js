let fs=require('fs');
let school={};
function out(){
 if(Object.keys(school).length==3){
console.log(school);

 }
}
fs.readFile('./name.txt','utf8',(err,data)=>{
    school.name=data;
    console.log(school.name);
    out();
    
})
fs.readFile('./address.txt','utf8',(err,data)=>{
    school.address=data;
    console.log(school.address);
    out();
    
})
fs.readFile('./age.txt','utf8',(err,data)=>{
    school.age=data;
    console.log(school.age);
    out();
    
})