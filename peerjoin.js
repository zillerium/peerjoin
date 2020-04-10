function addgroup() {
    imagename  = document.getElementById("imagename").value;
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST",  "http://52.86.59.30:3000/api/saveipfsimage", true);
xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhttp.send(JSON.stringify({ "imagename": imagename }));

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
