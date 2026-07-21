import React, { useEffect, useRef } from 'react';
import * as $3Dmol from '3dmol';

export default function ProteinViewer({ pdbId, styleType, highlightResidual }) {
  const viewerContainerRef = useRef(null);
  const viewerRef = useRef(null);

  useEffect(() => {
    if (!viewerContainerRef.current) return;

    // Inicializar el visor WebGL solo una vez
    if (!viewerRef.current) {
      viewerRef.current = $3Dmol.createViewer(viewerContainerRef.current, {
        defaultcolors: $3Dmol.rasmolElementColors
      });
    }

    const viewer = viewerRef.current;
    viewer.clear(); // Limpiar el modelo anterior antes de cargar uno nuevo

    // Descarga directa desde el Protein Data Bank (PDB)
    const url = `https://files.rcsb.org/download/${pdbId}.pdb`;
    
    fetch(url)
      .then(response => response.text())
      .then(pdbData => {
        viewer.addModel(pdbData, "pdb");
        
        // Aplicar la representación (Cintas/Cartoon, Esferas, Varillas)
        viewer.setStyle({}, { [styleType]: { color: 'spectrum' } });
        
        // Simular interactividad pedagógica: Resaltar un residuo específico
        if (highlightResidual) {
          viewer.setStyle(
            { resn: highlightResidual },
            { sphere: { color: 'red', radius: 1.8 } }
          );
          viewer.addLabel(`Residuo Clave: ${highlightResidual}`, {
            resn: highlightResidual,
            backgroundAlpha: 0.8,
            fontColor: 'white',
            backgroundColor: '#1a2a3a'
          });
        }

        viewer.zoomTo(); // Ajustar cámara automáticamente
        viewer.render(); // Pintar la escena
      })
      .catch(err => console.error("Error cargando estructura PDB:", err));

  }, [pdbId, styleType, highlightResidual]);

  return (
    <div 
      ref={viewerContainerRef} 
      style={{ width: '100%', height: '500px', position: 'relative', borderRadius: '8px', border: '1px solid #cbd5e0' }}
    />
  );
}