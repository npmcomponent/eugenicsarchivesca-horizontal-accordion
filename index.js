var Emitter = require('emitter')
	, bind = require('bind')
	, events = require('events')
	, classes = require('classes');

var Accordion = module.exports = function(selector){
	if (!(this instanceof Accordion)) return new Accordion(selector);
	if (!selector) throw new TypeError('Horizontal-Accordion() requires a wrapper element');
	this.el = document.querySelector(selector);
	var panes = this.el.querySelectorAll('.accordion-child');

	// Maintain a collection of child elements
	this.children = [];
	for (var i = 0; i < panes.length; i++){
		this.children.push(new AccordionPane(this, panes[i]));
	}
	this.on('pane-clicked', bind(this, this.onPaneClicked));
};

Emitter(Accordion.prototype);

Accordion.prototype.onPaneClicked = function(pane){
	if (this.selected) this.selected.removeActive();
	this.selected = pane;
	if (pane.collapsed) pane.removeCollapse();
	for (var i = 0; i < this.children.length; i++) {
		var child = this.children[i];
		if (! child.active) child.collapse();
	}
	this.emit('click', pane);
};

// Each Accordion Pane
var AccordionPane = function(context, el){
	if (!(this instanceof AccordionPane)) return new AccordionPane(context, el);
	if (!el) throw new TypeError('AccordionPane() requires an element');
	this.el = el;
	this.context = context;
	this.bind();
};

Emitter(AccordionPane.prototype);

AccordionPane.prototype.bind = function(){
	this.events = events(this.el, this);
	this.events.bind('click');
};

AccordionPane.prototype.onclick = function(e){
	if (!this.active){
		this.makeActive();
		this.context.emit('pane-clicked', this);
	}
};

AccordionPane.prototype.removeActive = function(){
	this.active = false;
	classes(this.el).remove('active');
};

AccordionPane.prototype.makeActive = function(){
	this.active = true;
	classes(this.el).add('active');
};

AccordionPane.prototype.collapse = function(){
	this.collapsed = true;
	classes(this.el).add('collapsed');
};

AccordionPane.prototype.removeCollapse = function(){
	this.collapsed = false;
	classes(this.el).remove('collapsed');
};