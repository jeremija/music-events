#!/bin/bash

set -e

LOCATION=`dirname $0`
FILENAME=`basename $0`
COLOR="true"

if [ $# -ne 3 ]; then
    echo "usage $FILENAME SERVER REMOTE_PATH SERVICE_NAME"
    exit 0;
fi

DIST="$LOCATION/dist"
PACKAGE="$LOCATION/package.json"
SERVER=$1
REMOTE_PATH=$2
SERVICE_NAME=$3
REMOTE="$SERVER:$REMOTE_PATH"
#COPY_COMMAND="scp -r $DIST $REMOTE"
COPY_COMMAND="rsync -ru --delete --progress $DIST $PACKAGE $REMOTE"
POST_COMMAND="ssh -t $SERVER sudo restart $SERVICE_NAME"

if [ "$COLOR" == "true" ]; then
	YELLOW='\e[93m'
	GREEN='\e[32m'
	RED='\e[31m'
	# disables color output
	NC='\e[39m'
fi

if [ "$1" == "--help" ] || [ "$1" == "-h" ]; then
	echo "usage: $FILENAME [ --help | -h | --no-confirm ]"
	echo " "
	echo "    -h, --help"
	echo "        shows this help text"
	echo " "
	echo "    --no-confirm"
	echo "        does not prompt for settings confirmation"
	echo " "
	exit 0
fi

if [ "$1" != "--no-confirm" ]; then
	echo -e $YELLOW"please verify the following:"$NC
	echo " "
	echo -e "  source:       $GREEN$DIST$NC"
	echo -e "  destination:  $GREEN$REMOTE$NC"
	echo " "
	echo -e "  copy command: $GREEN$COPY_COMMAND$NC"
	echo -e "  post command: $GREEN$POST_COMMAND$NC"
	echo " "
	echo -e "press enter to continue or ctrl+c to cancel..."
	read -s
fi

if [ ! -d "$DIST" ]; then
	echo -e $RED"folder $DIST does not exist. Did you run \`make all\`?"$NC
	exit 1;
fi

echo -e $YELLOW"copying files..."$NC
echo $COPY_COMMAND
$COPY_COMMAND

echo -e $YELLOW"executing post command..."$NC
echo $POST_COMMAND
$POST_COMMAND

echo -e $YELLOW"done!"$NC
