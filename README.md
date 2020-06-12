# Rasket
> A simple Pub-Sub implementation.

[![CircleCI](https://circleci.com/gh/glorious-codes/glorious-rasket.svg?style=svg)](https://circleci.com/gh/glorious-codes/glorious-rasket)

## Installation

```
$ npm install -S @glorious/rasket
```

## Usage

### Subscribe

``` javascript
/*
** @eventName: String [required]
** @callback: Function [required]
*/

import rasket from '@glorious/rasket';

const eventName = 'user:updated';
const callback = data => {
  // This function will be called every time 'user:updated' is published.
}

const subscriptionId = rasket.subscribe(eventName, callback);
```

### Unsubscribe

``` javascript
/*
** @subscriptionId: String [required]
*/

import rasket from '@glorious/rasket';

const subscriptionId = rasket.subscribe('event:name', data => {});

// When you no longer needs to listen the event,
// you can unsubscribe from it:
rasket.unsubscribe(subscriptionId);
```

### Publish

``` javascript
/*
** @eventName: String [required]
** @data: Any [optional]
*/

import rasket from '@glorious/rasket';

const eventName = 'user:updated';
const data = { name: 'John Duo', email: 'john@gmail.com' };

const subscriptionId = rasket.publish(eventName, data);
// At this moment, every piece of code subscribed on 'user:updated'
// will be notified with that data.
```

## Contributing

1. Install [Node](https://nodejs.org/en/). Download the "Recommend for Most Users" version.

2. Clone the repo:
``` bash
git clone git@github.com:glorious-codes/glorious-rasket.git
```

3. Go to the project directory:
``` bash
cd glorious-rasket
```

4. Install the project dependencies:
``` bash
npm install
```

## Tests

Ensure that all code that you have added is covered with unit tests:
``` bash
npm run test -- --coverage
```
