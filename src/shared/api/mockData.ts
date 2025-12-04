import { Yokai, ThreatLevel } from '../types/yokai';

export const mockYokaiData: Yokai[] = [
  {
    id: 'yk-001',
    name: 'Кицунэ',
    type: 'Лис-оборотень',
    threatLevel: 'High',
    location: 'Район Сибуя',
    status: 'Active',
    lastSeen: '2024-01-15T14:30:00Z',
    description: 'Девятихвостый лис-оборотень, известный способностью менять облик',
  },
  {
    id: 'yk-002',
    name: 'Тэнгу',
    type: 'Демон-птица',
    threatLevel: 'Critical',
    location: 'Гора Такао',
    status: 'Active',
    lastSeen: '2024-01-15T13:45:00Z',
    description: 'Птицеподобный демон со сверхъестественным мастерством боевых искусств',
  },
  {
    id: 'yk-003',
    name: 'Юки-онна',
    type: 'Снежный дух',
    threatLevel: 'Medium',
    location: 'Сады Синдзюку',
    status: 'Active',
    lastSeen: '2024-01-15T12:00:00Z',
    description: 'Снежная женщина, замораживающая жертв своим дыханием',
  },
  {
    id: 'yk-004',
    name: 'Каппа',
    type: 'Водяной',
    threatLevel: 'Low',
    location: 'Река Сумида',
    status: 'Captured',
    lastSeen: '2024-01-14T18:20:00Z',
    description: 'Водяной бес с углублением на голове, наполненным водой',
  },
  {
    id: 'yk-005',
    name: 'Они',
    type: 'Демон-огр',
    threatLevel: 'Critical',
    location: 'Акихабара',
    status: 'Active',
    lastSeen: '2024-01-15T15:00:00Z',
    description: 'Свирепый демон-огр, вооружённый железной дубиной',
  },
  {
    id: 'yk-006',
    name: 'Дзёрогумо',
    type: 'Паук-оборотень',
    threatLevel: 'High',
    location: 'Парк Уэно',
    status: 'Active',
    lastSeen: '2024-01-15T11:30:00Z',
    description: 'Женщина-паук, соблазняющая и заманивающая жертв в ловушку',
  },
  {
    id: 'yk-007',
    name: 'Тануки',
    type: 'Енот-оборотень',
    threatLevel: 'Low',
    location: 'Район Янака',
    status: 'Active',
    lastSeen: '2024-01-15T10:15:00Z',
    description: 'Озорной енотовидный пёс со способностью к превращениям',
  },
  {
    id: 'yk-008',
    name: 'Нуэ',
    type: 'Химера',
    threatLevel: 'Critical',
    location: 'Императорский дворец',
    status: 'Active',
    lastSeen: '2024-01-15T14:50:00Z',
    description: 'Химера с головой обезьяны, телом тануки, лапами тигра и хвостом змеи',
  },
];

export const threatLevelOrder: Record<ThreatLevel, number> = {
  Critical: 4,
  High: 3,
  Medium: 2,
  Low: 1,
};

export const getRandomThreatLevel = (): ThreatLevel => {
  const levels: ThreatLevel[] = ['Critical', 'High', 'Medium', 'Low'];
  return levels[Math.floor(Math.random() * levels.length)];
};
