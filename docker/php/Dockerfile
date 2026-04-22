FROM php:8.4-fpm

# 設定ファイルをコピー
COPY php.ini /usr/local/etc/php/

# 必要な道具をインストール（libicu-dev を追加！）
RUN apt update && apt install -y \
    default-mysql-client \
    zlib1g-dev \
    libzip-dev \
    libpng-dev \
    libicu-dev \
    unzip \
    curl \
    gnupg \
    python3

# PHPの拡張機能（intl を追加！）
RUN docker-php-ext-install pdo_mysql zip bcmath gd pcntl intl

# Composer をインストール
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www