var aan = document.getElementById("button");
aan.addEventListener("click", turnOnLamp10Times);
var text = document.getElementById("zin");
var miho = document.getElementById("geld");
var inzet = document.getElementById("hoeveel");
inzet.addEventListener("click", anzu)
var momo;
var hana = inzet.value;;
function anzu() {
 hana = inzet.value;
 momo = Number(hana)
 miho.innerHTML = momo;
}
hana = inzet.value;
momo = Number(hana)
var geld = 1000;
miho.innerHTML = momo;

var intervalId;
var aantalKeerVeranderd;

function turnOnLamp10Times() {
text.innerHTML = "kijk naar de lampen en kijk of je gaat winnen";
miho.innerHTML = geld - momo;
geld = geld - momo;
aantalKeerVeranderd = 0;
intervalId = setInterval(turnOnLamp, 1000);
}

function turnOnLamp() {
beginnen();
aantalKeerVeranderd++;
if(aantalKeerVeranderd >= 10){
clearInterval(intervalId);
aan.disabled = false;
cheken();
}
}

var kleuren = ["0", "12750", "25500", "46920", "56100"]
var lamp_kleuren = ["", "", "", "", ""]

function beginnen(){
for (var lamp = 1; lamp < 6; lamp++) {
var nummer = Math.floor(Math.random()* kleuren.length);
lamp_kleuren[lamp-1] = kleuren[nummer];
sendRequest(lamp, '{"on": true, "hue": ' + kleuren[nummer] + ', "bri": 250}')
}
}

function sendRequest(lamp, body){
var http = new XMLHttpRequest();
http.open("PUT", "http://192.168.178.172/api/l1SJ36Y-mE6pM48fRULsOjfFIv2tyV68AWtcXNjB/lights/"+ lamp +"/state");
http.onreadystatechange = function() {
if(http.readyState == 4 && http.status == 200){
console.log(http.responseText);
}
}
http.send(body);
}

function cheken(){
if(lamp_kleuren[0] == lamp_kleuren[1] && lamp_kleuren[0] == lamp_kleuren[2] && lamp_kleuren[0] == lamp_kleuren[3] && lamp_kleuren[0] == lamp_kleuren[4]){
text.innerHTML = "200% van je inzet terug!";
miho.innerHTML = geld + momo*2;
}
if(lamp_kleuren[0] == lamp_kleuren[1] ||
lamp_kleuren[0] == lamp_kleuren[2] ||
lamp_kleuren[0] == lamp_kleuren[3] ||
lamp_kleuren[0] == lamp_kleuren[4] ||
lamp_kleuren[1] == lamp_kleuren[2] ||
lamp_kleuren[1] == lamp_kleuren[3] ||
lamp_kleuren[1] == lamp_kleuren[4] ||
lamp_kleuren[2] == lamp_kleuren[3] ||
lamp_kleuren[2] == lamp_kleuren[4] ||
lamp_kleuren[3] == lamp_kleuren[4]
){
text.innerHTML = "2 lampen, 40% van je inzet terug!";

miho.innerHTML = geld + momo*0.4;
}


if(lamp_kleuren[0] == lamp_kleuren[1] && lamp_kleuren[0] == lamp_kleuren[2] ||
lamp_kleuren[0] == lamp_kleuren[1] && lamp_kleuren[0] == lamp_kleuren[3] ||
lamp_kleuren[0] == lamp_kleuren[1] && lamp_kleuren[0] == lamp_kleuren[4] ||
lamp_kleuren[1] == lamp_kleuren[2] && lamp_kleuren[1] == lamp_kleuren[3] ||
lamp_kleuren[1] == lamp_kleuren[2] && lamp_kleuren[1] == lamp_kleuren[4] ||
lamp_kleuren[2] == lamp_kleuren[3] && lamp_kleuren[2] == lamp_kleuren[4]
){
text.innerHTML = "3 lampen, 75% van je inzet terug!";
miho.innerHTML = geld + momo*0.75;
}

if(lamp_kleuren[0] == lamp_kleuren[1] && lamp_kleuren[0] == lamp_kleuren[2] && lamp_kleuren[0] == lamp_kleuren[3] ||
lamp_kleuren[0] == lamp_kleuren[1] && lamp_kleuren[0] == lamp_kleuren[3] && lamp_kleuren[0] == lamp_kleuren[4] ||
lamp_kleuren[0] == lamp_kleuren[1] && lamp_kleuren[0] == lamp_kleuren[2] && lamp_kleuren[0] == lamp_kleuren[4] ||
lamp_kleuren[1] == lamp_kleuren[2] && lamp_kleuren[1] == lamp_kleuren[3] && lamp_kleuren[1] == lamp_kleuren[4]
){
text.innerHTML = "4 lampen, 120% van je inzet terug!";
miho.innerHTML = geld + momo*1.2;
}
}
