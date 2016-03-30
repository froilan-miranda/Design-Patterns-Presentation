var Mediator = ( function(  ) {

	function Mediator() {
		this._topics = {};
	}

	Mediator.prototype.subscribe = function ( topic, callback ) {
		if( ! this._topics.hasOwnProperty( topic ) ) {
			this._topics[ topic ] = [];
		}

		this._topics[ topic ].push( callback );
		return true;
	};

	Mediator.prototype.unsubscribe = function ( topic, callback ) {
		if( ! this._topics.hasOwnProperty( topic ) ) {
			return false;
		}

		for( var i = 0, len = this._topics[ topic ].length; i < len; i++ ) {
			if( this._topics[ topic ][ i ] === callback ) {
				this._topics[ topic ].splice( i, 1 );
				return true;
			}
		}

		return false;
	};

	Mediator.prototype.publish = function () {
		var args = Array.prototype.slice.call( arguments );
		var topic = args.shift();

		if( ! this._topics.hasOwnProperty( topic ) ) {
			return false;
		}

		for( var i = 0, len = this._topics[ topic ].length; i < len; i++ ) {
			this._topics[ topic ][ i ].apply( this, args );
		}

		return true;
	};

	return Mediator;

} )( window );

// example subscriber function
var Subscriber = function ( myVariable ) {
  console.log( myVariable );
};

// example usages
var myMediator = new Mediator();
myMediator.subscribe( 'some event', Subscriber );
myMediator.publish( 'some event', 'foo bar' ); // console logs "foo bar"
