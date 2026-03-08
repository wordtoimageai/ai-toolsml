export interface PriceInfo {
  startingPrice: number;  // 0 for free, starting price for paid
  currency: string;       // USD, EUR, etc.
  billingCycle?: 'monthly' | 'yearly' | 'one-time' | 'usage-based';
  priceDescription?: string;  // e.g., "per user/month", "starting from"
}

export interface Tool {
  id: string;
  icon: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  category: string;
  pricing: 'Free' | 'Freemium' | 'Paid' | 'Subscription';
  priceInfo?: PriceInfo;  // Optional: actual pricing data (fallback to 0 for schema)
  website: string;
  features: string[];
  pros: string[];
  cons: string[];
  rating: number;
  reviewCount: number;
  founded: string;
  company: string;
}

// Helper function to get price value for schemas
export const getSchemaPrice = (tool: Tool): string => {
  if (tool.priceInfo) {
    return tool.priceInfo.startingPrice.toString();
  }
  // Fallback: Free/Freemium = 0, others = 0 (starting price)
  return "0";
};

export const tools: Tool[] = [
  {
    id: 'chatgpt',
    icon: '✍️',
    title: 'ChatGPT',
    description: 'Advanced conversational AI that can help with writing, coding, analysis, and creative tasks. Used by 200M+ users weekly.',
    longDescription: 'ChatGPT is a state-of-the-art conversational AI developed by OpenAI, used by over 200 million people weekly as of 2024. Powered by GPT-4o and GPT-4 Turbo, it excels at understanding nuanced context and generating human-like responses across writing, coding, data analysis, math, and creative tasks. Key use cases include drafting blog posts and marketing copy, debugging and writing code in 20+ languages, summarizing long documents, brainstorming ideas, and learning new subjects through conversational tutoring. ChatGPT is widely considered the benchmark for general-purpose AI assistants, though alternatives like Claude excel at longer documents and Gemini offers tighter Google integration. The free tier provides GPT-4o mini access, while ChatGPT Plus ($20/mo) unlocks GPT-4o, DALL-E image generation, Advanced Data Analysis, and custom GPTs.',
    tags: ['Writing', 'Conversation', 'Free'],
    category: 'writing',
    pricing: 'Freemium',
    priceInfo: { startingPrice: 0, currency: 'USD', billingCycle: 'monthly', priceDescription: 'Free tier available, Plus $20/mo' },
    website: 'https://chat.openai.com',
    features: [
      'Natural language conversation with GPT-4o',
      'Code generation and debugging in 20+ languages',
      'Creative writing assistance and brainstorming',
      'Advanced Data Analysis with file uploads',
      'DALL-E image generation (Plus plan)',
      'Custom GPTs and plugin ecosystem',
      'Voice mode for hands-free conversations',
      'Web browsing for real-time information'
    ],
    pros: [
      'Best-in-class general reasoning and accuracy',
      'Massive plugin and GPT ecosystem',
      'Fast response times with streaming',
      'Generous free tier with GPT-4o mini',
      'Multimodal: text, images, voice, files',
      'Regular model updates and improvements'
    ],
    cons: [
      'Knowledge can lag on very recent events',
      'Can hallucinate facts with high confidence',
      'Rate limits on free tier (GPT-4o mini only)',
      'Privacy concerns for sensitive business data',
      'Expensive for teams ($25-30/user/month)'
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
    description: 'Create stunning, photorealistic and artistic images from text descriptions. The gold standard for AI image generation quality.',
    longDescription: 'Midjourney is the leading AI art generator, renowned for producing the highest-quality AI images available. Running through Discord, it transforms text prompts into breathtaking visual artwork ranging from photorealistic photos to stylized illustrations. Midjourney V6 introduced major improvements in prompt understanding, text rendering, and coherence. Key use cases include concept art for games and films, marketing visuals and social media graphics, product mockups, interior design visualization, and creative exploration. Compared to DALL-E 3, Midjourney typically produces more aesthetically refined images with better composition, while Stable Diffusion offers more customization for technical users. The Basic plan ($10/mo) includes ~200 image generations, with Standard ($30/mo) and Pro ($60/mo) plans offering unlimited relaxed-mode generations.',
    tags: ['Image Generation', 'Art', 'Paid'],
    category: 'design',
    pricing: 'Subscription',
    priceInfo: { startingPrice: 10, currency: 'USD', billingCycle: 'monthly', priceDescription: 'Basic $10/month, Standard $30/month, Pro $60/month' },
    website: 'https://midjourney.com',
    features: [
      'Highest-quality AI image generation (V6)',
      'Multiple art styles from photorealistic to abstract',
      'Aspect ratio and resolution control',
      'Image variations and remixing',
      '4x upscaling to high resolution',
      'Pan, zoom, and outpainting tools',
      'Style reference and character consistency',
      'Community gallery with millions of creations'
    ],
    pros: [
      'Best overall image quality among AI generators',
      'Exceptional aesthetic sense and composition',
      'Active community of 16M+ users for inspiration',
      'Regular updates with significant quality jumps',
      'Good at understanding complex, detailed prompts',
      'Excellent for professional creative workflows'
    ],
    cons: [
      'Requires Discord — no standalone web app yet',
      'No free tier (was removed in 2023)',
      'Expensive for heavy commercial usage',
      'Less control than Stable Diffusion for technical users',
      'Images are public by default on lower plans'
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
    description: 'AI-powered code completion and chat that helps developers write better code 55% faster. Used by 1.8M+ developers.',
    longDescription: 'GitHub Copilot is the most widely adopted AI coding assistant, used by 1.8 million developers and over 50,000 organizations. Powered by OpenAI Codex and GPT-4, it provides real-time code suggestions, generates entire functions from natural language comments, and offers an inline chat for explaining and refactoring code. Key use cases include autocompleting boilerplate code, writing unit tests from existing code, translating between programming languages, explaining unfamiliar codebases, and generating documentation. Studies show Copilot helps developers complete tasks 55% faster. Alternatives include Cursor (AI-first IDE with deeper codebase understanding), Amazon CodeWhisperer (AWS-optimized, free for individuals), and Cody by Sourcegraph (codebase-aware chat). The Individual plan is $10/mo, Business $19/user/mo with organizational controls.',
    tags: ['Coding', 'Productivity', 'Subscription'],
    category: 'coding',
    pricing: 'Subscription',
    priceInfo: { startingPrice: 10, currency: 'USD', billingCycle: 'monthly', priceDescription: '$10/month for individuals, $19/user/month for business' },
    website: 'https://github.com/features/copilot',
    features: [
      'Real-time code completion across all major languages',
      'Natural language to code generation',
      'Copilot Chat for in-IDE Q&A and debugging',
      'Unit test generation from existing code',
      'Code explanation and documentation',
      'Multi-file context awareness',
      'IDE integration (VS Code, JetBrains, Neovim)',
      'Pull request summaries and reviews'
    ],
    pros: [
      '55% faster task completion (GitHub study)',
      'Supports 20+ programming languages fluently',
      'Deep integration with VS Code and JetBrains',
      'Constantly improving with GPT-4 backbone',
      'Free for verified students and OSS maintainers',
      'Enterprise security and IP protections'
    ],
    cons: [
      'Subscription required ($10-19/mo)',
      'Can suggest insecure or suboptimal patterns',
      'Privacy concerns — code sent to cloud for processing',
      'Autocomplete can be distracting in small files',
      'Less effective for niche or proprietary frameworks'
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
    description: 'AI-powered marketing copywriting platform trusted by 100,000+ brands. Create blog posts, ads, and social copy 10x faster.',
    longDescription: 'Jasper AI is the leading AI content platform purpose-built for marketing teams, trusted by 100,000+ brands including IBM, Canva, and Anthropic. Unlike general-purpose AI chatbots, Jasper is trained specifically for marketing workflows: ad copy, landing pages, email campaigns, blog posts, and social media content. Its Brand Voice feature learns your company\'s tone, terminology, and style guidelines to ensure consistent on-brand output across all content. Key use cases include generating ad variations for A/B testing, scaling blog content production, writing product descriptions, and creating email sequences. Compared to ChatGPT, Jasper offers superior marketing templates and brand controls; compared to Copy.ai, Jasper provides deeper team collaboration and workflow features. The Creator plan starts at $49/mo, with Teams at $125/mo including collaboration features.',
    tags: ['Marketing', 'Copywriting', 'Business'],
    category: 'marketing',
    pricing: 'Subscription',
    priceInfo: { startingPrice: 49, currency: 'USD', billingCycle: 'monthly', priceDescription: 'Creator $49/month, Pro $69/month' },
    website: 'https://jasper.ai',
    features: [
      '50+ marketing-specific content templates',
      'Brand Voice engine for tone consistency',
      'SEO optimization with Surfer SEO integration',
      'Multi-language content in 30+ languages',
      'Team collaboration with approval workflows',
      'Campaign brief to full content generation',
      'Chrome extension for writing anywhere',
      'Analytics dashboard for content performance'
    ],
    pros: [
      'Purpose-built for marketing — not a generic chatbot',
      'Brand Voice ensures consistent company tone',
      'Excellent template library for every marketing format',
      'Strong team collaboration and workflow tools',
      'Integrates with Surfer SEO, Grammarly, and more',
      'Active community and regular training webinars'
    ],
    cons: [
      'Expensive for solopreneurs ($49/mo minimum)',
      'Learning curve to master Brand Voice setup',
      'Output quality depends heavily on prompt engineering',
      'Limited creative writing and fiction capabilities',
      'Word limits on lower plans can be restrictive'
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
    priceInfo: { startingPrice: 0, currency: 'USD', billingCycle: 'monthly', priceDescription: 'Free tier available, Pro $20/month' },
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
    description: 'Advanced AI assistant by Anthropic with industry-leading 200K context window. Best for long documents, analysis, and safe AI.',
    longDescription: 'Claude is Anthropic\'s flagship AI assistant, built on Constitutional AI principles to be helpful, harmless, and honest. Claude 3.5 Sonnet, the latest model, matches or exceeds GPT-4o on most benchmarks while offering a massive 200K-token context window — enough to process entire books or codebases in a single conversation. Key use cases include analyzing lengthy legal documents and contracts, summarizing research papers, writing and reviewing code with full-repository context, creating detailed business reports, and having nuanced conversations about complex topics. Claude\'s key differentiator vs ChatGPT is its longer context window (200K vs 128K), superior handling of long documents, and stronger safety alignment. Compared to Gemini, Claude tends to give more carefully reasoned responses but lacks multimodal search. The free tier includes Claude 3.5 Sonnet with usage limits, while Pro ($20/mo) offers 5x higher limits and priority access.',
    tags: ['Assistant', 'Analysis', 'Writing'],
    category: 'writing',
    pricing: 'Freemium',
    priceInfo: { startingPrice: 0, currency: 'USD', billingCycle: 'monthly', priceDescription: 'Free tier available, Pro $20/month' },
    website: 'https://claude.ai',
    features: [
      '200K-token context window (entire books/codebases)',
      'Advanced reasoning and multi-step analysis',
      'PDF, image, and document upload support',
      'Artifacts for code, documents, and visualizations',
      'Constitutional AI safety alignment',
      'Code generation across major languages',
      'API access for developers (Anthropic API)',
      'Team plan with admin controls'
    ],
    pros: [
      'Industry-leading 200K context window',
      'Excellent at analyzing long, complex documents',
      'Strong safety alignment — fewer harmful outputs',
      'Artifacts feature for interactive code and visuals',
      'Thoughtful, nuanced responses on sensitive topics',
      'Competitive free tier with Sonnet model'
    ],
    cons: [
      'Slower response times than ChatGPT on some queries',
      'No web browsing or real-time information access',
      'Limited availability in some countries',
      'No image generation capability',
      'Smaller plugin/integration ecosystem than ChatGPT'
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
    priceInfo: { startingPrice: 0, currency: 'USD', billingCycle: 'monthly', priceDescription: 'Free plan available, Plus $12/month, AI add-on $10/member/month' },
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
    description: 'Leading AI video generation and editing platform. Create and edit professional videos with Gen-3 Alpha text-to-video.',
    longDescription: 'Runway ML is the pioneering platform for AI-powered video creation, trusted by Hollywood studios and independent creators alike. Their Gen-3 Alpha model generates high-quality video clips from text prompts or images, while their editing suite offers AI-powered tools like background removal, motion tracking, and style transfer. Runway\'s technology was part of the research behind Stable Diffusion. Key use cases include creating video ads and social media content from text descriptions, removing or replacing video backgrounds, adding visual effects without After Effects, generating B-roll footage, and rapid prototyping for film and animation. Compared to Pika, Runway offers superior video quality and more editing tools; compared to Sora (OpenAI), Runway is already publicly available with a proven track record. The Basic plan is free (limited credits), Standard is $15/mo, and Pro is $35/mo.',
    tags: ['Video Editing', 'AI Generation', 'Creative'],
    category: 'video',
    pricing: 'Freemium',
    website: 'https://runwayml.com',
    features: [
      'Gen-3 Alpha text-to-video generation',
      'Image-to-video animation',
      'AI background removal and replacement',
      'Style transfer and visual effects',
      'Motion tracking and object removal',
      'Collaborative editing workspace',
      'API access for developers',
      'Training custom AI models'
    ],
    pros: [
      'Most advanced publicly available text-to-video AI',
      'Professional-grade editing tools included',
      'Used by Hollywood studios (Everything Everywhere All at Once)',
      'Regular model updates with significant quality improvements',
      'Intuitive interface for non-technical users',
      'Free tier available to try before buying'
    ],
    cons: [
      'Video generation credits consumed quickly',
      'Generated videos limited to short clips (5-18 seconds)',
      'Requires powerful internet for real-time preview',
      'Expensive for heavy commercial usage',
      'AI-generated video quality still below live footage'
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
    description: 'Edit video and audio by editing text — the simplest way to create podcasts, videos, and social clips.',
    longDescription: 'Descript is a revolutionary media editing platform that lets you edit video and audio as easily as editing a Google Doc. Instead of manipulating timelines, you edit the transcript — delete a word from the text, and it disappears from the video. Used by 3M+ creators, podcasters, and marketing teams, Descript combines transcription (97% accuracy), screen recording, video editing, and AI voice cloning (Overdub) in one app. Key use cases include podcast production and editing, YouTube video creation, internal training videos, social media clip creation, and meeting recording. Compared to Adobe Premiere, Descript is dramatically easier to learn; compared to CapCut, it offers superior transcription and podcast workflows. The free plan includes 1 hour of transcription, with Hobbyist at $24/mo, Pro at $33/mo, and Business at $40/mo.',
    tags: ['Audio Editing', 'Video Editing', 'Transcription'],
    category: 'video',
    pricing: 'Freemium',
    website: 'https://descript.com',
    features: [
      'Text-based audio and video editing',
      '97% accurate AI transcription with speaker labels',
      'Overdub voice cloning for corrections',
      'Automatic filler word and silence removal',
      'Screen recording with webcam overlay',
      'Social media clip export (vertical, square)',
      'Collaborative editing with comments',
      'Stock media library and templates'
    ],
    pros: [
      'Revolutionary text-based editing — no timeline skills needed',
      'Excellent transcription accuracy (97%+)',
      'All-in-one: record, transcribe, edit, publish',
      'Overdub lets you fix mistakes without re-recording',
      'Great for podcasters and content teams',
      'Regular feature updates and improvements'
    ],
    cons: [
      'Voice cloning raises ethical questions',
      'Limited advanced color grading and effects',
      'Can be slow with very long recordings (2+ hours)',
      'Overdub requires training with your voice',
      'Pro features require paid subscription'
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
    description: 'Industry-leading AI voice generation and cloning with 300+ ultra-realistic voices in 32 languages.',
    longDescription: 'ElevenLabs is the industry leader in AI voice synthesis, producing the most human-sounding AI-generated speech available. Its technology powers audiobooks, podcasts, video narration, gaming dialogue, and accessibility tools for millions of users. The platform offers 300+ pre-built voices with granular emotional control (happiness, sadness, anger, excitement) and supports voice cloning from as little as 30 seconds of audio. Key use cases include audiobook narration at scale, YouTube and TikTok voiceovers, podcast production, e-learning course narration, and creating custom brand voices. Compared to Amazon Polly, ElevenLabs produces dramatically more natural speech; compared to Play.ht, it offers superior emotional control and voice cloning accuracy. The free tier includes 10,000 characters/month, with Starter at $5/mo, Creator at $22/mo, and Scale at $99/mo for commercial use.',
    tags: ['Voice Synthesis', 'Audio', 'Text-to-Speech'],
    category: 'audio',
    pricing: 'Freemium',
    website: 'https://elevenlabs.io',
    features: [
      'Ultra-realistic voice synthesis (near-human quality)',
      '300+ pre-built voices across 32 languages',
      'Voice cloning from 30 seconds of audio',
      'Granular emotional tone and pacing control',
      'Projects feature for long-form audiobook production',
      'Real-time streaming API for developers',
      'Voice library marketplace',
      'Sound effects and music generation'
    ],
    pros: [
      'Most realistic AI voices on the market',
      'Exceptional voice cloning accuracy',
      'Wide language support (32 languages)',
      'Professional audiobook production workflow',
      'Affordable entry point ($5/mo Starter plan)',
      'Active developer API and community'
    ],
    cons: [
      'Expensive at scale ($99/mo for commercial rights)',
      'Ethical concerns around voice cloning misuse',
      'Free tier limited to 10,000 characters/month',
      'Voice cloning requires clear, clean audio samples',
      'Some voices sound less natural in certain languages'
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
    priceInfo: { startingPrice: 0, currency: 'USD', billingCycle: 'monthly', priceDescription: 'Free tier available, Business $12.50/user/month' },
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
    description: 'The #1 collaborative design platform used by 4M+ designers. Browser-based UI/UX design, prototyping, and dev handoff.',
    longDescription: 'Figma is the industry-standard collaborative design platform used by over 4 million designers at companies like Google, Microsoft, Airbnb, and Uber. As a browser-based tool, it enables real-time multi-user editing — multiple designers can work on the same file simultaneously, making it the "Google Docs of design." Figma AI (introduced 2024) adds intelligent features like auto-layout suggestions, asset search, and design generation from text prompts. Key use cases include UI/UX design for web and mobile apps, design system creation and maintenance, interactive prototyping with animations, developer handoff with auto-generated CSS/code, and brand asset management. Compared to Sketch, Figma offers superior collaboration and cross-platform access; compared to Adobe XD (now discontinued), Figma has a much larger community and plugin ecosystem. The free Starter plan supports 3 files, Professional is $15/editor/month, and Organization is $45/editor/month.',
    tags: ['Design', 'Collaboration', 'Prototyping'],
    category: 'design',
    pricing: 'Freemium',
    priceInfo: { startingPrice: 0, currency: 'USD', billingCycle: 'monthly', priceDescription: 'Free for individuals, Professional $15/editor/month' },
    website: 'https://figma.com',
    features: [
      'Real-time multiplayer design editing',
      'Figma AI for design suggestions and generation',
      'Interactive prototyping with smart animations',
      'Design system with reusable components and variables',
      'Dev Mode with auto-generated CSS, iOS, and Android code',
      'Plugin ecosystem with 2,000+ community plugins',
      'Version history and branching',
      'FigJam whiteboard for brainstorming'
    ],
    pros: [
      'Best-in-class real-time collaboration',
      'Browser-based — works on any OS, no installation',
      'Massive community with free templates and plugins',
      'Generous free tier for individual designers',
      'Seamless developer handoff with Dev Mode',
      'Industry standard — easier to find collaborators'
    ],
    cons: [
      'Performance degrades with very large files (100+ frames)',
      'Requires internet connection (limited offline)',
      'Advanced prototyping less powerful than Principle/ProtoPie',
      'AI features still early-stage vs specialized AI tools',
      'Can be expensive for large teams ($15-45/editor/month)'
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