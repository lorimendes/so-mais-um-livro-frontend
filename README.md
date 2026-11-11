# Front-end - Só mais um livro

Uma **Single Page Application (SPA)** desenvolvida em React para busca de obras literárias e gerenciamento de sessões de usuários.

**URL:** <https://somaisumlivro.estradatech.com>

## Funcionalidades

Principais interações disponíveis para o usuário:

- **Autenticação:** sistema de cadastro e login de usuários com comunicação direta com a API RESTful própria. Toda a interação ocorre via modais integrados à interface.

- **Busca de livros:** integração com a API pública do Google Books para pesquisar obras.

- **Exibição de resultados:** apresentação dos livros encontrados, incluindo capa, título, autores e sinopse/descrição.

- **Validação de formulários:** validação instantânea de dados no front-end para garantir a integridade das informações antes do envio.

- **Design responsivo:** interface fluida e adaptável para diversos tamanhos de tela (a partir de 320px de largura).

## Rotas

Rotas privadas são protegidas e redirecionam usuários não logados.

| Rota           | Descrição                                                             | Acesso                   |
| -------------- | --------------------------------------------------------------------- | ------------------------ |
| `/`            | Página inicial. Contém os modais de acesso (login e cadastro).        | Público                  |
| `/book-search` | Rota para realizar pesquisas na API do Google Books e ver resultados. | Protegida (Requer login) |

## Tecnologias e arquitetura

**Stack Front-end:**

- React.js
- Vite
- React Router DOM
- CSS puro com metodologia BEM

**Gerenciamento de estado e ciclo de vida:**

- Componentes 100% controlados.
- Hooks nativos (`useState`, `useEffect`, `useCallback`).
- Custom Hooks (`useFormWithValidation` para formulários, tratamento de estado visual e erros).

**Infraestrutura e deploy:**

- **Servidor:** máquina virtual Ubuntu no Google Cloud.
- **Roteamento e hospedagem:** Nginx hospedando a pasta `dist` gerada pelo build.
- **Segurança:** certificado SSL/TLS (HTTPS) emitido via Certbot.

## Como rodar este projeto localmente

1. Clone o repositório.
2. Entre na pasta do projeto e instale as dependências: `npm install`
3. Crie um arquivo `.env` na raiz do projeto, incluindo a chave da API do Google Books. O arquivo deve seguir este padrão:

   ```env
   VITE_GOOGLE_BOOKS_API_KEY=sua_chave_aqui
   ```

   _(Nota: para obter a chave, acesse [Google Books API](https://console.cloud.google.com/marketplace/product/google/books.googleapis.com?q=search&referrer=search&project=project-32660a37-0a47-4fca-976) e gere uma credencial de Chave de API. Consulte a [documentação oficial da API do Google Books](https://developers.google.com/books/docs/v1/using#APIKey) para um passo a passo detalhado.)_

4. Inicie o servidor em modo de desenvolvimento com o Vite: `npm run dev`

##

**Desenvolvido por Lorena Mendes**.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/lorenans)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/lorimendes)
