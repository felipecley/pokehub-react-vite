# PokeHub (React + Vite)

Aplicação completa em React consumindo a **PokéAPI** com:
- Listagem com paginação
- Busca por nome e filtro por **tipo**
- Página de detalhes (`/pokemon/:name`)
- Feedback de **loading** e **erros**
- Roteamento com `react-router-dom`
- Requisições com `axios`
- Estilização com **Material UI**
- **Desafio Extra**: Autenticação (Firebase) + rota protegida (`/profile`)

## Demo/Links
- **Vercel**: pokehub-react-vite.vercel.app
- **GitHub**: https://github.com/felipecley/pokehub-react-vite/tree/main
- **CodeSandbox (público)**: https://codesandbox.io/p/github/felipecley/pokehub-react-vite/main
- **Vídeo**: https://unilavrasedu-my.sharepoint.com/:v:/g/personal/fcley69_sou_unilavras_edu_br/EWGg2cJ4cpxEmPiT2Slb4zoB6Fr0ldYrE8md6ObY-r1N1Q?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=R3vGl9

---

## Como rodar localmente

```bash
npm install
npm run dev
```

Para autenticação, copie `.env.example` para `.env` e preencha as variáveis do Firebase.

## Deploy (Vercel)
1. New Project → Import from GitHub.
2. Build: `vite build` | Output: `dist`.
3. Deploy e copie a URL pública.

## CodeSandbox (Entrega)
Import from GitHub → Share (público) → teste em janela anônima.

## Estrutura
```
src/
  components/
  pages/
  providers/
  routes/
  services/
```

## Licença
MIT
