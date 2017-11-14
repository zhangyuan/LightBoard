FROM node:9

WORKDIR /app

COPY server/ /app/server
COPY client/ /app/client
COPY package.json package-lock.json go.sh /app/

RUN npm install --unsafe-perm && npm run build

CMD ["npm run dev"]