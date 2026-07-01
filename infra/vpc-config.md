# Configuración VPC - SIMI ERP

## VPC
- Nombre: simi-vpc
- CIDR: 10.0.0.0/16
- Región: us-east-1

## Subredes
| Nombre | Tipo | Zona | CIDR |
|---|---|---|---|
| simi-subnet-pub-a | Pública | us-east-1a | 10.0.0.0/24 |
| simi-subnet-priv-a | Privada | us-east-1a | 10.0.1.0/24 |
| simi-subnet-pub-b | Pública | us-east-1b | 10.0.2.0/24 |
| simi-subnet-priv-b | Privada | us-east-1b | 10.0.3.0/24 |

## Internet Gateway
- Nombre: simi-igw
- Adjunto a: simi-vpc

## NAT Gateway
- Nombre: simi-nat
- Subred: simi-subnet-pub-a
- Elastic IP: asignada

## Tablas de ruteo
### Pública
- 0.0.0.0/0 → simi-igw
- Asociada a: simi-subnet-pub-a, simi-subnet-pub-b

### Privada
- 0.0.0.0/0 → simi-nat
- Asociada a: simi-subnet-priv-a, simi-subnet-priv-b