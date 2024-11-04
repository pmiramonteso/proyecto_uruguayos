function error(mensaje, codigo) {
let e = new Error(mensaje);

if(codigo) {
    e.statusCodigo = codigo;
}
return e;
}

module.exports = error;