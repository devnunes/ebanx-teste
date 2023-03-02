<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="Project logo"></a>
</p>

<h3 align="center">backebanx</h3>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Built Using](#built_using)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

This is my solution for the practical test at Ebanx.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

A list of what you gonna need to install to run this project.

- Node

  [Here](https://www.alura.com.br/artigos/como-instalar-node-js-windows-linux-macos?gclid=CjwKCAiAr4GgBhBFEiwAgwORraCEtHblYqXAsMSmUAfUL2KFN7_n3H9yldAZZLz4m6Kbo3xrkxdl2xoC8XgQAvD_BwE) a tutorial to install node in your favorite OS.

- Yarn

  With Node instalation now you have npm use to install yarn:

```
npm install --global yarn
```

### Installing

After cloning this repository in your machine.
You will need to access the folder with your terminal and run this comands:

```
yarn install
```

```
yarn dev
```

The message in console "HTTP Server running!" its a sign that's evrything it's running.
Good hacking.

## 🔧 Running the tests <a name = "tests"></a>

To run automated tests, run this code in the terminal:

```
yarn test
```

### Break down into end to end tests

These tests wil test the business login in the aplication.

### And coding style tests

Eslint and Prettier will work together to mantain the code style and pattern for a nice apresentation.

```
yarn lint
```

## 🚀 Deployment <a name = "deployment"></a>

To deploy this aplication on the internet, you can use ngrok.
Install ngrok agent, [here](https://ngrok.com/docs/getting-started), you can jump to step 2 directly and go until step 4.
Before you run the step 4, make sure of the aplication is running with:

```
yarn dev
```

And then

```
ngrok http 3333
```

## ⛏️ Built Using <a name = "built_using"></a>

- [Fastify](https://www.fastify.io/) - web framework.
- [Vitest](https://vitest.dev/) - Test framework.
- [TSup](https://tsup.egoist.dev/) - Bundler Typescript.
- [Typescript](https://www.typescriptlang.org/) - Programming language.

## ✍️ Authors <a name = "authors"></a>

- [@devnunes](https://github.com/devnunes)

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- Learned to use fastify, it's really easy.
