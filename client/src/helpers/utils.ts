export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const newShade = (hexColor: string, magnitude: number) => {
  hexColor = hexColor.replace(`#`, ``);
  if (hexColor.length === 6) {
    const decimalColor = parseInt(hexColor, 16);
    let r = (decimalColor >> 16) + magnitude;
    r > 255 && (r = 255);
    r < 0 && (r = 0);
    let g = (decimalColor & 0x0000ff) + magnitude;
    g > 255 && (g = 255);
    g < 0 && (g = 0);
    let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
    b > 255 && (b = 255);
    b < 0 && (b = 0);
    return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
  } else {
    return hexColor;
  }
};

export const validateEmail = (inputText: string) => {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (inputText.match(mailformat)) {
    console.log("Valid email address!");
    return true;
  } else {
    return false;
  }
};

export const getFirstLetterInUpperCase = (stringToParse: string) => {
  const firstLetter = stringToParse.charAt(0).toUpperCase();
  return firstLetter;
};

export const getMonthForYear = (monthNumber: number | undefined) => {
  if (!monthNumber) return '';
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if ((monthNumber + 1) >= 1 && (monthNumber + 1) <= 12) {
    return months[monthNumber];
  } else {
    throw new Error(
      "Invalid month number. Month number should be between 1 and 12."
    );
  }
};
