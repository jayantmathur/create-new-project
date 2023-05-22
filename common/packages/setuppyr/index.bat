@echo off
setlocal EnableDelayedExpansion


echo Creating a python + R workspace
call conda init
call conda clean -ay
call conda activate base
call conda update conda -y
call conda update --all
call conda install -c conda-forge ipykernel -y --update-deps --force-reinstall
@REM call "R.exe" --silent --slave --no-save --no-restore -e package.check = function(packages){lapply(packages,FUN = function(x) {if (!require(x, character.only = TRUE)) {install.packages(x, dependencies = TRUE,repos="https://cloud.r-project.org") library(x, character.only = TRUE)}})}
@REM call "R.exe" --silent --slave --no-save --no-restore -e install.packages(c('IRkernel','languageserver','rmarkdown'),repos='https://cloud.r-project.org')
call "RScript.exe" installs.r
call "R.exe" --silent --slave --no-save --no-restore -e IRkernel::installspec()

exit 0