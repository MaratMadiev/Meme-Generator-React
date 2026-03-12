# Meme Editor

Редактор мемов на React + Vite + Fabric.js + TailwindCSS

## 🚀 Быстрый старт

### 1. Клонирование и установка

```bash
# Установка зависимостей
npm install
```

### 1.5
Зависимости (если ничего не забыл)
```
npm i react react-dom react-router-dom fabric zustand axios modern-gif gif.js
```

```
npm i -D @types/react @types/react-dom @types/fabric @types/gif.js @vitejs/plugin-react vite tailwindcss @tailwindcss/vite typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-plugin-react-hooks eslint-plugin-react-refresh globals
```
### 2. Настройка GIPHY API

1. Получить API ключ на [GIPHY Developers](https://developers.giphy.com/)
2. Открыть `src/api/giphy.ts`
3. Вставить ключ:
```ts
const API_KEY = 'твой_ключ_сюда';
```

### 3. Запуск

```bash
# Режим разработки
npm run dev

# Сборка
npm run build

# Превью собранного проекта
npm run preview
```


### 4. Зависимости

```json
"dependencies": {
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.30.0",
  "fabric": "^6.5.4",
  "zustand": "^4.5.6",
  "axios": "^1.8.4",
  "modern-gif": "^2.0.4",
  "gif.js": "^0.2.0"
}
```

