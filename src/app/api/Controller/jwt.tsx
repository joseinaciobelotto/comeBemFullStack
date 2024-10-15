import { NextRequest, NextResponse } from 'next/server'; 
import jwt from 'jsonwebtoken';


const SECRET_KEY = '1234';

export const GenerateToken = (id: number) => {
    try{
      console.log("sdasdasdas"+id);
      const tokenCreated = jwt.sign({ id }, SECRET_KEY, { expiresIn: '1h' });
      return tokenCreated;
    }catch(error)
    {
      return NextResponse.json({ error: 'Token invalido' }, { status: 500 });


    }
  };
  

  export const VerifyToken = (token: string, id:number) => {
    try{
      
      
      const tokenVerified = jwt.verify(token, SECRET_KEY) as {id:number};
      
    
      if(tokenVerified.id == id)
      {
            return true;
      }else
      {
  
        return false;
      }
    
    
    }catch(error)
    {
      
      console.error("Error during token verification:", error);
      return NextResponse.json({ error: 'Token invalido', }, { status: 500});


    }
   
  };

