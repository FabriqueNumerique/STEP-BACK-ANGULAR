export interface field {
	key: string,
	type: string,
	templateOptions: {
		label: string,
		placeholder: string,
		required: boolean,
		type: string,
		rows?: number				
	}
}