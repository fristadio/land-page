# API Contract: Nomad Interest Form

## Visão Geral

Contrato atualizado da API `/api/interest` para capturar informações detalhadas de nômades digitais através do formulário multi-step.

**Endpoint:** `POST /api/interest`  
**Content-Type:** `application/json`

---

## Request Payload

### Interface TypeScript

```typescript
interface InterestPayload {
  persona: 'nomade';
  email: string;
  name: string;
  nostr?: string;
  cities: string[];
  needs: string[];
  accommodationType: string;
  budget: string;
  duration: string;
  startDate?: string;
  languages: string[];
  bio?: string;
  consent: boolean;
}
```

### Campos Detalhados

| Campo | Tipo | Obrigatório | Descrição | Exemplo |
|-------|------|-------------|-----------|---------|
| `persona` | `string` | ✅ | Sempre "nomade" (fixo) | `"nomade"` |
| `email` | `string` | ✅ | Email válido do usuário | `"user@example.com"` |
| `name` | `string` | ✅ | Nome completo | `"João Silva"` |
| `nostr` | `string` | ❌ | Public key Nostr (npub...) | `"npub1abc..."` |
| `cities` | `string[]` | ✅ | Array de 1-5 cidades | `["Lisboa", "Barcelona"]` |
| `needs` | `string[]` | ✅ | Necessidades selecionadas (min 1) | `["wifi_fast", "workspace"]` |
| `accommodationType` | `string` | ✅ | Tipo de acomodação preferida | `"apartment_studio"` |
| `budget` | `string` | ✅ | Faixa de orçamento mensal | `"1000-1500"` |
| `duration` | `string` | ✅ | Duração da estadia | `"3-6-months"` |
| `startDate` | `string` | ❌ | Data aproximada de início | `"2025-03"` ou `"March 2025"` |
| `languages` | `string[]` | ✅ | Idiomas que fala (min 1) | `["pt", "en", "es"]` |
| `bio` | `string` | ❌ | Bio curta (max 280 chars) | `"Desenvolvedor remoto..."` |
| `consent` | `boolean` | ✅ | Consentimento LGPD/GDPR | `true` |

---

## Valores Permitidos (Enums)

### `needs` - Necessidades

Valores possíveis (o usuário pode selecionar múltiplos):

- `wifi_fast` - WiFi rápido (100+ Mbps)
- `workspace` - Workspace dedicado
- `community` - Comunidade de nômades
- `quiet` - Silêncio e privacidade
- `gym` - Academia/Fitness
- `kitchen` - Cozinha equipada
- `laundry` - Lavanderia
- `pets` - Animais permitidos

### `accommodationType` - Tipo de Acomodação

Valores possíveis (seleção única):

- `private_room` - Quarto privado (casa compartilhada)
- `apartment_studio` - Apartamento inteiro (studio)
- `apartment_1_2br` - Apartamento 1-2 quartos
- `house` - Casa inteira
- `coliving` - Coliving/Apart-hotel

### `budget` - Orçamento Mensal

Valores possíveis (seleção única):

- `under_500` - Menos de $500
- `500-1000` - $500 - $1000
- `1000-1500` - $1000 - $1500
- `1500-2000` - $1500 - $2000
- `2000-3000` - $2000 - $3000
- `over_3000` - Mais de $3000

### `duration` - Duração da Estadia

Valores possíveis (seleção única):

- `1-month` - 1 mês
- `2-3-months` - 2-3 meses
- `3-6-months` - 3-6 meses
- `6-12-months` - 6-12 meses
- `1-year-plus` - 1+ ano
- `flexible` - Flexível

### `languages` - Idiomas

Valores possíveis (múltipla seleção):

- `pt` - Português
- `en` - Inglês
- `es` - Espanhol
- `fr` - Francês
- `de` - Alemão
- `it` - Italiano
- `other` - Outros

---

## Exemplo de Request

### Request Completo

```json
POST /api/interest
Content-Type: application/json

{
  "persona": "nomade",
  "email": "joao.silva@example.com",
  "name": "João Silva",
  "nostr": "npub1abc123def456...",
  "cities": [
    "Lisboa, Portugal",
    "Barcelona, Spain",
    "Berlin, Germany"
  ],
  "needs": [
    "wifi_fast",
    "workspace",
    "community",
    "gym"
  ],
  "accommodationType": "apartment_studio",
  "budget": "1000-1500",
  "duration": "3-6-months",
  "startDate": "2025-06",
  "languages": [
    "pt",
    "en",
    "es"
  ],
  "bio": "Desenvolvedor full-stack trabalhando remotamente. Adoro explorar novas culturas e fazer networking com outros nômades digitais.",
  "consent": true
}
```

### Request Mínimo (apenas campos obrigatórios)

```json
{
  "persona": "nomade",
  "email": "maria@example.com",
  "name": "Maria Santos",
  "cities": ["Porto, Portugal"],
  "needs": ["wifi_fast"],
  "accommodationType": "private_room",
  "budget": "500-1000",
  "duration": "1-month",
  "languages": ["pt"],
  "consent": true
}
```

---

## Response

### Success Response

**Status:** `200 OK`

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "createdAt": "2025-11-16T14:30:00Z"
}
```

### Error Responses

#### 400 Bad Request - Validação

```json
{
  "error": "Validation error: cities must contain at least 1 item"
}
```

Possíveis erros de validação:
- Email inválido
- `cities` vazio ou com mais de 5 itens
- `needs` vazio
- `accommodationType` não está na lista permitida
- `consent` não é `true`
- Campos obrigatórios faltando

#### 500 Internal Server Error

```json
{
  "error": "Internal server error"
}
```

---

## Validações Backend

### Obrigatórias

1. **Email:**
   - Formato válido (regex ou lib de validação)
   - Não vazio

2. **Name:**
   - Não vazio
   - Tamanho: 2-100 caracteres

3. **Cities:**
   - Array não vazio
   - Mínimo: 1 cidade
   - Máximo: 5 cidades
   - Cada item: string não vazia

4. **Needs:**
   - Array não vazio
   - Mínimo: 1 necessidade
   - Todos os valores devem estar no enum permitido

5. **AccommodationType:**
   - Deve estar no enum permitido

6. **Budget:**
   - Deve estar no enum permitido

7. **Duration:**
   - Deve estar no enum permitido

8. **Languages:**
   - Array não vazio
   - Mínimo: 1 idioma
   - Todos os valores devem estar no enum permitido

9. **Consent:**
   - Deve ser explicitamente `true`

### Opcionais

1. **Nostr:**
   - Se fornecido, validar formato `npub1...` (58 caracteres, bech32)

2. **StartDate:**
   - Se fornecido, aceitar formato livre (string)

3. **Bio:**
   - Se fornecido, máximo 280 caracteres

---

## Storage / Database

### Campos a Armazenar

Recomenda-se armazenar todos os campos + metadata:

```typescript
interface InterestRecord {
  // Payload original
  ...InterestPayload,
  
  // Metadata
  id: string;                    // UUID v4
  createdAt: string;             // ISO 8601
  updatedAt?: string;            // ISO 8601
  source: 'web_form';            // Origem do cadastro
  version: 'v2_nomad_multistep'; // Versão do formulário
  userAgent?: string;            // Browser info
  ipAddress?: string;            // IP (LGPD compliant)
}
```

### Índices Recomendados

- `email` (único, para evitar duplicatas)
- `createdAt` (para queries temporais)
- `cities` (para buscar por localização)

---

## Migração de Dados Antigos

Se houver registros antigos com o formato anterior (anfitrião/árbitro), manter retrocompatibilidade:

```typescript
// Formato antigo ainda pode chegar por algum tempo
interface OldInterestPayload {
  persona: 'anfitriao' | 'arbitro' | 'nomade';
  email: string;
  name?: string;
  countries?: string;
  propertyTitle?: string;
  // ... campos antigos
}
```

**Recomendação:** Criar endpoint separado ou versionar (`/api/v2/interest`) para o novo formato.

---

## Exemplo de Implementação (Azure Function - TypeScript)

```typescript
import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

const ALLOWED_NEEDS = ['wifi_fast', 'workspace', 'community', 'quiet', 'gym', 'kitchen', 'laundry', 'pets'];
const ALLOWED_ACCOMMODATION = ['private_room', 'apartment_studio', 'apartment_1_2br', 'house', 'coliving'];
const ALLOWED_BUDGET = ['under_500', '500-1000', '1000-1500', '1500-2000', '2000-3000', 'over_3000'];
const ALLOWED_DURATION = ['1-month', '2-3-months', '3-6-months', '6-12-months', '1-year-plus', 'flexible'];
const ALLOWED_LANGUAGES = ['pt', 'en', 'es', 'fr', 'de', 'it', 'other'];

export async function postInterest(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  try {
    const body = await request.json();
    
    // Validações
    if (body.persona !== 'nomade') {
      return { status: 400, jsonBody: { error: 'Only nomade persona is accepted' } };
    }
    
    if (!body.email || !isValidEmail(body.email)) {
      return { status: 400, jsonBody: { error: 'Invalid email' } };
    }
    
    if (!body.name || body.name.length < 2) {
      return { status: 400, jsonBody: { error: 'Name is required' } };
    }
    
    if (!Array.isArray(body.cities) || body.cities.length === 0 || body.cities.length > 5) {
      return { status: 400, jsonBody: { error: 'Cities must contain 1-5 items' } };
    }
    
    if (!Array.isArray(body.needs) || body.needs.length === 0) {
      return { status: 400, jsonBody: { error: 'At least one need is required' } };
    }
    
    if (!body.needs.every(n => ALLOWED_NEEDS.includes(n))) {
      return { status: 400, jsonBody: { error: 'Invalid needs value' } };
    }
    
    if (!ALLOWED_ACCOMMODATION.includes(body.accommodationType)) {
      return { status: 400, jsonBody: { error: 'Invalid accommodationType' } };
    }
    
    if (!ALLOWED_BUDGET.includes(body.budget)) {
      return { status: 400, jsonBody: { error: 'Invalid budget' } };
    }
    
    if (!ALLOWED_DURATION.includes(body.duration)) {
      return { status: 400, jsonBody: { error: 'Invalid duration' } };
    }
    
    if (!Array.isArray(body.languages) || body.languages.length === 0) {
      return { status: 400, jsonBody: { error: 'At least one language is required' } };
    }
    
    if (!body.languages.every(l => ALLOWED_LANGUAGES.includes(l))) {
      return { status: 400, jsonBody: { error: 'Invalid language value' } };
    }
    
    if (body.consent !== true) {
      return { status: 400, jsonBody: { error: 'Consent is required' } };
    }
    
    if (body.bio && body.bio.length > 280) {
      return { status: 400, jsonBody: { error: 'Bio must be max 280 characters' } };
    }
    
    // Salvar no banco de dados
    const id = generateUUID();
    const record = {
      ...body,
      id,
      createdAt: new Date().toISOString(),
      source: 'web_form',
      version: 'v2_nomad_multistep'
    };
    
    await saveToDatabase(record);
    
    return {
      status: 200,
      jsonBody: {
        id,
        createdAt: record.createdAt
      }
    };
    
  } catch (error) {
    context.error('Error processing interest:', error);
    return {
      status: 500,
      jsonBody: { error: 'Internal server error' }
    };
  }
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

app.http('interest', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: postInterest
});
```

---

## Notas Importantes

1. **LGPD/GDPR:** O campo `consent` deve ser explicitamente `true`. Armazenar timestamp do consentimento.

2. **Cidades:** O formato vem como string livre do autocomplete (ex: "Lisboa, Portugal"). Considere normalizar/geocodificar no backend se necessário.

3. **Nostr:** Campo opcional para integração futura com identidade descentralizada.

4. **Rate Limiting:** Implementar proteção contra spam (ex: max 5 submissões/hora por IP).

5. **Duplicatas:** Considere verificar email duplicado e retornar 409 Conflict se já existir.

---

## Checklist de Implementação

- [ ] Criar/atualizar Azure Function com novo contrato
- [ ] Implementar todas as validações listadas
- [ ] Adicionar índices no banco de dados
- [ ] Testar com exemplos de payload fornecidos
- [ ] Implementar rate limiting
- [ ] Configurar logging adequado
- [ ] Adicionar monitoring/alertas
- [ ] Documentar no README da API
- [ ] Atualizar Postman/Swagger se houver

---

**Data de criação:** 2025-11-16  
**Versão:** 2.0 (Multi-step Nomad Form)  
**Autor:** Frontend Team

