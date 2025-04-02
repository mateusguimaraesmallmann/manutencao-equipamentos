# Frontend

> [!TIP]
> Apenas o email dos `"users"` (do arquivo [db.json](https://github.com/mateusguimaraesmallmann/manutencao-equipamentos/blob/main/frontend/db.json)) são utilizados para a autenticação pelo `json-server`.

- Utilize qualquer um dos emails a seguir para autenticar com sucesso.
```
a@a.com
b@b.com
```

> [!IMPORTANT]
> Rode o `npm install` antes dos comandos abaixo!

## Rodar apenas o Angular
```shell
ng serve
```
## Rodar apenas o `json-server` na porta 3000
```shell
npm run start:server
```
## Rodar ambas simultaneamente
> Ambas as aplicações rodam no mesmo terminal graças a lib [concurrently](https://github.com/open-cli-tools/concurrently)
```shell
npm start
```


