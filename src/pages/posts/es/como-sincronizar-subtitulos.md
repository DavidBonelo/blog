## Guia para re-sincronizar subtítulos automáticamente.

Lamentablemente cuando descargamos subtítulos de internet en nuestro idioma objetivo, muchas veces nos encontramos que estos no están sincronizados para la versión del video que tenemos descargado.

**Resincronización automática de subtítulos con Allas script**

La forma más fácil de re-sincronizar los subtítulos de varios archivos es usar [alass](https://github.com/kaegi/alass), una herramienta que puede detectar pausas y comerciales para corregir subtítulos con alta precisión, sin embargo esta no es muy fácil de usar, por lo tanto haremos uso de un script que nos facilitará la labor (agradecimientos al usuario Anacreon del hilo DJT).

**Video demostración:**

[![Video demostración](https://img.youtube.com/vi/x0h3ooBHrpk/0.jpg)](http://www.youtube.com/watch?v=x0h3ooBHrpk "Video demostración")

### Instalación y uso
- Descargar la carpeta comprimida desde [este enlace](https://mega.nz/folder/W19xUQJT#Ele4MKy-c61AOp2ZaN5AYg), la cual contiene el script y todas sus dependencias listas para usar.
- Extraer la carpeta y moverla al lugar donde se tienen guardados los archivos de video y los subtítulos que se quieren sincronizar.

La estructura de la carpeta debe verse así:

![estructura de archivos](/img/ss-folder.png)

- Ejecutar el `RUN_ME.bat` que se encuentra dentro de la carpeta.

    Aparecerán varias opciones con números, para seleccionar la opción se escribe solo el número y se presiona enter:

![Selection script option](/img/ss-sub-type.png)

    - La mayoría de los subtítulos se encuentran en formato `.srt`.
    - Generalmente se usa la opción de subtítulos incrustados (embedded subs) puesto que es la manera más confiable. Por lo tanto se recomienda descargar videos que incluyan subtítulos.
    - La opción Split penalty se puede dejar tal cual la mayoría de las veces. Modificarla en caso que sincronización anterior falle.

El script extraerá los subtítulos incluidos en el video. Cuando termine, nos presentará un menú con todos los estilos presentes en los subtítulos extraidos:

![Subtitle Styles](/img/ss-sub-styles.png)

Estos estilos son usados por los creadores de subtítulos para marcar diferentes tipos de subtítulos según el contenido. "Carteles" o "Signs" por ejemplo son usados para traducir texto escrito visible en la pantalla. "OP/ED" se refiere a subtítulos para el opening y el ending. Todos estos subtítulos adicionales posiblemente interfieran con el proceso de sincronización debido a que no son diálogos y pueden no estar presentes en los subtítulos que se quieren sincronizar. Por lo tanto se puede filtrar por los estilos de subtítulos que queramos se usen para el proceso de sincronizado. En este caso los estilos [1]Default y [3]Default-alt (dejando un espacio entre los números).

Al terminar el proceso de sincronizado los subtítulos quedarán corregidos y renombrados:

![Sync result](/img/ss-sync-result.png)