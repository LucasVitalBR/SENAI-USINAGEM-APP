export interface MaterialVc {
  name: string;
  drilling: number; // Vc in m/min
  milling: number;  // Vc in m/min
  turning: number;  // Vc in m/min
}

export const MATERIALS: MaterialVc[] = [
  { name: "Aço Baixo Carbono (1020)", drilling: 25, milling: 30, turning: 35 },
  { name: "Aço Médio Carbono (1045)", drilling: 20, milling: 25, turning: 30 },
  { name: "Ferro Fundido Cinzento", drilling: 18, milling: 22, turning: 25 },
  { name: "Alumínio e Ligas", drilling: 60, milling: 80, turning: 100 },
  { name: "Latão / Cobre", drilling: 40, milling: 50, turning: 60 },
  { name: "Bronze", drilling: 30, milling: 40, turning: 50 },
  { name: "Inox (304/316)", drilling: 12, milling: 15, turning: 18 },
  { name: "Nylon / Polímeros", drilling: 50, milling: 60, turning: 80 },
  { name: "Ferro Fundido Nodular", drilling: 15, milling: 20, turning: 22 },
];

export type Operation = "drilling" | "milling" | "turning";

export const OPERATIONS = [
  { id: "drilling", name: "Furadeira de Bancada", icon: "Drill" },
  { id: "milling", name: "Fresadora", icon: "Factory" },
  { id: "turning", name: "Torno Mecânico", icon: "RotateCw" },
];
