# Use an official Nginx image as the base
FROM nginx:alpine

# Copy the project files to the Nginx default public directory
COPY . /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
