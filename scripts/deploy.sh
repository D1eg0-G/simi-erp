#!/bin/bash
# ============================================
# SIMI ERP - Script de despliegue
# ============================================

echo "=== Deploy SIMI ERP ==="
cd /srv/simi-erp

# Obtener últimos cambios
git pull origin main

# Actualizar dependencias si cambiaron
cd frontend
npm install

# Reiniciar con PM2
pm2 restart simi-erp

echo "Deploy completado: $(date)"
pm2 status