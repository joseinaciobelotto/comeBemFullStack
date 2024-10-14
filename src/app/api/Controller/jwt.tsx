import { NextRequest, NextResponse } from 'next/server'; 
import jwt from 'jsonwebtoken';


const SECRET_KEY = 'S#g^:K#?[w/AKquh_QUATROUMDOISQUATROTRESCINCOY*m4|AQeOuj#n-[';

export const GenerateToken = (userId: number) => {
    try{

      const tokenCreated = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1h' });
      return tokenCreated;
    }catch(error)
    {
      return NextResponse.json({ error: 'Token invalido' }, { status: 500 });


    }
  };
  

  export const VerifyToken = (token: string) => {
    try{

      const tokenVerified = jwt.verify(token, SECRET_KEY);
      return tokenVerified;
    }catch(error)
    {
      return NextResponse.json({ error: 'Token invalido' }, { status: 500 });


    }
   
  };

