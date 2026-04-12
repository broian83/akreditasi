@echo off
echo ========================================
echo   TEMPLATE AKREDITASI RS - SETUP
echo ========================================
echo.

echo [1/3] Checking clasp installation...
clasp --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: clasp not found!
    echo Please install clasp first:
    echo   npm install -g @google/clasp
    echo   clasp login
    pause
    exit /b 1
)
echo OK: clasp found
echo.

echo [2/3] Current directory: %CD%
echo.

echo [3/3] Files to deploy:
dir /b *.gs *.html *.json
echo.

echo ========================================
echo   READY TO DEPLOY!
echo ========================================
echo.
echo MANUAL STEPS REQUIRED:
echo.
echo 1. Create new Google Sheet
echo 2. Extensions ^> Apps Script
echo 3. Copy-paste Code.gs
echo 4. Add HTML files (WebApp, Dashboard, FormDokumen)
echo 5. Run onOpen() function
echo 6. Click "Setup Awal" menu
echo.
echo See PANDUAN-DEPLOY.md for detailed instructions
echo.
pause
