const imagesContext = require.context('./images', false, /\.png$/);
const wallpapers = imagesContext
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

export default wallpapers;