@echo off
setlocal EnableDelayedExpansion


echo Creating a python + R workspace
call conda init
call conda clean -ay
call conda activate base
call conda update conda -y
call conda update --all
call conda install -c conda-forge ipykernel -y --update-deps --force-reinstall

call Rscript.exe --silent "%~dp0/installs.R"

exit 0