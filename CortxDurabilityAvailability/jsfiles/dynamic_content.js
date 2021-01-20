function executemode(evt, readmode) {
  var i, tabcontent, tablink;

  tablink = document.getElementsByClassName("tablink");
  for (i = 0; i < tablink.length; i++) {
    
    tablink[i].className = tablink[i].className.replace(" w3-green", "");
    
    
  }
  if(readmode=="Digest"){
    
    
    window.scrollTo({ 
  top: 0, // negative value acceptable
  left: 0, 
  behavior: 'smooth' 
});
    
    
    
  }
  
    tabcontent = document.getElementsByClassName("tabcontent");
  
  for (i = 0; i < tabcontent.length; i++) { 
    if(readmode.concat("toc")==tabcontent[i].id){tabcontent[i].style.display = "block"}else{tabcontent[i].style.display = "none"}
     
  
  }
  
   
  evt.currentTarget.className += " w3-green";
  var x = document.getElementsByClassName("w3-bar-item w3-button tablink");
  var arr = []; for (i = 0; i < x.length; i++) {  arr.push(x[i].id);}
  var d
  var texttosearch
 // console.log(arr);
  //console.log(readmode);
  var datau=[];// these will be the identifiers of items to be removed from TOC
  for (d = 0; d < arr.length; d++) {//arr.length;
    texttosearch=arr[d];
    x = document.querySelectorAll('[class*=\"'+texttosearch+'\"]')
    // console.log(x);
    for (i = 0; i < x.length; i++) {
      
      if(texttosearch==readmode){x[i].style.display = "block";}else{
        datau.push(x[i].childNodes[1].getAttribute("data-unique"))
        x[i].style.display = "none";
        
      }
      //console.log(x[i].childNodes.length);
      //console.log(x[i]);
      //console.log(x[i].childNodes[1].getAttribute("data-unique"));
      //console.log(x[i].getAttribute("name"));
      
      
    } 
    
  }
  
  //console.log(datau);
  //alert(datau)
  x = document.getElementById("TOC"); 
  var uls= x.getElementsByTagName("ul");
  for (d = 0; d < uls.length; d++) {//arr.length;
    var lititem=uls[d].getElementsByTagName("li")[0];
    
     if(datau.includes(lititem.getAttribute("data-unique"))){uls[d].style.display = "none"}else{uls[d].style.display = "block"}
  }
  
  
}
function findPos(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    return [curtop+400];
    }
}


