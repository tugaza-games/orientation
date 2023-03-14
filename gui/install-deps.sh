#!/bin/bash

DIR=`dirname "${BASH_SOURCE[0]}"`
if [[ -f $DIR/bootstrap.sh ]]
then
    . $DIR/bootstrap.sh
else
    echo "bootstrap not found"
    exit 256
fi

rm -rf modules/logs/logger
dependencies::depends "logs/logger"
rm -rf modules/queue/client
dependencies::depends "queue/client"
