const container = document.querySelector('#box');
const boxesCont = document.querySelectorAll('.box');
const coord = document.querySelector('.coord');
const selectColor = document.querySelector('.select-box');

const color = document.querySelectorAll('.color');

const box1 = document.getElementById('box1');
const box2 = document.getElementById('box2');
const boxes = document.querySelector('.subbox');

const btn = document.querySelector('.btn');

let shiftX = null;
let shiftY = null;

const rect = {
  left: container.getBoundingClientRect().left,
  top: container.getBoundingClientRect().top,
};
rect.right = rect.left + 800;
rect.bottom = rect.top + 800;

let firstBoxRect = {
  left: rect.left + 200,
  top: rect.top + 300,
  right: rect.left + 200 + box1.offsetWidth,
  bottom: rect.top + 300 + box1.offsetWidth,
};

let secondBoxRect = {
  left: rect.left + 400,
  top: rect.top + 500,
  right: rect.left + 400 + box2.offsetWidth,
  bottom: rect.top + 500 + box1.offsetWidth,
};

let stackBoxRect = {
  left: firstBoxRect.left,
  right: firstBoxRect.right,
  top: firstBoxRect.top,
  bottom: firstBoxRect.bottom,
};

box1.style.left = firstBoxRect.left + 'px';
box1.style.top = firstBoxRect.top + 'px';
box2.style.left = secondBoxRect.left + 'px';
box2.style.top = secondBoxRect.top + 'px';

let currentBox = null;
let isStuck = {
  status: false,
  position: null,
  box: null,
};

boxesCont.forEach((box) => {
  box.onmousedown = function (event) {
    currentBox = box;
    shiftX = event.clientX - currentBox.getBoundingClientRect().left;
    shiftY = event.clientY - currentBox.getBoundingClientRect().top;
    box.style.zIndex = 1000;
    box.style.cursor = 'grabbing';

    const changeColorHandler = (el) => {
      return function () {
        currentBox.style.backgroundColor =
          window.getComputedStyle(el).backgroundColor;
      };
    };
    color.forEach((el) => {
      el.addEventListener('click', changeColorHandler(el));
    });

    moveAt(event.pageX, event.pageY);
    function moveAt(pageX, pageY) {
      if (!isStuck.status) {
        currentBox.style.left = pageX - shiftX + 'px';
        currentBox.style.top = pageY - shiftY + 'px';
      } else {
        btn.style.opacity = 1;
        switch (isStuck.position) {
          case 'left':
            box2.style.top = pageY - shiftY + 'px';
            box1.style.top = pageY - shiftY + 'px';
            if (isStuck.box === 1) {
              box1.style.left = pageX - shiftX + 'px';
              box2.style.left = pageX - shiftX + box1.offsetWidth + 'px';
            } else {
              box2.style.left = pageX - shiftX + 'px';
              box1.style.left = pageX - shiftX + box1.offsetWidth + 'px';
            }
            break;
          case 'rigth':
            box1.style.top = pageY - shiftY + 'px';
            box2.style.top = pageY - shiftY + 'px';
            if (isStuck.box === 1) {
              box1.style.left = pageX - shiftX + 'px';
              box2.style.left = pageX - shiftX - box1.offsetWidth + 'px';
            } else {
              box2.style.left = pageX - shiftX + 'px';
              box1.style.left = pageX - shiftX - box1.offsetWidth + 'px';
            }

            break;
          case 'top':
            box1.style.left = pageX - shiftX + 'px';
            box2.style.left = pageX - shiftX + 'px';
            if (isStuck.box === 1) {
              box1.style.top = pageY - shiftY + 'px';
              box2.style.top = pageY - shiftY + box1.offsetWidth + 'px';
            } else {
              box2.style.top = pageY - shiftY + 'px';
              box1.style.top = pageY - shiftY + box1.offsetWidth + 'px';
            }
            break;
          case 'bottom':
            box1.style.left = pageX - shiftX + 'px';
            box2.style.left = pageX - shiftX + 'px';
            if (isStuck.box === 1) {
              box1.style.top = pageY - shiftY + 'px';
              box2.style.top = pageY - shiftY - box1.offsetWidth + 'px';
            } else {
              box2.style.top = pageY - shiftY + 'px';
              box1.style.top = pageY - shiftY - box1.offsetWidth + 'px';
            }
            break;
        }
      }

      updateRect();
      createStackBoxRect();
      if (box1 === currentBox && !isStuck.status) {
        getStack();
      }
      if (box2 === currentBox && !isStuck.status) {
        getStackTwo();
      }
      if (!isStuck.status) {
        if (firstBoxRect.right > rect.right) {
          box1.style.left = rect.right - box1.offsetWidth + 'px';
        }
        if (firstBoxRect.left < rect.left) {
          box1.style.left = rect.left + 'px';
        }
        if (firstBoxRect.top < rect.top) {
          box1.style.top = rect.top + 'px';
        }
        if (firstBoxRect.bottom > rect.bottom) {
          box1.style.top = rect.bottom - box1.offsetWidth + 'px';
        }

        if (secondBoxRect.right > rect.right) {
          box2.style.left = rect.right - box1.offsetWidth + 'px';
        }
        if (secondBoxRect.left < rect.left) {
          box2.style.left = rect.left + 'px';
        }
        if (secondBoxRect.top < rect.top) {
          box2.style.top = rect.top + 'px';
        }
        if (secondBoxRect.bottom > rect.bottom) {
          box2.style.top = rect.bottom - box1.offsetWidth + 'px';
        }
      } else {
        if (stackBoxRect.right > rect.right) {
          switch (isStuck.box) {
            case 1:
              if (isStuck.position === 'left') {
                box1.style.left = rect.right - 2 * box1.offsetWidth + 'px';
                box2.style.left = rect.right - box1.offsetWidth + 'px';
              } else if (isStuck.position === 'rigth') {
                box1.style.left = rect.right - box1.offsetWidth + 'px';
                box2.style.left = rect.right - 2 * box1.offsetWidth + 'px';
              } else {
                box1.style.left = rect.right - box1.offsetWidth + 'px';
                box2.style.left = rect.right - box2.offsetWidth + 'px';
              }
              break;
            case 2:
              if (isStuck.position === 'left') {
                box1.style.left = rect.right - box1.offsetWidth + 'px';
                box2.style.left = rect.right - 2 * box1.offsetWidth + 'px';
              } else if (isStuck.position === 'rigth') {
                box1.style.left = rect.right - 2 * box1.offsetWidth + 'px';
                box2.style.left = rect.right - box1.offsetWidth + 'px';
              } else {
                box1.style.left = rect.right - box1.offsetWidth + 'px';
                box2.style.left = rect.right - box1.offsetWidth + 'px';
              }
              break;
          }
        }
        if (stackBoxRect.left < rect.left) {
          switch (isStuck.box) {
            case 1:
              if (isStuck.position === 'left') {
                box1.style.left = rect.left + 'px';
                box2.style.left = rect.left + box1.offsetWidth + 'px';
              } else if (isStuck.position === 'rigth') {
                box1.style.left = rect.left + box1.offsetWidth + 'px';
                box2.style.left = rect.left + 'px';
              } else {
                box1.style.left = rect.left + 'px';
                box2.style.left = rect.left + 'px';
              }
              break;
            case 2:
              if (isStuck.position === 'left') {
                box1.style.left = rect.left + box1.offsetWidth + 'px';
                box2.style.left = rect.left + 'px';
              } else if (isStuck.position === 'rigth') {
                box1.style.left = rect.left + 'px';
                box2.style.left = rect.left + box1.offsetWidth + 'px';
              } else {
                box1.style.left = rect.left + 'px';
                box2.style.left = rect.left + 'px';
              }
              break;
          }
        }
        if (stackBoxRect.top < rect.top) {
          switch (isStuck.box) {
            case 1:
              if (isStuck.position === 'top') {
                box1.style.top = rect.top + 'px';
                box2.style.top = rect.top + box1.offsetWidth + 'px';
              } else if (isStuck.position === 'bottom') {
                box1.style.top = rect.top + box1.offsetWidth + 'px';
                box2.style.top = rect.top + 'px';
              } else {
                box1.style.top = rect.top + 'px';
                box2.style.top = rect.top + 'px';
              }
              break;
            case 2:
              if (isStuck.position === 'top') {
                box1.style.top = rect.top + box1.offsetWidth + 'px';
                box2.style.top = rect.top + 'px';
              } else if (isStuck.position === 'bottom') {
                box1.style.top = rect.top + 'px';
                box2.style.top = rect.top + box1.offsetWidth + 'px';
              } else {
                box1.style.top = rect.top + 'px';
                box2.style.top = rect.top + 'px';
              }
              break;
          }
        }
        if (stackBoxRect.bottom > rect.bottom) {
          switch (isStuck.box) {
            case 1:
              if (isStuck.position === 'top') {
                box1.style.top = rect.bottom - 2 * box1.offsetWidth + 'px';
                box2.style.top = rect.bottom - box1.offsetWidth + 'px';
              } else if (isStuck.position === 'bottom') {
                box1.style.top = rect.bottom - box1.offsetWidth + 'px';
                box2.style.top = rect.bottom - 2 * box1.offsetWidth + 'px';
              } else {
                box1.style.top = rect.bottom - box1.offsetWidth + 'px';
                box2.style.top = rect.bottom - box1.offsetWidth + 'px';
              }
              break;
            case 2:
              if (isStuck.position === 'top') {
                box1.style.top = rect.bottom - box1.offsetWidth + 'px';
                box2.style.top = rect.bottom - 2 * box1.offsetWidth + 'px';
              } else if (isStuck.position === 'bottom') {
                box1.style.top = rect.bottom - 2 * box1.offsetWidth + 'px';
                box2.style.top = rect.bottom - box1.offsetWidth + 'px';
              } else {
                box1.style.top = rect.bottom - box1.offsetWidth + 'px';
                box2.style.top = rect.bottom - box1.offsetWidth + 'px';
              }
              break;
          }
        }
      }
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    document.onmouseup = function () {
      document.removeEventListener('mousemove', onMouseMove);
      color.forEach((el) => {
        el.removeEventListener('click', changeColorHandler(el));
      });
      box.style.cursor = 'grab';
      box.onmouseup = null;
    };
    box.ondragstart = function () {
      return false;
    };
  };
});

btn.onclick = (event) => {
  if (isStuck.status) {
    btn.style.opacity = 0;
    box1.style.borderRadius = '10px';
    box2.style.borderRadius = '10px';
    boxesCont.forEach((box) => {
      let randomNum1 = Math.floor(
        Math.random() * 400 * (Math.random() < 0.5 ? -1 : 1)
      );
      let randomNum2 = Math.floor(
        Math.random() * 400 * (Math.random() < 0.5 ? -1 : 1)
      );
      let pageX =
        (box === box1 ? firstBoxRect.left : secondBoxRect.left) + randomNum1;
      let pageY =
        (box === box1 ? firstBoxRect.top : secondBoxRect.top) + randomNum2;
      box.classList.add('boxes-transition');
      box.style.left = `${firstBoxRect.left + randomNum1}px`;
      box.style.top = `${firstBoxRect.top + randomNum2}px`;

      if (pageX > rect.right - box1.offsetWidth) {
        box.style.left = rect.right - box1.offsetWidth + 'px';
      }
      if (pageX < rect.left + shiftX) {
        box.style.left = rect.left + 'px';
      }
      if (pageY < rect.top + box1.offsetWidth) {
        box.style.top = rect.top + 'px';
      }
      if (pageY > rect.bottom - box1.offsetWidth) {
        box.style.top = rect.bottom - box1.offsetWidth + 'px';
      }

      setTimeout(() => {
        box.classList.remove('boxes-transition');
        isStuck.status = false;
        updateRect(box);
      }, 500);
    });
  }
};

function updateRect() {
  firstBoxRect.left = Number(box1.style.left.slice(0, -2));
  firstBoxRect.right = Number(box1.style.left.slice(0, -2)) + box1.offsetWidth;
  firstBoxRect.top = Number(box1.style.top.slice(0, -2));
  firstBoxRect.bottom = Number(box1.style.top.slice(0, -2)) + box1.offsetWidth;

  secondBoxRect.left = Number(box2.style.left.slice(0, -2));
  secondBoxRect.right = Number(box2.style.left.slice(0, -2)) + box2.offsetWidth;
  secondBoxRect.top = Number(box2.style.top.slice(0, -2));
  secondBoxRect.bottom = Number(box2.style.top.slice(0, -2)) + box2.offsetWidth;
}

function createStackBoxRect() {
  if (isStuck.box === 1) {
    stackBoxRect = {
      left: firstBoxRect.left,
      right: firstBoxRect.right,
      top: firstBoxRect.top,
      bottom: firstBoxRect.bottom,
    };
    switch (isStuck.position) {
      case 'left':
        stackBoxRect.right = secondBoxRect.right;
        break;
      case 'rigth':
        stackBoxRect.left = secondBoxRect.left;
        break;
      case 'top':
        stackBoxRect.top = firstBoxRect.top;
        stackBoxRect.bottom = secondBoxRect.bottom;
        break;
      case 'bottom':
        stackBoxRect.top = secondBoxRect.top;
        stackBoxRect.bottom = firstBoxRect.bottom;
        break;
    }
  }
  if (isStuck.box === 2) {
    stackBoxRect = {
      left: secondBoxRect.left,
      right: secondBoxRect.right,
      top: secondBoxRect.top,
      bottom: secondBoxRect.bottom,
    };
    switch (isStuck.position) {
      case 'left':
        stackBoxRect.right = firstBoxRect.right;
        break;
      case 'rigth':
        stackBoxRect.left = firstBoxRect.left;
        break;
      case 'top':
        stackBoxRect.top = secondBoxRect.top;
        stackBoxRect.bottom = firstBoxRect.bottom;
        break;
      case 'bottom':
        stackBoxRect.top = firstBoxRect.top;
        stackBoxRect.bottom = secondBoxRect.bottom;
        break;
    }
  }
}

function getStack() {
  // ПРИЛИПАНИЕ СПРАВА
  if (
    firstBoxRect.left - secondBoxRect.right <= 20 &&
    firstBoxRect.left - secondBoxRect.right >= -20 &&
    firstBoxRect.bottom - secondBoxRect.bottom <= 50 &&
    firstBoxRect.top - secondBoxRect.top >= -50
  ) {
    box1.style.left = secondBoxRect.right + 'px';
    box1.style.top = secondBoxRect.top + 'px';
    box1.style.borderRadius = '0px 10px 10px 0px';
    box2.style.borderRadius = '10px 0px 0px 10px';
    isStuck.status = true;
    isStuck.position = 'rigth';
    isStuck.box = 1;
  }
  // ПРИЛИПАНИЕ СЛЕВА
  if (
    firstBoxRect.right - secondBoxRect.left <= 20 &&
    firstBoxRect.right - secondBoxRect.left >= -20 &&
    firstBoxRect.bottom - secondBoxRect.bottom <= 50 &&
    firstBoxRect.top - secondBoxRect.top >= -50
  ) {
    box1.style.left = secondBoxRect.left - box1.offsetWidth + 'px';
    box1.style.top = secondBoxRect.top + 'px';
    box1.style.borderRadius = '10px 0px 0px 10px';
    box2.style.borderRadius = '0px 10px 10px 0px';
    isStuck.status = true;
    isStuck.position = 'left';
    isStuck.box = 1;
  }
  // ПРИЛИПАНИЕ СВЕРХУ
  if (
    firstBoxRect.bottom - secondBoxRect.top <= 20 &&
    firstBoxRect.bottom - secondBoxRect.top >= -20 &&
    firstBoxRect.left - secondBoxRect.left <= 50 &&
    firstBoxRect.right - secondBoxRect.right >= -50
  ) {
    box1.style.top = secondBoxRect.top - box1.offsetWidth + 'px';
    box1.style.left = secondBoxRect.left + 'px';
    box1.style.borderRadius = '10px 10px 0px 0px';
    box2.style.borderRadius = '0px 0px 10px 10px';
    isStuck.status = true;
    isStuck.position = 'top';
    isStuck.box = 1;
  }
  // ПРИЛИПАНИЕ СНИЗУ
  if (
    firstBoxRect.top - secondBoxRect.bottom <= 20 &&
    firstBoxRect.top - secondBoxRect.bottom >= -20 &&
    firstBoxRect.left - secondBoxRect.left <= 50 &&
    firstBoxRect.right - secondBoxRect.right >= -50
  ) {
    box1.style.top = secondBoxRect.bottom + 'px';
    box1.style.left = secondBoxRect.left + 'px';
    box1.style.borderRadius = '0px 0px 10px 10px';
    box2.style.borderRadius = '10px 10px 0px 0px';
    isStuck.status = true;
    isStuck.position = 'bottom';
    isStuck.box = 1;
  }
}

function getStackTwo() {
  // ПРИЛИПАНИЕ СПРАВА
  if (
    secondBoxRect.left - firstBoxRect.right <= 20 &&
    secondBoxRect.left - firstBoxRect.right >= -20 &&
    secondBoxRect.bottom - firstBoxRect.bottom <= 50 &&
    secondBoxRect.top - firstBoxRect.top >= -50
  ) {
    box2.style.left = firstBoxRect.right + 'px';
    box2.style.top = firstBoxRect.top + 'px';
    box2.style.borderRadius = '0px 10px 10px 0px';
    box1.style.borderRadius = '10px 0px 0px 10px';
    isStuck.status = true;
    isStuck.position = 'rigth';
    isStuck.box = 2;
  }
  // ПРИЛИПАНИЕ СЛЕВА
  if (
    secondBoxRect.right - firstBoxRect.left <= 20 &&
    secondBoxRect.right - firstBoxRect.left >= -20 &&
    secondBoxRect.bottom - firstBoxRect.bottom <= 50 &&
    secondBoxRect.top - firstBoxRect.top >= -50
  ) {
    box2.style.left = firstBoxRect.left - box2.offsetWidth + 'px';
    box2.style.top = firstBoxRect.top + 'px';
    box2.style.borderRadius = '10px 0px 0px 10px';
    box1.style.borderRadius = '0px 10px 10px 0px';
    isStuck.status = true;
    isStuck.position = 'left';
    isStuck.box = 2;
  }
  // ПРИЛИПАНИЕ СВЕРХУ
  if (
    secondBoxRect.bottom - firstBoxRect.top <= 20 &&
    secondBoxRect.bottom - firstBoxRect.top >= -20 &&
    secondBoxRect.left - firstBoxRect.left <= 50 &&
    secondBoxRect.right - firstBoxRect.right >= -50
  ) {
    box2.style.top = firstBoxRect.top - box2.offsetWidth + 'px';
    box2.style.left = firstBoxRect.left + 'px';
    box2.style.borderRadius = '10px 10px 0px 0px';
    box1.style.borderRadius = '0px 0px 10px 10px';
    isStuck.status = true;
    isStuck.position = 'top';
    isStuck.box = 2;
  }
  // ПРИЛИПАНИЕ СНИЗУ
  if (
    secondBoxRect.top - firstBoxRect.bottom <= 20 &&
    secondBoxRect.top - firstBoxRect.bottom >= -20 &&
    secondBoxRect.left - firstBoxRect.left <= 50 &&
    secondBoxRect.right - firstBoxRect.right >= -50
  ) {
    box2.style.top = firstBoxRect.bottom + 'px';
    box2.style.left = firstBoxRect.left + 'px';
    box2.style.borderRadius = '0px 0px 10px 10px';
    box1.style.borderRadius = '10px 10px 0px 0px';
    isStuck.status = true;
    isStuck.position = 'bottom';
    isStuck.box = 2;
  }
}
