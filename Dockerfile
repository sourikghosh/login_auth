FROM node:12.20.0-alpine3.10 AS base 
WORKDIR /baseBuild
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
COPY ./ ./
RUN npm run build


FROM base
WORKDIR /app
COPY --from=base /baseBuild/package*.json ./
RUN npm ci --production
COPY --from=base /baseBuild/dist ./src
RUN rm -rf ../baseBuild
EXPOSE 5001

CMD ["npm","start"]