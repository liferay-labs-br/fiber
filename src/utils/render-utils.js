export default class renderUtils {
	constructor(FiberComponent, node, attrs){
		this.FiberComponent = FiberComponent;
		this.node = node;
		this.attrs = attrs;
	}
	
	formatAttributes() {
		let instance = this;
		let attrs = instance.attrs;
		
		Object.keys(attrs).forEach(attr => {
			
			if(attrs[attr] === 'null' || attrs[attr] === 'undefined' || !attrs[attr]) return;
			
			if(instance._isEvent(attr)) return instance._addEventListener(attr);
			
			instance.node.setAttribute(attr, attrs[attr]);
		} );
	}

	_addEventListener(attr){
		let instance = this;
		let eventName = instance._extractEventName(attr);
		let FiberComponent = instance.FiberComponent;
		
		instance.node.addEventListener(eventName, instance.attrs[attr].bind(FiberComponent));
	}

	_isEvent(attr){
		return /^on/.test(attr);
	}

	_extractEventName(attr){
		return attr.slice('2').toLowerCase();
	}
}