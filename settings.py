# filename: settings.py
#
# by: Abhay Gupta
# date created: 21-11-17
#
# desc: configuration file for flask settings; used to change path
# -*- coding: utf-8 -*-

import os

## UNNECESSARY
REPO_NAME = "flask-ghpages-example"  # Used for FREEZER_BASE_URL
DEBUG = True
##

# Assumes the app is located in the same directory where this file resides
APP_DIR = os.path.dirname(os.path.abspath(__file__)) + '/docs'

PROJECT_ROOT = os.path.abspath(os.path.join(APP_DIR, os.pardir)) + '/docs'

# In order to deploy to Github pages, you must build the static files to the project root
FREEZER_DESTINATION = PROJECT_ROOT

# IMPORTANT: If this is True, all app files will be deleted when you run the freezer
FREEZER_REMOVE_EXTRA_FILES = False  