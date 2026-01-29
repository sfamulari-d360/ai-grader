import { ReportData } from './types';

export const DEFAULT_REPORT: ReportData = {
  "metadata": {
    "report_id": "40508899001",
    "brand_analyzed": "Happy Casa",
    "generation_timestamp": "2026-01-29T04:07:00.471-05:00",
    "country_iso2": "IT",
    "sector": "Retail",
    "offerings": "Home & Garden",
    "tipo_LLM": "Gemini"
  },
  "report_strategico": {
    "executive_summary": {
      "diagnosi_strategica": "Happy Casa si posiziona come 'Sfidante Visibile', con un'elevata notorietà (SoV 62.26) ma una percezione di mercato solo moderatamente positiva (PI 58.75). Il brand capitalizza su un vasto assortimento e prezzi competitivi, ma è penalizzato da criticità significative nella qualità percepita dei prodotti e, soprattutto, nell'esperienza post-vendita online, che ne minano la reputazione.",
      "vettore_principale": "Risolvere con urgenza le carenze operative del canale e-commerce (consegne, resi, customer care) per allineare l'esperienza cliente agli standard di mercato e capitalizzare sull'alta visibilità del brand."
    },
    "key_positioning_indicators": {
      "global_index": {
        "value": 60,
        "context": "Indice sintetico che combina la presenza sul mercato e la percezione del brand, indicando un posizionamento complessivamente solido ma con aree di debolezza."
      },
      "perception_index": {
        "value": 58.75,
        "context": "Perception positiva, margini di miglioramento. Il sentiment generale è tiepido, influenzato da un mix di feedback positivi sul prezzo e negativi sul servizio."
      },
      "share_of_voice": {
        "value": 62.26,
        "context": "Presenza forte, posizione consolidata. Il brand gode di un'elevata visibilità nelle conversazioni online rispetto ai competitor diretti."
      }
    },
    "competitive_analysis": {
      "quantitative_overview": [
        { "brand_name": "Happy Casa", "mention_percentage": 7.53 },
        { "brand_name": "Amazon", "mention_percentage": 5.02 },
        { "brand_name": "Leroy Merlin", "mention_percentage": 4.6 },
        { "brand_name": "ManoMano", "mention_percentage": 4.18 },
        { "brand_name": "OBI", "mention_percentage": 3.35 },
        { "brand_name": "Bricoman", "mention_percentage": 2.51 },
        { "brand_name": "eBay", "mention_percentage": 2.51 },
        { "brand_name": "Maury's", "mention_percentage": 2.51 },
        { "brand_name": "Altri", "mention_percentage": 67.79 }
      ],
      "positioning_map": {
        "quadrant": "Sfidante Visibile",
        "explanation": "Con un'elevata Share of Voice (62.26) ma una Perception Index inferiore alla soglia di eccellenza (58.75), Happy Casa è uno 'Sfidante Visibile'. Il brand genera molto 'rumore' ma non riesce a convertirlo in una fiducia piena. A differenza di competitor come Leroy Merlin, percepito come affidabile per il buon rapporto qualità-prezzo, Happy Casa soffre di criticità nel servizio post-vendita e nella qualità incostante dei prodotti, che ne limitano la reputazione nonostante la forte presenza mediatica."
      }
    },
    "perception_analysis": {
      "sentiment_distribution": {
        "positive_percentage": 25,
        "neutral_percentage": 66.67,
        "negative_percentage": 8.33
      },
      "narrative_assets": [
        {
          "theme": "Convenienza e Vasta Scelta",
          "supporting_evidence": "Il brand è apprezzato per i prezzi competitivi, un vasto assortimento di prodotti e un buon rapporto qualità-prezzo, attraendo clienti con budget limitato."
        },
        {
          "theme": "Design Accessibile e di Tendenza",
          "supporting_evidence": "I prodotti sono riconosciuti per il loro design accattivante e per essere in linea con le tendenze attuali, rendendo lo stile accessibile a un vasto pubblico."
        }
      ],
      "narrative_frictions": [
        {
          "theme": "Criticità nel Servizio Post-Vendita Online",
          "supporting_evidence": "Numerose lamentele riguardano il servizio post-vendita, inclusi ritardi nelle consegne, un'assistenza clienti inefficace e processi di reso e rimborso complicati."
        },
        {
          "theme": "Qualità Percepita e Durabilità dei Prodotti",
          "supporting_evidence": "La qualità dei materiali è una critica ricorrente, con prodotti percepiti come poco durevoli e realizzati con materiali economici, deludendo le aspettative di durata nel tempo."
        }
      ]
    },
    "strategic_implications": [
      {
        "title": "Ottimizzare l'Esperienza E-commerce e Post-Vendita",
        "insight_and_implication": "Il mercato si affida sempre più all'e-commerce e alle recensioni online, ma i feedback su Happy Casa evidenziano gravi carenze nella gestione degli ordini, nelle consegne e nel servizio clienti. Questa discrepanza danneggia la reputazione e la fiducia, vanificando la forte visibilità del brand.",
        "strategic_imperative": "Ristrutturare la logistica e il customer care per l'e-commerce, garantendo tempi di consegna affidabili, processi di reso semplici e un supporto clienti reattivo per allinearsi agli standard di mercato."
      },
      {
        "title": "Ribilanciare il Portafoglio Prodotti sul Rapporto Qualità-Prezzo",
        "insight_and_implication": "I consumatori cercano un equilibrio tra prezzo accessibile e durabilità, come dimostra l'attenzione alle recensioni e ai materiali. La percezione di bassa qualità dei prodotti Happy Casa, sebbene economici, rappresenta una frizione che limita la fidelizzazione e il valore percepito.",
        "strategic_imperative": "Introdurre segmenti di offerta con una qualità e durabilità superiori, comunicando in modo trasparente le caratteristiche dei materiali per gestire le aspettative del cliente e giustificare fasce di prezzo differenziate."
      },
      {
        "title": "Sfruttare la Rete Fisica come Vantaggio Competitivo",
        "insight_and_implication": "Il mercato è multicanale e le difficoltà dell'e-commerce di Happy Casa possono essere compensate rafforzando l'esperienza nel punto vendita, che può diventare un asset per la fiducia del cliente e la gestione dei problemi.",
        "strategic_imperative": "Potenziare l'esperienza in-store e integrare i canali fisico e digitale (es. 'clicca e ritira', gestione resi in negozio) per superare le barriere dell'online e rafforzare la relazione con il cliente."
      }
    ]
  }
};