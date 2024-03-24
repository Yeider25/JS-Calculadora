function generarMatriz(idMatriz) {
    const tamaño = parseInt(document.getElementById('tamaño-matriz').value);
    const matrizElement = document.getElementById(idMatriz);
    matrizElement.innerHTML = '';
    for (let i = 0; i < tamaño; i++) {
        for (let j = 0; j < tamaño; j++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.setAttribute('placeholder', '0');
            matrizElement.appendChild(input);
        }
        matrizElement.appendChild(document.createElement('br'));
    }
}

function rellenarCeldasVacias() {
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        if (!input.value) {
            input.value = 0;
        }
    });
}

function limpiarMatriz() {
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.value = '';
    });
    document.getElementById('resultado').innerHTML = '';
}

function calcular() {
    const operacion = document.getElementById('operacion').value;
    const matrizA = obtenerValoresMatriz('matrizA');
    const matrizB = obtenerValoresMatriz('matrizB');

    let resultado;
    if (operacion === 'sumar') {
        resultado = sumarMatrices(matrizA, matrizB);
    } else if (operacion === 'restar') {
        resultado = restarMatrices(matrizA, matrizB);
    } else if (operacion === 'multiplicar') {
        resultado = multiplicarMatrices(matrizA, matrizB);
    }

    mostrarResultado(resultado);
}

function obtenerValoresMatriz(idMatriz) {
    const matriz = document.getElementById(idMatriz);
    const inputs = matriz.querySelectorAll('input[type="number"]');
    const filas = [];
    let fila = [];
    inputs.forEach((input, index) => {
        fila.push(parseFloat(input.value));
        if ((index + 1) % Math.sqrt(inputs.length) === 0) {
            filas.push(fila);
            fila = [];
        }
    });
    return filas;
}

function sumarMatrices(matrizA, matrizB) {
    const resultado = [];
    for (let i = 0; i < matrizA.length; i++) {
        const fila = [];
        for (let j = 0; j < matrizA[i].length; j++) {
            fila.push(matrizA[i][j] + matrizB[i][j]);
        }
        resultado.push(fila);
    }
    return resultado;
}

function restarMatrices(matrizA, matrizB) {
    const resultado = [];
    for (let i = 0; i < matrizA.length; i++) {
        const fila = [];
        for (let j = 0; j < matrizA[i].length; j++) {
            fila.push(matrizA[i][j] - matrizB[i][j]);
        }
        resultado.push(fila);
    }
    return resultado;
}

function multiplicarMatrices(matrizA, matrizB) {
    const resultado = [];
    for (let i = 0; i < matrizA.length; i++) {
        const fila = [];
        for (let j = 0; j < matrizB[0].length; j++) {
            let suma = 0;
            for (let k = 0; k < matrizA[i].length; k++) {
                suma += matrizA[i][k] * matrizB[k][j];
            }
            fila.push(suma);
        }
        resultado.push(fila);
    }
    return resultado;
}

function mostrarResultado(resultado) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '<h2>Resultado</h2>';
    const tabla = document.createElement('table');
    for (let i = 0; i < resultado.length; i++) {
        const fila = document.createElement('tr');
        for (let j = 0; j < resultado[i].length; j++) {
            const celda = document.createElement('td');
            celda.textContent = resultado[i][j];
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }
    resultadoDiv.appendChild(tabla);
}
