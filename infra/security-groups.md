# Security Groups - SIMI ERP

## simi-sg-alb (Load Balancer)
| Tipo | Puerto | Protocolo | Origen |
|---|---|---|---|
| Entrada | 80 | TCP | 0.0.0.0/0 |
| Entrada | 443 | TCP | 0.0.0.0/0 |
| Salida | Todo | Todo | 0.0.0.0/0 |

## simi-sg-web (EC2 Frontend)
| Tipo | Puerto | Protocolo | Origen |
|---|---|---|---|
| Entrada | 3000 | TCP | simi-sg-alb |
| Entrada | 22 | TCP | simi-sg-bastion |
| Salida | Todo | Todo | 0.0.0.0/0 |

## simi-sg-bd (EC2 Base de Datos)
| Tipo | Puerto | Protocolo | Origen |
|---|---|---|---|
| Entrada | 5432 | TCP | simi-sg-web |
| Entrada | 22 | TCP | simi-sg-bastion |
| Salida | Todo | Todo | 0.0.0.0/0 |

## simi-sg-bastion (Bastion Host)
| Tipo | Puerto | Protocolo | Origen |
|---|---|---|---|
| Entrada | 22 | TCP | Mi IP |
| Salida | Todo | Todo | 0.0.0.0/0 |