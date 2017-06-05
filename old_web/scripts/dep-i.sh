#!/usr/bin/env bash

# Install jekyll dep
bundle install

gem install html-proofer

# Install node dep
npm install gulp -g
npm install