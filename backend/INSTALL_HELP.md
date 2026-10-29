# Installation Help

If you're having trouble with `pip install -r requirements.txt`, try these solutions:

## Solution 1: Use the Installation Script (RECOMMENDED)

```bash
# Make sure you're in the backend folder
cd backend

# Run the installation script
install.bat
```

This script installs packages one by one with retry logic.

## Solution 2: Manual Installation

```bash
# Activate virtual environment
venv\Scripts\activate

# Install packages one by one
pip install Django==5.0.1
pip install djangorestframework==3.14.0
pip install django-cors-headers==4.3.1
pip install djangorestframework-simplejwt==5.3.1
pip install python-decouple==3.8
pip install Pillow==10.2.0
pip install drf-spectacular==0.27.1
```

## Solution 3: Fix Network Issues

If you're getting connection errors:

### Option A: Use a different PyPI mirror
```bash
pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
```

### Option B: Increase timeout
```bash
pip install -r requirements.txt --timeout 100
```

### Option C: Use cached packages
```bash
pip install -r requirements.txt --no-index --find-links=C:\pip-cache
```

## Solution 4: Check Your Network

1. **Disable VPN** if you're using one
2. **Check firewall** - Allow Python through Windows Firewall
3. **Check antivirus** - Temporarily disable to test
4. **Try mobile hotspot** if on restricted network

## Solution 5: Quick Start with SQLite

We've configured Django to use SQLite by default (no PostgreSQL needed for development).

```bash
# After installing dependencies, just run:
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

## Common Error Solutions

### Error: "Connection aborted"
- **Solution**: Use `install.bat` script which has retry logic

### Error: "No module named 'django'"
- **Solution**: Make sure virtual environment is activated
- Check: Your prompt should show `(venv)` at the start

### Error: "Access violation"
- **Solution**: 
  1. Close all Python processes
  2. Restart terminal as Administrator
  3. Run installation again

### Error: "Permission denied"
- **Solution**: Run PowerShell as Administrator

## Verify Installation

After successful installation, verify with:

```bash
python -c "import django; print(django.get_version())"
```

Should print: `5.0.1`

## Need More Help?

1. Check if Python is in PATH: `python --version`
2. Check if pip works: `pip --version`
3. Try reinstalling pip: `python -m ensurepip --upgrade`
4. Create a fresh virtual environment:
   ```bash
   rmdir /s venv
   python -m venv venv
   venv\Scripts\activate
   ```

## Contact

If still stuck, check:
- Django documentation: https://docs.djangoproject.com/
- Stack Overflow with your specific error message
