#!/bin/sh

# 变量
www_path="/var/www/html"
latest_path="/var/www/HkList"

echo "保留.env文件"
cp $www_path/.env $latest_path/.env

echo "导入文件"
rm -rf $www_path
mkdir -p $www_path
cp -a $latest_path/. $www_path

echo "启动更新程序"
cd $www_path || exit
php artisan app:check-app-status

exec "$@"
