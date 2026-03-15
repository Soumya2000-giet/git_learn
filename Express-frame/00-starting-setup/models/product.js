
const fs = require('fs')
const path = require('path')
module.exports = class Product{
    constructor(t){
        this.title = t
    }
 save(){
    // product.push(this)
    const p = path.join(path.dirname(process.mainModule.filename),'data','products.json')
    fs.readFile(p,(filecontent,error)=>{
        const product = []
        if(!error){
            product = JSON.parse(filecontent)
        }
        product.push(this)
        fs.writeFile(p,JSON.stringify(product),(error)=>{
            console.log(error)
        })
    })
 }
static fetch(cb){
    const p = path.join(path.dirname(process.mainModule.filename),'data','products.json')
    fs.readFile(p,(error,filecontent)=>{
        if(error){
            console.log(`getting error as ${error}`)
            return cb([]);
        }
        return cb(JSON.parse(filecontent));
    })
}
}