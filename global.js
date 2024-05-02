function openNav() {
  document.querySelectorAll('.offCanvasMenu-backdrop').forEach(el => el.style.display = 'block');
  document.getElementById("Sidenav").style.width = "200px";
}

function closeNav() {
  document.getElementById("Sidenav").style.width = "0";
  document.querySelectorAll('.offCanvasMenu-backdrop').forEach(el => el.style.display = 'none');
}

const menuButton = document.getElementById("menu-button");
menuButton.addEventListener("click", function() {
  menuButton.classList.add("clicked");
  openNav();
});