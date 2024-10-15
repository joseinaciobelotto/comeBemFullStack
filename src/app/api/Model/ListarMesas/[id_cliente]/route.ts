import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { VerifyToken } from '../../../Controller/jwt';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id_cliente: number } }) {
  try {


    // Busca todas as mesas no banco de dados

  // Confirme se o parâmetro id_cliente está presente
  if (!params || !params.id_cliente) {
    return NextResponse.json({ error: 'Parâmetro id_cliente não fornecido.' }, { status: 400 });
  }

    const mesas = await prisma.mesas.findMany();
   
    const header = req.headers;

    const {  id_cliente } = params;
    const token = header.get('Authorization')
   
    if (!id_cliente || !token) {
      return NextResponse.json({ error: 'O campos id_cliente é obrigatório' }, { status: 400 });
    }

    if(token != null)
      {
        if(VerifyToken(token, id_cliente) == false) 
          { 
          
        return NextResponse.json(mesas, { status: 201 });
               
      }}
  else
      {
        return NextResponse.json({ error: 'Token nulo' }, { status: 400 });
    }

    // Retorna as mesas como JSON
   
  } catch (error) {
    console.error('Erro ao buscar mesas:', error); // Loga o erro para ajudar no debug
    return NextResponse.json({ error: 'Erro interno ao buscar as mesas' }, { status: 500 });
  }
}
