# filename: freezer.py
#
# by: Abhay Gupta
# date created: 11-12-21
#
# desc: runs flask freezer to freeze website into a static site for github pages

# NOTE: By default, it will silently overwrite files in the build directory, and remove those it did not create.

from flask_frozen import Freezer # import freezer
from main import app # import app

freezer = Freezer(app)

if __name__ == '__main__':
    freezer.freeze()
