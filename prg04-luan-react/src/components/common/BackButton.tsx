import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  to?: string;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ to, className = '' }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button onClick={handleClick} className={`btn btn-outline-secondary ${className}`}>
      <i className="bi bi-arrow-left"></i> Voltar
    </button>
  );
};

export default BackButton;
