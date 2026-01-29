import React from 'react';
import { SentimentDistribution } from '../types';

interface SentimentBarProps {
  data: SentimentDistribution;
}

export const SentimentBar: React.FC<SentimentBarProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-6">
       <div className="flex h-4 rounded-full overflow-hidden mb-4 bg-slate-100">
         <div style={{ width: `${data.positive_percentage}%`, backgroundColor: '#167CB5' }} className="h-full transition-all duration-1000"></div>
         <div style={{ width: `${data.neutral_percentage}%`, backgroundColor: '#515B98' }} className="h-full transition-all duration-1000"></div>
         <div style={{ width: `${data.negative_percentage}%`, backgroundColor: '#B72267' }} className="h-full transition-all duration-1000"></div>
       </div>
       
       <div className="flex flex-wrap gap-4 justify-center">
         <div className="flex items-center text-sm">
            <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#167CB5' }}></span>
            <span className="text-slate-600">Positivo <strong>{data.positive_percentage}%</strong></span>
         </div>
         <div className="flex items-center text-sm">
            <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#515B98' }}></span>
            <span className="text-slate-600">Neutro <strong>{data.neutral_percentage}%</strong></span>
         </div>
         <div className="flex items-center text-sm">
            <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#B72267' }}></span>
            <span className="text-slate-600">Negativo <strong>{data.negative_percentage}%</strong></span>
         </div>
       </div>
    </div>
  );
};