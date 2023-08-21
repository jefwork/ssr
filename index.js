// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const venom = require('venom-bot');
const cron = require('node-cron');
var moment = require('moment-timezone');


venom
  .create({
    session: 'session-name', //name of session
    multidevice: false // for version not multidevice use false.(default: true)
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });


function start(client) {

  //ALARMES
  //BOM DIA
  cron.schedule('30 05 * * *', () => {
    sendGreeting(client, '☀️ Bom dia! Desejo a todos um excelente dia!');
  });
  //BOA TARDE
  cron.schedule('30 12 * * *', () => {
    sendGreeting(client, 'Uma tarde cheia de energia e produtividade a todos, Boa tarde!');
  });
  //BOA NOITE
  cron.schedule('34 22 * * *', () => {
    sendGreeting(client, '🌕 Que esta noite traga paz e tranquilidade para sua mente e coração. Boa noite!');
  });


  //via comando
  client.onMessage((message) => {
    if (message.body === '/ola' && message.isGroupMsg === true) {
      const sender = message.sender.pushname;
      client
        .sendText(message.from, `Olá ${sender}, eu sou o NOBRIA um inteligência artificial em desenvolvimento, espero que esteja bem! Atualmente, estou em processo de desenvolvimento e em breve passarei por melhorias significativas. Estou sendo criado pelo meu amigo Alan, que está dedicando esforços "Quando ele tem tempo 😡" para aprimorar minhas capacidades. Fico animado com a perspectiva de me tornar mais avançado com o tempo. Se houver algo que você queira discutir ou compartilhar, estou aqui para ouvir, Se você quiser enviar uma sugestão, pode fazê-lo da seguinte forma: digite "/sugestao [sua mensagem]". Estou aqui para ajudar!`)
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });

    } else if (message.body === '/iddogrupo' && message.isGroupMsg === true) {

      const groupId = message.chatId;
      client.sendText(message.from, `O ID do grupo é: ${groupId}`)

        .then((result) => {
          console.log('Result: ', result);
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });


      } else if (message.isGroupMsg && message.body.startsWith('/sugestao ')) {
        
        // const sender = message.sender.pushname;
        // client.sendText(message.from, `Olá ${sender} anotado! Obrigado pela sugestão!`)
  
        //   .then((result) => {
        //     console.log('Result: ', result);
        //   })
        //   .catch((erro) => {
        //     console.error('Error when sending: ', erro); //return object error
        //   });
  
       
        const suggestion = message.body.slice('/sugestao '.length);
        const sender = message.sender.pushname || 'Usuário';
        
        const response = `Obrigado, ${sender}, pela sugestão: "${suggestion}"`;
        
         client.sendText(message.from, response);
    
      

    } else if (message.body === '/kxb6901' && message.isGroupMsg === false) {
      logout();
    }
  });



  function  sendGreeting(client, greeting) {
    //558398078291-1387496096@g.us - familia
    //120363169923968691@g.us - dev
    client.sendText('558398078291-1387496096@g.us', greeting)
      .then((result) => {
        console.log('Result: ', result); //return object success
      })
      .catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
      });

  }


  //via comando
  // client.onMessage((message) => {
  //   if (message.body === '/iddogrupo' && message.isGroupMsg === true) {

  //     client.sendText(message.from, 'O ID do grupo é:')
  //       .then((result) => {
  //         console.log('Result: ', result); 
  //       })
  //       .catch((erro) => {
  //         console.error('Error when sending: ', erro); //return object error
  //       });
  //   }
  // });

  //sair do zap


}

    //Envia msg para mim.
    // client.sendText('558396208037@c.us', '👋 Olá tudo bem?')
    // .then((result) => {
    //   console.log('Result: ', result); //return object success
    // })
    // .catch((erro) => {
    //   console.error('Error when sending: ', erro); //return object error
    // });

