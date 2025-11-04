FROM node:20 AS builder
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM node:20
WORKDIR /app

COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package.json /app/package-lock.json ./

RUN npm install --omit=dev

EXPOSE 4200

CMD ["npm", "start"]