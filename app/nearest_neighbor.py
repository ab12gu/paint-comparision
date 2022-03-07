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

from re import A


def distance_formula(x1, x2, y1, y2, z1, z2):
    """ 
    Calculate l2 norm distance
    """
    return ((x1-x2)**2 + (y1-y2)**2 + (z1-z2)**2)**(1/2)

def nearest_neighbor():
    """
    Find the nearest neighboring color 
    """

    # Import libraries
    from mpl_toolkits import mplot3d
    from sys import platform as sys_pf

    # Change plotting dependency
    if sys_pf == 'darwin':
        import matplotlib
        # matplotlib.use("TkAgg")

    import json
    import matplotlib.pyplot as plt
    import numpy as np
    import pprint

    # file directory
    input_SW_directory1 = "./data/brands/sherwin_williams/SW_json/SW_Emerald_Designer_Edition.json"
    input_SW_directory2 = "./data/brands/sherwin_williams/SW_json/SW-ColorSnap.json"

    # initialize data arrays
    rdata = []
    gdata = []
    bdata = []
    name_data = []

    # open file for shermin williams
    print("Reading Shermin Williams data")
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
    ax.set_xlabel('Red axis')
    ax.set_ylabel('Green axis')
    ax.set_zlabel('Blue axis')

    #plt.show()

    # Import Benjamin Moore Data
    print("Reading Benjamin Moore data")
    input_BM_directory = "./data/brands/benjamin_moore/BM_JSON/"

    import os

    input_filename = []
    for filename in os.listdir(input_BM_directory):
        input_filename.append(filename)

    #print(input_filename)

    rdataBM = []
    gdataBM = []
    bdataBM = []
    name_dataBM = []

    # iterate through all BM data and store rgb and name values
    print("Calculating nearest neighbor for each datapoint")

    for i in range(0, len(input_filename)):
        with open(input_BM_directory + input_filename[i], 'r') as input_file:
            data = json.load(input_file)

            #pp.pprint(data)
            
            #print(data['colorBook']['colorPage'][1]['colorEntry'][1]['RGB8'].get('blue'))
            for i in range(0,len(data['colorBook']['colorPage'])):
                for j in range(0,len(data['colorBook']['colorPage'][i]['colorEntry'])):
                    rdataBM.append(data['colorBook']['colorPage'][i]['colorEntry'][j]['RGB8'].get('red'))
                    gdataBM.append(data['colorBook']['colorPage'][i]['colorEntry'][j]['RGB8'].get('green'))
                    bdataBM.append(data['colorBook']['colorPage'][i]['colorEntry'][j]['RGB8'].get('blue'))
                    name_dataBM.append(data['colorBook']['colorPage'][i]['colorEntry'][j].get('colorName'))

    closest_colorSW_name = []
    closest_colorSW_hex = []

    # find hex values of all BM data
    colorBM_hex = []
    for i in range(0, len(name_dataBM)):
        colorBM_hex.append('#%02x%02x%02x' % (rdataBM[i], gdataBM[i], bdataBM[i]))

    # iterate through both SW and BM Files and determine which points are closest to each other
    for i in range(0, len(name_dataBM)):
        distance = 0
        min_distance = 256*3
        closest_color_name = ""
        closest_color_hex = ""

        for j in range(0, len(name_data)):
            r1 = rdata[j]
            r2 = rdataBM[i]
            g1 = gdata[j]
            g2 = gdataBM[i]
            b1 = bdata[j]
            b2 = bdataBM[i]
            distance = distance_formula(r1, r2, g1, g2, b1, b2)
            if (distance < min_distance):
                #print(min_distance)
                #print(distance)
                closest_color_name = name_data[j]
                min_distance = distance
                closest_color_hex = '#%02x%02x%02x' % (rdata[j], gdata[j], bdata[j])
                
        #print(closest_color)

        closest_colorSW_name.append(closest_color_name)
        closest_colorSW_hex.append(closest_color_hex)

    #print(rdata)
    #print(rdataBM)

    #print(len(bdataBM))
    #print(len(name_dataBM))


    # Write to excel sheet
    print("Writing output to excel sheet")

    import xlsxwriter

    with xlsxwriter.Workbook('./data/excel/SW-BM-chart.xlsx') as workbook:
        workbook.add_format().set_bg_color('#0000FF')
        #worksheet = workbook.add_format({'bg_color': 'yellow'})

        bold   = workbook.add_format({'bold': True})
        header_color   = workbook.add_format({'bg_color': '#ADD8E6'})

        worksheet = workbook.add_worksheet()

        worksheet.set_column(0, 1, 30)

        worksheet.write(0, 0, 'Benjamin Moore', header_color)
        worksheet.write(0, 1, 'Shermin Williams', header_color)

        for row_num, data in enumerate(name_dataBM):

            # add color to background
            dataSW_color   = workbook.add_format({'bg_color': closest_colorSW_hex[row_num]})
            dataBM_color   = workbook.add_format({'bg_color': colorBM_hex[row_num]})

            # remove number prefix
            data = data.split(' ', 1)[1]

            # write bm data
            worksheet.write(row_num+1, 0, data, dataBM_color)

            # write sw data
            worksheet.write(row_num+1, 1, closest_colorSW_name[row_num], dataSW_color)

    #print(name_dataBM)
    #print(closest_colorSW)

    # create dictionary from two lists
    print("Transfering data into dictionaries")
    SW_dict = {}
    for i in range(len(closest_colorSW_hex)):
       SW_dict[i] = [closest_colorSW_name[i].lower(), closest_colorSW_hex[i]]

    BM_dict = {}
    name_dataBM = [name.split(' ', 1)[1] for name in name_dataBM] # remove identifier from prefix
    for i in range(len(name_dataBM)):
        BM_dict[i] = [name_dataBM[i].lower(), colorBM_hex[i]]

    return BM_dict, SW_dict

    #region direct hex-name old
    print(len(closest_colorSW_hex))
    print(len(closest_colorSW_name))
    SW_dict = dict(zip(closest_colorSW_name, closest_colorSW_hex))
    print(len(SW_dict))
    name_dataBM = [name.split(' ', 1)[1] for name in name_dataBM]
    BM_dict = dict(zip(name_dataBM, colorBM_hex))
    #endregion


# define the entry point
if __name__ == "__main__":
    nearest_neighbor()














