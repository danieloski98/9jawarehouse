import { EventEmitter } from 'events';
import { User } from 'src/Schema/User.schema';

type Events = '1 Month Plan' | '3 Months Plan' | '6 Months Plan';
const eventEmitter = new EventEmitter();

eventEmitter.on('1 Month Plan', (data: User) => {
  console.log('event trigger called');
});

function triggerEvent(event: Events, data: User) {
  eventEmitter.emit(event, data);
}

export default triggerEvent;
