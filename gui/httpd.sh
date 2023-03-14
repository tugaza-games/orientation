#!/bin/bash
trap "exit" EXIT
DIR=`dirname "${BASH_SOURCE[0]}"`
if [[ -f $DIR/bootstrap.sh ]]
then
    . $DIR/bootstrap.sh
else
    echo "bootstrap not found"
    exit 256
fi

bootstrap_load_module http/server

httpd::ssl_listen 0.0.0.0 443