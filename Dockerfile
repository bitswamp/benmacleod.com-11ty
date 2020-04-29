FROM node:14-slim AS build

COPY . /src
WORKDIR /src
RUN npm install

RUN npx @11ty/eleventy

FROM nginx:mainline

COPY --from=build /src/_site /usr/share/nginx/html
