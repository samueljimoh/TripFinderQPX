/**
 * Custom JavaScript object for 
 * validating user inputs
 */
var Validate = (function () {
    // CONSTRUCTOR +++++++++++
    function Validate() {
        this.isValid = false;
    }
    //+++++++++++++++++++++++++++++
    // Set the name to validate
    Validate.prototype.SetName = function (name) {
        this.name = name;
    };
    // Get the name to validate
    Validate.prototype.GetName = function () {
        return this.name;
    };
    //+++++++++++++++++++++++++++
    // Set the email to validate
    Validate.prototype.SetEmail = function (email) {
        this.email = email;
    };
    // Get the email to validate
    Validate.prototype.GetEmail = function () {
        return this.email;
    };
    //+++++++++++++++++++++++++++
    // Set the phone number to validate
    Validate.prototype.SetPhoneNumber = function (phoneNumber) {
        this.phoneNumber = phoneNumber;
    };
    // Get the phone number to validate
    Validate.prototype.GetPhoneNumber = function () {
        return this.phoneNumber;
    };

    //  function to validate name input
    Validate.prototype.ValidateName = function () {
        if (/^[a-zA-Z]{2,}/.test(this.name) == false) {
            throw "Name must be at least 2 letters";
        }
        else {
            this.isValid = true;
        }
        return this.isValid;
    };

    //  function to validate name input
    Validate.prototype.ValidateEmail = function () {
        if (/^[_\w\-]+(\.[_\w\-]+)*@[\w\-]+(\.[\w\-]+)*(\.[\D]{2,6})$/.test(this.email) == false) {
            throw "Please provide a valid email address";
        }
        else {
            this.isValid = true;
        }
        return this.isValid;
    };

    //  function to validate name input
    Validate.prototype.ValidateContact = function () {
        if (/^(\([0-9]{3}\) |[0-9]{3}-|[0-9]{3} |[0-9]{3})([0-9]{3}-[0-9]{4}|[0-9]{3} [0-9]{4}|[0-9]{3}[0-9]{4})$/.test(this.phoneNumber) == false) {
            throw "Please provide a valid phone number";
        }
        else {
            this.isValid = true;
        }
        return this.isValid;
    };
    return Validate;
}());