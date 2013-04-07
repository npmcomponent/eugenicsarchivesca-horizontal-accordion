
# pamphlet

  a simple horizontal accordian

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
