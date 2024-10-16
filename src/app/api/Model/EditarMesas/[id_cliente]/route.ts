import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verify } from 'crypto';
import { VerifyToken } from '../../../Controller/jwt';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, { params }: { params: { id_cliente: number }}) {
  try {
 
    
    const body = await req.json();
    const header = await req.headers;
   
    const { id_mesas, ocupada } = body;
    const token = header.get('Authorization');
   
    const {  id_cliente } = params;
  
    if (!id_mesas || ocupada === undefined) {
      return NextResponse.json({ error: 'Os campos id_mesas e ocupada são obrigatórios.' }, { status: 400 });
    }


      if(token != null)
      {
     
           if(VerifyToken(token, id_cliente) == false) 
            { 
        
              const novaMesa = await prisma.mesas.create({
              data: {
                id_mesas,
                ocupada, 
               },
              });
                  return NextResponse.json(novaMesa, { status: 201 });
               }
      }
        const novaMesa = await prisma.mesas.update({
          where:
          {
            id_mesas : id_mesas
          },
          data: {
          
            ocupada : ocupada, 
          }
          
      });

    return NextResponse.json(novaMesa, { status: 201 });
  } catch (error) {
    console.error('Erro ao adicionar mesa:', error); // Loga o erro para ajudar no debu
    return NextResponse.json({ error: 'Erro interno ao criar a mesa' }, { status: 500 });
  }
}
