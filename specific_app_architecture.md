# Specific App Architecture: Hybrid Agent Workspace

This document turns the integration blueprint into one concrete product architecture.

The selected product is a **Hybrid Agent Workspace**:

- one app
- one shared control plane
- one unified user workspace
- multiple agent classes behind it
- optional domain specialist packs mounted on top

This is the best default because it can start as a general-purpose assistant and later expand into research, coding, healthcare, finance, or industrial workflows without changing the foundation.

## 1. Product Definition

### Product Name

`Hybrid Agent Workspace`

### Product Goal

Build a multi-agent application where a user can:

- ask questions
- run deep research
- delegate coding tasks
- call external tools
- route work to domain specialists
- review outputs in one workspace

### Primary Users

- technical founders
- researchers
- developers
- operators working across knowledge, code, and domain workflows

### Core Product Promise

One workspace where a supervisor agent can decompose a task, route it to the right workers, call tools safely, preserve context, and return a structured result.

## 2. Architecture Decision

This app uses a **central supervisor architecture** with specialized workers.

The architecture is intentionally not peer-to-peer. All important routing goes through one supervisor layer so the system stays inspectable and controllable.

### Chosen Stack

| Layer | Chosen Baseline |
| :--- | :--- |
| Orchestration core | [openai-agents-python](https://github.com/openai/openai-agents-python) |
| Planner / router | [camel](https://github.com/camel-ai/camel) patterns plus a custom supervisor agent |
| Coding worker | [codex](https://github.com/openai/codex) |
| Research worker | [robin](https://github.com/Future-House/robin) style worker pattern |
| Browser tool layer | [chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp) |
| Execution sandbox | [OpenSandbox](https://github.com/alibaba/OpenSandbox) |
| Memory / context | [beads](https://github.com/steveyegge/beads) style long-context memory plus retrieval layer |
| Code context | [GitNexus](https://github.com/abhigyanpatwari/GitNexus) style repository context ingestion |
| User workspace | custom app UI informed by [cherry-studio](https://github.com/CherryHQ/cherry-studio) and [khoj](https://github.com/khoj-ai/khoj) |
| Domain packs | biomedical, finance, astronomy, physics, industrial packs mounted as optional workers |

## 3. Top-Level System Design

### Core Components

| Component | Responsibility |
| :--- | :--- |
| Workspace UI | Chat, task creation, execution trace, artifacts, approvals, memory view |
| API Gateway | Single entrypoint for UI, auth, sessions, agent runs, and artifacts |
| Supervisor Agent | Task decomposition, routing, policy checks, result synthesis |
| Planner Module | Breaks complex tasks into executable sub-tasks |
| Worker Registry | Lists available workers, tools, domains, and routing hints |
| Research Worker | Search, read, compare, summarize, and citation-heavy execution |
| Coding Worker | Code generation, edits, debugging, repository operations |
| Tool Worker Layer | Browser, MCP tools, shell tools, API connectors |
| Domain Specialist Workers | Biomedical, finance, astronomy, physics, industrial workers |
| Memory Service | Long-term memory, session memory, entity memory, user preferences |
| Retrieval Service | Knowledge indexing, vector retrieval, structured lookup, repo context |
| Artifact Service | Stores reports, code outputs, plans, traces, and generated files |
| Evaluation / Observability | Agent traces, tool logs, failures, latency, cost, quality scores |

### High-Level Flow

1. User submits a task in the workspace.
2. API Gateway creates a run and forwards it to the Supervisor Agent.
3. Supervisor decides whether the task is simple or multi-step.
4. If multi-step, Planner creates a task graph.
5. Supervisor assigns steps to workers.
6. Workers call tools through the Tool Worker Layer.
7. Memory and Retrieval services provide context during execution.
8. Supervisor merges outputs into one final response.
9. Artifact Service stores outputs, and Observability stores the trace.
10. Workspace UI renders result, evidence, artifacts, and next actions.

## 4. Layered Runtime Model

### Layer A: User Interaction Layer

- Workspace UI
- session history
- task form
- artifact viewer
- trace viewer
- approval prompts for sensitive tool calls

### Layer B: Control Plane

- API Gateway
- Supervisor Agent
- Planner Module
- Worker Registry
- policy and routing rules

This layer is the brain of the system.

### Layer C: Execution Plane

- Research Worker
- Coding Worker
- Tool Worker Layer
- Domain Specialist Workers

This layer does the actual work.

### Layer D: Knowledge Plane

- Memory Service
- Retrieval Service
- repo context ingestion
- domain knowledge indexes

This layer makes the workers stateful and grounded.

### Layer E: Operations Plane

- Artifact Service
- run logs
- tool traces
- evaluation pipeline
- cost tracking

This layer makes the app inspectable and production-safe.

## 5. Agent Roles Inside the App

### 5.1 Supervisor Agent

The supervisor is the only agent allowed to:

- approve the task plan
- choose workers
- decide whether to parallelize
- synthesize the final answer
- decide when human approval is required

The supervisor should not directly perform specialized work unless the task is trivial.

### 5.2 Research Worker

The research worker handles:

- search-heavy tasks
- source comparison
- literature review
- domain synthesis
- evidence-backed summaries

Typical backing projects:

- `robin`
- `MindSearch`
- `AI-Scientist-v2`

### 5.3 Coding Worker

The coding worker handles:

- code generation
- refactoring
- debugging
- test execution
- repository navigation

Typical backing projects:

- `codex`
- `opencode`
- `cline`

### 5.4 Tool Worker

The tool worker is a controlled execution layer, not an autonomous planner.

It handles:

- browser actions
- MCP tool calls
- shell execution
- sandboxed file operations
- external API access

Typical backing projects:

- `chrome-devtools-mcp`
- `OpenSandbox`
- `medical-mcps`
- `quantcontext-mcp-server`

### 5.5 Domain Specialist Workers

These are mounted only when needed.

Examples:

- Biomedical specialist
- Quant / finance specialist
- Astronomy specialist
- Physics specialist
- Industrial / robotics specialist

The supervisor should call them only when:

- the task is domain-sensitive
- domain-specific tools are required
- domain-specific terminology or data sources matter

## 6. Concrete Domain Packs

### Biomedical Pack

Recommended components:

- `Biomni`
- `medical-mcps`
- `medsci-agent`
- `MedicalGraphRAG`

Use this pack for:

- medical document analysis
- biomedical research workflows
- clinical knowledge retrieval

### Finance Pack

Recommended components:

- `TradingAgents`
- `OpenBB`
- `BitQuant`
- `quantcontext-mcp-server`

Use this pack for:

- market analysis
- quant research
- strategy support

### Astronomy Pack

Recommended components:

- `space-explorer-agent`
- `Astronomy-Multi-Agent-Rag-system`
- `astronomy-rag-agent`

Use this pack for:

- astronomy retrieval
- paper-grounded Q&A
- educational or research workflows

### Physics Pack

Recommended components:

- `physics-research-agent`
- `ai-mandel`
- `Hydro-Agent-Inversion`

Use this pack for:

- equation-aware research tasks
- physics simulation support
- scientific modeling workflows

### Industrial Pack

Recommended components:

- `sample-agentic-ai-robot`
- `agentic-digital-warehouse`
- `multiagent-digital-twin-langgraph-mcp-a2a`
- `Local-LLM-for-Robots`

Use this pack for:

- industrial monitoring
- digital twin workflows
- robotics and edge control

## 7. Service Boundaries

Keep these boundaries strict.

| Service | Owns | Must Not Own |
| :--- | :--- | :--- |
| Supervisor service | routing, planning, synthesis, approvals | direct domain logic, raw tool implementations |
| Worker service | specialized execution | global routing policy |
| Tool service | external capability execution | final answer synthesis |
| Memory service | session memory, long-term memory, preferences | task planning |
| Retrieval service | indexing and retrieval | agent orchestration |
| Artifact service | files, reports, outputs | execution policy |
| Observability service | traces, metrics, evaluation logs | user-facing task logic |

## 8. Minimal API Shape

These are the minimum internal interfaces the app should expose.

### User-Facing API

- `POST /runs`
- `GET /runs/:id`
- `POST /runs/:id/approve`
- `GET /runs/:id/artifacts`
- `GET /sessions/:id/memory`

### Internal Control APIs

- `POST /supervisor/plan`
- `POST /supervisor/execute-step`
- `POST /workers/research/run`
- `POST /workers/code/run`
- `POST /workers/domain/:pack/run`
- `POST /tools/browser/run`
- `POST /tools/mcp/run`
- `POST /tools/shell/run`
- `POST /memory/recall`
- `POST /memory/store`
- `POST /retrieval/query`

## 9. Task Execution Example

### Example Task

`Analyze this repository, research related approaches, propose an implementation plan, and patch the codebase.`

### Execution Path

1. Supervisor receives the task.
2. Planner splits it into:
   - repository analysis
   - external research
   - implementation planning
   - code changes
3. Coding Worker analyzes the repository.
4. Research Worker gathers external evidence and competing approaches.
5. Memory / Retrieval provides past decisions and codebase context.
6. Supervisor merges findings into an implementation strategy.
7. Coding Worker executes the patch.
8. Tool Worker runs tests or browser tooling if required.
9. Supervisor returns:
   - summary
   - rationale
   - artifacts
   - validation status

## 10. MVP Scope

The MVP should only include:

- Workspace UI
- API Gateway
- Supervisor Agent
- Research Worker
- Coding Worker
- Browser tool connector
- Shell / sandbox connector
- Memory Service
- Retrieval Service
- Artifact storage
- one domain pack only

Recommended first domain pack:

- Biomedical, if your long-term goal is domain depth
- Finance, if you want high-frequency tool-driven analysis
- Industrial, if the product must eventually control real systems

## 11. What Not To Build First

Avoid these mistakes early:

- too many orchestration frameworks in one app
- too many worker types before the supervisor loop is stable
- domain packs before retrieval and memory are reliable
- UI complexity before traceability and approvals exist
- agent-to-agent freeform communication without supervision

## 12. Recommended Build Sequence

### Phase 1

- build Workspace UI
- build API Gateway
- implement Supervisor Agent
- implement Research Worker
- implement Coding Worker

### Phase 2

- add browser connector
- add sandboxed shell execution
- add Memory Service
- add Retrieval Service

### Phase 3

- add Artifact Service
- add traces and evaluation
- add approvals and policy rules

### Phase 4

- add one domain pack
- tune routing rules
- add domain-specific retrieval and tools

### Phase 5

- add more packs only after role boundaries are stable

## 13. Final Recommendation

If you want one architecture that can actually grow into a strong product, this should be your baseline:

- `openai-agents-python` as the orchestration core
- one custom Supervisor Agent
- one Research Worker
- one Coding Worker
- one Tool Worker layer
- one Memory / Retrieval layer
- one workspace UI
- domain packs mounted later as optional specialist workers

This gives you a clean center of gravity. Everything else can be added without forcing a rewrite of the product model.
