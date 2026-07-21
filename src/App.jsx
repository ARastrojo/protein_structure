import React, { useState } from 'react';
import ProteinViewer from './components/ProteinViewer';

function App() {
  const [pdbId, setPdbId] = useState('1ZNJ'); // 1ZNJ = Insulina monomérica
  const [styleType, setStyleType] = useState('cartoon');
  const [highlightRes, setHighlightRes] = useState('');

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#1a2a3a' }}>Visor Didáctico de Proteínas</h1>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        {/* PANEL IZQUIERDO DE CONTROLES */}
        <div style={{ width: '30%', backgroundColor: '#f7fafc', padding: '20px', borderRadius: '8px' }}>
          <h3>Controles de Estructura</h3>
          
          <label><strong>Selecciona la Molécula:</strong></label>
          <select value={pdbId} onChange={(e) => setPdbId(e.target.value)} style={{ width: '100%', padding: '8px', margin: '8px 0 20px 0' }}>
            <option value="1ZNJ">Insulina Activa (Monómero - 1ZNJ)</option>
            <option value="1AI0">Insulina de Almacenamiento (Hexámero con Zinc - 1AI0)</option>
          </select>

          <label><strong>Nivel de Estructura Secundaria:</strong></label>
          <select value={styleType} onChange={(e) => setStyleType(e.target.value)} style={{ width: '100%', padding: '8px', margin: '8px 0 20px 0' }}>
            <option value="cartoon">Ver Hélices Alfa y Lazos (Cintas)</option>
            <option value="sphere">Ver Esferas de Átomos (Van der Waals)</option>
            <option value="stick">Ver Esqueleto Químico (Varillas)</option>
          </select>

          <h3>Simulador de Mutaciones</h3>
          <p style={{ fontSize: '14px', color: '#4a5568' }}>
            Las cisteínas forman puentes disulfuro fundamentales para la estructura terciaria de la insulina.
          </p>
          <button 
            onClick={() => setHighlightRes('CYS')} 
            style={{ width: '100%', padding: '12px', backgroundColor: '#e53e3e', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Detectar Puentes Disulfuro (CYS)
          </button>
          
          {highlightRes && (
            <button 
              onClick={() => setHighlightRes('')} 
              style={{ width: '100%', padding: '10px', marginTop: '8px', backgroundColor: '#718096', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
              Restaurar Original
            </button>
          )}
        </div>

        {/* PANEL DERECHO - VISOR 3D */}
        <div style={{ width: '70%' }}>
          <ProteinViewer pdbId={pdbId} styleType={styleType} highlightResidual={highlightRes} />
        </div>
      </div>
    </div>
  );
}

export default App;