import { createTransport } from 'nodemailer';

var transporter = createTransport({
  service: 'gmail',
  auth: {
    user: 'example@gmail.com',
    pass: 'application password'
  }
});

let friedaAvailable = false;
let counter = 0;
const scraper = async () => {
    counter += 1;
    // Go to the housing availabilities page, go to network tab in dev tools, refresh, right click
    // on the network request for the page, click copy as node.js fetch, and then paste below in the ().
    let response = ().catch (err => console.log(err));

    let text = await response.text();
    let residenceHalls = ["Hillenbrand", "Frieda", "Winifred"]
    let availHalls = []
    let hallsAvailable = ""
    for (const hall of residenceHalls) {
        if (text.includes(hall)) {
            console.log(hall + " available")
            hallsAvailable += (hall + "\n")
            availHalls.push(hall);
        }
    }
    if (availHalls.includes("Frieda") || availHalls.includes("Winifred")) {
        console.log("Frieda avaliable: ", new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }));
        if (!friedaAvailable) {
          var mailOptions = {
              from: 'x@gmail.com',
              to: 'a@gmail.com',
              subject: 'FRIEDA AVAILABLE',
              text: hallsAvailable
          };
          transporter.sendMail(mailOptions, function(error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
          });
          friedaAvailable = true;
        }
    } else {
      friedaAvailable = false;
    }
    console.log("Still Running: ", new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }));
}
setInterval(scraper, 5000);