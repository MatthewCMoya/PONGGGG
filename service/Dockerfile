FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Bundle Source
COPY . .

RUN apt-get update && \
    apt-get install redis-server -y && \
    npm install
# If you are building your code for production
# RUN npm install --only=production

EXPOSE 3000
CMD [ "sh", "start.sh" ]
