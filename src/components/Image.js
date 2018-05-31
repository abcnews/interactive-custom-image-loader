const styles = require('./Image.css');

class Image {
  constructor(props = {}) {
    this.el = document.createElement('img');
    Object.keys(props).forEach(key => this.el.setAttribute(key, props[key]));
    this.el.classList.add(styles.root);
  }
}

module.exports = Image;
