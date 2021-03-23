/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import "./index.scss";
import data from "./data.json";

console.log(
  '👋 This message is being logged by "renderer.js", included via webpack'
);
// console.log(data);
// import "./fonts/red-hat-text-v3-latin/red-hat-text-v3-latin-regular.ttf";

const daysdiv = document.querySelector(".daysdiv");
const datadiv = document.querySelector(".datadiv");

let html = ``;
for (const property in data) {
  let str = property.charAt(0).toUpperCase() + property.slice(1);
  html = html + `<li>${str}</li>`;
}
daysdiv.innerHTML = html;

const lis = document.querySelectorAll("li");

for (let i = 0; i < lis.length; i++) {
  lis[i].addEventListener("click", click);
}

const today = gettoday();
lis[today].click();

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

function gettoday() {
  let datetime = new Date();
  console.log(datetime.getDay());
  let today = (datetime.getDay() + 7 - 1) % 7;
  return today;
}

function click() {
  // console.log(this);
  for (let i = 0; i < lis.length; i++) {
    lis[i].classList.remove("active");
  }
  this.classList.add("active");
  let timenow = formatAMPM(new Date());
  let date = this.innerHTML.toLowerCase();
  let schedule = data[date];
  let html = ``;
  for (let i = 0; i < schedule.length; i++) {
    if (
      timenow >= schedule[i].start &&
      timenow <= schedule[i].end &&
      lis[today] === this
    )
      html = html + ">> ";
    html =
      html +
      `${schedule[i].start}-${schedule[i].end} ${schedule[i].subject}<br>`;
  }
  if (html) datadiv.innerHTML = html;
  else {
    html = "ALL WAITING!";
    datadiv.innerHTML = html;
  }
}
// init();
