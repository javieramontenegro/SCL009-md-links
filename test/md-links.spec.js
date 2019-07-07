const mdLinks = require("../src/md-links");


describe('mdLinks', () => {

  it('Deberia retornar 2 links del archivo prueba2.md', async() => {
    await expect(mdLinks.mdLinks('./prueba2.md')).resolves.toEqual(
      [ { href: 'https://es.wikipedia.org/wiki/Node.js',
      text: 'Node.js - Wikipedia',
      file: './prueba2.md' },
    { href:
       'https://medium.freecodecamp.org/what-exactly-is-node-js-ae36e97449f5',
      text: 'What exactly is Node.js? - freeCodeCamp',
      file: './prueba2.md' } ]

    )
  });
  it('Deberia retornar 2 links del archivo prueba2.md validando su status y status.text', async() => {
    await expect(mdLinks.mdLinks('./prueba2.md',{validate:true})).resolves.toEqual(
      [ { href: 'https://es.wikipedia.org/wiki/Node.js',
      text: 'Node.js - Wikipedia',
      file: './prueba2.md' 
      ,status:200,statusText:'OK'},
    { href:
       'https://medium.freecodecamp.org/what-exactly-is-node-js-ae36e97449f5',
      text: 'What exactly is Node.js? - freeCodeCamp',
      file: './prueba2.md' 
      ,status:200,statusText:'OK'} ]

    )
  });
  it('Deberia retornar error 2 links del archivo prueba2.md al intentar validar', async() => {
    await expect(mdLinks.validateLinks( [ { href: 'https://ebbbs.wikipedia.org/wiki/Node.js',text: 'Node.js - Wikipedia',file: './prueba2.md' 
    }])).resolves.toEqual(
      [ { href: 'https://ebbbs.wikipedia.org/wiki/Node.js',text: 'Node.js - Wikipedia',file: './prueba2.md' 
      ,status:0,textStatus:"ENOTFOUND"},
    ]

    )
  });
 
  it('Deberia retornar 2 links del ls carpeta mds validando su status y status.text', async() => {
    await expect(mdLinks.mdLinks('.\\mds',{validate:true})).resolves.toEqual(
      [  [ { href: 'https://github.com/javieramontenegro/SCL009-md-links',
      text: 'https://github.com/javieramontenegro/SCL009-md-links',
      file: 'mds\\prueba.md',
      status: 200,
      statusText: 'OK' } ] 

     ] )});

     it('Deberia retornar 2 links del ls carpeta mds', async() => {
      await expect(mdLinks.mdLinks('.\\mds')).resolves.toEqual(
        [  [ { href: 'https://github.com/javieramontenegro/SCL009-md-links',
        text: 'https://github.com/javieramontenegro/SCL009-md-links',
        file: 'mds\\prueba.md',
        } ] 
  
       ] )});

       test('Deberia retornar el valor de links totales y únicos', () => {
          expect.assertions(1);
        return mdLinks.stats([{href:'https://github.com/javieramontenegro/SCL009-md-links'
        }])
      .then(res => expect(res.linksTotal).toEqual({"linksTotal": 1}) )
          
    
    });





});
