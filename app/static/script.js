/*
filename: script.js
by: Abhay Gupta
date created: 22-02-26
desc: enables dynamic content for user at client side (due to static site)
*/

// arrays of brands/colors
var brands = ['Behr', 'Benjamin Moore', 'Dunn Edwards', 'Kelly Moore', 'Pratt & Lambert', 'Sherwin Williams', 'Valspar'];
var colors = ['pink1', 'pink2', 'pink3', 'pink4', 'pink5', 'pink6', 'pink7'];
var allBrands = brands.slice();
var currBrand = "Sherwin Williams";

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
    updateHexBrandText()
}

// fill out text items (brand/color) around hexagons
function updateHexBrandText() {
    var hexBrandTexts = document.getElementsByClassName('hexBrandText'); // brand items
    var hexColorTexts= document.getElementsByClassName('hexColorText'); // color items

    // Loop through brands, and populate text based on brands
    for (var i = 0; i < hexBrandTexts.length; i++) {
        var hexBrandText = hexBrandTexts[i];
        hexBrandText.innerHTML = brands[i];
        hexBrandText.style.color = "black";

        var hexColorText = hexColorTexts[i];
        hexColorText.innerHTML = colors[i];
        //hexColorText.style.color = "black";

    }
    /* alert(specifiedColor) */
}


function updateSpecifiedColor() {

    // use dictionary associated with the current brand
    var currBrandDict = {}
    switch(currBrand) {
        case "Behr":
            currBrandDict = SWdataDict;
        case "Benjamin Moore":
            currBrandDict = BMdataDict;
        case "Dunn Edwards":
            currBrandDict = SWdataDict;
        case "Kelly Moore":
            currBrandDict = SWdataDict;
        case "Pratt & Lambert":
            currBrandDict = SWdataDict;
        case "Sherwin Williams":
            currBrandDict = SWdataDict;
        case "Valspar":
            currBrandDict = SWdataDict;
    }

    // Update color based on brand/color spec
    var specifiedColor = document.getElementById('specifiedColor').value;
    document.getElementById("centerHex").style.color = currBrandDict[specifiedColor];

    // Update surround colors based on selected brand index
    document.getElementById('topLeftHex').style.color = "blue";
    document.getElementById('topRightHex').style.color = "blue";
    document.getElementById('leftHex').style.color = "blue";
    document.getElementById('rightHex').style.color = "blue";
    document.getElementById('botLeftHex').style.color = "blue";
    document.getElementById('botRightHex').style.color = "blue";

    /* CHECK brand colors based on */
    //alert(specifiedColor)
    //alert(currBrandDict[specifiedColor])

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
  }

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
