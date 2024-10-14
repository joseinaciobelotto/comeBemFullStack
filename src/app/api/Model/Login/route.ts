import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { GenerateToken, VerifyToken  } from '../../Controller/jwt';


const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
 
    const clientes = await prisma.clientes.findMany();
   // console.log(clientes)
    const body = await req.json();

    const {  nome, senha} = body;
    console.log("adsasd");
        
    clientes.forEach(cliente => {
   
      if(nome == cliente.nome && senha == cliente.senha)
      {
          
        const token = GenerateToken(cliente.id_cliente);
        

        console.log(token);
        

      }
    });
    
    
      return NextResponse.json( { status: 200 , statusText: 'Cliente logado!'});
    
  


    
  } catch (error) {
    console.error('Erro ao buscar mesas:', error); // Loga o erro para ajudar no debug
    return NextResponse.json({ error: 'Erro interno ao buscar as mesas' }, { status: 500 });
  }
}
