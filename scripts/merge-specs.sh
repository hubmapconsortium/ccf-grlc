#!/bin/bash

 # Merge specs
npx -y openapi-merge-cli --config ./openapi-merge-config.json

# Fix server URL
perl -i -pe 's/\/subdir\/hra\//\/subdir/g' ./cached-specs/merged.json
