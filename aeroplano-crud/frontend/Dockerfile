FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/index.html /usr/share/nginx/html/
COPY --from=build /app/dist/ /usr/share/nginx/html/dist/
COPY --from=build /app/src/styles.css /usr/share/nginx/html/src/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]