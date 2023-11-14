import { BASE_URL } from "../../../../../config";


export async function GET(_request:Request,{params}:{params:{athlete_id:number}}){
    const athlete_id=params.athlete_id
    try{
        if (!BASE_URL) {
            return new Response('athlete base url not found',{
                status:404,
                statusText:"failed",
            }) 
        }
        const response=await fetch(`${BASE_URL}/api/athletes/${athlete_id}/`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
            }
        })
        const result=await response.json()
        return new Response(JSON.stringify(result),{
            status:200,
            statusText:"success"
        })
    }
    catch(error:any){
        return new Response(error,{
            status:500,
            statusText:'failed'
        })
    }
}

