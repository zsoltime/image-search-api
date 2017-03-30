const Flickr = require('flickr-sdk');

const flickr = new Flickr({
  apiKey: process.env.FLICKR_API_KEY,
  apiSecret: process.env.FLICKR_API_SECRET,
});

module.exports.get = (search, offset, callback) => {
  const page = (+offset + 10) / 10 || 1;

  flickr.request()
    .media()
    .search(search)
    .get({
      sort: 'interestingness-desc',
      per_page: 10,
      page,
      extras: 'description, url_sq, url_t, url_s, url_q, url_m, url_n, url_z, url_c, url_l, url_o',
    })
    .then(obj => obj.body.photos.photo)
    .then(arr => (
      arr.map(img => ({
        title: img.title,
        description: img.description,
        url: `https://www.flickr.com/photos/${img.owner}/${img.id}`,
        sizes: {
          thumbnail: img.url_t,
          square: {
            small: img.url_sq,
            large: img.url_q,
          },
          small: {
            240: img.url_s,
            320: img.url_n,
          },
          medium: {
            500: img.url_m,
            640: img.url_z,
            800: img.url_c,
          },
          large: img.url_l,
          original: img.url_o,
        },
      }))
    ))
    .then(arr => callback(null, arr))
    .catch(err => callback(err));
};
