function error(message, codigo) {
let e = new Error(message);

if(codigo) {
    e.statusCodigo = codigo;
}
return e;
}

module.exports = error;