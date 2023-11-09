// Supports ES6
// import { create, Whatsapp } from '@wppconnect-team/wppconnect';
const wppconnect = require('@wppconnect-team/wppconnect');


wppconnect
  .create({session: "my_session"})
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