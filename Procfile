web: gunicorn combopedia.wsgi
web: python my_django_app/manage.py collectstatic --noinput; bin/gunicorn_django --workers=4 --bind=0.0.0.0:$PORT my_django_app/settings.py 
