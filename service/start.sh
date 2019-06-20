#!/usr/bin/env sh
redis-server &
sleep 5
node server.js
