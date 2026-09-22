import react from '@eslint-react/eslint-plugin';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y-x';
// Keep the version range in lockstep with `eslint-config-xo`. Both register this plugin under the `@stylistic` namespace, and ESLint throws if the two resolve to different copies.
import stylistic from '@stylistic/eslint-plugin';
import perfectionist from 'eslint-plugin-perfectionist';

const files = ['**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}'];

const typescriptFiles = ['**/*.{ts,tsx,mts,cts}'];

// Type-definition files never contain JSX and require a TypeScript parser, so don't apply React rules to them. This mirrors `eslint-config-xo`, which also excludes them when no TypeScript parser is available.
const ignores = ['**/*.d.{ts,mts,cts}'];

// Rules that Prettier formats itself. Kept in sync with `eslint-config-prettier` by a test.
const prettierConflictingRules = Object.fromEntries([
	'@stylistic/jsx-child-element-spacing',
	'@stylistic/jsx-closing-bracket-location',
	'@stylistic/jsx-closing-tag-location',
	'@stylistic/jsx-curly-newline',
	'@stylistic/jsx-curly-spacing',
	'@stylistic/jsx-equals-spacing',
	'@stylistic/jsx-first-prop-new-line',
	'@stylistic/jsx-indent-props',
	'@stylistic/jsx-max-props-per-line',
	'@stylistic/jsx-tag-spacing',
	'@stylistic/jsx-wrap-multilines',
].map(ruleId => [ruleId, 'off']));

export default function eslintConfigXoReact({space = false, prettier = false} = {}) {
	const indentProps = space ? (typeof space === 'number' ? space : 2) : 'tab';

	return [
		{
			name: 'xo/react',
			files,
			ignores,
			plugins: {
				'@eslint-react': react,
				'react-hooks': reactHooks,
				'jsx-a11y-x': jsxA11y,
				'@stylistic': stylistic,
				perfectionist,
			},
			languageOptions: {
				parserOptions: {
					ecmaFeatures: {
						jsx: true,
					},
				},
			},
			settings: {
				'react-x': {
					version: '19',
				},
			},
			rules: {
				'@eslint-react/dom-no-dangerously-set-innerhtml': 'error',
				'@eslint-react/dom-no-dangerously-set-innerhtml-with-children': 'error',
				'@eslint-react/dom-no-find-dom-node': 'error',
				'@eslint-react/dom-no-flush-sync': 'error',
				'@eslint-react/dom-no-hydrate': 'error',
				'@eslint-react/dom-no-missing-button-type': 'error',
				'@eslint-react/dom-no-missing-iframe-sandbox': 'error',
				'@eslint-react/dom-no-render': 'error',
				'@eslint-react/dom-no-render-return-value': 'error',
				'@eslint-react/dom-no-script-url': 'error',
				'@eslint-react/dom-no-string-style-prop': 'error',
				'@eslint-react/dom-no-unknown-property': [
					'error',
					{
						requireDataLowercase: true,
					},
				],
				'@eslint-react/dom-no-unsafe-iframe-sandbox': 'error',
				'@eslint-react/dom-no-unsafe-target-blank': 'error',
				'@eslint-react/dom-no-use-form-state': 'error',
				'@eslint-react/dom-no-void-elements-with-children': 'error',

				'@eslint-react/jsx-no-children-prop': 'error',
				'@eslint-react/jsx-no-children-prop-with-children': 'error',
				'@eslint-react/jsx-no-comment-textnodes': 'error',
				'@eslint-react/jsx-no-key-after-spread': 'error',
				'@eslint-react/jsx-no-leaked-dollar': 'error',
				'@eslint-react/jsx-no-leaked-semicolon': 'error',
				'@eslint-react/jsx-no-namespace': 'error',
				'@eslint-react/jsx-no-useless-fragment': 'error',

				'@eslint-react/naming-convention-context-name': 'error',
				'@eslint-react/naming-convention-id-name': 'error',
				'@eslint-react/naming-convention-ref-name': 'error',

				'@eslint-react/no-access-state-in-setstate': 'error',
				'@eslint-react/no-array-index-key': 'error',
				'@eslint-react/no-children-count': 'error',
				'@eslint-react/no-children-for-each': 'error',
				'@eslint-react/no-children-map': 'error',
				'@eslint-react/no-children-only': 'error',
				'@eslint-react/no-children-to-array': 'error',
				'@eslint-react/no-class-component': 'error',
				'@eslint-react/no-clone-element': 'error',
				'@eslint-react/no-component-will-mount': 'error',
				'@eslint-react/no-component-will-receive-props': 'error',
				'@eslint-react/no-component-will-update': 'error',
				'@eslint-react/no-context-provider': 'error',
				'@eslint-react/no-create-ref': 'error',
				'@eslint-react/no-direct-mutation-state': 'error',
				'@eslint-react/no-duplicate-key': 'error',
				'@eslint-react/no-forward-ref': 'error',
				'@eslint-react/no-missing-key': 'error',
				'@eslint-react/no-misused-capture-owner-stack': 'error',
				// Overlaps with `react-hooks/static-components`, but neither is a superset: only this one catches components nested in a class `render()`, and only that one catches components defined inside a hook.
				'@eslint-react/no-nested-component-definitions': 'error',
				'@eslint-react/no-nested-lazy-component-declarations': 'error',
				'@eslint-react/no-set-state-in-component-did-mount': 'error',
				'@eslint-react/no-set-state-in-component-did-update': 'error',
				'@eslint-react/no-set-state-in-component-will-update': 'error',
				'@eslint-react/no-unnecessary-use-prefix': 'error',
				'@eslint-react/no-unsafe-component-will-mount': 'error',
				'@eslint-react/no-unsafe-component-will-receive-props': 'error',
				'@eslint-react/no-unsafe-component-will-update': 'error',
				'@eslint-react/no-unstable-context-value': 'error',
				'@eslint-react/no-unstable-default-props': 'error',
				'@eslint-react/no-unused-class-component-members': 'error',
				'@eslint-react/no-unused-state': 'error',
				'@eslint-react/no-use-context': 'error',
				'@eslint-react/use-state': 'error',

				'@eslint-react/rsc-function-definition': 'error',

				'@eslint-react/web-api-no-leaked-event-listener': 'error',
				'@eslint-react/web-api-no-leaked-fetch': 'error',
				'@eslint-react/web-api-no-leaked-intersection-observer': 'error',
				'@eslint-react/web-api-no-leaked-interval': 'error',
				'@eslint-react/web-api-no-leaked-resize-observer': 'error',
				'@eslint-react/web-api-no-leaked-timeout': 'error',

				'react-hooks/rules-of-hooks': 'error',
				'react-hooks/exhaustive-deps': 'warn',
				'react-hooks/static-components': 'error',
				'react-hooks/use-memo': 'error',
				'react-hooks/void-use-memo': 'error',
				'react-hooks/preserve-manual-memoization': 'error',
				'react-hooks/incompatible-library': 'warn',
				'react-hooks/immutability': 'error',
				'react-hooks/globals': 'error',
				'react-hooks/refs': 'error',
				'react-hooks/set-state-in-effect': 'error',
				'react-hooks/error-boundaries': 'error',
				'react-hooks/purity': 'error',
				'react-hooks/set-state-in-render': 'error',
				'react-hooks/unsupported-syntax': 'warn',
				'react-hooks/config': 'error',
				'react-hooks/gating': 'error',

				// Only the rules that can be decided from the markup alone. Left out: the rules that guess at whether an element is meant to be interactive (`click-events-have-key-events`, `control-has-associated-label`, `interactive-supports-focus`, `mouse-events-have-key-events`, `no-noninteractive-element-interactions`, `no-static-element-interactions`), because they cannot see through component wrappers and do not apply at all to React Native; `prefer-tag-over-role`, because the tag a role maps to depends on ancestors the rule does not look at; and `anchor-ambiguous-text`, because it judges wording rather than markup. https://github.com/xojs/eslint-config-xo-react/issues/17
				'jsx-a11y-x/alt-text': 'error',
				'jsx-a11y-x/anchor-has-content': 'error',
				'jsx-a11y-x/anchor-is-valid': 'error',
				'jsx-a11y-x/aria-activedescendant-has-tabindex': 'error',
				'jsx-a11y-x/aria-props': 'error',
				'jsx-a11y-x/aria-proptypes': 'error',
				'jsx-a11y-x/aria-role': 'error',
				'jsx-a11y-x/aria-unsupported-elements': 'error',
				'jsx-a11y-x/autocomplete-valid': 'error',
				'jsx-a11y-x/heading-has-content': 'error',
				'jsx-a11y-x/html-has-lang': 'error',
				'jsx-a11y-x/iframe-has-title': 'error',
				'jsx-a11y-x/img-redundant-alt': 'error',
				'jsx-a11y-x/label-has-associated-control': 'error',
				'jsx-a11y-x/lang': 'error',
				'jsx-a11y-x/media-has-caption': 'error',
				'jsx-a11y-x/no-access-key': 'error',
				'jsx-a11y-x/no-aria-hidden-on-focusable': 'error',
				'jsx-a11y-x/no-autofocus': 'error',
				'jsx-a11y-x/no-distracting-elements': 'error',
				'jsx-a11y-x/no-interactive-element-to-noninteractive-role': 'error',
				'jsx-a11y-x/no-noninteractive-element-to-interactive-role': 'error',
				'jsx-a11y-x/no-noninteractive-tabindex': 'error',
				'jsx-a11y-x/no-redundant-roles': 'error',
				'jsx-a11y-x/role-has-required-aria-props': 'error',
				'jsx-a11y-x/role-supports-aria-props': 'error',
				'jsx-a11y-x/scope': 'error',
				'jsx-a11y-x/tabindex-no-positive': 'error',

				'@stylistic/jsx-child-element-spacing': 'error',
				// `line-aligned` instead of `tag-aligned` because an opening tag that starts mid-line (for example, after `{condition ? `) would have to align with a column that no number of tabs can reach. Aligning with the opening tag's line is always representable. https://github.com/xojs/eslint-config-xo-react/issues/31
				'@stylistic/jsx-closing-bracket-location': [
					'error',
					{
						nonEmpty: 'line-aligned',
						selfClosing: false,
					},
				],
				'@stylistic/jsx-closing-tag-location': ['error', 'line-aligned'],
				'@stylistic/jsx-curly-brace-presence': [
					'error',
					{
						props: 'never',
						children: 'never',
						propElementValues: 'always',
					},
				],
				'@stylistic/jsx-curly-newline': [
					'error',
					{
						multiline: 'consistent',
						singleline: 'forbid',
					},
				],
				'@stylistic/jsx-curly-spacing': ['error', 'never'],
				'@stylistic/jsx-equals-spacing': ['error', 'never'],
				'@stylistic/jsx-first-prop-new-line': 'error',
				'@stylistic/jsx-indent-props': ['error', indentProps],
				'@stylistic/jsx-max-props-per-line': [
					'error',
					{
						maximum: 3,
						when: 'multiline',
					},
				],
				// Disabled for now as it produces too many errors
				// '@stylistic/jsx-one-expression-per-line': ['error', {allow: 'single-child'}],
				'@stylistic/jsx-pascal-case': 'error',
				'@stylistic/jsx-self-closing-comp': 'error',
				'@stylistic/jsx-tag-spacing': [
					'error',
					{
						closingSlash: 'never',
						beforeSelfClosing: 'never',
						afterOpening: 'never',
						beforeClosing: 'never',
					},
				],
				'@stylistic/jsx-wrap-multilines': [
					'error',
					{
						declaration: 'parens-new-line',
						assignment: 'parens-new-line',
						return: 'parens-new-line',
						arrow: 'parens-new-line',
						condition: 'ignore',
						logical: 'ignore',
						prop: 'ignore',
					},
				],

				// `@stylistic/jsx-sort-props` is deprecated in favor of this.
				'perfectionist/sort-jsx-props': [
					'error',
					{
						type: 'unsorted',
						groups: ['reserved', 'shorthand-prop', 'unknown', 'callback'],
						customGroups: [
							{
								groupName: 'reserved',
								elementNamePattern: '^(?:children|dangerouslySetInnerHTML|key|ref)$',
							},
							{
								groupName: 'callback',
								elementNamePattern: '^on[A-Z]',
							},
						],
					},
				],
			},
		},
		// These rules need type information, which `eslint-config-xo` sets up for TypeScript files.
		{
			name: 'xo/react/typescript',
			files: typescriptFiles,
			ignores,
			rules: {
				'@eslint-react/no-leaked-conditional-rendering': 'error',
				// TODO: Enable when it's no longer experimental. The plugin excludes it from its own `recommended-type-checked` preset, and it false-positives on computed prop access like `props[key]`.
				// '@eslint-react/no-unused-props': 'error',
			},
		},
		// Must come last so it overrides the stylistic rules above.
		...(prettier ? [{
			name: 'xo/react/prettier',
			files,
			ignores,
			rules: prettierConflictingRules,
		}] : []),
	];
}
