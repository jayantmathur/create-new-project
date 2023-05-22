@echo off
setlocal enabledelayedexpansion

set PROJECTREPO=none

if not exist exportpath.txt (
  echo Path not found. Create a exportpath.txt file with path before proceeding. Exiting now.. && exit 0
  )

for /f "delims=" %%x in (exportpath.txt) do set PROJECTREPO=%%x 

for /l %%a in (1,1,1000) do if "!PROJECTREPO:~-1!"==" " set PROJECTREPO=!PROJECTREPO:~0,-1!

echo Checking saved path
call :pathcheck
echo Path imported
if (%1)==(update) goto :update
goto :localcopy

:pathcheck
if not exist %PROJECTREPO% echo Invalid path. Exiting && exit 3
echo Path valid
goto :eof

:localcopy
echo Exporting to designated path...
for %%d in ("%cd%") do set "DIRNAME=%%~nxd"
call recycle "%PROJECTREPO%\%DIRNAME%"
call robocopy > nul "..\%DIRNAME%\apps" "%PROJECTREPO%\%DIRNAME%\apps" *.* /s /xo /xd ".git" "node_modules" "cenv" ".*"
call robocopy > nul "..\%DIRNAME%\docs" "%PROJECTREPO%\%DIRNAME%\docs" *.* /s /xo /xd ".git" "node_modules" "cenv" ".*"
goto :eof

:update
echo Updating from export path...
for %%d in ("%cd%") do set "DIRNAME=%%~nxd"
call robocopy > nul "%PROJECTREPO%\%DIRNAME%\apps" "..\%DIRNAME%\apps" *.* /s /xo /xd ".git" "node_modules" "cenv" ".*"
call robocopy > nul "%PROJECTREPO%\%DIRNAME%\docs" "..\%DIRNAME%\docs" *.* /s /xo /xd ".git" "node_modules" "cenv" ".*"
goto :eof

:eof
echo Locally saved
exit 0