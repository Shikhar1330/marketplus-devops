FROM node:20-slim
WORKDIR /app
RUN apt-get update && apt-get install -y openssl curl && rm -rf /var/lib/apt/lists/*
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
RUN chmod +x entrypoint.sh
EXPOSE 5000
CMD ["./entrypoint.sh"]
