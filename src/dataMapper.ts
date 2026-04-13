import {
  GameData,
  MechPart,
  MechBuild,
  IntegratedStats,
  CharacterComm,
  Mission,
  HangarData,
} from './types';

/**
 * 立绘注册表：为已知角色 ID 提供立绘 URL（MVU Schema 中不含立绘数据）
 * 新角色会使用空数组，CommTab 会显示占位图。
 */
const PORTRAIT_REGISTRY: Record<string, string[]> = {
  ayre: [
    'https://cdn.imgchest.com/files/f54ecdab32fa.png',
    'https://cdn.imgchest.com/files/5232454620c6.png',
    'https://cdn.imgchest.com/files/958f4f21c921.png',
    'https://cdn.imgchest.com/files/f2063b731541.png',
  ],
  allmind: [
    'https://cdn.imgchest.com/files/a740ccf50b67.png',
    'https://cdn.imgchest.com/files/88c87b34b9cd.png',
    'https://cdn.imgchest.com/files/131d9ee1fc2b.png',
    'https://cdn.imgchest.com/files/422d9bd2398d.png',
  ],
  lina: [
    'https://cdn.imgchest.com/files/485d5431b9cd.png',
    'https://cdn.imgchest.com/files/84cc2a2a3100.png',
    'https://cdn.imgchest.com/files/df8f0c3a66c3.png',
    'https://cdn.imgchest.com/files/c1775ce2a102.png',
  ],
  caoyiyi: [
    'https://cdn.imgchest.com/files/497451fd0739.png',
    'https://cdn.imgchest.com/files/d417fa5043e9.png',
    'https://cdn.imgchest.com/files/d0c9a6d4546b.png',
  ],
  linreng: [
    'https://cdn.imgchest.com/files/fa1f0ddead7e.png',
    'https://cdn.imgchest.com/files/b3a8f97f2250.png',
    'https://cdn.imgchest.com/files/31614797fa7c.png',
  ],
  tailuan: [
    'https://cdn.imgchest.com/files/623b1c76e583.png',
    'https://cdn.imgchest.com/files/f5d057e7b770.png',
    'https://cdn.imgchest.com/files/4c28f7b89b88.png',
  ],
  lili: [
    'https://cdn.imgchest.com/files/6e59d6be47e7.png',
    'https://cdn.imgchest.com/files/f164356a5bd9.png',
  ],
};

// ==================== 部件映射函数 ====================

function mapWeaponPart(part: any): MechPart | null {
  if (!part || part['部件类型'] !== '武器') return null;
  return {
    type: '武器',
    name: part['武器名'] ?? '',
    manufacturer: part['制造商'] ?? '',
    weight: part['重量'] ?? 0,
    weaponType: part['武器类型'] ?? '',
    armorPenetration: part['破甲等级'] ?? '',
    fixedDamage: part['固定伤害'] ?? 0,
    ammo: part['弹药量'] ?? 0,
    optimalRange: {
      min: part['最优距离区间']?.['最小'] ?? 1,
      max: part['最优距离区间']?.['最大'] ?? 4,
    },
  };
}

function mapShieldPart(part: any): MechPart | null {
  if (!part || part['部件类型'] !== '护盾发生器') return null;
  return {
    type: '护盾发生器',
    name: part['护盾名'] ?? '',
    manufacturer: part['制造商'] ?? '',
    weight: part['重量'] ?? 0,
    shieldType: part['护盾类型'] ?? '',
    shieldMax: part['护盾上限'] ?? 0,
  };
}

function mapLbPart(part: any): MechPart | null {
  if (!part) return null;
  if (part['部件类型'] === '护盾发生器') return mapShieldPart(part);
  return mapWeaponPart(part);
}

function mapHeadPart(part: any): MechPart | null {
  if (!part || part['部件类型'] !== '头部') return null;
  return {
    type: '头部',
    name: part['部件名'] ?? '',
    manufacturer: part['制造商'] ?? '',
    weight: part['重量'] ?? 0,
    initiativeBonus: part['先攻加值'] ?? 0,
  };
}

function mapCorePart(part: any): MechPart | null {
  if (!part || part['部件类型'] !== '核心') return null;
  return {
    type: '核心',
    name: part['部件名'] ?? '',
    manufacturer: part['制造商'] ?? '',
    weight: part['重量'] ?? 0,
    armorTier: part['装甲等级'] ?? '',
    armorMax: part['装甲上限'] ?? 0,
    structMax: part['结构上限'] ?? 0,
    acsMax: part['ACS上限'] ?? 0,
  };
}

function mapArmsPart(part: any): MechPart | null {
  if (!part || part['部件类型'] !== '手部') return null;
  return {
    type: '手部',
    name: part['部件名'] ?? '',
    manufacturer: part['制造商'] ?? '',
    weight: part['重量'] ?? 0,
    meleeBonus: part['近战伤害加值'] ?? 0,
    maxWeaponWeight: part['武器重量上限'] ?? 0,
  };
}

function mapLegsPart(part: any): MechPart | null {
  if (!part || part['部件类型'] !== '足部') return null;
  return {
    type: '足部',
    name: part['部件名'] ?? '',
    manufacturer: part['制造商'] ?? '',
    weight: part['重量'] ?? 0,
    moveEfficiency: part['移动效率'] ?? 0,
  };
}

function mapBoosterPart(part: any): MechPart | null {
  if (!part || part['部件类型'] !== '推进器') return null;
  return {
    type: '推进器',
    name: part['部件名'] ?? '',
    manufacturer: part['制造商'] ?? '',
    weight: part['重量'] ?? 0,
    totalThrust: part['总出力'] ?? 0,
  };
}

function mapFcsPart(part: any): MechPart | null {
  if (!part || part['部件类型'] !== 'FCS') return null;
  return {
    type: 'FCS',
    name: part['部件名'] ?? '',
    manufacturer: part['制造商'] ?? '',
    weight: part['重量'] ?? 0,
    combatStyle: part['战斗风格'] ?? '',
    optimalRange: {
      min: part['最优距离区间']?.['最小'] ?? 1,
      max: part['最优距离区间']?.['最大'] ?? 4,
    },
    effect: part['特殊效果'] ?? '',
  };
}

function mapGeneratorPart(part: any): MechPart | null {
  if (!part || part['部件类型'] !== '发动机') return null;
  return {
    type: '发动机',
    name: part['部件名'] ?? '',
    manufacturer: part['制造商'] ?? '',
    weight: part['重量'] ?? 0,
    totalEnergy: part['总能源'] ?? 0,
  };
}

function mapExpansionPart(part: any): MechPart | null {
  if (!part || part['部件类型'] !== '扩充机能') return null;
  return {
    type: '扩充机能',
    name: part['机能名'] ?? '',
    manufacturer: '',
    weight: part['重量'] ?? 0,
    effect: part['效果描述'] ?? '',
  };
}

function mapGenericPart(part: any): MechPart | null {
  if (!part) return null;
  switch (part['部件类型']) {
    case '武器': return mapWeaponPart(part);
    case '护盾发生器': return mapShieldPart(part);
    case '头部': return mapHeadPart(part);
    case '核心': return mapCorePart(part);
    case '手部': return mapArmsPart(part);
    case '足部': return mapLegsPart(part);
    case '推进器': return mapBoosterPart(part);
    case 'FCS': return mapFcsPart(part);
    case '发动机': return mapGeneratorPart(part);
    case '扩充机能': return mapExpansionPart(part);
    default: return null;
  }
}

// ==================== 主映射函数 ====================

/**
 * 将 MVU Schema 的 stat_data（中文键）映射为前端 GameData（英文键）。
 * @param stat_data - 从 Mvu.getMvuData 取出的 stat_data 对象
 */
export function mapMvuDataToGameData(stat_data: any): GameData {
  // ---- 全局信息 ----
  const 全局信息 = stat_data['全局信息'] ?? {};
  const global = {
    location: (全局信息['物理位置'] as string | undefined) ?? '',
    time: (全局信息['时间'] as string | undefined) ?? '',
    chapter: (全局信息['当前章节'] as string | undefined) ?? '',
  };

  // ---- 主角 ----
  const 主角 = stat_data['主角'] ?? {};
  const 驾驶属性 = 主角['驾驶属性'] ?? {};
  const 机甲状态 = 主角['机甲状态'] ?? {};
  const 驾驶员档案 = 主角['驾驶员档案'] ?? {};

  const pilot = {
    stats: {
      apm: (驾驶属性['APM'] as number | undefined) ?? 0,
      krlLevel: (驾驶属性['KRL等级'] as number | undefined) ?? 1,
      syncRate: (驾驶属性['神经同步率'] as number | undefined) ?? 0,
      pilotBonus: (驾驶属性['驾驶加值'] as number | undefined) ?? 0,
    },
    mechState: {
      struct: (机甲状态['结构值'] as number | undefined) ?? 0,
      structMax: (机甲状态['结构上限'] as number | undefined) ?? 100,
      armor: (机甲状态['装甲值'] as number | undefined) ?? 0,
      armorMax: (机甲状态['装甲上限'] as number | undefined) ?? 100,
      acs: (机甲状态['ACS值'] as number | undefined) ?? 0,
      acsMax: (机甲状态['ACS上限'] as number | undefined) ?? 100,
      shield: (机甲状态['护盾值'] as number | undefined) ?? 0,
      shieldMax: (机甲状态['护盾上限'] as number | undefined) ?? 0,
    },
    profile: {
      funds: (驾驶员档案['资金_CAGE'] as number | undefined) ?? 0,
      exp: (驾驶员档案['当前经验'] as number | undefined) ?? 0,
      expRequired: (驾驶员档案['升级所需经验'] as number | undefined) ?? 100,
    },
  };

  // ---- 机甲泊位 ----
  const 机甲泊位 = stat_data['机甲泊位'] ?? {};
  const current = (机甲泊位['当前驾驶机甲'] as string | undefined) ?? '';
  const 泊位 = (机甲泊位['泊位'] as Record<string, any> | undefined) ?? {};
  const 当前机甲数据 = 泊位[current] ?? {};
  const 部件构建 = (当前机甲数据['部件构建'] as Record<string, any> | undefined) ?? {};
  const 机体整合数值 = (当前机甲数据['机体整合数值'] as Record<string, any> | undefined) ?? {};

  const build: MechBuild = {
    RA: mapWeaponPart(部件构建['RA']),
    LA: mapWeaponPart(部件构建['LA']),
    RB: mapWeaponPart(部件构建['RB']),
    LB: mapLbPart(部件构建['LB']),
    HEAD: mapHeadPart(部件构建['头部']),
    CORE: mapCorePart(部件构建['核心']),
    ARMS: mapArmsPart(部件构建['手部']),
    LEGS: mapLegsPart(部件构建['足部']),
    BOOSTER: mapBoosterPart(部件构建['推进器']),
    FCS: mapFcsPart(部件构建['FCS']),
    GENERATOR: mapGeneratorPart(部件构建['发动机']),
    EXPANSION: mapExpansionPart(部件构建['扩充机能']),
  };

  const stats: IntegratedStats = {
    type: (机体整合数值['机体类型'] as string | undefined) ?? '人形',
    armorTier: (机体整合数值['装甲等级'] as string | undefined) ?? 'TIER1',
    armorMax: (机体整合数值['装甲上限'] as number | undefined) ?? 0,
    structMax: (机体整合数值['结构上限'] as number | undefined) ?? 0,
    acsMax: (机体整合数值['ACS上限'] as number | undefined) ?? 0,
    shieldMax: (机体整合数值['护盾上限'] as number | undefined) ?? 0,
    totalWeight: (机体整合数值['机体总重'] as number | undefined) ?? 0,
    thrustToWeight: (机体整合数值['推重比'] as number | undefined) ?? 0,
    thrustBonus: (机体整合数值['推重加值'] as number | undefined) ?? 0,
    initiativeBonus: (机体整合数值['先攻加值'] as number | undefined) ?? 0,
  };

  const mech = { current, build, stats };

  // ---- 红颜通讯 ----
  const 红颜通讯 = (stat_data['红颜通讯'] as Record<string, any> | undefined) ?? {};
  const comms: Record<string, CharacterComm> = {};
  for (const [id, char] of Object.entries(红颜通讯)) {
    const c = char as any;
    comms[id] = {
      id,
      name: (c['角色名称'] as string | undefined) ?? '',
      faction: (c['阵营'] as string | undefined) ?? '',
      affinity: (c['好感度'] as number | undefined) ?? 0,
      relationship: (c['关系阶段'] as string | undefined) ?? '',
      sync: (c['默契度'] as number | undefined) ?? 0,
      unread: (c['未读消息数'] as number | undefined) ?? 0,
      lastComm: (c['最后通讯时间'] as string | undefined) ?? '',
      portraits: PORTRAIT_REGISTRY[id] ?? [],
    };
  }

  // ---- 任务面板 ----
  const 任务面板 = (stat_data['任务面板'] as Record<string, any> | undefined) ?? {};
  const missions: Record<string, Mission> = {};
  for (const [id, mission] of Object.entries(任务面板)) {
    const m = mission as any;
    missions[id] = {
      id,
      name: (m['任务名称'] as string | undefined) ?? '',
      type: (m['任务类型'] as string | undefined) ?? '',
      faction: (m['阵营'] as string | undefined) ?? '',
      objectives: (m['目标列表'] as string[] | undefined) ?? [],
      rewardExp: (m['奖励经验'] as number | undefined) ?? 0,
      rewardFunds: (m['奖励资金'] as number | undefined) ?? 0,
      rewardItems: (m['奖励物品'] as string[] | undefined) ?? [],
      status: (m['进行状态'] as string | undefined) ?? '',
      deadline: (m['截止时间'] as string | undefined) ?? '',
    };
  }

  // ---- 机库 ----
  const 机库 = stat_data['机库'] ?? {};
  const equipment = (机库['机库整备设备'] as Record<string, string> | undefined) ?? {};
  const 可用机甲部件 = (机库['可用机甲部件'] as Record<string, any> | undefined) ?? {};
  const availableParts: Record<string, MechPart> = {};
  for (const [name, part] of Object.entries(可用机甲部件)) {
    const mapped = mapGenericPart(part);
    if (mapped) availableParts[name] = mapped;
  }
  const hangar: HangarData = { equipment, availableParts };

  return { global, pilot, mech, comms, missions, hangar };
}
