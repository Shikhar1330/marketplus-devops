#!/usr/bin/env bash
cp -n .env.example .env || true
docker compose up --build
