# filename: main.py
# by: Abhay Gupta
# date created: 21-11-17
#
# desc: main file for flask builds
# calls: settings.py to create static site (flask frozen) and changes build directory to docs/
# NOTE: in docs/ folder because of limitations of github pages
# run: python3 freezer.py

# Import data extraction & analysis softwareA
import json
from re import A

# Import flask specific libraries
from flask import Flask, render_template
from flask_flatpages import FlatPages
from flask_frozen import Freezer
import os

from subprocess import Popen

# local files
from app.nearest_neighbor import nearest_neighbor

# Flask meta
template_dir = os.path.abspath('./app/templates/')
static_dir = os.path.abspath('./app/static/')
app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)
#app = Flask(__name__, template_folder=template_dir)
app.config.from_pyfile('config.py') 
pages = FlatPages(app)

#freezer = Freezer(app) # Create a static webpage

# Call rgb analysis file
# BMnames, SWnames = nearest_neighbor()
# BMnames = [name.split(' ', 1)[1] for name in BMnames]

# combine matching colors 
# names = list(map(list, zip(BMnames, SWnames)))

# @app.route("/app") # decorator
@app.route('/') # decorator
def main():

    # Call rgb analysis file, return dictionary
    BM_data, SW_data = nearest_neighbor()
    data = [1, 'foo']
    return render_template('main.html', SWdata=SW_data, BMdata = BM_data, letters = {'a':1,'b':2,'c':3})


    return render_template('main.html', BM_dict=json.dumps(BM_dict), SW_dict=json.dumps(SW_dict))

def main():
    """
    Entry point for flask. Runs first declared function. 
    """
    print("Writing python output to main.html")
    return render_template('template.html', my_string="Wheeeee!", my_list=[0,1,2,3,4,5])
    #return render_template('main.html')

## Flask will not run methods after first method. 

def main():
    print("Writing output to index.html")
    return 'Find a Paint <br><br>' + '<p>' + 'Benjamin Moore || Shermin Williams <br>' + ' <br> '.join(str(name[0]) + ' || ' + str(name[1]) for name in names) + '</p>'

def template_test():
    print("Writing output template.html")
    return render_template('template.html', my_string="Wheeeee!", my_list=[0,1,2,3,4,5])

## Take contents of flask and make it static via Freezer
freezer = Freezer(app)
freezer.freeze()