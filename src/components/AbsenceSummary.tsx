import React, { useState } from 'react';
import './AbsenceSummary.css';

interface AbsenceRequest {
  id: string;
  startDate: string;
  endDate?: string;
  hours?: string;
  status: 'aprobado' | 'pendiente' | 'rechazado';
  hasDocument?: boolean;
}

interface AbsenceCategory {
  id: string;
  title: string;
  color: string;
  available: string;
  requests: AbsenceRequest[];
}

const AbsenceSummary: React.FC = () => {
  const [selectedType, setSelectedType] = useState('Todos');

  const absenceCategories: AbsenceCategory[] = [
    {
      id: 'vacaciones',
      title: 'Vacaciones',
      color: '#22c55e',
      available: '10 de 20 días disponibles',
      requests: [
        {
          id: '1',
          startDate: '01/01/2023',
          endDate: '05/01/2023',
          status: 'aprobado'
        },
        {
          id: '2',
          startDate: '04/04/2023',
          endDate: '06/04/2023',
          status: 'pendiente'
        }
      ]
    },
    {
      id: 'puentes',
      title: 'Puentes',
      color: '#ef4444',
      available: '0 de 1 día disponible',
      requests: [
        {
          id: '3',
          startDate: '01/05/2023',
          endDate: '03/05/2023',
          status: 'aprobado'
        }
      ]
    },
    {
      id: 'horas-libre',
      title: 'Horas de libre disposición',
      color: '#f97316',
      available: '16 de 24 horas disponibles',
      requests: [
        {
          id: '4',
          startDate: '02/03/2023',
          hours: '3h',
          status: 'aprobado',
          hasDocument: true
        },
        {
          id: '5',
          startDate: '01/05/2023',
          hours: '1h',
          status: 'pendiente',
          hasDocument: true
        }
      ]
    },
    {
      id: 'permisos-retribuidos',
      title: 'Permisos Retribuidos',
      color: '#8b5cf6',
      available: 'Sin límite',
      requests: [
        {
          id: '6',
          startDate: '02/03/2023',
          hours: '3h',
          status: 'aprobado'
        }
      ]
    },
    {
      id: 'baja-medica',
      title: 'Baja médica',
      color: '#6366f1',
      available: 'Sin límite',
      requests: []
    },
    {
      id: 'baja-maternidad',
      title: 'Baja de maternidad / paternidad',
      color: '#64748b',
      available: '',
      requests: []
    }
  ];

  const handleApprove = (requestId: string) => {
    console.log('Aprobar solicitud:', requestId);
  };

  const handleCancel = (requestId: string) => {
    console.log('Cancelar solicitud:', requestId);
  };

  const handleViewDocument = (requestId: string) => {
    console.log('Ver documento:', requestId);
  };

  const renderRequestsTable = (category: AbsenceCategory) => {
    if (category.requests.length === 0) {
      return (
        <div className="no-requests">
          No hay solicitudes de este año
        </div>
      );
    }

    const isHoursCategory = category.id === 'horas-libre' || category.id === 'permisos-retribuidos';

    return (
      <div className="requests-table">
        <div className="table-header">
          <div className="header-date">Fecha{isHoursCategory ? '' : ' inicio'}</div>
          {!isHoursCategory && <div className="header-date">Fecha Fin</div>}
          {isHoursCategory && <div className="header-hours">Horas</div>}
          {isHoursCategory && <div className="header-documents">Justificantes</div>}
          <div className="header-status">Estado</div>
          <div className="header-action">Acción</div>
        </div>
        <div className="table-body">
          {category.requests.map((request) => (
            <div key={request.id} className="table-row">
              <div className="cell-date">{request.startDate}</div>
              {!isHoursCategory && <div className="cell-date">{request.endDate}</div>}
              {isHoursCategory && <div className="cell-hours">{request.hours}</div>}
              {isHoursCategory && (
                <div className="cell-documents">
                  {request.hasDocument && (
                    <button 
                      className="doc-link"
                      onClick={() => handleViewDocument(request.id)}
                    >
                      Ver doc. ↗
                    </button>
                  )}
                </div>
              )}
              <div className="cell-status">
                <span className={`status-badge ${request.status}`}>
                  {request.status === 'aprobado' ? 'Aprobado' : 
                   request.status === 'pendiente' ? 'Pendiente' : 'Rechazado'}
                </span>
              </div>
              <div className="cell-action">
                <button 
                  className="action-btn approve-btn"
                  onClick={() => handleApprove(request.id)}
                >
                  Aprobar
                </button>
                <button 
                  className="action-btn cancel-btn"
                  onClick={() => handleCancel(request.id)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="absence-summary">
      <div className="summary-header">
        <h1 className="summary-title">Resumen de ausencias</h1>
        
        <div className="employee-info">
          <span className="employee-label">Empleado:</span>
          <span className="employee-name">Nombre Apellido Apellido</span>
        </div>

        <div className="absence-types">
          <label className="types-label">Tipos de ausencias</label>
          <select 
            className="types-select"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="Todos">Todos</option>
            <option value="Vacaciones">Vacaciones</option>
            <option value="Puentes">Puentes</option>
            <option value="Horas de libre disposición">Horas de libre disposición</option>
            <option value="Permisos Retribuidos">Permisos Retribuidos</option>
            <option value="Baja médica">Baja médica</option>
            <option value="Baja de maternidad / paternidad">Baja de maternidad / paternidad</option>
          </select>
        </div>
      </div>

      <div className="categories-container">
        {absenceCategories.map((category) => (
          <div key={category.id} className="absence-category">
            <div className="category-header">
              <div 
                className="category-indicator"
                style={{ backgroundColor: category.color }}
              ></div>
              <div className="category-info">
                <h3 className="category-title">{category.title}</h3>
                {category.available && (
                  <span className="category-available">{category.available}</span>
                )}
              </div>
            </div>
            
            <div className="category-content">
              <h4 className="requests-title">Listado de solicitudes</h4>
              {renderRequestsTable(category)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AbsenceSummary;
