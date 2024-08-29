#!/bin/bash

mkdir -p cached-specs
rm -f cached-specs/*

for f in */*.rq; do
  name=`dirname $f`
  if [ ! -e cached-specs/${name}.json ]; then
    ./scripts/cache-spec.sh $name
  fi
done

./scripts/merge-specs.sh
