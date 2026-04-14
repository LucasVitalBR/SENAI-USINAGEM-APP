import { useState, useMemo } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { 
  Drill, 
  Settings2, 
  Calculator, 
  Table as TableIcon,
  Info,
  ChevronRight,
  QrCode,
  X,
  Share2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

import { MATERIALS, OPERATIONS, Operation } from "./data/machining";

export default function App() {
  const [operation, setOperation] = useState<Operation>("drilling");
  const [selectedMaterialName, setSelectedMaterialName] = useState<string>(MATERIALS[0].name);
  const [diameter, setDiameter] = useState<string>("");
  const [customVc, setCustomVc] = useState<string>("");
  const [isCustomMaterial, setIsCustomMaterial] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);

  const appUrl = window.location.origin + window.location.pathname;

  const handleWhatsAppShare = () => {
    const message = `Confira esta Calculadora de RPM da Metalmecânica Naviraí: ${appUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const currentMaterial = useMemo(() => {
    return MATERIALS.find(m => m.name === selectedMaterialName) || MATERIALS[0];
  }, [selectedMaterialName]);

  const vc = useMemo(() => {
    if (isCustomMaterial) return parseFloat(customVc) || 0;
    return currentMaterial[operation];
  }, [isCustomMaterial, customVc, currentMaterial, operation]);

  const rpm = useMemo(() => {
    const d = parseFloat(diameter);
    if (!d || !vc) return 0;
    // Formula: n = (Vc * 1000) / (PI * D)
    return Math.round((vc * 1000) / (Math.PI * d));
  }, [vc, diameter]);

  const getOperationIcon = (id: string) => {
    switch (id) {
      case "drilling": return <Drill className="w-6 h-6" />;
      case "milling": return (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Machine Head */}
          <rect x="4" y="2" width="16" height="6" rx="1" />
          <path d="M8 4h2M12 4h4" opacity="0.5" />
          
          {/* Spindle & Tool */}
          <path d="M10 8l1 2h2l1-2" />
          <path d="M12 10v6" />
          <path d="M11 12l2 1M11 14l2 1" opacity="0.8" />
          
          {/* Workpiece */}
          <path d="M5 18h3v-2h6v2h5v3H5v-3z" />
          
          {/* Table */}
          <path d="M2 21h20" strokeWidth="1" />
          
          {/* Chips */}
          <path d="M8 12l-1-1M16 12l1-1M7 14l-1.5-.5M17 14l1.5-.5" opacity="0.6" />
        </svg>
      );
      case "turning": return (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Lathe Bed */}
          <path d="M2 19h20v2H2z" />
          
          {/* Headstock (Left) */}
          <path d="M2 6h4v13H2z" />
          <path d="M6 8h2v9H6z" />
          
          {/* Chuck (Placa) */}
          <path d="M8 10h1.5v5H8z" />
          <path d="M9.5 11h1v3h-1z" />
          
          {/* Workpiece */}
          <path d="M10.5 11.5h6v2h-6z" opacity="0.6" />
          
          {/* Tool Post / Carriage (Right) */}
          <path d="M16 14h4v5h-4z" />
          <path d="M17 14V11l-2 1" /> {/* Cutting Tool */}
          
          {/* Tailstock (Optional/Simplified) */}
          <path d="M20 12h2v7h-2z" opacity="0.4" />
        </svg>
      );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#212529] font-sans pb-12">
      {/* Header */}
      <header className="bg-[#005596] text-white p-6 shadow-md">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <img 
                src="https://lh3.googleusercontent.com/d/1Z21CLyS9RsaHyY1WFV4DEeDiORzkKUwv" 
                alt="SENAI" 
                className="h-12 w-auto brightness-0 invert" 
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-[10px] font-bold opacity-60 uppercase tracking-[0.2em] ml-1 mt-1">Metalmecânica • Naviraí</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setShowQrCode(true)}
              className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors"
              title="Compartilhar via QR Code"
            >
              <QrCode className="w-5 h-5" />
            </button>
            <button 
              onClick={handleWhatsAppShare}
              className="bg-[#25D366] p-2 rounded-lg hover:bg-[#128C7E] transition-colors shadow-sm"
              title="Compartilhar no WhatsApp"
            >
              <svg 
                viewBox="0 0 24 24" 
                className="w-5 h-5 fill-white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* QR Code Modal */}
        <AnimatePresence>
          {showQrCode && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center relative"
              >
                <button 
                  onClick={() => setShowQrCode(false)}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
                
                <div className="mb-6">
                  <div className="bg-[#005596] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <QrCode className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Acessar no Celular</h3>
                  <p className="text-sm text-gray-500 mt-2">Escaneie o código abaixo para abrir a calculadora no seu smartphone.</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl inline-block border-2 border-dashed border-gray-200">
                  <QRCodeCanvas 
                    value={appUrl} 
                    size={200}
                    level="H"
                    includeMargin={false}
                    imageSettings={{
                      src: "https://lh3.googleusercontent.com/d/1Z21CLyS9RsaHyY1WFV4DEeDiORzkKUwv",
                      x: undefined,
                      y: undefined,
                      height: 40,
                      width: 40,
                      excavate: true,
                    }}
                  />
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-[10px] text-gray-400 break-all font-mono">
                    {appUrl}
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-6">
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <Calculator className="w-4 h-4" /> Calculadora
            </TabsTrigger>
            <TabsTrigger value="table" className="flex items-center gap-2">
              <TableIcon className="w-4 h-4" /> Referência
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            {/* Operation Selection */}
            <section className="space-y-3">
              <Label className="text-xs font-semibold uppercase text-muted-foreground ml-1">
                Selecione a Operação
              </Label>
              <div className="grid grid-cols-3 gap-3">
                {OPERATIONS.map((op) => (
                  <button
                    key={op.id}
                    onClick={() => setOperation(op.id as Operation)}
                    className={`
                      flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all
                      ${operation === op.id 
                        ? "border-[#005596] bg-[#005596]/5 text-[#005596] shadow-sm" 
                        : "border-transparent bg-white text-muted-foreground hover:bg-gray-50"}
                    `}
                  >
                    {getOperationIcon(op.id)}
                    <span className="text-[10px] font-bold mt-2 uppercase text-center leading-tight">
                      {op.name.split(" ")[0]}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* Input Form */}
            <Card className="border-none shadow-sm overflow-hidden">
              <CardHeader className="bg-white border-b border-gray-100 pb-4">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#005596]" />
                  Parâmetros de Corte
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6 bg-white">
                {/* Material Selection */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="material" className="text-sm font-bold uppercase">Material</Label>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setIsCustomMaterial(!isCustomMaterial)}
                        className={`
                          px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all border-2
                          ${isCustomMaterial 
                            ? "bg-[#005596] border-[#005596] text-white shadow-sm" 
                            : "bg-white border-gray-200 text-[#005596] hover:bg-gray-50"}
                        `}
                      >
                        {isCustomMaterial ? "Usar Lista" : "Customizado"}
                      </button>
                      <button 
                        onClick={() => {
                          setDiameter("");
                          setCustomVc("");
                          setIsCustomMaterial(false);
                        }}
                        className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all border-2 border-transparent bg-red-50 text-red-600 hover:bg-red-100"
                      >
                        Limpar
                      </button>
                    </div>
                  </div>
                  
                  {!isCustomMaterial ? (
                    <Select value={selectedMaterialName} onValueChange={setSelectedMaterialName}>
                      <SelectTrigger id="material" className="h-12 w-full bg-gray-50 border-gray-200 text-lg">
                        <SelectValue placeholder="Selecione o material" />
                      </SelectTrigger>
                      <SelectContent>
                        {MATERIALS.map((m) => (
                          <SelectItem key={m.name} value={m.name}>
                            {m.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="custom-vc" className="text-[10px] text-muted-foreground">Velocidade de Corte (Vc) m/min</Label>
                      <Input
                        id="custom-vc"
                        type="number"
                        placeholder="Ex: 45"
                        value={customVc}
                        onChange={(e) => setCustomVc(e.target.value)}
                        className="h-12 bg-gray-50 border-gray-200 font-mono text-lg"
                      />
                    </div>
                  )}
                </div>

                {/* Diameter Input */}
                <div className="space-y-2">
                  <Label htmlFor="diameter" className="text-sm font-bold uppercase">
                    Diâmetro da Ferramenta / Peça (mm)
                  </Label>
                  <Input
                    id="diameter"
                    type="number"
                    placeholder="Ex: 12.5"
                    value={diameter}
                    onChange={(e) => setDiameter(e.target.value)}
                    className="h-12 bg-gray-50 border-gray-200 font-mono text-lg"
                  />
                </div>

                {/* Info Display */}
                <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100 flex items-start gap-3">
                  <div className="bg-blue-100 p-1.5 rounded-md">
                    <Info className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <div className="text-[11px] text-blue-800 leading-relaxed">
                    <span className="font-bold block uppercase mb-0.5">Referência Técnica</span>
                    Para {currentMaterial.name.toLowerCase()}, a velocidade de corte recomendada para {operation === "drilling" ? "furação" : operation === "milling" ? "fresagem" : "torneamento"} é de <span className="font-bold">{vc} m/min</span>.
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Result Display */}
            <AnimatePresence mode="wait">
              {rpm > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative"
                >
                  <div className="absolute -top-3 left-6 bg-[#005596] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider z-10 shadow-sm">
                    Resultado Calculado
                  </div>
                  <Card className="bg-[#1a1a1a] text-white border-none shadow-xl overflow-hidden">
                    <CardContent className="p-8 flex flex-col items-center justify-center space-y-2">
                      <div className="text-6xl font-mono font-bold tracking-tighter text-blue-400">
                        {rpm}
                      </div>
                      <div className="text-sm font-bold uppercase tracking-[0.2em] opacity-60">
                        Rotações por Minuto (RPM)
                      </div>
                      <div className="w-full h-px bg-white/10 my-4" />
                      <div className="flex justify-between w-full text-[10px] font-mono opacity-40">
                        <span>n = (Vc × 1000) / (π × D)</span>
                        <span>v{vc} d{diameter}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>

          <TabsContent value="table">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Tabela de Velocidades (Vc)</CardTitle>
                <CardDescription>Valores recomendados em m/min para ferramentas de HSS.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-gray-50">
                      <TableRow>
                        <TableHead className="w-[150px] text-[10px] font-bold uppercase">Material</TableHead>
                        <TableHead className="text-center text-[10px] font-bold uppercase">Furo</TableHead>
                        <TableHead className="text-center text-[10px] font-bold uppercase">Fresa</TableHead>
                        <TableHead className="text-center text-[10px] font-bold uppercase">Torno</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {MATERIALS.map((m, idx) => (
                        <TableRow key={idx} className="hover:bg-gray-50/50">
                          <TableCell className="font-medium text-xs">{m.name}</TableCell>
                          <TableCell className="text-center font-mono text-xs">{m.drilling}</TableCell>
                          <TableCell className="text-center font-mono text-xs">{m.milling}</TableCell>
                          <TableCell className="text-center font-mono text-xs">{m.turning}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-3">
              <Info className="w-5 h-5 text-amber-600 shrink-0" />
              <div className="text-xs text-amber-900 space-y-2">
                <p className="font-bold uppercase">Dica de Segurança</p>
                <p>Sempre utilize óculos de proteção e não use luvas ao operar máquinas rotativas.</p>
                <p>Os valores de Vc acima são para ferramentas de Aço Rápido (HSS). Para Metal Duro, multiplique os valores por 3 ou 4 conforme catálogo do fabricante.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer / Branding */}
      <footer className="max-w-md mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-3 opacity-40 grayscale mb-3">
          <img 
            src="https://lh3.googleusercontent.com/d/1Z21CLyS9RsaHyY1WFV4DEeDiORzkKUwv" 
            alt="SENAI" 
            className="h-10 w-auto" 
            referrerPolicy="no-referrer"
          />
        </div>
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
          Metalmecânica • Naviraí
        </p>
      </footer>
    </div>
  );
}
