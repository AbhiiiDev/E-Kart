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

//filter for price and ratings

let queryStr=JSON.stringify(queryCopy);
queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);
//replacing operators with $operators 


this.query=this.query.find(JSON.parse(queryStr));


return this;    

}
pagination(resultPerPage){

    const currentPage=Number(this.queryStr.page )|| 1;
    
    //logic of skip item for other pages
    const skip=resultPerPage* (currentPage-1);

    this.query=this.query.limit(resultPerPage).skip(skip);

    return this;

}
}
module.exports=ApiFeatures;