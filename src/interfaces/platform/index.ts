export interface ISelectOption {
	title: string;
	value: string;
	icon?: string;
}

export interface ICountryOption extends ISelectOption {
	title: string;
	value: string;
}

export interface IAnchorOption extends ISelectOption {
	title: string;
	value: string;
	icon: string;
}

export interface IOperationOption extends ISelectOption {
	title: string;
	value: string;
}
