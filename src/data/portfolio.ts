export type Project = {
  title: string
  subtitle: string
  role: string
  period: string
  description: string
  result: string
  stack: string[]
  metrics?: string[]
  link?: string
}

export type ExperienceItem = {
  company: string
  role: string
  period: string
  summary: string
  highlights: string[]
}

export type Article = {
  title: string
  description: string
  link: string
  year: string
}

export const hero = {
  location: 'AI Strategy & Innovation Engineer at Visa · San Francisco, California',
  headline: 'AI-powered innovation at scale for enterprise payments.',
  highlights: [
    'Led 10M+ LOC migration with Claude Code + fine-tuned models',
    'Built CLI tool enabling 20+ teams to fine-tune on GPU clusters',
  ],
}

export const featuredProject: Project = {
  title: 'Enterprise Codebase Migration with AI',
  subtitle: 'Visa VAS Innovation Labs · AI-powered transformation of 10M+ LOC',
  role: 'AI Strategy & Innovation Engineer',
  period: '2024 — 2025',
  description:
    'Led a 10M-line migration with Claude Code plus a custom fine-tune, orchestrated through an MCP graph that kept refactors context-aware.',
  result:
    'Shipped the migration without downtime while the graph-guided workflow prevented breaking changes.',
  stack: ['Claude Code', 'Fine-tuned LLM', 'MCP Server', 'Graph Database', 'Python', 'TypeScript'],
  metrics: [
    '10M lines migrated with AI-assisted refactoring',
    'MCP + graph database kept dependency context live',
    'Fine-tuned model hit 85% on domain-specific transformations',
  ],
}

export const supportingProjects: Project[] = [
  {
    title: 'Enterprise Fine-Tuning CLI Tool',
    subtitle: 'Visa VAS Innovation Labs · Distributed GPU cluster orchestration',
    role: 'ML Infrastructure Engineer',
    period: '2024',
    description:
      'Architected and built a CLI-based fine-tuning service that democratized access to Visa\'s GPU clusters. The tool abstracts away infrastructure complexity, allowing engineers to submit fine-tuning jobs with simple commands while the system handles distributed training, resource allocation, and model versioning.',
    result:
      'Enabled 20+ teams across Visa to fine-tune custom models without requiring deep ML infrastructure knowledge. Reduced time-to-fine-tune from weeks to hours and significantly lowered the barrier to entry for AI experimentation.',
    stack: ['Python', 'CLI', 'GPU Clusters', 'PyTorch', 'Distributed Training', 'Docker', 'Kubernetes'],
  },
  {
    title: 'BERT Knowledge Distillation',
    subtitle: 'Machine Learning Research · Advanced NLP model optimization',
    role: 'ML Engineer',
    period: 'Oct 2024 — Jan 2025',
    description:
      'Implemented knowledge distillation techniques to compress large BERT models while maintaining performance. Focused on creating efficient, production-ready models that balance accuracy with computational efficiency for real-world deployment.',
    result:
      'Successfully reduced model size and inference time while preserving the core capabilities of BERT, making advanced NLP accessible for resource-constrained environments.',
    stack: ['Python', 'PyTorch', 'Transformers', 'BERT', 'Machine Learning'],
    link: 'https://github.com/gupta799/LLMFinetuning',
  },
  {
    title: 'Go Microservice API',
    subtitle: 'Personal Project · Scalable concurrent API with Redis integration',
    role: 'Backend Developer',
    period: '2024',
    description:
      'Built a fast and scalable microservice architecture using Go, demonstrating concurrent request handling with goroutines. The API communicates with a Redis-based microservice (RagRedis) for data operations, showcasing modern backend patterns and Go concurrency.',
    result:
      'Delivered a production-ready microservice with efficient concurrent processing, modular architecture, and containerized deployment support.',
    stack: ['Go', 'Redis', 'Docker', 'RESTful API', 'Goroutines', 'Microservices'],
    link: 'https://github.com/gupta799/go_api',
  },
  {
    title: 'JaiydevRAG',
    subtitle: 'Personal Project · RAG pattern experimentation and AI model exploration',
    role: 'ML Engineer',
    period: '2024',
    description:
      'Personal experimentation with Retrieval-Augmented Generation (RAG) patterns and exploring different AI models. Focused on understanding vector search, embeddings, and how to effectively combine retrieval with language model generation.',
    result:
      'Gained hands-on experience with cutting-edge RAG techniques and practical knowledge of different AI model architectures and their applications.',
    stack: ['Python', 'Vector Search', 'LLMs', 'Embeddings', 'RAG Patterns'],
    link: 'https://github.com/gupta799/JaiydevRAG',
  },
]

export const experiences: ExperienceItem[] = [
  {
    company: 'Visa',
    role: 'AI Strategy & Innovation Engineer',
    period: '2023 — Present',
    summary:
      'Driving AI strategy and innovation at VAS Innovation Labs, building infrastructure and frameworks to enable a 4000-person organization to leverage AI at scale.',
    highlights: [
      'Built agent framework using Agent SDK and LangGraph, enabling VAS 4000-person org to deploy AI agents across payments infrastructure.',
      'Led technology deduplication and realignment across VAS verticals, supporting 10+ downstream projects with unified AI tooling.',
      'Architected enterprise CLI fine-tuning tool, enabling 20+ teams to leverage Visa GPU clusters without ML infrastructure expertise.',
      'Led 10M+ line codebase migration using Claude Code with custom fine-tuned models and graph database integration via MCP servers.',
    ],
  },
  {
    company: 'The Ohio State University',
    role: 'Student & Software Engineer',
    period: '2018 — 2022',
    summary:
      'Completed undergraduate degree while building full-stack applications, compilers, and network programming projects.',
    highlights: [
      'Developed TA Registration App using Ruby on Rails for academic administration.',
      'Built Budget Builder App with MERN stack for personal finance management.',
      'Implemented Bug Language Compiler and Weather App with socket programming.',
    ],
  },
]

export const focusAreas: string[] = [
  'RAG (Retrieval-Augmented Generation)',
  'Fine-tuning (SFT, Pretraining)',
  'MCP (Model Context Protocol)',
  'Graph Databases',
  'Agent Frameworks (Agent SDK, LangGraph)',
  'Distributed Training',
]

export const articles: Article[] = [
  {
    title: 'Migrating 10M Lines of Code with AI: Lessons from the Trenches',
    description:
      'How we leveraged Claude Code, fine-tuned models, and graph databases to orchestrate an enterprise-scale codebase migration.',
    link: 'https://linkedin.com/in/jaiydev-gupta-408269160/',
    year: '2024',
  },
  {
    title: 'Building MCP Servers for Enterprise AI Integration',
    description:
      'Practical patterns for connecting Claude with graph databases and internal systems using Model Context Protocol.',
    link: 'https://linkedin.com/in/jaiydev-gupta-408269160/',
    year: '2024',
  },
  {
    title: 'Democratizing AI: A CLI Tool for Fine-Tuning at Scale',
    description:
      'How we built infrastructure that enabled 20+ teams to fine-tune models on GPU clusters without ML expertise.',
    link: 'https://linkedin.com/in/jaiydev-gupta-408269160/',
    year: '2024',
  },
]
