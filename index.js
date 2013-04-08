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
  for (var i = 0; i < panes.length; i++) {
    this.children.push(new AccordionPane(this, panes[i]));
  }
  this.on('click', bind(this, this.onPaneClicked));
  this.determineSize().determinePosition();
};

Emitter(Accordion.prototype);

// Calculate the size of our box, and the size of each
// potential pane, including regular, active, collapsed.
Accordion.prototype.determineSize = function(){
  var rect = this.el.getBoundingClientRect();
  this.width = rect.right - rect.left;
  this.paneWidth = this.width / this.children.length;
  this.activeWidth = 0.75 * this.width;
  this.collapsedWidth = (this.width - this.activeWidth) / (this.children.length - 1);
  return this;
};

// Determine our Left & Width of each pane.
Accordion.prototype.determinePosition = function(){
  var left = 0;
  for (var i = 0; i < this.children.length; i++) {
    var child = this.children[i];
    child.setLeft(left);
    if (child.isActive) {
      left += this.activeWidth;
      child.setRight(this.activeWidth);
    } else if (child.isCollapsed) {
      left += this.collapsedWidth;
      child.setRight(this.collapsedWidth);
    } else {
      left += this.paneWidth;
      child.setRight(this.paneWidth);
    }
  }
  return this;
};

Accordion.prototype.onPaneClicked = function(pane){
  if (this.selected) this.selected.removeActive();
  this.selected = pane;
  if (pane.collapsed) pane.removeCollapse();
  for (var i = 0; i < this.children.length; i++){
    var child = this.children[i];
    if (! child.isActive) child.collapse();
  }
  this.determinePosition();
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

// Manage Position
AccordionPane.prototype.setLeft = function(l){
  var s = this.el.style;
  this.left = l;
  s.left = l + 'px';
};

AccordionPane.prototype.setRight = function(w){
  var s = this.el.style;
  this.right = w;
  s.right = this.context.width - (this.left + w) + 'px';
};

// Bind Events
AccordionPane.prototype.bind = function(){
  this.events = events(this.el, this);
  this.events.bind('click');
};

AccordionPane.prototype.onclick = function(e){
  if (!this.isActive){
    this.makeActive();
    this.context.emit('click', this);
  }
};

// Manage Classes
AccordionPane.prototype.removeActive = function(){
  this.isActive = false;
  classes(this.el).remove('active');
  this.context.emit('inactive', this);
};

AccordionPane.prototype.makeActive = function(){
  this.isActive = true;
  classes(this.el).add('active');
  this.context.emit('active', this);
};

AccordionPane.prototype.collapse = function(){
  this.isCollapsed = true;
  classes(this.el).add('collapsed');
  this.context.emit('collapse', this);
};

AccordionPane.prototype.removeCollapse = function(){
  this.isCollapsed = false;
  classes(this.el).remove('collapsed');
  this.context.emit('remove-collapse', this);
};