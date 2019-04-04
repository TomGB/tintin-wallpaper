const imgur = require('imgur');

console.log(imgur.getClientId())

const albumId = '8OFPmbL';
imgur.getAlbumInfo(albumId)
    .then(function(json) {
        console.log(json.data.images);
    })
    .catch(function (err) {
        console.error(err.message);
    });
