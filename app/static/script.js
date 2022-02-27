/*
filename: script.js
by: Abhay Gupta
date created: 22-02-26
desc: enables dynamic content for user at client side (due to static site)
*/

// arrays of brands/colors
var brands = ['Behr', 'Benjamin Moore', 'Dunn Edwards', 'Kelly Moore', 'Pratt & Lambert', 'Sherwin Williams', 'Valspar'];
var colors = ['pink1', 'pink2', 'pink3', 'pink4', 'pink5', 'pink6', 'pink7'];

// Fill out text items (brand/color) around hexagons
function updatehexBrandText() {
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
}

function showTemperatures() {
    var temperatures = [59.2, 60.1, 63, 65, 62].map(function (t, i) {
      return 'The temperature at ' + (i || 'noon') + ' was ' + t
    })
  
    document.getElementById('temperatures').innerHTML =
      '<li>' + temperatures.join('</li><li>') + '</li>'
  }
  
  showTemperatures()

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

function selectedBrand() {
    var selectedBrand = document.getElementById('brands').value;
    alert(selectedBrand)
}

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



