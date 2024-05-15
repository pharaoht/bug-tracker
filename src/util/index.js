function capitalizeFirstLetter(str){

    if(!str) return '';

    return str.charAt(0).toUpperCase() + str.slice(1);
}

function camelToSnake(str) {
  return str.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
}

module.exports = {
    capitalizeFirstLetter,
    camelToSnake
}