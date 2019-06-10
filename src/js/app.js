import '../stylez/style.sass';
import './prevent';
import {
  canvas,
  imgUpload,
  body,
  imageElement,
  randomPic,
  loveBtn
} from './domElements';
import { baseUrl } from './utils';

console.log('STARTING 🚀');

const drawImageToCanvas = file => {
  console.log(file);
  canvas.height = 400;
  canvas.width = 400;

  var ctx = canvas.getContext('2d');
  var img = new Image();
  img.onload = function () {
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.min(hRatio, vRatio);
    canvas.height = img.height * ratio;
    canvas.width = img.width * ratio;
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      0,
      0,
      img.width * ratio,
      img.height * ratio
    );
    // ctx.drawImage(img, 0, 0, img.width, img.height);
    // ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 300, 150);

    const imgd = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var pix = imgd.data;
    console.log(pix);

    // const resolution = 1;

    for (let i = 0; i < pix.length; i++) {}

    function dataURItoBlob (dataURI) {
      // convert base64/URLEncoded data component to raw binary data held in a string
      var byteString;
      if (dataURI.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(dataURI.split(',')[1]);
      } else byteString = unescape(dataURI.split(',')[1]);
      // separate out the mime component
      var mimeString = dataURI
        .split(',')[0]
        .split(':')[1]
        .split(';')[0];
      // write the bytes of the string to a typed array
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ia], { type: mimeString });
    }

    const imageToSend = canvas.toDataURL();
    // Convert Base64 image to binary
    var fileToSend = dataURItoBlob(imageToSend);
    const urlUpload = baseUrl + 'image-upload';
    var formData = new FormData();
    formData.append('image', fileToSend);
    fetch(urlUpload, {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    });
  };
  img.src = URL.createObjectURL(file);
};
const changeEventHandler = evt => {
  drawImageToCanvas(evt.target.files[0]);
};
if (imgUpload) {
  imgUpload.addEventListener('change', changeEventHandler);

  body.addEventListener('drop', function (e) {
    let file = e.dataTransfer.files[0];
    drawImageToCanvas(file);
  });
}

// getimages

var images = [];
if (imageElement) {
  fetch(baseUrl + 'images')
    .then(j => j.json())
    .then(data => {
      console.log(data);
      images = data.filter(x => x.imageUrl);
      var randomImage = images[Math.floor(Math.random() * images.length)];

      imageElement.src = randomImage.imageUrl;
    });
}

if (randomPic) {
  randomPic.addEventListener('click', () => {
    let randomCount = 0;
    let randomImage = {};
    while (imageElement.src === randomImage.imageUrl || randomCount < 4) {
      console.log(randomCount);

      randomImage = images[Math.floor(Math.random() * images.length)];
      randomCount++;
    }

    imageElement.src = randomImage.imageUrl;
  });
}

function generateUUID () {
  var d = new Date();
  var k = d.getTime();
  var str = k.toString(16).slice(1);
  var UUID = 'xxxx-xxxx-4xxx-yxxx-xzx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0;
    let v;
    v = c === 'x' ? r : (r & 3) | 8;
    return v.toString(16);
  });
  var newString = UUID.replace(/[z]/, str);
  return newString;
}

// Get and or set ID
const cookies = document.cookie;
let myId;
if (cookies.includes('uniqueImgUpldrId')) {
  myId = cookies.split('uniqueImgUpldrId=')[1].split(';')[0];
} else {
  myId = generateUUID();
  document.cookie = 'uniqueImgUpldrId=' + myId;
}

if (loveBtn) {
  loveBtn.addEventListener('click', () => {
    fetch(baseUrl + 'love', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify({
        personId: myId,
        imageId: imageElement.src
      }), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    });
  });
}
