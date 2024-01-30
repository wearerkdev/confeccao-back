# confeccao-back

## Pequeno dicionario

- factory é confecção, apenas mudado para não ter problemas de acentuação

# Como criar migrations?

Veja que no arquivo `package.json` tem um script chamado `model:create`. Veja que ele tem uma variável (`nome`), que para o nome da model . Tendo a model criada, será criado também a migration ao mesmo tempo. E, para usar este script é bem simples. Basta adicionar esta variável antes do comando. Logo ficará algo como

```bash
nome=Users yarn migration:create
```

Sim, pode ficar despreocupado que é desse jeito mesmo.

Desta forma, serão criados os arquivos em suas respectivas pastas de acordo com o que está configurado no arquivo `src/database/config/index.js`.

Desta forma será criada a model com um único atributo (`user:string`). Assim, bastará adicionar os campos restantes para os outros campos necessários.

O mesmo acontece para o script `migration:create`. Como ele serve para criar uma nova migration e precisa dar um novo nome para a migration, então este script irá ajudar neste momento.
