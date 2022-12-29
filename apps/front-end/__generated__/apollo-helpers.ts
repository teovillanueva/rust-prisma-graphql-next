import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type DeleteResultKeySpecifier = ('deletedId' | DeleteResultKeySpecifier)[];
export type DeleteResultFieldPolicy = {
	deletedId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('createTodo' | 'deleteTodo' | 'updateTodo' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	createTodo?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteTodo?: FieldPolicy<any> | FieldReadFunction<any>,
	updateTodo?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('todos' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	todos?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TodoKeySpecifier = ('completed' | 'id' | 'title' | TodoKeySpecifier)[];
export type TodoFieldPolicy = {
	completed?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	DeleteResult?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DeleteResultKeySpecifier | (() => undefined | DeleteResultKeySpecifier),
		fields?: DeleteResultFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	Todo?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TodoKeySpecifier | (() => undefined | TodoKeySpecifier),
		fields?: TodoFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;