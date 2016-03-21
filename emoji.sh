#!/bin/bash

echo -e "GET https://github.com HTTP/1.0\n\n" | nc github.com 80 > /dev/null 2>&1

FOLDER="assets/img/emoji"
FILE="assets/css/emoji.scss"
FILEMAP="assets/css/_emoji.map.scss"
DEST="assets/img/emoji"
CURDIR=`pwd`

var1="e1a"
var2="emo"
var3="emojione-awesome"
var4="emoji"

svgext="\/\/cdn.jsdelivr.net\/emojione\/assets\/svg"
svglocal="..\/img\/emoji"

if [ $? -eq 0 ]; then
     svn export https://github.com/Ranks/emojione/trunk/lib/emojione-awesome/emojione-awesome.scss
     svn export https://github.com/Ranks/emojione/trunk/lib/emojione-awesome/_emojione-awesome.map.scss

     # Replace
     sed -i -e 's/'"$var1"'/'"$var2"'/g' "emojione-awesome.scss" && sed -i -e 's/'"$svgext"'/'"$svglocal"'/g' "emojione-awesome.scss" && sed -i -e 's/'"$var3"'/'"$var4"'/g' "emojione-awesome.scss"

     # Check folder and move
     if [ -d $FOLDER ]; then
        cd $FOLDER
        echo "updating emoji svg"
        svn up
        cd $CURDIR

     else
        echo "downloading emoji svg"
        svn checkout https://github.com/Ranks/emojione/trunk/assets/svg
        mv svg $FOLDER
     fi

     # Check file and move
     if [ -f $FILE ]; then
        rm $FILE
        mv emojione-awesome.scss $FILE
     else
        mv emojione-awesome.scss $FILE
     fi

     # Check file and move
     if [ -f $FILEMAP ]; then
        rm $FILEMAP
        mv _emojione-awesome.map.scss $FILEMAP
     else
        mv _emojione-awesome.map.scss $FILEMAP
     fi
else
    echo "GitHub not reachable"
fi