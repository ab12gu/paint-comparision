# filename: main.py
# by: Abhay Gupta
# date created: 21-11-17
#
# desc: main file for flask builds
# calls: settings.py to create static site (flask frozen) and changes build directory to docs/
# NOTE: in docs/ folder because of limitations of github pages
# run: python3 freezer.py

# Import data extraction & analysis software
from nearest_neighbor import nearest_neighbor

# Import flask specific libraries
from flask import Flask, render_template
from flask_flatpages import FlatPages
from flask_frozen import Freezer

from subprocess import Popen

# Flask meta
app = Flask(__name__)
app.config.from_pyfile('settings.py') 
pages = FlatPages(app)
freezer = Freezer(app) # Create a static webpage

# Call rgb analysis file
BMnames, SWnames = nearest_neighbor()
BMnames = [name.split(' ', 1)[1] for name in BMnames]

# combine matching colors 
names = list(map(list, zip(BMnames, SWnames)))
# names = zip(BMnames, SWnames)

@app.route("/")
def main():
    return '<p>' + 'Benjamin Moore || Shermin Williams <br>' + ' <br> '.join(str(name[0]) + ' || ' + str(name[1]) for name in names) + '</p>'

