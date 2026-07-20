/**
 * Remark plugins for rendering repository markdown on the site.
 * No external deps; tiny hand-rolled tree walkers.
 */

const REPO_BLOB = 'https://github.com/christophersansone/savio-project/blob/master';

/** filename (no extension) -> site route. Kept in sync with src/lib/registry.ts. */
const ROUTES = {
  'strategic-plan': '/plan',
  'covenant': '/covenant',
  'manifesto-parents': '/manifesto',
  'manifesto-community': '/manifesto/community',
  'parent-to-parent-protocol': '/protocol',
  'glossary': '/glossary',
  'roles-and-responsibilities': '/roles',
  'facilitator-onboarding': '/facilitators',
  'stewardship-commitment': '/commitment',
  'stewardship-and-operations': '/stewardship',
  'why-a-steward': '/why-a-steward',
  'working-with-this-repo': '/contribute',
};

/** repo-root files that have no page: send to GitHub */
const ROOT_FILES = ['CLA', 'CODE_OF_CONDUCT', 'CONTRIBUTING', 'LICENSE', 'README', 'TODO'];

function walk(node, fn) {
  fn(node);
  if (node.children) node.children.forEach((c) => walk(c, fn));
}

/**
 * Remove the document's own H1 (the page layout supplies the title),
 * and the status line that immediately follows it when it is a lone
 * italicized paragraph ("*The Savio Project (working title) · Working draft*").
 */
export function stripLeadingH1() {
  return (tree) => {
    const kids = tree.children;
    const h1 = kids.findIndex((n) => n.type === 'heading' && n.depth === 1);
    if (h1 === -1) return;
    let remove = 1;
    const next = kids[h1 + 1];
    if (
      next &&
      next.type === 'paragraph' &&
      next.children.length === 1 &&
      next.children[0].type === 'emphasis'
    ) {
      remove = 2;
    }
    kids.splice(h1, remove);
  };
}

/**
 * Rewrite relative .md links from the repository into site routes,
 * falling back to GitHub for files without a page.
 */
export function rewriteRepoLinks() {
  return (tree) => {
    walk(tree, (node) => {
      if (node.type !== 'link' || !node.url) return;
      const url = node.url;
      if (/^(https?:|mailto:|#)/.test(url)) return;

      const [path, anchor] = url.split('#');
      if (!path.endsWith('.md')) return;

      const base = path.split('/').pop().replace(/\.md$/, '');
      const suffix = anchor ? `#${anchor}` : '';

      if (ROUTES[base]) {
        node.url = ROUTES[base] + suffix;
      } else if (ROOT_FILES.includes(base)) {
        node.url = `${REPO_BLOB}/${base}.md${suffix}`;
      } else {
        // unknown repo file: link to it on GitHub rather than 404
        const clean = path.replace(/^(\.\.\/)+/, '');
        node.url = `${REPO_BLOB}/${clean}${suffix}`;
      }
    });
  };
}
