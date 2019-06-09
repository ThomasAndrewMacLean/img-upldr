import "../stylez/style.sass";
import "./prevent";
import { canvas, imgUpload, body, imageElement } from "./domElements";
console.log("STARTING 🚀");

const url = "https://afh7v9mdo0.execute-api.eu-west-1.amazonaws.com/latest/";

const drawImageToCanvas = file => {
  console.log(file);
  canvas.height = 400;
  canvas.width = 400;

  var ctx = canvas.getContext("2d");
  var img = new Image();
  img.onload = function() {
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

    // const imageToSend = canvas.toDataURL();
    const urlUpload = url + "image-upload";
    var formData = new FormData();
    formData.append("image", file);
    fetch(urlUpload, {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .catch(error => console.error("Error:", error))
      .then(
        response => console.log("response:", JSON.stringify(response)) // clear this uploadPhotoInput
      );
  };
  img.src = URL.createObjectURL(file);
};
const changeEventHandler = evt => {
  drawImageToCanvas(evt.target.files[0]);
};
if (imgUpload) {
  imgUpload.addEventListener("change", changeEventHandler);

  body.addEventListener("drop", function(e) {
    let file = e.dataTransfer.files[0];
    drawImageToCanvas(file);
  });
}

// getimages

if (imageElement) {
  fetch(url + "data")
    .then(j => j.json())
    .then(data => {
      console.log(data);
      const dataWithImages = data.filter(x => x.imageUrl);
      var randomImage =
        dataWithImages[Math.floor(Math.random() * dataWithImages.length)];

      imageElement.src = randomImage.imageUrl;
    });
}
