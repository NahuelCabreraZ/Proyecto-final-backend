const express= require('express');
const router = express();
// libreria que utilizaremos para la encriptacion de los password
const bcrypt= require('bcrypt');
// libreria que utilizaremos para la generacion de nuesrto token
const jwt= require('jsonwebtoken');
//////archivo de coneccion
const mysqlConeccion = require('../database/database');
//////fin archivo de coneccion

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
    let query=`UPDATE abogados SET estado='B' WHERE id_curso='${id}'`;

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



router.get('/abogados/:idabogados',(req, res)=>{

        const  { idabogados } = req.params;
                mysqlConeccion.query('select * from abogados where idabogados=?',[idabogados], (err, registros)=>{
                    if(!err){
                        res.json(registros);
                    }else{
                        console.log(err)
                    }
                })
       
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
router.delete('/abogados/:idabogados', (req, res)=>{
   //asigna a "let idabogados" el valor que recibe por el parametro 
   let idabogados  = req.params.idabogados; 
   jwt.verify(req.token, 'siliconKey', (error, valido)=>{
    if(error){
        res.sendStatus(403);
    }else{
        let query=`DELETE FROM abogados WHERE idabogados='${idabogados}'`;
        mysqlConeccion.query(query, (err, registros)=>{
                if(!err){
                    res.send('El Id que ELIMINAMOS es : '+registros);
                }else{
                    res.send('El error  es : '+ err); 
                }
            })
        }
    })
});

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


// router.get('/alumnos', verificarToken, (req, res)=>{
//     // res.send('Listado de alumnos');
//     jwt.verify(req.token, 'siliconKey', (error, valido)=>{
//         if(error){
//             res.sendStatus(403);
//         }else{
//             const query='select * from alumnos where estado="A"';
//             mysqlConeccion.query(query, (err, rows)=>{
//                 if(!err){
//                     res.json(rows);
//                 }else{
//                     console.log(err)
//                 }
//             })
//         }
//     });    
// });
        router.get('/clientes', (req, res)=>{
        
                const query='select * from clientes ';
                mysqlConeccion.query(query, (err, rows)=>{
                    if(!err){
                        res.json(rows);
                    }else{
                        console.log(err)
                    }
                })
            
         
    });

    /////////////////////////////////////////
    //FIN - LISTAR CLIENTES DE LA BASE DE DATOS//
    /////////////////////////////////////////



// router.get('/alumnos_cantidad_cursos', verificarToken, (req, res)=>{
//     // res.send('Listado de alumnos');
//     jwt.verify(req.token, 'siliconKey', (error, valido)=>{
//         if(error){
//             res.sendStatus(403);
//         }else{
//             const query='SELECT T.id_alumno, T.alumno, T.cantidad_cursos, T.sexo from (SELECT A.id_alumno, CONCAT_WS(" ", A.apellido, A.nombre ) alumno, sexo, COUNT(id_alumno_curso) cantidad_cursos FROM alumnos as A inner join alumno_curso as AC ON AC.id_alumno=A.id_alumno LEFT join curso C ON C.id_curso=AC.id_curso where estado = "A" GROUP by id_alumno) AS T order by T.cantidad_cursos DESC';
//             mysqlConeccion.query(query, (err, rows)=>{
//                 if(!err){
//                     res.json(rows);
//                 }else{
//                     console.log(err)
//                 }
//             })
//         }
//     });    
// });

// // Devolver los datos de un alumno puntual que recibamos el ID
// router.get('/alumnos/:id_alumno', verificarToken, (req, res)=>{
//     const  parametro  = req.params.id_alumno;
//     if(esNumero(parametro)){
//         res.json(
//             {
//                 status: false,
//                 mensaje:"El parametro que se espera tiene ser un numero entero"
//             });
//     }else{
//         jwt.verify(req.token, 'siliconKey', (error, valido)=>{
//             if(error){
//                 // console.log(' entra aca')
//                 res.sendStatus(403);
//             }else{
//                 mysqlConeccion.query('select * from alumnos where id_alumno=?',[parametro], (err, rows)=>{
//                     if(!err){
//                         if(rows.length!=0){
//                             res.json(rows);
//                         }else{
//                             res.json(
//                                 {
//                                     status: false,
//                                     mensaje:"El ID del alumno no existe en la base de datos."
//                                 });
//                         }    
//                     }else{
//                         res.json(
//                         {
//                             status: false,
//                             mensaje:"Error en el servidor."
//                         });
//                     }
//                 });
                
//             }
//         });
//     }
// })

// router.get('/alumnos/:id_alumno', (req, res)=>{
//     const  parametro  = req.params.id_alumno;
//     if(esNumero(parametro)){
//         res.json(
//             {
//                 status: false,
//                 mensaje:"El parametro que se espera tiene ser un numero entero"
//             });
//     }else{
//                 mysqlConeccion.query('select *, DATE_FORMAT(fecha_nacimiento, "%Y-%m-%d") as fecha_formateada from alumnos where id_alumno=?',[parametro], (err, rows)=>{
//                     if(!err){
//                         if(rows.length!=0){
//                             res.json(rows);
//                         }else{
//                             res.json(
//                                 {
//                                     status: false,
//                                     mensaje:"El ID del alumno no existe en la base de datos."
//                                 });
//                         }    
//                     }else{
//                         res.json(
//                         {
//                             status: false,
//                             mensaje:"Error en el servidor."
//                         });
//                     }
//                 });
                
//             }
// })



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
                    res.send('Se inserto correctamente nuestro cliente: '+apellido+' '+nombre);
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
    let query=`INSERT INTO clientes (dni, nombre, apellido, email, telefono, domicilio, fecha_creacion) VALUES ('${dni}','${nombre}','${apellido}','${email}','${telefono}', '${domicilio}', NOW())`;
            mysqlConeccion.query(query, (err, registros)=>{
                if(!err){
                    res.send('Se inserto correctamente nuestro cliente: '+apellido+' '+nombre);
                }else{
                    console.log(err)
                    res.send('El error es: '+err);
                }
    })
})

//Sin verificacion de Token

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

    
    //////////////////////////////////////////////////////////////
    ////metodo para elimiinar los datos de un cliente en particular///
    ////////////////////////////////////////////////////////////

router.delete('/clientes/:idclientes',verificarToken ,(req, res)=>{
    //asigna a idclientes el valor que recibe por el parametro 
    let idclientes  = req.params.id; 
    jwt.verify(req.token, 'siliconKey', (error, valido)=>{
        if(error){
            res.sendStatus(403);
        }else{
            let query=`DELETE FROM clientes WHERE idclientes='${idclientes}'`;
            mysqlConeccion.query(query, (err, registros)=>{
                if(!err){
                    res.send('El cliente que ELIMINAMOS es ID : '+idclientes);
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

router.put('/clientes/:idclientes' , (req, res)=>{
    //asigna a idclientes el valor que recibe por el parametro 
    let idclientes  = req.params.idclientes;
    const { dni, nombre, apellido , email, telefono, domicilio } =req.body  
    console.log(req.body)
    let query=`UPDATE clientes SET dni='${dni}', nombre='${nombre}', apellido='${apellido}', email='${email}', telefono='${telefono}', domicilio='${domicilio}', fecha_modificacion=NOW() WHERE idclientes='${idclientes}'`;
    mysqlConeccion.query(query, (err, registros)=>{
        if(!err){
            res.send('El Id que editamos es : '+idclientes+' y cambiamos muchos campos!!');
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

// router.put('/alumnos/:id',verificarToken , (req, res)=>{
//     //asigna a id_curso el valor que recibe por el parametro 
//     let id_alumno  = req.params.id;
//     //asigna el valor que recibe  en el Body 
//     const { apellido, nombre, dni , fecha_nacimiento, sexo, domicilio, estado_civil } =req.body  
//     jwt.verify(req.token, 'siliconKey', (error, valido)=>{
//         if(error){
            
//             res.sendStatus(403);
//         }else{
//             let query=`UPDATE alumnos SET apellido='${apellido}', nombre='${nombre}', dni='${dni}', fecha_nacimiento='${fecha_nacimiento}', estado_civil='${estado_civil}', sexo='${sexo}', domicilio='${domicilio}', fecha_modificacion=NOW() WHERE id_alumno='${id_alumno}'`;
//             mysqlConeccion.query(query, (err, registros)=>{
//                 if(!err){
//                     res.send('El Id que editamos es : '+id_alumno+' y cambiamos muchos campos!!');
//                 }else{
//                     console.log(err)
//                 }
//             })
//         }
//     })
// });



///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////////RUTAS LOGIN USUARIOS///////////////////////
//////////////////RUTAS LOGIN USUARIOS///////////////////////
/////////////////RUTAS LOGIN USUARIOS////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////



// router.get('/usuarios', verificarToken, (req, res)=>{

//         jwt.verify(req.token, 'siliconKey', (error, valido)=>{
//         if(error){
//             res.sendStatus(403);
//         }else{
//             mysqlConeccion.query('select * from usuarios', (err, registro)=>{
//         if(!err){
//             // console.log(registro.length)
//             res.json(registro);
//         }else{
//             console.log(err)
//         }
//     })
// }

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
                        jwt.sign({rows}, 'siliconKey', {expiresIn:'1200s'},(err, token)=>{
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
