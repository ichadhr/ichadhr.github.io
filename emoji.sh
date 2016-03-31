#!/usr/bin/env bash

echo -e "GET https://github.com HTTP/1.0\n\n" | nc github.com 80 > /dev/null 2>&1

FOLDER="assets/img/emoji/unicode"
DEST="assets/img/emoji/unicode"
EMOJI="emoji"
CURDIR=`pwd`

if [ $? -eq 0 ]; then

     # Check folder if found then update else download and move
     if [ -d $FOLDER ]; then
        cd $FOLDER
        echo "updating emoji png"
        svn up
        cd $CURDIR
     else
        echo "downloading emoji png"
        svn checkout https://github.com/Ranks/emojione/trunk/assets/png
        mkdir assets/img/emoji
        mv png $FOLDER
     fi
else
    echo "GitHub not reachable"
    exit 1
fi