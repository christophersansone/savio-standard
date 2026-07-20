/**
 * Sätteri mdast plugins for rendering repository markdown on the site.
 * Factory form (() => definition) so per-document state resets on each compile.
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

/**
 * Remove the document's own H1 (the page layout supplies the title), and the
 * status line that immediately follows when it is a lone italicized paragraph
 * ("*The Savio Project (working title) · Working draft*").
 */
export const stripLeadingH1 = () => {
  let done = false;
  return {
    name: 'strip-leading-h1',
    heading(node, ctx) {
      if (done || node.depth !== 1) return;
      done = true;
      const parent = ctx.parent(node);
      const i = ctx.indexOf(node);
      if (parent && i !== undefined) {
        const next = parent.children[i + 1];
        if (
          next &&
          next.type === 'paragraph' &&
          next.children?.length === 1 &&
          next.children[0].type === 'emphasis'
        ) {
          ctx.removeNode(next);
        }
      }
      ctx.removeNode(node);
    },
  };
};

/**
 * Rewrite relative .md links from the repository into site routes,
 * falling back to GitHub for files without a page.
 */
export const rewriteRepoLinks = () => ({
  name: 'rewrite-repo-links',
  link(node, ctx) {
    const url = node.url;
    if (!url || /^(https?:|mailto:|#)/.test(url)) return;

    const [path, anchor] = url.split('#');
    if (!path.endsWith('.md')) return;

    const base = path.split('/').pop().replace(/\.md$/, '');
    const suffix = anchor ? `#${anchor}` : '';

    let next;
    if (ROUTES[base]) {
      next = ROUTES[base] + suffix;
    } else if (ROOT_FILES.includes(base)) {
      next = `${REPO_BLOB}/${base}.md${suffix}`;
    } else {
      const clean = path.replace(/^(\.\.\/)+/, '');
      next = `${REPO_BLOB}/${clean}${suffix}`;
    }
    ctx.setProperty(node, 'url', next);
  },
});
