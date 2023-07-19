class ApiFeatures{
    constructor(query,queryStr){
        this.query=query;//after ? in api is query
        this.queryStr=queryStr; 
    }

    //search functionality with any name
search(){
    const keyword=this.queryStr.keyword ?
    {
        name:{
            $regex:this.queryStr.keyword, //mongodb operator 
            $options:"i", //case insensitive
        },
    }:{}
    
this.query=this.query.find({...keyword}); //same as product.find()
return this;

}
filter(){
    const queryCopy={...this.queryStr} //spread operator so that do not pass through reference i.e changes do not reflect in real one
    console.log(queryCopy);

    const removeFields=["keyword","page","limit"];

    removeFields.forEach((key)=> delete queryCopy[key]);
console.log(queryCopy);

this.query=this.query.find(queryCopy);
return this;

}

}
module.exports=ApiFeatures;