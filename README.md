# Markdown Links

## Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...), y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.

## Utilidad
Md-links extrae los links de tus archivos md, os cuales puedes validarlos para ver si se encuentran caidos o no.


## instalación
Debes poner en la terminal npm install --global javieramontenegro-md-links.

##Usabilidad

const mdLinks = require ( 'javieramontenegro-md-links' ) 

md-links <path-to-file> [options]
Por ejemplo:

$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google

![ejemplo](https://i.ibb.co/7NWWhHf/ejemplo.png)

##Organización
https://trello.com/b/6oIvlRxl/md-links
