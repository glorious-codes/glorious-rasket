import rasket from './';

describe('Rasket', () => {
  it('should not subscribe if event name has not been given', () => {
    console.error = jest.fn();
    const eventNameRequiredErrorMessage = '[Rasket] You must pass an event name (String) as first argument.';
    const callback = jest.fn();
    rasket.subscribe(callback);
    expect(console.error).toHaveBeenCalledWith(eventNameRequiredErrorMessage);
  });

  it('should not subscribe if callback has not been given', () => {
    console.error = jest.fn();
    const callbackRequiredErrorMessage = '[Rasket] You must pass a callback (Function) as second argument.';
    rasket.subscribe('testTopic');
    expect(console.error).toHaveBeenCalledWith(callbackRequiredErrorMessage);
  });

  it('should subscribe', () => {
    const eventName = 'testTopic';
    const data = {some: 'data'};
    const callback = jest.fn();
    const id = rasket.subscribe(eventName, callback);
    rasket.publish(eventName, data);
    expect(callback).toHaveBeenCalledWith(data);
    rasket.unsubscribe(id);
  });

  it('should only execute callbacks for the published event name', () => {
    const firstCallback = jest.fn();
    const secondCallback = jest.fn();
    const firstSubscriberId = rasket.subscribe('firstTopic', firstCallback);
    const secondSubscriberId = rasket.subscribe('secondTopic', secondCallback);
    rasket.publish('firstTopic');
    expect(firstCallback).toHaveBeenCalled();
    expect(secondCallback).not.toHaveBeenCalled();
    rasket.unsubscribe(firstSubscriberId);
    rasket.unsubscribe(secondSubscriberId);
  });

  it('should unsubscribe', () => {
    const eventName = 'testTopic';
    const callback = jest.fn();
    const id = rasket.subscribe(eventName, callback);
    rasket.unsubscribe(id);
    rasket.publish(eventName);
    expect(callback).not.toHaveBeenCalled();
  });

  it('should only unsubscribe the subscriber for the given subscriber id', () => {
    const firstCallback = jest.fn();
    const secondCallback = jest.fn();
    const firstSubscriberId = rasket.subscribe('firstTopic', firstCallback);
    const secondSubscriberId = rasket.subscribe('secondTopic', secondCallback);
    rasket.publish('firstTopic');
    expect(firstCallback).toHaveBeenCalled();
    rasket.publish('secondTopic');
    expect(secondCallback).toHaveBeenCalled();
    rasket.unsubscribe(secondSubscriberId);
    rasket.publish('secondTopic');
    expect(secondCallback).toHaveBeenCalledTimes(1);
    rasket.unsubscribe(firstSubscriberId);
  });

  it('should not unsubscribe if subscriber id has not been given', () => {
    console.error = jest.fn();
    const listenerIdRequiredErrorMessage = '[Rasket] You must pass a subscriber id (String) as first argument.';
    const id = rasket.subscribe('testTopic', jest.fn());
    rasket.unsubscribe();
    expect(console.error).toHaveBeenCalledWith(listenerIdRequiredErrorMessage);
    rasket.unsubscribe(id);
  });
});
