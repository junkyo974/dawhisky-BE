#!/bin/bash
REPOSITORY=/home/ubuntu/build

cd $REPOSITORY

npm ci
npm run build --if-present