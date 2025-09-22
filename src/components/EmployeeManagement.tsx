import React, { useState } from 'react';
import './EmployeeManagement.css';

// Reusable Components
interface InputFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, placeholder, onChange, className = '' }) => (
  <div className={`input-field ${className}`}>
    <label className="input-label">{label}</label>
    <div className="input-container">
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="input"
      />
    </div>
  </div>
);

interface ActionButtonProps {
  type: 'edit' | 'delete' | 'view-absences';
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ type, onClick }) => {
  const getButtonConfig = () => {
    switch (type) {
      case 'edit':
        return {
          src: 'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/beb7b6ab-f190-46cc-a456-66e1341cbf50',
          text: 'Editar',
          className: 'edit'
        };
      case 'delete':
        return {
          src: 'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/c6fa2128-d88d-4375-987c-9d928b550e1a',
          text: 'Borrar',
          className: 'delete'
        };
      case 'view-absences':
        return {
          src: 'https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/2c53ba4b-503d-4e23-a529-4474306b49aa',
          text: 'Ver ausencias',
          className: 'view-absences'
        };
      default:
        return { src: '', text: '', className: '' };
    }
  };

  const config = getButtonConfig();

  return (
    <button className={`action-button ${config.className}`} onClick={onClick}>
      <img 
        src={config.src}
        alt={type}
        className="action-icon"
      />
      <span>{config.text}</span>
    </button>
  );
};

interface EmployeeRowProps {
  employee: {
    id: string;
    name: string;
    office: string;
    email: string;
    responsible: string;
    initials: string;
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onViewAbsences: (id: string) => void;
}

const EmployeeRow: React.FC<EmployeeRowProps> = ({ employee, onEdit, onDelete, onViewAbsences }) => (
  <div className="employee-row">
    <div className="employee-info">
      <div className="employee-avatar">
        <span className="avatar-initials">{employee.initials}</span>
      </div>
      <span className="employee-name">{employee.name}</span>
    </div>
    <div className="employee-office">{employee.office}</div>
    <div className="employee-email">{employee.email}</div>
    <div className="employee-responsible">{employee.responsible}</div>
    <div className="employee-actions">
      <ActionButton type="view-absences" onClick={() => onViewAbsences(employee.id)} />
      <ActionButton type="edit" onClick={() => onEdit(employee.id)} />
      <ActionButton type="delete" onClick={() => onDelete(employee.id)} />
    </div>
  </div>
);

interface CheckboxOptionProps {
  id: string;
  label: string;
  color: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CheckboxOption: React.FC<CheckboxOptionProps> = ({ id, label, color, checked, onChange }) => (
  <div className="checkbox-option">
    <div className="checkbox-container">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="checkbox-input"
      />
      <div className="checkbox-visual"></div>
    </div>
    <div className="option-content">
      <div className="color-indicator" style={{ backgroundColor: color }}></div>
      <label htmlFor={id} className="option-label">{label}</label>
    </div>
  </div>
);

interface SidebarIconProps {
  imageUrl: string;
  alt: string;
  isActive?: boolean;
}

const SidebarIcon: React.FC<SidebarIconProps> = ({ imageUrl, alt, isActive = false }) => (
  <div className={`sidebar-icon ${isActive ? 'active' : ''}`}>
    <img src={imageUrl} alt={alt} />
  </div>
);

// Absence Types and Data
interface Absence {
  id: string;
  startDate: string;
  endDate: string;
  status: 'Aprobado' | 'Pendiente' | 'Rechazado';
  type: 'vacaciones' | 'puentes' | 'horasLibres' | 'permisos' | 'bajaMedica' | 'maternidad';
}

interface AbsenceCategory {
  type: 'vacaciones' | 'puentes' | 'horasLibres' | 'permisos' | 'bajaMedica' | 'maternidad';
  label: string;
  color: string;
  absences: Absence[];
}

interface AbsenceRowProps {
  absence: Absence;
  onAction: (id: string) => void;
}

const AbsenceRow: React.FC<AbsenceRowProps> = ({ absence, onAction }) => (
  <div className="absence-row">
    <div className="absence-start-date">{absence.startDate}</div>
    <div className="absence-end-date">{absence.endDate}</div>
    <div className="absence-status">
      <span className={`status-badge ${absence.status.toLowerCase()}`}>
        {absence.status}
      </span>
    </div>
    <div className="absence-action">
      <button className="absence-action-button" onClick={() => onAction(absence.id)}>
        <img 
          src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/beb7b6ab-f190-46cc-a456-66e1341cbf50"
          alt="Action"
          className="action-icon"
        />
      </button>
    </div>
  </div>
);

interface AbsenceCategoryProps {
  category: AbsenceCategory;
  onAbsenceAction: (id: string) => void;
}

const AbsenceCategory: React.FC<AbsenceCategoryProps> = ({ category, onAbsenceAction }) => (
  <div className="absence-category">
    <div className="category-header">
      <div className="category-indicator" style={{ backgroundColor: category.color }}></div>
      <h4 className="category-title">{category.label}</h4>
      <span className="category-count">({category.absences.length})</span>
    </div>
    {category.absences.length > 0 ? (
      <div className="category-absences">
        <div className="absences-table-header">
          <div className="header-start-date">Fecha inicio</div>
          <div className="header-end-date">Fecha fin</div>
          <div className="header-status">Estado</div>
          <div className="header-action">Acción</div>
        </div>
        <div className="absences-table-body">
          {category.absences.map((absence) => (
            <AbsenceRow
              key={absence.id}
              absence={absence}
              onAction={onAbsenceAction}
            />
          ))}
        </div>
      </div>
    ) : (
      <div className="no-absences">No hay ausencias registradas</div>
    )}
  </div>
);

// Main Component
const EmployeeManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAbsencesModalOpen, setIsAbsencesModalOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('');
  const [selectedEmployee, setSelectedEmployee] = useState({
    firstName: 'Nombre',
    lastName: 'Apellido Apellido',
    office: 'Oficina',
    email: 'email@email.com',
    phone: '600 00 00 00',
    extension: '+600',
    calendar: 'Calendario de Madrid 2024'
  });

  const [absenceTypes, setAbsenceTypes] = useState({
    vacaciones: true,
    puentes: true,
    permisos: true,
    horasLibres: true,
    maternidad: true,
    bajaMedica: true
  });

  const employees = [
    { id: '1', name: 'Nombre Apellido Apellido', office: 'Oficina', email: 'emial.email@email.com', responsible: 'Nombre Apellido Apellido', initials: 'NA' },
    { id: '2', name: 'Nombre Apellido Apellido', office: 'Oficina', email: 'emial.email@email.com', responsible: 'Nombre Apellido Apellido', initials: 'NA' },
    { id: '3', name: 'Nombre Apellido Apellido', office: 'Oficina', email: 'emial.email@email.com', responsible: 'Nombre Apellido Apellido', initials: 'NA' },
    { id: '4', name: 'Nombre Apellido Apellido', office: 'Oficina', email: 'emial.email@email.com', responsible: 'Nombre Apellido Apellido', initials: 'NA' },
    { id: '5', name: 'Nombre Apellido Apellido', office: 'Oficina', email: 'emial.email@email.com', responsible: 'Nombre Apellido Apellido', initials: 'NA' },
    { id: '6', name: 'Nombre Apellido Apellido', office: 'Oficina', email: 'emial.email@email.com', responsible: 'Nombre Apellido Apellido', initials: 'NA' },
    { id: '7', name: 'Nombre Apellido Apellido', office: 'Oficina', email: 'emial.email@email.com', responsible: 'Nombre Apellido Apellido', initials: 'NA' },
    { id: '8', name: 'Nombre Apellido Apellido', office: 'Oficina', email: 'emial.email@email.com', responsible: 'Nombre Apellido Apellido', initials: 'NA' }
  ];

  // Sample absences data
  const getEmployeeAbsences = (employeeId: string): AbsenceCategory[] => {
    const sampleAbsences: Absence[] = [
      { id: '1', startDate: '15/03/2024', endDate: '22/03/2024', status: 'Aprobado', type: 'vacaciones' },
      { id: '2', startDate: '01/05/2024', endDate: '01/05/2024', status: 'Aprobado', type: 'puentes' },
      { id: '3', startDate: '10/06/2024', endDate: '14/06/2024', status: 'Pendiente', type: 'vacaciones' },
      { id: '4', startDate: '25/07/2024', endDate: '25/07/2024', status: 'Aprobado', type: 'horasLibres' },
      { id: '5', startDate: '15/08/2024', endDate: '16/08/2024', status: 'Rechazado', type: 'permisos' },
    ];

    const categories: AbsenceCategory[] = [
      {
        type: 'vacaciones',
        label: 'Vacaciones',
        color: '#0f7b6c',
        absences: sampleAbsences.filter(a => a.type === 'vacaciones')
      },
      {
        type: 'puentes',
        label: 'Puentes disponibles',
        color: '#e74c3c',
        absences: sampleAbsences.filter(a => a.type === 'puentes')
      },
      {
        type: 'horasLibres',
        label: 'Horas de libre disposición',
        color: '#f39c12',
        absences: sampleAbsences.filter(a => a.type === 'horasLibres')
      },
      {
        type: 'permisos',
        label: 'Permisos Retribuidos',
        color: '#9b59b6',
        absences: sampleAbsences.filter(a => a.type === 'permisos')
      },
      {
        type: 'bajaMedica',
        label: 'Baja médica',
        color: '#9b59b6',
        absences: sampleAbsences.filter(a => a.type === 'bajaMedica')
      },
      {
        type: 'maternidad',
        label: 'Baja de maternidad / paternidad',
        color: '#34495e',
        absences: sampleAbsences.filter(a => a.type === 'maternidad')
      }
    ];

    return categories;
  };

  const handleEditEmployee = (id: string) => {
    setIsModalOpen(true);
  };

  const handleDeleteEmployee = (id: string) => {
    console.log('Delete employee:', id);
  };

  const handleViewAbsences = (id: string) => {
    setSelectedEmployeeId(id);
    setIsAbsencesModalOpen(true);
  };

  const handleAbsenceAction = (absenceId: string) => {
    console.log('Action on absence:', absenceId);
  };

  const handleSaveEmployee = () => {
    setIsModalOpen(false);
  };

  const handleCancelEdit = () => {
    setIsModalOpen(false);
  };

  const handleCloseAbsencesModal = () => {
    setIsAbsencesModalOpen(false);
    setSelectedEmployeeId('');
  };

  const selectedEmployeeName = employees.find(emp => emp.id === selectedEmployeeId)?.name || '';
  const employeeAbsences = getEmployeeAbsences(selectedEmployeeId);

  return (
    <div className="employee-management">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-expand">
          <img 
            src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/139b22d0-199d-4311-98e1-093a25987fc4" 
            alt="Expand"
            className="expand-icon"
          />
        </div>

        <div className="sidebar-top">
          <div className="sidebar-logo">
            <img 
              src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/d53e9b77-900f-4bc6-befd-e8b41c7e5915" 
              alt="Logo"
              className="logo-image"
            />
          </div>

          <div className="sidebar-user-zone">
            <SidebarIcon 
              imageUrl="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/bcb00f30-88d0-476a-92d7-51767018a38a"
              alt="User 1"
            />
            <SidebarIcon 
              imageUrl="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/bcb00f30-88d0-476a-92d7-51767018a38a"
              alt="User 2"
            />
          </div>

          <div className="sidebar-actions">
            <SidebarIcon 
              imageUrl="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/bcb00f30-88d0-476a-92d7-51767018a38a"
              alt="Action 1"
            />
            <SidebarIcon 
              imageUrl="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/bcb00f30-88d0-476a-92d7-51767018a38a"
              alt="Action 2"
            />
            <div className="sidebar-icon active">
              <div className="users-icon">
                <svg width="24" height="19" viewBox="0 0 24 19" fill="none">
                  <path d="M24 19H0V17C0 13.686 2.686 11 6 11H18C21.314 11 24 13.686 24 17V19Z" fill="white"/>
                </svg>
              </div>
            </div>
            <SidebarIcon 
              imageUrl="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/bcb00f30-88d0-476a-92d7-51767018a38a"
              alt="Action 4"
            />
          </div>
        </div>

        <div className="sidebar-bottom">
          <div className="sidebar-help">
            <SidebarIcon 
              imageUrl="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/bcb00f30-88d0-476a-92d7-51767018a38a"
              alt="Help 1"
            />
            <SidebarIcon 
              imageUrl="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/bcb00f30-88d0-476a-92d7-51767018a38a"
              alt="Help 2"
            />
          </div>

          <div className="sidebar-personal">
            <img 
              src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/d53e9b77-900f-4bc6-befd-e8b41c7e5915" 
              alt="Personal"
              className="personal-image"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Search Field */}
        <div className="search-section">
          <div className="search-label">Buscar</div>
          <div className="search-input-container">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
              placeholder=""
            />
            <img 
              src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/2c53ba4b-503d-4e23-a529-4474306b49aa"
              alt="Search"
              className="search-icon"
            />
          </div>
        </div>

        {/* Employee Table */}
        <div className="employee-table">
          {/* Table Header */}
          <div className="table-header">
            <div className="header-employee">Empelado</div>
            <div className="header-office">Oficina</div>
            <div className="header-email">Correo electronico</div>
            <div className="header-responsible">Responsable</div>
            <div className="header-action">Acción</div>
          </div>

          {/* Table Rows */}
          <div className="table-body">
            {employees.map((employee) => (
              <EmployeeRow
                key={employee.id}
                employee={employee}
                onEdit={handleEditEmployee}
                onDelete={handleDeleteEmployee}
                onViewAbsences={handleViewAbsences}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Edit Employee Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2 className="modal-title">Editar Empelado</h2>
              <button className="modal-close" onClick={handleCancelEdit}>
                <img 
                  src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/4c99b600-bb04-40af-a930-cb62fe8545ff"
                  alt="Close"
                />
              </button>
            </div>

            <div className="modal-form">
              <div className="form-section">
                <h3 className="section-title">Empleado</h3>
                <div className="employee-info-form">
                  <div className="employee-avatar-large">
                    <span className="avatar-initials-large">NA</span>
                  </div>
                  <div className="name-fields">
                    <InputField
                      label="Nombre"
                      value={selectedEmployee.firstName}
                      onChange={(value) => setSelectedEmployee({...selectedEmployee, firstName: value})}
                      className="name-field"
                    />
                    <InputField
                      label="Apellidos"
                      value={selectedEmployee.lastName}
                      onChange={(value) => setSelectedEmployee({...selectedEmployee, lastName: value})}
                      className="name-field"
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-title">Información</h3>
                <div className="info-fields">
                  <InputField
                    label="Oficina"
                    value={selectedEmployee.office}
                    onChange={(value) => setSelectedEmployee({...selectedEmployee, office: value})}
                    className="office-field"
                  />
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-title">Contacto</h3>
                <div className="contact-fields">
                  <InputField
                    label="Email:"
                    value={selectedEmployee.email}
                    onChange={(value) => setSelectedEmployee({...selectedEmployee, email: value})}
                    className="contact-field"
                  />
                  <InputField
                    label="Teléfono:"
                    value={selectedEmployee.phone}
                    onChange={(value) => setSelectedEmployee({...selectedEmployee, phone: value})}
                    className="contact-field"
                  />
                  <InputField
                    label="Extensión"
                    value={selectedEmployee.extension}
                    onChange={(value) => setSelectedEmployee({...selectedEmployee, extension: value})}
                    className="contact-field"
                  />
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-title">Calendario asignado</h3>
                <div className="calendar-dropdown">
                  <select 
                    value={selectedEmployee.calendar}
                    onChange={(e) => setSelectedEmployee({...selectedEmployee, calendar: e.target.value})}
                    className="dropdown-select"
                  >
                    <option value="Calendario de Madrid 2024">Calendario de Madrid 2024</option>
                    <option value="Calendario de Barcelona 2024">Calendario de Barcelona 2024</option>
                    <option value="Calendario de Valencia 2024">Calendario de Valencia 2024</option>
                  </select>
                  <img 
                    src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/139b22d0-199d-4311-98e1-093a25987fc4"
                    alt="Dropdown"
                    className="dropdown-arrow"
                  />
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-title">Tipos de ausencias</h3>
                <div className="absence-types">
                  <CheckboxOption
                    id="vacaciones"
                    label="Vacaciones"
                    color="#0f7b6c"
                    checked={absenceTypes.vacaciones}
                    onChange={(checked) => setAbsenceTypes({...absenceTypes, vacaciones: checked})}
                  />
                  <CheckboxOption
                    id="puentes"
                    label="Puentes disponibles"
                    color="#e74c3c"
                    checked={absenceTypes.puentes}
                    onChange={(checked) => setAbsenceTypes({...absenceTypes, puentes: checked})}
                  />
                  <CheckboxOption
                    id="permisos"
                    label="Permisos Retribuidos"
                    color="#9b59b6"
                    checked={absenceTypes.permisos}
                    onChange={(checked) => setAbsenceTypes({...absenceTypes, permisos: checked})}
                  />
                  <CheckboxOption
                    id="horasLibres"
                    label="Horas de libre disposición"
                    color="#f39c12"
                    checked={absenceTypes.horasLibres}
                    onChange={(checked) => setAbsenceTypes({...absenceTypes, horasLibres: checked})}
                  />
                  <CheckboxOption
                    id="maternidad"
                    label="Baja de maternidad / paternidad"
                    color="#34495e"
                    checked={absenceTypes.maternidad}
                    onChange={(checked) => setAbsenceTypes({...absenceTypes, maternidad: checked})}
                  />
                  <CheckboxOption
                    id="bajaMedica"
                    label="Baja médica"
                    color="#9b59b6"
                    checked={absenceTypes.bajaMedica}
                    onChange={(checked) => setAbsenceTypes({...absenceTypes, bajaMedica: checked})}
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button className="cancel-button" onClick={handleCancelEdit}>
                  Cancelar
                </button>
                <button className="save-button" onClick={handleSaveEmployee}>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Absences Modal */}
      {isAbsencesModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container absences-modal">
            <div className="modal-header">
              <h2 className="modal-title">Ausencias de {selectedEmployeeName}</h2>
              <button className="modal-close" onClick={handleCloseAbsencesModal}>
                <img 
                  src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/4c99b600-bb04-40af-a930-cb62fe8545ff"
                  alt="Close"
                />
              </button>
            </div>

            <div className="absences-content">
              {employeeAbsences.map((category) => (
                <AbsenceCategory
                  key={category.type}
                  category={category}
                  onAbsenceAction={handleAbsenceAction}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeManagement;
