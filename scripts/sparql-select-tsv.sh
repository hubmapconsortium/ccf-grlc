#!/bin/bash

endpoint=$1
query=$2
# https://ubergraph.apps.renci.org/sparql

curl -H "Accept: text/tab-separated-values" --data-urlencode "query@${query}" $endpoint
