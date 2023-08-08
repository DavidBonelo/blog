## Guía para instalar el reproductor MPV y otras herramientas para estudiar idiomas.

Mpv es un reproductor multimedia  rápido, liviando, soporta todo formato de video y audio, y además es extensible con plugins(scripts). Sin embargo no cuenta con un instalador, así que me tomé la tarea de listar todas las formas que existen para instalarlo:

### Instalación
**Instalación via chocolatey:**
```sh
choco install mpv
```
**### **Instalación via Scoop:**
```sh
scoop bucket add extras
scoop install mpv
```
**Instalación portable via script:**
- Descargar script de instalación oficial de mpv desde [este enlace](https://sourceforge.net/projects/mpv-player-windows/files/bootstrapper.zip/download).
- Descomprimir el archivo descargado en la carpeta donde se quiere dejar instalado el programa.
- Ejecutar como administrador el archivo `updater.bat`.
- El script descargará mpv y sus dependencias.

**Instalación portable manual:**
- Tener instalado [7zip](https://www.7-zip.org/download.html) o [WinRar](https://www.win-rar.com/download.html)
- Descargar la última versión de mpv desde [este enlace](https://sourceforge.net/projects/mpv-player-windows/files/release/)
> descargar el que más descargas tuvo en la última semana. Por ej:  `mpv-0.36.0-x86_64.7z`
- Descomprimir en donde se quiera dejar instalado mpv.

### Establecer como reproductor predeterminado:
Click derecho en cualquier archivo de video en el computador > Propiedades > Se abre con > Cambiar... > Más aplicaciones ⬇ > Buscar otra aplicación en el equipo > Buscar donde se instaló mpv > Seleccionar el ejecutable `mpv`

### Configuración mpv
Las configuraciones generales de mpv se guardan en un archivo de texto `mpv.conf` que se encuentra de forma predeterminada en `%appdata%/mpv/` una ubicación alternativa es la carpeta `portable_config` en la misma ubicación que se encuentra el ejecutable de mpv.

Las configuraciones de atajos de teclado se guardan en el archivo `input.conf` ubicado en la misma carpeta que `mpv.conf`.

Todas las configuraciones posibles se encuentran en el [manual](https://mpv.io/manual/stable/), las que yo uso personalmente las publico [aquí](https://github.com/DavidBonelo/dotfiles/tree/main/.config/mpv).

> Nota: si la carpeta o los archivos no existen simplemente se pueden crear con el bloc de notas.

### Instalar scripts
Para instalar scripts también se hace de forma manual, en la carpeta donde se guardan las configuraciones se crea una carpeta llamada `scripts` y dentro se copia el contenido del script descargado.
