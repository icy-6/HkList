#!/bin/sh

echo "启动更新程序"
cd /var/www/html || exit
php artisan app:check-app-status

exec "$@"
