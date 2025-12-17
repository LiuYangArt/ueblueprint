@echo off
echo Checking environment...

where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo NPM is not installed. Trying to install Node.js via winget...
    winget install OpenJS.NodeJS.LTS
    if %errorlevel% neq 0 (
        echo Failed to install Node.js. Please install it manually from https://nodejs.org/
        pause
        exit /b 1
    )
    echo Node.js installed. You might need to restart this script or your computer to refresh environment variables.
    pause
    exit /b 0
)

echo Installing dependencies...
call npm install --omit=dev
if %errorlevel% neq 0 (
    echo Failed to install dependencies.
    pause
    exit /b 1
)

echo.
echo Installation complete!
echo Run 1_run_server.bat to start the server.
pause
