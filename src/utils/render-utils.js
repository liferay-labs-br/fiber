export default class renderUtils {
	static _formatAttributes(node, attributes) {
		Object.keys(attributes).forEach( attr => {
			let value = attributes[attr];
			
			if(value === 'null' || value === 'undefined' || !value) return;

			node.setAttribute(attr, value);
		} );
	}
}