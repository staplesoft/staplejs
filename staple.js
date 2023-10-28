var response, libStruct;
try {
	response = await fetch(import.meta.resolve("./libstruct.json"));
	libStruct = await response.json();
} catch (err) {
	console.error(`Error while fetching and parsing './libstruct.json': ${err.message}`)
}

var formattedNames;
try {
	response = await fetch(import.meta.resolve("./formattednames.json"));
	formattedNames = await response.json();
} catch (err) {
	formattedNames = {};
}

async function importModules(libStruct, basePath = ".") {
  const importedData = {};

  async function importModule(key, path) {
    try {
		var moduleNamespace = await import(import.meta.resolve(path));
		for (const prop in moduleNamespace) {
			importedData[prop] = moduleNamespace[prop];
		}
    } catch (err) {
      console.error(`Failed to import module for ${key}: ${err.message}`);
    }
  }

  for (const parentKey in libStruct) {
    const childData = libStruct[parentKey];

    if (typeof childData === "string") {
      // Check if it's a single module to import
      const modulePath = `${basePath}/${childData}.js`;
      await importModule(childData, modulePath, childData);
    } else if (typeof childData === "object") {
      // Check if it's a nested object with modules to import
      importedData[formattedNames?.[parentKey] ?? parentKey.charAt(0).toUpperCase() + parentKey.slice(1)] = await importModules(childData, `${basePath}/${parentKey}`);
    }
  }

  return importedData;
}

const Staple = await importModules(libStruct, "./src");

export {
	Staple
};