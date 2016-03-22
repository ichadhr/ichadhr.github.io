#!/usr/bin/env bash

# emoji
cd ../
bash emoji.sh

# Install ruby dep
gem install bundler

# Install node dep
npm install gulp -g