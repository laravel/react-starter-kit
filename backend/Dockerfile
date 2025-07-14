FROM richarvey/nginx-php-fpm:php8.2

# Set working directory
WORKDIR /var/www

# Copy app files
COPY . .

# Install Composer globally
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install Laravel dependencies with logging enabled
RUN composer install --no-interaction --prefer-dist --optimize-autoloader || cat /var/www/storage/logs/laravel.log || true

# Fix permissions
RUN chown -R www-data:www-data /var/www \
    && chmod -R 755 /var/www/storage /var/www/bootstrap/cache

# Expose the container port
EXPOSE 80

# Run Nginx and PHP-FPM
CMD ["/start.sh"]
