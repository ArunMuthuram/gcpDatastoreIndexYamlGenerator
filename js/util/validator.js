function isValidString(string){
    return string && typeof(string) === 'string' && string.trim() != "";
}

module.exports = { isValidString }