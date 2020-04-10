function addgroup() {
    adminname  = document.getElementById("adminname").value;
    groupname  = document.getElementById("groupname").value;
    grouploc  = document.getElementById("grouploc").value;
    groupchannel  = document.getElementById("groupchannel").value;
    groupdesc  = document.getElementById("groupdesc").value;
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST",  "http://52.204.175.119:3000/api/addgroup", true);
    xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhttp.send(JSON.stringify({ "adminname": adminname, "groupname": groupname, "grouploc": grouploc, "groupchannel": groupchannel, "groupdesc": groupdesc }));
    xhttp.onreadystatechange = function(){
      if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.response);
        filename = data.cid[0].path;
        fname = "https://ipfs.io/ipfs/"+ filename;
        document.getElementById("addedfile").innerHTML=fname;
        document.getElementById("addedfile").href=fname;
      }
    };
}
