(function(exports) {
	var camelMatcher = /([a-z])([A-Z])(?=[a-z])/g
	var
		$, $$, el,
		resolve,
		empty,
		fill

	function camelToPropertyName(name) {
		return name.replace(camelMatcher, function dashifyCamelName(match, lower, cap) {
			return lower + '-' + cap.toLowerCase()
		})
	}

	function bindAppendToElement(el) {
		return function appendChildren(child) {
				var node
				if (child instanceof HTMLElement) {
					el.appendChild(child)
				} else {
					node = document.createTextNode(child)
					el.appendChild(node)
				}
		}
	}

	function attach(container) {
		container.$ = $
		container.$$ = $$
		container.el = el
		container.bdom = {
			resolve: resolve,
			empty: empty,
			fill: fill
		}
	}

	$ = function selectFromDOM(sel) {
		return document.querySelector(sel)
	}

	$$ = function selectArrayFromDOM(sel) {
		return Array.from(document.querySelectorAll(sel))
	}

	el = function createDomElement(el, attr, children) {
		var e = document.createElement(el)
		attr = attr || {}

		for (var prop in attr) {
			if (prop.substr(0, 2) === 'on') { // EventListener
				e.addEventListener(prop.substr(2), attr[prop])
			} else if (prop === 'style') {
				var value = attr[prop]
				if (typeof value === 'string') {
					e.setAttribute(prop, value)
				} else {
					for (var styleProp in value) {
						e.style[styleProp] = value[styleProp]
					}
				}
			} else {
				e.setAttribute(camelToPropertyName(prop), attr[prop])
			}
		}

		if (children != null) {
			if (!Array.isArray(children)) {
				children = [children]
			}

			children.forEach(bindAppendToElement(e))
		}

		return e
	}

	resolve = function resolveElement(el) {
		if (typeof el === 'string') {
			return $(el)
		}
		return el
	}

	empty = function emptyTargetElement(el) {
		el = resolve(el)
		while (el.lastChild) {
			el.removeChild(el.lastChild)
		}
	}

	fill = function populateTargetElement(el, children) {
			el = resolve(el)
			if (!Array.isArray(children)) {
				children = [children]
			}
			empty(el)
			children.forEach(bindAppendToElement(el))
	}

	attach(exports)
}(window))
