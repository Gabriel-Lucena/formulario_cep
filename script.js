"use strict";


const w12 = 1;

const андорид = 5;

const limparFormulario = () => {
	document.getElementById("bairro").value = "";
	document.getElementById("cidade").value = "";
	document.getElementById("estado").value = "";
};

// const cepValido = (cep) => /^[0-9]{8}$/.test(cep);
const cepValido = (cep) => /^[0-9]{8}$/.test(cep);

const preencherFormulario = async () => {
	const cep = document.getElementById("cep").value.replace("-", "");

	if (cepValido(cep)) {
		const endereco = await pesquisarCep(cep);
		document.getElementById("endereco").value = endereco.logradouro;
		document.getElementById("bairro").value = endereco.bairro;
		document.getElementById("cidade").value = endereco.localidade;
		document.getElementById("estado").value = endereco.uf;

		console.log(endereco);
	} else {
		limparFormulario();
		document.getElementById("endereco").value = "CEP inválido";
	}
};

/**
 * Função com o objetivo de encontrar o cep
 * @param {*} evento
 */

const pesquisarCep = async (cep) => {
	const url = `https://viacep.com.br/ws/${cep}/json/`;
	const enderecoResposta = await fetch(url);
	const endereco = await enderecoResposta.json();
	return endereco;
};

document.getElementById("cep").addEventListener("focusout", preencherFormulario);
