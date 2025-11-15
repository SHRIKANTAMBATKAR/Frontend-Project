class supere{
    sname;
    sage;
    sroll;
    constructor(snmae,sage,sroll){
        this.sname=snmae;
        this.sage=sage;
        this.sroll=sroll;
        console.log("super class constructor");
    }   
}

class subs extends supere{
    constructor(sname,sage,sroll){
        super(sname,sage,sroll);
        console.log("sub class constructor");
    }  
    show(){
        console.log(`name :${this.sname} age :${this.sage} roll :${this.sroll}`);
    } 
    
}
var s1=new subs("shrikant",21,101);
    console.log(s1);
    s1.show();