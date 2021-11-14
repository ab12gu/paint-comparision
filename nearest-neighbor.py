###################
# filename:     nearest-neighbor.py
# by:           Abhay Gupta
# date created: 21-11-13 
#
# description:
# 1. Parse through data
# 2. Convert excel/xml into json/dictionaries
# 3. Plot data
# 4. Create psuedo-database
###################

from sys import platform as sys_pf
if sys_pf == 'darwin':
    import matplotlib
    matplotlib.use("TkAgg")

import json
import pprint
from mpl_toolkits import mplot3d
import numpy as np
import matplotlib.pyplot as plt
# filedirectory
input_SW_directory1 = "./SherwinWilliams/SW_json/SW_Emerald_Designer_Edition.json"
input_SW_directory2 = "./SherwinWilliams/SW_json/SW_ColorSnap.json"

with open(input_SW_directory1) as input_file:
    data = json.load(input_file)

pp = pprint.PrettyPrinter(indent=4)
pp.pprint(data)

print("DATA")
print(data[0].get('B'))

rdata = []
gdata = []
bdata = []

for i in range(0, len(data)):
    rdata.append(int(data[i].get('R')))
    gdata.append(int(data[i].get('G')))
    bdata.append(int(data[i].get('B')))

fig = plt.figure()
ax = plt.axes(projection='3d')

print(rdata)
print(gdata)
print(bdata)

# Data for three-dimensional scattered points
ax.scatter(rdata, gdata, bdata, marker='o');
plt.show()







