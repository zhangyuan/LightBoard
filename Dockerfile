FROM node:9

WORKDIR /app

COPY server/ /app/server
COPY client/ /app/client
COPY package.json package-lock.json /app/

RUN npm install --unsafe-perm && (cd server && npm install --unsafe-perm) && (cd client && npm install --unsafe-perm)

CMD ["npm", "run", "dev"]