// src/app/components/AdicionarMesas.tsx
"use client"; // Adicione esta linha
import { useState } from 'react';

const AdicionarMesas: React.FC = () => {
  const [idMesas, setIdMesas] = useState('');
  const [ocupada, setOcupada] = useState(0);

  const adicionarMesa = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/AdicionarMesas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_mesas: parseInt(idMesas),
          ocupada: ocupada, // Corrigido o nome do campo
        }),
      });

      if (response.ok) {
        console.log('Mesa adicionada com sucesso!');
        setIdMesas(''); // Limpa o campo de idMesas
        setOcupada(0); // Reseta o status de ocupada
      } else {
        console.error('Erro ao adicionar mesa:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao enviar requisição:', error);
    }
  };

  return (
    <div>
      <h1>Adicionar Mesa</h1>
      <form onSubmit={adicionarMesa}>
        <div>
          <label htmlFor="idMesas">Número da Mesa:</label>
          <input
            type="number"
            id="idMesas"
            value={idMesas}
            onChange={(e) => setIdMesas(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="ocupada">Status (0 - Livre, 1 - Ocupada):</label>
          <input
            type="number"
            id="ocupada"
            value={ocupada}
            onChange={(e) => setOcupada(parseInt(e.target.value))}
            required
            min={0}
            max={1}
          />
        </div>
        <button type="submit">Adicionar Mesa</button>
      </form>
    </div>
  );
};

export default AdicionarMesas;
