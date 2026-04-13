import { GameData } from './types';

export const mockData: GameData = {
  global: {
    location: 'ルビコン3 — 中央氷原 Grid-7F',
    time: '2251/04/17-10:02',
    chapter: '第二章'
  },
  pilot: {
    stats: {
      apm: 187,
      krlLevel: 3,
      syncRate: 72,
      pilotBonus: 15
    },
    mechState: {
      struct: 85,
      structMax: 100,
      armor: 63,
      armorMax: 100,
      acs: 28,
      acsMax: 100,
      shield: 45,
      shieldMax: 60
    },
    profile: {
      funds: 5000,
      exp: 45,
      expRequired: 100
    }
  },
  mech: {
    current: 'UNO',
    build: {
      RA: { type: '武器', name: 'RF-024 TURNER', manufacturer: 'Balam', weight: 3500, weaponType: '动能', armorPenetration: 'TIER2', fixedDamage: 120, ammo: 450, optimalRange: { min: 1, max: 3 } },
      LA: { type: '武器', name: 'HI-32: BU-TT/A', manufacturer: 'Arquebus', weight: 1800, weaponType: '近战', armorPenetration: 'TIER4', fixedDamage: 850, ammo: 0, optimalRange: { min: 1, max: 1 } },
      RB: { type: '武器', name: 'BML-G1/P20MLT-04', manufacturer: 'Furlong', weight: 2200, weaponType: '导弹', armorPenetration: 'TIER3', fixedDamage: 320, ammo: 120, optimalRange: { min: 2, max: 5 } },
      LB: { type: '护盾发生器', name: 'SI-24: SU-Q5', manufacturer: 'Takigawa', weight: 1500, shieldType: '脉冲护盾', shieldMax: 60 },
      HEAD: { type: '头部', name: 'HD-011 MELANDER', manufacturer: 'Balam', weight: 3800, initiativeBonus: 5 },
      CORE: { type: '核心', name: 'BD-011 MELANDER', manufacturer: 'Balam', weight: 15200, armorTier: 'TIER2', armorMax: 100, structMax: 100, acsMax: 100 },
      ARMS: { type: '手部', name: 'AR-011 MELANDER', manufacturer: 'Balam', weight: 12500, meleeBonus: 10, maxWeaponWeight: 6500 },
      LEGS: { type: '足部', name: 'LG-011 MELANDER', manufacturer: 'Balam', weight: 18500, moveEfficiency: 2 },
      BOOSTER: { type: '推进器', name: 'BST-G1/P10', manufacturer: 'Furlong', weight: 1200, totalThrust: 154080 },
      FCS: { type: 'FCS', name: 'FCS-G1/P50', manufacturer: 'Furlong', weight: 800, combatStyle: '均衡战线型', optimalRange: { min: 1, max: 4 }, effect: '中近距离锁定速度+15%' },
      GENERATOR: { type: '发动机', name: 'DF-GN-02 LING-TAI', manufacturer: 'Dafeng', weight: 2800, totalEnergy: 2500 },
      EXPANSION: { type: '扩充机能', name: 'ASSAULT ARMOR', manufacturer: 'ALLMIND', weight: 400, effect: '释放核心能量引发爆炸，造成范围ACS冲击' },
    },
    stats: {
      type: '人形',
      armorTier: 'TIER2',
      armorMax: 100,
      structMax: 100,
      acsMax: 100,
      shieldMax: 60,
      totalWeight: 64200,
      thrustToWeight: 2.4,
      thrustBonus: 2,
      initiativeBonus: 5
    }
  },
  comms: {
    'ayre': {
      id: 'ayre',
      name: '艾尔',
      faction: '珂若尔',
      affinity: 65,
      relationship: '信任',
      sync: 42,
      unread: 0,
      lastComm: '2251/04/17-09:45',
      portraits: [
        'https://cdn.imgchest.com/files/f54ecdab32fa.png',
        'https://cdn.imgchest.com/files/5232454620c6.png',
        'https://cdn.imgchest.com/files/958f4f21c921.png',
        'https://cdn.imgchest.com/files/f2063b731541.png',
      ]
    },
    'allmind': {
      id: 'allmind',
      name: 'ALLMIND',
      faction: 'AM',
      affinity: 30,
      relationship: '相识',
      sync: 10,
      unread: 2,
      lastComm: '2251/04/16-14:20',
      portraits: [
        'https://cdn.imgchest.com/files/a740ccf50b67.png',
        'https://cdn.imgchest.com/files/88c87b34b9cd.png',
        'https://cdn.imgchest.com/files/131d9ee1fc2b.png',
        'https://cdn.imgchest.com/files/422d9bd2398d.png',
      ]
    },
    'lina': {
      id: 'lina',
      name: '莉娜_许奈德',
      faction: '施耐德',
      affinity: 45,
      relationship: '熟识',
      sync: 25,
      unread: 0,
      lastComm: '2251/04/15-08:00',
      portraits: [
        'https://cdn.imgchest.com/files/485d5431b9cd.png',
        'https://cdn.imgchest.com/files/84cc2a2a3100.png',
        'https://cdn.imgchest.com/files/df8f0c3a66c3.png',
        'https://cdn.imgchest.com/files/c1775ce2a102.png',
      ]
    },
    'caoyiyi': {
      id: 'caoyiyi',
      name: '曹奕奕',
      faction: '大丰',
      affinity: 55,
      relationship: '熟识',
      sync: 30,
      unread: 0,
      lastComm: '2251/04/14-11:30',
      portraits: [
        'https://cdn.imgchest.com/files/497451fd0739.png',
        'https://cdn.imgchest.com/files/d417fa5043e9.png',
        'https://cdn.imgchest.com/files/d0c9a6d4546b.png',
      ]
    },
    'linreng': {
      id: 'linreng',
      name: '林芿',
      faction: '独立佣兵',
      affinity: 20,
      relationship: '相识',
      sync: 15,
      unread: 1,
      lastComm: '2251/04/16-20:15',
      portraits: [
        'https://cdn.imgchest.com/files/fa1f0ddead7e.png',
        'https://cdn.imgchest.com/files/b3a8f97f2250.png',
        'https://cdn.imgchest.com/files/31614797fa7c.png',
      ]
    },
    'tailuan': {
      id: 'tailuan',
      name: '邰鸾',
      faction: '贝拉姆',
      affinity: 70,
      relationship: '信任',
      sync: 55,
      unread: 0,
      lastComm: '2251/04/17-08:10',
      portraits: [
        'https://cdn.imgchest.com/files/623b1c76e583.png',
        'https://cdn.imgchest.com/files/f5d057e7b770.png',
        'https://cdn.imgchest.com/files/4c28f7b89b88.png',
      ]
    },
    'lili': {
      id: 'lili',
      name: '利荔',
      faction: 'RaD',
      affinity: 85,
      relationship: '亲密',
      sync: 68,
      unread: 0,
      lastComm: '2251/04/17-09:55',
      portraits: [
        'https://cdn.imgchest.com/files/6e59d6be47e7.png',
        'https://cdn.imgchest.com/files/f164356a5bd9.png'
      ]
    }
  },
  missions: {
    'm01': {
      id: 'm01',
      name: '破坏移设型炮台',
      type: '普通',
      faction: '贝拉姆',
      objectives: ['摧毁所有目标炮台', '确保自身存活'],
      rewardExp: 50,
      rewardFunds: 170000,
      rewardItems: [],
      status: '已完成',
      deadline: '2251/04/16-18:00'
    },
    'm02': {
      id: 'm02',
      name: '越墙',
      type: '困难',
      faction: '卢比孔解放阵线',
      objectives: ['突破防御网', '击败重型武装直升机'],
      rewardExp: 120,
      rewardFunds: 330000,
      rewardItems: ['OST CHIP x2'],
      status: '进行中',
      deadline: '2251/04/18-12:00'
    },
    'm03': {
      id: 'm03',
      name: '调查BAWS第二工厂',
      type: '普通',
      faction: 'ALLMIND',
      objectives: ['潜入工厂', '收集隐秘机体数据'],
      rewardExp: 80,
      rewardFunds: 250000,
      rewardItems: [],
      status: '未开始',
      deadline: '2251/04/20-00:00'
    }
  },
  hangar: {
    equipment: {
      '自动装填台': '用于快速补充实弹与导弹弹药。',
      '装甲修复舱': '提供纳米级装甲涂层修复与结构件更换。',
      'FCS校准仪': '用于微调火控系统，提升锁定效率。'
    },
    availableParts: {
      'MA-J-200 RANSETSU-RF': { type: '武器', name: 'MA-J-200 RANSETSU-RF', manufacturer: 'Baws', weight: 4100, weaponType: '动能', armorPenetration: 'TIER3', fixedDamage: 220, ammo: 180, optimalRange: { min: 2, max: 4 } },
      'VP-60LCS': { type: '武器', name: 'VP-60LCS', manufacturer: 'Arquebus', weight: 5400, weaponType: '能量', armorPenetration: 'TIER4', fixedDamage: 650, ammo: 45, optimalRange: { min: 2, max: 5 } },
      'NACHTREIHER/40E': { type: '核心', name: 'NACHTREIHER/40E', manufacturer: 'Schneider', weight: 11200, armorTier: 'TIER1', armorMax: 70, structMax: 80, acsMax: 85 }
    }
  }
};
