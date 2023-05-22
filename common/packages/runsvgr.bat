@echo off
setlocal EnableDelayedExpansion

if (%1) == () echo No options given. Exiting && goto :eof
if (%1) == (--all) goto :all
goto :begin

:all
echo Running :icongen
call :icongen
echo Finished :icongen
echo Running :scoursvgr
call :scoursvgr
echo Finished :scoursvgr
goto :eof

:begin
if (%1) == () goto :eof
call :%1
shift
goto :begin

:scoursvgr

call conda activate base
call conda install scour --yes

call robocopy > nul ".\public\media\images" ".\public\media\scoured" /e /mir

cd ".\public\media\images"

for /r %%f in (*.svg) do (
  set SVGPATH=%%f
  @REM echo !SVGPATH:%cd%\=!
    call scour -i %%f -o ..\scoured\!SVGPATH:%cd%\=! --enable-comment-stripping --strip-xml-space --remove-metadata --renderer-workaround --remove-descriptions --shorten-ids --set-precision=5 --set-c-precision=5 --create-groups --remove-descriptive-elements --remove-titles --enable-viewboxing
    @REM call scour -i %%f -o ..\scoured\!SVGPATH:%cd%\=! --enable-viewboxing
)

cd ..\..\..

call npx @svgr/cli --config-file ".\scripts\svgr.config.js" --out-dir ".\components\svgs\tsx" -- ".\public\media\scoured"

rmdir /s/q ".\public\media\scoured"

goto :eof

:icongen
call yarn --cwd ../ icon-gen -i ".\public\icon.svg" -o ".\public" --ico --icns --ico-name icon --icns-name icon --favicon --favicon-png-sizes 16,32,128 --favicon-ico-sizes 16,32
goto :eof

:eof
echo Done.
exit 0