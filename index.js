#!/usr/bin/env node 
//const mdLinks = require("md-links");


const mdLinks = require("./src/md-links");





 
      
      
      

   if(process.argv[3]==="--validate"){
    mdLinks.mdLinks(process.argv[2],{validate:true})
      .then((links) => {
       console.log(links)
      })
      .catch(console.error);
  }
  else if(process.argv[3]==="--stats"){
    mdLinks.mdLinks(process.argv[2])
      .then((links) => {
        let Stats=mdLinks.stats(links);
        console.log(`Total: ${Stats.linksTotal}`);
        console.log(`Unique: ${Stats.linkSingle}`);
      })
      .catch(console.error);
    }else {
      mdLinks.mdLinks(process.argv[2])
        .then((links) => {
         console.log(links)
        })
        .catch(console.error);
    }


  
              