export interface Tool {
  id: string;
  icon: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  category: string;
  pricing: 'Free' | 'Freemium' | 'Paid' | 'Subscription';
  website: string;
  features: string[];
  pros: string[];
  cons: string[];
  rating: number;
  reviewCount: number;
  founded: string;
  company: string;
}

export const tools: Tool[] = [
  {
    id: 'chatgpt',
    icon: '✍️',
    title: 'ChatGPT',
    description: 'Advanced conversational AI that can help with writing, coding, analysis, and creative tasks.',
    longDescription: 'ChatGPT is a state-of-the-art conversational AI developed by OpenAI. It excels at understanding context and generating human-like responses across a wide range of topics. From creative writing to code debugging, ChatGPT has become an essential tool for millions of users worldwide.',
    tags: ['Writing', 'Conversation', 'Free'],
    category: 'writing',
    pricing: 'Freemium',
    website: 'https://chat.openai.com',
    features: [
      'Natural language conversation',
      'Code generation and debugging',
      'Creative writing assistance',
      'Analysis and research help',
      'Multiple language support',
      'Context-aware responses'
    ],
    pros: [
      'Highly accurate responses',
      'Excellent at explaining complex topics',
      'Fast response times',
      'Free tier available'
    ],
    cons: [
      'Knowledge cutoff limitations',
      'Can sometimes generate incorrect information',
      'Rate limits on free tier'
    ],
    rating: 4.8,
    reviewCount: 15420,
    founded: '2022',
    company: 'OpenAI'
  },
  {
    id: 'midjourney',
    icon: '🎨',
    title: 'Midjourney',
    description: 'Create stunning, high-quality images from text descriptions using advanced AI algorithms.',
    longDescription: 'Midjourney is a revolutionary AI art generator that transforms text prompts into breathtaking visual artwork. Used by artists, designers, and creatives worldwide, it offers unparalleled quality in AI-generated imagery with a unique artistic style.',
    tags: ['Image Generation', 'Art', 'Paid'],
    category: 'design',
    pricing: 'Subscription',
    website: 'https://midjourney.com',
    features: [
      'High-quality image generation',
      'Multiple art styles',
      'Aspect ratio control',
      'Image variations',
      'Upscaling capabilities',
      'Community gallery'
    ],
    pros: [
      'Exceptional image quality',
      'Unique artistic style',
      'Active community',
      'Regular updates and improvements'
    ],
    cons: [
      'Requires Discord to use',
      'No free tier',
      'Can be expensive for heavy usage'
    ],
    rating: 4.7,
    reviewCount: 8935,
    founded: '2021',
    company: 'Midjourney Inc.'
  },
  {
    id: 'github-copilot',
    icon: '💻',
    title: 'GitHub Copilot',
    description: 'AI-powered code completion tool that helps developers write better code faster.',
    longDescription: 'GitHub Copilot is an AI pair programmer that helps you write code faster with less work. Trained on billions of lines of code, it provides intelligent code suggestions and can generate entire functions from comments.',
    tags: ['Coding', 'Productivity', 'Subscription'],
    category: 'coding',
    pricing: 'Subscription',
    website: 'https://github.com/features/copilot',
    features: [
      'Intelligent code completion',
      'Function generation from comments',
      'Multiple language support',
      'IDE integration',
      'Code explanation',
      'Test generation'
    ],
    pros: [
      'Significantly speeds up coding',
      'Supports many programming languages',
      'Integrates seamlessly with popular IDEs',
      'Learning from vast codebase'
    ],
    cons: [
      'Subscription required',
      'Sometimes suggests suboptimal code',
      'Privacy concerns with code analysis'
    ],
    rating: 4.6,
    reviewCount: 12760,
    founded: '2021',
    company: 'GitHub/Microsoft'
  },
  {
    id: 'jasper-ai',
    icon: '📈',
    title: 'Jasper AI',
    description: 'AI-powered marketing copywriting platform for creating high-converting content.',
    longDescription: 'Jasper AI is the ultimate AI writing assistant for businesses and marketers. It helps create compelling copy for ads, emails, websites, and more, with templates optimized for conversion and engagement.',
    tags: ['Marketing', 'Copywriting', 'Business'],
    category: 'marketing',
    pricing: 'Subscription',
    website: 'https://jasper.ai',
    features: [
      'Marketing copy templates',
      'Brand voice customization',
      'SEO optimization',
      'Multi-language support',
      'Team collaboration',
      'Content planning'
    ],
    pros: [
      'Excellent for marketing copy',
      'Brand voice consistency',
      'Template variety',
      'Good team features'
    ],
    cons: [
      'Expensive for small businesses',
      'Learning curve for advanced features',
      'Limited creative writing capabilities'
    ],
    rating: 4.5,
    reviewCount: 6840,
    founded: '2021',
    company: 'Jasper AI'
  },
  {
    id: 'mubert',
    icon: '🎵',
    title: 'Mubert',
    description: 'Generate royalty-free music and soundtracks using AI for any project or mood.',
    longDescription: 'Mubert is an AI music generation platform that creates royalty-free tracks in real-time. Perfect for content creators, app developers, and businesses needing custom music without licensing hassles.',
    tags: ['Music', 'Audio', 'Creative'],
    category: 'audio',
    pricing: 'Freemium',
    website: 'https://mubert.com',
    features: [
      'Real-time music generation',
      'Multiple genres and moods',
      'Royalty-free licensing',
      'API integration',
      'Custom duration',
      'High-quality audio'
    ],
    pros: [
      'Royalty-free music',
      'Quick generation',
      'Variety of genres',
      'API available'
    ],
    cons: [
      'Limited customization',
      'Quality varies by genre',
      'Free tier restrictions'
    ],
    rating: 4.3,
    reviewCount: 3920,
    founded: '2017',
    company: 'Mubert'
  },
  {
    id: 'perplexity',
    icon: '🔬',
    title: 'Perplexity',
    description: 'AI-powered research assistant that provides accurate answers with source citations.',
    longDescription: 'Perplexity AI is a conversational search engine that delivers accurate, real-time answers with cited sources. It combines the power of large language models with up-to-date web search to provide reliable information.',
    tags: ['Research', 'Search', 'Education'],
    category: 'research',
    pricing: 'Freemium',
    website: 'https://perplexity.ai',
    features: [
      'Real-time web search',
      'Source citations',
      'Follow-up questions',
      'Academic research mode',
      'Multiple data sources',
      'Conversation history'
    ],
    pros: [
      'Provides source citations',
      'Real-time information',
      'Easy to use interface',
      'Good for research'
    ],
    cons: [
      'Limited free queries',
      'Sometimes slow responses',
      'Citation quality varies'
    ],
    rating: 4.4,
    reviewCount: 5670,
    founded: '2022',
    company: 'Perplexity AI'
  },
  {
    id: 'claude',
    icon: '🤖',
    title: 'Claude',
    description: 'Advanced AI assistant by Anthropic, known for helpful, harmless, and honest responses.',
    longDescription: 'Claude is Anthropic\'s AI assistant designed to be helpful, harmless, and honest. It excels at complex reasoning, analysis, and creative tasks while maintaining high safety standards.',
    tags: ['Assistant', 'Analysis', 'Writing'],
    category: 'writing',
    pricing: 'Freemium',
    website: 'https://claude.ai',
    features: [
      'Long-form document analysis',
      'Creative writing assistance',
      'Code generation',
      'Research and analysis',
      'Safe and aligned responses',
      'File upload support'
    ],
    pros: [
      'Excellent reasoning abilities',
      'Strong safety measures',
      'Good at long documents',
      'Helpful and honest'
    ],
    cons: [
      'Limited availability in some regions',
      'Usage limits on free tier',
      'Newer compared to competitors'
    ],
    rating: 4.6,
    reviewCount: 4230,
    founded: '2023',
    company: 'Anthropic'
  },
  {
    id: 'stable-diffusion',
    icon: '🖼️',
    title: 'Stable Diffusion',
    description: 'Open-source AI image generator with incredible flexibility and customization options.',
    longDescription: 'Stable Diffusion is an open-source deep learning text-to-image model. It\'s capable of generating detailed images from text descriptions and offers unparalleled customization through various interfaces and implementations.',
    tags: ['Image Generation', 'Open Source', 'Free'],
    category: 'design',
    pricing: 'Free',
    website: 'https://stability.ai',
    features: [
      'Open-source model',
      'High-quality image generation',
      'Custom model training',
      'Multiple interfaces available',
      'Commercial use allowed',
      'Active community'
    ],
    pros: [
      'Completely free to use',
      'Open-source flexibility',
      'Strong community support',
      'Customizable models'
    ],
    cons: [
      'Requires technical knowledge',
      'Hardware requirements',
      'Setup complexity'
    ],
    rating: 4.5,
    reviewCount: 7890,
    founded: '2022',
    company: 'Stability AI'
  }
];

export const getAllTools = (): Tool[] => {
  // In the future, this can merge user submissions with static tools
  return tools;
};

export const getToolById = (id: string): Tool | undefined => {
  return getAllTools().find(tool => tool.id === id);
};

export const getToolsByCategory = (category: string): Tool[] => {
  return getAllTools().filter(tool => tool.category === category);
};

export const searchTools = (query: string): Tool[] => {
  const lowercaseQuery = query.toLowerCase();
  return getAllTools().filter(tool => 
    tool.title.toLowerCase().includes(lowercaseQuery) ||
    tool.description.toLowerCase().includes(lowercaseQuery) ||
    tool.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    tool.category.toLowerCase().includes(lowercaseQuery)
  );
};