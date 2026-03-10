# Meme Editor

Редактор мемов на React + Vite + Fabric.js + TailwindCSS

## 🚀 Быстрый старт

### 1. Клонирование и установка

```bash
# Установка зависимостей
npm install
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
{
  "react": "^18.2.0",
  "fabric": "^6.0.0",
  "zustand": "^4.4.0",
  "axios": "^1.6.0",
  "react-router-dom": "^6.20.0",
  "tailwindcss": "^3.4.0"
}
```

