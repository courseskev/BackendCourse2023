//ASINCRONISMO

//CALLBACKS

function agregarFamiliarWithCallBacks(idUsuario, familiar){
    usuarioTable.findById(idUsuario, (error, usuario)=>{
        if(error)
            return error
        else{
            familiaresTable.findByLastName(usuario.lastname,(error, familiares)=>{
                if(error)
                    return error
                else{
                    if(familiares.includes(familiar))
                        return 'El familiar ya existe en BD.'
                    else{
                        familiaresTable.createOne(familiar, (error)=>{
                            if(error)
                                return error
                            else    
                                return 'Familiar agregado con éxito'
                        })
                    }
                }
            })
        }
    })
}

// PROMISES
function agregarFamiliarWithPromises(idUsuario, familiar){
    usuarioTable.findById(idUsuario)
    .then((usuario)=>{
        return familiaresTable.findByLastName(usuario.lastname)
    })    
    .then((familiares)=>{
        if(familiares.includes(familiar))
            return 'Familiar ya existe en BD'
        else
            return familiaresTable.createOne(familiar)
    })
    .then(()=>{
        return 'Familiar creado con éxito'
    })
    .catch((error)=>error)
}

// ASYNC AWAIT

async function agregarFamiliarWithAsync(idUsuario, familiar){
    try {
        const usuario = await usuariosTable.findById(idUsuario)
        const familiares = await familiaresTable.findByLastName(usuario.lastname)
        if(familiares.includes(familiar))
            return 'Familiar ya existe en BD.'
        else{
            await familiaresTable.createOne(familiar)
            return 'Familiar creado con éxito.'
        }
    } catch (error) {
        return error
    }

}