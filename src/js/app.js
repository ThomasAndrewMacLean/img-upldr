import "../stylez/style.sass";

console.log("STARTING 🚀");

const imgUpload = document.querySelector("#imgupload");
const canvas = document.querySelector("#canvas");
const body = document.querySelector("body");

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

    const resolution = 1;

    for (let i = 0; i < pix.length; i++) {}
  };
  img.src = URL.createObjectURL(file);
};
const changeEventHandler = evt => {
  drawImageToCanvas(evt.target.files[0]);
};

imgUpload.addEventListener("change", changeEventHandler);
const prevent = e => {
  e.preventDefault();
  e.stopPropagation();
};
body.addEventListener("drag", prevent);
body.addEventListener("dragstart", prevent);
body.addEventListener("dragend", prevent);
body.addEventListener("dragover", prevent);
body.addEventListener("dragenter", prevent);
body.addEventListener("dragleave", prevent);
body.addEventListener("drop", prevent);

body.addEventListener("dragover", function() {
  body.classList.add("is-dragover");
});

body.addEventListener("dragenter", function() {
  body.classList.add("is-dragover");
});
body.addEventListener("dragleave", function() {
  body.classList.remove("is-dragover");
});
body.addEventListener("dragend", function() {
  body.classList.remove("is-dragover");
});
body.addEventListener("drop", function() {
  body.classList.remove("is-dragover");
});
body.addEventListener("drop", function(e) {
  let file = e.dataTransfer.files[0];
  drawImageToCanvas(file);
});
