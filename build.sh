#!/usr/bin/env sh

set -e

cd /usr/share/nginx/html/

rm -rf release

mv dist/release ./

rm -rf dist
