#!/usr/bin/env bash
set -e
node src/db/waitForDb.js
npm start
