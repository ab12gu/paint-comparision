// fill out text items (brand/color) around hexagons

function updateAroundHexText() {
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


}


