# syntax=docker/dockerfile:1

#-------------------------------------------------------------------------------
# Schritt 1: Deploybare App bauen (in einem temporären Container)
#-------------------------------------------------------------------------------
FROM node:17-alpine AS build
WORKDIR usr/src/app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "start"]

