@echo off

:: %~dp0 gives the full path to the directory where the batch script is located
SET BACKEND1_PATH=%~dp0backend1
SET BACKEND2_PATH=%~dp0backend2
SET FRONTEND_PATH=%~dp0frontend

:: Start Backend 1
echo Starting Backend 1...
start cmd /k "cd /d %BACKEND1_PATH% && node index.js"

:: Start Backend 2
echo Starting Backend 2...
start cmd /k "cd /d %BACKEND2_PATH% && node app.js"

:: Start React Frontend
echo Starting React Frontend...
start cmd /k "cd /d %FRONTEND_PATH% && npm install && npm start"

echo All servers are starting...
pause
