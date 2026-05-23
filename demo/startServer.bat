@echo off
:: Change to the folder where this batch file is located
cd /d "%~dp0"

:: Start the Python HTTP server in a new command prompt window
start "Python HTTP Server" cmd /k python -m http.server 8000

:: Wait a couple of seconds for the server to initialize
timeout /t 2 /nobreak >nul

:: Open the local server address in the default browser
start http://localhost:8000/