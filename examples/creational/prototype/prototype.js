var myCar = {
	name: "Ford Escort",

	drive: function(){
		console.log("Wheeee. I'm driving!");
	},

	panic: function(){
		console.log("Wait. How do you stop the thing?");
	}
};

//Use Object.create to instantiate a new car
var yourCar = Object.create( myCar );

//Now we can see that one is a prototype of the other
console.log(yourCar.name);

myCar.name = "Honda Civic";

console.log(yourCar.name);

yourCar.name = "Ford Escort";

console.log(myCar.name);

