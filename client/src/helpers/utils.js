export var capitalizeFirstLetter = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
export var newShade = function (hexColor, magnitude) {
    hexColor = hexColor.replace("#", "");
    if (hexColor.length === 6) {
        var decimalColor = parseInt(hexColor, 16);
        var r = (decimalColor >> 16) + magnitude;
        r > 255 && (r = 255);
        r < 0 && (r = 0);
        var g = (decimalColor & 0x0000ff) + magnitude;
        g > 255 && (g = 255);
        g < 0 && (g = 0);
        var b = ((decimalColor >> 8) & 0x00ff) + magnitude;
        b > 255 && (b = 255);
        b < 0 && (b = 0);
        return "#".concat((g | (b << 8) | (r << 16)).toString(16));
    }
    else {
        return hexColor;
    }
};
export var validateEmail = function (inputText) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputText.match(mailformat)) {
        console.log("Valid email address!");
        return true;
    }
    else {
        return false;
    }
};
export var getFirstLetterInUpperCase = function (stringToParse) {
    var firstLetter = stringToParse.charAt(0).toUpperCase();
    return firstLetter;
};
