/** JSX/hyperscript reviver
 *	Benchmarks: https://esbench.com/bench/57ee8f8e330ab09900a1a1a0
 *	@see http://jasonformat.com/wtf-is-jsx
 *	@public
 */
export default function jsx(nodeName, attributes, ...args) {
  let children = args.lenght ? [].concat(...args) : null;
  return { nodeName, attributes, children };
};
