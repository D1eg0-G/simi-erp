# Launch Template - SIMI ERP

## Configuración
- Nombre: simi-lt
- AMI: simi-web-ami (ID: ami-XXXXXXXX)
- Tipo de instancia: t2.micro
- Key pair: vockey
- Security Group: simi-sg-web

## User Data
Ver scripts/user-data.sh en el repositorio

## Notas
- La AMI fue creada desde la EC2 Web con la app
  Node.js configurada y PM2 habilitado
- Cada instancia lanzada por el ASG arranca
  automáticamente con PM2