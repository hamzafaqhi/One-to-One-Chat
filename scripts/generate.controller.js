const fs = require('fs');
const path = require('path');
const { ucFirst } = require('../src/helpers');

const generateController = (controllerName) => {
    const parts = controllerName.split('/');
    const name = parts.pop();
    const folderName = parts.length > 0 ? parts.join('/') : ``;
    const folderPath = path.join(__dirname, '..', 'src', 'controllers',folderName);
    const controllerPath = path.join(folderPath, `${name}.js`);
    let exportName = name.split('.');
    exportName.pop();
    exportName = exportName.reduce((prevVal,currVal,idx) => { 
        return idx == 0 ? currVal : `${prevVal}${ucFirst(currVal)}`
    })
    const controllerContent = ` 
    const index = async (req, res) => { 
        // Your default index logic here
    }
     
    const ${exportName}Controller = {
        index
    }
    module.exports = ${exportName}Controller;`;
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    if (fs.existsSync(controllerPath)) {
        console.error(`Controller '${name} Controller' already exists in folder '${folderName ?? 'controllers'}'.`);
    } else {
        fs.writeFileSync(controllerPath, controllerContent);
        console.log(`Controller '${name} Controller' created successfully in folder '${folderName ?? 'controllers'}'.`);
    }
    
};

// Example usage
const controllerName = process.argv[2];

if (!controllerName) {
    console.error('Usage: node generateController.js <ControllerName>');
} else {
    generateController(controllerName);
}
