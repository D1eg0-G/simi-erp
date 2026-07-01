# Application Load Balancer - SIMI ERP

## Justificación
Se utiliza Application Load Balancer (ALB) por sobre Classic Load Balancer porque:
- Opera en capa 7 (HTTP/HTTPS)
- Permite routing basado en rutas y headers
- Compatible con Target Groups para el ASG
- Ideal para aplicaciones web como el ERP SIMI

## Configuración
- Nombre: simi-alb
- Tipo: Application Load Balancer
- Esquema: Orientado a Internet
- Subredes: simi-subnet-pub-a, simi-subnet-pub-b
- Security Group: simi-sg-alb

## Target Group
- Nombre: simi-tg
- Tipo: Instancias
- Puerto: 3000
- Protocolo: HTTP
- Health check: GET /
- Umbral saludable: 2 checks consecutivos
- Umbral no saludable: 3 checks consecutivos
- Intervalo: 30 segundos

## Listener
- Puerto 80 → reenviar a simi-tg