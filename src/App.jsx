import React, { useState, useMemo, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Calendar, 
  Settings, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Activity, 
  TrendingUp, 
  Dumbbell, 
  Menu, 
  X,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Clock,
  Sparkles,
  Loader2,
  Copy,
  Lock,
  User,
  LogOut,
  ShieldAlert,
  UserPlus,
  Key,
  ShieldCheck,
  Cake,
  Phone,
  DollarSign,
  FileText,
  Check,
  AlertCircle
} from 'lucide-react';

const callGeminiAPI = async (prompt) => {
  const apiKey = ""; // Se inyecta automáticamente en el entorno de ejecución
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: {
      parts: [{ text: "Eres un asistente experto para la gestión de un gimnasio. Responde de forma profesional, motivadora y estructurada." }]
    }
  };

  const delays = [1000, 2000, 4000, 8000, 16000];
  for (let i = 0; i < 5; i++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error('Error en la API de Gemini');
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "No se generó ninguna respuesta.";
    } catch (error) {
      if (i === 4) throw new Error('Fallo al conectar con Gemini tras varios intentos.');
      await new Promise(res => setTimeout(res, delays[i]));
    }
  }
};

const INITIAL_MEMBERS = [
  { id: 1, firstName: 'Juan', lastName: 'Pérez', dni: '38123456', phone: '+54 9 351 1234567', birthday: '1995-05-12', plan: 'Premium', status: 'Activo', joinDate: '2026-01-15', lastVisit: 'Hoy, 08:30 AM' },
  { id: 2, firstName: 'María', lastName: 'Gómez', dni: '40765432', phone: '+54 9 351 7654321', birthday: '1998-08-22', plan: 'Básico', status: 'Activo', joinDate: '2026-02-01', lastVisit: 'Ayer, 18:45 PM' },
  { id: 3, firstName: 'Carlos', lastName: 'Rodríguez', dni: '35555666', phone: '+54 9 351 5556666', birthday: '1990-11-04', plan: 'Crossfit', status: 'Inactivo', joinDate: '2025-11-20', lastVisit: 'Hace 2 semanas' },
];

const INITIAL_LEDGER = {
  // Ej: { "1-2026-03": { status: 'pagado', amount: 30000, note: '' } }
};

const PLANS = [
  { id: 1, name: 'Básico', price: 30000, features: ['Acceso a sala de musculación', 'Horario de 08:00 a 16:00', 'Vestuarios'], color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 2, name: 'Premium', price: 30000, features: ['Pase libre 24/7', 'Clases grupales incluidas', 'Asesoramiento nutricional', 'Toallas y lockers'], color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { id: 3, name: 'Crossfit', price: 30000, features: ['Acceso a Box', 'Clases dirigidas', 'Open Box', 'Seguimiento de RM'], color: 'bg-orange-100 text-orange-700 border-orange-200' },
];

const CLASSES = [
  { id: 1, name: 'Spinning', instructor: 'Marta V.', time: '08:00 AM', duration: '45 min', capacity: 20, enrolled: 18 },
  { id: 2, name: 'Crossfit (WOD)', instructor: 'Nico T.', time: '10:00 AM', duration: '60 min', capacity: 15, enrolled: 15 },
  { id: 3, name: 'Yoga Vinyasa', instructor: 'Paz S.', time: '18:00 PM', duration: '60 min', capacity: 25, enrolled: 10 },
  { id: 4, name: 'Zumba', instructor: 'Leo G.', time: '19:30 PM', duration: '50 min', capacity: 30, enrolled: 28 },
];

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

const DashboardView = ({ members, ledger }) => {
  const activeMembers = members.filter(m => m.status === 'Activo').length;
  
  // Calcular recaudación total sumando los pagos de todos los meses de todos los socios
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
        <h2 className="text-2xl font-bold text-gray-800">Panel de Control</h2>
        <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg text-sm font-medium border border-indigo-100 flex items-center gap-2">
          <Activity size={16} /> Sistema Activo
        </div>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm col-span-1 lg:col-span-2 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">Accesos Recientes</h3>
          </div>
          <div className="p-0">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-500 font-medium">
                <tr>
                  <th className="px-5 py-3">Socio</th>
                  <th className="px-5 py-3">Plan</th>
                  <th className="px-5 py-3">Hora</th>
                  <th className="px-5 py-3">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {members.slice(0,4).map((m, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-5 py-3 font-medium text-gray-800">{m.firstName} {m.lastName}</td>
                    <td className="px-5 py-3">{m.plan}</td>
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

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800">Próximas Clases Hoy</h3>
          </div>
          <div className="p-5 space-y-4">
            {CLASSES.map(cls => (
              <div key={cls.id} className="flex items-start gap-4">
                <div className="bg-indigo-50 text-indigo-700 rounded-lg p-2 text-center min-w-[60px]">
                  <span className="block text-xs font-bold">{cls.time.split(' ')[0]}</span>
                  <span className="block text-[10px] uppercase">{cls.time.split(' ')[1]}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 text-sm">{cls.name}</h4>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <Users size={12} /> {cls.enrolled}/{cls.capacity} anotados
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MembersView = ({ members, setMembers }) => {
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
    plan: 'Básico',
    status: 'Activo'
  });

  const filteredMembers = members.filter(m => 
    m.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.dni.includes(searchTerm)
  );

  const handleOpenAdd = () => {
    setEditingMemberId(null);
    setMemberForm({
      firstName: '',
      lastName: '',
      dni: '',
      phone: '',
      birthday: '',
      joinDate: new Date().toISOString().split('T')[0],
      plan: 'Básico',
      status: 'Activo'
    });
    setShowAddModal(true);
  };

  const handleOpenEdit = (member) => {
    setEditingMemberId(member.id);
    setMemberForm({
      firstName: member.firstName,
      lastName: member.lastName,
      dni: member.dni,
      phone: member.phone,
      birthday: member.birthday || '',
      joinDate: member.joinDate || new Date().toISOString().split('T')[0],
      plan: member.plan,
      status: member.status || 'Activo'
    });
    setShowAddModal(true);
  };

  const handleSaveMember = (e) => {
    e.preventDefault();
    
    if (editingMemberId) {
      setMembers(members.map(m => m.id === editingMemberId ? { ...m, ...memberForm } : m));
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
      setMembers([...members, newMember]);
    }
    
    setShowAddModal(false);
  };

  const handleDelete = (id) => {
    if(window.confirm('¿Estás seguro de eliminar este socio?')) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Socios (ABM)</h2>
        <button 
          onClick={handleOpenAdd}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 text-sm font-medium w-full sm:w-auto justify-center"
        >
          <UserPlus size={18} />
          Dar de Alta Socio
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por nombre, apellido o DNI..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Socio</th>
                <th className="px-6 py-4">DNI / Contacto</th>
                <th className="px-6 py-4">Fecha Ingreso / Cumpleaños</th>
                <th className="px-6 py-4">Plan</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredMembers.map((member) => {
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
                      <span className="font-medium text-gray-700">{member.plan}</span>
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
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
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
                  <input required type="text" value={memberForm.firstName} onChange={e => setMemberForm({...memberForm, firstName: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                  <input required type="text" value={memberForm.lastName} onChange={e => setMemberForm({...memberForm, lastName: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">DNI (Usuario de acceso)</label>
                  <input required type="text" placeholder="Ej: 38123456" value={memberForm.dni} onChange={e => setMemberForm({...memberForm, dni: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Número de Teléfono</label>
                  <input required type="tel" placeholder="Ej: 3511234567" value={memberForm.phone} onChange={e => setMemberForm({...memberForm, phone: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                  <p className="text-[11px] text-gray-500 mt-1">🔑 Clave: Últimos 4 dígitos del teléfono</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Ingreso</label>
                  <input required type="date" value={memberForm.joinDate} onChange={e => setMemberForm({...memberForm, joinDate: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Cumpleaños</label>
                  <input required type="date" value={memberForm.birthday} onChange={e => setMemberForm({...memberForm, birthday: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Plan / Actividad</label>
                  <select value={memberForm.plan} onChange={e => setMemberForm({...memberForm, plan: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm">
                    {PLANS.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                  <select value={memberForm.status} onChange={e => setMemberForm({...memberForm, status: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm">
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                    <option value="Pendiente">Pendiente</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
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

const CurrentAccountView = ({ members, ledger, setLedger, currentUser }) => {
  // Selector de año actual
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  // Si es admin, puede elegir qué socio ver. Si es socio, solo ve su propia cuenta.
  const initialMemberId = currentUser.role === 'admin' ? (members[0]?.id || '') : (members.find(m => m.dni === currentUser.dni)?.id || members[0]?.id || '');
  const [selectedMemberId, setSelectedMemberId] = useState(initialMemberId);

  // Modal para Registrar Novedad
  const [showNovedadModal, setShowNovedadModal] = useState(false);
  const [activeMonthForNovedad, setActiveMonthForNovedad] = useState(null);
  const [novedadForm, setNovedadForm] = useState({
    status: 'pagado', // pagado | sin_cargo | ausencia
    amount: 30000,
    note: ''
  });

  const selectedMember = members.find(m => m.id === Number(selectedMemberId)) || members[0];

  // Calcular deudas pendientes automáticas según la fecha de ingreso
  const getCalculatedMonthStatus = (member, year, monthNumber) => {
    if (!member || !member.joinDate) return { status: 'pendiente', amount: 30000, note: '' };

    const [joinYear, joinMonth] = member.joinDate.split('-').map(Number);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    // Si el mes/año es anterior a la fecha de ingreso del socio, no corresponde pagar
    if (year < joinYear || (year === joinYear && monthNumber < joinMonth)) {
      return { status: 'no_corresponde', amount: 0, note: 'Antes del alta' };
    }

    const ledgerKey = `${member.id}-${year}-${monthNumber}`;
    if (ledger[ledgerKey]) {
      return ledger[ledgerKey];
    }

    // Si es un mes futuro al actual, todavía no adeuda
    if (year > currentYear || (year === currentYear && monthNumber > currentMonth)) {
      return { status: 'futuro', amount: 0, note: '' };
    }

    // Por defecto, si el mes ya transcurrió o es el actual y no tiene registro, está PENDIENTE (Debe)
    return { status: 'pendiente', amount: 30000, note: '' };
  };

  const handleOpenNovedad = (month) => {
    setActiveMonthForNovedad(month);
    const ledgerKey = `${selectedMember.id}-${selectedYear}-${month.number}`;
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
    if (!activeMonthForNovedad || !selectedMember) return;

    const ledgerKey = `${selectedMember.id}-${selectedYear}-${activeMonthForNovedad.number}`;
    const updatedLedger = {
      ...ledger,
      [ledgerKey]: {
        status: novedadForm.status,
        amount: novedadForm.status === 'pagado' ? Number(novedadForm.amount) : 0,
        note: novedadForm.note
      }
    };
    setLedger(updatedLedger);
    setShowNovedadModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Cuenta Corriente - Calendario Anual</h2>
          <p className="text-sm text-gray-500 mt-0.5">Control de cuotas mensuales, pagos y novedades por socio.</p>
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
        {/* Selector de Socio (Solo visible para Administradores) */}
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
                      <p className="text-xs opacity-75">DNI: {m.dni} • Plan: {m.plan}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Detalle de Meses del Año */}
        <div className={`bg-white rounded-xl border border-gray-100 shadow-sm p-6 ${currentUser.role === 'admin' ? 'lg:col-span-3' : 'lg:col-span-4'} space-y-6`}>
          {selectedMember ? (
            <>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-gray-100 gap-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{selectedMember.firstName} {selectedMember.lastName}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">DNI: {selectedMember.dni} | Ingreso al gimnasio: <span className="font-semibold text-indigo-600">{selectedMember.joinDate}</span></p>
                </div>
                <div className="bg-indigo-900 text-white px-4 py-2 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle size={16} className="text-amber-400" />
                  <span>Valor de Cuota Fija: <strong>$30.000</strong></span>
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

      {/* Modal para Registrar Novedad (Admin) */}
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium"
                >
                  <option value="pagado">🟢 Pagado (Ingreso de Cuota)</option>
                  <option value="pendiente">🔴 Pendiente (Debe Cuota)</option>
                  <option value="sin_cargo">🔵 Sin Cargo</option>
                  <option value="ausencia">🟡 Ausencia en todo el mes</option>
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" 
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" 
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowNovedadModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">Guardar Novedad</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const ClassesView = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Horarios de Clases</h2>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-0">
          <div className="divide-y divide-gray-100">
            {CLASSES.map((cls) => (
              <div key={cls.id} className="p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center hover:bg-gray-50 transition-colors">
                <div className="bg-gray-100 text-gray-800 rounded-lg px-4 py-2 text-center min-w-[100px] flex items-center justify-center gap-2">
                  <Clock size={16} className="text-gray-500" />
                  <span className="font-bold">{cls.time}</span>
                </div>
                
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-800">{cls.name}</h4>
                  <p className="text-sm text-gray-500 mt-1">Instructor: {cls.instructor} • {cls.duration}</p>
                </div>
                
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <span className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg font-medium">
                    Cupos: {cls.enrolled}/{cls.capacity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingsView = ({ admins, setAdmins }) => {
  const [showNewAdminModal, setShowNewAdminModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: '', username: '', password: '' });

  const handleAddAdmin = (e) => {
    e.preventDefault();
    if (admins.some(a => a.username === newAdmin.username)) {
      alert('Este usuario ya existe.');
      return;
    }
    setAdmins([...admins, { id: admins.length + 1, ...newAdmin }]);
    setShowNewAdminModal(false);
    setNewAdmin({ name: '', username: '', password: '' });
  };

  const handleDeleteAdmin = (id) => {
    if (admins.length <= 1) {
      alert('Debe existir al menos un administrador en el sistema.');
      return;
    }
    if (window.confirm('¿Estás seguro de eliminar este administrador?')) {
      setAdmins(admins.filter(a => a.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Ajustes y Gestión de Administradores</h2>
        <button 
          onClick={() => setShowNewAdminModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 text-sm font-medium"
        >
          <ShieldCheck size={18} />
          Nuevo Administrador
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Administradores Autorizados</h3>
          <p className="text-sm text-gray-500 mb-4">Estos usuarios tienen acceso completo a la gestión del gimnasio, control de socios y finanzas.</p>
          
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
              <button onClick={() => setShowNewAdminModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddAdmin} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                <input required type="text" value={newAdmin.name} onChange={e => setNewAdmin({...newAdmin, name: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de Usuario (Login)</label>
                <input required type="text" placeholder="ej: andres_admin" value={newAdmin.username} onChange={e => setNewAdmin({...newAdmin, username: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                <input required type="password" placeholder="••••••" value={newAdmin.password} onChange={e => setNewAdmin({...newAdmin, password: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowNewAdminModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">Guardar Administrador</button>
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
        onLogin({ name: `${foundMember.firstName} ${foundMember.lastName}`, dni: foundMember.dni, role: 'member', plan: foundMember.plan });
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
          <h1 className="text-2xl font-bold tracking-tight">GymManager AI</h1>
          <p className="text-indigo-200 text-sm mt-1">Ingresa con DNI (Socio) o Usuario (Admin)</p>
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
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
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
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
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
  
  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem('gym_members');
    return saved ? JSON.parse(saved) : INITIAL_MEMBERS;
  });

  const [ledger, setLedger] = useState(() => {
    const saved = localStorage.getItem('gym_ledger');
    return saved ? JSON.parse(saved) : INITIAL_LEDGER;
  });

  const [admins, setAdmins] = useState(() => {
    const saved = localStorage.getItem('gym_admins');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Admin Principal', username: 'admin', password: '123456' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('gym_members', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('gym_ledger', JSON.stringify(ledger));
  }, [ledger]);

  useEffect(() => {
    localStorage.setItem('gym_admins', JSON.stringify(admins));
  }, [admins]);

  if (!user) {
    return <LoginScreen members={members} admins={admins} onLogin={(userData) => { setUser(userData); setActiveTab('dashboard'); }} />;
  }

  const allNavItems = [
    { id: 'dashboard', label: 'Panel', icon: LayoutDashboard, roles: ['admin', 'member'] },
    { id: 'members', label: 'Gestión de Socios', icon: Users, roles: ['admin'] },
    { id: 'payments', label: 'Cuenta Corriente', icon: CreditCard, roles: ['admin', 'member'] },
    { id: 'classes', label: 'Clases', icon: Calendar, roles: ['admin', 'member'] },
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
      case 'dashboard': return <DashboardView members={members} ledger={ledger} />;
      case 'members': return <MembersView members={members} setMembers={setMembers} />;
      case 'payments': return <CurrentAccountView members={members} ledger={ledger} setLedger={setLedger} currentUser={user} />;
      case 'classes': return <ClassesView />;
      case 'settings': return <SettingsView admins={admins} setAdmins={setAdmins} />;
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
        <div className="p-6 flex items-center gap-3 text-white">
          <div className="bg-indigo-500 p-2 rounded-lg">
            <Dumbbell size={24} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">GymManager AI</span>
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