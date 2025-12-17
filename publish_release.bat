@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

:: Get versions using Node.js
node -e "const v = require('./package.json').version; const [ma, mi, pa] = v.split('.').map(Number); console.log('set CURRENT_VERSION=' + v); console.log('set NEXT_PATCH=' + ma + '.' + mi + '.' + (pa + 1)); console.log('set NEXT_MINOR=' + ma + '.' + (mi + 1) + '.0'); console.log('set NEXT_MAJOR=' + (ma + 1) + '.0.0');" > versions.bat

call versions.bat
del versions.bat

:menu
cls
echo ========================================================
echo       UE Blueprint AI - Release Publisher
echo ========================================================
echo.
echo  Current Version: !CURRENT_VERSION!
echo.
echo  Select version bump type:
echo.
echo  [1] Patch : Bug fixes (!CURRENT_VERSION! -^> !NEXT_PATCH!)
echo  [2] Minor : New features (!CURRENT_VERSION! -^> !NEXT_MINOR!)
echo  [3] Major : Breaking changes (!CURRENT_VERSION! -^> !NEXT_MAJOR!)
echo  [4] Exit
echo.
echo ========================================================
echo.

set /p choice="Enter option [1-4]: "

if "%choice%"=="1" set vtype=patch
if "%choice%"=="2" set vtype=minor
if "%choice%"=="3" set vtype=major
if "%choice%"=="4" goto :eof

if not defined vtype (
    echo Invalid input, please try again.
    timeout /t 2 >nul
    goto menu
)

echo.
echo --------------------------------------------------------
echo [1/5] Running npm version %vtype% ...
echo --------------------------------------------------------
call npm version %vtype% --no-git-tag-version

if %errorlevel% neq 0 (
    echo.
    echo [Error] Version update failed!
    echo Press any key to return...
    pause >nul
    goto menu
)

:: Re-read new version
node -e "console.log('set NEW_VERSION=' + require('./package.json').version);" > newver.bat
call newver.bat
del newver.bat

echo.
echo --------------------------------------------------------
echo [2/5] Building project...
echo --------------------------------------------------------
call npm run build

if %errorlevel% neq 0 (
    echo.
    echo [Error] Build failed!
    pause >nul
    goto menu
)

echo.
echo --------------------------------------------------------
echo [3/5] Creating release package...
echo --------------------------------------------------------

:: Create release folder
set RELEASE_DIR=release
set RELEASE_NAME=ue-blueprint-ai-v!NEW_VERSION!
set RELEASE_PATH=%RELEASE_DIR%\%RELEASE_NAME%

if exist "%RELEASE_DIR%" rmdir /s /q "%RELEASE_DIR%"
mkdir "%RELEASE_PATH%"

:: Copy necessary files
echo Copying dist files...
xcopy /e /i /q "dist" "%RELEASE_PATH%\dist"

echo Copying demo files...
copy "ai-demo.html" "%RELEASE_PATH%\"
copy "index.html" "%RELEASE_PATH%\"

echo Copying assets...
xcopy /e /i /q "assets" "%RELEASE_PATH%\assets"

echo Copying scripts...
copy "0_install.bat" "%RELEASE_PATH%\"
copy "1_run_server.bat" "%RELEASE_PATH%\"
copy "package.json" "%RELEASE_PATH%\"
copy "README.md" "%RELEASE_PATH%\" 2>nul
copy "LICENSE" "%RELEASE_PATH%\" 2>nul

:: Create zip file
echo Creating zip archive...
cd "%RELEASE_DIR%"
powershell -command "Compress-Archive -Path '%RELEASE_NAME%' -DestinationPath '%RELEASE_NAME%.zip' -Force"
cd ..

echo.
echo  Release package created: %RELEASE_DIR%\%RELEASE_NAME%.zip
echo.

echo --------------------------------------------------------
echo [4/5] Committing changes...
echo --------------------------------------------------------
git add -A
git commit -m "Release v!NEW_VERSION!"
git tag -a "v!NEW_VERSION!" -m "Release v!NEW_VERSION!"

echo.
echo --------------------------------------------------------
echo [5/5] Ready to push to GitHub...
echo --------------------------------------------------------
echo This will push the new version tag to the remote repository.
echo.
set /p confirm="Confirm push? (Y/N): "

if /i "%confirm%"=="y" (
    echo.
    echo Pushing to remote...
    git push --follow-tags
    
    if !errorlevel! equ 0 (
        echo.
        echo ========================================================
        echo  Release successful!
        echo  Version: v!NEW_VERSION!
        echo  Package: %RELEASE_DIR%\%RELEASE_NAME%.zip
        echo.
        echo  You can now upload the zip file to GitHub Releases.
        echo ========================================================
    ) else (
        echo.
        echo [Error] Push failed, please check network or Git config.
    )
) else (
    echo.
    echo Push cancelled. Version committed locally.
    echo You can later run: git push --follow-tags
)

echo.
echo Release package is ready at: %RELEASE_DIR%\%RELEASE_NAME%.zip
pause
