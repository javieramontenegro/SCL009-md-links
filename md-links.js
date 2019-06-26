const mdLinks = require("md-links");


mdLinks.mdLinks(process.argv[2])
.then(mdLinks)
.then(data=>console.log(data))
.catch("algun error en alguna promesa")





