@echo off
title Daycell
cd /d "%~dp0"
python daycell.py
if errorlevel 1 pause
