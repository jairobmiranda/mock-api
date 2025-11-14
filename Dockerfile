# Dockerfile para projeto NestJS no CapRover
FROM node:24-alpine

# Diretório de trabalho
WORKDIR /usr/src/app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala todas as dependências (incluindo dev)
RUN npm install

# Copia o restante do código
COPY . .

# Compila o projeto (caso use TypeScript)
RUN npm run build

# Remove dependências de desenvolvimento para imagem final mais enxuta
RUN npm prune --production

# Expõe a porta padrão do NestJS
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/main.js"]
