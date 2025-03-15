'use client';

import React, { useState } from 'react';

type HelperMode = 'write' | 'quotations' | 'analysis' | 'structure' | 'research';
type TextType = 'play' | 'novel' | 'poem' | 'essay' | 'other';

const EssayHelper: React.FC = () => {
  const [activeMode, setActiveMode] = useState<HelperMode>('write');
  const [textType, setTextType] = useState<TextType>('novel');
  const [textContent, setTextContent] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleModeChange = (mode: HelperMode) => {
    setActiveMode(mode);
    setResult(null);
  };

  const handleTextTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTextType(e.target.value as TextType);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!textContent.trim()) {
      alert('Please enter your text content');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Here we would normally make an API call to process the text
      // For demo purposes, we'll simulate a response after a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate a mock response based on the active mode
      let response = '';
      
      switch (activeMode) {
        case 'write':
          response = generateWriteResponse(textType, prompt);
          break;
        case 'quotations':
          response = generateQuotationsResponse(textType, textContent);
          break;
        case 'analysis':
          response = generateAnalysisResponse(textType, textContent);
          break;
        case 'structure':
          response = generateStructureResponse(textType);
          break;
        case 'research':
          response = generateResearchResponse(prompt);
          break;
      }
      
      setResult(response);
    } catch (error) {
      console.error('Error processing request:', error);
      alert('An error occurred while processing your request. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Mock response generators
  const generateWriteResponse = (type: TextType, userPrompt: string): string => {
    return `# Essay Draft

## Introduction
${userPrompt ? `This essay will explore "${userPrompt}"` : 'This essay will examine the central themes presented in the text'}. Through careful analysis of key moments and character developments, we'll uncover the deeper meaning behind the work and its relevance to broader contexts.

## Body Paragraph 1
The author establishes a foundation for the central conflict through careful characterization and setting. For instance, when the protagonist states, "I had never seen such darkness before" (Page 23), we begin to understand the metaphorical significance of light and darkness throughout the narrative. This dichotomy represents the fundamental struggle between knowledge and ignorance that permeates the entire work.

## Body Paragraph 2
Further development of these themes occurs when secondary characters challenge the protagonist's worldview. The contrast between different perspectives creates tension and forces both the character and reader to reconsider initial assumptions. This is particularly evident in the pivotal scene where conflicting viewpoints collide, leading to the realization that "truth itself is rarely simple or singular" (Page 97).

## Conclusion
Through this examination, we can see how the author skillfully weaves together narrative elements to create a complex meditation on human nature. The journey depicted is not merely physical but represents an internal transformation that speaks to universal experiences and emotions.`;
  };

  const generateQuotationsResponse = (type: TextType, content: string): string => {
    return `# Key Quotations

## Theme: Identity and Self-Discovery
1. "I am not what happened to me, I am what I choose to become." (Page 42)
   - **Context**: Spoken by the protagonist after facing a significant challenge
   - **Analysis**: This quote encapsulates the central theme of agency and self-determination despite external circumstances.

2. "The mirror reflected a stranger, but my heart knew better." (Page 78)
   - **Context**: During the character's moment of transformation
   - **Analysis**: Illustrates the disconnect between external perception and internal reality, highlighting the journey of self-discovery.

## Theme: Power and Corruption
1. "Authority without wisdom is like a heavy axe without an edge, fitter to bruise than polish." (Page 103)
   - **Context**: The mentor figure warning about leadership responsibilities
   - **Analysis**: Uses metaphorical language to critique leadership without moral guidance.

2. "They built their fortune on whispers and their empire on secrets." (Page 157)
   - **Context**: Description of the antagonistic force in the narrative
   - **Analysis**: Reveals how power accumulated through manipulation creates a fragile foundation.

## Theme: Human Connection
1. "We are islands shouting lies to each other across seas of misunderstanding." (Page 212)
   - **Context**: A moment of realization during a conflict between characters
   - **Analysis**: Powerful metaphor for communication failures and the isolation we experience despite proximity to others.`;
  };

  const generateAnalysisResponse = (type: TextType, content: string): string => {
    if (type === 'play') {
      return `# Play Analysis: Act by Act Breakdown

## Act I: Exposition
**Summary**: The opening act establishes the setting of a small town and introduces the central conflict between tradition and progress. The protagonist, faced with changing circumstances, begins to question long-held beliefs.

**Main Idea**: The facade of stability in traditional structures often conceals underlying tensions.

**Key Quotations**:
- "The walls we build to keep others out also keep us in." (Scene 2)
- "Tradition is the illusion of permanence." (Scene 3)

**Analysis**: Through skillful exposition, the playwright establishes a seemingly idyllic community while subtly revealing fractures beneath the surface. The visual imagery of "walls" serves as both literal and metaphorical representations of barriers to change. The juxtaposition of older and younger generations creates dramatic tension that will drive subsequent action.

## Act II: Rising Action
**Summary**: Tensions escalate as the protagonist actively challenges norms, facing growing opposition from community leaders. New alliances form as characters are forced to take sides.

**Main Idea**: Resistance to change often strengthens when change becomes a real possibility.

**Key Quotations**:
- "It's easier to fight for principles than to live up to them." (Scene 1)
- "Revolution begins with the self, in the self." (Scene 4)

**Analysis**: The playwright employs increasing dramatic irony as audience members recognize the inevitability of conflict while characters remain blind to consequences. The acceleration of events creates a momentum that mirrors social movements in real history.`;
    } else {
      return `# Novel Analysis: Chapter by Chapter Breakdown

## Chapter 1: Genesis
**Summary**: The opening chapter introduces the protagonist in their ordinary world, establishing their dissatisfaction with current circumstances and hinting at desires for change.

**Main Idea**: Discontent serves as a catalyst for transformation.

**Key Quotations**:
- "The calendar on the wall marked days passed, not moments lived." (Page 3)
- "Between what was and what could be stretched an invisible bridge of possibility." (Page 12)

**Analysis**: The author establishes a mundane setting that serves as contrast for later developments. Through internal monologue and careful description, we see the protagonist's yearning before they themselves can articulate it. The temporal imagery foreshadows themes of opportunity and regret that will develop throughout the narrative.

## Chapter 2: Catalyst
**Summary**: An unexpected event disrupts the protagonist's routine, forcing them to make choices that will set the main narrative in motion.

**Main Idea**: Meaningful change often requires external disruption of established patterns.

**Key Quotations**:
- "Chaos isn't a pit. Chaos is a ladder." (Page 23)
- "The most important decisions are rarely made with complete information." (Page 31)

**Analysis**: The pacing accelerates as the author employs more active verbs and shorter sentences to create tension. The introduction of a mentor figure creates both exposition opportunities and establishes relationship dynamics that will be tested later. The protagonist's reluctance to embrace new circumstances creates internal conflict that mirrors external obstacles.`;
    }
  };

  const generateStructureResponse = (type: TextType): string => {
    return `# Essay Structure Guide

## Introduction (1 paragraph)
- **Hook**: Start with an engaging opening related to the text
- **Context**: Briefly introduce the author, title, and background
- **Thesis**: Present your main argument clearly and specifically

## Body Paragraph 1: Primary Theme (1-2 paragraphs)
- **Topic sentence**: Identify first major theme or literary element
- **Evidence**: Include 1-2 direct quotations with page numbers
- **Analysis**: Explain how these quotes support your argument
- **Connection**: Link back to thesis statement

## Body Paragraph 2: Character Development (1-2 paragraphs)
- **Topic sentence**: Focus on a significant character
- **Evidence**: Provide quotations showing character traits or growth
- **Analysis**: Interpret the character's function in the larger narrative
- **Connection**: Explain how this character relates to your thesis

## Body Paragraph 3: Literary Techniques (1-2 paragraphs)
- **Topic sentence**: Identify key literary devices (imagery, symbolism, etc.)
- **Evidence**: Include specific examples from text
- **Analysis**: Explain how these techniques enhance meaning
- **Connection**: Show how these elements reinforce your thesis

## Conclusion (1 paragraph)
- **Restate thesis**: Remind reader of your main argument (in new words)
- **Summarize key points**: Briefly recap main supporting points
- **Broader significance**: Connect to larger themes or relevance
- **Ending thought**: Leave reader with insightful final observation

## Additional Tips:
- Use transitions between paragraphs for smooth flow
- Maintain academic tone throughout
- Avoid first-person pronouns unless specifically required
- Include properly formatted citations according to required style guide
- Proofread carefully for grammar, spelling and clarity`;
  };

  const generateResearchResponse = (userPrompt: string): string => {
    return `# Research Sources

## Academic Journal Articles

1. **"The Evolution of Narrative Structure in Contemporary Literature"**
   - Author: Dr. Sarah Jenkins
   - Journal: Literary Theory Quarterly
   - Year: 2023
   - Abstract: Examines shifts in storytelling approaches across the 21st century, with particular focus on fragmented narratives and unreliable narrators.
   - Relevance: Provides theoretical framework for analyzing the text's unique structural elements.

2. **"Identity Construction Through Linguistic Patterns"**
   - Author: Prof. Michael Chen
   - Journal: Journal of Narrative Studies
   - Year: 2021
   - Abstract: Analyzes how language choices reflect and shape character development in modern fiction.
   - Relevance: Offers methodologies for examining the protagonist's evolution through speech patterns.

## Books

1. **"Literary Movements of the Modern Era"**
   - Author: Elizabeth Rodriguez
   - Publisher: Oxford University Press
   - Year: 2022
   - Summary: Comprehensive examination of literary traditions and how they influence contemporary works.
   - Relevance: Places the text within broader literary and historical contexts.

2. **"Symbolism and Metaphor: A Practical Guide"**
   - Author: James Thompson
   - Publisher: Cambridge Scholars Publishing
   - Year: 2020
   - Summary: Detailed analysis of how symbolic elements function within narrative.
   - Relevance: Useful for interpreting the text's rich symbolic landscape.

## Critical Reviews

1. **"Beyond Surface Narratives"** - Literary Review, April 2023
   - Critic: Thomas Wilson
   - Key points: Explores themes of alienation and reconciliation, argues for the work's significance in contemporary discussions.

2. **"Form and Function in Modern Storytelling"** - The Literary Critic, January 2024
   - Critic: Maya Patel
   - Key points: Examines the innovative structural elements and their impact on reader experience.`;
  };

  return (
    <div className="card p-6">
      <div className="flex mb-6 overflow-x-auto pb-2">
        <button 
          onClick={() => handleModeChange('write')}
          className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap ${
            activeMode === 'write' ? 'bg-blue-600' : 'bg-gray-700'
          }`}
        >
          Essay Writing
        </button>
        <button 
          onClick={() => handleModeChange('quotations')}
          className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap ${
            activeMode === 'quotations' ? 'bg-blue-600' : 'bg-gray-700'
          }`}
        >
          Find Quotations
        </button>
        <button 
          onClick={() => handleModeChange('analysis')}
          className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap ${
            activeMode === 'analysis' ? 'bg-blue-600' : 'bg-gray-700'
          }`}
        >
          Text Analysis
        </button>
        <button 
          onClick={() => handleModeChange('structure')}
          className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap ${
            activeMode === 'structure' ? 'bg-blue-600' : 'bg-gray-700'
          }`}
        >
          Essay Structure
        </button>
        <button 
          onClick={() => handleModeChange('research')}
          className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap ${
            activeMode === 'research' ? 'bg-blue-600' : 'bg-gray-700'
          }`}
        >
          Research Help
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Text Type</label>
          <select 
            value={textType}
            onChange={handleTextTypeChange}
            className="input mb-4"
          >
            <option value="novel">Novel/Book</option>
            <option value="play">Play</option>
            <option value="poem">Poem</option>
            <option value="essay">Essay</option>
            <option value="other">Other</option>
          </select>
        </div>

        {(activeMode === 'write' || activeMode === 'research') && (
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              {activeMode === 'write' 
                ? 'Essay Prompt/Topic' 
                : 'Research Question'}
            </label>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={activeMode === 'write' 
                ? 'Enter your essay topic or prompt' 
                : 'What would you like to research?'}
              className="input"
            />
          </div>
        )}

        {activeMode !== 'structure' && activeMode !== 'research' && (
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              {activeMode === 'write' 
                ? 'Additional Context (Optional)' 
                : 'Your Text Content'}
            </label>
            <textarea
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              placeholder={
                activeMode === 'write' 
                  ? 'Enter any additional information or requirements' 
                  : 'Paste your text here for analysis'
              }
              rows={8}
              className="input font-mono"
            />
          </div>
        )}

        <div className="flex justify-end">
          <button 
            type="submit" 
            className="btn-primary" 
            disabled={isProcessing}
          >
            {isProcessing ? (
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
                Processing...
              </span>
            ) : activeMode === 'write' ? 'Generate Essay Draft' : 
               activeMode === 'quotations' ? 'Find Relevant Quotes' :
               activeMode === 'analysis' ? 'Analyze Text' :
               activeMode === 'structure' ? 'Get Essay Structure' : 'Find Research Sources'}
          </button>
        </div>
      </form>

      {result && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">
            {activeMode === 'write' ? 'Generated Essay Draft' : 
             activeMode === 'quotations' ? 'Key Quotations' :
             activeMode === 'analysis' ? 'Text Analysis' :
             activeMode === 'structure' ? 'Essay Structure Guide' : 'Research Sources'}
          </h2>
          <div className="card p-4 bg-gray-900 overflow-auto max-h-[600px]">
            <pre className="whitespace-pre-wrap font-mono text-sm">{result}</pre>
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

export default EssayHelper;