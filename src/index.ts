import { User } from './models/User';

const user = new User({ id: 1, name: 'linh', age: 21 });

user.on('save', () => {
	console.log(user);
});

user.save();
