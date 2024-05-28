const PDFDocument = require('pdfkit');
const fs = require('fs')
const path = require('path')

async function htmlToPdfBuilder(){

    const filePath = path.resolve(__dirname, '../../templates/pdf/issues.html');
    const htmlContent = fs.readFileSync(filePath, 'utf-8');

    const doc = new PDFDocument();
    const chunks = [];
    let result;

    doc.on('data', chunk => chunks.push(chunk));
    doc.on('end', () => {
        result = Buffer.concat(chunks);
    });

    // Render the HTML content in the PDF (simplified, not direct HTML rendering)
    doc.fontSize(12).text('hi hello', {
        align: 'left',
    });

    doc.end();

    return new Promise((resolve, reject) => {
        doc.on('end', () => {
            resolve(result);
        });
        doc.on('error', reject);
    });
}

module.exports = {
    htmlToPdfBuilder
}