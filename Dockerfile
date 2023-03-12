# Imagem de base
FROM node:16

# Diretório de trabalho
WORKDIR ./

# Copia os arquivos de configuração
COPY package*.json tsconfig*.json ./

# Instala as dependências
RUN npm install

# Copia os arquivos do código-fonte
COPY ./ ./

# Compila o TypeScript
RUN npm run build

COPY ./dist ./dist

# Expõe a porta que o servidor está escutando
EXPOSE 8080

# Inicia o servidor
CMD ["npm", "run", "start"]