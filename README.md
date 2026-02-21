# Azamat Satullaev | Portfolio

Портфолио: Next.js 14, TypeScript, Tailwind, Framer Motion. Локализация en/ru/uz, SEO, PWA, аналитика (Plausible), мониторинг ошибок (Sentry).

## Запуск

```bash
npm install
npm run dev
```

Открой [http://localhost:3000](http://localhost:3000). Язык по умолчанию — EN; при следующем визите подставится последний выбранный (ru/uz), если он сохранён в браузере.

## Скрипты

| Команда | Описание |
|--------|----------|
| `npm run dev` | Режим разработки |
| `npm run build` | Сборка (перед ней выполняется проверка env) |
| `npm run start` | Запуск прод-сервера после `build` |
| `npm run lint` | ESLint |
| `npm run test` | Jest (компоненты + smoke) |
| `npm run e2e` | E2E-тесты (Playwright). Перед первым запуском: `npx playwright install` |
| `npm run analyze` | Анализ бандла (открывает отчёт в браузере) |

## Переменные окружения

Скопируй `.env.example` в `.env.local` и при необходимости заполни. Все переменные опциональны.

| Переменная | Описание |
|------------|----------|
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Домен для Plausible (например `azamatsatullaev.com`) |
| `NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL` | URL скрипта Plausible (если используешь кастомный) |
| `NEXT_PUBLIC_SENTRY_DSN` | DSN для Sentry (клиент) |
| `SENTRY_DSN` | DSN для Sentry (сервер/edge) |
| `SENTRY_ORG` / `SENTRY_PROJECT` | Для загрузки source maps при сборке |

Без Plausible и Sentry сайт работает как обычно; аналитика и отчёты об ошибках просто не будут отправляться.

## Деплой (Netlify)

1. Подключи репозиторий к Netlify.
2. Build command: `npm run build`
3. Publish directory: `.next` (используется `@netlify/plugin-nextjs`, см. `netlify.toml`)
4. В настройках сайта добавь нужные env (Plausible, Sentry и т.д.)

## Структура

- `src/app/[locale]/` — страницы по локалям (главная, info, contact)
- `src/components/` — UI и секции
- `messages/` — переводы en, ru, uz
- `public/schedy/` — скриншоты для блока Schedy
- `scripts/validate-env.mjs` — проверка env перед сборкой

## Дополнительно

- **PWA:** `manifest.json` и `sw.js` — можно установить сайт на устройство.
- **CI:** в `.github/workflows/ci.yml` настроены lint, test, build и E2E при push/PR в main (или master). Для Sentry release health добавь в репозитории секреты: `SENTRY_AUTH_TOKEN`, при необходимости `SENTRY_ORG`, `SENTRY_PROJECT`.
- **E2E:** тесты в `e2e/smoke.spec.ts` и a11y в `e2e/a11y.spec.ts`. Перед первым запуском локально выполни `npx playwright install` (скачиваются браузеры).
- **Staging:** ветка `develop` (или другая) может деплоиться на Netlify отдельно — включи Branch deploys в настройках сайта.
- **Изображения:** в проде используется `sharp` для оптимизации (предупреждение Next.js снято).
