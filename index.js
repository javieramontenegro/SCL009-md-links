#!/usr/bin/env node 
//const mdLinks = require("md-links");
const mdLinks = require("./src/md-links");
const chalk = require('chalk');

   if(process.argv[3]==="--validate"){
    mdLinks.mdLinks(process.argv[2],{validate:true})
    .then((res) => {
      let links =[];
    
      res.forEach(array =>{ array.map(link => links.push(link))
        links.map(element =>{console.log(`
${chalk.green("href: "+element.href)}
${chalk.blue("text :"+element.text)}
${chalk.yellow("file :"+element.file)}
${chalk.magenta("status :"+element.status)}
${chalk.cyan("statusText :"+element.statusText)}       
        `)});
 
})
      })
      .catch(console.error);
  }
  else if(process.argv[3]==="--stats"){
    mdLinks.mdLinks(process.argv[2])
      .then((res) => {
        let Stats=mdLinks.stats(res);
        console.log(chalk.red("Total: "+Stats.linksTotal));
        console.log(chalk.green("Unique: "+Stats.linksUnique));
      })
      .catch(console.error);
    }else {
      mdLinks.mdLinks(process.argv[2])
      .then((res) => {
        let links =[];
      
        res.forEach(array =>{ array.map(link => links.push(link))
          links.map(element =>{console.log(`
${chalk.green("href: "+element.href)}
${chalk.blue("text :"+element.text)}
${chalk.yellow("file :"+element.file)}`)});
   
  })
        })
        .catch(res=>{console.log(res)});
    }


  
              



   
/*
    mdLinks.mdLinks(process.argv[2])
    .then((res) => {res.map(element=>{
console.log(
      `${chalk.green("href: "+element.href)}
${chalk.blue("text :"+element.text)}
${chalk.yellow("file :"+element.file)}

`)
      })
      
      })
      .catch(console.error);
  }
*/
