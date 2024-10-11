import Image from "next/image";
import Link from 'next/link';
import React from "react";
import AdicionarMesas from '../../components/AdicionarMesas'; 
import MostrarMesas from '../../components/MostrarMesas'; 

const HomePage = () => {
  return (
    
    <div>
      <h1>Bem-vindo ao sistema de gerenciamento de mesas</h1>
      <AdicionarMesas/>
      <hr>
      </hr>
      <MostrarMesas/>
    </div>
  );
}

export default HomePage;
