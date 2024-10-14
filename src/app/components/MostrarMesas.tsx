// src/app/components/MostrarMesas.tsx
"use client"; // Adicione esta linha

import React, { useState, useEffect } from 'react'; // Importa React, useState e useEffect

interface Mesa {
  id_mesas: number;
  ocupada: number;
}
const MostrarMesas: React.FC = () => {
  const [mesas, setMesas] = useState<Mesa[]>([]); // Define o tipo correto para mesas

  
    // Função para buscar as mesas da API
    const fetchMesas = async () => {
      try {
        const response = await fetch('/api/MostrarMesas');
        if (!response.ok) {
          throw new Error('Erro ao buscar mesas');
        }
        const data = await response.json();
        setMesas(data);
      } catch (error) {
        console.error('Erro ao buscar mesas:', error);
      }
    };
  
    // Busca as mesas quando o componente é montado
    useEffect(() => {
      fetchMesas();
    }, []);
  
    return (
      <div>
        <h1>Mesas</h1>
        <div style={gridStyle}>
          {mesas.map((mesa) => (
           
            <div
              key={mesa.id_mesas}
              style={{
                ...cellStyle,
                backgroundColor: mesa.ocupada ===  2 ? 'yellow'  : mesa.ocupada === 1 ?  'red' : 'green',
              }}
            >
              Mesa {mesa.id_mesas}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // Estilo para o grid
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
    gap: '10px',
    marginTop: '20px',
  };
  
  // Estilo para cada célula do grid
  const cellStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '18px',
    borderRadius: '10px',
  };

  

export default MostrarMesas;