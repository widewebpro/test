export default function validate(value) {
    function email(value) {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            return 'A valid email is required.';
        }
    }

    function text(value) {
        if (!value.length) {
            return 'This field is required.';
        }
    }

    function phone(value) {
        if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(value)) {
            return 'A valid phone number is required.';
        }
    }

    validate.email = email
    validate.text = text
    validate.phone = phone

    return validate;
}