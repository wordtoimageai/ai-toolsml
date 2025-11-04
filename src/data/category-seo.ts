export interface CategorySEO {
  title: string;
  description: string;
  keywords: string;
}

export const categorySEOData: Record<string, CategorySEO> = {
  writing: {
    title: "AI Writing & Content Tools - Curated Directory of 45+ AI Writing Assistants | ToolsML",
    description: "Discover 45+ AI writing and content tools tested for quality, with unbiased reviews and smart recommendations for creators and professionals.",
    keywords: "ai writing tools, ai content creation, writing assistant, gpt writing, content ai, blog ai, marketing copy ai, ai copywriting, content generation"
  },
  design: {
    title: "Design & Creative AI Tools - Image Generators, Editors, and Design Tools | ToolsML",
    description: "Explore 38+ AI design tools including image generators and editors. Find trusted, up-to-date reviews for creativity and streamlined workflows.",
    keywords: "ai design tool, ai image generator, creative ai, design automation, image editing ai, design workflow, art ai, graphic design ai"
  },
  coding: {
    title: "AI Development Tools: Assistants, Automation & Coding Solutions | ToolsML",
    description: "52+ AI-powered development tools for coding, automation, debugging, and documentation to boost productivity and software quality.",
    keywords: "ai coding tool, code assistant, ai developer tool, automated coding, ai code reviewer, ai programming, github copilot, code generation"
  },
  marketing: {
    title: "Marketing AI Tools: Campaign Tools & Analytics Platforms | ToolsML",
    description: "Discover 31+ marketing AI tools with in-depth reviews, pricing, features, and user insights to optimize campaigns and analytics.",
    keywords: "ai marketing tool, campaign analytics, marketing automation, ai ad copy, seo ai, competitor analysis ai, marketing optimization"
  },
  productivity: {
    title: "Productivity AI Tools for Workflow Automation and Optimization | ToolsML",
    description: "41+ productivity AI tools for workflow automation, smart recommendations, and unbiased comparisons to optimize your processes efficiently.",
    keywords: "ai productivity tool, workflow automation, business automation ai, time management ai, ai optimization, task automation"
  },
  video: {
    title: "Video & Media AI Tools - Creation, Editing, and Enhancement | ToolsML",
    description: "29+ AI-powered video tools for creation, editing, effects, subtitles, and automated production to elevate your video projects.",
    keywords: "ai video tool, video editing ai, video enhancement ai, subtitles ai, automated video creation, video production ai"
  },
  research: {
    title: "Research & Analytics AI Tools - Data Analysis & Information Discovery | ToolsML",
    description: "24+ AI tools for research and analytics: data analysis, insights, and discovery with detailed reviews and user feedback.",
    keywords: "ai analytics tool, data analysis ai, ai research tool, information discovery ai, research automation ai, data insights"
  },
  audio: {
    title: "Audio & Music Generation AI Tools - Sound & Voice Creation | ToolsML",
    description: "45+ AI tools for creating music, sound effects, voiceovers, and podcasts with advanced synthesis and voice cloning.",
    keywords: "ai audio tool, music generation ai, voice cloning ai, sound effects ai, audio synthesis ai, podcast ai, voice ai"
  },
  "image-generation": {
    title: "AI Image Generation Tools - Create Stunning Images from Text | ToolsML",
    description: "Discover the best AI image generation tools including Midjourney, DALL-E, and Stable Diffusion. Compare features, pricing, and quality.",
    keywords: "ai image generation, text to image, ai art generator, dall-e, midjourney, stable diffusion, ai artwork, image ai"
  },
  "developer-tools": {
    title: "AI Developer Tools - Code Completion, Testing & Automation | ToolsML",
    description: "Professional AI developer tools for code completion, testing, debugging, and CI/CD automation. Boost your development workflow.",
    keywords: "ai developer tools, code completion, automated testing, ci cd ai, development automation, code quality ai"
  },
  chatbots: {
    title: "AI Chatbots - Conversational AI & Customer Service Automation | ToolsML",
    description: "Best AI chatbot platforms for customer service, sales, and support. Compare features, integrations, and pricing of top chatbot solutions.",
    keywords: "ai chatbot, conversational ai, customer service ai, chat automation, support bot, ai assistant, chatgpt alternatives"
  },
  "machine-learning": {
    title: "Machine Learning & AI Models – Tools for Training and Deployment | ToolsML",
    description: "60+ AI tools for machine learning model training, deployment, and management with pre-built models and custom training platforms.",
    keywords: "ai model tool, machine learning platform, ai training tool, ml deployment, ai custom model, model training, ml ops"
  },
  "document-processing": {
    title: "AI Document Processing - OCR, Extraction & Analysis Tools | ToolsML",
    description: "Advanced AI tools for document processing, OCR, data extraction, and intelligent document analysis. Automate your document workflows.",
    keywords: "ai document processing, ocr ai, document extraction, document analysis ai, pdf processing, document automation"
  },
  data: {
    title: "AI Data Tools - Analysis, Visualization & Data Science | ToolsML",
    description: "Professional AI data tools for analysis, visualization, and data science. Transform your data into actionable insights.",
    keywords: "ai data tools, data analysis ai, data visualization, data science ai, business intelligence ai, data insights"
  },
  automation: {
    title: "AI Automation Tools - Workflow & Business Process Automation | ToolsML",
    description: "Powerful AI automation tools for workflows, business processes, and task automation. Streamline operations and boost efficiency.",
    keywords: "ai automation, workflow automation, business process automation, rpa ai, task automation, process optimization"
  }
};

export const getCategorySEO = (category: string): CategorySEO => {
  const categoryKey = category.toLowerCase();
  return categorySEOData[categoryKey] || {
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} AI Tools - Best ${category} Solutions 2025 | ToolsML`,
    description: `Discover the best AI tools for ${category}. Compare features, pricing, and reviews to find the perfect solution for your needs.`,
    keywords: `${category} ai tools, ${category} artificial intelligence, ${category} automation, best ${category} tools`
  };
};
