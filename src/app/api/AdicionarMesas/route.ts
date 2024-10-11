import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    // Extrai os dados do corpo da requisição
    const body = await req.json();

    const { id_mesas, ocuapada } = body; // Corrigido para 'ocuapada'

    // Verifica se os campos necessários estão presentes
    if (!id_mesas || ocuapada === undefined) {
      return NextResponse.json({ error: 'Os campos id_mesas e ocuapada são obrigatórios.' }, { status: 400 });
    }

    // Cria uma nova mesa no banco de dados
    const novaMesa = await prisma.mesas.create({
      data: {
        id_mesas,
        ocuapada, // Utilizando 'ocuapada' corretamente
      },
    });

    return NextResponse.json(novaMesa, { status: 201 });
  } catch (error) {
    console.error('Erro ao adicionar mesa:', error); // Loga o erro para ajudar no debug
    return NextResponse.json({ error: 'Erro interno ao criar a mesa' }, { status: 500 });
  }
}
