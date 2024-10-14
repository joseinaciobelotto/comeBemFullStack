import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { GenerateToken, VerifyToken  } from '../../Controller/jwt';

import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET_KEY = 'S#g^:K#?[w/AKquh_QUATROUMDOISQUATROTRESCINCOY*m4|AQeOuj#n-[';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nome, senha, correio, cargo
     } = body;

    if (!nome || !correio || !senha || !cargo) {
      return NextResponse.json({ error: 'Os campos nome, correio e senha são obrigatórios.' }, { status: 400 });
    }

   

    const novoCliente = await prisma.clientes.create({
      data: {
        nome,
        senha,
        correio,
        cargo,
      },
      
    });

    const token = GenerateToken(novoCliente.id_cliente);

    return NextResponse.json({ cliente: { id: novoCliente.id_cliente, nome: novoCliente.nome, correio: novoCliente.correio
     }, token }, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar conta:', error);
    return NextResponse.json({ error: 'Erro interno ao criar conta' }, { status: 500 });
  }
}