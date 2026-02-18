# JARVIS — MVP estrutural

App web em Next.js com tema HUD futurista premium, módulos CRUD com dados mockados e persistência local.

## Rodar local

```bash
npm install
npm run dev
```

Testes:

```bash
npm run test
npm run test:e2e
```

## Arquitetura resumida

- `app/*`: rotas por módulo (`dashboard`, `tasks`, `events`, `habits`, `finance`, `jarvis`) e stubs em `app/api/jarvis/*`.
- `components/*`: layout principal, HUD, cards, forms e chat.
- `lib/store/useAppStore.ts`: Zustand slices centralizados + ações CRUD.
- `lib/storage/localStorageAdapter.ts`: persistência inicial com versionamento por chave.
- `lib/schemas/index.ts`: validações Zod para formulários.
- `lib/jarvis/*`: tipos, parser stub e persona do sistema.

## Pontos para integrar OpenAI depois

1. `app/api/jarvis/chat/route.ts`: trocar resposta fake por chamada real de chat completion + parser de actions.
2. `app/api/jarvis/transcribe/route.ts`: integrar endpoint real de transcrição de áudio.
3. `app/api/jarvis/speak/route.ts`: integrar TTS e retornar URL real.
4. `lib/jarvis/actionParser.ts`: implementar extração robusta de `Action[]`.
5. `lib/jarvis/systemPrompt.ts`: evoluir prompt com guardrails e contexto de memória.
