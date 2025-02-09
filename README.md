# Proyecto Full Stack (Laravel + Angular)

Este repositorio contiene dos aplicaciones:

- **Backend:** Laravel (ubicado en `back-end/`)
- **Frontend:** Angular (ubicado en `front-end/`)

## 📌 Requisitos

Antes de iniciar, asegúrate de tener instalados los siguientes requisitos:

- [Node.js](https://nodejs.org/) (para Angular)
- [npm](https://www.npmjs.com/) (para Angular)
- [Composer](https://getcomposer.org/) (para Laravel)
- [PHP](https://www.php.net/)
- [MySQL](https://www.mysql.com/) o cualquier otro motor de base de datos compatible con Laravel

---

## 🚀 Instalación y ejecución

### 🔹 Backend (Laravel)

1. **Navegar a la carpeta del backend:**
   ```sh
   cd back-end
   ```

2. **Instalar dependencias de Laravel:**
   ```sh
   composer install
   ```

3. **Configurar el archivo de entorno:**
   ```sh
   cp .env.example .env
   ```

4. **Configurar la base de datos**  
   Abre el archivo `.env` y edita las variables de conexión a la base de datos:

   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=nombre_base_de_datos
   DB_USERNAME=usuario
   DB_PASSWORD=contraseña
   ```

5. **Generar la clave de la aplicación:**
   ```sh
   php artisan key:generate
   ```

6. **Ejecutar las migraciones y seeders:**
   ```sh
   php artisan migrate --seed
   ```

   > Esto creará las tablas en la base de datos y generará un usuario de prueba con las siguientes credenciales:
   > - **Email:** `test@example.com`
   > - **Password:** `password`

7. **Levantar el servidor de Laravel:**
   ```sh
   php artisan serve
   ```

   El backend estará disponible en `http://127.0.0.1:8000`.

---

### 🔹 Frontend (Angular)

1. **Navegar a la carpeta del frontend:**
   ```sh
   cd front-end
   ```

2. **Instalar dependencias de Angular:**
   ```sh
   npm install
   ```


3. **Levantar el servidor de Angular:**
   ```sh
   ng serve
   ```

   Esto abrirá la aplicación en el navegador en `http://localhost:4200/`.

---

## 🎯 Notas adicionales

- Si utilizas un servidor MySQL local, asegúrate de que esté corriendo antes de ejecutar las migraciones.
- Si necesitas restablecer la base de datos, puedes correr:
  ```sh
  php artisan migrate:fresh --seed
  ```
---

¡Listo! Ahora tienes el backend y frontend corriendo.