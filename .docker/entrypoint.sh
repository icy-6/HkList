#!/bin/sh

# 变量
www_path="/var/www/html"
latest_path="/var/www/HkList"

echo "检查目录映射是否正确" && \
if [ -d "$www_path" ]; then
    cd $www_path || exit
    echo "映射路径正确"
else
    echo "没有正确映射路径"
    exit
fi

echo "导入文件"
rm -rf $www_path
mkdir -p $www_path
cp -a $latest_path/. $www_path

echo "启动更新程序"
cd $latest_path || exit
php artisan app:check-app-status

exec "$@"
