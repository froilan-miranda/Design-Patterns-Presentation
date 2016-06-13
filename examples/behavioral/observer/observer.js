function ObserverList(){
	this.observerList = [];
}

ObserverList.prototype.Add = function(obj){
	return this.observerList.push(obj);
};

ObserverList.prototype.Empty = function(){
	this.observerList = [];
};

ObserverList.prototype.Count = function(){
	return this.observerList.length;
};


ObserverList.prototype.Get = function(index){
	if(index > -1 && index < this.observerList.length){
		return this.observerList[index];
	}
};

ObserverList.prototype.Insert = function(obj, index){
	var pointer = -1;

	if(index === 0){
		this.observerList.unshift(obj);
		pointer = index;
	}else if(index === this.observerList.length){
		this.observerList.push(obj);
		pointer = index;
	}

	return pointer;
};

ObserverList.prototype.IndexOf = function(obj, startIndex){
	var i = startIndex, pointer = -1;

	while(i < this.observerList.length){
		if(this.observerList[i] === obj){
			pointer = i;
		}

		i++;
	}

	return pointer;
};

ObserverList.prototype.RemoveIndexAt = function(index){
	if(index === 0){
		this.observerList.shift();
	}else if(index === this.observerList.length -1){
		this.observerList.pop();
	}
};

//Extend an object with an extension
function extend(extension, obj){
	for(var key in extension){
		obj[key] = extension[key];
	}
}

function Subject(){
	this.observers = new ObserverList();
}

Subject.prototype.AddObserver = function(observer){
	this.observers.Add(observer);
};

Subject.prototype.RemoveObserver = function(observer){
	this.observers.RemoveAt(this.observers.IndexOf(observer, 0));
};

Subject.prototype.Notify = function(context){
	var observerCount = this.observers.Count();
	for(var i=0; i<observerCount; i++){
		this.observers.Get(i).Update(context);
	}
};

//The Observer
function Observer(){
	this.Update = function(){
		//...
	};
}

//References to our DOM elements
var controlCheckbox = document.getElementById('mainCheckbox'),
	addBtn = document.getElementById('addNewObserver'),
	container = document.getElementById('observersContainer');

//Concreete Subject

//Extend the controlling checkbox with the Subject class
extend(new Subject(), controlCheckbox);

//Clicking the checkbox will trigger notifications to its observers
controlCheckbox['onclick'] = new Function('controlCheckbox.Notify(controlCheckbox.checked)');

addBtn['onclick'] = AddNewObserver;

//Concrete Observer

function AddNewObserver(){

	//Create a new checkbox to be added
	var check = document.createElement('input');
	check.type = 'checkbox';

	//Extend the checkbox with the Obsserver class
	extend(new Observer(), check);

	//Override with custom update behavior
	check.Update = function(value){
		this.checked = value;
	};

	//Add the new observer to our list of observers
	//for our main subject
	controlCheckbox.AddObserver(check);

	//Append the item to the container
	container.appendChild(check);
}
