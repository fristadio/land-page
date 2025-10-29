Requisitos de API — Landing Fristad

Escopo
- Tornar a landing persistente via API (Azure Functions) e Cosmos DB (SQL API).
- Manter identidade visual e páginas minimalistas (`home`, `pesquisa`, `obrigado`).
- Sem autenticação nesta fase; foco em captação com consentimento explícito.

Endpoints
1) POST /api/interest
- Finalidade: registrar interesse do usuário.
- Headers: `Content-Type: application/json`
- Body (JSON) — esquema e validação:
  - `persona` (string, obrigatório): `"anfitriao" | "arbitro" | "nomade"`
  - `email` (string, obrigatório): e-mail válido; normalizar/trim; máx. 256 chars
  - `name` (string, opcional): máx. 120 chars; trim
  - `nostr` (string, opcional): começa com `npub` preferencialmente; máx. 128 chars
  - `countries` (string, opcional, apenas para `nomade`): máx. 300 chars
  - `propertyTitle` (string, opcional, apenas para `anfitriao`): máx. 120 chars
  - `propertyLocation` (string, opcional, apenas para `anfitriao`): máx. 120 chars
  - `propertySummary` (string, opcional, apenas para `anfitriao`): máx. 300 chars
  - `consent` (boolean, obrigatório): precisa ser `true`
- Regras:
  - Rejeitar se `persona` inválida, `email` inválido ou `consent` ≠ true
  - Sanitizar strings (trim, remover caracteres de controle, limitar tamanho)
- Respostas:
  - 201 Created: `{ id: string, createdAt: string }`
  - 400 Bad Request: `{ error: "VALIDATION_ERROR", details: { field: message } }`
  - 429 Too Many Requests: `{ error: "RATE_LIMIT" }`
  - 500 Internal Server Error: `{ error: "INTERNAL_ERROR" }`

2) GET /api/health
- Finalidade: verificação de saúde
- Resposta: 200 OK `{ ok: true, time: string, version?: string }`

Persistência (Cosmos DB — SQL API)
- Database: `fristad`
- Container: `interests`
- Partition key: `/persona`
- Índices: padrão do SQL API (adequado neste volume)
- Item (exemplo):
```
{
  "id": "uuid-v4",
  "persona": "nomade",
  "email": "ana@example.com",
  "name": "Ana",
  "nostr": "npub1...",
  "countries": "Copenhagen, Stockholm",
  "propertyTitle": null,
  "propertyLocation": null,
  "propertySummary": null,
  "consent": true,
  "createdAt": "2025-10-02T12:34:56.000Z",
  "ip": "203.0.113.42",
  "ua": "Mozilla/5.0"
}
```

Segurança & Conformidade
- CORS: permitir apenas domínios do WebApp (prod/staging) e `http://localhost:3000` em dev
- Rate limiting: janela 60s, p.ex. 60 req/IP (429 acima disso)
- Dados pessoais: coletar mínimo necessário; consentimento obrigatório; sem venda de dados
- Armazenamento: Cosmos DB com criptografia em repouso (padrão); segredos em App Settings/Key Vault
- Logs: técnicos (sem PII sensível); integrar com Application Insights

Variáveis de Ambiente (Function App)
- `COSMOSDB_CONN_STRING` — string de conexão do Cosmos
- `COSMOSDB_DB=fristad`
- `COSMOSDB_CONTAINER=interests`
- `RATE_LIMIT_WINDOW_MS=60000`
- `RATE_LIMIT_MAX=60`

Variáveis de Ambiente (WebApp)
- `VITE_API_BASE_URL` — base da API (ex.: `https://fa-fristad-api-prd.azurewebsites.net`)

Contrato — Exemplo de Requisição/Resposta
Requisição:
```
POST /api/interest
Content-Type: application/json

{
  "persona": "anfitriao",
  "email": "host@example.com",
  "name": "João",
  "propertyTitle": "Estúdio no centro",
  "propertyLocation": "Lisboa, PT",
  "propertySummary": "1 quarto, mobiliado, wi‑fi rápido",
  "consent": true
}
```
Resposta 201:
```
{
  "id": "0b5f1e51-77f2-4f50-9a2b-4d3f8c0b9c1a",
  "createdAt": "2025-10-02T12:34:56.000Z"
}
```

Erros Padrão
- 400: `{ error: "VALIDATION_ERROR", details: { email: "invalid format" } }`
- 429: `{ error: "RATE_LIMIT" }`
- 500: `{ error: "INTERNAL_ERROR" }`

Observabilidade
- Métricas: contagem de inserts, taxa de erro, latência média
- Logs: request id, ip, persona, status code; mascarar e-mail no log

Testes (mínimos)
- Unit: validação do payload (persona/email/consent) e sanitização
- Integração: POST válido → 201; inválido → 400; limite → 429
- Saúde: GET /api/health → 200

Notas
- i18n do front (PT/EN) não impacta contrato da API
- Evoluções futuras: confirmação por e-mail; atualização/remoção de registro; painel simples de consulta










