/*
filename: script.js
by: Abhay Gupta
date created: 22-02-26
desc: enables dynamic content for user at client side (due to static site)
*/

// reference external js scripts -- pass to dom
document.write('<script src="../static/js/updateText.js" type="text/javascript"></script>'); // pre-build
document.write('<script src="../docs/static/js/updateText.js" type="text/javascript"></script>'); // post-build

// arrays of brands/colors
var brands = ['Behr', 'Benjamin Moore', 'Dunn Edwards', 'Kelly Moore', 'Pratt & Lambert', 'Sherwin Williams', 'Valspar'];
var colors = ['pink1', 'pink2', 'pink3', 'pink4', 'pink5', 'pink6', 'pink7'];
var allBrands = brands.slice();
var currBrand = "Benjamin Moore";

// add brands + associated colors to dictionary
var currData = {};
for (let i = 0; i < 7; i++) {
   currData[i] = [brands[i], colors[i]]; 
}

// initialize brand data
var BdataDict = {};
var BMdataDict = {};
var DEdataDict = {};
var KMdataDict = {};
var PLdataDict = {};
var SWdataDict = {};
var VdataDict = {};

// pull data from python via Jinja
SWdataDict = JSON.parse(JSON.stringify(SWdata));
BMdataDict = JSON.parse(JSON.stringify(BMdata));


// remove brand from outer hex list and update descriptors of hexagon
function selectedBrand() {

    // get brand name from DOM
    var selectedBrand = document.getElementById('brands').value;
    currBrand = selectedBrand;

    // remove brand from brand list
    var index = allBrands.indexOf(selectedBrand);
    brands = allBrands.slice();
    if (index !== -1) {
        brands.splice(index, 1);
    }

    // remove brand from hex wheel
    updateAroundHexText()

    // clear brands
    let defaultColor = "blue"
    document.getElementById('topLeftHex').style.color = defaultColor;
    document.getElementById('topRightHex').style.color = defaultColor;
    document.getElementById('leftHex').style.color = defaultColor;
    document.getElementById('centerHex').style.color = defaultColor;
    document.getElementById('rightHex').style.color = defaultColor;
    document.getElementById('botLeftHex').style.color = defaultColor;
    document.getElementById('botRightHex').style.color =  defaultColor;
}

function updateSpecifiedColor() {

    // use dictionary associated with the current brand
    let currBrandDict = {}
    switch(currBrand) {
        case "Behr":
            currBrandDict = BMdataDict;
            break;
        case "Benjamin Moore":
            currBrandDict = BMdataDict;
            break;
        case "Dunn Edwards":
            currBrandDict = BMdataDict;
            break;
        case "Kelly Moore":
            currBrandDict = BMdataDict;
            break;
        case "Pratt & Lambert":
            currBrandDict = BMdataDict;
            break;
        case "Sherwin Williams":
            currBrandDict = SWdataDict;
            break;
        case "Valspar":
            currBrandDict = BMdataDict;
            break;
    }

    // Update color based on brand/color spec
    var index;
    var specifiedColor = document.getElementById('specifiedColor').value;
    specifiedColor = specifiedColor.toLowerCase();

    // CHECK if selectors are stored locally
    //alert(specifiedColor)
    //alert(currBrand)

    // find the hex color associated with the specified name
    for (var key in currBrandDict){
        if (currBrandDict[key][0] == specifiedColor){
            document.getElementById("centerHex").style.setProperty('--color', currBrandDict[key][1]);
            index = key; // save key for surrounding colors
            break;
        }
    }

    /*
        Loop through color brands and fill in the color name with the 
        matching name from the associated dictionary
    */

    for (let i = 0; i < 7; i++) {
        if (currData[i][0] == "Sherwin Williams") {
            currData[i][1] = SWdataDict[index][0];
        } 
        else {
            currData[i][1] = BMdataDict[index][0];
        }
    }

    updateAroundHexText();
    updateHexColors(index);
}

function updateHexColors(index) {
    /*
        Color Hexagons
        Currently only 2 datasets, so fill based on 2 inputs
    */

    let count = 0;
    let hexs = document.getElementsByClassName('hexagon');
    //alert(hexs[1]);

    for (let i = 0; i < 7; i++) {
        if (currData[i][0] == currBrand){ // skip center hex in dict
            continue;
        }

        // skip center hex in hex fill
        if (count == 3) {
            count += 1
        }

        var defaultColor = "#375480";
        // fill color
        if (currBrand == "Sherwin Williams"){
            //hexs[count].style.setProperty('--color', '#375480');
            hexs[count].style.setProperty('--color', BMdataDict[index][1]);
        }
        else{
            //hexs[count].style.setProperty('--color', '#375480');
            hexs[count].style.setProperty('--color', SWdataDict[index][1]);
        }
        count += 1;
    }
}

    // Update surround colors based on selected brand index
    /* CHECK brand colors based on */


    //#region My Region


    //document.getElementById("centerHex").style.color = specifiedColor

    /* TEST CODE -- DELETE
    alert("Hello Javatpoint");  
    var spans = document.getElementsByClassName('cs1');
    var spans = document.getElementById('cs1');

    for (var i = 0; i < spans.length; i++) {
        var span = spans[i];
        if (span.textContent == 'J')
            span.style.color = 'green';
        if (span.textContent == 'L')
            span.style.color = 'blue';
    }


    function changeColor(newColor) {
        var elem = document.getElementById('para').innerHTML;
        elem.style.color = newColor;
    }

    */
    //var outputColor = document.getElementsByClassName('centerHex');

    //outputColor.style.color = 'blue';


    // var color = document.getElementById("selectedColor").innerHTML = "Paragraph changed.";
    //var specifiedColor = document.getElementById("specifiedColor");
    //var outputColor = document.getElementById("center");
    //var outputColor = document.getElementsByClassName('cs10E8CA05');
    //outputColor.style.color = 'blue';

    //#endregion

//#region Antiquated functions
/*
function updatehexBrandText() {
    let name = "Shermin Williams";
    var spans = document.getElementsByClassName('hexBrandText');
    for (var i = 0; i < spans.length; i++) {
        var span = spans[i];
        span.innerHTML = name;
    }
}
updatehexBrandText()

*/


/* CHECK VARIABLE INPUT FROM JINJA-PYTHON
alert("hello");
alert(SWdict["Cargo Pants"]);
// var tp_data = {{letters|safe}};
alert("world");
*/

/*
alert("hello");
var tp_data = {{letters|safe}}
alert(tp_data)

/*
// load python data of colors
var myvar = '{{SW_dict|tojson}}';
var parsedSW = JSON.parse(myvar);

var myvar = '{{BM_dict|tojson}}';
var parsedBM = JSON.parse(myvar);


alert(letters)
*/

//#endregion

