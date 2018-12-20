Array.prototype.myReduce=function(callback,prev){
    for(let i=0;i<this.length;i++){
        if(typeof prev!='undefined'){
            prev=callback(prev,this[i],i,this)
        }else{
            prev=callback(this[i],this[i+1],i+1,this);
            i++;
        }
    }
    return prev;
}

let ary=[1,2,3].myReduce((prev,next,currentIndex)=>{
    return prev+next;
});
console.log(ary);
