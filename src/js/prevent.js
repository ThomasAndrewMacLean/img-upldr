import { body } from './domElements';

const prevent = e => {
  e.preventDefault();
  e.stopPropagation();
};
body.addEventListener('drag', prevent);
body.addEventListener('dragstart', prevent);
body.addEventListener('dragend', prevent);
body.addEventListener('dragover', prevent);
body.addEventListener('dragenter', prevent);
body.addEventListener('dragleave', prevent);
body.addEventListener('drop', prevent);

body.addEventListener('dragover', function () {
  body.classList.add('is-dragover');
});

body.addEventListener('dragenter', function () {
  body.classList.add('is-dragover');
});
body.addEventListener('dragleave', function () {
  body.classList.remove('is-dragover');
});
body.addEventListener('dragend', function () {
  body.classList.remove('is-dragover');
});
body.addEventListener('drop', function () {
  body.classList.remove('is-dragover');
});
