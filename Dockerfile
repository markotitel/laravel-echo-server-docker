FROM node:12-alpine3.10
WORKDIR /root
COPY . .
RUN npm install
EXPOSE 6001
CMD ["node","server.js"]
