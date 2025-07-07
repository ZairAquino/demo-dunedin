const fs = require('fs');
const path = require('path');

console.log('🔄 Actualizando productos de Dunedin con imágenes optimizadas...\n');

// Obtener todas las imágenes SVG de la carpeta imgs (excluyendo originales y iconos)
const imgsFolder = path.join(__dirname, 'imgs');
const files = fs.readdirSync(imgsFolder);

// Filtrar solo archivos SVG de productos (excluyendo originales, iconos y menús)
const productImageFiles = files
  .filter(file => 
    file.endsWith('.svg') && 
    !file.includes('original') && 
    !file.includes('menu-') && 
    !file.includes('logo') && 
    !file.includes('icon')
  )
  .sort();

console.log(`📸 Encontradas ${productImageFiles.length} imágenes de productos:`);
productImageFiles.forEach(file => console.log(`  ${file}`));

// Mapear nombres de archivos a nombres de productos
const productMapping = {
  'crema-top-vainilla.svg': 'Crema Top Vainilla',
  'crema-top-nata.svg': 'Crema Top Nata',
  'crema-top-chocolate.svg': 'Crema Top Chocolate',
  'crema-batida.svg': 'Crema Batida',
  'jarabe-tres-leches.svg': 'Jarabe 3 Leches',
  'leche-condensada-premium.svg': 'Leche Condensada Premium',
  'leche-condensada-delice.svg': 'Leche Condensada Delice',
  'ganache.svg': 'Ganache',
  'mermeladas.svg': 'Mermeladas'
};

// Generar los productos con precios y descripciones
const generateProducts = () => {
  return productImageFiles.map((file, index) => {
    const baseName = file.replace('.svg', '');
    const productName = productMapping[file] || baseName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    // Precios base según el tipo de producto
    let price = 79.99;
    if (file.includes('premium')) price = 59.99;
    else if (file.includes('delice')) price = 54.99;
    else if (file.includes('ganache')) price = 99.99;
    else if (file.includes('mermeladas')) price = 49.99;
    else if (file.includes('jarabe')) price = 69.99;
    else if (file.includes('crema-top')) price = 89.99;
    
    // Descripciones según el producto
    let description = 'Producto de alta calidad para repostería';
    if (file.includes('crema-top')) description = `Deliciosa crema sabor ${file.includes('vainilla') ? 'vainilla' : file.includes('nata') ? 'nata' : 'chocolate'} para repostería`;
    else if (file.includes('crema-batida')) description = 'Crema batida lista para usar';
    else if (file.includes('jarabe')) description = 'Jarabe especial para pasteles tres leches';
    else if (file.includes('leche-condensada')) description = file.includes('premium') ? 'Leche condensada de alta calidad' : 'Leche condensada especial para repostería';
    else if (file.includes('ganache')) description = 'Ganache de chocolate para decoración';
    else if (file.includes('mermeladas')) description = 'Mermeladas de diversos sabores';
    
    return {
      id: index + 1,
      name: productName,
      price: price,
      image: `imgs/${file}`,
      description: description
    };
  });
};

// Generar categorías basadas en los productos
const generateCategories = () => {
  const categories = [
    { id: 1, name: 'Cremas', image: 'imgs/crema-top-vainilla.svg' },
    { id: 2, name: 'Jarabes', image: 'imgs/jarabe-tres-leches.svg' },
    { id: 3, name: 'Leche Condensada', image: 'imgs/leche-condensada-premium.svg' },
    { id: 4, name: 'Mermeladas', image: 'imgs/mermeladas.svg' }
  ];
  
  return categories;
};

// Leer el archivo main.js actual
const mainJsFile = path.join(__dirname, 'js/main.js');
let mainJsContent = fs.readFileSync(mainJsFile, 'utf8');

// Generar el nuevo contenido de productos
const newProducts = generateProducts();
const newCategories = generateCategories();

// Crear el nuevo array de productos
const productsArray = `const featuredProducts = [\n    ${newProducts.map(product => 
  `{\n        id: ${product.id},\n        name: '${product.name}',\n        price: ${product.price},\n        image: '${product.image}',\n        description: '${product.description}'\n    }`
).join(',\n    ')}\n];`;

// Crear el nuevo array de categorías
const categoriesArray = `const categories = [\n    ${newCategories.map(category => 
  `{\n        id: ${category.id},\n        name: '${category.name}',\n        image: '${category.image}'\n    }`
).join(',\n    ')}\n];`;

// Reemplazar los arrays existentes en main.js
const productsStart = mainJsContent.indexOf('const featuredProducts = [');
const productsEnd = mainJsContent.indexOf('];', productsStart) + 1;
const beforeProducts = mainJsContent.substring(0, productsStart);
const afterProducts = mainJsContent.substring(productsEnd);

const categoriesStart = afterProducts.indexOf('const categories = [');
const categoriesEnd = afterProducts.indexOf('];', categoriesStart) + 1;
const beforeCategories = afterProducts.substring(0, categoriesStart);
const afterCategories = afterProducts.substring(categoriesEnd);

const newMainJsContent = beforeProducts + productsArray + beforeCategories + categoriesArray + afterCategories;

// Guardar el archivo actualizado
fs.writeFileSync(mainJsFile, newMainJsContent, 'utf8');

console.log('✅ Archivo main.js actualizado exitosamente');
console.log(`📊 Total de productos: ${newProducts.length}`);
console.log(`📊 Total de categorías: ${newCategories.length}`);

// Mostrar los productos generados
console.log('\n📋 Productos generados:');
newProducts.forEach(product => {
  console.log(`  ${product.id}. ${product.name} - $${product.price} - ${product.description}`);
});

console.log('\n📋 Categorías generadas:');
newCategories.forEach(category => {
  console.log(`  ${category.id}. ${category.name}`);
});

console.log('\n🎉 Actualización de productos completada');
console.log('🔄 Recarga la página en localhost para ver los cambios'); 