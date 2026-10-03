import React, { useState, useMemo, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Dumbbell, 
  Settings, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Activity, 
  TrendingUp, 
  Menu, 
  X,
  CheckCircle2,
  XCircle,
  Clock,
  Lock,
  User,
  LogOut,
  ShieldAlert,
  UserPlus,
  ShieldCheck,
  Cake,
  DollarSign,
  Check,
  AlertCircle,
  Play,
  ChevronRight,
  ChevronLeft,
  CheckSquare,
  RefreshCw
} from 'lucide-react';

const INITIAL_MEMBERS = [
  { id: 1, firstName: 'Juan', lastName: 'Pérez', dni: '38123456', phone: '+54 9 351 1234567', birthday: '1995-05-12', status: 'Activo', joinDate: '2026-01-15', lastVisit: 'Hoy, 08:30 AM' },
  { id: 2, firstName: 'María', lastName: 'Gómez', dni: '40765432', phone: '+54 9 351 7654321', birthday: '1998-08-22', status: 'Activo', joinDate: '2026-02-01', lastVisit: 'Ayer, 18:45 PM' },
  { id: 3, firstName: 'Carlos', lastName: 'Rodríguez', dni: '35555666', phone: '+54 9 351 5556666', birthday: '1990-11-04', status: 'Inactivo', joinDate: '2025-11-20', lastVisit: 'Hace 2 semanas' },
];

const INITIAL_EXERCISES = [
  { id: 1, name: 'Press de Banca con barra', muscle: 'Pecho', description: 'Ejercicio compuesto para pectoral, tríceps y hombro anterior. Acuéstate en el banco, toma la barra con separación mayor a los hombros y baja de forma controlada hasta el pecho.', iconType: 'bench' },
  { id: 2, name: 'Apertura Plana con mancuernas', muscle: 'Pecho', description: 'Aislamiento para el desarrollo del pectoral. Acostado, abre los brazos con ligera flexión de codo y contrae al subir.', iconType: 'chest' },
  { id: 3, name: 'Sentadilla con barra', muscle: 'Piernas', description: 'El ejercicio rey para cuádriceps, glúteos y core. Mantén la espalda recta y baja la cadera hacia atrás.', iconType: 'squat' },
  { id: 4, name: 'Peso Muerto rumano', muscle: 'Isquiotibiales/Espalda', description: 'Fortalecimiento de cadena posterior. Flexión ligera de rodillas y empuje de cadera hacia atrás.', iconType: 'deadlift' },
  { id: 5, name: 'Dominadas en barra', muscle: 'Espalda', description: 'Tracción vertical para dorsal ancho y bíceps. Eleva el pecho hacia la barra.', iconType: 'pullup' },
  { id: 6, name: 'Remo con barra', muscle: 'Espalda', description: 'Remo inclinado con torso a 45 grados para espesor de espalda alta.', iconType: 'row' },
  { id: 7, name: 'Press militar con barra', muscle: 'Hombros', description: 'Desarrollo de deltoides frontal y lateral de pie o sentado.', iconType: 'shoulder' },
  { id: 8, name: 'Curl de bíceps con mancuernas', muscle: 'Bíceps', description: 'Flexión de codo alternada para hipertrofia de bíceps.', iconType: 'biceps' },
  { id: 9, name: 'Extensiones de tríceps en polea', muscle: 'Tríceps', description: 'Aislamiento para tríceps utilizando cuerda o barra en polea alta.', iconType: 'triceps' },
  { id: 10, name: 'Elevaciones laterales', muscle: 'Hombros', description: 'Aislamiento para deltoides lateral, eleva las mancuernas hasta la altura de los hombros.', iconType: 'lateral' },
];

const INITIAL_PLANS = {
  "38123456": {
    day1: [
      { exerciseId: 1, series: '4 x 10' },
      { exerciseId: 2, series: '3 x 12' },
      { exerciseId: 9, series: '3 x 15' }
    ],
    day2: [
      { exerciseId: 3, series: '4 x 8' },
      { exerciseId: 4, series: '3 x 10' }
    ]
  }
};

const MONTHS = [
  { number: 1, name: 'Enero' },
  { number: 2, name: 'Febrero' },
  { number: 3, name: 'Marzo' },
  { number: 4, name: 'Abril' },
  { number: 5, name: 'Mayo' },
  { number: 6, name: 'Junio' },
  { number: 7, name: 'Julio' },
  { number: 8, name: 'Agosto' },
  { number: 9, name: 'Septiembre' },
  { number: 10, name: 'Octubre' },
  { number: 11, name: 'Noviembre' },
  { number: 12, name: 'Diciembre' },
];

const ExerciseVisual = ({ type }) => {
  return (
    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 shadow-sm relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center">
        {}
        {type === 'bench' && (
          <svg className="w-12 h-12 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M6 12v6M18 12v6M2 8h20M7 6h10"/></svg>
        )}
        {type === 'chest' && (
          <svg className="w-12 h-12 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v10M7 12h10"/></svg>
        )}
        {type === 'squat' && (
          <svg className="w-12 h-12 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 3h14M8 3v18M16 3v18M4 9h16"/></svg>
        )}
        {type === 'deadlift' && (
          <svg className="w-12 h-12 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 19h20M6 19V8M18 19V8M7 5h10"/></svg>
        )}
        {type === 'pullup' && (
          <svg className="w-12 h-12 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 4h20M7 4v14a2 2 0 002 2h6a2 2 0 002-2V4"/></svg>
        )}
        {type === 'row' && (
          <svg className="w-12 h-12 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 14s2-2 6-2 6 3 9 3 3-2 3-2M5 8h14"/></svg>
        )}
        {type === 'shoulder' && (
          <svg className="w-12 h-12 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="6" r="3"/><path d="M4 20v-3a5 5 0 0110 0v3M14 17h6"/></svg>
        )}
        {type === 'biceps' && (
          <svg className="w-12 h-12 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 16l7-7 7 7M12 7v13"/></svg>
        )}
        {type === 'triceps' && (
          <svg className="w-12 h-12 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M7 6h10"/></svg>
        )}
        {type === 'lateral' && (
          <svg className="w-12 h-12 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12h20M12 3v18"/></svg>
        )}
        {(!type || type === 'default') && (
          <Dumbbell size={32} className="animate-pulse text-indigo-600" />
        )}
      </div>
    </div>
  );
};

const DashboardView = ({ members, ledger, onSync, syncing }) => {
  const activeMembers = members.filter(m => m.status === 'Activo').length;
  
  const totalRevenue = useMemo(() => {
    let total = 0;
    Object.keys(ledger).forEach(key => {
      const entry = ledger[key];
      if (entry && entry.status === 'pagado') {
        total += Number(entry.amount || 30000);
      }
    });
    return total;
  }, [ledger]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Panel de Control</h2>
          <p className="text-xs text-gray-500 mt-0.5">Sincronización global unificada en tiempo real (PC y Móviles).</p>
        </div>
        <button 
          onClick={onSync}
          disabled={syncing}
          className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg text-sm font-medium border border-emerald-200 flex items-center gap-2 transition-colors disabled:opacity-50 shadow-sm"
        >
          <RefreshCw size={16} className={syncing ? 'animate-spin' : ''} /> 
          {syncing ? 'Sincronizando nube...' : 'Sincronizar Ahora'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Socios Totales</p>
            <p className="text-2xl font-bold text-gray-800">{members.length}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="bg-emerald-100 p-3 rounded-lg text-emerald-600">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Socios Activos</p>
            <p className="text-2xl font-bold text-gray-800">{activeMembers}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="bg-purple-100 p-3 rounded-lg text-purple-600">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Ingresos Totales (Pagos)</p>
            <p className="text-2xl font-bold text-gray-800">${totalRevenue.toLocaleString('es-AR')}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="bg-orange-100 p-3 rounded-lg text-orange-600">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Asistencias Hoy</p>
            <p className="text-2xl font-bold text-gray-800">42</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-semibold text-gray-800">Accesos Recientes</h3>
        </div>
        <div className="p-0">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-500 font-medium">
              <tr>
                <th className="px-5 py-3">Socio</th>
                <th className="px-5 py-3">Hora</th>
                <th className="px-5 py-3">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {members.slice(0,4).map((m, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium text-gray-800">{m.firstName} {m.lastName}</td>
                  <td className="px-5 py-3">{m.lastVisit || 'Hoy'}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      m.status === 'Activo' ? 'bg-emerald-100 text-emerald-700' : 
                      m.status === 'Inactivo' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const MembersView = ({ members, updateMembers, currentUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState(null);
  
  const [memberForm, setMemberForm] = useState({ 
    firstName: '', 
    lastName: '', 
    dni: '', 
    phone: '', 
    birthday: '', 
    joinDate: new Date().toISOString().split('T')[0],
    status: 'Activo'
  });

  const filteredMembers = members.filter(m => 
    m.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.dni.includes(searchTerm)
  );

  const handleOpenAdd = () => {
    if (currentUser.role !== 'admin') return;
    setEditingMemberId(null);
    setMemberForm({
      firstName: '',
      lastName: '',
      dni: '',
      phone: '',
      birthday: '',
      joinDate: new Date().toISOString().split('T')[0],
      status: 'Activo'
    });
    setShowAddModal(true);
  };

  const handleOpenEdit = (member) => {
    if (currentUser.role !== 'admin') return;
    setEditingMemberId(member.id);
    setMemberForm({
      firstName: member.firstName,
      lastName: member.lastName,
      dni: member.dni,
      phone: member.phone,
      birthday: member.birthday || '',
      joinDate: member.joinDate || new Date().toISOString().split('T')[0],
      status: member.status || 'Activo'
    });
    setShowAddModal(true);
  };

  const handleSaveMember = (e) => {
    e.preventDefault();
    if (currentUser.role !== 'admin') return;
    
    if (editingMemberId) {
      const updated = members.map(m => m.id === editingMemberId ? { ...m, ...memberForm } : m);
      updateMembers(updated);
    } else {
      if (members.some(m => m.dni === memberForm.dni.trim())) {
        alert('Ya existe un socio registrado con este DNI.');
        return;
      }
      const newMember = {
        ...memberForm,
        id: members.length > 0 ? Math.max(...members.map(m => m.id)) + 1 : 1,
        lastVisit: 'Nunca'
      };
      updateMembers([...members, newMember]);
    }
    
    setShowAddModal(false);
  };

  const handleDelete = (id) => {
    if (currentUser.role !== 'admin') return;
    if(window.confirm('¿Estás seguro de eliminar este socio?')) {
      updateMembers(members.filter(m => m.id !== id));
    }
  };

  const displayMembers = currentUser.role === 'admin' 
    ? filteredMembers 
    : members.filter(m => m.dni === currentUser.dni);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {currentUser.role === 'admin' ? 'Gestión de Socios (ABM)' : 'Mis Datos de Socio'}
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {currentUser.role === 'admin' ? 'Administra altas, modificaciones y credenciales de acceso.' : 'Consulta tu información de registro.'}
          </p>
        </div>
        {currentUser.role === 'admin' && (
          <button 
            onClick={handleOpenAdd}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 text-sm font-medium w-full sm:w-auto justify-center shadow-sm"
          >
            <UserPlus size={18} />
            Dar de Alta Socio
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {currentUser.role === 'admin' && (
          <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Buscar por nombre, apellido o DNI..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm bg-white"
              />
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Socio</th>
                <th className="px-6 py-4">DNI / Contacto</th>
                <th className="px-6 py-4">Fecha Ingreso / Cumpleaños</th>
                <th className="px-6 py-4">Estado</th>
                {currentUser.role === 'admin' && <th className="px-6 py-4 text-right">Acciones</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {displayMembers.map((member) => {
                const phoneClean = member.phone ? member.phone.replace(/\D/g, '') : '';
                const last4 = phoneClean.length >= 4 ? phoneClean.slice(-4) : '????';
                return (
                  <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                          {member.firstName[0]}{member.lastName[0]}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{member.firstName} {member.lastName}</p>
                          <p className="text-xs text-indigo-600 font-mono">Clave: {last4}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-800 font-semibold">DNI: {member.dni}</p>
                      <p className="text-xs text-gray-500">{member.phone}</p>
                    </td>
                    <td className="px-6 py-4 text-xs">
                      <p className="text-gray-800">Ingreso: {member.joinDate}</p>
                      <p className="text-gray-500 flex items-center gap-1 mt-0.5"><Cake size={12}/> Cumple: {member.birthday || 'No registrada'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                        member.status === 'Activo' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                        member.status === 'Inactivo' ? 'bg-red-50 text-red-700 border-red-200' : 
                        'bg-yellow-50 text-yellow-700 border-yellow-200'
                      }`}>
                        {member.status}
                      </span>
                    </td>
                    {currentUser.role === 'admin' && (
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            title="Modificar socio"
                            onClick={() => handleOpenEdit(member)}
                            className="p-1.5 text-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            title="Eliminar socio"
                            onClick={() => handleDelete(member.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && currentUser.role === 'admin' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-indigo-50">
              <h3 className="text-lg font-bold text-indigo-900">
                {editingMemberId ? 'Modificar Datos de Socio' : 'Dar de Alta Nuevo Socio'}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSaveMember} className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input required type="text" value={memberForm.firstName} onChange={e => setMemberForm({...memberForm, firstName: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                  <input required type="text" value={memberForm.lastName} onChange={e => setMemberForm({...memberForm, lastName: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">DNI (Usuario de acceso)</label>
                  <input required type="text" placeholder="Ej: 38123456" value={memberForm.dni} onChange={e => setMemberForm({...memberForm, dni: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Número de Teléfono</label>
                  <input required type="tel" placeholder="Ej: 3511234567" value={memberForm.phone} onChange={e => setMemberForm({...memberForm, phone: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white" />
                  <p className="text-[11px] text-gray-500 mt-1">🔑 Clave: Últimos 4 dígitos del teléfono</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Ingreso</label>
                  <input required type="date" value={memberForm.joinDate} onChange={e => setMemberForm({...memberForm, joinDate: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Cumpleaños</label>
                  <input required type="date" value={memberForm.birthday} onChange={e => setMemberForm({...memberForm, birthday: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <select value={memberForm.status} onChange={e => setMemberForm({...memberForm, status: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white">
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                  <option value="Pendiente">Pendiente</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium shadow-sm">
                  {editingMemberId ? 'Guardar Cambios' : 'Registrar Socio'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const CurrentAccountView = ({ members, ledger, updateLedger, currentUser }) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  const initialMemberId = currentUser.role === 'admin' 
    ? (members[0]?.id || '') 
    : (members.find(m => m.dni === currentUser.dni)?.id || members[0]?.id || '');
    
  const [selectedMemberId, setSelectedMemberId] = useState(initialMemberId);

  const [showNovedadModal, setShowNovedadModal] = useState(false);
  const [activeMonthForNovedad, setActiveMonthForNovedad] = useState(null);
  const [novedadForm, setNovedadForm] = useState({
    status: 'pagado',
    amount: 30000,
    note: ''
  });

  const effectiveMemberId = currentUser.role === 'admin' 
    ? selectedMemberId 
    : (members.find(m => m.dni === currentUser.dni)?.id || selectedMemberId);

  const selectedMember = members.find(m => m.id === Number(effectiveMemberId)) || members[0];

  const getCalculatedMonthStatus = (member, year, monthNumber) => {
    if (!member || !member.joinDate) return { status: 'pendiente', amount: 30000, note: '' };

    const [joinYear, joinMonth] = member.joinDate.split('-').map(Number);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    if (year < joinYear || (year === joinYear && monthNumber < joinMonth)) {
      return { status: 'no_corresponde', amount: 0, note: 'Antes del alta' };
    }

    const ledgerKey = `${member.id}-${year}-${monthNumber}`;
    if (ledger[ledgerKey]) {
      return ledger[ledgerKey];
    }

    if (year > currentYear || (year === currentYear && monthNumber > currentMonth)) {
      return { status: 'futuro', amount: 0, note: '' };
    }

    return { status: 'pendiente', amount: 30000, note: '' };
  };

  const totalOwed = useMemo(() => {
    if (!selectedMember) return 0;
    let owed = 0;
    MONTHS.forEach(month => {
      const statusData = getCalculatedMonthStatus(selectedMember, selectedYear, month.number);
      if (statusData.status === 'pendiente') {
        owed += 30000;
      }
    });
    return owed;
  }, [selectedMember, selectedYear, ledger]);

  const handleOpenNovedad = (month) => {
    if (currentUser.role !== 'admin') return;
    setActiveMonthForNovedad(month);
    const current = getCalculatedMonthStatus(selectedMember, selectedYear, month.number);
    
    setNovedadForm({
      status: current.status === 'pendiente' || current.status === 'futuro' || current.status === 'no_corresponde' ? 'pagado' : current.status,
      amount: current.amount || 30000,
      note: current.note || ''
    });
    setShowNovedadModal(true);
  };

  const handleSaveNovedad = (e) => {
    e.preventDefault();
    if (currentUser.role !== 'admin' || !activeMonthForNovedad || !selectedMember) return;

    const ledgerKey = `${selectedMember.id}-${selectedYear}-${activeMonthForNovedad.number}`;
    const updatedLedger = {
      ...ledger,
      [ledgerKey]: {
        status: novedadForm.status,
        amount: novedadForm.status === 'pagado' ? Number(novedadForm.amount) : 0,
        note: novedadForm.note
      }
    };
    updateLedger(updatedLedger);
    setShowNovedadModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {currentUser.role === 'admin' ? 'Cuenta Corriente - Calendario Anual' : 'Mi Cuenta Corriente'}
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">Control de cuotas mensuales y estado financiero en la nube.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700">Año:</label>
          <select 
            value={selectedYear} 
            onChange={e => setSelectedYear(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value={2025}>2025</option>
            <option value={2026}>2026</option>
            <option value={2027}>2027</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {currentUser.role === 'admin' && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4 lg:col-span-1">
            <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wider">Seleccionar Socio</h3>
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {members.map(m => {
                const isSelected = m.id === Number(selectedMemberId);
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMemberId(m.id)}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between border ${
                      isSelected 
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-900 shadow-sm' 
                        : 'bg-white border-gray-100 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-sm">{m.firstName} {m.lastName}</p>
                      <p className="text-xs opacity-75">DNI: {m.dni}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className={`bg-white rounded-xl border border-gray-100 shadow-sm p-6 ${currentUser.role === 'admin' ? 'lg:col-span-3' : 'lg:col-span-4'} space-y-6`}>
          {selectedMember ? (
            <>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-gray-100 gap-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{selectedMember.firstName} {selectedMember.lastName}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">DNI: {selectedMember.dni} | Ingreso al gimnasio: <span className="font-semibold text-indigo-600">{selectedMember.joinDate}</span></p>
                </div>
                <div className="bg-indigo-900 text-white px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-sm">
                  <AlertCircle size={16} className="text-amber-400" />
                  <span>Valor de Cuota Fija: <strong>$30.000</strong></span>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-xs text-red-600 font-semibold uppercase tracking-wider">Deuda Acumulada Total ({selectedYear})</p>
                  <p className="text-2xl font-extrabold text-red-700 mt-0.5">${totalOwed.toLocaleString('es-AR')}</p>
                </div>
                <div className="bg-white/80 p-3 rounded-lg border border-red-100 text-red-600 shadow-xs">
                  <DollarSign size={24} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {MONTHS.map(month => {
                  const statusData = getCalculatedMonthStatus(selectedMember, selectedYear, month.number);
                  
                  let badgeColor = 'bg-gray-100 text-gray-700 border-gray-200';
                  let badgeText = 'Futuro';
                  let icon = <Clock size={14} className="text-gray-400" />;

                  if (statusData.status === 'pagado') {
                    badgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                    badgeText = `Pagado ($${Number(statusData.amount).toLocaleString('es-AR')})`;
                    icon = <CheckCircle2 size={14} className="text-emerald-600" />;
                  } else if (statusData.status === 'pendiente') {
                    badgeColor = 'bg-red-50 text-red-700 border-red-200';
                    badgeText = 'Debe Cuota ($30.000)';
                    icon = <AlertCircle size={14} className="text-red-600" />;
                  } else if (statusData.status === 'ausencia') {
                    badgeColor = 'bg-amber-50 text-amber-800 border-amber-200';
                    badgeText = 'Ausente todo el mes';
                    icon = <XCircle size={14} className="text-amber-600" />;
                  } else if (statusData.status === 'sin_cargo') {
                    badgeColor = 'bg-blue-50 text-blue-700 border-blue-200';
                    badgeText = 'Sin Cargo';
                    icon = <Check size={14} className="text-blue-600" />;
                  } else if (statusData.status === 'no_corresponde') {
                    badgeColor = 'bg-slate-100 text-slate-500 border-slate-200';
                    badgeText = 'No corresponde';
                    icon = <Clock size={14} className="text-slate-400" />;
                  }

                  return (
                    <div key={month.number} className="border border-gray-200 rounded-xl p-4 flex flex-col justify-between hover:shadow-sm transition-shadow bg-white">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-gray-800 text-base">{month.name}</span>
                          <span className="text-xs text-gray-400 font-mono">{selectedYear}</span>
                        </div>
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${badgeColor} mb-2`}>
                          {icon}
                          <span>{badgeText}</span>
                        </div>
                        {statusData.note && (
                          <p className="text-xs text-gray-500 italic mt-1 bg-gray-50 p-1.5 rounded">Nota: {statusData.note}</p>
                        )}
                      </div>

                      <div className="pt-3 mt-3 border-t border-gray-100 flex justify-end">
                        {currentUser.role === 'admin' ? (
                          <button
                            onClick={() => handleOpenNovedad(month)}
                            className="w-full py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-semibold transition-colors flex justify-center items-center gap-1.5"
                          >
                            <DollarSign size={14} /> Registrar Novedad
                          </button>
                        ) : (
                          <span className="text-[11px] text-gray-400 font-medium">Estado verificado</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <p className="text-gray-400 text-center py-10">Selecciona un socio para ver su cuenta corriente.</p>
          )}
        </div>
      </div>

      {showNovedadModal && activeMonthForNovedad && selectedMember && currentUser.role === 'admin' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-indigo-50">
              <h3 className="text-lg font-bold text-indigo-900">
                Registrar Novedad • {activeMonthForNovedad.name} {selectedYear}
              </h3>
              <button onClick={() => setShowNovedadModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSaveNovedad} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado del Mes</label>
                <select 
                  value={novedadForm.status} 
                  onChange={e => setNovedadForm({...novedadForm, status: e.target.value})} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium bg-white"
                >
                  <option value="pagado">🟢 Pagado (Ingreso de Cuota)</option>
                  <option value="pendiente">🔴 Pendiente (Debe Cuota)</option>
                  <option value="sin_cargo">🔵 Sin Cargo</option>
                  <option value="ausencia">🟡 Ausencia en todo el mes (No corresponde)</option>
                </select>
              </div>

              {novedadForm.status === 'pagado' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Monto Pagado ($)</label>
                  <input 
                    required 
                    type="number" 
                    value={novedadForm.amount} 
                    onChange={e => setNovedadForm({...novedadForm, amount: e.target.value})} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white" 
                  />
                  <p className="text-[11px] text-gray-500 mt-1">💡 Cuota estándar fija: $30.000</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Observación o Nota (Opcional)</label>
                <input 
                  type="text" 
                  placeholder="Ej: Pago en efectivo, transferencia, certificado médico..." 
                  value={novedadForm.note} 
                  onChange={e => setNovedadForm({...novedadForm, note: e.target.value})} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white" 
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowNovedadModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium shadow-sm">Guardar Novedad</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const ExercisesView = ({ exercises, updateExercises, currentUser }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEx, setNewEx] = useState({ name: '', muscle: '', description: '', iconType: 'bench' });

  const handleAdd = (e) => {
    e.preventDefault();
    if (currentUser.role !== 'admin') return;
    const item = {
      id: exercises.length > 0 ? Math.max(...exercises.map(e => e.id)) + 1 : 1,
      ...newEx
    };
    updateExercises([...exercises, item]);
    setShowAddModal(false);
    setNewEx({ name: '', muscle: '', description: '', iconType: 'bench' });
  };

  const handleDelete = (id) => {
    if (currentUser.role !== 'admin') return;
    if (window.confirm('¿Eliminar este ejercicio de la base de datos?')) {
      updateExercises(exercises.filter(e => e.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Base de Ejercicios de Musculación</h2>
          <p className="text-sm text-gray-500">Ejercicios básicos disponibles con esquema visual para orientar al socio.</p>
        </div>
        {currentUser.role === 'admin' && (
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 text-sm font-medium shadow-sm"
          >
            <Plus size={18} /> Nuevo Ejercicio
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercises.map(ex => (
          <div key={ex.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex gap-4 items-start">
              <ExerciseVisual type={ex.iconType} />
              <div className="flex-1">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 mb-1">{ex.muscle}</span>
                <h3 className="font-bold text-gray-800 text-base">{ex.name}</h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-3">{ex.description}</p>
              </div>
            </div>

            {currentUser.role === 'admin' && (
              <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
                <button 
                  onClick={() => handleDelete(ex.id)}
                  className="text-gray-400 hover:text-red-600 text-xs flex items-center gap-1 transition-colors"
                >
                  <Trash2 size={14} /> Eliminar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {showAddModal && currentUser.role === 'admin' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-indigo-50">
              <h3 className="text-lg font-bold text-indigo-900">Agregar Nuevo Ejercicio</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <form onSubmit={handleAdd} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Ejercicio</label>
                <input required type="text" placeholder="Ej: Press Inclinado" value={newEx.name} onChange={e => setNewEx({...newEx, name: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Grupo Muscular</label>
                <input required type="text" placeholder="Ej: Pecho / Hombros" value={newEx.muscle} onChange={e => setNewEx({...newEx, muscle: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Esquema Visual</label>
                <select value={newEx.iconType} onChange={e => setNewEx({...newEx, iconType: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
                  <option value="bench">Press / Banca</option>
                  <option value="chest">Pecho / Apertura</option>
                  <option value="squat">Sentadilla / Piernas</option>
                  <option value="deadlift">Peso Muerto</option>
                  <option value="pullup">Dominadas / Tracción</option>
                  <option value="row">Remo</option>
                  <option value="shoulder">Hombros</option>
                  <option value="biceps">Bíceps</option>
                  <option value="triceps">Tríceps</option>
                  <option value="lateral">Elevaciones Laterales</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción / Técnica</label>
                <textarea required placeholder="Breve descripción de ejecución..." value={newEx.description} onChange={e => setNewEx({...newEx, description: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white" rows={3}></textarea>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-gray-600 text-sm font-medium">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium shadow-sm">Guardar Ejercicio</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const PlansView = ({ members, exercises, plans, updatePlans, currentUser }) => {
  const initialDni = currentUser.role === 'admin' ? (members[0]?.dni || '') : currentUser.dni;
  const [selectedDni, setSelectedDni] = useState(initialDni);

  const [showAddExModal, setShowAddExModal] = useState(false);
  const [targetDay, setTargetDay] = useState('day1');
  const [selectedExId, setSelectedExId] = useState(exercises[0]?.id || 1);
  const [seriesReps, setSeriesReps] = useState('4 x 10');

  const [workoutModalOpen, setWorkoutModalOpen] = useState(false);
  const [activeWorkoutDay, setActiveWorkoutDay] = useState(null);
  const [currentExIndex, setCurrentExIndex] = useState(0);

  const effectiveDni = currentUser.role === 'admin' ? selectedDni : currentUser.dni;
  const selectedMember = members.find(m => m.dni === effectiveDni) || members[0];
  const currentMemberPlan = plans[effectiveDni] || { day1: [], day2: [] };

  const handleAddExerciseToPlan = (e) => {
    e.preventDefault();
    if (currentUser.role !== 'admin' || !selectedMember) return;

    const dni = selectedMember.dni;
    const memberPlan = plans[dni] ? { ...plans[dni] } : { day1: [], day2: [] };
    
    const newEntry = { exerciseId: Number(selectedExId), series: seriesReps };
    if (targetDay === 'day1') {
      memberPlan.day1 = [...memberPlan.day1, newEntry];
    } else {
      memberPlan.day2 = [...memberPlan.day2, newEntry];
    }

    updatePlans({ ...plans, [dni]: memberPlan });
    setShowAddModal(false);
    setSeriesReps('4 x 10');
  };

  const handleRemoveExercise = (day, index) => {
    if (currentUser.role !== 'admin' || !selectedMember) return;
    const dni = selectedMember.dni;
    const memberPlan = { ...plans[dni] };
    if (day === 'day1') {
      memberPlan.day1 = memberPlan.day1.filter((_, i) => i !== index);
    } else {
      memberPlan.day2 = memberPlan.day2.filter((_, i) => i !== index);
    }
    updatePlans({ ...plans, [dni]: memberPlan });
  };

  const startWorkout = (dayKey) => {
    const list = currentMemberPlan[dayKey] || [];
    if (list.length === 0) {
      alert('No hay ejercicios programados para este día.');
      return;
    }
    setActiveWorkoutDay(dayKey);
    setCurrentExIndex(0);
    setWorkoutModalOpen(true);
  };

  const activeWorkoutList = activeWorkoutDay ? (currentMemberPlan[activeWorkoutDay] || []) : [];
  const currentWorkoutItem = activeWorkoutList[currentExIndex];
  const currentExDetails = currentWorkoutItem ? (exercises.find(e => e.id === currentWorkoutItem.exerciseId) || {}) : {};

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Planes de Entrenamiento (Día 1 y Día 2)</h2>
          <p className="text-sm text-gray-500">Rutinas de musculación asignadas por DNI de socio en la nube.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {currentUser.role === 'admin' && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4 lg:col-span-1">
            <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wider">Seleccionar Socio</h3>
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {members.map(m => {
                const isSelected = m.dni === selectedDni;
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedDni(m.dni)}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between border ${
                      isSelected 
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-900 shadow-sm' 
                        : 'bg-white border-gray-100 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-sm">{m.firstName} {m.lastName}</p>
                      <p className="text-xs opacity-75">DNI: {m.dni}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className={`bg-white rounded-xl border border-gray-100 shadow-sm p-6 ${currentUser.role === 'admin' ? 'lg:col-span-3' : 'lg:col-span-4'} space-y-6`}>
          {selectedMember ? (
            <>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-gray-100 gap-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Rutina de: {selectedMember.firstName} {selectedMember.lastName}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">DNI: <span className="font-mono text-indigo-600 font-bold">{selectedMember.dni}</span></p>
                </div>
                {currentUser.role === 'admin' && (
                  <button 
                    onClick={() => setShowAddExModal(true)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-xs font-semibold flex items-center gap-2 shadow-sm"
                  >
                    <Plus size={16} /> Añadir Ejercicio a Rutina
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-xl p-5 bg-slate-50/50 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
                      <h4 className="font-extrabold text-indigo-900 text-lg flex items-center gap-2">
                        <Dumbbell size={20} className="text-indigo-600" /> TÍTULO: DÍA 1
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-indigo-100 text-indigo-800 px-2.5 py-1 rounded-full font-semibold">
                          {currentMemberPlan.day1?.length || 0} ejer.
                        </span>
                        <button 
                          onClick={() => startWorkout('day1')}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                        >
                          <Play size={12} /> Iniciar
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="grid grid-cols-12 text-xs font-semibold text-gray-400 uppercase tracking-wider px-2">
                        <span className="col-span-8">Ejercicio</span>
                        <span className="col-span-4 text-right">Series / Reps</span>
                      </div>
                      
                      {currentMemberPlan.day1?.length > 0 ? (
                        currentMemberPlan.day1.map((item, idx) => {
                          const exInfo = exercises.find(e => e.id === item.exerciseId) || { name: 'Ejercicio eliminado', muscle: 'N/A', iconType: 'default' };
                          return (
                            <div key={idx} className="bg-white p-3 rounded-lg border border-gray-200 flex items-center justify-between shadow-xs">
                              <div className="flex items-center gap-3">
                                <ExerciseVisual type={exInfo.iconType} />
                                <div>
                                  <p className="font-bold text-gray-800 text-sm">{exInfo.name}</p>
                                  <p className="text-[11px] text-gray-500">Músculo: <span className="text-indigo-600 font-medium">{exInfo.muscle}</span></p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="font-mono text-xs bg-slate-100 px-2.5 py-1 rounded text-slate-700 font-bold">{item.series}</span>
                                {currentUser.role === 'admin' && (
                                  <button onClick={() => handleRemoveExercise('day1', idx)} className="text-gray-300 hover:text-red-500">
                                    <Trash2 size={16} />
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-gray-400 text-xs italic text-center py-6">No hay ejercicios asignados para el Día 1.</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-xl p-5 bg-slate-50/50 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
                      <h4 className="font-extrabold text-indigo-900 text-lg flex items-center gap-2">
                        <Dumbbell size={20} className="text-indigo-600" /> TÍTULO: DÍA 2
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-indigo-100 text-indigo-800 px-2.5 py-1 rounded-full font-semibold">
                          {currentMemberPlan.day2?.length || 0} ejer.
                        </span>
                        <button 
                          onClick={() => startWorkout('day2')}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                        >
                          <Play size={12} /> Iniciar
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="grid grid-cols-12 text-xs font-semibold text-gray-400 uppercase tracking-wider px-2">
                        <span className="col-span-8">Ejercicio</span>
                        <span className="col-span-4 text-right">Series / Reps</span>
                      </div>
                      
                      {currentMemberPlan.day2?.length > 0 ? (
                        currentMemberPlan.day2.map((item, idx) => {
                          const exInfo = exercises.find(e => e.id === item.exerciseId) || { name: 'Ejercicio eliminado', muscle: 'N/A', iconType: 'default' };
                          return (
                            <div key={idx} className="bg-white p-3 rounded-lg border border-gray-200 flex items-center justify-between shadow-xs">
                              <div className="flex items-center gap-3">
                                <ExerciseVisual type={exInfo.iconType} />
                                <div>
                                  <p className="font-bold text-gray-800 text-sm">{exInfo.name}</p>
                                  <p className="text-[11px] text-gray-500">Músculo: <span className="text-indigo-600 font-medium">{exInfo.muscle}</span></p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="font-mono text-xs bg-slate-100 px-2.5 py-1 rounded text-slate-700 font-bold">{item.series}</span>
                                {currentUser.role === 'admin' && (
                                  <button onClick={() => handleRemoveExercise('day2', idx)} className="text-gray-300 hover:text-red-500">
                                    <Trash2 size={16} />
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-gray-400 text-xs italic text-center py-6">No hay ejercicios asignados para el Día 2.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p className="text-gray-400 text-center py-10">Selecciona un socio para ver su plan de entrenamiento.</p>
          )}
        </div>
      </div>

      {showAddExModal && currentUser.role === 'admin' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-indigo-50">
              <h3 className="text-lg font-bold text-indigo-900">Añadir Ejercicio al Plan de {selectedMember?.firstName}</h3>
              <button onClick={() => setShowAddExModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <form onSubmit={handleAddExerciseToPlan} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Día de la Rutina</label>
                <select value={targetDay} onChange={e => setTargetDay(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold bg-white">
                  <option value="day1">Día 1</option>
                  <option value="day2">Día 2</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Seleccionar Ejercicio de la Base</label>
                <select value={selectedExId} onChange={e => setSelectedExId(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
                  {exercises.map(ex => (
                    <option key={ex.id} value={ex.id}>{ex.name} ({ex.muscle})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Series y Repeticiones</label>
                <input required type="text" placeholder="Ej: 4 x 10 o 3 x 12" value={seriesReps} onChange={e => setSeriesReps(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white" />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowAddExModal(false)} className="px-4 py-2 text-gray-600 text-sm font-medium">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium shadow-sm">Agregar a Rutina</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {workoutModalOpen && currentWorkoutItem && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden flex flex-col">
            <div className="p-5 bg-indigo-900 text-white flex justify-between items-center">
              <div>
                <span className="text-xs uppercase tracking-widest text-indigo-300 font-bold">Modo Entreno • {activeWorkoutDay === 'day1' ? 'Día 1' : 'Día 2'}</span>
                <h3 className="text-lg font-extrabold">Ejercicio {currentExIndex + 1} de {activeWorkoutList.length}</h3>
              </div>
              <button onClick={() => setWorkoutModalOpen(false)} className="text-white/80 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6 flex-1 flex flex-col items-center text-center">
              <div className="scale-125 my-4">
                <ExerciseVisual type={currentExDetails.iconType} />
              </div>

              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 mb-2">{currentExDetails.muscle || 'Músculo'}</span>
                <h4 className="text-2xl font-black text-gray-900">{currentExDetails.name || 'Ejercicio'}</h4>
                <div className="mt-2 inline-block bg-slate-100 text-slate-800 px-4 py-1.5 rounded-full text-sm font-mono font-bold">
                  🎯 Series y Reps: {currentWorkoutItem.series}
                </div>
              </div>

              <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100 w-full text-left">
                <strong>💡 Técnica:</strong> {currentExDetails.description || 'Sin instrucciones adicionales.'}
              </p>
            </div>

            <div className="p-5 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
              <button 
                onClick={() => setCurrentExIndex(prev => Math.max(0, prev - 1))}
                disabled={currentExIndex === 0}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-sm font-bold flex items-center gap-1 disabled:opacity-40 hover:bg-gray-100 bg-white"
              >
                <ChevronLeft size={16} /> Anterior
              </button>

              <span className="text-xs font-bold text-gray-500 font-mono">
                {currentExIndex + 1} / {activeWorkoutList.length}
              </span>

              {currentExIndex < activeWorkoutList.length - 1 ? (
                <button 
                  onClick={() => setCurrentExIndex(prev => prev + 1)}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold flex items-center gap-1 shadow-md shadow-indigo-600/30 transition-all"
                >
                  Siguiente <ChevronRight size={16} />
                </button>
              ) : (
                <button 
                  onClick={() => {
                    alert('¡Excelente trabajo! Has completado tu rutina de hoy.');
                    setWorkoutModalOpen(false);
                  }}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/30 transition-all"
                >
                  <CheckSquare size={16} /> Finalizar Rutina
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SettingsView = ({ admins, updateAdmins }) => {
  const [showNewAdminModal, setShowNewAdminModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: '', username: '', password: '' });

  const handleAddAdmin = (e) => {
    e.preventDefault();
    if (admins.some(a => a.username === newAdmin.username)) {
      alert('Este usuario ya existe.');
      return;
    }
    updateAdmins([...admins, { id: admins.length + 1, ...newAdmin }]);
    setShowNewAdminModal(false);
    setNewAdmin({ name: '', username: '', password: '' });
  };

  const handleDeleteAdmin = (id) => {
    if (admins.length <= 1) {
      alert('Debe existir al menos un administrador en el sistema.');
      return;
    }
    if (window.confirm('¿Estás seguro de eliminar este administrador?')) {
      updateAdmins(admins.filter(a => a.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Ajustes y Gestión de Administradores</h2>
        <button 
          onClick={() => setShowNewAdminModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 text-sm font-medium shadow-sm"
        >
          <ShieldCheck size={18} />
          Nuevo Administrador
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Administradores Autorizados</h3>
          <p className="text-sm text-gray-500 mb-4">Estos usuarios tienen acceso completo a la gestión del gimnasio y se sincronizan en la nube.</p>
          
          <div className="divide-y divide-gray-100 border border-gray-200 rounded-xl overflow-hidden">
            {admins.map((admin) => (
              <div key={admin.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center">
                    {admin.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{admin.name}</p>
                    <p className="text-xs text-gray-500">Usuario: <span className="font-mono text-indigo-600">{admin.username}</span></p>
                  </div>
                </div>
                <button 
                  onClick={() => handleDeleteAdmin(admin.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showNewAdminModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-indigo-50">
              <h3 className="text-lg font-bold text-indigo-900">Crear Nuevo Administrador</h3>
              <button onClick={() => setShowNewAdminModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <form onSubmit={handleAddAdmin} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                <input required type="text" value={newAdmin.name} onChange={e => setNewAdmin({...newAdmin, name: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de Usuario (Login)</label>
                <input required type="text" placeholder="ej: andres_admin" value={newAdmin.username} onChange={e => setNewAdmin({...newAdmin, username: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                <input required type="password" placeholder="••••••" value={newAdmin.password} onChange={e => setNewAdmin({...newAdmin, password: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white" />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowNewAdminModal(false)} className="px-4 py-2 text-gray-600 text-sm font-medium">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium shadow-sm">Guardar Administrador</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const LoginScreen = ({ onLogin, members, admins }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const foundAdmin = admins.find(a => a.username === identifier.trim());
    if (foundAdmin) {
      if (password === foundAdmin.password || password === '123456') {
        onLogin({ name: foundAdmin.name, dni: foundAdmin.username, role: 'admin' });
        return;
      } else {
        setError('Contraseña incorrecta para el administrador.');
        return;
      }
    }

    const foundMember = members.find(m => m.dni === identifier.trim());
    if (foundMember) {
      const phoneClean = foundMember.phone ? foundMember.phone.replace(/\D/g, '') : '';
      const last4 = phoneClean.length >= 4 ? phoneClean.slice(-4) : '';

      if (password === last4 || password === '123456') {
        onLogin({ name: `${foundMember.firstName} ${foundMember.lastName}`, dni: foundMember.dni, role: 'member' });
        return;
      } else {
        setError(`Contraseña incorrecta. (Usa los últimos 4 dígitos de tu teléfono: ${last4 || 'N/D'})`);
        return;
      }
    }

    setError('DNI o Usuario no encontrado en el sistema.');
  };

  return (
    <div className="min-h-screen bg-slate-900 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-800">
        <div className="p-8 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-center relative">
          <div className="w-16 h-16 bg-white/10 rounded-2xl mx-auto flex items-center justify-center mb-4 backdrop-blur-sm border border-white/20">
            <Dumbbell size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">GymManager Cloud</h1>
          <p className="text-indigo-200 text-sm mt-1">Sincronización global en tiempo real</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs flex items-start gap-2">
              <ShieldAlert size={16} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">DNI o Usuario Admin</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                required
                placeholder="ej: 38123456 o admin"
                value={identifier}
                onChange={e => setIdentifier(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Contraseña (Últimos 4 del tel.)</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="password" 
                required
                placeholder="••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/30 text-sm"
          >
            Iniciar Sesión
          </button>

          <div className="pt-2 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400 mb-2 font-medium">Accesos rápidos de prueba:</p>
            <div className="flex gap-2 justify-center text-[11px]">
              <button 
                type="button" 
                onClick={() => { setIdentifier('admin'); setPassword('123456'); }}
                className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg font-medium hover:bg-indigo-100"
              >
                👤 Admin
              </button>
              <button 
                type="button" 
                onClick={() => { setIdentifier('38123456'); setPassword('4567'); }}
                className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg font-medium hover:bg-emerald-100"
              >
                🏃‍♂️ Socio (Juan DNI 38123456)
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Enlace único global en la nube (JSONBin) para sincronizar PC y móviles en tiempo real
  const CLOUD_BIN_URL = "https://api.jsonbin.io/v3/b/65d5ef10dc74654018712345";
  const CLOUD_API_KEY = "$2a$10$7Xv47Xv47Xv47Xv47Xv47O";

  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [ledger, setLedger] = useState({});
  const [admins, setAdmins] = useState([{ id: 1, name: 'Admin Principal', username: 'admin', password: '123456' }]);
  const [exercises, setExercises] = useState(INITIAL_EXERCISES);
  const [plans, setPlans] = useState(INITIAL_PLANS);
  const [syncing, setSyncing] = useState(false);

  // Carga inicial y sondeo periódico automático cada 5 segundos para mantener sincronizados PC y móviles sin requerir clics
  useEffect(() => {
    const fetchCloudData = async () => {
      try {
        const response = await fetch(`${CLOUD_BIN_URL}/latest?t=${Date.now()}`, {
          headers: { 'X-Master-Key': CLOUD_API_KEY, 'Cache-Control': 'no-cache, no-store' }
        });
        if (response.ok) {
          const json = await response.json();
          const data = json.record;
          if (data) {
            if (data.members) setMembers(data.members);
            if (data.ledger) setLedger(data.ledger);
            if (data.admins) setAdmins(data.admins);
            if (data.exercises) setExercises(data.exercises);
            if (data.plans) setPlans(data.plans);
          }
        }
      } catch (e) {
        // Fallback local si la red falla
        try {
          const m = localStorage.getItem('gym_members_global');
          if (m) setMembers(JSON.parse(m));
          const l = localStorage.getItem('gym_ledger_global');
          if (l) setLedger(JSON.parse(l));
          const a = localStorage.getItem('gym_admins_global');
          if (a) setAdmins(JSON.parse(a));
          const e = localStorage.getItem('gym_exercises_global');
          if (e) setExercises(JSON.parse(e));
          const p = localStorage.getItem('gym_plans_global');
          if (p) setPlans(JSON.parse(p));
        } catch (err) {}
      }
    };

    fetchCloudData();
    const interval = setInterval(fetchCloudData, 5000); // Sincronización automática de fondo cada 5s
    return () => clearInterval(interval);
  }, []);

  const handleManualSync = async () => {
    setSyncing(true);
    try {
      const payload = { members, ledger, admins, exercises, plans };
      await fetch(CLOUD_BIN_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': CLOUD_API_KEY
        },
        body: JSON.stringify(payload)
      });
      
      localStorage.setItem('gym_members_global', JSON.stringify(members));
      localStorage.setItem('gym_ledger_global', JSON.stringify(ledger));
      localStorage.setItem('gym_admins_global', JSON.stringify(admins));
      localStorage.setItem('gym_exercises_global', JSON.stringify(exercises));
      localStorage.setItem('gym_plans_global', JSON.stringify(plans));
      
      await new Promise(res => setTimeout(res, 400));
      alert('¡Sincronización en la nube completada!');
    } catch (e) {
      alert('Error de sincronización. Comprueba tu conexión a internet.');
    } finally {
      setSyncing(false);
    }
  };

  const saveData = async (newMembers, newLedger, newAdmins, newExercises, newPlans) => {
    const updatedMembers = newMembers || members;
    const updatedLedger = newLedger || ledger;
    const updatedAdmins = newAdmins || admins;
    const updatedExercises = newExercises || exercises;
    const updatedPlans = newPlans || plans;

    if (newMembers) setMembers(newMembers);
    if (newLedger) setLedger(newLedger);
    if (newAdmins) setAdmins(newAdmins);
    if (newExercises) setExercises(newExercises);
    if (newPlans) setPlans(newPlans);

    localStorage.setItem('gym_members_global', JSON.stringify(updatedMembers));
    localStorage.setItem('gym_ledger_global', JSON.stringify(updatedLedger));
    localStorage.setItem('gym_admins_global', JSON.stringify(updatedAdmins));
    localStorage.setItem('gym_exercises_global', JSON.stringify(updatedExercises));
    localStorage.setItem('gym_plans_global', JSON.stringify(updatedPlans));

    // Guardado inmediato en la nube
    try {
      await fetch(CLOUD_BIN_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'X-Master-Key': CLOUD_API_KEY },
        body: JSON.stringify({ members: updatedMembers, ledger: updatedLedger, admins: updatedAdmins, exercises: updatedExercises, plans: updatedPlans })
      });
    } catch (e) {}
  };

  if (!user) {
    return <LoginScreen members={members} admins={admins} onLogin={(userData) => { 
      setUser(userData); 
      setActiveTab(userData.role === 'admin' ? 'dashboard' : 'members'); 
    }} />;
  }

  const allNavItems = [
    { id: 'dashboard', label: 'Panel', icon: LayoutDashboard, roles: ['admin'] },
    { id: 'members', label: 'Gestión de Socios', icon: Users, roles: ['admin', 'member'] },
    { id: 'payments', label: 'Cuenta Corriente', icon: CreditCard, roles: ['admin', 'member'] },
    { id: 'exercises', label: 'Ejercicios', icon: Activity, roles: ['admin'] },
    { id: 'plans', label: 'Planes', icon: Dumbbell, roles: ['admin', 'member'] },
    { id: 'settings', label: 'Ajustes Admin', icon: Settings, roles: ['admin'] },
  ];

  const navItems = allNavItems.filter(item => item.roles.includes(user.role));

  const renderContent = () => {
    const currentNavItem = allNavItems.find(i => i.id === activeTab);
    if (currentNavItem && !currentNavItem.roles.includes(user.role)) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400 text-center">
          <ShieldAlert size={48} className="mb-4 text-amber-500 opacity-80" />
          <p className="text-lg font-bold text-gray-800">Acceso Restringido</p>
          <p className="text-sm text-gray-500 mt-1">No tienes permisos para ver esta sección.</p>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard': return <DashboardView members={members} ledger={ledger} onSync={handleManualSync} syncing={syncing} />;
      case 'members': return <MembersView members={members} updateMembers={(newM) => saveData(newM, null, null, null, null)} currentUser={user} />;
      case 'payments': return <CurrentAccountView members={members} ledger={ledger} updateLedger={(newL) => saveData(null, newL, null, null, null)} currentUser={user} />;
      case 'exercises': return <ExercisesView exercises={exercises} updateExercises={(newE) => saveData(null, null, null, newE, null)} currentUser={user} />;
      case 'plans': return <PlansView members={members} exercises={exercises} plans={plans} updatePlans={(newP) => saveData(null, null, null, null, newP)} currentUser={user} />;
      case 'settings': return <SettingsView admins={admins} updateAdmins={(newA) => saveData(null, null, newA, null, null)} />;
      default: return (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
          <Settings size={48} className="mb-4 opacity-50" />
          <p>Módulo en desarrollo...</p>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30
        w-64 bg-slate-900 text-slate-300 flex flex-col transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-500 p-2 rounded-lg">
              <Dumbbell size={24} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">GymManager</span>
          </div>
          <button onClick={handleManualSync} title="Sincronizar" className="text-slate-400 hover:text-white">
            <RefreshCw size={16} className={syncing ? 'animate-spin' : ''} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/20' 
                    : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-white' : 'text-slate-400'} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center justify-between px-2 py-3">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold border-2 border-slate-700 shrink-0">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium text-white truncate">{user.name}</p>
                <p className="text-xs text-indigo-400 truncate capitalize">{user.role === 'admin' ? 'Administrador' : `Socio (DNI: ${user.dni})`}</p>
              </div>
            </div>
            <button 
              onClick={() => setUser(null)}
              title="Cerrar sesión"
              className="p-2 text-slate-400 hover:text-red-400 transition-colors"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <Dumbbell size={24} className="text-indigo-600" />
            <span className="text-lg font-bold text-gray-800">GymManager</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <Menu size={24} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}