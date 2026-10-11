@echo off
title Daycell (iPad and tablet access)
cd /d "%~dp0"
python daycell.py --lan
if errorlevel 1 pause
