#!/bin/bash
# ============================================
# Benchmarking para Auto Scaling + CloudWatch
# ============================================

echo "=== Iniciando prueba de carga SIMI ERP ==="
echo "Fecha: $(date)"
echo "Host: $(hostname)"
echo "IP: $(curl -s http://169.254.169.254/latest/meta-data/local-ipv4)"
echo ""

# Instalar stress si no está instalado
if ! command -v stress &> /dev/null; then
    echo "Instalando stress..."
    yum install stress -y
fi

# Mostrar uso de CPU antes
echo "CPU antes de la prueba:"
top -bn1 | grep "Cpu(s)"
echo ""

# Ejecutar carga de CPU por 5 minutos (300 segundos)
# para que CloudWatch detecte y dispare la alarma
echo "Iniciando carga de CPU al 100% por 5 minutos..."
echo "Monitorea en CloudWatch: EC2 > CPUUtilization"
echo ""

stress --cpu 2 --timeout 300

echo ""
echo "=== Prueba finalizada ==="
echo "Fecha: $(date)"
echo "CPU después de la prueba:"
top -bn1 | grep "Cpu(s)"
echo ""
echo "Espera ~5 minutos para que el ASG reduzca instancias (scale-in)"