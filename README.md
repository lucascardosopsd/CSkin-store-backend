# Desafio CSkin Store

Projeto desenvolvido para o desafio da empresa CSkin, que visa ser uma API de CRUD de skins de cs.

---

### Tecnologias

- Nestjs
- Prisma ORM
- Jest
- Nodejs
- Mongodb

---

### Requisitos

- Node v20+
- Docker 27+
- Yarn 1.22+
- NPM 10.8+
- WSL (Windows)

---

### Como rodar

1. Abra o terminal na pasta do projeto e digite `yarn install && yarn prisma db push`
2. Crie uma conta no mongo db atlas e cole a URI no .env atribuindo o valor a variável de ambiente `DATABASE_URL=` ou copie e cole a variável + URI abaixo

   ```jsx
   DATABASE_URL =
     'mongodb+srv://lucascardosopsd:Y2N5pQTDFR8PWlX3@cluster0.7aa65.mongodb.net/dev?retryWrites=true&w=majority&appName=Cluster0';
   ```

   Caso prefira usar credênciais próprias existe a possibilidade de popular o banco com o comando `yarn seed`

3. Inicie a aplicação digitando no terminal `yarn start:dev`

A aplicação rodará na porta 3333

---

### Rotas

**GET** `/skins` (Paginação)

```jsx
Params:{
	startPrice?: number;
  endPrice?: number;
  float?: number;
  name?: string;
  order?: 'asc' | 'desc';
  orderBy?: 'name' | 'price' | 'float';
  category?: string;
  page: number;
  take: number;
}

Return:{
	skins:[
		id: string
		image: string
		category: string
		float: number
		price: number
		createdAt: string
		updatedAt: string
	],
	pages: number
}
```

**GET** `/skins/:id`

```jsx
Params:{
	id: string
}

Return:{
	skins:[
		id: string
		image: string
		category: string
		float: number
		price: number
		createdAt: string
		updatedAt: string
	]
}
```

**POST** `/skins`

```jsx

body:[
	image: string
	category: string
	float: number
	price: number
]

Return:{
		id: string
		image: string
		category: string
		float: number
		price: number
		createdAt: string
		updatedAt: string
}
```

**PATCH** `/skins/:id`

```jsx
Params:{
	id: string
}

body:[
	image: string
	category: string
	float: number
	price: number
]

Return:{
		id: string
		image: string
		category: string
		float: number
		price: number
		createdAt: string
		updatedAt: string
}
```

**DELETE**: `/skins/:id`

```jsx
Params: {
  id: string;
}

Return: {
  id: string;
  image: string;
  category: string;
  float: number;
  price: number;
  createdAt: string;
  updatedAt: string;
}
```

---

### Testes

Os testes foram do tipo integração e abordaram as seguintes funcionalidades:

- Create skin
- Update skin
- Patch skin
- Update skin
- Get many skins (Paginação)

Para rodar basta digitar o comando `yarn test:int` no terminal do projeto

---

### Considerações Tecnicas

- O uso do Docker não foi viável em conjunto com o Prisma devido a um erro, sendo recomendado pelo próprio Prisma o uso do mongo db atlas [neste link](https://www.prisma.io/docs/orm/overview/databases/mongodb#replica-set-configuration)
- Na descrição do desafio é pedido para que se use o campo `float` do model item como string, mas optei por atribuir o tipo `Float` para que não houvesse necessidade de conversões posteriores
- Na descrição do desafio é pedido para que o model se chame `Item`, porém optei por utiliar o nome `Skin` para que ficasse mais claro
