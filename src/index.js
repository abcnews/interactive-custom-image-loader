const xhr = require('xhr');
const Image = require('./components/Image');

const NAME_PREFIX = 'customimage';
const IMG_ATTRIBUTE_PATTERNS = Object.keys(HTMLImageElement.prototype)
  .concat(Object.keys(HTMLElement.prototype))
  .reduce((memo, prop) => {
    memo[prop] = new RegExp(`${prop}="([^"]*)"`);

    return memo;
  }, {});

Array.prototype.slice.call(document.querySelectorAll(`a[name^="${NAME_PREFIX}"]`)).forEach(anchorEl => {
  const id = anchorEl.name.substring(NAME_PREFIX.length);

  xhr(
    { url: `${(window.location.origin || '').replace('mobile', 'www')}/news/${id}?pfm=ms` },
    (err, response, body) => {
      if (err || response.statusCode !== 200) {
        return console.error(err || new Error(response.statusCode));
      }

      // Reselect in case it no longer exists
      if (!(anchorEl = document.querySelector(`a[name^="${NAME_PREFIX}${id}"]`))) {
        return;
      }

      const imgHTML = body.match(new RegExp(`<img [^>]*${id}[^>]*>`))[0];

      const props = Object.keys(IMG_ATTRIBUTE_PATTERNS).reduce((memo, prop) => {
        const match = imgHTML.match(IMG_ATTRIBUTE_PATTERNS[prop]);

        if (match) {
          memo[prop] = match[1];
        }

        return memo;
      }, {});

      const component = new Image(props);

      anchorEl.parentElement.insertBefore(component.el, anchorEl);
      anchorEl.parentElement.removeChild(anchorEl);
    }
  );
});

if (process.env.NODE_ENV === 'development') {
  console.debug(`public path: ${__webpack_public_path__}`);
}
