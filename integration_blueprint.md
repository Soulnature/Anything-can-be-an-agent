# AI Agent Integration Blueprint

This document turns the repository catalog into a practical integration model. It is meant to help you assemble a production-grade agent application rather than just browse repositories.

## 1. Design Goal

Build an agent platform with clear separation of concerns:

- one orchestration core
- one or more planning / routing agents
- specialized worker agents
- tool and data connectors
- memory / context infrastructure
- user-facing interfaces
- optional domain packs for vertical use cases

This keeps the system composable. You can replace a layer without redesigning the rest of the stack.

## 2. Recommended Layered Architecture

### Layer 1: Orchestration Core

This layer owns agent lifecycle, routing, execution policy, retries, and cross-agent communication.

| Role in System | Recommended Projects | Why They Fit |
| :--- | :--- | :--- |
| Primary runtime | [openai-agents-python](https://github.com/openai/openai-agents-python), [camel](https://github.com/camel-ai/camel), [microsoft/agent-framework](https://github.com/microsoft/agent-framework) | Strong starting point for multi-agent control flow, delegation, and durable orchestration. |
| Enterprise orchestration | [conductor](https://github.com/conductor-oss/conductor), [trigger.dev](https://github.com/triggerdotdev/trigger.dev), [Tracecat](https://github.com/TracecatHQ/tracecat) | Better fit when you need workflow reliability, scheduling, retries, and background execution. |
| Flexible framework layer | [mastra](https://github.com/mastra-ai/mastra), [pydantic-ai](https://github.com/pydantic/pydantic-ai), [agent-framework](https://github.com/microsoft/agent-framework) | Good for type-safe composition and application-level agent wiring. |

### Layer 2: Planner and Router Agents

This layer decides which worker to call, how to break tasks into steps, and when to stop or escalate.

| Role in System | Recommended Projects | Why They Fit |
| :--- | :--- | :--- |
| Task planner | [MetaGPT](https://github.com/FoundationAgents/MetaGPT), [PraisonAI](https://github.com/MervinPraison/PraisonAI), [agency-swarm](https://github.com/VRSEN/agency-swarm) | Useful for decomposing large tasks into role-based execution. |
| Research router | [MindSearch](https://github.com/InternLM/MindSearch), [DeepResearchAgent](https://github.com/SkyworkAI/DeepResearchAgent), [robin](https://github.com/Future-House/robin) | Useful when the system must search, read, compare, and synthesize. |
| Project / workflow router | [agentic-project-management](https://github.com/sdi2200262/agentic-project-management), [mission-control](https://github.com/builderz-labs/mission-control), [OxyGent](https://github.com/jd-opensource/OxyGent) | Better fit for structured task queues, multi-step delivery, and operational oversight. |

### Layer 3: Specialist Worker Agents

These agents do the actual work after planning.

| Worker Type | Recommended Projects | Best Use |
| :--- | :--- | :--- |
| Coding workers | [codex](https://github.com/openai/codex), [opencode](https://github.com/anomalyco/opencode), [cline](https://github.com/cline/cline), [goose](https://github.com/block/goose) | Code generation, refactoring, debugging, command execution, and repository operations. |
| Research workers | [AI-Scientist-v2](https://github.com/SakanaAI/AI-Scientist-v2), [autoresearch](https://github.com/karpathy/autoresearch), [InternAgent](https://github.com/InternScience/InternAgent), [open-data-scientist](https://github.com/togethercomputer/open-data-scientist) | Literature synthesis, experiment support, scientific reasoning, and data analysis. |
| Personal assistant workers | [khoj](https://github.com/khoj-ai/khoj), [MIRIX](https://github.com/Mirix-AI/MIRIX), [atom](https://github.com/rush86999/atom), [OwnPilot](https://github.com/ownpilot/OwnPilot) | Personal workspace assistance, memory, automation, and end-user task execution. |
| Finance workers | [TradingAgents](https://github.com/TauricResearch/TradingAgents), [OpenBB](https://github.com/OpenBB-finance/OpenBB), [BitQuant](https://github.com/OpenGradient/BitQuant), [MarketBot](https://github.com/EthanAlgoX/MarketBot) | Market analysis, strategy exploration, and quantitative research workflows. |
| Biomedical workers | [Biomni](https://github.com/snap-stanford/Biomni), [STELLA](https://github.com/zaixizhang/STELLA), [BioAgents](https://github.com/bio-xyz/BioAgents), [MediGenius](https://github.com/Md-Emon-Hasan/MediGenius) | Domain-specific knowledge work in healthcare and life sciences. |

### Layer 4: Tool Agents and Connectors

This layer exposes external capabilities to your workers.

| Connector Type | Recommended Projects | Best Use |
| :--- | :--- | :--- |
| Browser and web tooling | [chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp), [browserwing](https://github.com/browserwing/browserwing), [agent-browser](https://github.com/vercel-labs/agent-browser) | Browser control, inspection, automation, and web interaction. |
| MCP capability pack | [medical-mcps](https://github.com/pascalwhoop/medical-mcps), [bio-mcp](https://github.com/acashmoney/bio-mcp), [quantcontext-mcp-server](https://github.com/zomma-dev/quantcontext-mcp-server), [knowledgebase-mcp](https://github.com/biocontext-ai/knowledgebase-mcp) | Fastest way to expose domain tools to orchestrated agents. |
| Execution / sandboxing | [OpenSandbox](https://github.com/alibaba/OpenSandbox), [pi-mono](https://github.com/badlogic/pi-mono), [cmux](https://github.com/manaflow-ai/cmux) | Safe execution, terminal control, isolation, and operational tooling around agent runs. |

### Layer 5: Memory, Context, and Knowledge Infrastructure

This layer keeps agents grounded and stateful.

| Capability | Recommended Projects | Best Use |
| :--- | :--- | :--- |
| Agent memory | [beads](https://github.com/steveyegge/beads), [cognee](https://github.com/topoteretes/cognee), [mem0](https://github.com/mem0ai/mem0) | Persistent memory, context carryover, and long-running agent state. |
| Code / repo context | [GitNexus](https://github.com/abhigyanpatwari/GitNexus), [OpenViking](https://github.com/volcengine/OpenViking), [react-grab](https://github.com/aidenybai/react-grab) | Codebase understanding and context injection for coding agents. |
| Research / domain retrieval | [AMG-RAG](https://github.com/MrRezaeiUofT/AMG-RAG), [MedicalGraphRAG](https://github.com/OpenGraphRAG/MedicalGraphRAG), [astronomy-rag-corpus](https://github.com/radioastronomyio/astronomy-rag-corpus) | Knowledge retrieval for vertical agents with high context precision needs. |

### Layer 6: User Interface and Control Surface

This layer is where users interact with the platform.

| Interface Type | Recommended Projects | Best Use |
| :--- | :--- | :--- |
| Workspace / studio UI | [cherry-studio](https://github.com/CherryHQ/cherry-studio), [magic](https://github.com/dtyq/magic), [OpenLoaf](https://github.com/OpenLoaf/OpenLoaf) | Multi-agent workspace, chat, task entry, and unified operator experience. |
| IDE / developer UI | [cline](https://github.com/cline/cline), [Roo-Code](https://github.com/RooCodeInc/Roo-Code), [continue](https://github.com/continuedev/continue) | Best fit when the product is code-centric. |
| CLI / operator shell | [codex](https://github.com/openai/codex), [gptme](https://github.com/gptme/gptme), [kraken-cli](https://github.com/krakenfx/kraken-cli) | High-leverage control surface for technical users and internal operators. |

## 3. Domain Packs

These should not be your foundation. They should be mounted on top of the orchestration core as domain-specific capability packs.

| Domain Pack | Recommended Projects | Recommended System Role |
| :--- | :--- | :--- |
| Biomedical / healthcare | [Biomni](https://github.com/snap-stanford/Biomni), [medical-mcps](https://github.com/pascalwhoop/medical-mcps), [medsci-agent](https://github.com/omar-A-hassan/medsci-agent), [BRAINS](https://github.com/eliteresearchlab/BRAINS) | Vertical specialist agents for clinical, biomedical, or life sciences workflows. |
| Astronomy / space science | [space-explorer-agent](https://github.com/Farhat787/space-explorer-agent), [Astronomy-Multi-Agent-Rag-system](https://github.com/nipunnirman/Astronomy-Multi-Agent-Rag-system), [astronomy-rag-agent](https://github.com/anushkagarg0905/astronomy-rag-agent) | Retrieval-heavy specialist agents for astronomy content and scientific Q&A. |
| Physics / simulation | [physics-research-agent](https://github.com/MeghnaB12/physics-research-agent), [ai-mandel](https://github.com/artificial-scientist-lab/ai-mandel), [Hydro-Agent-Inversion](https://github.com/FuningMa-QUT/Hydro-Agent-Inversion) | Research and simulation workers for equation solving, modeling, and physics-focused workflows. |
| Industrial manufacturing / robotics | [sample-agentic-ai-robot](https://github.com/aws-samples/sample-agentic-ai-robot), [agentic-digital-warehouse](https://github.com/Hanan-Nahas/agentic-digital-warehouse), [multiagent-digital-twin-langgraph-mcp-a2a](https://github.com/xupeiwust/multiagent-digital-twin-langgraph-mcp-a2a), [Local-LLM-for-Robots](https://github.com/JossueE/Local-LLM-for-Robots) | Industrial monitoring, digital twin orchestration, device control, and edge deployment. |
| Financial / quant | [TradingAgents](https://github.com/TauricResearch/TradingAgents), [OpenBB](https://github.com/OpenBB-finance/OpenBB), [quantcontext-mcp-server](https://github.com/zomma-dev/quantcontext-mcp-server) | Research and analysis workers for trading, forecasting, and market intelligence. |

## 4. Canonical Stack Combinations

### A. General-Purpose Agent Product

- Orchestration Core: `openai-agents-python`
- Planner / Router: `camel` or `MetaGPT`
- Tool Layer: `chrome-devtools-mcp` + `OpenSandbox`
- Memory Layer: `beads` or `mem0`
- UI Layer: `cherry-studio` or a custom workspace UI
- Specialist Packs: add domain packs only when needed

This is the cleanest default stack if you want one application that can later branch into multiple vertical use cases.

### B. Research-First Agent Product

- Orchestration Core: `microsoft/agent-framework` or `openai-agents-python`
- Planner / Router: `robin`, `DeepResearchAgent`, or `MindSearch`
- Research Workers: `AI-Scientist-v2`, `open-data-scientist`, `InternAgent`
- Knowledge Layer: `MedicalGraphRAG`, `AMG-RAG`, `astronomy-rag-corpus`
- UI Layer: `khoj` or a custom research workspace

This is the best path if the main product experience is deep research, domain synthesis, and long-horizon knowledge work.

### C. Industrial / Robotics Agent Product

- Orchestration Core: `conductor` or `agent-framework`
- Planner / Router: `agency-swarm` or `PraisonAI`
- Device / Edge Layer: `sample-agentic-ai-robot`, `Local-LLM-for-Robots`
- Digital Twin Layer: `multiagent-digital-twin-langgraph-mcp-a2a`, `TWINFORGE-X-manufacturing-emergencies`
- Monitoring / Execution Layer: `OpenSandbox`, custom observability, event bus integration

This is the best path if the system must talk to physical systems, edge devices, or industrial process layers.

### D. Developer Copilot / Engineering Agent Product

- Orchestration Core: `openai-agents-python`
- Planner / Router: `MetaGPT` or `agency-swarm`
- Coding Workers: `codex`, `opencode`, `cline`, `goose`
- Context Layer: `GitNexus`, `beads`
- Tool Layer: `chrome-devtools-mcp`, `OpenSandbox`
- UI Layer: IDE-first experience with optional CLI fallback

This is the best path if your product’s main value is autonomous or semi-autonomous software execution.

## 5. Assembly Rules

Use these rules to keep the system coherent:

- Do not use a domain pack as your core orchestration layer.
- Keep planner agents separate from worker agents.
- Keep tool connectors separate from memory and retrieval infrastructure.
- Introduce domain-specific agents only after the general runtime, routing, and context stack is stable.
- Prefer one primary orchestration framework, not three competing ones.
- Prefer one memory strategy and one retrieval strategy before expanding the stack.
- Treat UI projects as control surfaces, not as the orchestration backbone.

## 6. Suggested Role Map for Your Future Application

If you want a clean starting application, the simplest internal role map is:

| Internal Product Role | Recommended Source Projects |
| :--- | :--- |
| Supervisor / runtime | [openai-agents-python](https://github.com/openai/openai-agents-python), [microsoft/agent-framework](https://github.com/microsoft/agent-framework) |
| Planner | [camel](https://github.com/camel-ai/camel), [MetaGPT](https://github.com/FoundationAgents/MetaGPT) |
| Research worker | [AI-Scientist-v2](https://github.com/SakanaAI/AI-Scientist-v2), [robin](https://github.com/Future-House/robin) |
| Coding worker | [codex](https://github.com/openai/codex), [opencode](https://github.com/anomalyco/opencode), [cline](https://github.com/cline/cline) |
| Tool worker | [chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp), [medical-mcps](https://github.com/pascalwhoop/medical-mcps), [quantcontext-mcp-server](https://github.com/zomma-dev/quantcontext-mcp-server) |
| Memory / context | [beads](https://github.com/steveyegge/beads), [GitNexus](https://github.com/abhigyanpatwari/GitNexus), [mem0](https://github.com/mem0ai/mem0) |
| End-user surface | [cherry-studio](https://github.com/CherryHQ/cherry-studio), [khoj](https://github.com/khoj-ai/khoj), custom UI |
| Domain specialist pack | [Biomni](https://github.com/snap-stanford/Biomni), [TradingAgents](https://github.com/TauricResearch/TradingAgents), [sample-agentic-ai-robot](https://github.com/aws-samples/sample-agentic-ai-robot) |

## 7. Recommended First Build Sequence

1. Pick one orchestration core.
2. Add one planner and two workers only: one research worker and one coding worker.
3. Add browser and execution tools.
4. Add memory and retrieval.
5. Add one user-facing interface.
6. Add exactly one domain pack.
7. Add observability, evaluation, and production controls after the core loop is stable.

This sequence prevents the product from collapsing into a pile of disconnected agents.
