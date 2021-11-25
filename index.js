// index.js

import Mustache from 'mustache';
import fs from 'fs'
const MUSTACHE_MAIN_DIR = './main.mustache';

/**
  * DATA is the object that contains all
  * the data to be provided to Mustache
*/

// set up the Github REST API call
import fetch from "node-fetch";

const project10K = 
  fetch("https://api.github.com/repos/nickanism/10k-hours")
  .then(res => res.json())
const project10KCommits = 
  fetch("https://api.github.com/repos/nickanism/10k-hours/commits")
  .then(res => res.json())
const rootProject = await project10K
const projectCommits = await project10KCommits

let DATA = {
  name: 'Woo Hyun An',
  date: new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
    timeZone: 'America/New_York'
  }),
  html_url: rootProject["html_url"],
  latest_commit: projectCommits[0].commit.message
};
console.log(DATA.html_url)
console.log(DATA.latest_commit)
/**
  * A - We open 'main.mustache'
  * B - We ask Mustache to render our file with the data
  * C - We create a README.md file with the generated output
  */
function generateReadMe() {
  fs.readFile(MUSTACHE_MAIN_DIR, (err, data) =>  {
    if (err) throw err;
    const output = Mustache.render(data.toString(), DATA);
    fs.writeFileSync('README.md', output);
  });
}
generateReadMe();