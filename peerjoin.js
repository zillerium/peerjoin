function addgroup() {
    adminname  = document.getElementById("adminname").value;
    groupname  = document.getElementById("groupname").value;
    longitude  = document.getElementById("longitude").value;
    latitude  = document.getElementById("latitude").value;
    groupchannel  = document.getElementById("groupchannel").value;
    groupdesc  = document.getElementById("groupdesc").value;
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST",  "http://52.204.175.119:3000/api/addgroup", true);
    xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhttp.send(JSON.stringify({ "adminname": adminname, "groupname": groupname, "longitude": longitude, "latitude" : latitude, "groupchannel": groupchannel, "groupdesc": groupdesc }));
    xhttp.onreadystatechange = function(){
      if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.response);
        if (data.message === "Correct") {
	      document.getElementById("message").innerHTML="Your group was added";
	} else {
              document.getElementById("message").innerHTML="There was an error";
	}
      }
    };
}

function getgroup() {
    minlongitude  = document.getElementById("minlong").value;
    maxlongitude  = document.getElementById("maxlong").value;
    minlatitude  = document.getElementById("minlat").value;
    maxlatitude  = document.getElementById("maxlat").value;
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST",  "http://52.204.175.119:3000/api/getgroup", true);
    xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhttp.send(JSON.stringify({ "minlongitude": minlongitude, "maxlongitude": maxlongitude, "minlatitude": minlatitude, "maxlatitude" : maxlatitude }));
    xhttp.onreadystatechange = function(){
      if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.response);
	     var text="";
        if (data.message === "Correct") {
               for (i = 0, len = data.doc.length; i < len; i++) { 
                  text += data.doc[i].Longitude + " " +  data.doc[i].Latitude + "<br>";
               }

              document.getElementById("message").innerHTML=text;
        } else {
              document.getElementById("message").innerHTML="data not read";
        }
      }
    };
}

