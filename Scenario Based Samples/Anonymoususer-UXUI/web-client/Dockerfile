FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Install Angular CLI (if needed)
RUN npm install -g @angular/cli

# Build Angular app
RUN ng build --configuration=production --base-href="/row-level-security/"

FROM nginx:alpine

# Copy built Angular app to nginx html folder
COPY --from=builder /app/dist/boldbi.web.client /usr/share/nginx/html

# Expose ports
EXPOSE 80
EXPOSE 8080
EXPOSE 443

ENTRYPOINT ["nginx", "-g", "daemon off;"]