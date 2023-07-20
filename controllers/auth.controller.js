import userModel from "../models/user.model";
import { signUpErrors } from "../utils/errors.utils";
var maxAge = 3 * 24 * 60 * 1000;
export var signUp = function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    var user = new userModel({ email: email, password: password });
    user
        .save()
        .then(function (user) { return res.status(201).json({ user: user._id }); })["catch"](function (error) {
        console.log("didnt work because ", error);
        var formattedErrors = signUpErrors(error);
        res.status(200).json(error);
    });
};
