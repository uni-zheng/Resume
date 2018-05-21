import _ from 'lodash';

export default function Postit (target, options) {
  let defaultOpts = {
    rotate: 0,

    type: 'postit',
    title: null,
    content: null,
    template: null,
  };

  this._options = _.assign(defaultOpts, options);

  this.element = document.querySelector(target);

  this.containerEle = document.createElement('div');
  this.containerEle.classList.add('post-container');

  this.titleEle = null;
  this.contentEle = null;
  this.slotHTML = null;




  console.warn('⬇ this');
  console.log(this);

  if (!this.element) return;

  this.slotHTML = this.element.innerHTML;
  this.element.classList.add(this._options.type);

  this.addStyle();
  this.addContent();
}

Postit.prototype = {
  addStyle: function () {
    if (this._options.width) this.containerEle.style.width = this._options.width + 'px';
    if (this._options.height) this.containerEle.style.height = this._options.height + 'px';
    if (this._options.extend) this.element.style.margin = this._options.extend + 'px';

    this.element.style.transform = 'rotate(' + this._options.rotate + 'deg)';

    this.element.style.shapeOutside = _calcPolygon.call(this);

    function _calcPolygon () {
      let r = this._options.rotate;
      let w = this._options.width + (this._options.extend * 2 || 0);
      let a, b, c, d;
      a = {
        x: 0,
        y: 0
      };

      b = {
        x: _cos(r, 3),
        y: _sin(r, 3),
      };

      c = {
        x: Math.round((Math.sqrt(2) * _cos(r + 45, 3)) * 1000) / 1000,
        y: Math.round((Math.sqrt(2) * _sin(r + 45, 3)) * 1000) / 1000
      };

      d = {
        x: 0,
        y: 1
      };

      console.log(b, c, d);

      return `
        polygon(
        ${a.x * w}px ${a.y * w}px, 
        ${b.x * w}px ${b.y * w}px, 
        ${c.x * w}px ${c.y * w}px, 
        ${d.x * w}px ${d.y * w}px
      )
      `;
    }

    function _cos (deg, precision) {
      let factor = Math.pow(10, precision || 0);

      return Math.round(Math.cos(deg * Math.PI / 180) * factor) / factor;
    }

    function _sin (deg, precision) {
      let factor = Math.pow(10, precision || 0);

      return Math.round(Math.sin(deg * Math.PI / 180) * factor) / factor;
    }
  },

  addContent: function () {
    if (this.element.children.length) {
      this.slotHTML = this.element.innerHTML;
      this.element.innerHTML = '';
      this.containerEle.innerHTML = this.slotHTML;
    }
    else if (this._options.template) {
      this.containerEle.innerHTML = this._options.template;
    }
    else {
      if (this._options.title) {
        this.titleEle = document.createElement('h1');
        this.titleEle.innerText = this._options.title;
        this.containerEle.appendChild(this.titleEle);
      }

      if (this._options.content) {
        this.contentEle = document.createElement('p');
        this.contentEle.innerText = this._options.content;
        this.containerEle.appendChild(this.contentEle);
      }
    }

    this.element.appendChild(this.containerEle);
  }
};

