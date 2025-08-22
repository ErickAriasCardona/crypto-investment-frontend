# 💻 CryptoInvestment - Frontend

Frontend del proyecto **CryptoInvestment**, desarrollado en ReactJS como SPA (Single Page Application).  
Se conecta al backend mediante API REST para mostrar información en tiempo real de criptomonedas.

---

## 📂 Tecnologías utilizadas
- ReactJS + Vite
- Axios (consumo de API)
- Chart.js (gráficas)
- CSS (con diseño responsivo)
- Context API (gestión de estados globales)

---

## 🔗 Funcionalidades principales
- Mostrar precios actualizados de criptomonedas.  
- Buscar y seleccionar criptomonedas.  
- Visualizar datos clave: precio, variación porcentual 24h y volumen.  
- Mostrar gráficos históricos.  
- Adaptación a diferentes dispositivos (desktop, tablet, mobile).  

---

## ⚙️ Instalación y ejecución

### 1. Clonar el repositorio

git clone https://github.com/ErickAriasCardona/crypto-investment-frontend.git
cd crypto-investment-frontend

2. Instalar dependencias

npm install

3. Configurar variables de entorno
Crear un archivo .env en la raíz del proyecto:

VITE_API_URL=http://localhost:3001

4. Levantar servidor de desarrollo

npm run dev

El frontend quedará corriendo en:
👉 http://localhost:5173

🎨 Diseño Responsivo (Responsive Design)
La aplicación está diseñada para adaptarse a distintos dispositivos:

Desktop 🖥️

Tablet 📱

Mobile 📲

📌 Observaciones Técnicas
SPA con React + Vite para rapidez.

Consumo de backend vía axios.

Actualización periódica con setInterval.

Uso de CryptoCard y componentes reutilizables para vistas.