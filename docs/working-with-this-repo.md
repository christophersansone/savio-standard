# Working With This Repository

*How this project is organized, why it works this way, and exactly how to contribute — written for people who have never used GitHub, with a fast lane for those who have.*

## Why a Git repository, and why Markdown?

This project's content — the covenant, the playbooks, the guides — is its most valuable asset, and it will be edited by many hands over many years, translated into other languages, and turned into documents, a website, and app content. That demands a format and a workflow with specific properties:

- **One canonical source.** Every document lives here, in exactly one place. The website, printable PDFs, and app content are all *generated from* these files — so there is never a question of which version is current. If it's merged here, it's the real one.
- **Plain text that formats itself.** Markdown is ordinary text with a few light conventions (`# heading`, `**bold**`, `- list item`). Anyone can read the raw file; GitHub, and most editors, render it as a formatted document automatically. No special software is required to read, edit, or review anything.
- **Every change is visible and reversible.** Git records who changed what, when, and why — forever. Proposed changes (called *pull requests*, or PRs) show exactly which lines would change before anyone approves them. Nothing lands silently, and nothing is ever lost.
- **Collaboration without chaos.** Anyone can propose a change; the maintainers — the individuals who tend this repository — review and merge. This is the "open contribution, maintained merge" model described in [CONTRIBUTING.md](../CONTRIBUTING.md) — the same model that runs most of the world's open-source software. (The *steward* is something different: the organization that holds the project's rights. Maintainers are people; the steward is an entity.)
- **Translations become tractable.** A translation is just another set of Markdown files, kept current by comparing changes — which is how large multilingual projects actually manage it.

## How the repository is organized

| Location | What lives there | Changes how often |
|---|---|---|
| `README.md` | The front door: overview and map | Rarely |
| `LICENSE.md`, `CLA.md`, `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md` | The rules of the road | Rarely |
| `docs/` | How the project itself works: strategy, stewardship, this guide | Occasionally |
| `content/` | The actual program content: covenant, protocol, guides, kits | Actively — this is where most contributions go |
| `TODO.md` | The working checklist | Constantly |

A useful rule of thumb: `docs/` is *about* the project; `content/` *is* the project.

## Reading and writing Markdown

You already know most of Markdown without realizing it. The essentials:

| You type | You get |
|---|---|
| `# Title` / `## Section` | Headings |
| `**important**` | **important** |
| `*emphasis*` | *emphasis* |
| `- item` | A bulleted list |
| `1. item` | A numbered list |
| `[link text](../content/covenant.md)` | A clickable link |
| `> quoted text` | An indented quotation |

**Editor recommendations.** You may not need one at all — GitHub's website lets you read and edit everything in the browser (see below). If you'd like a proper editor: **Typora** (Mac/Windows, ~$15) shows formatted text as you type, like a normal word processor — the best choice for non-technical contributors. **Visual Studio Code** (free, all platforms) with its built-in Markdown preview (`Cmd/Ctrl+Shift+V`) is the standard choice for anyone comfortable with a code editor.

## How to contribute — no tools required

**The simplest contribution is an issue.** Spotted a typo, disagree with a wording, have an idea? On the GitHub page, click **Issues → New issue**, write your thought, submit. Done — no editing, no Markdown, no anything. This is a real and valued contribution.

**To propose an actual edit (a pull request), from your browser:**

1. Create a free account at github.com if you don't have one.
2. Navigate to the file you want to change and click the **pencil icon** (top right of the file view). GitHub automatically creates your own working copy (a "fork") — you can't break anything.
3. Make your edits. The **Preview** tab shows the formatted result.
4. Click **Commit changes**, write one line describing what you changed and why, and choose **"Create a new branch and start a pull request."**
5. On the PR form: describe your change, and — if it's a content contribution (new material or substantial rewrites, per [CONTRIBUTING.md](../CONTRIBUTING.md)) — include the line: `I have read and agree to the Contributor License Agreement (CLA.md).`
6. Submit. You're done.

**What happens next:** a maintainer reviews your PR — sometimes merging it as-is, sometimes discussing or suggesting adjustments right on the PR (you'll get email notifications). Merged means published: your change is now part of the canonical source, and your name is permanently in the project's history. Unmerged PRs aren't rejections; they're open conversations.

## The fast lane — for those who know Git

```
# fork the repo on GitHub first, then:
git clone https://github.com/YOUR-USERNAME/savio-project.git
cd savio-project
git checkout -b my-change
# edit, then:
git add -A && git commit -m "Clarify covenant activation wording"
git push -u origin my-change
# open a PR from your fork on GitHub
```

House rules: one topic per PR (a typo sweep and a rewrite are two PRs); whole-document translations, not fragments; match the style guide in [CONTRIBUTING.md](../CONTRIBUTING.md); CLA line in the PR description for content contributions; and remember the [Code of Conduct](../CODE_OF_CONDUCT.md) applies in PR discussions — including its absolute rule against discussing identifiable families or children anywhere in this repository, which includes commit messages and edit histories.

## Questions

Open an issue at [github.com/christophersansone/savio-project/issues](https://github.com/christophersansone/savio-project/issues) with the label `question`, or just ask in whatever channel you found this project through. There are no dumb questions here — most of this project's intended contributors are parents, not programmers, and the workflow above was chosen because it's the one non-programmers can genuinely use.
