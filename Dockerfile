FROM node:14.20.0
LABEL authors="aarancis"

EXPOSE 4200

#RUN apk add --update tini
WORKDIR '/app'

COPY ./package.json ./

RUN npm install

COPY . .

# Serve files on port 3000
CMD ["npm", "run", "serve:mf"]
