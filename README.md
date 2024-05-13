# Guía de Inicio Rápido para Truffle con Ganache

Este documento proporciona instrucciones para configurar y ejecutar un entorno de desarrollo local para contratos inteligentes utilizando Truffle y Ganache.

## Requisitos Previos

Asegúrate de tener Node.js instalado. Puedes descargarlo e instalarlo desde [Node.js official website](https://nodejs.org/).

## Configuración del Proyecto

Para configurar tu proyecto, sigue estos pasos:

### 1. Inicializa un nuevo proyecto Node.js

Abre una terminal y ejecuta el siguiente comando para crear un nuevo directorio para tu proyecto y navegar dentro de él:

```bash
mkdir mi-proyecto-truffle
cd mi-proyecto-truffle
```

Luego, inicializa un nuevo proyecto Node.js:
```bash
npm init -y
```
### 2. Instala Truffle
Instala Truffle globalmente en tu sistema:

```bash
npm install -g truffle
```
### 3. Inicializa Truffle en tu proyecto
Para configurar Truffle en tu proyecto, ejecuta:
```bash
truffle init
```

Esto creará los directorios y archivos necesarios para tu proyecto.
### 4. Configura Ganache
Instala Ganache globalmente:
```bash
npm install -g ganache
```
Esto proporcionará 10 cuentas de prueba y sus claves privadas, además de mucho Ether falso para usar en tus pruebas.

## Desarrollo y Pruebas
### Compilación de Contratos
Para compilar tus contratos inteligentes, usa:
```bash
truffle compile
```
### Migración de Contratos
Para desplegar tus contratos al blockchain de Ganache, usa:
```bash
truffle migrate
```
### Ejecutar Pruebas
Para ejecutar pruebas escritas para tus contratos, usa:
```bash
truffle test
```
