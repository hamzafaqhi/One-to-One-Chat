const fs = require('fs');
const path = require('path');
const { ucFirst } = require('../src/helpers');

const generateService = (serviceName) => {
    const parts = serviceName.split('/');
    const name = parts.pop();
    const folderName = parts.length > 0 ? parts.join('/') : ``;
    const folderPath = path.join(__dirname, '..', 'src', 'services',folderName);
    const servicePath = path.join(folderPath, `${name}.js`);
    let exportName = name.split('.');
    exportName.pop();
    exportName = exportName.reduce((prevVal,currVal,idx) => { 
        return idx == 0 ? currVal : `${prevVal}${ucFirst(currVal)}`
    })
    const serviceContent = ` 
    const index = async (req, res) => { 
        // Your default index logic here
    }
     
    const ${exportName}Service = {
        index
    }
    module.exports = ${exportName}Service;`;

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    if (fs.existsSync(servicePath)) {
        console.error(`Service '${name} Service' already exists in folder '${folderName ?? 'services'}'.`);
    } else {
        fs.writeFileSync(servicePath, serviceContent);
        console.log(`Service '${name} Service' created successfully in folder '${folderName ?? 'services'}'.`);
    }
    
};

// Example usage
const serviceName = process.argv[2];

if (!serviceName) {
    console.error('Usage: node generateService.js <serviceName>');
} else {
    generateService(serviceName);
}
