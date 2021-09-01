export interface field {
	id:string,
	key: string,
	type: string,
	className?:string,

	templateOptions: {
		label: string,
		placeholder: string,
		required: boolean,
		type?: string,
		rows?: number				
	}
}