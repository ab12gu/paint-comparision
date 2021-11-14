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
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits import mplot3d

def distance_formula(x1, x2, y1, y2, z1, z2):
    return ((x1-x2)**2 + (y1-y2)**2 + (z1-z2)**2)**(1/2)

# filedirectory
input_SW_directory1 = "./SherwinWilliams/SW_json/SW_Emerald_Designer_Edition.json"
input_SW_directory2 = "./SherwinWilliams/SW_json/SW-ColorSnap.json"

rdata = []
gdata = []
bdata = []
name_data = []

with open(input_SW_directory1) as input_file:
    data = json.load(input_file)

for i in range(0, len(data)):
    rdata.append(int(data[i].get('R')))
    gdata.append(int(data[i].get('G')))
    bdata.append(int(data[i].get('B')))
    name_data.append(data[i].get('Color Name'))

with open(input_SW_directory2) as input_file:
    data = json.load(input_file)

for i in range(1, len(data)):
    rdata.append(int(data[i].get('field4')))
    gdata.append(int(data[i].get('field5')))
    bdata.append(int(data[i].get('field6')))
    name_data.append(data[i].get('field2'))

#pp = pprint.PrettyPrinter(indent=4)
#pp.pprint(data)

fig = plt.figure()
ax = plt.axes(projection='3d')

#print(rdata)
#print(gdata)
#print(bdata)

# Data for three-dimensional scattered points
ax.scatter(rdata, gdata, bdata, marker='o');
plt.show()

# Import Benjamin Moore Data
input_BM_directory = "./BenjaminMoore/BM_JSON/"

import os

input_filename = []
for filename in os.listdir(input_BM_directory):
    input_filename.append(filename)

#print(input_filename)

rdataMB = []
gdataMB = []
bdataMB = []
name_dataMB = []

for i in range(0, len(input_filename)):
    with open(input_BM_directory + input_filename[i], 'r') as input_file:
        data = json.load(input_file)

        #pp.pprint(data)
        
        #print(data['colorBook']['colorPage'][1]['colorEntry'][1]['RGB8'].get('blue'))
        for i in range(0,len(data['colorBook']['colorPage'])):
            for j in range(0,len(data['colorBook']['colorPage'][i]['colorEntry'])):
                rdataMB.append(data['colorBook']['colorPage'][i]['colorEntry'][j]['RGB8'].get('red'))
                gdataMB.append(data['colorBook']['colorPage'][i]['colorEntry'][j]['RGB8'].get('green'))
                bdataMB.append(data['colorBook']['colorPage'][i]['colorEntry'][j]['RGB8'].get('blue'))
                name_dataMB.append(data['colorBook']['colorPage'][i]['colorEntry'][j].get('colorName'))

closest_colorSW = []

for i in range(0, len(name_dataMB)):
    distance = 0
    min_distance = 256*3
    closest_color = ""

    for j in range(0, len(name_data)):
        r1 = rdata[j]
        r2 = rdataMB[i]
        g1 = gdata[j]
        g2 = gdataMB[i]
        b1 = bdata[j]
        b2 = bdataMB[i]
        distance = distance_formula(r1, r2, g1, g2, b1, b2)
        if (distance < min_distance):
            #print(min_distance)
            #print(distance)
            closest_color = name_data[j]
            min_distance = distance
            
    #print(closest_color)

    closest_colorSW.append(closest_color)

#print(rdata)
#print(rdataMB)


#print(len(bdataMB))
#print(len(name_dataMB))

import xlsxwriter

new_list = [['first', 'second'], ['third', 'four'], [1, 2, 3, 4, 5, 6]]

with xlsxwriter.Workbook('test.xlsx') as workbook:
    worksheet = workbook.add_worksheet()


    worksheet.write(0, 0, 'Benjamin Moore')
    worksheet.write(1, 0, 'Shermin Williams')

    for row_num, data in enumerate(name_dataMB):
        worksheet.write(row_num+1, 0, data)
        worksheet.write(row_num+1, 1, closest_colorSW[row_num])


#print(name_dataMB)
#print(closest_colorSW)














