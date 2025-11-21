# -------- STAGE 1: BUILD --------
FROM node:20-alpine AS build
WORKDIR /app

# Copy dependencies first
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Build the project
RUN npm run build

# -------- STAGE 2: SERVE --------
FROM nginx:alpine

# Copy build folder to nginx html folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
