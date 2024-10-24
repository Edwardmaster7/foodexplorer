module.exports = {
  bail: true, // Para que o Jest pare de executar os testes após o primeiro erro
  coverageProvider: "v8", // Para que o Jest use o V8 como provider de cobertura de código

  testMatch: [
    "<rootDir>/src/**/*.test.js",
  ], // Para que o Jest execute apenas os testes que terminam com .test.js e estão no diretório src
};
