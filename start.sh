#!/bin/bash

echo "🚀 Iniciando build do backend da aplicação..."

# 1. Parar e remover containers e redes
echo "🧹 Parando containers..."
docker compose down --remove-orphans # -> REMOVE volumes (reset total do banco), troque a linha por: docker compose down -v --remove-orphans

# 2. Subir containers com build forçado
echo "🐳 Subindo os containers com Docker Compose..."
docker compose up --build -d

echo "✅ Backend da Aplicação Manutenção de Equipamentos iniciada com sucesso!"
echo "   • Back-end:  http://localhost:8080"