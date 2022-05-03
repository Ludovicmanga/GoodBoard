"use strict";
module.exports.signUpErrors = function (error) {
    var errors = { pseudo: '', email: '', password: '' };
    if (error.message.includes('pseudo'))
        errors.pseudo = "pseudo incorrect ou déjà pris";
    if (error.message.includes('email'))
        errors.email = "email incorrect";
    if (error.message.includes('password'))
        errors.password = "le mot de passe doit faire 6 caractères minimum";
    if (error.code === 11000 && Object.keys(error.keyValue)[0].includes("pseudo"))
        errors.pseudo = "Ce pseudo est déjà pris";
    if (error.code === 11000 && Object.keys(error.keyValue)[0].includes("email"))
        errors.email = "Cet email est déjà enregistré";
    return errors;
};
module.exports.loginErrors = function (error) {
    var errors = { email: '', password: '' };
    if (error.message.includes('email'))
        errors.email = "Email inconnu";
    if (error.message.includes('password'))
        errors.password = "Le mot de passe ne correspond pas";
    return errors;
};
module.exports.uploadErrors = function (error) {
    var errors = { format: '', maxSize: '' };
    if (error.message.includes('invalid file')) {
        errors.format = 'format incompatible';
    }
    if (error.message.includes('File too large')) {
        errors.format = 'image trop volumineuse';
    }
    return errors;
};
