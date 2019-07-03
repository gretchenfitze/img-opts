import './index.css';

import * as images from './assets';
import * as losslessImages from './assets_lossless';
import * as lossyImages from './assets_lossy';

function toKb(bytes) {
  return Math.round(bytes / 1024).toLocaleString() + ' KB'
}

function createImg(name, blob, div, originalSize) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('image_wrapper');

  var objectURL = URL.createObjectURL(blob);

  var img = document.createElement('img');
  img.src = objectURL;
  wrapper.appendChild(img);
  img.addEventListener('load', function() {
    URL.revokeObjectURL(objectURL), { once: true };
  });

  var title = document.createElement('div');
  title.innerText = name;
  wrapper.appendChild(title);

  const sizeData = document.createElement('p');

  sizeData.innerHTML = `
    Size: <b>${toKb(blob.size)}</b>${
      originalSize ?
      `. Savings: <b>${100 - Math.round(blob.size / originalSize * 100)}%</b>` : ''
    }
  `;

  wrapper.appendChild(sizeData);
  div.appendChild(wrapper);
}

var imgElems = document.getElementsByClassName('image_examples');

for (var i = 0; i < imgElems.length; i++) {
  const div = imgElems[i];
  const id = div.id;

  const originalUrl = images[id];
  const losslessUrl = losslessImages[id];
  const lossyUrl = lossyImages[id];

  fetch(originalUrl).then(resp => resp.blob()).then(blob => {
    const originalSize = blob.size;
    createImg('Original', blob, div);

    fetch(losslessUrl).then(resp => resp.blob()).then(blob => {
      createImg('Lossless', blob, div, originalSize);

      fetch(lossyUrl).then(resp => resp.blob()).then(blob => {
        createImg('Lossy', blob, div, originalSize);
      });
    });
  });
}
