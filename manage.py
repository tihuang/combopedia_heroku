#!/home/tihuang/Documents/combopedia_heroku/venv/bin/python
import os
import sys

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "combopedia.settings")

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)
