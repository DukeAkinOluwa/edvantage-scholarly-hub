
import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, Upload, Image as ImageIcon, RefreshCw, 
  Download, ExternalLink, FileText, Lightbulb, 
  Sparkles, Info, ThumbsUp, ThumbsDown 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

// AI Support types
type MessageType = 'user' | 'ai';

interface Message {
  id: string;
  type: MessageType;
  content: string;
  timestamp: Date;
  feedback?: 'like' | 'dislike';
}

interface SuggestedPrompt {
  id: string;
  text: string;
  category: string;
}

// Predefined suggested prompts
const suggestedPrompts: SuggestedPrompt[] = [
  {
    id: 'prompt-1',
    text: 'Explain the concept of binary search algorithms and their time complexity.',
    category: 'Computer Science'
  },
  {
    id: 'prompt-2',
    text: 'Summarize the key differences between classical and operant conditioning in psychology.',
    category: 'Psychology'
  },
  {
    id: 'prompt-3',
    text: 'Help me understand the principles of supply and demand in microeconomics.',
    category: 'Economics'
  },
  {
    id: 'prompt-4',
    text: 'Explain Newton\'s laws of motion with everyday examples.',
    category: 'Physics'
  },
  {
    id: 'prompt-5',
    text: 'What is the difference between DNA and RNA? Explain their structures and functions.',
    category: 'Biology'
  },
  {
    id: 'prompt-6',
    text: 'Explain the concept of limits in calculus with simple examples.',
    category: 'Mathematics'
  }
];

// Sample AI responses
const sampleResponses: { [key: string]: string } = {
  'prompt-1': `# Binary Search Algorithm

Binary search is an efficient algorithm for finding a target value within a sorted array. It works by repeatedly dividing the search interval in half.

## How it works:
1. Compare the target value to the middle element of the array
2. If they are equal, return the middle position
3. If the target is less than the middle element, search the left half
4. If the target is greater, search the right half
5. Repeat until the target is found or the interval is empty

## Time Complexity:
- **Best case**: O(1) - target is the middle element
- **Average case**: O(log n) - where n is the number of elements
- **Worst case**: O(log n) - when the target is not in the array

The logarithmic time complexity makes binary search significantly faster than linear search (O(n)) for large datasets.

## Example:
\`\`\`python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
            
    return -1  # Target not found
\`\`\`

Binary search is used extensively in computer science, such as in database systems, routing algorithms, and even in everyday applications like phone directories.`,

  'prompt-2': `# Classical vs. Operant Conditioning

## Classical Conditioning (Pavlov)
Classical conditioning involves associating an involuntary response with a stimulus that did not previously trigger that response.

**Key Features:**
- Focuses on involuntary, automatic behaviors
- The response happens before the behavior
- Learning through association
- Behavior is elicited by a stimulus

**Famous Example:** Pavlov's dogs, who learned to salivate at the sound of a bell that was previously paired with food.

## Operant Conditioning (Skinner)
Operant conditioning involves modifying voluntary behavior through reinforcement or punishment.

**Key Features:**
- Focuses on voluntary behaviors
- The response happens after the behavior
- Learning through consequences
- Behavior is emitted by the organism

**Famous Example:** Skinner's rats, who learned to press a lever to receive food (reinforcement).

## Main Differences

| Aspect | Classical Conditioning | Operant Conditioning |
|--------|------------------------|----------------------|
| Focus | Involuntary responses | Voluntary behaviors |
| Timing | Stimulus → Response | Behavior → Consequence |
| Process | Association | Reinforcement/Punishment |
| Control | External control | Individual has agency |
| Theorist | Ivan Pavlov | B.F. Skinner |

## Applications
Both forms of conditioning are fundamental to understanding learning and behavior modification and are applied in various fields:

- **Therapy:** Treating phobias, addiction
- **Education:** Classroom management, learning strategies
- **Marketing:** Consumer behavior, advertising
- **Parenting:** Child discipline methods

Understanding these different learning mechanisms helps psychologists develop more effective behavioral interventions.`,
  
  'prompt-3': `# Supply and Demand in Microeconomics

Supply and demand is one of the most fundamental concepts in economics. It describes how the price of a good or service is determined in a free market economy.

## The Demand Curve

The demand curve shows the relationship between the price of a good and the quantity demanded by consumers.

**Key principles:**
- The law of demand states that, all else being equal, as the price of a good increases, the quantity demanded decreases.
- The demand curve slopes downward from left to right.
- Factors that can shift the demand curve include:
  - Changes in income
  - Changes in preferences
  - Changes in prices of related goods (substitutes or complements)
  - Changes in population or market size
  - Changes in expectations

## The Supply Curve

The supply curve shows the relationship between the price of a good and the quantity that producers are willing and able to supply.

**Key principles:**
- The law of supply states that, all else being equal, as the price of a good increases, the quantity supplied increases.
- The supply curve slopes upward from left to right.
- Factors that can shift the supply curve include:
  - Changes in input prices
  - Changes in technology
  - Changes in taxes or subsidies
  - Changes in price expectations
  - Number of suppliers

## Market Equilibrium

The point where the supply and demand curves intersect is called the market equilibrium. At this point:
- The quantity supplied equals the quantity demanded
- There is no tendency for price to change

If the price is above equilibrium, there will be a surplus of goods, causing prices to fall. If the price is below equilibrium, there will be a shortage, causing prices to rise.

## Examples in Everyday Life

1. **Concert tickets**: Limited supply with high demand leads to high prices.
2. **Seasonal produce**: Prices fall during harvest season when supply increases.
3. **Housing markets**: Prices rise in desirable areas where demand exceeds supply.
4. **Technology**: Prices of new gadgets fall over time as supply increases and newer models enter the market.

Understanding supply and demand helps explain price determination and how markets respond to changes in economic conditions.`,
};

const AiSupportPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedMode, setSelectedMode] = useState('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Handle sending a message
  const sendMessage = async (promptText: string = currentPrompt) => {
    if (!promptText.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      type: 'user',
      content: promptText,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setCurrentPrompt('');
    setIsProcessing(true);
    
    // Find if this matches a suggested prompt
    const matchedPrompt = suggestedPrompts.find(p => p.text === promptText);
    
    // Simulate AI response with a delay
    setTimeout(() => {
      let aiResponse: string;
      
      if (matchedPrompt && sampleResponses[matchedPrompt.id]) {
        aiResponse = sampleResponses[matchedPrompt.id];
      } else {
        // Generate a generic response for custom prompts
        aiResponse = generateAIResponse(promptText);
      }
      
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        type: 'ai',
        content: aiResponse,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsProcessing(false);
    }, 1500);
  };
  
  // Generate a simple AI response for custom prompts
  const generateAIResponse = (prompt: string) => {
    // This is a very simplified response generation - in a real app this would call an AI API
    const parts = [
      "Based on your question about ",
      "I understand you're asking about ",
      "Regarding your inquiry on ",
    ];
    
    const topics = prompt.split(" ").filter(word => word.length > 5).slice(0, 3);
    const topic = topics.length > 0 ? topics.join(", ") : "this topic";
    
    const intro = parts[Math.floor(Math.random() * parts.length)] + topic + ", ";
    
    const explanations = [
      `here's what you should know:\n\n# Key Concepts\n\nThis topic involves several important principles:\n\n1. First, understand that this area focuses on systematic approaches to problem-solving.\n2. Second, it's important to consider both theoretical and practical applications.\n3. Finally, remember that context matters significantly when applying these concepts.\n\n## Applications\n\nThese principles can be applied in various scenarios including academic research, practical problem-solving, and theoretical frameworks.`,
      
      `I can provide the following explanation:\n\n# Understanding the Fundamentals\n\nThis subject can be broken down into several components:\n\n## Core Principles\n- Foundation concepts establish the theoretical framework\n- Methodology determines how principles are applied\n- Analysis helps evaluate outcomes and effectiveness\n\n## Practical Implementation\nWhen applying these concepts, remember to:\n1. Start with basic principles\n2. Build complexity gradually\n3. Test your understanding with examples`,
      
      `here's an overview of the key points:\n\n# Main Concepts\n\n## Definition and Background\nThis area of study has evolved significantly over time, with its modern understanding built upon decades of research and practical application.\n\n## Important Components\n- Theoretical framework: The underlying principles\n- Methodology: How these principles are applied\n- Analysis: Evaluating results and outcomes\n\n## Related Topics\nTo fully understand this subject, you should also explore:\n- Historical context\n- Current research trends\n- Practical applications in different fields`
    ];
    
    return intro + explanations[Math.floor(Math.random() * explanations.length)];
  };
  
  // Handle sending suggested prompt
  const sendSuggestedPrompt = (prompt: SuggestedPrompt) => {
    setCurrentPrompt(prompt.text);
    sendMessage(prompt.text);
  };
  
  // Handle file upload
  const handleFileUpload = () => {
    toast({
      title: "File upload",
      description: "Document upload feature is coming soon.",
    });
  };
  
  // Handle image upload
  const handleImageUpload = () => {
    toast({
      title: "Image upload",
      description: "Image analysis feature is coming soon.",
    });
  };
  
  // Give feedback on an AI message
  const giveFeedback = (messageId: string, feedback: 'like' | 'dislike') => {
    setMessages(prev => 
      prev.map(message => 
        message.id === messageId 
          ? { ...message, feedback } 
          : message
      )
    );
    
    toast({
      title: feedback === 'like' ? "Thank you for your feedback" : "We'll improve our responses",
      description: feedback === 'like' 
        ? "We're glad this response was helpful." 
        : "We'll use your feedback to improve future responses.",
    });
  };
  
  // Format message content with markdown-like syntax
  const formatMessageContent = (content: string) => {
    // Very simple markdown parsing (a real app would use a proper markdown parser)
    const formattedContent = content
      .split('\n\n')
      .map(paragraph => {
        // Headers
        if (paragraph.startsWith('# ')) {
          return `<h2 class="text-xl font-bold mt-3 mb-2">${paragraph.substring(2)}</h2>`;
        }
        if (paragraph.startsWith('## ')) {
          return `<h3 class="text-lg font-semibold mt-3 mb-2">${paragraph.substring(3)}</h3>`;
        }
        
        // Lists
        if (paragraph.includes('\n- ')) {
          const listItems = paragraph.split('\n- ');
          const title = listItems.shift();
          return `${title}<ul class="list-disc ml-6 my-2">${listItems.map(item => `<li>${item}</li>`).join('')}</ul>`;
        }
        
        // Numbered lists
        if (paragraph.includes('\n1. ')) {
          const listItems = paragraph.split('\n');
          const title = listItems[0];
          const items = listItems.slice(1).filter(item => /^\d+\./.test(item));
          return `${title}<ol class="list-decimal ml-6 my-2">${items.map(item => `<li>${item.substring(item.indexOf('.')+1).trim()}</li>`).join('')}</ol>`;
        }
        
        // Code blocks
        if (paragraph.includes('```')) {
          const [before, code, after] = paragraph.split('```');
          return `${before}<pre class="bg-gray-100 p-3 rounded-md my-2 overflow-x-auto text-sm font-mono">${code}</pre>${after || ''}`;
        }
        
        // Tables (simplified)
        if (paragraph.includes('|') && paragraph.includes('\n|')) {
          const rows = paragraph.split('\n');
          return `<div class="overflow-x-auto my-3"><table class="min-w-full border-collapse border border-gray-300">
            ${rows.map(row => {
              if (row.startsWith('|') && row.endsWith('|')) {
                const cells = row.split('|').filter(Boolean);
                return `<tr>${cells.map(cell => `<td class="border border-gray-300 px-3 py-2">${cell.trim()}</td>`).join('')}</tr>`;
              }
              return '';
            }).join('')}
          </table></div>`;
        }
        
        return `<p>${paragraph}</p>`;
      })
      .join('');
    
    return formattedContent;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <Sparkles className="h-6 w-6 mr-2 text-edvantage-blue" />
            AI Study Support
          </h1>
          <p className="text-muted-foreground">
            Get help understanding complex topics, summarizing content, and more.
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedMode} onValueChange={setSelectedMode}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Choose mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="chat">Study Assistant</SelectItem>
              <SelectItem value="document">Document Analysis</SelectItem>
              <SelectItem value="image">Visual Learning</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left panel - chat/document/image feature */}
        <Card className="lg:col-span-3">
          <CardHeader className="pb-2 border-b">
            <CardTitle className="flex justify-between items-center">
              <span>
                {selectedMode === 'chat' 
                  ? 'Study Assistant' 
                  : selectedMode === 'document' 
                    ? 'Document Analysis' 
                    : 'Visual Learning'}
              </span>
              <Button variant="outline" size="sm" onClick={() => setMessages([])}>
                <RefreshCw className="h-4 w-4 mr-2" />
                New Chat
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs value={selectedMode} onValueChange={setSelectedMode}>
              <TabsContent value="chat" className="m-0">
                <div className="flex flex-col h-[500px]">
                  <div className="flex-1 overflow-y-auto p-4">
                    {messages.length === 0 ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center max-w-md">
                          <Lightbulb className="h-8 w-8 mx-auto mb-4 text-edvantage-accent" />
                          <h3 className="text-lg font-medium">How can I help with your studies?</h3>
                          <p className="text-sm text-muted-foreground mt-2">
                            Ask me anything about your coursework, or try one of the suggested prompts.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {messages.map(message => (
                          <div 
                            key={message.id} 
                            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                              <div 
                                className={`p-3 rounded-lg ${
                                  message.type === 'user' 
                                    ? 'bg-edvantage-blue text-white' 
                                    : 'bg-gray-100'
                                }`}
                              >
                                {message.type === 'user' ? (
                                  <p className="text-sm">{message.content}</p>
                                ) : (
                                  <div 
                                    className="text-sm prose max-w-none"
                                    dangerouslySetInnerHTML={{ __html: formatMessageContent(message.content) }}
                                  />
                                )}
                              </div>
                              {message.type === 'ai' && (
                                <div className="flex items-center mt-1 space-x-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className={`h-7 px-2 ${message.feedback === 'like' ? 'bg-green-50 text-green-600' : ''}`}
                                    onClick={() => giveFeedback(message.id, 'like')}
                                  >
                                    <ThumbsUp className="h-3.5 w-3.5" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className={`h-7 px-2 ${message.feedback === 'dislike' ? 'bg-red-50 text-red-600' : ''}`}
                                    onClick={() => giveFeedback(message.id, 'dislike')}
                                  >
                                    <ThumbsDown className="h-3.5 w-3.5" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-7 px-2"
                                    onClick={() => {
                                      toast({
                                        title: "Content copied",
                                        description: "Response has been copied to clipboard.",
                                      });
                                    }}
                                  >
                                    Copy
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 border-t">
                    <div className="flex space-x-2">
                      <Textarea 
                        value={currentPrompt}
                        onChange={(e) => setCurrentPrompt(e.target.value)}
                        placeholder="Ask about a subject or concept..."
                        className="min-h-10 flex-1 resize-none"
                        disabled={isProcessing}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                          }
                        }}
                      />
                      <Button 
                        onClick={() => sendMessage()}
                        disabled={!currentPrompt.trim() || isProcessing}
                      >
                        {isProcessing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                      </Button>
                    </div>
                    
                    {isProcessing && (
                      <div className="text-xs text-muted-foreground mt-2 text-center">
                        Thinking...
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="document" className="m-0">
                <div className="h-[500px] flex flex-col items-center justify-center p-6">
                  <div className="text-center max-w-md">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-edvantage-blue" />
                    <h3 className="text-xl font-medium">Document Analysis</h3>
                    <p className="text-sm text-muted-foreground mt-3 mb-6">
                      Upload course materials, lecture notes, or textbook chapters to summarize content, extract key concepts, or get explanations.
                    </p>
                    <div className="flex flex-col space-y-4">
                      <Button onClick={handleFileUpload} className="w-full">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload PDF or Document
                      </Button>
                      <div className="text-xs text-muted-foreground">
                        Supports PDF, DOCX, and TXT files up to 10MB
                      </div>
                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertDescription>
                          Your uploads are processed securely and will not be shared or stored permanently.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="image" className="m-0">
                <div className="h-[500px] flex flex-col items-center justify-center p-6">
                  <div className="text-center max-w-md">
                    <ImageIcon className="h-12 w-12 mx-auto mb-4 text-edvantage-blue" />
                    <h3 className="text-xl font-medium">Visual Learning</h3>
                    <p className="text-sm text-muted-foreground mt-3 mb-6">
                      Upload diagrams, charts, or images from your textbooks to get explanations and understand visual concepts better.
                    </p>
                    <div className="flex flex-col space-y-4">
                      <Button onClick={handleImageUpload} className="w-full">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Image
                      </Button>
                      <div className="text-xs text-muted-foreground">
                        Supports JPG, PNG, and WEBP files up to 5MB
                      </div>
                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertDescription>
                          Our AI can analyze diagrams, charts, and educational images to provide explanations.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Right panel - Suggested prompts */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Suggested Prompts</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              {suggestedPrompts.map(prompt => (
                <Button 
                  key={prompt.id} 
                  variant="outline" 
                  className="w-full justify-start text-sm h-auto py-3 text-left"
                  onClick={() => sendSuggestedPrompt(prompt)}
                >
                  <span className="truncate">{prompt.text}</span>
                </Button>
              ))}
            </div>
            
            <div className="mt-6 border-t pt-4">
              <h4 className="font-medium text-sm mb-3">Study Tips</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <Lightbulb className="h-4 w-4 mr-2 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>Use AI to explain concepts in simpler terms when you're stuck</span>
                </li>
                <li className="flex items-start">
                  <Lightbulb className="h-4 w-4 mr-2 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>Ask for examples to help understand abstract concepts</span>
                </li>
                <li className="flex items-start">
                  <Lightbulb className="h-4 w-4 mr-2 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>Request different perspectives on complex topics</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AiSupportPage;
