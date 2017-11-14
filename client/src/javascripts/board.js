const board = {};

export default board;

import io from 'socket.io-client';

const socket = io(`http://${process.env.SERVER_NAME}:3000`);

socket.on('subscribed', function(data){
  board.id = data.id;
});

board.socket = socket;

