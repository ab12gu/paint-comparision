from nearest_neighbor import nearest_neighbor

from flask import Flask, render_template
from flask_flatpages import FlatPages
from flask_frozen import Freezer

from subprocess import Popen

app = Flask(__name__)
app.config.from_pyfile('settings.py')
pages = FlatPages(app)
freezer = Freezer(app)

animal = ('hello')
animal2 = ('hello2', 'nobody2')

BMnames, SWnames = nearest_neighbor()
BMnames = [name.split(' ', 1)[1] for name in BMnames]

names = zip(BMnames, SWnames)

@app.route("/")
def main():
    return '<p>' + 'Benjamin Moore || Shermin Williams <br>' + (' <br> '.join(str(name) for name in names)) + '</p>'



