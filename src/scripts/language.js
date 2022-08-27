const select = document.querySelector("#language-select");

select.addEventListener("change", () => {
  const lang = select.value;
  location.pathname = lang === "pl" ? "" : "en";
});
