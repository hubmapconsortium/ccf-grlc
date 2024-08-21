#!/bin/bash

NAME=$1

curl -s https://grlc.io/api-git/hubmapconsortium/ccf-grlc/subdir/${NAME}/swagger -o cached-specs/${NAME}.json
