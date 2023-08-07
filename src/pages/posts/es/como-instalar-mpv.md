## Guía para instalar el reproductor MPV y otras herramientas para estudiar idiomas.
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
- Descargar script oficial para instalar mpv desde [este enlace](https://sourceforge.net/projects/mpv-player-windows/files/bootstrapper.zip/download).
- Descomprimir el archivo descargado en la carpeta donde se quiere dejar instalado el programa.
- Ejecutar como administrador el archivo `updater.bat`.
- Seguir las instrucciones.

**Instalación portable manual:**
- Tener instalado [7zip](https://www.7-zip.org/download.html) o [WinRar](https://www.win-rar.com/download.html)
- Descargar la última versión de mpv desde [este enlace](https://sourceforge.net/projects/mpv-player-windows/files/release/)
> si no sabe cuál descargar y su computador no tiene más de 10 años de viejo, escoja el que más descargas tuvo en la última semana. Por ej:  `mpv-0.36.0-x86_64.7z`
- Descomprimir en donde se quiera dejar instalado mpv.

### Establecer como reproductor predeterminado:
Click derecho en cualquier archivo de video en el computador > Propiedades > Abrir con > Mostrar más > Explorar > Buscar descomprimieron la carpeta descargada > Seleccionar el ejecutable `mpv`

### Configuración mpv
Las configuraciones generales de mpv se guardan en el archivo `mpv.conf` que se encuentra de forma predeterminada en `%appdata%/mpv/`. Una ubicación alternativa es crear una carpeta llamada `portable_config` en la carpeta que se encuentra el ejecutable de mpv.
Las configuraciones de atajos de teclado se guardan en el archivo `input.conf` ubicado en la misma carpeta que `mpv.conf`.
nota: si la carpeta o los archivos no existen simplemente se pueden crear con el bloc de notas.
todas las configuraciones posibles se encuentran en el [manual](https://mpv.io/manual/stable/), las que yo personalmente uso las guardo [acá](https://github.com/DavidBonelo/dotfiles/tree/main/.config/mpv)

### Instalar scripts