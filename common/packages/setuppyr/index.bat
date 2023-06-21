@echo off
setlocal EnableDelayedExpansion


echo Creating a python + R workspace
call conda init
call conda clean -ay
call conda activate base
call conda update conda -y
call conda update --all
call conda install -c conda-forge ipykernel -y --update-deps --force-reinstall
call R.exe -e remove.packages(installed.packages()[,1])
call R.exe --silent --slave --no-save --no-restore -e install.packages(c('IRkernel','languageserver','rmarkdown'),repos='https://cloud.r-project.org')
@REM call Rscript.exe .\installs.R
call R.exe --silent --slave --no-save --no-restore -e IRkernel::installspec()

exit 0