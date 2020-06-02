//============================================
// Puerto de conexion base de datos
//============================================

process.env.PORT = process.env.PORT || 5000

//============================================
// SEED
//============================================

process.env.SEED = process.env.SEED || 'semilla-desarrollo-ipronect' // Se debe configurar en produccion


// ==========================================
// Entorno
// ==========================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';



// ==========================================
// DB y URL_EMAIL
// ==========================================

let urlDB;
let url;

if (process.env.NODE_ENV === 'dev') {

    urlDB = 'mongodb://localhost:27017/iPronect';
    url = 'http://localhost:5000';
} else {
    urlDB = process.env.MONGO_URI;
    url = process.env.URL;
}

process.env.URL_DB = urlDB;
process.env.URL_NETFRUIT = url;