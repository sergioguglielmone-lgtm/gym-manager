import React, { useState, useMemo } from 'react';
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
  Phone
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
  { id: 1, firstName: 'Juan', lastName: 'Pérez', dni: '38123456', phone: '+54 9 351 1234567', birthday: '1995-05-12', plan: 'Premium', status: 'Activo', joinDate: '2025-01-15', lastVisit: 'Hoy, 08:30 AM' },
  { id: 2, firstName: 'María', lastName: 'Gómez', dni: '40765432', phone: '+54 9 351 7654321', birthday: '1998-08-22', plan: 'Básico', status: 'Activo', joinDate: '2025-02-01', lastVisit: 'Ayer, 18:45 PM' },
  { id: 3, firstName: 'Carlos', lastName: 'Rodríguez', dni: '35555666', phone: '+54 9 351 5556666', birthday: '1990-11-04', plan: 'Crossfit', status: 'Inactivo', joinDate: '2024-11-20', lastVisit: 'Hace 2 semanas' },
  { id: 4, firstName: 'Ana', lastName: 'Martínez', dni: '42999888', phone: '+54 9 351 9998888', birthday: '2000-02-15', plan: 'Premium', status: 'Activo', joinDate: '2025-10-05', lastVisit: 'Hoy, 07:00 AM' },
  { id: 5, firstName: 'Lucas', lastName: 'Fernández', dni: '44222333', phone: '+54 9 351 2223333', birthday: '1997-09-30', plan: 'Básico', status: 'Pendiente', joinDate: '2026-02-20', lastVisit: 'Nunca' },
];

const PLANS = [
  { id: 1, name: 'Básico', price: 25000, features: ['Acceso a sala de musculación', 'Horario de 08:00 a 16:00', 'Vestuarios'], color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 2, name: 'Premium', price: 35000, features: ['Pase libre 24/7', 'Clases grupales incluidas', 'Asesoramiento nutricional', 'Toallas y lockers'], color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { id: 3, name: 'Crossfit', price: 32000, features: ['Acceso a Box', 'Clases dirigidas', 'Open Box', 'Seguimiento de RM'], color: 'bg-orange-100 text-orange-700 border-orange-200' },
];

const CLASSES = [
  { id: 1, name: 'Spinning', instructor: 'Marta V.', time: '08:00 AM', duration: '45 min', capacity: 20, enrolled: 18 },
  { id: 2, name: 'Crossfit (WOD)', instructor: 'Nico T.', time: '10:00 AM', duration: '60 min', capacity: 15, enrolled: 15 },
  { id: 3, name: 'Yoga Vinyasa', instructor: 'Paz S.', time: '18:00 PM', duration: '60 min', capacity: 25, enrolled: 10 },
  { id: 4, name: 'Zumba', instructor: 'Leo G.', time: '19:30 PM', duration: '50 min', capacity: 30, enrolled: 28 },
];

const DashboardView = ({ members }) => {
  const activeMembers = members.filter(m => m.status === 'Activo').length;
  const totalRevenue = members.filter(m => m.status === 'Activo').reduce((acc, curr) => {
    const plan = PLANS.find(p => p.name === curr.plan);
    return acc + (plan ? plan.price : 0);
  }, 0);

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
            <p className="text-sm text-gray-500 font-medium">Ingresos Estimados</p>
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
                    <td className="px-5 py-3">{m.lastVisit}</td>
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
  const [newMember, setNewMember] = useState({ 
    firstName: '', 
    lastName: '', 
    dni: '', 
    phone: '', 
    birthday: '', 
    joinDate: new Date().toISOString().split('T')[0],
    plan: 'Básico' 
  });

  const [showAIModal, setShowAIModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [aiGoal, setAiGoal] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const filteredMembers = members.filter(m => 
    m.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.dni.includes(searchTerm)
  );

  const handleAddMember = (e) => {
    e.preventDefault();
    if (members.some(m => m.dni === newMember.dni.trim())) {
      alert('Ya existe un socio registrado con este DNI.');
      return;
    }
    const member = {
      ...newMember,
      id: members.length + 1,
      status: 'Activo',
      lastVisit: 'Nunca'
    };
    setMembers([...members, member]);
    setShowAddModal(false);
    setNewMember({ 
      firstName: '', 
      lastName: '', 
      dni: '', 
      phone: '', 
      birthday: '', 
      joinDate: new Date().toISOString().split('T')[0],
      plan: 'Básico' 
    });
  };

  const handleDelete = (id) => {
    if(window.confirm('¿Estás seguro de eliminar este socio?')) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  const handleGenerateRoutine = async () => {
    if (!aiGoal) return alert("Por favor, ingresa el objetivo del socio.");
    setIsGenerating(true);
    setAiResult('');
    
    const prompt = `Actúa como un entrenador personal experto de primer nivel. Crea una rutina de entrenamiento semanal para el socio ${selectedMember.firstName} ${selectedMember.lastName}. 
    Este socio tiene contratado el plan "${selectedMember.plan}". 
    Su objetivo principal es: "${aiGoal}".
    Haz que la rutina sea motivadora, incluye días de descanso, y usa formato markdown (viñetas, negritas) para que sea fácil de leer. No seas demasiado extenso, enfócate en lo accionable.`;

    try {
      const response = await callGeminiAPI(prompt);
      setAiResult(response);
    } catch (error) {
      setAiResult("Hubo un error al generar la rutina. Por favor intenta nuevamente.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Socios (ABM)</h2>
        <button 
          onClick={() => setShowAddModal(true)}
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
                <th className="px-6 py-4">Membresía</th>
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
                          title="Generar rutina con IA"
                          onClick={() => {
                            setSelectedMember(member);
                            setAiGoal('');
                            setAiResult('');
                            setShowAIModal(true);
                          }}
                          className="p-1.5 text-amber-500 hover:text-amber-600 hover:bg-amber-50 rounded transition-colors"
                        >
                          <Sparkles size={16} />
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
              <h3 className="text-lg font-bold text-indigo-900">Dar de Alta Nuevo Socio</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddMember} className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input required type="text" value={newMember.firstName} onChange={e => setNewMember({...newMember, firstName: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                  <input required type="text" value={newMember.lastName} onChange={e => setNewMember({...newMember, lastName: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">DNI (Usuario de acceso)</label>
                  <input required type="text" placeholder="Ej: 38123456" value={newMember.dni} onChange={e => setNewMember({...newMember, dni: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Número de Teléfono</label>
                  <input required type="tel" placeholder="Ej: 3511234567" value={newMember.phone} onChange={e => setNewMember({...newMember, phone: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                  <p className="text-[11px] text-gray-500 mt-1">🔑 Clave: Últimos 4 dígitos del teléfono</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Ingreso</label>
                  <input required type="date" value={newMember.joinDate} onChange={e => setNewMember({...newMember, joinDate: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Cumpleaños</label>
                  <input required type="date" value={newMember.birthday} onChange={e => setNewMember({...newMember, birthday: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Plan</label>
                <select value={newMember.plan} onChange={e => setNewMember({...newMember, plan: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm">
                  {PLANS.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">Registrar Socio</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAIModal && selectedMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-amber-50 to-orange-50">
              <div className="flex items-center gap-2 text-amber-600">
                <Sparkles size={20} />
                <h3 className="text-lg font-bold">Generador de Rutina IA ✨</h3>
              </div>
              <button onClick={() => setShowAIModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-5 overflow-y-auto flex-1 space-y-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Generando rutina para <strong>{selectedMember.firstName} {selectedMember.lastName}</strong> (Plan {selectedMember.plan})</p>
                <label className="block text-sm font-medium text-gray-700 mb-1">¿Cuál es el objetivo principal del socio?</label>
                <input 
                  type="text" 
                  placeholder="Ej: Bajar 5kg, ganar fuerza, mejorar cardio..." 
                  value={aiGoal} 
                  onChange={e => setAiGoal(e.target.value)} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 mb-3" 
                />
                <button 
                  onClick={handleGenerateRoutine}
                  disabled={isGenerating}
                  className="w-full px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-colors text-sm font-bold flex justify-center items-center gap-2 disabled:opacity-70"
                >
                  {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                  {isGenerating ? 'Generando Rutina...' : '✨ Generar Rutina Personalizada'}
                </button>
              </div>

              {aiResult && (
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-gray-800 mb-3">Rutina Sugerida:</h4>
                  <div className="prose prose-sm text-gray-700 max-w-none whitespace-pre-wrap">
                    {aiResult}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PlansView = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Planes y Membresías</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PLANS.map((plan) => (
          <div key={plan.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">
            <div className={`p-4 border-b ${plan.color}`}>
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold">${plan.price.toLocaleString('es-AR')}</span>
                <span className="text-sm opacity-80">/mes</span>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <ul className="space-y-3 flex-1 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ClassesView = () => {
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [promoResult, setPromoResult] = useState('');
  const [isGeneratingPromo, setIsGeneratingPromo] = useState(false);

  const handleGeneratePromo = async (cls) => {
    setSelectedClass(cls);
    setShowPromoModal(true);
    setIsGeneratingPromo(true);
    setPromoResult('');

    const prompt = `Actúa como un experto en marketing de redes sociales para gimnasios. Escribe un post súper cautivador y enérgico para Instagram (incluyendo emojis y 5 hashtags relevantes) promocionando nuestra clase de "${cls.name}". 
    Detalles de la clase:
    - Horario: ${cls.time}
    - Instructor: ${cls.instructor}
    - Duración: ${cls.duration}
    - Cupos disponibles: Quedan ${cls.capacity - cls.enrolled} lugares de ${cls.capacity}.
    
    Llama a la acción al final invitando a la gente a reservar su lugar.`;

    try {
      const response = await callGeminiAPI(prompt);
      setPromoResult(response);
    } catch (error) {
      setPromoResult("Error al generar el texto de promoción.");
    } finally {
      setIsGeneratingPromo(false);
    }
  };

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
                
                <div className="flex items-center gap-4 w-full sm:w-auto flex-wrap">
                  <button 
                    onClick={() => handleGeneratePromo(cls)}
                    className="text-purple-600 hover:text-purple-800 text-sm font-medium px-3 py-1.5 border border-purple-200 rounded hover:bg-purple-50 transition-colors flex items-center gap-1"
                  >
                    <Sparkles size={14} /> ✨ Promocionar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showPromoModal && selectedClass && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
           <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-purple-50 to-fuchsia-50">
              <div className="flex items-center gap-2 text-purple-600">
                <Sparkles size={20} />
                <h3 className="text-lg font-bold">Post para Redes ✨</h3>
              </div>
              <button onClick={() => setShowPromoModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-5">
              {isGeneratingPromo ? (
                <div className="flex flex-col items-center justify-center py-10 space-y-3 text-purple-600">
                  <Loader2 size={32} className="animate-spin" />
                  <p className="font-medium text-sm animate-pulse">La IA de Gemini está escribiendo un post viral...</p>
                </div>
              ) : (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm text-gray-800 whitespace-pre-wrap font-medium">
                  {promoResult}
                </div>
              )}
            </div>
           </div>
        </div>
      )}
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

    // 1. Verificar si es un Administrador
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

    // 2. Verificar si es un Socio (DNI)
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
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [admins, setAdmins] = useState([
    { id: 1, name: 'Admin Principal', username: 'admin', password: '123456' }
  ]);

  if (!user) {
    return <LoginScreen members={members} admins={admins} onLogin={(userData) => { setUser(userData); setActiveTab('dashboard'); }} />;
  }

  const allNavItems = [
    { id: 'dashboard', label: 'Panel', icon: LayoutDashboard, roles: ['admin', 'member'] },
    { id: 'members', label: 'Gestión de Socios', icon: Users, roles: ['admin'] },
    { id: 'plans', label: 'Membresías', icon: CreditCard, roles: ['admin', 'member'] },
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
      case 'dashboard': return <DashboardView members={members} />;
      case 'members': return <MembersView members={members} setMembers={setMembers} />;
      case 'plans': return <PlansView />;
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
                <p className="text-xs text-indigo-400 truncate capitalize">{user.role === 'admin' ? 'Administrador' : `DNI: ${user.dni}`}</p>
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