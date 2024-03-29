const express= require('express');
const router = express();
// libreria que utilizaremos para la encriptacion de los password
const bcrypt= require('bcrypt');
// libreria que utilizaremos para la generacion de nuesrto token
const jwt= require('jsonwebtoken');
//////archivo de conexion
const mysqlConeccion = require('../database/database');
//////fin archivo de conexion

///////RUTA RAÍZ///////////////
router.get('/', (req, res)=>{
    res.send('RUTA RAIZ');
});
///////RUTA RAÍZ///////////////



///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////////RUTAS ABOGADOS///////////////////////
//////////////////RUTAS ABOGADOS///////////////////////
/////////////////RUTAS ABOGADOS////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
router.get('/abogados', (req, res)=>{
    // jwt.verify(req.token, 'siliconKey', (error, valido)=>{
        // if(error){
        //     res.sendStatus(403);
        // }else{
        mysqlConeccion.query('select * from abogados', (err, registro)=>{
            if(!err){
                res.json(registro);
            }else{
                console.log(err)
            }
        })
        // }
    // })
});


    //////////////////////////////////////////////////
    //CAMBIO DE ESTADO ABOGADOS EN LA BASE DE DATOS//
    /////////////////////////////////////////////////

router.put('/cambioestadoabogados/:idabogados', (req, res)=>{
     let id  = req.params.id;
     let estado=req.body.estado  
     
     let query=`UPDATE abogados SET estado='${estado}' WHERE idabogados='${id}'`;
     mysqlConeccion.query(query, (err, registros)=>{
        if(!err){
            res.json({
                status: true,
                mensaje:"El estado del alumno se cambio correctamente"
            });
        }else{
            res.json({
                status: false,
                mensaje:"Hubo un error"
            });
        }
    })
    
});

    /////////////////////////////////////////////////////////
    // FIN - CAMBIO DE ESTADO ABOGADOS EN LA BASE DE DATOS//
    ////////////////////////////////////////////////////////

    // EDITAR ABOGADO METODO PUT //

    router.put('/abogados/:idabogados', verificarToken, (req, res)=>{
        //asigna a idclientes el valor que recibe por el parametro 
        let idabogados  = req.params.idabogados;
        const { nombre, apellido, matricula, email, telefono } =req.body  
        console.log(req.body)
        jwt.verify(req.token, 'siliconKey', (error)=>{
            if(error){
                res.sendStatus(403);
            }else{
                    let query=`UPDATE dbweb.abogados SET nombre='${nombre}', apellido='${apellido}', matricula='${matricula}', email='${email}', telefono='${telefono}' WHERE idabogados='${idabogados}'`;
                    mysqlConeccion.query(query, (err, registros)=>{
                        if(!err){
                            res.send('El Id que editamos es : '+idabogados+' y cambiamos muchos campos!!');
                        }else{
                            console.log(err)
                        }
                    })
                }
            })    
    });

    /////////////////////////////////////////
    //ALTA y BAJA ABOGADOS EN LA BASE DE DATOS//
    /////////////////////////////////////////


router.put('/altaabogados/:idabogados', (req, res)=>{
    let id  = req.params.id;
    let query=`UPDATE abogados SET estado='A' WHERE id_curso='${id}'`;

     mysqlConeccion.query(query, (err, registros)=>{
        if(!err){
            res.json({
                status: true,
                mensaje:"El abogado se dio de Alta correctamente"
            });
        }else{
           res.json({
                status: false,
                mensaje:"Hubo un error"
            });
        }
    })
    
});

router.put('/bajaabogados/:idabogados', (req, res)=>{
    let id  = req.params.id;
    let query=`UPDATE abogados SET estado='B' WHERE idabogados='${id}'`;

     mysqlConeccion.query(query, (err, registros)=>{
        if(!err){
            res.json({
                status: true,
                mensaje:"El abogado se dio de Alta correctamente"
            });
        }else{
           res.json({
                status: false,
                mensaje:"Hubo un error"
            });
        }
    })
    
});

    //////////////////////////////////////////////
    //FIN - ALTA y BAJA DE ABOGADOS EN LA BASE DE DATOS//
    /////////////////////////////////////////////



router.get('/abogados/:idabogados', (req, res)=>{
    // jwt.verify(req.token, 'siliconKey', (error)=>{
    //     if(error){
    //         res.sendStatus(403);
    //     }else{
        const  { idabogados } = req.params;
                mysqlConeccion.query('select * from abogados where idabogados=?',[idabogados], (err, registros)=>{
                    if(!err){
                        res.json(registros);
                    }else{
                        console.log(err)
                    }
                })
            //}
        //})
    });

    /////////////////////////////////////////
    //INSERTAR ABOGADOS EN LA BASE DE DATOS//
    /////////////////////////////////////////

router.post('/insertarabogados', (req, res)=>{
    const { nombre, apellido, matricula, email, telefono } = req.body
     console.log(req.body);
            let query=`INSERT INTO abogados (nombre, apellido, matricula, email, telefono) VALUES ('${nombre}', '${apellido}', '${matricula}', '${email}', '${telefono}')`;
            mysqlConeccion.query(query, (err, registros)=>{
                if(!err){
                    res.json({
                        status: true,
                        mensaje:"El abogado se dio de Alta correctamente"
                    });
                }else{
                    console.log(err)
                }
            })
      
    
});
    //////////////////////////////////////////////
    //FIN-INSERTAR ABOGADOS EN LA BASE DE DATOS//
    /////////////////////////////////////////////

    /////////////////////////////////////////
    //INSERTAR CONSULTAS EN LA BASE DE DATOS//
    /////////////////////////////////////////

    router.post('/insertarconsulta', (req, res)=>{
        const { dni, nombre, apellido, domicilio, telefono, texto, abogado_vinculado} = req.body
         console.log(req.body);
                let query=`INSERT INTO consultas (dni, nombre, apellido, domicilio, telefono, texto, abogado_vinculado, fecha) 
                VALUES ('${dni}', '${nombre}', '${apellido}', '${domicilio}', '${telefono}', '${texto}', '${abogado_vinculado}', NOW())`;
                mysqlConeccion.query(query, (err, registros)=>{
                    if(!err){
                        res.json({
                            status: true,
                            mensaje:"La consulta se dio de alta correctamente"
                        });
                    }else{
                        console.log(err)
                    }
                })
          
        
    });

    ////////////////////////////////////////////////
    // FIN-INSERTAR CONSULTAS EN LA BASE DE DATOS//
    //////////////////////////////////////////////
   
    ///////////////////////////////////////////////////////////////
    //metodo para elimiinar los datos de un abogado en particular//
    //////////////////////////////////////////////////////////////

//metodo para elimiinar los datos de un abogado en particular
router.delete('/abogados/:idabogados', verificarToken, (req, res)=>{
   let idabogados  = req.params.idabogados; 
   jwt.verify(req.token, 'siliconKey', (error, valido)=>{
             if(error){
                res.sendStatus(403);
             }else{
        let query=`DELETE FROM dbweb.abogados WHERE idabogados='${idabogados}'`;
        mysqlConeccion.query(query, (err, registros)=>{
                if(!err){
                    res.json({
                        status: true,
                        mensaje:"El abogado se elimino de la base de datos"
                    });
                }else{
                    res.send('El error  es : '+ err); 
                }
            })
        }
    });
})
    ///////////////////////////////////////////////////////////////
    //metodo para elimiinar los datos de un abogado en particular//
    ///////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////////FIN RUTAS ABOGADOS///////////////////////
//////////////////FIN RUTAS ABOGADOS///////////////////////
/////////////////FIN RUTAS ABOGADOS////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////









///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////////RUTAS CLIENTES///////////////////////
//////////////////RUTAS CLIENTES///////////////////////
/////////////////RUTAS CLIENTES////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////



    /////////////////////////////////////////
    //LISTAR CLIENTES DE LA BASE DE DATOS//
    /////////////////////////////////////////


        router.get('/clientes', verificarToken, (req, res)=>{
            jwt.verify(req.token, 'siliconKey', (error)=>{
                if(error){
                    res.sendStatus(403);
                }else{
                const query='select * from clientes ';
                mysqlConeccion.query(query, (err, rows)=>{
                    if(!err){
                        res.json(rows);
                    }else{
                        console.log(err)
                    }
                })
            }
         }) 
    });


// GET CLIENTES BY ID

router.get('/clientes/:idclientes', verificarToken, (req, res)=>{
    const { idclientes } = req.params;
    jwt.verify(req.token, 'siliconKey', (error)=>{
        if(error){
            res.sendStatus(403);
        }else{
                mysqlConeccion.query('select * from dbweb.clientes WHERE idclientes=?', [idclientes], (err, registros)=>{
                    if(!err){
                        res.json(registros);
                    }else{
                        console.log(err)
                    }
                 })
        }
    })
});



    /////////////////////////////////////////
    //FIN - LISTAR CLIENTES DE LA BASE DE DATOS//
    /////////////////////////////////////////


    /////////////////////////////////////////
    //TRAER CONSULTAS DESDE LA BASE DE DATOS//
    /////////////////////////////////////////

router.get('/consultas', (req, res)=>{
    // jwt.verify(req.token, 'siliconKey', (error, valido)=>{
        // if(error){
        //     res.sendStatus(403);
        // }else{
        mysqlConeccion.query('select * from consultas', (err, registro)=>{
            if(!err){
                res.json(registro);
            }else{
                console.log(err)
            }
        })
        // }
    // })
});

//Emvia un marcar LEIDO a la consulta

router.put('/leidoconsultas/:id', (req, res)=>{

    let id = req.params.id;
    console.log("el parametro que recibo es:", id);
     let query=`UPDATE dbweb.consultas SET leido='si' WHERE idconsultas='${id}'`;
     mysqlConeccion.query(query, (err, registros)=>{
        if(!err){
            res.json({
                status: true,
                mensaje:"La consulta se marco como leido"
            });
        }else{
            console.log(err)
        }
    })
    
});

//NO LEIDO

router.put('/noleidoconsultas/:id', (req, res)=>{

    let id = req.params.id;
    console.log("el parametro que recibo es:", id);
     let query=`UPDATE dbweb.consultas SET leido='no' WHERE idconsultas='${id}'`;
     mysqlConeccion.query(query, (err, registros)=>{
        if(!err){
            res.json({
                status: true,
                mensaje:"La consulta se marco como leido"
            });
        }else{
            console.log(err)
        }
    })
    
});

    /////////////////////////////////////////
    //INSERTAR CLIENTES EN LA BASE DE DATOS//
    /////////////////////////////////////////

router.post('/clientes', verificarToken, (req, res)=>{
    const { dni, nombre, apellido , email, telefono, domicilio } =req.body 
    jwt.verify(req.token, 'siliconKey', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
            let query=`INSERT INTO alumnos (dni, nombre, apellido, email,telefono, domicilio, fecha_creacion) VALUES ('${dni}','${nombre}','${apellido}','${email}','${telefono}', '${domicilio}', NOW())`;
            mysqlConeccion.query(query, (err, registros)=>{
                if(!err){
                    res.json(resultado.idclientes)
                }else{
                    console.log(err)
                    res.send('El error es: '+err);
                }
            })
        }
    })
    
});

//Sin verificacion de Token

router.post('/insertarclientes', (req, res)=>{
    const { dni, nombre, apellido , email, telefono, domicilio } = req.body
    console.log(req.body);
    jwt.verify(req.token, 'siliconKey', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
    let query=`INSERT INTO clientes (dni, nombre, apellido, email, telefono, domicilio, fecha_creacion) VALUES ('${dni}','${nombre}','${apellido}','${email}','${telefono}', '${domicilio}', NOW())`;
            mysqlConeccion.query(query, (error, resultado)=>{
                if(!error){
                    res.json({

                        status:true,
                        mensaje:"mensajito de felicidad"
                    });
                }else{
                    console.log(err)
                    res.send('El error es: '+error);
                }
            })
        }
    })
})

//Sin verificacion de Token

//Insertar Cliente relacionado a abogados

router.post('/insertclients', verificarToken, function(req, res) {

    // Capturar los datos del formulario
    const { dni, nombre, apellido , email, telefono, domicilio, abogado_bond } = req.body
    console.log("que llega en abogado bond", abogado_bond)
    // Insertar un nuevo registro en la tabla "clientes"
    jwt.verify(req.token, 'siliconKey', (error)=>{
        if(error){
            res.sendStatus(403);
        }else{
                    mysqlConeccion.query(`INSERT INTO clientes (dni, nombre, apellido, email, telefono, domicilio, abogado_bond, fecha_creacion) VALUES ('${dni}','${nombre}','${apellido}','${email}','${telefono}', '${domicilio}', '${abogado_bond}', NOW())`, 
                    function(error, results, fields) {
                    if (error) throw error;
                
                    // Capturar el ID del cliente recién insertado
                    const clienteId = results.insertId;
                
                    // Insertar un nuevo registro en la tabla "abogadosxclientes" para relacionar al abogado con el cliente
                    mysqlConeccion.query('INSERT INTO abogadosxclientes (id_abogado, id_cliente, fecha) VALUES (?, ?, NOW())', [abogado_bond, clienteId], function(error, results, fields) {
                        if (error) throw error;
                
                        // Enviar una respuesta al cliente
                        res.send('Cliente creado correctamente');
                    });
                });
            } 
        })
})

//Insertar Cliente relacionado a abogados

    /////////////////////////////////////////
    //FIN - INSERTAR CLIENTES EN LA BASE DE DATOS//
    /////////////////////////////////////////


    //////////////////////////////////////////////////////////////
    ////metodo para insertar clientes relacionados a un abogado//
    ////////////////////////////////////////////////////////////

router.post('/abogadosxclientes', (req, res)=>{
    console.log(req.body);
    const { id_cliente, id_abogado } = req.body
    mysqlConeccion.query('select * from abogadosxclientes where id_cliente=? AND id_abogado=?',[id_cliente, id_abogado], (err, rows)=>{
        if(!err){
            if(rows.length!=0){
                res.json(
                    {
                        status: false,
                        mensaje:"El cliente ya tiene un abogado asignado."
                    });
                
            }else{
                let query=`INSERT INTO abogadosxclientes (id_cliente, id_abogado, fecha) VALUES ('${id_cliente}','${id_abogado}', NOW())`;
                mysqlConeccion.query(query, (err, registros)=>{
                    if(!err){
                        res.send('Se asigno correctamente el cliente: '+id_cliente+'al abogado :'+id_abogado);
                    }else{
                        console.log(err)
                        res.send('El error es: '+err);
                    }
                })
            }
        }else{
            res.send('El error es: '+err);
        }
        });  
});

// VISTA RELACIONADOS ABOGADOS POR CLIENTES

router.get('/vistarelacion', (req, res)=>{
    // jwt.verify(req.token, 'siliconKey', (error, valido)=>{
        // if(error){
        //     res.sendStatus(403);
        // }else{
        mysqlConeccion.query(`SELECT concat_ws(' ', ab.nombre, ab.apellido) AS ABOGADOS, concat_ws(' ', c.nombre, c.apellido) AS CLIENTES
        FROM dbweb.abogados as ab
        INNER JOIN dbweb.abogadosxclientes ON ab.idabogados = abogadosxclientes.id_abogado
        INNER JOIN dbweb.clientes AS c ON abogadosxclientes.id_cliente = c.idclientes;`, (err, registro)=>{
            if(!err){
                res.json(registro);
            }else{
                console.log(err)
            }
        })
        // }
    // })
});
    
    //////////////////////////////////////////////////////////////
    ////metodo para elimiinar los datos de un cliente en particular///
    ////////////////////////////////////////////////////////////

router.delete('/clientes/:idclientes', verificarToken ,(req, res)=>{
    let idclientes  = req.params.id; 
        jwt.verify(req.token, 'siliconKey', (error, valido)=>{
            if(error){
            res.sendStatus(403);
            }else{
                let query=`DELETE FROM clientes WHERE idclientes='${idclientes}'`;
                mysqlConeccion.query(query, (err, registros)=>{
                    if(!err){
                    res.send('El cliente que ELIMINAMOS es ID : '+ idclientes);
                    }else{
                    res.send('El error  es : '+ err); 
                }
            })
        }
    })
 });

    ////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////



    //////////////////////////////////////////////////////////////
    ////metodo para editar los datos de un cliente en particular///
    ////////////////////////////////////////////////////////////

router.put('/clientes/:idclientes', verificarToken, (req, res)=>{
    //asigna a idclientes el valor que recibe por el parametro 
    let idclientes  = req.params.idclientes;
    const { dni, nombre, apellido , email, telefono, domicilio } =req.body  
    console.log(req.body)
    jwt.verify(req.token, 'siliconKey', (error)=>{
        if(error){
            res.sendStatus(403);
        }else{
                let query=`UPDATE dbweb.clientes SET dni='${dni}', nombre='${nombre}', apellido='${apellido}', email='${email}', telefono='${telefono}', domicilio='${domicilio}', fecha_modificacion=NOW() WHERE idclientes='${idclientes}'`;
                mysqlConeccion.query(query, (err, registros)=>{
                    if(!err){
                        res.send('El Id que editamos es : '+idclientes+' y cambiamos muchos campos!!');
                    }else{
                        console.log(err)
                    }
                })
            }
        })    
});

    ////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////


    //////////////////////////////////////////////////////////////
    ////metodo para editar los datos de un cliente en particular///
    ////////////////////////////////////////////////////////////

router.put('/bajacliente/:id', (req, res)=>{

    let id = req.params.id;
    console.log("el parametro que recibo es:", id);
     let query=`UPDATE dbweb.clientes SET estado='B' WHERE idclientes='${id}'`;
     mysqlConeccion.query(query, (err, registros)=>{
        if(!err){
            res.json({
                status: true,
                mensaje:"El cliente se dio de baja correctamente"
            });
        }else{
            console.log(err)
        }
    })
    
});

    ////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////


    //////////////////////////////////////////////////////////////
    ////metodo para editar los datos de un cliente en particular///
    ////////////////////////////////////////////////////////////

router.put('/altacliente/:id', (req, res)=>{
    // asigna a id_usuario el valor que recibe por el parametro 
     let id  = req.params.id;
     let query=`UPDATE clientes SET estado='A' WHERE idclientes='${id}'`;
     mysqlConeccion.query(query, (err, registros)=>{
        if(!err){
            res.json({
                status: true,
                mensaje:"El cliente se dio de alta correctamente"
            });
        }else{
            console.log(err)
        }
    })
    
});


    ////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////////RUTAS LOGIN USUARIOS///////////////////////
//////////////////RUTAS LOGIN USUARIOS///////////////////////
/////////////////RUTAS LOGIN USUARIOS////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////



    //////////////////////////////////////////////////////////////
    ////metodo para listar todos los usuarios registrados///
    ////////////////////////////////////////////////////////////

router.get('/login', (req, res)=>{
     mysqlConeccion.query('select * from login', (err, registro)=>{
    if(!err){
        // console.log(registro.length)
        res.json(registro);
    }else{
        console.log(err)
    }
    })
});

    ////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////

////////////login de usuarios //////////////
router.post('/login', (req, res)=>{
    const {user, password} =req.body
    if(user!=undefined && password!=undefined){
        mysqlConeccion.query('select l.idlogin, l.user,  l.password,  l.id_login_abogado FROM login l where l.estado="A" AND user=?',[user], (err, rows)=>{
            if(!err){
                if(rows.length!=0){
                    const bcryptPassword = bcrypt.compareSync(password, rows[0].password);
                    if(bcryptPassword){
                        jwt.sign({rows}, 'siliconKey', {expiresIn:'1h'},(err, token)=>{
                            res.json(
                                {
                                    status: true,
                                    datos: rows,
                                    token: token
                                });
                        }) 
                    }else{
                        res.json(
                            {
                                status: false,
                                mensaje:"La Contraseña es incorrecta"
                            });
                    }
                }else{
                    res.json(
                        {
                            status: false,
                            mensaje:"El usuario no existe "
                        });
                    
                }
            }else{
                res.json(
                    {
                        status: false,
                        mensaje:"Error en el servidor"
                    });
                
            }
        });
    }else{
        res.json({
            status: false,
            mensaje:"Faltan completar datos"
        });
    }
});

////////////login de usuarios //////////////


    //////////////////////////////////////////////////////////////
    ////metodo para registrar un usuario////////////////////////
    ////////////////////////////////////////////////////////////


router.post('/registro', async(req, res)=>{
    const {user, password, id_login_abogado} = req.body
    let hash = bcrypt.hashSync(password,10);

    let query=`INSERT INTO login (user, password, id_login_abogado, fecha_creacion) VALUES ('${user}','${hash}','${id_login_abogado}',NOW())`;
    mysqlConeccion.query(query, (err, registros)=>{
        if(!err){
            res.json({
                status: true,
                mensaje:"El usuario se creo correctamente"
            });
        }else{
            res.send('Ocurrio un error desde el servidor'+err);
        }
    })
});


    ////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////


    /////////////////////////////////////////////////////////////////////////////
    ////metodo para resetear la contraseña de un usuario////////////////////////
    ///////////////////////////////////////////////////////////////////////////


router.put('/resetpassword/:id', (req, res)=>{
    // asigna a id_usuario el valor que recibe por el parametro 
     let id  = req.params.id;
    // //asigna el valor que recibe  en el Body 
     const { password } =req.body 
     let hash = bcrypt.hashSync(password,10); 
    //  generamos la query de modificacion del password
     let query=`UPDATE usuarios SET password='${hash}' WHERE id='${id}'`;
     mysqlConeccion.query(query, (err, registros)=>{
        if(!err){
            res.send('El Id que editamos es : '+id+' y cambiamos el password! Muchas gracias!');
        }else{
            console.log(err)
        }
    })

    
});

    ////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////



    //////////////////////////////////////////////////////////////////////////////////
    ////metodo para dar la baja y alta a un usuario///////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////


router.put('/bajausuario/:id', (req, res)=>{
    // asigna a id_usuario el valor que recibe por el parametro 
     let id  = req.params.id;
     let query=`UPDATE login SET estado='B' WHERE id='${id}'`;
     mysqlConeccion.query(query, (err, registros)=>{
        if(!err){
            res.json({
                status: true,
                mensaje:"El usuario se dio de baja correctamente"
            });
        }else{
            console.log(err)
        }
    })
    
});

router.put('/altausuario/:id', (req, res)=>{
    // asigna a id_usuario el valor que recibe por el parametro 
     let id  = req.params.id;
     let query=`UPDATE login SET estado='A' WHERE id='${id}'`;
     mysqlConeccion.query(query, (err, registros)=>{
        if(!err){
            res.json({
                status: true,
                mensaje:"El usuario se dio de alta correctamente"
            });
        }else{
            console.log(err)
        }
    })
    
});

    ////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////




////////////// /////////////////
// //////////////////////Nuestras funciones /////////


function verificarToken(req, res, next){
    const BearerHeader= req.headers['authorization']
    if(typeof BearerHeader!=='undefined'){
        const bearerToken= BearerHeader.split(" ")[1]
        req.token=bearerToken;
        next();
    }else{
         res.send('Para consultar las apis debe estar autenticado.Gracias');
        // console.log('Ocurrio un error')
    }
}

function esNumero(parametro) {
    if(!isNaN(parseInt(parametro))){
        return false
    } else {
        return true
    }
}

module.exports = router;
