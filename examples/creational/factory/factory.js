//Define a skeleton vehicle factory
function VehicleFactory() {}

//Define the prototypes aand utilities for this factory

//Our default vehicleClass is Car
VehicleFactory.prototype.vehicleClass = Car;

//Our Factory method for creating new Vehicle instances
VehicleFactory.prototype.createVehicle = function (options){

	if(options.vehicleType === "car"){
		this.vehicleClass = Car;
	}else{
		this.vehicleClass = Truck;
	}

	return new this.vehicleClass(options);
};

//Create an instance of our factory that makes cars
var carFactory = new VehicleFactory();
var car = carFactory.createVehicle({
	vehicleType: "car",
	color: "yellow",
	doors: 6 });

//Test to confirm oout car was created using the vehicleClass/prototype Car

//Outputs: true
console.log(car instanceof Car);

//Outputs: Car object of color "yellow", doors: 6 in a "brand new" state
console.log(car);



var movingTruck = carFactory.createVehicle({
	vehicleType: "truck",
	state: "like new",
	color: "red",
	wheelSize: "small" });

//Test to confirm our truck was created with the vehicleClass/prototype Truck
//
//Outputs: true
console.log( movingTruck instanceof Truck)

//Outputs: Truck object of color "red", a "like new" state
//and a "small" wheelSize
console.log(movingTruck);


function TruckFactory () {}
TruckFactory.prototype = new VehicleFactory();
TruckFactory.prototype.vehicleClass = Truck;

var truckFactory = new TruckFactory();
var myBigTruck = truckFactory.createVehicle({
	state: "omg..so bad.",
	color: "pink",
	wheelSize: "so big" });

//Confirms that myBigTruck was created with the prototype Truck
//Outputs: true
console.log(myBigTruck instanceof Truck);

//Outputs: Truck object with the color "pink", wheelSize "so big"
// and state "omg. so bad"
console.log(myBigTruck);