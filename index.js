var Emitter = require('component-emitter')
	, bind = require('component-bind')
	, events = require('component-events')
	, classes = require('component-classes');

var Pamphlet = function(selector){
	if (!(this instanceof Pamphlet)) return new Pamphlet(selector);
	if (!el) throw new TypeError('Pamphlet() requires an element');
	this.el = document.querySelector(selector);
	var panes = this.el.querySelectorAll('.pamphlet-panes');

	// Maintain a collection of child elements
	this.children = [];
	for (var i = 0; i < panes.length; i++){
		this.children.push(new PamphletPane(this, panes[i]));
	}
	this.on('pane-clicked', bind(this, this.onPaneClicked));
};

Emitter(Pamphlet.prototype);

Pamphlet.prototype.onPaneClicked = function(pane){
	if (this.selected) this.selected.removeActive();
	this.selected = pane;
	if (pane.collapsed) pane.removeCollapse();
	for (var i = 0; i < this.children.length; i++) {
		var child = this.children[i];
		if (! child.selected) {
			child.collapse();
		}
	}
};

// Each Pamphlet Pane
var PamphletPane = function(context, el){
	if (!(this instanceof PamphletPane)) return new PamphletPane(context, el);
	if (!el) throw new TypeError('PamphletPane() requires an element');
	this.el = el;
	this.context = context;
	this.bind();
};

Emitter(PamphletPane.prototype);

PamphletPane.prototype.bind = function(){
	this.events = events(this.el, this);
	this.events.bind('click');
};

PamphletPane.prototype.onclick = function(e){
	this.context.emit('pane-clicked', this);
	this.makeActive();
};

PamphletPane.prototype.removeActive = function(){
	this.selected = false;
	classes(this.el).remove('active');
};

PamphletPane.prototype.makeActive = function(){
	this.selected = true;
	classes(this.el).add('active');
};

PamphletPane.prototype.collapse = function(){
	this.collapseed = true;
	classes(this.el).add('collapsed');
};

PamphletPane.prototype.removeCollapse = function(){
	this.collapsed = false;
	classes(this.el).remove('collapsed');
};