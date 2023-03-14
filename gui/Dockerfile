FROM debian:buster-slim
RUN apt-get update && apt-get install -y socat git wget redis-tools jq curl imagemagick file procps apache2-utils bc
CMD ["/bin/bash", "/src/httpd.sh"]