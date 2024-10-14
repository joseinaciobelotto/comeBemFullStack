import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Busca todas as mesas no banco de dados
    const mesas = await prisma.mesas.findMany();

    // Retorna as mesas como JSON
    return NextResponse.json(mesas, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar mesas:', error); // Loga o erro para ajudar no debug
    return NextResponse.json({ error: 'Erro interno ao buscar as mesas' }, { status: 500 });
  }
}
