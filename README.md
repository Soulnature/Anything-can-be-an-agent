# Anything Can Be an Agent

![Catalog](https://img.shields.io/badge/catalog-128%20projects-blue)
![Domains](https://img.shields.io/badge/domains-9-green)
![Blueprint](https://img.shields.io/badge/architecture-included-black)
![Registry](https://img.shields.io/badge/data-results.json-orange)

An integration-first map of the modern AI agent ecosystem, designed to go beyond discovery and all the way to system design.

This repository answers three practical questions:

1. Which open-source AI agent projects are worth paying attention to right now?
2. How do those projects fit into a coherent product architecture?
3. What should a real multi-agent application built from this ecosystem actually look like?

Instead of stopping at a repo list, this project turns ecosystem research into an application blueprint.

> I mapped **128** recent open-source AI agent repositories across **9 domains**, organized them into an integration-ready registry, and turned that research into a concrete product architecture.

## Table of Contents

- [Why This Repository Exists](#why-this-repository-exists)
- [Results at a Glance](#results-at-a-glance)
- [Featured Insights](#featured-insights)
- [Featured Projects](#featured-projects)
- [What Makes This Different](#what-makes-this-different)
- [The Concrete Product Direction](#the-concrete-product-direction)
- [Repository Structure](#repository-structure)
- [Suggested Reading Path](#suggested-reading-path)
- [How To Use This Repo](#how-to-use-this-repo)
- [Promotion Strategy](#promotion-strategy)
- [Roadmap](#roadmap)
- [Update Log](#update-log)
- [License and Reuse](#license-and-reuse)

## Why This Repository Exists

The open-source agent space is growing fast, but most collections have one of two problems:

- they are just long lists with little system-level thinking
- they propose architectures without grounding them in the actual ecosystem

This repository connects both sides:

- curated ecosystem research
- integration-oriented classification
- layered system design
- one concrete target app architecture

The core idea is simple:

> Anything can become an agent if it can be given a role, connected to tools, grounded in context, and coordinated by a runtime.

## Results at a Glance

This project currently includes:

- **128** curated open-source AI agent repositories
- **9** major domains
- **1** layered integration blueprint
- **1** concrete app architecture
- **1** machine-readable registry for downstream use

### Domain Coverage

| Domain | Count |
| :--- | :--- |
| Bioinformatics, Deep Learning & Healthcare | 18 |
| Autonomous Coding & Software Engineering | 18 |
| Scientific Research & Data Analysis | 18 |
| Multi-Agent Systems & Frameworks | 18 |
| Financial & Quantitative Trading | 16 |
| Personal Assistants & Productivity Tools | 16 |
| Astronomy & Space Science | 6 |
| Physics & Simulation | 6 |
| Industrial Manufacturing & Robotics | 12 |

### What You Can Use Immediately

| Artifact | What It Gives You |
| :--- | :--- |
| [results.md](/Users/xingzhong/Documents/Anything-can-be-an-agent/results.md) | The full curated catalog with roles and integration hints |
| [results.json](/Users/xingzhong/Documents/Anything-can-be-an-agent/results.json) | A structured registry you can reuse for tooling, routing, filtering, or app generation |
| [integration_blueprint.md](/Users/xingzhong/Documents/Anything-can-be-an-agent/integration_blueprint.md) | A layered view of how the ecosystem fits together as one platform |
| [specific_app_architecture.md](/Users/xingzhong/Documents/Anything-can-be-an-agent/specific_app_architecture.md) | One concrete product architecture: a Hybrid Agent Workspace |

## Featured Insights

These are the main takeaways from the catalog and architecture work.

- The ecosystem is large enough to support real product assembly, not just experimentation.
- Multi-agent frameworks are no longer the whole story; the most useful systems combine orchestration, tool layers, memory, and specialist workers.
- Coding agents, research agents, and domain agents are converging into one broader product category: the agent workspace.
- The strongest reusable layer is not a domain-specific agent. It is the orchestration and tool-control layer.
- Domain-specific packs are best treated as mounted capabilities, not as the application foundation.
- `results.json` is one of the most reusable artifacts in this repository because it turns ecosystem research into buildable data.

## Featured Projects

These are representative projects from the catalog that are especially useful as building blocks.

### Orchestration and Frameworks

- [openai-agents-python](https://github.com/openai/openai-agents-python)
- [camel](https://github.com/camel-ai/camel)
- [microsoft/agent-framework](https://github.com/microsoft/agent-framework)
- [MetaGPT](https://github.com/FoundationAgents/MetaGPT)

### Coding Agents

- [codex](https://github.com/openai/codex)
- [opencode](https://github.com/anomalyco/opencode)
- [cline](https://github.com/cline/cline)
- [goose](https://github.com/block/goose)

### Research and Scientific Agents

- [AI-Scientist-v2](https://github.com/SakanaAI/AI-Scientist-v2)
- [robin](https://github.com/Future-House/robin)
- [InternAgent](https://github.com/InternScience/InternAgent)
- [Biomni](https://github.com/snap-stanford/Biomni)

### Tooling and MCP

- [chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp)
- [medical-mcps](https://github.com/pascalwhoop/medical-mcps)
- [quantcontext-mcp-server](https://github.com/zomma-dev/quantcontext-mcp-server)
- [OpenSandbox](https://github.com/alibaba/OpenSandbox)

### Industrial and Domain Specialists

- [sample-agentic-ai-robot](https://github.com/aws-samples/sample-agentic-ai-robot)
- [agentic-digital-warehouse](https://github.com/Hanan-Nahas/agentic-digital-warehouse)
- [MedicalGraphRAG](https://github.com/OpenGraphRAG/MedicalGraphRAG)
- [BitQuant](https://github.com/OpenGradient/BitQuant)

## What Makes This Different

This is not just an awesome-list replacement.

This repository is designed to be useful for:

- founders deciding what kind of agent product to build
- engineers choosing an agent stack
- researchers tracking the ecosystem
- teams trying to combine multiple open-source agent projects into one product

In practice, it gives you:

- discovery
- comparison
- categorization
- architecture guidance
- a concrete implementation direction

## The Concrete Product Direction

The repository does not stop at analysis. It already proposes one specific product model:

### Hybrid Agent Workspace

A supervisor-centered multi-agent application with:

- one shared workspace UI
- one orchestration core
- one planner / router
- one research worker
- one coding worker
- one tool execution layer
- one memory and retrieval layer
- optional domain specialist packs

Read [specific_app_architecture.md](/Users/xingzhong/Documents/Anything-can-be-an-agent/specific_app_architecture.md) for the full system design.

## Repository Structure

| File | Purpose |
| :--- | :--- |
| [results.md](/Users/xingzhong/Documents/Anything-can-be-an-agent/results.md) | Human-readable ecosystem catalog |
| [results.json](/Users/xingzhong/Documents/Anything-can-be-an-agent/results.json) | Machine-readable integration registry |
| [integration_blueprint.md](/Users/xingzhong/Documents/Anything-can-be-an-agent/integration_blueprint.md) | Layered integration blueprint |
| [specific_app_architecture.md](/Users/xingzhong/Documents/Anything-can-be-an-agent/specific_app_architecture.md) | Specific app architecture |
| [plan.md](/Users/xingzhong/Documents/Anything-can-be-an-agent/plan.md) | Original collection brief |

## Suggested Reading Path

1. Start with this README for the high-level positioning.
2. Open [results.md](/Users/xingzhong/Documents/Anything-can-be-an-agent/results.md) to browse the ecosystem.
3. Use [results.json](/Users/xingzhong/Documents/Anything-can-be-an-agent/results.json) if you want to build tools or datasets on top of the catalog.
4. Read [integration_blueprint.md](/Users/xingzhong/Documents/Anything-can-be-an-agent/integration_blueprint.md) to see how the pieces fit together.
5. Read [specific_app_architecture.md](/Users/xingzhong/Documents/Anything-can-be-an-agent/specific_app_architecture.md) for the concrete target application.

## How To Use This Repo

### If you want to explore the ecosystem

Use [results.md](/Users/xingzhong/Documents/Anything-can-be-an-agent/results.md).

### If you want to build a dataset or internal tool

Use [results.json](/Users/xingzhong/Documents/Anything-can-be-an-agent/results.json).

### If you want to design an agent platform

Use [integration_blueprint.md](/Users/xingzhong/Documents/Anything-can-be-an-agent/integration_blueprint.md).

### If you want one concrete product direction

Use [specific_app_architecture.md](/Users/xingzhong/Documents/Anything-can-be-an-agent/specific_app_architecture.md).

## Promotion Strategy

If you want this GitHub repository to spread, the strongest channels are not generic self-promotion. The best strategy is to make the repository easy to reference and easy to reuse.

### Best Ways to Promote It

1. Post a concise launch thread on X, LinkedIn, and relevant Reddit communities with a strong hook such as: `I mapped 128 recent open-source AI agent projects across 9 domains and turned them into a real product architecture.`
2. Publish a short companion article on Medium, Substack, or Dev.to summarizing the main insights and linking back here.
3. Share the `results.json` angle, not just the markdown catalog. Builders are more likely to save and share a reusable dataset than a list alone.
4. Turn 5-10 standout projects from the catalog into visual comparison posts and link the full repository as the source.
5. Submit the repository to Hacker News, Lobsters, and AI engineering communities when you add meaningful updates, not only once.
6. Add periodic updates such as `v2`, `new domains`, `new architecture`, or `new benchmark section` so the repo becomes a living resource instead of a one-time drop.
7. Reach out directly to maintainers of featured projects and tell them they are included. Some of them will reshare it if the write-up is credible.

### What Makes It Shareable

People are most likely to share this repository if they can immediately understand:

- how much work went into it
- what problem it solves
- why it is better than a plain repo list
- how they can use it themselves

That is why the README surfaces the outcome directly instead of forcing visitors to click around first.

## Roadmap

- add update cadence and versioned snapshots
- add benchmark and evaluation coverage
- add visual system diagrams
- add agent stack comparison tables
- turn the specific app architecture into an actual implementation
- build a small web interface on top of `results.json`

## Update Log

### v1

- collected and filtered 128 recent open-source AI agent repositories
- expanded coverage to 9 domains
- added an English human-readable catalog
- added a machine-readable registry in `results.json`
- added a layered integration blueprint
- added one concrete product architecture: `Hybrid Agent Workspace`
- upgraded the README to present the results directly on the front page

## License and Reuse

If you want to expand this project, the best reuse path is:

- keep `results.json` as the source of truth
- treat `results.md` as the human-facing catalog
- evolve the blueprint and architecture as the ecosystem changes

This repository is meant to be both a landscape map and a buildable starting point.
