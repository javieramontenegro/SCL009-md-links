#!/usr/bin/env node
//const mdLinks = require("md-links");

const marked = require("marked");
const fs = require("fs");
const FileHound = require('filehound');
const process = require("process");

const fetch = require('node-fetch');



//FUNCION BUSCA EN DIRECTORIO
const searchDirectory = (path) => {

  return FileHound.create()
  .paths(path)
  .ext('md')
  .find()
  
 }

//FUNCION VE ARCHIVO UNICO
const searchFile =(path) => {

 return new Promise((resolve,reject) =>{
       fs.readFile(path,"utf8",(err,data)=>{
          if (err){
            reject(err);
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
     resolve(links)
  }
   )
  })  
}

//FUNCION VE ARCHIVO CUANDO ES CARPETA



/*
const mdLinks =(path)=>{
   
    return new Promise((resolve,reject)=>{
          
        searchDirectory(path)
          .then(res=> {resolve(Promise.all(res.map(searchfile=>{return searchFile(searchfile)})))} )
          .catch(()=>{
             resolve(searchFile(path))
          })
           
        })
   
             
}
*/
const mdLinks = (path,options) => {
  if(options && options.validate){
      return new Promise((resolve,reject)=>{
          searchDirectory(path)
              .then((paths)=>{Promise.all(paths.map((directory)=>{return searchFile(directory)}))
                  .then((links)=>{Promise.all(links.map((searchFile)=>{return validateLinks(searchFile)}))
                .then((validateLinks)=>{resolve(validateLinks)})});                    
                  }).catch(()=>{
                      searchFile(path)
                      .then((links)=>{
                          validateLinks(links)
                          .then(res =>{
                            let link=[];
                            link.push(res)
                             resolve(link)})
                        
                        
                        })
                           
                          
         
         
                        })
      })
  }
  else{
      return new Promise((resolve, reject)=>{
          
              searchDirectory(path)
              .then(res=>{
                  resolve(Promise.all(res.map(file=>{return searchFile(file) })))})
              .catch(()=>{                   
                  searchFile(path)
                  .then(res =>{
                    let link=[];
                    link.push(res)
                     resolve(link)})
              })
             
      })
  }
}











// FUNCION VALIDACION
const validateLinks=(links)=>{
 return Promise.all( links.map(validationLinks=>{
     return new Promise((resolve)=>{
           fetch(validationLinks.href)
            .then(res=>{
              
              validationLinks.status=res.status
              validationLinks.statusText=res.statusText
             
              resolve(validationLinks)
            })
            .catch((err)=> {
             validationLinks.status=0;
              validationLinks.textStatus=err.code;
              resolve(validationLinks);
          })         
                 
     })

  }))
}
//FUNCION STATS
const stats = (links)=>{
  let href = [];
  let response = {};
  href = links.map(res=>{
      return res.href;
  });
  response.linksTotal=href.length;
  let hrefSet= new Set(href);
  response.linksUnique=hrefSet.size;
return response
}





/*
searchDirectory("./mds")
.then(res=>console.log(res))
searchFile("./mds/prueba.md")
.then(res=>console.log(res))
*/

/*
mdLinks("./mds")
 
.then(res=>console.log(res))
.catch(err=> console.log(err))
*/




module.exports={
  mdLinks,
  searchDirectory,
  searchFile,
  validateLinks,
  stats
}


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





