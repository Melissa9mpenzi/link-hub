@echo off
echo Installing FundiLink Backend Dependencies...
echo.

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Upgrade pip
python -m pip install --upgrade pip --no-warn-script-location

REM Install packages one by one with retry
echo Installing Django...
pip install Django==5.0.1 --retries 10 --timeout 60

echo Installing Django REST Framework...
pip install djangorestframework==3.14.0

echo Installing CORS Headers...
pip install django-cors-headers==4.3.1

echo Installing JWT Authentication...
pip install djangorestframework-simplejwt==5.3.1

echo Installing Python Decouple...
pip install python-decouple==3.8

echo Installing Pillow...
pip install Pillow==10.2.0

echo Installing API Documentation...
pip install drf-spectacular==0.27.1

echo.
echo Installation complete!
echo.
pause
