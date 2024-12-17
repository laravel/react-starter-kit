#!/bin/bash

cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
npm install
npm run dev