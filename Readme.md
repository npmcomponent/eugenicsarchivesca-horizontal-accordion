*This repository is a mirror of the [component](http://component.io) module [eugenicsarchivesca/horizontal-accordion](http://github.com/eugenicsarchivesca/horizontal-accordion). It has been modified to work with NPM+Browserify. You can install it using the command `npm install npmcomponent/eugenicsarchivesca-horizontal-accordion`. Please do not open issues or send pull requests against this repo. If you have issues with this repo, report it to [npmcomponent](https://github.com/airportyh/npmcomponent).*

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
