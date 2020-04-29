/**
 * Generates random id from date
 */
export const generateId = () => new Date().toISOString();

/**
 * Verify ISBN-10 or ISBN-13 input with regex and checksum
 * 
 * @param {String} str 
 */
export const isISBN = str => {

    if(isEmpty(str)) return true;
    str = str.trim();

    const regex = /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/;

    if(regex.test(str)) {

        // Remove non ISBN digits, then split into an array
        let chars = str.replace(/[- ]|^ISBN(?:-1[03])?:?/g, "").split("");
        // Get last char value and delete it from chars array
        let secureKey = parseInt(chars.pop(), 10);
        let sum = 0;
        let check;

        if(chars.length > 9) {
            // Checking ISBN-13
            for(let i = 0 ; i < chars.length ; i++) {
                sum += parseInt(chars[i], 10) * (i % 2 * 2 + 1);
            }
            check = 10 - (sum % 10);
            if(check === 10) check = "0";
        } else {
            // Checking ISBN-10
            for(let i = 0 ; i < chars.length ; i++) {
                sum += parseInt(chars[i], 10) * (10 - i);
            }
            check = 11 - (sum % 11);
            if(check === 10) check = 'X';
            else if(check === 11) check = "0";
        }

        return (check === secureKey);

    } else return false;

}

/**
 * Get current route from location pathname
 * 
 * @param {String} str 
 */
export const getCurrentRoute = str => {
    const regex = /[^/]+/;
    return str.match(regex) ? str.match(regex)[0] : 'home';
}

/**
 * Check if a string is empty
 * 
 * @param {String} str 
 */
export const isEmpty = str => {
    return (0 === str || !str.trim() || !str);
}