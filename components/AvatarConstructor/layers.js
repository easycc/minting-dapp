const imagesContext = require.context('./Hat', false, /\.png$/);
const layers = imagesContext
  .keys()
  .map(key => ({
  	path: key,
  	name: key
      .split('/')
      .pop()
      .replace(/\.png$/, '')
  }))
  .reduce((namesMap, image) => {
  	namesMap[image.name] = imagesContext(image.path);
  	return namesMap;
  }, {});

export default layers;