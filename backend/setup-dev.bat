@echo off
echo ========================================
echo FundiLink Backend Setup
echo ========================================
echo.

REM Check if virtual environment exists
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
    echo Virtual environment created!
    echo.
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Install dependencies
echo.
echo Installing dependencies...
call install.bat

REM Create .env file if it doesn't exist
if not exist ".env" (
    echo.
    echo Creating .env file from example...
    copy .env.example .env
    echo Please update .env with your database credentials!
)

REM Run migrations
echo.
echo Running database migrations...
python manage.py migrate

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Update .env file with your database credentials
echo 2. Create a superuser: python manage.py createsuperuser
echo 3. Start the server: python manage.py runserver
echo.
pause
