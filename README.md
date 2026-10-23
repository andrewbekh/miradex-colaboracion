# MIRADEX España · розділ «Colaboración»

Хаб `/colaboracion` і 5 лендингів сценаріїв, Astro, статичний сайт.

## Запуск
```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # збірка в dist/
npm run test:form  # перевірка форми (потрібен запущений dev)
```

## Мова
Зараз увесь текст російською для погодження з клієнтом. Тексти лежать у `src/data`: `ui.ts` (інтерфейс), `hub.ts`, `landings/*.ts`, `scenarios.ts`, `shared.ts`, `nav.ts`. Іспанська версія: переклад цих файлів.

## Де що лежить
- `src/styles/tokens.css`: усі дизайн-токени (кольори, шрифти, відступи, заокруглення).
- `src/components/`: спільні компоненти (паттерн-заголовок, банери, форма, попап, FAQ…).
- `src/data/`: сценарії, навігація, контакти (`site.ts`), спільні факти й FAQ.
- `src/pages/colaboracion/`: хаб (`index.astro`) і маршрут лендингів (`[slug].astro`).
- `src/components/LandingPage.astro`: один шаблон для всіх лендингів, порядок блоків задається в даних.
- `docs/TODO.md`: що треба отримати від клієнта перед запуском.

## Публікація на GitHub Pages
У репозиторії є `.github/workflows/deploy.yml`: після пушу в `main` сайт збирається й публікується на
`https://<user>.github.io/<repo>/`. У налаштуваннях репозиторію: Settings → Pages → Source: GitHub Actions.

## Перед запуском
- `site.draft = false` у `src/data/site.ts` і прибрати `public/robots.txt` (зараз усі сторінки закриті від індексації).
- Заповнити контакти, WhatsApp, endpoint форми й посилання на політику конфіденційності (`src/data/site.ts`).
