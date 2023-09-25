const { log } = require('console')
const fs = require('fs')
const path = require('path')
const ruta = "D:\\Courses\\2023\\CoderHouse\\Backend\\Class_04\\archivo.txt"
const archivo = path.basename(ruta)

/*Forma SINCRONICA*/

// fs.writeFileSync(ruta, 'testing')
// console.log(fs.readFileSync(archivo, 'utf-8'));
// fs.unlinkSync(archivo)

/*Forma ASINCRONICA*/
    //Usando callbacks
        // fs.writeFile(ruta, 'texto testing',(error)=>{
        //     error ? console.log(error) : console.log("File created succesfully");    
        // })

        // fs.readFile(archivo, 'utf-8', (error, data)=>{
        //     error ? console.log(error) : console.log(data);
        // })

        // fs.unlink(archivo, (error)=>{
        //     error ? console.log(error) : console.log(`File ${archivo} deleted`);
        // })

    //Usando promesas
        // fs.promises.writeFile(ruta, "testing testing")
        // .then(()=>{
        //     console.log(`File ${archivo} created succesfully`);
        // })
        // .catch((error)=>{
        //     console.log(error);
        // })
        
        // fs.promises.readFile(archivo, "utf-8")
        // .then((data)=>{console.log(data);})
        // .catch((error)=>{console.log(error);})

        fs.promises.unlink(archivo)
        .then(()=>console.log(`File ${archivo} deleted`))
        .catch((error)=>console.log(error))