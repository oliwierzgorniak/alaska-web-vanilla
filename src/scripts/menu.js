/*! license: https://codepen.io/helloroman/details/jONLXVr */
const menuButton = document.querySelector("#menu-button");
const menu = document.querySelector("#menu");
const menuBg = document.querySelector("#menu-bg");
const menuLinks = document.querySelectorAll("#menu ul a");

const handleClick = () => {
  menuButton.classList.toggle("menu-button--active");
  menuBg.classList.toggle("menu-bg--active");
  menu.classList.toggle("menu--active");
};

menuButton.addEventListener("click", handleClick);
menuBg.addEventListener("click", handleClick);
menuLinks.forEach((link) => {
  link.addEventListener("click", handleClick);
});
