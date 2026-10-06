@echo off
:: Change to the folder where this batch file is located
cd /d "%~dp0"

:: Generate a random port number between 8000 and 8999
set /a PORT=(%RANDOM% %% 1000) + 8000

echo Starting Python HTTP server on random port: %PORT%...

:: Start the Python HTTP server in a new command prompt window using the random port
start "Python HTTP Server" cmd /k python -m http.server %PORT%

:: Wait a couple of seconds for the server to initialize
timeout /t 2 /nobreak >nul

:: Open the local server address in the default browser using the random port
start http://localhost:%PORT%/