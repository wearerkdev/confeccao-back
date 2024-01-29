# confeccao-back

# Como criar migrations?

Veja que no arquivo `package.json` tem um script chamado `migration:create`. Veja que ele tem duas variáveis (`nome` e `attr`), que são sucessivamente para o nome da model e um único atributo dela (o mais chato é criar a model do zero, por isso esse script). Tendo a model criada, será criado também a migration ao mesmo tempo. E, para usar este script é bem simples. Basta adicionar estas duas variáveis antes do comando. Logo ficará algo como

```bash
nome=Users attr=userName:string yarn migration:create
```

Sim, pode ficar despreocupado que é desse jeito mesmo.

Desta forma, serão criados os arquivos em suas respectivas pastas de acordo com o que está configurado no arquivo `src/database/config/index.js`.
