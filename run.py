# filename: main.py
# by: Abhay Gupta
# date created: 21-11-17
#
# desc: main file for flask builds
# calls: settings.py to create static site (flask frozen) and changes build directory to docs/
# NOTE: in docs/ folder because of limitations of github pages
# run: python3 freezer.py

# Import data extraction & analysis software
import os

# Import flask specific libraries
from flask import Flask, render_template
from flask_flatpages import FlatPages
from flask_frozen import Freezer

# local files
from app.nearest_neighbor import nearest_neighbor

# Flask meta
template_dir = os.path.abspath('./app/templates/')
static_dir = os.path.abspath('./app/static/')
app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)
app.config.from_pyfile('config.py') 
pages = FlatPages(app)

# ENTRY POINT
@app.route('/') # decorator
def main():
    """
    Entry point for flask. Runs first declared function. 
    """

    # Call rgb analysis file, return dictionary
    BM_data, SW_data = nearest_neighbor()

    return render_template('main.html', BMdata=BM_data, SWdata=SW_data)



## Take contents of flask and make it static via Freezer
freezer = Freezer(app)
freezer.freeze()

