"use strict";

window.onload = function () {
  var hamburger = document.querySelector('.burger-container');
  hamburger.addEventListener('click', function () {
    console.log(this);
  });
};