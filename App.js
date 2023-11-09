// Supports ES6
// import { create, Whatsapp } from '@wppconnect-team/wppconnect';
  const fs = require('fs');
  const wppconnect = require('@wppconnect-team/wppconnect');
  
  wppconnect
    .create({
      session: 'my_session1',
      catchQR: (base64Qr, asciiQR) => {
        console.log(asciiQR); // Optional to log the QR in the terminal
        var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
          response = {};
  
        if (matches.length !== 3) {
          return new Error('Invalid input string');
        }
        response.type = matches[1];
        response.data = new Buffer.from(matches[2], 'base64');
  
        var imageBuffer = response;
        require('fs').writeFile(
          'out.png',
          imageBuffer['data'],
          'binary',
          function (err) {
            if (err != null) {
              console.log(err);
            }
          }
        );
      },
      logQR: false,
    })
    .then((client) => start(client))
    .catch((error) => console.log(error));
function start(client){
    console.log("client est actif")
    listen_messages(client)
}
function listen_messages(client){
    client.onMessage((msg)=>{
        const wa_id = msg.from
        const text = msg.body; // Contenu du message reçu
        const message = text
        

        client.sendText(wa_id, message)
    })
}