import koa from 'koa.io';
import crypto from 'crypto';

export const app = koa();

app.io.use(function* (next) {
  yield* next;
});

app.io.route('hi', function* ()  {
  const id = yield randomHex();
  this.join(id);
  this.emit('subscribed', {id});
});

app.io.route('subscribe', function* (next, data)  {
  const id = data.id;
  this.join(id);
  this.emit('subscribed', {id});
});

app.io.route('update', function* (next, data)  {
  this.in(data.id).emit('updated', {text: data.text});
});

const randomHex = async () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(10, function(err, buffer) {
      if(err) {
        return reject(err);
      }
      return resolve(buffer.toString('hex'));
    });
  })
};