import Image from "next/image";
import Link from 'next/link';
import React from "react";
import Mesas from '../../components/mesas'; 


const HomePage = () => {
  return (
    
    <div>
      <h1>Bem-vindo ao sistema de gerenciamento de mesas</h1>
      <Mesas />
    </div>
  );
}

export default HomePage;
