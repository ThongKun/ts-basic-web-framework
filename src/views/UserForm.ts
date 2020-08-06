import { User } from '../models/User';

export class UserForm {
	constructor(public parent: Element, public model: User) {}

	eventMap(): { [key: string]: () => void } {
		return {
			'click:.set-age': this.onSetAgeClick,
		};
	}

	onSetAgeClick = (): void => {
		this.model.setRangeAge();
	};

	template(): string {
		return `
      <div>
        <h1>User Form</h1>
        <div>User name: ${this.model.get('name')}</div>
        <div>Age: ${this.model.get('age')}</div>
        <input/>
        <button>Click Me</button>
        <button class="set-age">Set Random Age</button>
      </div>
    `;
	}

	bindEvent(fragment: DocumentFragment): void {
		const eventMaps = this.eventMap();
		for (let eventKey in eventMaps) {
			const [eventName, selector] = eventKey.split(':');
			fragment.querySelectorAll(selector).forEach((element) => {
				element.addEventListener(eventName, eventMaps[eventKey]);
			});
		}
	}

	render(): void {
		const templateElement = document.createElement('template');
		templateElement.innerHTML = this.template();

		this.bindEvent(templateElement.content);

		this.parent.append(templateElement.content);
	}
}
