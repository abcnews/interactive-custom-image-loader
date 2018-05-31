const styles = require('./Image.css');

class Image {
  constructor(props = {}) {
    const imgEl = document.createElement('img');

    Object.keys(props).forEach(key => imgEl.setAttribute(key, props[key]));

    this.el = document.createElement('div');
    this.el.className = styles.root;
    this.el.appendChild(imgEl);
  }
}

module.exports = Image;
