FROM node:latest
RUN mkdir -p /opt/app
WORKDIR /opt/app
RUN adduser --disabled-password app
COPY . .
RUN chown -R app:app /opt/app
USER app
RUN npm install
RUN npm i @angular/cli
EXPOSE 4200
CMD [ "npm", "start" ]

