# 🧪 Guia de Testes - Frontend + Backend

## ⚡ Teste Rápido

### 1. Iniciar o Backend

```bash
# No diretório do backend Spring Boot
./mvnw spring-boot:run
# ou
mvn spring-boot:run
```

### 2. Iniciar o Frontend

```bash
# No diretório do frontend React
npm run dev
```

### 3. Testar Cadastro (Home)

1. Acesse: `http://localhost:5173`
2. Role até o formulário de cadastro
3. Preencha:
   - Nome: "João Silva"
   - Email: "joao@teste.com"
   - Senha: "123456"
4. Clique em "Realizar Cadastro"
5. ✅ Deve aparecer mensagem de sucesso

### 4. Testar Login

1. Clique no botão "Já tenho cadastro - Fazer Login"
2. Preencha qualquer nome, email e senha
3. Clique em "Entrar"
4. ✅ Deve redirecionar para o AdminPanel

### 5. Testar CRUD no AdminPanel

#### Criar Usuário

1. Clique em "Adicionar Usuário"
2. Preencha:
   - Nome: "Maria Santos"
   - Email: "maria@teste.com"
   - Telefone: "(11) 98765-4321"
3. Clique em "Salvar"
4. ✅ Usuário deve aparecer na tabela

#### Editar Usuário

1. Clique em "Editar" em um usuário
2. Altere o nome para "Maria Santos Silva"
3. Clique em "Salvar"
4. ✅ Nome deve ser atualizado na tabela

#### Excluir Usuário

1. Clique em "Excluir" em um usuário
2. Confirme a exclusão
3. ✅ Usuário deve sumir da tabela

#### Testar Paginação

1. Crie mais de 10 usuários
2. ✅ Deve aparecer controles de paginação
3. Navegue entre as páginas

---

## 🔍 Verificar no Backend

### Método 1: Console do Spring Boot

Verifique os logs no console onde o backend está rodando:

```
POST /api/cadastro/cadastrar
POST /api/usuario/criar
GET /api/usuario/listar?page=0&size=10
PUT /api/usuario/1
DELETE /api/usuario/1
```

### Método 2: Banco de Dados

Se estiver usando H2 Console:

1. Acesse: `http://localhost:8080/h2-console`
2. Execute: `SELECT * FROM usuario`

Se estiver usando MySQL/PostgreSQL:

```sql
SELECT * FROM usuario;
```

---

## 🛠️ Debug no Frontend

### 1. Console do Navegador (F12)

Verifique:

- ❌ Erros em vermelho
- ⚠️ Warnings em amarelo
- ℹ️ Logs de requisições

### 2. Aba Network

1. Abra DevTools (F12)
2. Vá em "Network"
3. Filtre por "Fetch/XHR"
4. Faça uma requisição
5. Verifique:
   - Status Code (deve ser 200 ou 201)
   - Response (dados retornados)
   - Request (dados enviados)

### 3. Aba React DevTools

Se tiver a extensão instalada:

1. Vá em "Components"
2. Selecione o componente
3. Veja o estado (hooks)

---

## ✅ Checklist de Funcionamento

### Backend

- [ ] Backend está rodando na porta 8080
- [ ] Endpoint `/api/cadastro/cadastrar` responde
- [ ] Endpoint `/api/usuario/criar` responde
- [ ] Endpoint `/api/usuario/listar` responde
- [ ] CORS está configurado corretamente

### Frontend

- [ ] Frontend está rodando na porta 5173
- [ ] Página Home carrega corretamente
- [ ] Formulário de cadastro funciona
- [ ] Página AdminPanel carrega
- [ ] Listagem de usuários funciona
- [ ] Criar usuário funciona
- [ ] Editar usuário funciona
- [ ] Excluir usuário funciona
- [ ] Paginação funciona

---

## 🐛 Problemas Comuns

### Erro: "Network Error"

**Causa**: Backend não está rodando ou URL incorreta
**Solução**:

1. Verifique se o backend está rodando
2. Confirme a URL em `src/services/config.ts`

### Erro: "CORS policy"

**Causa**: Backend não permite requisições do frontend
**Solução**: Configure CORS no backend (veja INTEGRACAO.md)

### Erro: "404 Not Found"

**Causa**: Endpoint não existe ou está com URL errada
**Solução**: Verifique os endpoints no backend

### Dados não aparecem na tabela

**Causa**: Backend não tem dados ou requisição falhou
**Solução**:

1. Cadastre alguns usuários primeiro
2. Verifique o Network no DevTools
3. Veja o console por erros

### Modal não fecha após salvar

**Causa**: Erro na requisição
**Solução**: Verifique o console por erros

---

## 📊 Exemplo de Teste Completo

```
1. ✅ Backend iniciado em http://localhost:8080
2. ✅ Frontend iniciado em http://localhost:5173
3. ✅ Cadastro na Home funcionando
4. ✅ Login redirecionando para AdminPanel
5. ✅ Listagem de usuários carregando
6. ✅ Criar novo usuário funcionando
7. ✅ Editar usuário funcionando
8. ✅ Excluir usuário funcionando
9. ✅ Paginação funcionando
10. ✅ Mensagens de erro/sucesso aparecendo
```

---

## 📝 Dados de Teste

Use estes dados para testar:

```json
// Cadastro 1
{
  "nome": "João Silva",
  "email": "joao@teste.com",
  "senha": "123456"
}

// Cadastro 2
{
  "nome": "Maria Santos",
  "email": "maria@teste.com",
  "senha": "123456"
}

// Usuário CRUD 1
{
  "nome": "Pedro Oliveira",
  "email": "pedro@teste.com",
  "telefone": "(11) 98765-4321"
}

// Usuário CRUD 2
{
  "nome": "Ana Costa",
  "email": "ana@teste.com",
  "telefone": "(21) 91234-5678"
}
```

---

## 🎯 Resultado Esperado

Após seguir todos os passos:

1. ✅ Você deve conseguir cadastrar usuários na Home
2. ✅ Fazer login e acessar o AdminPanel
3. ✅ Criar, editar e excluir usuários
4. ✅ Navegar entre páginas de usuários
5. ✅ Ver mensagens de sucesso/erro apropriadas
6. ✅ Ver loading states durante requisições

---

**Bom teste! 🚀**
