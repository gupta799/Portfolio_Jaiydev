import type {
  Article,
  ExperienceItem,
  Project,
  ProjectChart,
  ProjectStoryBeat,
  VisualCue,
} from '../types/portfolio'

const featuredStory = [
  {
    id: '01',
    title: 'Analysis',
    description: 'Agent SDK + fine-tuned LLM scoped migration targets using Neo4j-backed prompts.',
  },
  {
    id: '02',
    title: 'Migration workflow',
    description: 'Agent SDK executed the workflow that transformed the legacy codebase.',
  },
  {
    id: '03',
    title: 'Differential testing',
    description: 'Testing compared legacy outputs with the new microservice and fed diffs back to the Agent SDK.',
  },
] satisfies ProjectStoryBeat[]

const featuredCharts = [
  {
    id: 'loc-migrated',
    title: 'Migration velocity',
    description: 'Claude Code Agent SDK + grammar MCP scaled throughput 10x.',
    unit: 'Lines per release',
    series: [
      { label: 'Manual refactors', value: 1000, tone: 'before' },
      { label: 'Agent SDK workflow', value: 10000, tone: 'after' },
    ],
  },
] satisfies ProjectChart[]

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
    'Claude Code Agent SDK agents, backed by a grammar MCP and Neo4j graph, drove each refactor.',
  result: '3x deployments while reviewers stayed on high-signal diffs.',
  stack: ['Claude Code', 'Agent SDK', 'Custom Grammar', 'MCP Tools', 'Neo4j', 'TypeScript'],
  metrics: [
    'Agent SDK handled scripted refactors end-to-end',
    'Grammar MCP converted DSL into reviewable ASTs',
    'Graph prompts surfaced migration risk automatically',
  ],
  visuals: [
    { label: 'Fine-tuned models', icon: 'Sparkles' },
    { label: 'MCP graph orchestration', icon: 'CircuitBoard' },
    { label: 'Dependency intelligence', icon: 'Network' },
  ],
  story: featuredStory,
  charts: featuredCharts,
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
    visuals: [
      { label: 'GPU orchestration', icon: 'Cpu' },
      { label: 'LLM fine-tuning workflow', icon: 'Sparkles' },
      { label: 'Developer-friendly CLI', icon: 'ServerCog' },
    ],
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
    visuals: [
      { label: 'Knowledge distillation', icon: 'Sparkles' },
      { label: 'Transformer internals', icon: 'BrainCircuit' },
      { label: 'Efficiency tuning', icon: 'Cpu' },
    ],
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
    visuals: [
      { label: 'Concurrent Go routines', icon: 'ServerCog' },
      { label: 'Redis microservice', icon: 'Database' },
      { label: 'Containerized delivery', icon: 'Workflow' },
    ],
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
    visuals: [
      { label: 'RAG pipelines', icon: 'Layers' },
      { label: 'Vector search', icon: 'Network' },
      { label: 'LLM evaluation', icon: 'Bot' },
    ],
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

export const focusAreas: VisualCue[] = [
  { label: 'RAG (Retrieval-Augmented Generation)', icon: 'Layers' },
  { label: 'Fine-tuning (SFT, Pretraining)', icon: 'Sparkles' },
  { label: 'MCP (Model Context Protocol)', icon: 'CircuitBoard' },
  { label: 'Graph Databases', icon: 'Network' },
  { label: 'Agent Frameworks (Agent SDK, LangGraph)', icon: 'Workflow' },
  { label: 'Distributed Training', icon: 'Cpu' },
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
