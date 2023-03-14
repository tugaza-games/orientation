#!/bin/bash

DIR=`dirname "${BASH_SOURCE[0]}"`
if [[ -f $DIR/bootstrap.sh ]]
then
    . $DIR/bootstrap.sh
else
    echo "bootstrap not found"
    exit 256
fi

bootstrap_load_module http/http
bootstrap_load_module http/webauth
bootstrap_load_module routes/routes

while [[ `ps ax | grep -c /cgi-bin/app.sh` -gt MAX_CONCURRENCY ]]; do
sleep 0.1;
done;

# run.
http::parse
webauth::init

route=`http::get_param route`
routes::headers "$route"
http::set_header "Content-Type" "text/html; charset=UTF-8"
http::set_header "X-Powered-By" "YEAHBASH"
out=`routes::show "$route"`
http::output_start
echo "$out"
http::clean_files