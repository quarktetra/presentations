function executemode(this) {
  var i, tabcontent, tablink;
  alert(this.id)

  tablink = document.getElementsByClassName("tablink");
  for (i = 0; i < tablink.length; i++) {
    
    tablink[i].className = tablink[i].className.replace(" w3-green", "");
    
    
  }
}