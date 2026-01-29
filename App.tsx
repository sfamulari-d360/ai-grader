import React, { useState, useEffect } from 'react';
import { ReportData } from './types';
import { DEFAULT_REPORT } from './constants';
import { Gauge } from './components/Gauge';
import { SentimentBar } from './components/SentimentBar';
import { JsonEditor } from './components/JsonEditor';
import { Settings, Download, Share2, Globe, Calendar, Briefcase, MapPin, Search, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [data, setData] = useState<ReportData>(DEFAULT_REPORT);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load data from URL params on startup
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encodedData = params.get('data');
    const externalUrl = params.get('url');

    if (encodedData) {
      try {
        // Decode Base64 string (handling special characters)
        const jsonString = decodeURIComponent(escape(window.atob(encodedData)));
        const parsedData = JSON.parse(jsonString);
        setData(parsedData);
      } catch (e) {
        console.error("Failed to parse data from URL", e);
        setError("Il link sembra corrotto o incompleto. Caricamento dati di default.");
      }
    } else if (externalUrl) {
        // Option to fetch from an external JSON file (e.g. Gist)
        fetch(externalUrl)
            .then(res => res.json())
            .then(json => setData(json))
            .catch(err => {
                console.error(err);
                setError("Impossibile caricare il JSON dall'URL esterno fornito.");
            });
    }

    setIsLoading(false);
  }, []);

  const formatDate = (isoString: string) => {
    try {
      return new Date(isoString).toLocaleDateString('it-IT', { 
        day: 'numeric', month: 'long', year: 'numeric' 
      });
    } catch (e) {
      return isoString;
    }
  };

  // Shortcuts to access deeply nested data safely
  const meta = data.metadata;
  const strat = data.report_strategico;
  const kpis = strat.key_positioning_indicators;
  const sentiment = strat.perception_analysis;

  if (isLoading) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-[#f4f6f8]">
              <div className="text-center">
                  <Loader2 className="w-10 h-10 text-[#167CB5] animate-spin mx-auto mb-4" />
                  <p className="text-slate-500">Caricamento report...</p>
              </div>
          </div>
      )
  }

  return (
    <div className="min-h-screen bg-[#f4f6f8] pb-12">
      
      {/* Logos Header */}
      <div className="bg-white border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between items-center gap-6">
            <div className="flex items-center gap-4">
                 <img src="https://connect.digital360.it/hs-fs/hubfs/image002.png?width=165&height=46&name=image002.png" alt="AI Grader" className="h-8 md:h-10 object-contain" />
            </div>
            <div className="flex items-center gap-6 opacity-80 grayscale hover:grayscale-0 transition-all">
                 <img src="https://connect.digital360.it/hs-fs/hubfs/OpenAI_Logo-1.png?width=110&height=29&name=OpenAI_Logo-1.png" alt="OpenAI" className="h-5 object-contain" />
                 <img src="https://connect.digital360.it/hubfs/gemini-logo.svg" alt="Gemini" className="h-6 object-contain" />
                 <img src="https://connect.digital360.it/hs-fs/hubfs/ai-overview-logo.png?width=138&height=29&name=ai-overview-logo.png" alt="AI Overview" className="h-5 object-contain" />
            </div>
        </div>
      </div>

      {/* Error Toast */}
      {error && (
          <div className="max-w-7xl mx-auto px-4 mt-4">
              <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-md text-sm">
                  {error}
              </div>
          </div>
      )}

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Controls Bar (Visible only to admin/user, not part of print) */}
        <div className="flex justify-between items-center print:hidden">
            <div className="text-xs text-slate-400">
               ID Report: {meta?.report_id || 'N/A'} | LLM: {meta?.tipo_LLM || 'N/A'}
            </div>
            <button 
                onClick={() => setIsEditorOpen(true)}
                className="flex items-center px-4 py-2 bg-slate-800 text-white rounded-md text-sm font-medium hover:bg-slate-700 transition-colors shadow-sm"
            >
                <Settings className="w-4 h-4 mr-2" />
                Configura Report
            </button>
        </div>

        {/* Report Header Card */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 relative overflow-hidden">
             <div className="relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-[#081E28]">
                            Report Analisi Brand: <span className="text-[#167CB5]">{meta?.brand_analyzed || 'Brand'}</span>
                        </h1>
                        <p className="text-lg text-slate-500 font-medium mt-1">Analisi della Reputazione Online</p>
                    </div>
                    <div className="flex gap-2 print:hidden">
                         <button onClick={() => window.print()} className="p-2 text-slate-400 hover:text-slate-600 border border-slate-200 rounded hover:bg-slate-50" title="Stampa / Salva PDF">
                            <Download className="w-5 h-5" />
                         </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm text-slate-600 border-t border-slate-100 pt-6">
                    <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-[#167CB5]" />
                        <div>
                            <span className="block text-xs font-bold uppercase text-slate-400">Paese</span>
                            <span className="font-semibold text-slate-800">{meta?.country_iso2}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Briefcase className="w-5 h-5 text-[#B72267]" />
                        <div>
                            <span className="block text-xs font-bold uppercase text-slate-400">Settore</span>
                            <span className="font-semibold text-slate-800">{meta?.sector}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-[#515B98]" />
                        <div>
                            <span className="block text-xs font-bold uppercase text-slate-400">Offerta</span>
                            <span className="font-semibold text-slate-800">{meta?.offerings}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-slate-400" />
                        <div>
                            <span className="block text-xs font-bold uppercase text-slate-400">Data Analisi</span>
                            <span className="font-semibold text-slate-800">{formatDate(meta?.generation_timestamp)}</span>
                        </div>
                    </div>
                </div>
             </div>
        </div>

        {/* Executive Summary */}
        <section>
            <h2 className="text-xl font-bold text-[#081E28] mb-4 border-l-4 border-[#167CB5] pl-3">Executive Summary</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 border-t-4 border-t-[#167CB5]">
                    <h3 className="text-lg font-bold text-[#081E28] mb-3">Diagnosi Strategica</h3>
                    <p className="text-slate-600 leading-relaxed">{strat?.executive_summary?.diagnosi_strategica}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 border-t-4 border-t-[#B72267]">
                    <h3 className="text-lg font-bold text-[#081E28] mb-3">Vettore Principale</h3>
                    <p className="text-slate-600 leading-relaxed">{strat?.executive_summary?.vettore_principale}</p>
                </div>
            </div>
        </section>

        {/* KPIs Section */}
        <section>
             <h2 className="text-xl font-bold text-[#081E28] mb-4 border-l-4 border-[#B72267] pl-3">Key Positioning Indicators</h2>
             <div className="grid lg:grid-cols-3 gap-6">
                
                {/* Left: Gauge */}
                <div className="lg:col-span-1">
                    <Gauge score={kpis?.global_index?.value || 0} context={kpis?.global_index?.context || ''} />
                </div>

                {/* Right: Stacked Bars */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Perception Index */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 flex-1 flex flex-col justify-center">
                        <div className="flex justify-between items-end mb-2">
                            <strong className="text-lg text-[#081E28]">Perception Index</strong>
                            <span className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-sm font-bold border border-slate-200">
                                {kpis?.perception_index?.value}/100
                            </span>
                        </div>
                        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-3">
                            <div className="h-full bg-gradient-to-r from-[#B72267] to-[#167CB5]" style={{ width: `${kpis?.perception_index?.value || 0}%` }}></div>
                        </div>
                        <p className="text-sm text-slate-500">{kpis?.perception_index?.context}</p>
                    </div>

                    {/* Share of Voice */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 flex-1 flex flex-col justify-center">
                        <div className="flex justify-between items-end mb-2">
                            <strong className="text-lg text-[#081E28]">Share of Voice</strong>
                            <span className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-sm font-bold border border-slate-200">
                                {kpis?.share_of_voice?.value}/100
                            </span>
                        </div>
                        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-3">
                            <div className="h-full bg-gradient-to-r from-[#515B98] to-[#167CB5]" style={{ width: `${kpis?.share_of_voice?.value || 0}%` }}></div>
                        </div>
                        <p className="text-sm text-slate-500">{kpis?.share_of_voice?.context}</p>
                    </div>
                </div>
             </div>
        </section>

        {/* Competitive Analysis (New Section based on JSON) */}
        {strat?.competitive_analysis && (
            <section>
                 <h2 className="text-xl font-bold text-[#081E28] mb-4 border-l-4 border-slate-800 pl-3">Analisi Competitiva</h2>
                 <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                     <div className="flex flex-col md:flex-row gap-8 items-start">
                         <div className="flex-1">
                             <h3 className="font-bold text-[#081E28] mb-2">Posizionamento: {strat.competitive_analysis.positioning_map.quadrant}</h3>
                             <p className="text-sm text-slate-600 leading-relaxed">{strat.competitive_analysis.positioning_map.explanation}</p>
                         </div>
                         
                         {/* Simple visual representation of mentions */}
                         <div className="flex-1 w-full">
                            <h4 className="text-xs font-bold uppercase text-slate-400 mb-3">Share of Mentions (Top 5)</h4>
                            <div className="space-y-2">
                                {strat.competitive_analysis.quantitative_overview?.slice(0, 5).map((brand, idx) => (
                                    <div key={idx}>
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="font-medium text-slate-700">{brand.brand_name}</span>
                                            <span className="text-slate-500">{brand.mention_percentage}%</span>
                                        </div>
                                        <div className="w-full bg-slate-100 h-1.5 rounded-full">
                                            <div 
                                                className="h-full bg-slate-400 rounded-full" 
                                                style={{ width: `${Math.min(brand.mention_percentage * 2, 100)}%` }} // Scaling for visibility
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                         </div>
                     </div>
                 </div>
            </section>
        )}

        {/* Perception Analysis */}
        <section>
            <h2 className="text-xl font-bold text-[#081E28] mb-4 border-l-4 border-[#515B98] pl-3">Analisi della Percezione</h2>
            <div className="space-y-6">
                {sentiment?.sentiment_distribution && (
                    <SentimentBar data={sentiment.sentiment_distribution} />
                )}

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                        <h3 className="text-[#167CB5] font-bold mb-4 uppercase text-sm tracking-wide">Punti di Forza (Narrative Assets)</h3>
                        <ul className="space-y-4">
                            {sentiment?.narrative_assets?.map((item, idx) => (
                                <li key={idx} className="flex items-start text-slate-700 text-sm">
                                    <span className="w-1.5 h-1.5 bg-[#167CB5] rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                                    <div>
                                        <strong className="block text-[#081E28] mb-1">{item.theme}</strong>
                                        <span className="text-slate-600">{item.supporting_evidence}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                        <h3 className="text-[#B72267] font-bold mb-4 uppercase text-sm tracking-wide">Punti di Debolezza (Narrative Frictions)</h3>
                        <ul className="space-y-4">
                            {sentiment?.narrative_frictions?.map((item, idx) => (
                                <li key={idx} className="flex items-start text-slate-700 text-sm">
                                    <span className="w-1.5 h-1.5 bg-[#B72267] rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                                    <div>
                                        <strong className="block text-[#081E28] mb-1">{item.theme}</strong>
                                        <span className="text-slate-600">{item.supporting_evidence}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        {/* Strategic Implications */}
        <section>
            <h2 className="text-xl font-bold text-[#081E28] mb-4 border-l-4 border-[#081E28] pl-3">Implicazioni Strategiche</h2>
            <div className="grid md:grid-cols-3 gap-6">
                {strat?.strategic_implications?.map((imp, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow flex flex-col">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[#081E28] font-bold mb-4">
                            {idx + 1}
                        </div>
                        <h3 className="font-bold text-[#081E28] mb-3 h-12 overflow-hidden">{imp.title}</h3>
                        <div className="space-y-4 flex-1">
                             <div>
                                 <h4 className="text-xs font-bold uppercase text-slate-400 mb-1">Insight</h4>
                                 <p className="text-sm text-slate-600 leading-relaxed">{imp.insight_and_implication}</p>
                             </div>
                             <div>
                                 <h4 className="text-xs font-bold uppercase text-[#B72267] mb-1">Imperativo Strategico</h4>
                                 <p className="text-sm text-[#081E28] font-medium leading-relaxed">{imp.strategic_imperative}</p>
                             </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-[#081E28] text-white py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8">
            <div>
                 <img src="https://connect.digital360.it/hs-fs/hubfs/digital360-graderai/D360_Connect%203%201.png?width=170&height=48&name=D360_Connect%203%201.png" alt="Digital360" className="h-10 mb-6 opacity-90" />
                 <p className="text-sm text-slate-400 leading-relaxed">
                    DIGITAL360 S.p.A.<br/>
                    Viale L. Bodio, 37, 20158 Milano (MI)<br/>
                    Via Darsena, 67, 4122, Ferrara (FE)
                 </p>
            </div>
            <div className="md:text-right text-sm text-slate-400">
                <p className="mb-4">
                    P.I. e C.F. 08053820968 | REA MI - 2000431<br/>
                    Capitale Sociale Versato: € 2.055.034,60<br/>
                    PEC digital360@pec.it
                </p>
                <div className="flex md:justify-end gap-4">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                </div>
                <p className="mt-4 text-xs text-slate-600">© 2025 DIGITAL360. All Rights Reserved.</p>
            </div>
        </div>
      </footer>

      {isEditorOpen && (
        <JsonEditor 
            currentData={data} 
            onSave={(newData) => {
                setData(newData);
            }} 
            onClose={() => setIsEditorOpen(false)} 
        />
      )}
    </div>
  );
};

export default App;