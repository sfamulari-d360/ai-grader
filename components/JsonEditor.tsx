import React, { useState, useEffect } from 'react';
import { ReportData } from '../types';
import { X, Save, RotateCcw, Link as LinkIcon, Check, Copy } from 'lucide-react';
import { DEFAULT_REPORT } from '../constants';

interface JsonEditorProps {
  currentData: ReportData;
  onSave: (data: ReportData) => void;
  onClose: () => void;
}

export const JsonEditor: React.FC<JsonEditorProps> = ({ currentData, onSave, onClose }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setText(JSON.stringify(currentData, null, 2));
    setShareLink(null);
  }, [currentData]);

  const handleSave = () => {
    try {
      const parsed = JSON.parse(text);
      if (!parsed.metadata || !parsed.report_strategico) {
        throw new Error("Il JSON non sembra corretto. Mancano campi obbligatori come 'metadata' o 'report_strategico'.");
      }
      onSave(parsed);
      onClose();
    } catch (e: any) {
      setError(e.message || "JSON non valido");
    }
  };

  const handleReset = () => {
      setText(JSON.stringify(DEFAULT_REPORT, null, 2));
      setError(null);
      setShareLink(null);
  }

  const generateShareLink = () => {
      try {
        const parsed = JSON.parse(text);
        // Encode to base64 safely (handling unicode)
        const jsonString = JSON.stringify(parsed);
        const encoded = window.btoa(unescape(encodeURIComponent(jsonString)));
        
        // Construct URL
        const url = new URL(window.location.href);
        url.searchParams.set('data', encoded);
        
        setShareLink(url.toString());
        
        if (jsonString.length > 4000) {
            setError("Attenzione: Il JSON è molto grande. Alcuni browser potrebbero tagliare l'URL.");
        } else {
            setError(null);
        }
      } catch (e) {
          setError("Impossibile generare il link: JSON non valido.");
      }
  };

  const copyToClipboard = () => {
      if (shareLink) {
          navigator.clipboard.writeText(shareLink);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
      }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end transition-opacity">
      <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col animate-slide-in">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <div>
            <h2 className="font-bold text-lg text-slate-800">Editor & Condivisione</h2>
            <p className="text-xs text-slate-500">Incolla qui il JSON per generare il report</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full text-slate-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 p-0 relative flex flex-col">
          <textarea
            className="flex-1 w-full p-4 font-mono text-sm bg-slate-900 text-green-400 focus:outline-none resize-none"
            value={text}
            onChange={(e) => { setText(e.target.value); setShareLink(null); }}
            spellCheck={false}
          />
          
          {shareLink && (
              <div className="bg-slate-100 p-4 border-t border-slate-200">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Link Condivisibile (Generato)</label>
                  <div className="flex gap-2">
                      <input 
                        type="text" 
                        readOnly 
                        value={shareLink} 
                        className="flex-1 p-2 text-sm border border-slate-300 rounded bg-white text-slate-600 focus:outline-none"
                      />
                      <button 
                        onClick={copyToClipboard}
                        className={`px-4 py-2 rounded font-medium text-sm flex items-center transition-colors ${copied ? 'bg-green-600 text-white' : 'bg-slate-800 text-white hover:bg-slate-700'}`}
                      >
                          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                  </div>
              </div>
          )}
        </div>

        {error && (
            <div className={`px-4 py-2 text-sm border-t ${error.includes('Attenzione') ? 'bg-yellow-50 text-yellow-800 border-yellow-200' : 'bg-red-100 text-red-700 border-red-200'}`}>
                {error}
            </div>
        )}

        <div className="p-4 border-t border-slate-200 bg-white flex justify-between items-center gap-2">
          <div className="flex gap-2">
            <button 
                onClick={handleReset}
                className="flex items-center px-3 py-2 text-sm text-slate-600 hover:text-slate-900 font-medium border border-transparent hover:border-slate-200 rounded"
            >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
            </button>
            <button 
                onClick={generateShareLink}
                className="flex items-center px-3 py-2 text-sm text-[#167CB5] hover:bg-blue-50 font-medium border border-[#167CB5] rounded transition-colors"
            >
                <LinkIcon className="w-4 h-4 mr-2" />
                Crea Link
            </button>
          </div>
          
          <button 
            onClick={handleSave}
            className="flex items-center px-6 py-2 bg-[#167CB5] hover:bg-[#12669e] text-white rounded-lg font-bold shadow-sm transition-colors"
          >
            <Save className="w-4 h-4 mr-2" />
            Applica JSON
          </button>
        </div>
      </div>
    </div>
  );
};