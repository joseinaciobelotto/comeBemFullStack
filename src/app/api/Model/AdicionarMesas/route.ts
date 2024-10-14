import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verify } from 'crypto';
import { VerifyToken } from '../../Controller/jwt';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
 
    
    const body = await req.json();

    const { id_mesas, ocupada, token } = body;
    VerifyToken(token)
    {
      

    }
  
    if (!id_mesas || ocupada === undefined) {
      return NextResponse.json({ error: 'Os campos id_mesas e ocupada são obrigatórios.' }, { status: 400 });
    }


    const novaMesa = await prisma.mesas.create({
      data: {
        id_mesas,
        ocupada, 
      },
    });

    return NextResponse.json(novaMesa, { status: 201 });
  } catch (error) {
    console.error('Erro ao adicionar mesa:', error); // Loga o erro para ajudar no debu
    return NextResponse.json({ error: 'Erro interno ao criar a mesa' }, { status: 500 });
  }
}
