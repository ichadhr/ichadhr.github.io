#!/bin/bash
# coded : @ichadhr

# coloring
#normal=$(tput sgr0)                      # normal text
normal=$'\e[0m'                           # (works better sometimes)
bold=$(tput bold)                         # make colors bold/bright
red="$bold$(tput setaf 1)"                # bright red text
green=$(tput setaf 2)                     # dim green text
fawn=$(tput setaf 3); beige="$fawn"       # dark yellow text
yellow="$bold$fawn"                       # bright yellow text

# make clean
echo -en "\e[H\e[J\e[3J"

# Ask user to input title, description, etc
echo "=============================="
echo "Yoo.. create new Jekyll post :"
echo "=============================="
echo -en '\n'
echo -en '\n'

# initial date
DATE=`date +%Y-%m-%d`

# get input from user
read -p 'Title Post: ' TITLEPOST
# make sure input user not empty
while [[ -z "${TITLEPOST}" ]]; do
    echo "That was empty, do it again!"
    read -p 'Title: ' TITLEPOST
done
read -p 'Introduction: ' INTPOST
read -p 'Category: ' CATPOST

# formated post title
FIL_TITLEPOST="${TITLEPOST//[^[:alnum:][:space:]]/}"
URL_TITLEPOST="$(echo $FIL_TITLEPOST)"
URL_TITLEPOST="${URL_TITLEPOST// /-}"
URL_TITLEPOST="${DATE}-${URL_TITLEPOST}"

FILENAME="_posts/${URL_TITLEPOST}.md"

echo -en '\n'
echo -en '\n'

if [ -d "_posts" ]; then
    if [[ -e ${FILENAME} && ! -L ${FILENAME} ]]; then
        echo "File exists : ${yellow}${FILENAME}"
        echo -en '\n'
        echo "${red}Abort!! ${red}Abort!! ${red}Abort!!"
        echo -en '\n'
        echo -en '\n'
    else

        # create file
        echo "Creating new post: ${green}${FILENAME}"
        touch ${FILENAME}

        # insert to file
        echo "---" >> ${FILENAME}
        echo "layout: post" >> ${FILENAME}
        echo "title: ${TITLEPOST}" >> ${FILENAME}
        echo "introduction: ${INTPOST}" >> ${FILENAME}
        echo "category: ${CATPOST}" >> ${FILENAME}
        echo "recomended: false" >> ${FILENAME}
        echo "published: true" >> ${FILENAME}
        echo "---" >> ${FILENAME}
    fi
else
    echo "is it root directory of Jekyll ? can't find folder ${yellow}_post"
fi