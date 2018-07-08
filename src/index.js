import 'normalize.css/normalize.css';
import './scss/index.scss';

import Postit from './component/postit';

let UUID = 1;

(() => {
  let headerDateEle = document.body.querySelector('#header-date');

  let today = new Date();

  headerDateEle.innerText = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${transWeekName(today.getDay())}`;

  function transWeekName (week) {
    let weekNames = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    return weekNames[week];
  }
})();

let p1 = new Postit('#post-1', {
  rotate: 5,
  width : 220,
  height: 220
});

let p2 = new Postit('#post-2', {
  type  : 'photo',
  rotate: -3
});

let p3 = new Postit('#post-3', {
  type  : 'photo',
  rotate: 3
});

let p4 = new Postit('#post-4', {
  type  : 'photo',
  width : 460,
  extend: 20,
  rotate: 3
});

let p5 = new Postit('#post-5', {
  type  : 'photo',
  width : 50,
  extend: 20,
  rotate: 30
});

let badgeBoxEle = document.body.querySelector('.badge-box');

badgeBoxEle.querySelectorAll('.badge-item').forEach(function (itemEle) {
  itemEle.style.top = `${getRandom(0, 240)}px`;
  itemEle.style.left = `${getRandom(0, 300)}px`;
  itemEle.style.transform = `rotate(${getRandom(-30, 30)}deg)`;

  setTimeout(() => {
    itemEle.classList.add('transition');
  });

  InitBadgeItemDragable(itemEle, badgeBoxEle);
});

function InitBadgeItemDragable (ele, container) {
  ele.addEventListener('mousedown', function (ev) {
    let oevent = ev || event;

    oevent.preventDefault();

    console.warn('⬇ oevent');
    console.log(oevent);

    let distanceX = oevent.clientX - ele.offsetLeft;
    let distanceY = oevent.clientY - ele.offsetTop;

    ele.style.zIndex = UUID++;
    ele.style.transform += ' scale(1.1)';

    document.onmousemove = function (ev) {
      let oevent = ev || event;

      ev.preventDefault();
      ele.style.left = `${oevent.clientX - distanceX}px`;
      ele.style.top = `${oevent.clientY - distanceY}px`;
    };

    document.onmouseup = function (ev) {
      ev = ev || window.event;
      ele.style.transform = ele.style.transform.replace(/\sscale(.*)/, '');

      // let top = ev.clientY - distanceY;
      // let left = ev.clientX - distanceX;
      // let height = self._toolbarEl[0].clientHeight;
      // let width = self._toolbarEl[0].clientWidth;
      //
      // let result = self._detectBorder(top, left, height, width);
      // self._windowContainer.addClass('border-detecting');
      //
      // self._$q.when(result)
      // .then(
      //   function () {
      //     let bodyWidth = document.body.clientWidth;
      //     let bodyHeight = document.body.clientHeight;
      //
      //     if (result[0] === 'outer-left') {
      //       self._windowContainer.css('left', self._formatCssValue(40 - width));
      //     }
      //     if (result[0] === 'outer-right') {
      //       self._windowContainer.css('left', self._formatCssValue(bodyWidth - 40));
      //     }
      //     if (result[1] === 'outer-top') {
      //       self._windowContainer.css('top', self._formatCssValue(0));
      //     }
      //     if (result[1] === 'outer-bottom') {
      //       self._windowContainer.css('top', self._formatCssValue(bodyHeight - 40));
      //     }
      //
      //     self._windowContainer.removeClass('border-detecting');
      //   }
      // );

      document.onmousemove = null;
      document.onmouseup = null;
    };
  });
}

function getRandom (min, max) {
  min = min || 0;
  max = max || 1;

  return Math.random() * (max - min) + min;
}