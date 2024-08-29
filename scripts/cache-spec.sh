#!/bin/bash

NAME=$1

# Generate the Grlc API Spec
curl -s https://grlc.io/api-git/hubmapconsortium/ccf-grlc/subdir/${NAME}/swagger -o cached-specs/${NAME}.temp.json

# Fix the schemes array
perl -i -pe 's/\"schemes\"\:\[\]/\"schemes\"\:\[\"https\"\]/g' cached-specs/${NAME}.temp.json

# Convert to openapi 3
npx -y swagger2openapi cached-specs/${NAME}.temp.json --outfile cached-specs/${NAME}.json

# Cleanup
rm -f cached-specs/${NAME}.temp.json
