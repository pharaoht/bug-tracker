const fs = require('fs');

function capitalizeFirstLetter(str){

    if(!str) return '';

    return str.charAt(0).toUpperCase() + str.slice(1);
}

function camelToSnake(str) {
  return str.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
}

function deleteFileFromFs(pathToFile){
    fs.unlink(pathToFile, (err) => {

      if (err){
         console.error('Failed to delete local file:', err);

         return false;
      }

      console.log('file deleted from local');

      return true
    });
}

module.exports = {
    capitalizeFirstLetter,
    camelToSnake,
    deleteFileFromFs
}