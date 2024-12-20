const Validator = require('validatorjs');



const getFirstErrorMessage = (validation) => {
    const firstKey = Object.keys(validation.errors.errors)[0];
    return validation.errors.first(firstKey);
}

function validate(request, rules, messages = {}) {
    if (typeof request !== 'object' || typeof rules !== 'object' || typeof messages !== 'object') {
        return { status: 0, message: 'Invalid Params' };
    }

    const validation = new Validator(request, rules, messages);
    return new Promise((resolve, reject) => {
        validation.checkAsync(
            () => resolve({ status: 1, message: "Validation Passes" }), // Validation passed
            () => reject({ status: 0, message: getFirstErrorMessage(validation) }) // Validation failed
        );
    }).then(result => result) // optional
        .catch(err => err); // errors in promise
}

module.exports = validate;
