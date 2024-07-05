FROM node:lts-slim

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat
WORKDIR /app

# Deploying the app on port 3000
# EXPOSE 3000

# Install dependencies 
COPY package.json .
# COPY package-lock.json .
RUN npm install
# RUN yarn install 

# Copy the code files and build the nextjs app
COPY . .
RUN npm run build

# Run the server!
CMD ["npm", "start"]