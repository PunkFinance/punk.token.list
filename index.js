import Ajv from "ajv"
import Axios from 'axios'

Axios.get( "https://uniswap.org/tokenlist.schema.json" ).then( response=>{

    if( response.status === 200 ){
        
        const schema = response.data

        import( './token.list.json' ).then( (jsonFile)=>{

            const tokenList = jsonFile.default
            const validate = new Ajv().compile(schema)
            const valid = validate(tokenList)

            console.log( "Json Validate : ", valid )
        })

    }

} ).catch( e=>{
    
    console.log( "Failed" )

} )

