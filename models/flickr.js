const Flickr = require('flickr-sdk');

const flickr = new Flickr({
  apiKey: process.env.FLICKR_API_KEY,
  apiSecret: process.env.FLICKR_API_SECRET
});

module.exports.get = function(search, offset, callback) {

  const page = (+offset + 10) / 10 || 1;

  flickr.request()
    .media()
    .search(search)
    .get({
      sort: 'interestingness-desc',
      per_page: 10,
      page: page
    })
    .then(obj => obj.body.photos.photo)
    .then(arr => {
      return arr.map(elem => {
        return {
          title: elem.title,
          url: 'https://www.flickr.com/photos/' + elem.owner + '/' + elem.id,
          sizes: {
            square: 'https://farm' + elem.farm + '.staticflickr.com/' + elem.server + '/' + elem.id + '_' + elem.secret + '_q.jpg',
            small: 'https://farm' + elem.farm + '.staticflickr.com/' + elem.server + '/' + elem.id + '_' + elem.secret + '_n.jpg',
            medium: 'https://farm' + elem.farm + '.staticflickr.com/' + elem.server + '/' + elem.id + '_' + elem.secret + '.jpg'
          }
        }
      });
    })
    .then(arr => {
      callback(null, arr);
    })
    .catch(err => callback(err));
}
