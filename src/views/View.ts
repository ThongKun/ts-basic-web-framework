import { Model } from '../models/Model';

export abstract class View<T extends Model<K>, K> {
	regions: { [key: string]: Element } = {};

	constructor(public parent: Element, public model: T) {
		this.bindModel();
	}

	abstract template(): string;

	regionMap(): { [key: string]: string } {
		return {};
	}

	eventMap(): { [key: string]: () => void } {
		return {};
	}

	bindModel = (): void => {
		this.model.on('change', () => {
			this.render();
		});
	};

	bindEvent(fragment: DocumentFragment): void {
		const eventMaps = this.eventMap();
		for (let eventKey in eventMaps) {
			const [eventName, selector] = eventKey.split(':');
			fragment.querySelectorAll(selector).forEach((element) => {
				element.addEventListener(eventName, eventMaps[eventKey]);
			});
		}
	}

	mapRegions(fragment: DocumentFragment): void {
		const regionsMap = this.regionMap();

		for (let key in regionsMap) {
			const selector = regionsMap[key];
			const element = fragment.querySelector(selector);
			if (element) {
				this.regions[key] = element;
			}
		}
	}

	onRender(): void {}

	render(): void {
		this.parent.innerHTML = ''; //reset parent before updating its children

		const templateElement = document.createElement('template');
		templateElement.innerHTML = this.template();

		this.bindEvent(templateElement.content);
		this.mapRegions(templateElement.content);

		this.onRender();

		this.parent.append(templateElement.content);
	}
}
