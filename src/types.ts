export type TabType = 'MAIN' | 'PILOT' | 'MECH' | 'COMM' | 'HANGAR' | 'MISSION';

export interface GlobalInfo {
  location: string;
  time: string;
  chapter: string;
}

export interface PilotStats {
  apm: number;
  krlLevel: number;
  syncRate: number;
  pilotBonus: number;
}

export interface MechState {
  struct: number;
  structMax: number;
  armor: number;
  armorMax: number;
  acs: number;
  acsMax: number;
  shield: number;
  shieldMax: number;
}

export interface PilotProfile {
  funds: number;
  exp: number;
  expRequired: number;
}

export interface CharacterComm {
  id: string;
  name: string;
  faction: string;
  affinity: number;
  relationship: string;
  sync: number;
  unread: number;
  lastComm: string;
  portraits: string[];
}

export interface MechPart {
  type: string;
  name: string;
  manufacturer: string;
  weight: number;
  [key: string]: any;
}

export interface MechBuild {
  RA: MechPart | null;
  LA: MechPart | null;
  RB: MechPart | null;
  LB: MechPart | null;
  HEAD: MechPart | null;
  CORE: MechPart | null;
  ARMS: MechPart | null;
  LEGS: MechPart | null;
  BOOSTER: MechPart | null;
  FCS: MechPart | null;
  GENERATOR: MechPart | null;
  EXPANSION: MechPart | null;
}

export interface IntegratedStats {
  type: string;
  armorTier: string;
  armorMax: number;
  structMax: number;
  acsMax: number;
  shieldMax: number;
  totalWeight: number;
  thrustToWeight: number;
  thrustBonus: number;
  initiativeBonus: number;
}

export interface Mission {
  id: string;
  name: string;
  type: string;
  faction: string;
  objectives: string[];
  rewardExp: number;
  rewardFunds: number;
  rewardItems: string[];
  status: string;
  deadline: string;
}

export interface HangarData {
  equipment: Record<string, string>;
  availableParts: Record<string, MechPart>;
}

export interface GameData {
  global: GlobalInfo;
  pilot: {
    stats: PilotStats;
    mechState: MechState;
    profile: PilotProfile;
  };
  mech: {
    current: string;
    build: MechBuild;
    stats: IntegratedStats;
  };
  comms: Record<string, CharacterComm>;
  missions: Record<string, Mission>;
  hangar: HangarData;
}
