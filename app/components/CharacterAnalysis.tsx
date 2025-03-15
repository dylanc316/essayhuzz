'use client';

import React, { useState } from 'react';

interface CharacterField {
  title: string;
  description: string;
}

const CharacterAnalysis: React.FC = () => {
  const [workTitle, setWorkTitle] = useState('');
  const [characterName, setCharacterName] = useState('');
  const [textContent, setTextContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  
  const characterFields: CharacterField[] = [
    {
      title: 'Character Traits',
      description: 'Personality traits, motivations, and defining characteristics'
    },
    {
      title: 'Character Development',
      description: 'How the character changes throughout the narrative'
    },
    {
      title: 'Relationships',
      description: 'Interactions with other characters and their significance'
    },
    {
      title: 'Archetype',
      description: 'Hero, antihero, villain, mentor, etc.'
    },
    {
      title: 'Symbolism',
      description: 'What the character represents in the larger context'
    },
    {
      title: 'Key Quotations',
      description: 'Important lines spoken by or about the character'
    }
  ];
  
  const [selectedFields, setSelectedFields] = useState<string[]>([
    'Character Traits', 
    'Character Development', 
    'Relationships'
  ]);
  
  const handleFieldToggle = (field: string) => {
    if (selectedFields.includes(field)) {
      setSelectedFields(selectedFields.filter(f => f !== field));
    } else {
      setSelectedFields([...selectedFields, field]);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!workTitle || !characterName) {
      alert('Please enter both the work title and character name');
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock character analysis
      const analysis = generateCharacterAnalysis(workTitle, characterName, selectedFields);
      setAnalysisResult(analysis);
    } catch (error) {
      console.error('Error generating character analysis:', error);
      alert('An error occurred while generating the analysis. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  const generateCharacterAnalysis = (
    title: string, 
    character: string, 
    fields: string[]
  ): string => {
    let analysis = `# Character Analysis: ${character} from "${title}"\n\n`;
    
    if (fields.includes('Character Traits')) {
      analysis += `## Character Traits\n
${character} exhibits a complex blend of traits that make them a multifaceted character. They are primarily characterized by their determination and resilience in the face of adversity. This is balanced by moments of vulnerability that humanize them and create reader empathy. Their analytical mind and strategic thinking demonstrate intelligence, while their occasional impulsiveness adds unpredictability to their actions.

**Primary Traits:**
- Determined and persistent
- Intelligent and resourceful
- Compassionate yet pragmatic
- Struggles with trust issues
- Adaptive to changing circumstances

These traits create internal conflict as ${character} navigates difficult situations, particularly when their compassion conflicts with necessary pragmatic decisions. This tension is central to their character arc and creates many of the story's most compelling moments.\n\n`;
    }
    
    if (fields.includes('Character Development')) {
      analysis += `## Character Development\n
${character}'s journey follows a clear trajectory of growth while maintaining core aspects of their identity.

**Initial State:**
At the beginning of the narrative, ${character} appears primarily motivated by personal ambition and a desire to prove themselves. Their worldview is relatively narrow, and they often make decisions based on immediate self-interest. Early interactions reveal insecurity masked by confidence.

**Turning Point:**
The pivotal moment in ${character}'s development occurs when they face a significant loss around the midpoint of the story. This forces them to reevaluate their priorities and perspective. Their response to this crisis reveals deeper aspects of their character previously hidden.

**Evolution:**
As the narrative progresses, ${character} demonstrates increased empathy and willingness to consider perspectives beyond their own. Their decision-making becomes more nuanced, considering long-term consequences and impacts on others. While their core personality remains recognizable, their growth is evidenced by how they apply their traits in increasingly mature ways.

**Final State:**
By the conclusion, ${character} has achieved a more balanced perspective, integrating their ambition with a broader understanding of responsibility. Their final actions demonstrate a willingness to sacrifice personal gain for principles, showing significant growth from their initial characterization.\n\n`;
    }
    
    if (fields.includes('Relationships')) {
      analysis += `## Relationships\n
${character}'s interactions with other characters reveal important aspects of their personality and drive significant plot developments.

**Primary Relationships:**

1. **With the Protagonist/Antagonist:**
   - Relationship characterized by mutual respect despite opposing goals
   - Dynamic evolves from antagonism to grudging alliance
   - Their conflicts highlight central themes of the narrative

2. **With Mentor Figure:**
   - Provides emotional and intellectual guidance
   - Relationship reveals ${character}'s capacity for growth
   - Tension arises when ${character} begins to outgrow mentor's teachings

3. **With Romantic Interest:**
   - Complex relationship that challenges ${character}'s vulnerabilities
   - Serves as catalyst for personal growth
   - Relationship tests ${character}'s ability to balance personal desires with other responsibilities

4. **With Family Members:**
   - Complicated dynamic reveals backstory and motivations
   - Unresolved tensions drive key emotional arcs
   - Evolution of these relationships mirrors ${character}'s overall development

These relationships collectively demonstrate ${character}'s complex nature and provide various lenses through which to understand their character development.\n\n`;
    }
    
    if (fields.includes('Archetype')) {
      analysis += `## Archetype\n
${character} primarily embodies the **Tragic Hero** archetype, though with elements of other archetypal figures that create a unique character profile.

**Primary Archetype: Tragic Hero**
${character} possesses exceptional qualities and good intentions but is brought down by a combination of personal flaws and circumstances beyond their control. Their downfall evokes both pity and fear in the audience, aligning with classic tragic hero conventions.

**Secondary Archetypal Elements:**

1. **The Reluctant Leader**
   - Assumes leadership position despite initial resistance
   - Grows into role through necessity rather than ambition
   - Leadership reveals both strengths and weaknesses

2. **The Wounded Healer**
   - Personal trauma informs their ability to help others
   - Uses painful experiences as source of wisdom
   - Healing others serves as path to self-healing

3. **The Shapeshifter**
   - Presents different aspects of self to different characters
   - Creates uncertainty about true motives
   - Adaptability is both strength and potential moral liability

The complexity of ${character}'s archetypal nature contributes to their unpredictability and allows the author to subvert reader expectations throughout the narrative.\n\n`;
    }
    
    if (fields.includes('Symbolism')) {
      analysis += `## Symbolism\n
${character} functions as a significant symbolic element within the narrative, representing larger thematic concerns and abstract concepts.

**Primary Symbolic Function:**
At the most fundamental level, ${character} represents the tension between idealism and pragmatism central to the work's philosophical concerns. Their internal struggles externalize this abstract conflict, making it accessible to readers.

**Symbolic Associations:**

1. **Change vs. Tradition**
   - ${character}'s evolution symbolizes the possibility of meaningful change
   - Their resistance to certain changes represents the value of core principles
   - This duality reflects broader societal tensions within the narrative world

2. **Integration of Opposites**
   - ${character} embodies seemingly contradictory traits successfully integrated
   - Their journey represents psychological wholeness achieved through incorporating disparate aspects of self
   - This integration symbolizes the thematic resolution the work proposes

3. **Metaphor for Human Condition**
   - ${character}'s limited perspective despite good intentions reflects human limitations
   - Their capacity for growth symbolizes human potential
   - Their flaws and strengths combined create a microcosm of humanity

These symbolic functions elevate ${character} beyond a mere plot device to become a central vehicle for the work's thematic expression.\n\n`;
    }
    
    if (fields.includes('Key Quotations')) {
      analysis += `## Key Quotations\n
The following quotations reveal significant aspects of ${character}'s personality, development, and thematic importance.

**Revealing Character Traits:**

> "I've never believed in fate. We make our choices, and our choices make us." (Chapter 3)
> - Demonstrates ${character}'s belief in personal agency
> - Establishes philosophical perspective early in narrative
> - Creates dramatic irony given later events beyond their control

> "Sometimes the right path is the one that feels wrong at first." (Chapter 12)
> - Shows pragmatic approach to ethics
> - Reveals capacity for difficult decisions
> - Foreshadows later moral compromises

**Illustrating Character Development:**

> "I used to think strength meant never showing weakness. Now I understand it's about continuing despite it." (Chapter 24)
> - Explicitly states character growth
> - Marks shift in self-perception
> - Demonstrates new emotional maturity

**Relationship Insights:**

> "You see what you want to see in me. I'm not sure either of us knows who I really am anymore." (Chapter 18)
> - Spoken to close ally/romantic interest
> - Reveals identity crisis at story midpoint
> - Demonstrates self-awareness and relationship complexity

**Thematic Significance:**

> "The world doesn't change. We just find better ways to lie to ourselves about it." (Chapter 30)
> - Reveals cynicism that must be overcome
> - Contrasts with earlier idealism
> - Position character eventually moves beyond in final arc

These quotations provide textual evidence for analytical claims about ${character}'s function in the narrative.\n\n`;
    }
    
    return analysis;
  };
  
  return (
    <div className="card p-6">
      <h2 className="text-2xl font-bold mb-6">Character Analysis</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-medium">Work Title</label>
            <input
              type="text"
              value={workTitle}
              onChange={(e) => setWorkTitle(e.target.value)}
              placeholder="Enter the title of the book/play"
              className="input"
              required
            />
          </div>
          
          <div>
            <label className="block mb-2 font-medium">Character Name</label>
            <input
              type="text"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
              placeholder="Enter character name"
              className="input"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block mb-2 font-medium">Text Content (Optional)</label>
          <textarea
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            placeholder="Paste relevant text passages about this character (optional)"
            rows={5}
            className="input"
          />
        </div>
        
        <div>
          <label className="block mb-2 font-medium">Analysis Components</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {characterFields.map((field) => (
              <div 
                key={field.title}
                className={`border rounded-md p-3 cursor-pointer transition ${
                  selectedFields.includes(field.title) 
                    ? 'border-blue-500 bg-blue-900/20' 
                    : 'border-gray-700 hover:border-gray-500'
                }`}
                onClick={() => handleFieldToggle(field.title)}
              >
                <div className="flex items-center mb-1">
                  <div 
                    className={`w-4 h-4 mr-2 rounded-sm flex items-center justify-center border ${
                      selectedFields.includes(field.title) 
                        ? 'bg-blue-500 border-blue-500' 
                        : 'border-gray-500'
                    }`}
                  >
                    {selectedFields.includes(field.title) && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="font-medium">{field.title}</span>
                </div>
                <p className="text-sm text-gray-400 ml-6">{field.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="btn-primary"
            disabled={isGenerating || selectedFields.length === 0}
          >
            {isGenerating ? (
              <span className="flex items-center">
                <svg 
                  className="animate-spin h-5 w-5 mr-2" 
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                  />
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Generating Analysis...
              </span>
            ) : 'Generate Character Analysis'}
          </button>
        </div>
      </form>
      
      {analysisResult && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
          <div className="card p-4 bg-gray-900 overflow-auto max-h-[600px]">
            <pre className="whitespace-pre-wrap font-mono text-sm">{analysisResult}</pre>
          </div>
          <div className="mt-4 flex justify-end">
            <button className="btn-secondary mr-2">
              Copy to Clipboard
            </button>
            <button className="btn-outline">
              Download as Text
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterAnalysis;