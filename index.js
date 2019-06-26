#!/usr/bin/env node 
//module.exports = () => {
  // ...
//};

const marked = require("marked");
const fs = require("fs");
const FileHound = require('filehound');
const process = require("process");
const markdownLinkExtractor = require('markdown-link-extractor');
//const mdLinks = require("md-links")
//FUNCION BUSCA EN DIRECTORIO
const searchDirectory = (path) => {

  return FileHound.create()
  .paths(path)
  .ext('md')
  .find()
  
 }

//console.log(searchDirectory("./mds"))




const searchFile =(path) => {

 return new Promise((resolve,reject) =>{
       fs.readFile(path,"utf8",(err,data)=>{
          if (err){
            reject(err.code);
          }
let links =[];

const renderer = new marked.Renderer();
renderer.link= function (href,title,text){
       links.push({
          href:href,
          text:text,
          file:path
       })


}     
    marked(data,{renderer:renderer});
     resolve(console.log(links))
  }
   )
  })  
}
//console.log(searchFile("prueba.md"))

const mdLinks = (path,options) =>{
   
  return new Promise((resolve, reject)=>{
   
        searchDirectory(path)
       
        .then(res=>{
            resolve(res.map(file=>{
                return searchFile(file); 
            }))
        })
        .catch("error")
    reject("error en alguna promesa")
         
})

}


Promise.all([mdLinks("./mds")])
.then(mdLinks)
.then(data=>console.log(data))
.catch("algun error en alguna promesa")






/*
//FUNCION BUSCA FILE
const links =(path) =>{
  fs.readFile(path,"utf8",(err,data)=> {
if (err){
  throw err;
}
let links = [];
const renderer= new marked.Renderer();
 renderer.link = function(href,title,text){

  links.push({
        href:href,
        text:text,
        file:path

  })
 }
  marked(data,{renderer:renderer})
  
  console.log(links)

})
}
console.log(links("./prueba2.md"))
*/
/*
const files = FileHound.create()
  .paths('./mds')
  .ext('md')
  .find();
 
  files.then(console.log);
*/


  /*
  // print process.argv
process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});
*/