
# horizontal accordion

  A simple horizontal accordion. Manages classes, but you need to supply the styles. Check out the `example.html` file for a full implementation.

## Installation

    $ component install eugenicsarchivesca/horizontal-accordion

## Example

	var Accordion = require('eugenicsarchivesca-horizontal-accordion');
	// after the DOM has loaded...
	var myAccordion = new Accordion('#accordion-wrapper');
	myAccordion.on('active', function(pane){
		$(pane.el).append('<p>bacon</p>');
	});


## Events

### accordion.on('click', cb(pane))...
### accordion.on('active')
### accordion.on('inactive')
### accordion.on('collapse')
### accordion.on('remove-collapse')


## License

  MIT
