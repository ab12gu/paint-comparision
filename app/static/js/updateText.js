// fill out text items (brand/color) around hexagons
function updateHexBrandText() {
    let hexBrandTexts = document.getElementsByClassName('hexBrandText'); // brand items
    let hexColorTexts= document.getElementsByClassName('hexColorText'); // color items

    // Loop through brands, and populate text based on brands
    let count = 0;
    for (let i = 0; i < 7; i++) {
        if (currData[i][0] == currBrand) {
            continue;
        }
        
        // update brand hex text
        let hexBrandText = hexBrandTexts[count];
        hexBrandText.innerHTML = currData[i][0];

        // update color hex text
        let hexColorText = hexColorTexts[count];
        hexColorText.innerHTML = currData[i][1];
        count += 1;
    }
    /* alert(specifiedColor) */
}

function updateHexColorText(index){
    /*
        use index to find color of each brand
        use color text to update color array
        update dom with color text
    */

    // store color text
    var Bcolor =    "blue"; // BdataDict[index][0];
    var BMcolor =   "blue"; // BMdataDict[index][0];
    var DEcolor =   "blue"; // DEdataDict[index][0];
    var KMcolor =   "blue"; // KMdataDict[index][0];
    var PLcolor =   "blue"; // PLdataDict[index][0];
    var SWcolor =   SWdataDict[index][0];
    var Vcolor =    "blue"; // VdataDict[index][0];

    var SWbrandIndex = brands.indexOf('Sherwin Williams');
    colors[SWbrandIndex] = SWcolor;

    // update text
    updateHexBrandText();
}

