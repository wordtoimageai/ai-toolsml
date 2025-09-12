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
  },
  // PRODUCTIVITY TOOLS
  {
    id: 'notion-ai',
    icon: '📝',
    title: 'Notion AI',
    description: 'AI-powered workspace for notes, docs, and project management with intelligent writing assistance.',
    longDescription: 'Notion AI transforms your workspace into an intelligent hub for productivity. Integrated directly into Notion, it helps with writing, brainstorming, summarizing, and organizing information across all your projects and documents.',
    tags: ['Productivity', 'Writing', 'Organization'],
    category: 'productivity',
    pricing: 'Freemium',
    website: 'https://notion.so',
    features: [
      'AI-powered Q&A for your workspace',
      'Document generation and editing',
      'Meeting notes summarization',
      'Task and project organization',
      'Team collaboration tools',
      'Template library with AI assistance'
    ],
    pros: [
      'Seamless integration with existing Notion workspace',
      'Excellent for team collaboration',
      'Versatile AI assistance',
      'Strong organizational features'
    ],
    cons: [
      'Learning curve for new users',
      'AI features require paid plan',
      'Can be overwhelming with many features'
    ],
    rating: 4.6,
    reviewCount: 8920,
    founded: '2016',
    company: 'Notion Labs'
  },
  {
    id: 'otter-ai',
    icon: '🎙️',
    title: 'Otter.ai',
    description: 'AI-powered meeting transcription and note-taking with real-time collaboration features.',
    longDescription: 'Otter.ai provides real-time transcription for meetings, interviews, and conversations. With speaker identification, searchable transcripts, and team collaboration features, it\'s essential for professionals who need accurate meeting records.',
    tags: ['Meetings', 'Transcription', 'Productivity'],
    category: 'productivity',
    pricing: 'Freemium',
    website: 'https://otter.ai',
    features: [
      'Real-time transcription',
      'Speaker identification',
      'Meeting summary generation',
      'Searchable transcript archive',
      'Calendar integration',
      'Team collaboration and sharing'
    ],
    pros: [
      'Highly accurate transcription',
      'Great for remote meetings',
      'Searchable history',
      'Good free tier'
    ],
    cons: [
      'Limited monthly minutes on free plan',
      'Requires good audio quality',
      'Privacy concerns for sensitive meetings'
    ],
    rating: 4.5,
    reviewCount: 12340,
    founded: '2016',
    company: 'Otter.ai'
  },
  {
    id: 'reclaim-ai',
    icon: '📅',
    title: 'Reclaim AI',
    description: 'Automated scheduling and calendar management that protects your time for deep work.',
    longDescription: 'Reclaim AI is an intelligent calendar assistant that automatically schedules your tasks, habits, and meetings while protecting time for focused work. It learns your preferences and optimizes your schedule for maximum productivity.',
    tags: ['Scheduling', 'Calendar', 'Time Management'],
    category: 'productivity',
    pricing: 'Freemium',
    website: 'https://reclaim.ai',
    features: [
      'Automatic task scheduling',
      'Habit-protected time blocks',
      'Smart meeting scheduling',
      'Team calendar sync',
      'Focus time optimization',
      'Work-life balance metrics'
    ],
    pros: [
      'Excellent at protecting focus time',
      'Smart scheduling algorithms',
      'Good team coordination features',
      'Learns from your behavior'
    ],
    cons: [
      'Can be complex to set up initially',
      'Limited customization on free plan',
      'Requires calendar access permissions'
    ],
    rating: 4.4,
    reviewCount: 5670,
    founded: '2019',
    company: 'Reclaim.ai'
  },
  {
    id: 'clickup-ai',
    icon: '✅',
    title: 'ClickUp',
    description: 'All-in-one project management platform with AI-powered task automation and insights.',
    longDescription: 'ClickUp combines project management, document creation, and team collaboration in one platform. With AI features for task automation, content generation, and project insights, it\'s designed to replace multiple productivity tools.',
    tags: ['Project Management', 'Team Collaboration', 'AI Automation'],
    category: 'productivity',
    pricing: 'Freemium',
    website: 'https://clickup.com',
    features: [
      'AI-powered task creation and updates',
      'Project timeline automation',
      'Document and wiki creation',
      'Team workload balancing',
      'Custom dashboards and reporting',
      'Integration with 1000+ apps'
    ],
    pros: [
      'Comprehensive feature set',
      'Highly customizable workflows',
      'Strong AI automation capabilities',
      'Good value for teams'
    ],
    cons: [
      'Can be overwhelming for small teams',
      'Steep learning curve',
      'Performance can be slow with large projects'
    ],
    rating: 4.3,
    reviewCount: 15890,
    founded: '2017',
    company: 'ClickUp'
  },
  // VIDEO & AUDIO TOOLS
  {
    id: 'synthesia',
    icon: '👨‍💼',
    title: 'Synthesia',
    description: 'Create professional AI avatar videos in 140+ languages without cameras or studios.',
    longDescription: 'Synthesia revolutionizes video creation by generating professional videos with AI avatars. Perfect for training, marketing, and educational content, it eliminates the need for cameras, studios, or actors while supporting dozens of languages.',
    tags: ['Video Creation', 'AI Avatars', 'Multilingual'],
    category: 'video',
    pricing: 'Subscription',
    website: 'https://synthesia.io',
    features: [
      'AI avatar video generation',
      '140+ languages and accents',
      'Custom avatar creation',
      'Screen recording integration',
      'Brand template customization',
      'Bulk video generation'
    ],
    pros: [
      'No need for video equipment',
      'Excellent for multilingual content',
      'Professional quality output',
      'Time-saving for regular video content'
    ],
    cons: [
      'Expensive for individual users',
      'Limited emotional expression in avatars',
      'Requires script preparation'
    ],
    rating: 4.5,
    reviewCount: 7230,
    founded: '2017',
    company: 'Synthesia'
  },
  {
    id: 'runway-ml',
    icon: '🎬',
    title: 'Runway ML',
    description: 'Advanced AI video editing and generation platform with Gen-3 Alpha technology.',
    longDescription: 'Runway ML is at the forefront of AI-powered video creation and editing. With their Gen-3 Alpha model, users can generate, edit, and enhance videos using cutting-edge AI technology, making professional video production accessible to everyone.',
    tags: ['Video Editing', 'AI Generation', 'Creative'],
    category: 'video',
    pricing: 'Freemium',
    website: 'https://runwayml.com',
    features: [
      'Text-to-video generation',
      'AI video editing tools',
      'Background removal and replacement',
      'Style transfer for videos',
      'Motion tracking and effects',
      'Collaborative editing workspace'
    ],
    pros: [
      'Cutting-edge AI video technology',
      'Professional-grade results',
      'Intuitive creative tools',
      'Regular feature updates'
    ],
    cons: [
      'Expensive for heavy usage',
      'Requires powerful hardware for best performance',
      'Learning curve for advanced features'
    ],
    rating: 4.6,
    reviewCount: 9140,
    founded: '2018',
    company: 'Runway AI'
  },
  {
    id: 'descript',
    icon: '📹',
    title: 'Descript',
    description: 'Edit audio and video by editing text, with AI-powered transcription and voice synthesis.',
    longDescription: 'Descript revolutionizes audio and video editing by allowing you to edit media files like text documents. With AI transcription, voice cloning, and collaborative features, it\'s perfect for podcasters, video creators, and content teams.',
    tags: ['Audio Editing', 'Video Editing', 'Transcription'],
    category: 'video',
    pricing: 'Freemium',
    website: 'https://descript.com',
    features: [
      'Text-based audio/video editing',
      'AI transcription with speaker labels',
      'Voice cloning (Overdub)',
      'Collaborative editing workspace',
      'Automatic filler word removal',
      'Multi-track editing and mixing'
    ],
    pros: [
      'Revolutionary text-based editing approach',
      'Excellent transcription accuracy',
      'Great for podcast and video production',
      'Collaborative features'
    ],
    cons: [
      'Voice cloning requires ethical considerations',
      'Limited advanced video effects',
      'Subscription required for professional features'
    ],
    rating: 4.7,
    reviewCount: 8760,
    founded: '2017',
    company: 'Descript'
  },
  {
    id: 'elevenlabs',
    icon: '🗣️',
    title: 'ElevenLabs',
    description: 'Advanced AI voice generation and cloning with over 300 realistic voices.',
    longDescription: 'ElevenLabs offers the most advanced AI voice synthesis technology, featuring over 300 voices with emotional tone control. Perfect for audiobooks, podcasts, video narration, and creating custom voice content.',
    tags: ['Voice Synthesis', 'Audio', 'Text-to-Speech'],
    category: 'audio',
    pricing: 'Freemium',
    website: 'https://elevenlabs.io',
    features: [
      'High-quality voice synthesis',
      '300+ professional voices',
      'Emotional tone and style control',
      'Voice cloning technology',
      'Multi-language support',
      'API for developers'
    ],
    pros: [
      'Exceptional voice quality and realism',
      'Wide variety of voices and languages',
      'Emotional control over speech',
      'Professional audio output'
    ],
    cons: [
      'Expensive for high-volume usage',
      'Ethical concerns with voice cloning',
      'Limited free tier'
    ],
    rating: 4.8,
    reviewCount: 11200,
    founded: '2022',
    company: 'ElevenLabs'
  },
  {
    id: 'adobe-firefly',
    icon: '🔥',
    title: 'Adobe Firefly',
    description: 'Generative AI for creative assets integrated with Adobe Creative Cloud.',
    longDescription: 'Adobe Firefly brings generative AI directly into Creative Cloud applications. Create images, text effects, and creative assets with AI while maintaining the professional workflow and tools that creative professionals rely on.',
    tags: ['Generative AI', 'Creative Assets', 'Adobe Integration'],
    category: 'design',
    pricing: 'Subscription',
    website: 'https://firefly.adobe.com',
    features: [
      'Text-to-image generation',
      'Generative fill and expand',
      'Text effects creation',
      'Creative Cloud integration',
      'Commercial-safe content',
      'Style matching and consistency'
    ],
    pros: [
      'Seamless Adobe Creative Cloud integration',
      'Commercial-safe AI training data',
      'Professional creative workflows',
      'High-quality outputs'
    ],
    cons: [
      'Requires Adobe subscription',
      'Limited compared to standalone AI tools',
      'Learning curve for new users'
    ],
    rating: 4.4,
    reviewCount: 6890,
    founded: '2023',
    company: 'Adobe'
  },
  // MARKETING & SALES TOOLS
  {
    id: 'hubspot-email-writer',
    icon: '📧',
    title: 'HubSpot Email Writer',
    description: 'AI-powered email copywriting integrated with CRM and marketing automation.',
    longDescription: 'HubSpot\'s AI Email Writer creates personalized, high-converting email campaigns by leveraging your CRM data. It provides tone coaching and optimization suggestions to improve engagement and conversion rates.',
    tags: ['Email Marketing', 'CRM Integration', 'Personalization'],
    category: 'marketing',
    pricing: 'Freemium',
    website: 'https://hubspot.com',
    features: [
      'AI email copy generation',
      'CRM data integration',
      'Tone and style coaching',
      'A/B testing suggestions',
      'Personalization at scale',
      'Performance analytics'
    ],
    pros: [
      'Deep CRM integration',
      'Personalized content creation',
      'Comprehensive marketing platform',
      'Good analytics and reporting'
    ],
    cons: [
      'Can be expensive for small businesses',
      'Learning curve for advanced features',
      'Limited AI features on free tier'
    ],
    rating: 4.3,
    reviewCount: 9870,
    founded: '2006',
    company: 'HubSpot'
  },
  {
    id: 'albert-ai',
    icon: '🎯',
    title: 'Albert.ai',
    description: 'Self-optimizing digital advertising platform that autonomously manages ad campaigns.',
    longDescription: 'Albert.ai is an autonomous digital marketing platform that uses machine learning to optimize advertising campaigns across channels. It continuously analyzes performance and adjusts strategies to maximize ROI without human intervention.',
    tags: ['Digital Advertising', 'Campaign Optimization', 'Machine Learning'],
    category: 'marketing',
    pricing: 'Paid',
    website: 'https://albert.ai',
    features: [
      'Autonomous campaign optimization',
      'Cross-channel advertising management',
      'Real-time performance analysis',
      'Budget allocation optimization',
      'Audience targeting refinement',
      'Creative performance insights'
    ],
    pros: [
      'Proven ROI improvements',
      'Autonomous optimization',
      'Cross-channel expertise',
      'Continuous learning and adaptation'
    ],
    cons: [
      'Enterprise-level pricing',
      'Requires significant ad spend to be effective',
      'Less control over individual campaign decisions'
    ],
    rating: 4.6,
    reviewCount: 1240,
    founded: '2010',
    company: 'Albert Technologies'
  },
  {
    id: 'sprout-social',
    icon: '📱',
    title: 'Sprout Social',
    description: 'AI-powered social media management with sentiment analysis and optimization.',
    longDescription: 'Sprout Social combines social media management with AI-powered insights and optimization. Features include sentiment analysis, optimal posting times, and automated engagement recommendations to maximize social media ROI.',
    tags: ['Social Media', 'Analytics', 'Engagement'],
    category: 'social',
    pricing: 'Subscription',
    website: 'https://sproutsocial.com',
    features: [
      'AI-powered posting optimization',
      'Sentiment analysis and monitoring',
      'Automated engagement suggestions',
      'Cross-platform scheduling',
      'Comprehensive analytics dashboard',
      'Team collaboration tools'
    ],
    pros: [
      'Comprehensive social media management',
      'Strong analytics and reporting',
      'Good team collaboration features',
      'AI-driven optimization'
    ],
    cons: [
      'Expensive for small businesses',
      'Complex interface for beginners',
      'Limited free trial'
    ],
    rating: 4.4,
    reviewCount: 7650,
    founded: '2010',
    company: 'Sprout Social'
  },
  {
    id: 'reply-io',
    icon: '💼',
    title: 'Reply.io',
    description: 'AI-powered sales outreach automation with personalized email sequences.',
    longDescription: 'Reply.io automates sales outreach with AI-powered personalization and sequence optimization. It helps sales teams scale their outreach efforts while maintaining personalization and improving response rates.',
    tags: ['Sales Automation', 'Email Outreach', 'Personalization'],
    category: 'sales',
    pricing: 'Subscription',
    website: 'https://reply.io',
    features: [
      'Automated email sequences',
      'AI-powered personalization',
      'Multi-channel outreach (email, LinkedIn, calls)',
      'Response tracking and analytics',
      'CRM integrations',
      'A/B testing for sequences'
    ],
    pros: [
      'Effective outreach automation',
      'Good personalization capabilities',
      'Multi-channel approach',
      'Strong analytics and reporting'
    ],
    cons: [
      'Can feel impersonal if not configured well',
      'Requires careful compliance management',
      'Learning curve for optimization'
    ],
    rating: 4.2,
    reviewCount: 3940,
    founded: '2017',
    company: 'Reply'
  },
  {
    id: 'marketmuse',
    icon: '📊',
    title: 'MarketMuse',
    description: 'AI-powered content strategy and SEO optimization platform.',
    longDescription: 'MarketMuse uses AI to analyze content gaps, optimize for search engines, and develop comprehensive content strategies. It provides data-driven insights for content creation and helps improve search rankings.',
    tags: ['Content Strategy', 'SEO', 'Content Optimization'],
    category: 'seo',
    pricing: 'Subscription',
    website: 'https://marketmuse.com',
    features: [
      'Content gap analysis',
      'Topic modeling and clustering',
      'Content optimization suggestions',
      'Competitive content analysis',
      'Content planning and calendars',
      'SEO performance tracking'
    ],
    pros: [
      'Comprehensive content strategy insights',
      'Data-driven SEO recommendations',
      'Good competitive analysis',
      'Helpful for content planning'
    ],
    cons: [
      'Expensive for small businesses',
      'Complex interface',
      'Requires SEO knowledge to use effectively'
    ],
    rating: 4.3,
    reviewCount: 2180,
    founded: '2013',
    company: 'MarketMuse'
  },
  // AUTOMATION & WORKFLOW TOOLS
  {
    id: 'zapier',
    icon: '⚡',
    title: 'Zapier',
    description: 'Connect and automate workflows between 7000+ apps without coding.',
    longDescription: 'Zapier is the leading workflow automation platform that connects over 7,000 apps and services. Create automated workflows (Zaps) that trigger actions across multiple platforms, saving time and reducing manual work.',
    tags: ['Automation', 'Integration', 'Workflow'],
    category: 'automation',
    pricing: 'Freemium',
    website: 'https://zapier.com',
    features: [
      'Connect 7000+ apps and services',
      'Multi-step workflow automation',
      'Conditional logic and filters',
      'Scheduled and triggered actions',
      'Team collaboration and sharing',
      'Advanced data formatting tools'
    ],
    pros: [
      'Huge library of app integrations',
      'No coding required',
      'Powerful automation capabilities',
      'Good free tier'
    ],
    cons: [
      'Can become expensive with heavy usage',
      'Complex workflows can be hard to debug',
      'Limited customization for complex logic'
    ],
    rating: 4.5,
    reviewCount: 18900,
    founded: '2011',
    company: 'Zapier'
  },
  {
    id: 'wix-adi',
    icon: '🌐',
    title: 'Wix ADI',
    description: 'AI-powered website builder that creates custom sites based on your needs.',
    longDescription: 'Wix ADI (Artificial Design Intelligence) creates personalized websites by asking about your business and preferences. It automatically designs layouts, selects content, and optimizes for your specific industry and goals.',
    tags: ['Website Builder', 'AI Design', 'No-Code'],
    category: 'automation',
    pricing: 'Freemium',
    website: 'https://wix.com',
    features: [
      'AI-powered website creation',
      'Industry-specific templates',
      'Automatic content population',
      'Mobile optimization',
      'SEO optimization',
      'E-commerce integration'
    ],
    pros: [
      'Quick website creation',
      'No design skills required',
      'Good templates and customization',
      'Comprehensive feature set'
    ],
    cons: [
      'Limited flexibility compared to custom development',
      'Can feel template-based',
      'Migration away from Wix can be difficult'
    ],
    rating: 4.2,
    reviewCount: 14560,
    founded: '2006',
    company: 'Wix.com'
  },
  {
    id: 'loom',
    icon: '📹',
    title: 'Loom',
    description: 'AI-enhanced screen recording and video messaging for async communication.',
    longDescription: 'Loom simplifies video communication with AI-enhanced screen recording and video messaging. Perfect for tutorials, feedback, and async team communication, with features like automatic transcription and video editing.',
    tags: ['Screen Recording', 'Video Messaging', 'Communication'],
    category: 'productivity',
    pricing: 'Freemium',
    website: 'https://loom.com',
    features: [
      'Screen and camera recording',
      'AI-powered transcription',
      'Video editing and trimming',
      'Viewer engagement analytics',
      'Team collaboration features',
      'Integration with popular tools'
    ],
    pros: [
      'Easy to use',
      'Great for async communication',
      'Good free tier',
      'Helpful analytics'
    ],
    cons: [
      'Limited advanced editing features',
      'File size limitations on free plan',
      'Requires internet connection for most features'
    ],
    rating: 4.6,
    reviewCount: 12890,
    founded: '2015',
    company: 'Loom'
  },
  {
    id: 'figma',
    icon: '🎨',
    title: 'Figma',
    description: 'Collaborative design platform with AI-powered design assistance.',
    longDescription: 'Figma is the leading collaborative design platform used by teams worldwide. With AI-powered features for design assistance, prototyping, and team collaboration, it\'s essential for modern product design workflows.',
    tags: ['Design', 'Collaboration', 'Prototyping'],
    category: 'design',
    pricing: 'Freemium',
    website: 'https://figma.com',
    features: [
      'Real-time collaborative design',
      'AI-powered design suggestions',
      'Interactive prototyping',
      'Design system management',
      'Developer handoff tools',
      'Version control and history'
    ],
    pros: [
      'Excellent collaboration features',
      'Browser-based, no installation needed',
      'Strong community and resources',
      'Good free tier'
    ],
    cons: [
      'Can be slow with large files',
      'Limited offline functionality',
      'Learning curve for advanced features'
    ],
    rating: 4.7,
    reviewCount: 21340,
    founded: '2012',
    company: 'Figma'
  },
  // DATA & ANALYTICS TOOLS
  {
    id: 'google-trends',
    icon: '📈',
    title: 'Google Trends',
    description: 'Analyze real-time search data trends and market insights.',
    longDescription: 'Google Trends provides valuable insights into search behavior and market trends. Track the popularity of search terms, compare trends across regions and time periods, and discover emerging topics for content and marketing strategies.',
    tags: ['Market Research', 'Search Trends', 'Analytics'],
    category: 'data',
    pricing: 'Free',
    website: 'https://trends.google.com',
    features: [
      'Real-time search trend analysis',
      'Geographic trend comparison',
      'Related topics and queries',
      'Trend forecasting',
      'Industry-specific insights',
      'Historical data analysis'
    ],
    pros: [
      'Completely free to use',
      'Real-time data from Google',
      'Easy to understand visualizations',
      'Valuable for market research'
    ],
    cons: [
      'Limited to Google search data',
      'No advanced analytics features',
      'Cannot access raw data'
    ],
    rating: 4.4,
    reviewCount: 5670,
    founded: '2006',
    company: 'Google'
  },
  {
    id: 'semrush-market-explorer',
    icon: '🔍',
    title: 'Semrush Market Explorer',
    description: 'Comprehensive market research and competitor analysis platform.',
    longDescription: 'Semrush Market Explorer provides deep market insights, competitor analysis, and keyword research capabilities. Essential for digital marketers and businesses looking to understand their competitive landscape and identify opportunities.',
    tags: ['Market Research', 'Competitor Analysis', 'SEO'],
    category: 'data',
    pricing: 'Subscription',
    website: 'https://semrush.com',
    features: [
      'Market size and growth analysis',
      'Competitor traffic and keyword data',
      'Audience overlap analysis',
      'Trending keywords and topics',
      'Market quadrant positioning',
      'Growth opportunity identification'
    ],
    pros: [
      'Comprehensive market data',
      'Excellent competitor insights',
      'Professional-grade analytics',
      'Regular data updates'
    ],
    cons: [
      'Expensive for small businesses',
      'Complex interface for beginners',
      'Data accuracy can vary by region'
    ],
    rating: 4.5,
    reviewCount: 8930,
    founded: '2008',
    company: 'Semrush'
  },
  {
    id: 'fireflies-ai',
    icon: '🔥',
    title: 'Fireflies.ai',
    description: 'AI meeting assistant for transcription, analysis, and conversation intelligence.',
    longDescription: 'Fireflies.ai automatically joins meetings to record, transcribe, and analyze conversations. It provides detailed meeting summaries, action items, and conversation analytics to help teams stay organized and accountable.',
    tags: ['Meeting Intelligence', 'Transcription', 'Analytics'],
    category: 'productivity',
    pricing: 'Freemium',
    website: 'https://fireflies.ai',
    features: [
      'Automatic meeting recording and transcription',
      'AI-generated meeting summaries',
      'Action item extraction',
      'Conversation analytics and insights',
      'CRM integration and sync',
      'Team collaboration and sharing'
    ],
    pros: [
      'Accurate transcription and analysis',
      'Excellent meeting insights',
      'Good CRM integrations',
      'Helpful for team accountability'
    ],
    cons: [
      'Privacy concerns for sensitive meetings',
      'Requires meeting participants\' consent',
      'Limited customization options'
    ],
    rating: 4.3,
    reviewCount: 6780,
    founded: '2019',
    company: 'Fireflies.ai'
  },
  // SEO & CONTENT STRATEGY TOOLS
  {
    id: 'surfer-seo',
    icon: '🏄‍♂️',
    title: 'Surfer SEO',
    description: 'Data-driven content optimization with real-time SEO scoring.',
    longDescription: 'Surfer SEO provides data-driven content optimization by analyzing top-performing pages for target keywords. Its content editor offers real-time SEO scoring and suggestions to help create content that ranks higher in search results.',
    tags: ['SEO', 'Content Optimization', 'SERP Analysis'],
    category: 'seo',
    pricing: 'Subscription',
    website: 'https://surferseo.com',
    features: [
      'Real-time content optimization',
      'SERP analysis and insights',
      'Keyword research and clustering',
      'Content audit and improvement',
      'Competitor content analysis',
      'Team collaboration tools'
    ],
    pros: [
      'Data-driven optimization approach',
      'Real-time content scoring',
      'Comprehensive SERP analysis',
      'Good for content teams'
    ],
    cons: [
      'Expensive for individual users',
      'Can be overwhelming for beginners',
      'Focuses mainly on on-page SEO'
    ],
    rating: 4.6,
    reviewCount: 4920,
    founded: '2017',
    company: 'Surfer'
  },
  // CODING & DEVELOPMENT TOOLS
  {
    id: 'codesignal',
    icon: '💼',
    title: 'CodeSignal',
    description: 'AI-powered technical assessment and developer skill evaluation platform.',
    longDescription: 'CodeSignal uses AI to assess developer skills through coding challenges, technical interviews, and skill certifications. It helps companies identify top talent and developers showcase their abilities.',
    tags: ['Developer Assessment', 'Technical Interviews', 'Skill Evaluation'],
    category: 'coding',
    pricing: 'Freemium',
    website: 'https://codesignal.com',
    features: [
      'AI-powered coding assessments',
      'Technical interview simulations',
      'Skill certification programs',
      'Company assessment tools',
      'Developer portfolio features',
      'Performance analytics and insights'
    ],
    pros: [
      'Comprehensive skill assessment',
      'Good for both developers and employers',
      'Wide range of programming languages',
      'Professional certifications available'
    ],
    cons: [
      'Can be stressful for some developers',
      'Limited free assessment options',
      'Focuses primarily on algorithmic skills'
    ],
    rating: 4.2,
    reviewCount: 3450,
    founded: '2015',
    company: 'CodeSignal'
  },
  {
    id: 'codium-ai',
    icon: '🧪',
    title: 'CodiumAI',
    description: 'AI-powered code integrity and test generation for developers.',
    longDescription: 'CodiumAI focuses on code integrity by generating meaningful tests and providing suggestions for cleaner, more reliable code. It integrates with popular IDEs to help developers write better, more maintainable code.',
    tags: ['Code Quality', 'Test Generation', 'Development'],
    category: 'coding',
    pricing: 'Freemium',
    website: 'https://codium.ai',
    features: [
      'Automatic test generation',
      'Code quality analysis',
      'Bug detection and prevention',
      'IDE integration',
      'Code explanation and documentation',
      'Refactoring suggestions'
    ],
    pros: [
      'Focus on code quality and testing',
      'Good IDE integration',
      'Helps improve development practices',
      'Useful for code reviews'
    ],
    cons: [
      'Limited language support',
      'Requires understanding of testing concepts',
      'Premium features can be expensive'
    ],
    rating: 4.1,
    reviewCount: 2180,
    founded: '2022',
    company: 'CodiumAI'
  },
  {
    id: 'replit-ghostwriter',
    icon: '👻',
    title: 'Replit Ghostwriter',
    description: 'AI coding assistant integrated with cloud-based development environment.',
    longDescription: 'Replit Ghostwriter is an AI-powered coding assistant built into the Replit cloud development environment. It provides code suggestions, debugging help, and explanations while you code in the browser.',
    tags: ['Code Assistant', 'Cloud Development', 'AI Coding'],
    category: 'coding',
    pricing: 'Subscription',
    website: 'https://replit.com',
    features: [
      'AI code completion and suggestions',
      'Debugging assistance',
      'Code explanation and documentation',
      'Multi-language support',
      'Cloud-based development environment',
      'Collaborative coding features'
    ],
    pros: [
      'Integrated development environment',
      'Good for learning and collaboration',
      'No setup required',
      'Helpful AI assistance'
    ],
    cons: [
      'Requires subscription for full features',
      'Limited compared to local development',
      'Internet dependency'
    ],
    rating: 4.3,
    reviewCount: 5670,
    founded: '2016',
    company: 'Replit'
  },
  {
    id: 'deepseek',
    icon: '🤖',
    title: 'DeepSeek',
    description: 'Open-weight AI model for developers building custom AI applications.',
    longDescription: 'DeepSeek provides open-weight AI models that developers can use to build custom AI applications. With competitive performance and open-source accessibility, it\'s ideal for developers who need flexible AI capabilities.',
    tags: ['Open Source', 'AI Models', 'Development'],
    category: 'coding',
    pricing: 'Free',
    website: 'https://deepseek.com',
    features: [
      'Open-weight AI models',
      'Custom model fine-tuning',
      'API access for developers',
      'Multiple model sizes and capabilities',
      'Commercial use permitted',
      'Active developer community'
    ],
    pros: [
      'Open-source and free to use',
      'Good performance for the cost',
      'Flexible deployment options',
      'Active development community'
    ],
    cons: [
      'Requires technical expertise',
      'Limited support compared to commercial options',
      'Self-hosting requirements'
    ],
    rating: 4.2,
    reviewCount: 1890,
    founded: '2023',
    company: 'DeepSeek'
  },
  // ADDITIONAL RESEARCH TOOLS
  {
    id: 'arc-search',
    icon: '🔍',
    title: 'Arc Search',
    description: 'Mobile-focused AI search engine with intelligent browsing features.',
    longDescription: 'Arc Search is a mobile-first AI search engine that provides intelligent browsing and search capabilities. Designed for iOS and iPadOS, it offers a reimagined search experience with AI-powered features.',
    tags: ['AI Search', 'Mobile', 'Browsing'],
    category: 'research',
    pricing: 'Free',
    website: 'https://arc.net',
    features: [
      'AI-powered search results',
      'Mobile-optimized interface',
      'Intelligent page summarization',
      'Privacy-focused browsing',
      'Clean, distraction-free design',
      'Quick access to information'
    ],
    pros: [
      'Completely free to use',
      'Excellent mobile experience',
      'Privacy-focused approach',
      'Clean, intuitive interface'
    ],
    cons: [
      'iOS/iPadOS only',
      'Limited compared to full browsers',
      'Newer product with limited features'
    ],
    rating: 4.5,
    reviewCount: 3420,
    founded: '2019',
    company: 'The Browser Company'
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