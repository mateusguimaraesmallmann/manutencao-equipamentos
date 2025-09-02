#!/bin/bash

echo "🚀 Iniciando build completo da aplicação..."

# 1. Parar e remover containers e redes
echo "🧹 Parando containers..."
docker compose down --remove-orphans #se quiser REMOVER volumes (reset total do banco), troque a linha por: docker compose down -v --remove-orphans

# 2. Build do front-end
#echo "🎨 Realizando build do front-end..."
#cd ./front-end || exit 1
#npm install
#npm run build
#cd ..

# 3. Subir containers com build forçado
echo "🐳 Subindo os containers com Docker Compose..."
docker compose up --build -d

echo "✅ Aplicação Manutenção de Equipamentos iniciada com sucesso!"
echo "   • Back-end:  http://localhost:8080"
echo "   • Front-end: http://localhost:4200"