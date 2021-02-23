function getselected(targetid)
        { element=document.getElementById(targetid);   
          var selvalues = [];
          for (var i = 0; i < element.options.length; i++) {
            if (element.options[i].selected) {
              var li = document.createElement('li');
              li.appendChild(document.createTextNode(element.options[i].value));
              selvalues.push(element.options[i].value)
            }
          }
          return selvalues;
        } 

function groupby(array,identifier) {
            var r = [];
            //str.split(',');
           //console.log("classifiers");console.log(classifiers)
            //console.log("identifier"); console.log(identifier)
            if(identifier!="instrumentfilter"){
            for (let step = 0; step < array.length; step++) {
                  thisitem=array[step].classifiers[identifier]
                if( $.inArray(thisitem, r)<0 & thisitem!=undefined ){r.push(thisitem);}
            } 
          }

          if(identifier=="instrument"){
            var r = [];
            for (let step = 0; step < array.length; step++) {
              theseitems=array[step].classifiers["instrumentlist"]
            r=r.concat(theseitems)

        }
        

            }
            r= Array.from(new Set(r))
            r = r.filter(function (el) {

              return el != null && el != "";
          
            });
            if(identifier!="Status"){r=r.sort()}
            return r
          }

function createddown(modein,csel)
        { 
          for (let stepd = 0; stepd < filters.length; stepd++){
              selin= csel[stepd]
                  
              thisfilter=filters[stepd]
              var option=[];    var grps=[]
              ddlmissions = document.getElementById(thisfilter.concat("filter"));
              ddlmissions.options.length=0
              redmissions=missions
                    for (let stepx = 0; stepx < filters.length; stepx++){
                      thisfilterx=filters[stepx]
                      if(thisfilterx!=thisfilter){
                       // console.log(filters[stepx])
                        selvalues=getselected(filters[stepx].concat("filter"))
                        if(selvalues.length>0){ redmissions=filterby(redmissions,filters[stepx],selvalues ) }
                      }
                      } 
              grps=groupby(redmissions,thisfilter)
              for (var i = 0; i <  grps.length; i++) {
                option = document.createElement("OPTION")
                    option.innerHTML =  grps[i]; option.value =  grps[i]; if(selin.includes(grps[i])) { option.selected =  true; }else{  option.selected =  false}
                  ddlmissions.options.add(option);
              }
          }
          if(modein=="update"){$("select").bsMultiSelect('UpdateData')}
        }

function filterby(array,identifier,selectlist) {
        var redjson= [];
        for (let step = 0; step < array.length; step++) {
          try {
              thisitem=array[step].classifiers[identifier].toString() 
              }
              catch(error) {  thisitem="something happened" }
          for (let stepx = 0; stepx < selectlist.length; stepx++) {
                  if( thisitem.includes(selectlist[stepx]) ){redjson.push(array[step])} 
          }
        }

return redjson;
        }

function Geturl(){          
          var simpleCrypto = new SimpleCrypto("url_t_j");
          var tp=simpleCrypto.decrypt(ct)
          var Httpreq = new XMLHttpRequest(); // a new request
          Httpreq.open("GET",tp,false);
          Httpreq.send(null);
          return Httpreq.responseText;          
      }

function applyfilter(opmode)
        {
        var plotjson= {}; 
        redmissions=missions
        csel=[]
        for (let step = 0; step < filters.length; step++){
            if(opmode==0){selvalues=getselected(filters[step].concat("filter"))}else{selvalues=[]}
            csel.push(selvalues)
            if(selvalues.length>0){ redmissions=filterby(redmissions,filters[step],selvalues ) }
          }


plotjson["events"]=redmissions
var span = document.getElementById("contentcount"); 
           
if(plotjson["events"].length==1){span.innerText ="1 mission" } else{span.innerText = plotjson["events"].length.toString().concat( " missions"); }        

          plotjson["title"]=titleinfo
  timeline = new TL.Timeline('timeline-embed',plotjson);
  //document.getElementsByClassName("tl-slidenav-next")[0].click()
  

  createddown("update",csel)
}


var filters=["Status","Type","Target","Launch Location","instrument","Mission Name"]
var csel={}
var ct="9f17a86a6a9a7656f2bebd0d347ce936349027b590b26ce64bc7686e6167a6313UAKAq6lRsK8ho4zi6xV74IfFOM/F9QhsDt6DYlhmKm/cbBUEsfxKtefjjxULP+v9ce8f231664c7b1e2103f75809675f09bf3638c4e53d17e3d24dfcd617228697"
var myjson = JSON.parse(Geturl());
var titleinfo= {
      "media": {
        "url": "./images/NASA-JPL-Logo.jpg",
        "caption": "",
        "credit": ""
      },
      "text": {
        "headline": "<h5>JPL Missions</h5>",
        "text":"<div class='navBarT'>   <p>This is an interactive timeline of all Jet Propulsion Laboratory(JPL) missions. The data is based on JPL's  <a href='https://www.jpl.nasa.gov/missions/'> missions page</a>. People with a spirit of curiosity might like the opportunity to explore the timeline  (quadratic pun intended). </p>  <br> <ul> <li> Use the filters on the top to narrow down the items in the list.</li> <ul> <li> Note that the filters are tied and avaliable options will update dynamically!</li></ul> <li>  Use keyboard arrows or mouse to navigate the timeline.</li>   <li> Please enjoy/comment/share: Note the buttons on the right top to share the page! </li> <li> Contact me at quarktetra@gmail.com  or http://twitter.com/quarktetra for questions. </li> </ul> <br> <br> <strong>Credit for all images and data on this page: Courtesy NASA/JPL-Caltech. </strong> <br><br><br><span style='font-size:2vw;color:orange'> Use fullscreen (F11) for a better viewing.</span> </div>"
      
      }
      }
myjson["title"]=titleinfo



  $(document).ready(function() {
      var embed = document.getElementById('timeline-embed');
      embed.style.height = getComputedStyle(document.body).height;
      window.timeline = new TL.Timeline('timeline-embed', myjson, {
          hash_bookmark: false
      });
      window.addEventListener('resize', function() {
          var embed = document.getElementById('timeline-embed');
          embed.style.height = getComputedStyle(document.body).height;
          timeline.updateDisplay();
      })
  });   




missions= myjson.events
var span = document.getElementById("contentcount"); 
span.innerText =missions.length.toString().concat( " missions");      

var rmyjson = {}
createddown("initialize",[[],[],[],[],[],[]])   



$(document).ready(function() {
  $("#resetbutton").click(function(){
      span.innerText =missions.length.toString().concat( " missions"); 
      
      applyfilter(1)
      createddown("initialize",[[],[],[],[],[],[]]) 
      $("select").bsMultiSelect('UpdateData')

  }); 
});
        
