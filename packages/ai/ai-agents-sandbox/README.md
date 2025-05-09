# AI Agents Sandbox

A modern web application for experimenting with different AI agent patterns and architectures.

## Features

- **Multiple Agent Types**: Test different agent architectures including multi-step tool usage, sequential processing, routing, parallel processing, orchestrator-worker pattern, and evaluator-optimizer pattern.
- **Responsive Design**: Works on both desktop and mobile devices with a dedicated mobile interface.
- **Modern UI**: Built with Next.js, React, and Tailwind CSS.
- **Tool Usage**: Demonstration of AI tools for solving complex problems.
- **Real-time Feedback**: Visual feedback on agent processing stages.
- **Token Counting**: Track token usage across agent interactions.

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ai-agents-sandbox.git
   cd ai-agents-sandbox
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add your API keys:
   ```
   OPENAI_API_KEY=your_openai_api_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Agent Types

- **Multi-step Tool Usage**: An agent that can use tools in multiple steps to solve complex problems.
- **Sequential Processing**: Process content through a series of sequential steps.
- **Routing**: Route to specialized agents based on query classification.
- **Parallel Processing**: Process content in parallel using multiple agents.
- **Orchestrator-Worker**: Use an orchestrator to plan and delegate tasks to worker agents.
- **Evaluator-Optimizer**: Evaluate and optimize content through multiple iterations.

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [OpenAI SDK](https://www.npmjs.com/package/openai) - AI integration
- [Motion](https://motion.dev/) - Animation library
- [Radix UI](https://www.radix-ui.com/) - UI primitives

## Project Structure

```
ai-agents-sandbox/
├── app/                 # Next.js app directory
│   ├── actions.tsx      # Server actions for agent API calls
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout component
│   └── page.tsx         # Main page component
├── components/          # React components
│   ├── agent-states/    # Agent state components
│   ├── effects/         # Visual effects components
│   ├── icons/           # SVG icon components
│   ├── mobile/          # Mobile-specific components
│   ├── tabs/            # Tab components for output display
│   ├── ui/              # Shared UI components
│   └── ...              # Other components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and types
│   ├── animations.ts    # Animation definitions
│   ├── rate-limit.ts    # Rate limiting utilities
│   ├── types.ts         # TypeScript type definitions
│   └── utils.ts         # General utility functions
├── public/              # Static assets
└── ...                  # Configuration files
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenAI for their AI APIs
- Vercel for hosting and infrastructure
- Shadcn UI for component inspiration
