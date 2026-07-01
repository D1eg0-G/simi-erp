# Auto Scaling Group - SIMI ERP

## Configuración
- Nombre: simi-asg
- Launch Template: simi-lt
- VPC: simi-vpc
- Subredes: simi-subnet-priv-a, simi-subnet-priv-b
- Load Balancer: simi-alb
- Target Group: simi-tg

## Capacidad
| Parámetro | Valor |
|---|---|
| Capacidad mínima | 1 |
| Capacidad deseada | 3 |
| Capacidad máxima | 10 |

## Política de escalado
- Tipo: Seguimiento de destino
- Métrica: CPUUtilization
- Umbral scale-out: CPU > 60%
- Umbral scale-in: CPU < 20%
- Tiempo de estabilización: 300 segundos