# 依赖构建
FROM composer

COPY .env.example .env

# 复制项目源码
COPY . /app

# 删除vendor文件减小体积
RUN rm vendor.zip

# 开始构建
RUN composer install --optimize-autoloader --no-interaction --no-progress

FROM trafex/php-nginx:latest

USER root

RUN PHP_VERSION=$(php -v | head -n1 | cut -d' ' -f2 | cut -d. -f1-2) \
    && mkdir -p /tmp/sourceguardian \
    && cd /tmp/sourceguardian \
    && curl -Os https://www.sourceguardian.com/loaders/download/loaders.linux-x86_64.tar.gz \
    && tar xzf loaders.linux-x86_64.tar.gz \
    && cp ixed.${PHP_VERSION}.lin "$(php -i | grep '^extension_dir =' | cut -d' ' -f3)/sourceguardian.so" \
    && echo "extension=sourceguardian.so" > $PHP_INI_DIR/conf.d/15-sourceguardian.ini \
    && rm -rf /tmp/sourceguardian

RUN apk add --no-cache openssl php83-pdo php83-pdo_mysql eudev-libs

# 补全环境
RUN apk update && \
    apk add tzdata && \
    cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
    echo "Asia/Shanghai" > /etc/timezone

# 复制项目源码
COPY .docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY .docker/fpm-pool.conf ${PHP_INI_DIR}/php-fpm.d/www.conf
COPY .docker/nginx.conf /etc/nginx/nginx.conf
COPY .docker/default.conf /etc/nginx/conf.d/default.conf
COPY .docker/entrypoint.sh /entrypoint.sh

# 复制构建后项目源码
COPY --from=composer /app /var/www/html

# 赋权
RUN chmod a+x /entrypoint.sh

###########################################################################

# 默认工作目录
WORKDIR /var/www/html

# 开放端口
EXPOSE 8080

# 映射源码目录
VOLUME ["/var/www/html"]

# 启动
ENTRYPOINT ["/entrypoint.sh"]

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
