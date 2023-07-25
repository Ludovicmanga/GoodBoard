export const generateStrongPassword = (length) => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+";
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
};

export const normalizeURL = (inputURL) => {
  try {
    const urlObject = new URL(inputURL);
    return urlObject.href;
  } catch (error) {
    // If an invalid URL is provided, return null or handle the error as needed
    return null;
  }
};
