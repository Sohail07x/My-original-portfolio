export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  description: string;
  role: string;
  client: string;
  colSpan: string;
  aspect: string;
  tags: string[];
  metrics?: string;
  liveUrl?: string;
  githubUrl?: string;
  statusNote?: string;
  architecture?: string[];
  sampleInputsOutputs?: {
    input: string;
    output: string;
    detectedType: string;
    action: string;
  }[];
  testCases?: string[];
  limitations?: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: {
    name: string;
    level: 'Proficient' | 'Familiar' | 'Developing / Exploring';
    note?: string;
  }[];
}

export interface CareerGoal {
  id: string;
  title: string;
  description: string;
  badge: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  image: string;
  readTime: string;
  date: string;
  category: string;
  excerpt: string;
}

export interface ExplorationItem {
  id: string;
  title: string;
  category: string;
  image: string;
  rotation: string;
  aspect: string;
  tools: string;
}
