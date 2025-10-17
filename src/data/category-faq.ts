import { FAQItem } from '@/components/FAQ';

type CategoryFAQMap = Record<string, FAQItem[]>;

export const categoryFAQs: CategoryFAQMap = {
  writing: [
    {
      question: "What are AI writing tools and how do they work?",
      answer: "AI writing tools use advanced natural language processing and machine learning models to help create, edit, and optimize written content. They analyze patterns from millions of text examples to generate human-like text, suggest improvements, and automate repetitive writing tasks. These tools can assist with everything from blog posts and marketing copy to technical documentation and creative fiction."
    },
    {
      question: "Are AI-generated articles considered plagiarism?",
      answer: "No, AI-generated content is not plagiarism as long as it's original and not copied from specific sources. AI writing tools create unique content based on patterns learned from training data, not by copying existing text. However, it's best practice to review and edit AI content, add your personal insights, and always cite any specific facts or data included in your content."
    },
    {
      question: "Can AI writing tools replace human writers?",
      answer: "AI writing tools are designed to augment and assist human writers, not replace them. While AI excels at generating drafts, organizing ideas, and handling repetitive tasks, human writers bring creativity, emotional intelligence, critical thinking, and unique perspectives that AI cannot replicate. The best results come from combining AI efficiency with human creativity and oversight."
    },
    {
      question: "How much do AI writing tools cost?",
      answer: "AI writing tools range from free options with limited features to premium subscriptions costing $10-100+ per month. Many tools offer freemium models with basic features free and advanced capabilities in paid tiers. Popular options like ChatGPT offer free tiers, while specialized tools like Jasper AI and Copy.ai start around $20-40/month for individual plans."
    },
    {
      question: "What's the best AI writing tool for SEO content?",
      answer: "For SEO-focused content, tools like Surfer AI, Frase, and MarketMuse excel by combining AI writing with SEO analysis. They help optimize content for target keywords, analyze competitor content, and provide data-driven recommendations for improving search rankings. The best choice depends on your specific needs, budget, and existing workflow."
    },
    {
      question: "Do I need technical skills to use AI writing tools?",
      answer: "No technical skills are required for most AI writing tools. They're designed with user-friendly interfaces that anyone can use. Simply describe what you want to write about, and the AI generates content based on your input. Most tools offer templates and guided workflows to make the process even easier for beginners."
    },
    {
      question: "Can AI writing tools write in multiple languages?",
      answer: "Yes, many modern AI writing tools support multiple languages. Leading tools like ChatGPT, Claude, and Jasper AI can write in dozens of languages including Spanish, French, German, Chinese, Japanese, and more. However, quality may vary by language, with English typically having the most refined output due to more extensive training data."
    }
  ],
  design: [
    {
      question: "What can AI design tools create?",
      answer: "AI design tools can create a wide range of visual content including logos, illustrations, UI designs, marketing graphics, product mockups, architectural visualizations, and even video content. They excel at generating original artwork from text descriptions, enhancing existing images, removing backgrounds, and automating repetitive design tasks."
    },
    {
      question: "Do I own the rights to AI-generated designs?",
      answer: "Copyright for AI-generated designs varies by tool and pricing tier. Most paid tools grant commercial usage rights, while free tiers may have restrictions. Always review the specific terms of service for your chosen tool. Some tools like Midjourney grant full commercial rights to paid subscribers, while others may require attribution or have usage limitations."
    },
    {
      question: "Can AI replace professional designers?",
      answer: "AI design tools are powerful assistants but cannot fully replace professional designers. They excel at generating initial concepts, creating variations, and handling routine tasks, but human designers bring strategic thinking, brand understanding, client communication, and refined aesthetic judgment that AI lacks. The most effective approach combines AI efficiency with human creativity and expertise."
    },
    {
      question: "How much do AI design tools cost?",
      answer: "AI design tool pricing varies widely. Free options like Canva's AI features offer basic capabilities at no cost. Specialized tools like Midjourney start at $10/month for basic plans, while professional tools like Adobe Firefly are included with Creative Cloud subscriptions ($55+/month). Many tools offer free trials so you can test before committing."
    },
    {
      question: "What's the best AI tool for logo design?",
      answer: "For logo design, tools like Looka, Brandmark, and Canva's AI logo maker are excellent choices. They specialize in creating professional brand identities with customizable elements. Each offers different strengths: Looka excels at complete brand kits, Brandmark focuses on minimalist designs, and Canva offers the most flexibility for manual editing."
    },
    {
      question: "Can AI design tools work with my existing design software?",
      answer: "Many AI design tools integrate with popular design software. Adobe Firefly integrates directly into Photoshop and Illustrator, while tools like Figma have AI plugins. Some tools export designs in standard formats (PNG, SVG, PSD) that work with any design software. Check each tool's integration capabilities to ensure compatibility with your workflow."
    },
    {
      question: "How do I write good prompts for AI design tools?",
      answer: "Effective prompts are specific and descriptive. Include details about style, colors, mood, composition, and artistic references. For example, instead of 'logo for coffee shop,' try 'minimalist coffee shop logo with steam rising from a cup, earthy brown and cream colors, modern sans-serif font, circular badge style.' Experiment with different prompts and learn from successful examples in community galleries."
    }
  ],
  coding: [
    {
      question: "What are AI coding assistants and how do they help developers?",
      answer: "AI coding assistants are tools that use machine learning to help developers write, debug, and optimize code. They provide intelligent code completions, suggest implementations based on comments, identify bugs, generate tests, write documentation, and even explain complex code. Popular examples include GitHub Copilot, Amazon CodeWhisperer, and TabNine."
    },
    {
      question: "Are AI-generated code suggestions secure?",
      answer: "Security depends on how you use AI coding tools. While these tools learn from vast code repositories, they don't intentionally suggest malicious code. However, always review AI suggestions carefully, especially for security-critical code. Leading tools like GitHub Copilot have built-in filters to prevent suggesting known vulnerabilities or sensitive data. Never blindly accept suggestions without understanding them."
    },
    {
      question: "Will AI coding tools take developers' jobs?",
      answer: "AI coding tools are designed to make developers more productive, not replace them. They handle boilerplate code and routine tasks, freeing developers to focus on architecture, problem-solving, and innovation. Studies show developers using AI tools are more satisfied and productive. The demand for skilled developers continues to grow, and those who effectively use AI tools have a competitive advantage."
    },
    {
      question: "How much do AI coding tools cost?",
      answer: "Pricing varies widely. GitHub Copilot costs $10/month for individuals ($100/year), Amazon CodeWhisperer offers a generous free tier, and TabNine has free and premium options starting at $12/month. Many enterprise tools charge per-seat for teams. Some tools like ChatGPT and Claude offer free tiers that can assist with coding questions and code generation."
    },
    {
      question: "What programming languages do AI coding tools support?",
      answer: "Modern AI coding tools support dozens of programming languages. GitHub Copilot works with JavaScript, Python, TypeScript, Ruby, Go, Java, C++, C#, PHP, and many more. Most tools perform best with popular languages due to more training data, but they can assist with virtually any programming language, including newer ones and domain-specific languages."
    },
    {
      question: "Can AI coding tools help me learn programming?",
      answer: "Absolutely! AI coding tools are excellent learning aids. They can explain complex code, suggest best practices, help debug errors, and answer programming questions. However, use them wisely: try to solve problems yourself first, then use AI to check your solution or get unstuck. Understanding why code works is more important than just getting working code."
    },
    {
      question: "Do AI coding tools work offline?",
      answer: "Most AI coding tools require an internet connection because they process requests on remote servers. However, some tools like TabNine offer offline modes with reduced functionality. These offline versions use smaller models that run locally on your machine, providing basic code completion without internet access, though with less sophisticated suggestions than their online counterparts."
    }
  ],
  marketing: [
    {
      question: "How can AI tools improve marketing ROI?",
      answer: "AI marketing tools improve ROI by automating repetitive tasks, personalizing customer experiences at scale, optimizing ad spending through predictive analytics, generating high-converting copy, and providing real-time insights for faster decision-making. Companies using AI marketing tools report 30-50% improvements in campaign efficiency and 20-40% reduction in customer acquisition costs."
    },
    {
      question: "What marketing tasks can AI automate?",
      answer: "AI can automate email marketing, social media posting, ad campaign optimization, content creation, customer segmentation, lead scoring, chatbot responses, report generation, A/B testing, and performance analysis. This automation frees marketers to focus on strategy, creative direction, and relationship building while AI handles data-intensive and repetitive tasks."
    },
    {
      question: "Are AI marketing tools suitable for small businesses?",
      answer: "Yes, AI marketing tools are particularly valuable for small businesses with limited resources. Many tools offer affordable plans starting at $20-50/month that provide enterprise-level capabilities. They help small teams compete with larger competitors by automating tasks that would otherwise require multiple full-time employees. Free tiers and trials let you test before investing."
    },
    {
      question: "Can AI write effective marketing copy?",
      answer: "AI can generate effective marketing copy that often performs well in A/B tests. Tools like Jasper AI and Copy.ai are trained on high-converting examples and can create compelling headlines, ad copy, email sequences, and product descriptions. However, the best results come from using AI as a starting point, then refining the output with human creativity and brand knowledge."
    },
    {
      question: "How do AI tools help with email marketing?",
      answer: "AI email marketing tools optimize send times, personalize subject lines and content for each recipient, predict which subscribers are likely to engage or unsubscribe, automate follow-up sequences, generate email copy, and A/B test different variations. This personalization at scale can dramatically improve open rates, click-through rates, and conversion rates."
    },
    {
      question: "What's the learning curve for AI marketing tools?",
      answer: "Most AI marketing tools are designed to be user-friendly with minimal learning curve. Basic features can be mastered in hours, while advanced capabilities may take days or weeks of practice. Many tools offer excellent onboarding, tutorials, and templates to help new users get started quickly. The key is starting with simple use cases and gradually expanding as you become more comfortable."
    },
    {
      question: "Can AI predict customer behavior accurately?",
      answer: "AI predictive analytics can forecast customer behavior with surprising accuracy, typically 70-90% depending on the use case and data quality. AI analyzes patterns in historical data to predict future actions like purchases, churn, and engagement. However, predictions are probabilities, not certainties. The best results come from combining AI insights with human judgment and domain expertise."
    }
  ],
  productivity: [
    {
      question: "How can AI tools boost productivity?",
      answer: "AI productivity tools automate routine tasks, intelligently organize information, provide smart suggestions, facilitate better collaboration, and help you focus on high-value work. They can schedule meetings, summarize documents, transcribe conversations, manage emails, create task priorities, and even predict how long tasks will take. Users report saving 5-15 hours per week on average."
    },
    {
      question: "What are the best AI tools for time management?",
      answer: "Top AI time management tools include Motion (AI-powered calendar and task management), Clockwise (smart meeting scheduling), Reclaim AI (automatic time blocking), and Trevor AI (daily planning assistant). These tools analyze your schedule, priorities, and working patterns to automatically optimize your calendar and suggest the best times for focused work, meetings, and breaks."
    },
    {
      question: "Can AI help reduce meeting overload?",
      answer: "Yes, AI meeting tools can significantly reduce meeting time. Tools like Otter.ai and Fireflies.ai transcribe and summarize meetings, so not everyone needs to attend. Clockwise and Motion optimize meeting schedules to minimize context switching. AI assistants can even attend meetings on your behalf, take notes, and provide summaries, allowing you to skip non-essential meetings while staying informed."
    },
    {
      question: "How do AI productivity tools integrate with existing tools?",
      answer: "Most AI productivity tools offer extensive integrations with popular platforms like Google Workspace, Microsoft 365, Slack, Notion, Asana, and Trello. They connect via APIs to sync data, automate workflows, and surface insights across your existing toolstack. Many also offer Zapier integration for connecting with thousands of additional apps. Check each tool's integration page for specific compatibility."
    },
    {
      question: "Are AI productivity tools secure for business use?",
      answer: "Reputable AI productivity tools implement enterprise-grade security including encryption, SOC 2 compliance, GDPR compliance, and regular security audits. However, security levels vary by provider. For business use, choose tools with clear security certifications, data privacy policies, and enterprise plans with additional security features like SSO, audit logs, and data residency options."
    },
    {
      question: "Can AI tools help with focus and reducing distractions?",
      answer: "AI tools can help maintain focus through intelligent notification management, automatic do-not-disturb modes, distraction blocking, and focus time scheduling. Tools like Brain.fm use AI-generated music for concentration, while RescueTime and Clockwise analyze your work patterns to suggest optimal focus periods. Some tools even predict when you're likely to be distracted and proactively minimize interruptions."
    },
    {
      question: "What's the ROI of investing in AI productivity tools?",
      answer: "The ROI of AI productivity tools is typically substantial. If a tool saves even 5 hours per week and you value your time at $50/hour, that's $250/week or $13,000/year in value. Most tools cost $10-30/month, delivering ROI of 40-100x or more. Beyond time savings, benefits include reduced stress, improved work quality, and better work-life balance, which are harder to quantify but equally valuable."
    }
  ]
};

export const generateCategoryFAQs = (category: string): FAQItem[] => {
  return categoryFAQs[category.toLowerCase()] || [];
};
