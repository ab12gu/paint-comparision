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

alert("hello");
alert(JSON.parse(JSON.stringify(tp_data)));
some_data = JSON.parse(JSON.stringify(tp_data));
alert(some_data["Cargo Pants"]);
// var tp_data = {{letters|safe}};
alert("world");
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

function selectedBrand() {
    console.log("goodbye")
    alert("hello")
    alert(parsedBM)
    var selectedBrand = document.getElementById('brands').value;

    // remove brand from brand list
    var index = allBrands.indexOf(selectedBrand);
    brands = allBrands.slice();
    if (index !== -1) {
        brands.splice(index, 1);
    }

    // remove brand from hex wheel
    updateHexBrandText()
}

// Fill out text items (brand/color) around hexagons
function updateHexBrandText() {
    var hexBrandTexts = document.getElementsByClassName('hexBrandText'); // brand items
    var hexColorTexts= document.getElementsByClassName('hexColorText'); // color items
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

function updateSpecifiedColor() {

    var specifiedColor = document.getElementById('specifiedColor').value;
    document.getElementById("centerHex").style.color = specifiedColor;

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



