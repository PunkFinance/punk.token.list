import consola from 'consola'
import Ajv from "ajv"
import Axios from 'axios'
import FS from 'fs'

consola.start( "Validate Scheme, Token List For Punk.Protocol" )
console.log("")
consola.info( "Download Validate Scheme" )
Axios.get( "https://uniswap.org/tokenlist.schema.json" ).then( response=>{

    if( response.status === 200 ){
        consola.success( "1. Downloaded Validate Scheme" )

        const schema = response.data

        consola.info( "Read And token.list.json file to json Data" )
        const jsonFile = FS.readFileSync('token.list.json', 'utf8');
        consola.success( "1. Success read file" )
        const tokenList = JSON.parse(jsonFile);
        consola.success( "2. Success File to Json Data" )
        
        consola.info( "Loading ajv & compile scheme" )
        const validate = new Ajv().compile(schema)
        const valid = validate(tokenList)
        consola.success( "1. Success Complie Scheme" )
        
        if( valid ){
            console.log("")
            consola.log( "Json Validate : ", valid )
        }else{
            console.log("")
            consola.error( "Json Validate : ", valid )
        }
    }

} ).catch( e=>{
    
    consola.error( "Failed" )

} )

