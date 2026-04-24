FROM node:20-alpine

WORKDIR /app

# install deps
COPY package*.json ./
RUN npm install

# copy source
COPY . .

# expose vite port
EXPOSE 4000

# run dev server
CMD ["npm", "run", "dev", "--", "--host"]