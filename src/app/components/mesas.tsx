// src/app/components/Mesas.tsx
"use client"; // Adicione esta linha
import React, { useEffect, useState } from 'react';

interface Mesa {
  id_mesas: number;
  ocupada: number; // Corrigido: mudei 'ocuapada' para 'ocupada'
}

const Mesas: React.FC = () => {
  const [mesas, setMesas] = useState<Mesa[]>([]); // Defina o tipo do estado
  const [idMesas, setIdMesas] = useState('');
  const [ocupada, setOcupada] = useState(0); // Corrigido: mudei 'ocuapada' para 'ocupada'
  
  // Função para buscar mesas
  const fetchMesas = async () => {
    try {
      const response = await fetch('/api/mesas');
      if (!response.ok) {
        throw new Error('Erro ao buscar mesas');
      }
      const data = await response.json();
      setMesas(data);
    } catch (error) {
      console.error('Erro ao buscar mesas:', error);
    }
  };

  // Função para adicionar uma nova mesa
  const addMesa = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita o comportamento padrão do formulário
    try {
      const response = await fetch('/api/mesas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_mesas: parseInt(idMesas), ocupada }), // Atribui os valores
      });

      if (response.ok) {
        fetchMesas(); // Atualiza a lista de mesas após a inserção
        setIdMesas(''); // Limpa o campo do id
        setOcupada(0); // Reseta o estado de ocupada
      } else {
        console.error('Erro ao adicionar mesa:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao adicionar mesa:', error);
    }
  };

  // UseEffect para buscar mesas ao carregar o componente
  useEffect(() => {
    fetchMesas();
  }, []);

  return (
    <div>
      <h1>Mesas</h1>

      {/* Formulário para adicionar novas mesas */}
      <form onSubmit={addMesa}>
        <div>
          <label htmlFor="idMesas">ID da Mesa:</label>
          <input
            type="number"
            id="idMesas"
            value={idMesas}
            onChange={(e) => setIdMesas(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="ocupada">Status da Mesa (0 - Livre, 1 - Ocupada):</label>
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

      {/* Lista de mesas existentes */}
      <h2>Mesas Existentes</h2>
      <ul>
        {mesas.length > 0 ? (
          mesas.map((mesa) => (
            <li key={mesa.id_mesas}>
              Mesa ID: {mesa.id_mesas} - Status: {mesa.ocupada === 0 ? 'Livre' : 'Ocupada'}
            </li>
          ))
        ) : (
          <p>Nenhuma mesa encontrada.</p>
        )}
      </ul>
    </div>
  );
};

export default Mesas;
