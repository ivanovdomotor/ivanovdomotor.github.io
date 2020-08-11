function openWin() {
  let width = screen.availWidth;
  let height = screen.availHeight;
  myWindow = window.open("../game/mygame.html", "", `width=${width}, height=${height}`);
  myWindow.focus();
}