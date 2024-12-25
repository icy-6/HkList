#!/bin/sh

# 变量
www_path="/var/www/html"
latest_path="/var/www/HkList"

echo "检查目录映射是否正确" && \
if [ -d "$www_path" ]; then
    cd $www_path || exit
    if [ ! "$(ls -A $www_path)" ]; then
        echo "文件夹为空,导入文件"
        cp -a $latest_path/. $www_path
    fi
else
    echo "没有正确映射路径"
    exit
fi

echo "导入新的依赖"
rm -rf $www_path/vendor
cp -a $latest_path/vendor/. $www_path/vendor

exec "$@"
