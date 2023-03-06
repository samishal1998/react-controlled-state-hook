import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";

/**
 * A function type that is used in {@link useControlledState} hook.
 *
 * @typeParam PropType - The data type of the prop.
 * @typeParam StateType - The data type of the state.
 * @typeParam ReturnType - The return type of the function, by default ReturnType=StateType.
 * 
 * 
 * @param {PropType} prevProp - The previous value of the prop
 * @param {PropType} newProp - The new value of the prop
 * @param {StateType} currentState - The current value of the state
 */
export type ControlledStateMethod<PropType,StateType,ReturnType=StateType> = (prevProp: PropType, newProp: PropType, currentState: StateType) => ReturnType; 
export type ControlledStateMethodAsync<PropType,StateType,ReturnType=StateType> = (prevProp: PropType, newProp: PropType, currentState: StateType) => ReturnType | Promise<ReturnType>; 

/**
 * An interface describing the extra utilities returned from {@link useControlledState}. It is the type of the third value in the tuple returned from {@link useControlledState}
 * @typeParam PropType - The data type of the prop.
 * @typeParam StateType - The data type of the state.
 * 
 */
export type ExtraUtilsReturn<PropType,StateType> = {

	/**
	 * This a setter for `allowPropChangeState` which controls whether the prop updates the state in {@link useControlledState} hook.
	 * 
	 * @param allowPropChangeState 
	 * 
	 */
    setAllowPropChangeState:(allowPropChangeState: boolean | ((currentAllowPropChangeState: boolean) => boolean)) => void,

	/**
	 * This a getter for `allowPropChangeState` which controls whether the prop updates the state in {@link useControlledState} hook.
	 * 
	 */
    getAllowPropChangeState: ()=> boolean,

	/**
	 * This a getter for previous Prop value in {@link useControlledState} hook.
	 * 
	 */
    getPrevProp: ()=>PropType,
}

// 1 true
/**
 * This Hook Allows you to define a state that is depending on a prop,
 *  and control whether it updates from the prop, or updates manually using a setter.
 * 
 * @remarks
 * Also, You can pass functions that:
 *  - derive new state value from the new prop (`configuration.getDerivedStateFromProp`).
 *  - checks a condition to decide to update the state based on each prop value (`configuration.shouldPropChangeState`).
 * 
 * The hook will behave as a normal useState, if:
 *  - `prop` param is not passed.
 * 	- A literal value passed instead of a prop.
 * 	- `configuration.allowPropChangeState` is set to false.
 * 
 * !!WARNING!!: Components Like <React.StrictMode> Could cause useEffect to be called twice, which will affect the behavior of `configuration.allowFirstEffect`.
 * 
 * @typeParam PropType - The data type of the prop.
 * @typeParam StateType - The data type of the state.
 * 
 * 
 * @param {PropType} prop - The Prop that is updating the state. If the prop is undefined then the state type is whatever Passed in the generics and undefined.
 * @param configuration - configuration object to control the behavior of the hook.
 * @param configuration.initialValue - a value or a function that returns the value. (If not passed then `prop` is initial value)
 * @param configuration.getDerivedStateFromProp - a function that derives new state from the prop. It takes in the (prevProp,prevState,newProp) and should return the new state value. if the state and props types are different then you have to define the type in the params of the function.
 * @param configuration.allowFirstEffect - a boolean value to determine whether the first effect should run. !!WARNING!!: Components Like <React.StrictMode> Could cause useEffect to be called twice.
 * @param configuration.allowPropChangeState - a boolean value to determine whether the prop changes the state, it can also be controlled using the setter `setAllowPropChangeState` that is returned. there's also a getter for it `getAllowPropChangeState`
 * @param configuration.shouldPropChangeState - a function that determines whether the new state should update based on the new prop. It takes in the (prevProp,prevState,newProp) and should return a boolean.
 * 
 * @returns {[StateType|undefined,Dispatch<SetStateAction<StateType | undefined>>,ExtraUtilsReturn<PropType,StateType>]} A Tuple [State, SetState, ExtraUtils] 
 * @see {@link ExtraUtilsReturn | `ExtraUtilsReturn` For the type of the 3rd value in the tuple}
 */
export function useControlledState<PropType,StateType>(
	prop: PropType,
	configuration: {
		initialValue: undefined | (() => undefined);
		getDerivedStateFromProp: ControlledStateMethodAsync< PropType| undefined, StateType| undefined>,// (prevProp: P| undefined, newProp: P| undefined, currentState: S| undefined) => S| undefined;
		allowFirstEffect?: boolean;
		allowPropChangeState?: boolean;
		shouldPropChangeState?: ControlledStateMethod< PropType| undefined, StateType| undefined,boolean>,
	}
): [StateType | undefined, Dispatch<SetStateAction<StateType | undefined>>, ExtraUtilsReturn<PropType,StateType>];

//2 true
export function useControlledState<PropType,StateType>(
	prop: PropType,
	configuration: {
		getDerivedStateFromProp:ControlledStateMethodAsync< PropType, StateType >;
		shouldPropChangeState?: ControlledStateMethod< PropType, StateType ,boolean>;
		allowFirstEffect?: boolean;
		allowPropChangeState?: boolean;
		initialValue?: StateType | (() => StateType);

	}
): [StateType, Dispatch<SetStateAction<StateType>>, ExtraUtilsReturn<PropType,StateType>];

//3 true
export function useControlledState<PropType,StateType=PropType>(
	prop: PropType,
	configuration: {
		initialValue: undefined | (() => undefined);
		shouldPropChangeState?: ControlledStateMethod< PropType| undefined, StateType | undefined,boolean>;
		allowFirstEffect?: boolean;
		allowPropChangeState?: boolean;
	}
): [StateType | undefined, Dispatch<SetStateAction<StateType | undefined>>, ExtraUtilsReturn<PropType,StateType>];

//4 true
export function useControlledState<PropType,StateType=PropType>(
	prop: PropType,
	configuration: {
		allowFirstEffect?: boolean;
		allowPropChangeState?: boolean;
		shouldPropChangeState?: ControlledStateMethod< PropType, StateType ,boolean>;
		initialValue?: StateType | (() => StateType);
	}
): [StateType, Dispatch<SetStateAction<StateType>>, ExtraUtilsReturn<PropType,StateType>];




//5 true
export function useControlledState<PropType,StateType=PropType>(
	prop: PropType,
	configuration?: {
		initialValue?: StateType | (() => StateType);
		allowFirstEffect?: boolean;
		allowPropChangeState?: boolean;
		getDerivedStateFromProp?:ControlledStateMethodAsync< PropType | undefined, StateType  | undefined>;
		shouldPropChangeState?: ControlledStateMethod<  PropType | undefined, StateType  | undefined,boolean>;
	}
): [StateType , Dispatch<SetStateAction<StateType>>, ExtraUtilsReturn<PropType,StateType>];


//6 true
export function useControlledState<T = undefined>(
	prop?: T,
	configuration?: {
		initialValue?: T | (() => T);
		allowFirstEffect?: boolean;
		allowPropChangeState?: boolean;
		getDerivedStateFromProp?:ControlledStateMethodAsync< T | undefined, T  | undefined >;
		shouldPropChangeState?: ControlledStateMethod<  T | undefined, T  | undefined,boolean>;
	}
): [T | undefined, Dispatch<SetStateAction<T | undefined>>, ExtraUtilsReturn<T,T>];




export function useControlledState<PropType=any,StateType=any>(
	prop: PropType,
	configuration?: {
		initialValue?: any,
		allowFirstEffect?: boolean,
		allowPropChangeState?: boolean,
		shouldPropChangeState?:  ControlledStateMethod<PropType,StateType,boolean>,
		getDerivedStateFromProp?: ControlledStateMethodAsync<PropType,StateType>
	}
) {
	const {
		initialValue,
		allowFirstEffect = false,
		allowPropChangeState = true,
		shouldPropChangeState,
		getDerivedStateFromProp
	} = configuration ?? {};
	const extraKeys = Object.fromEntries(Object.keys(configuration ?? {}).map((k)=>[k,true]))

	const isFirstRender = useRef(!allowFirstEffect);
	const isPropChangeAllowed = useRef(allowPropChangeState);
	const prevProp = useRef(prop);

	const [state, setState] = useState((extraKeys['initialValue'])?initialValue:prop); //(getDerivedStateFromProp)?getDerivedStateFromProp(prop):

	useEffect(() => {
		console.log({isFirstRender: isFirstRender.current,allowFirstEffect})
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}
		if (
			isPropChangeAllowed.current &&
			(!shouldPropChangeState ||
				(Boolean(shouldPropChangeState) && shouldPropChangeState(prevProp.current, prop,state)))
		) {
			if (getDerivedStateFromProp){
				(
					async()=>{
						const newState = await getDerivedStateFromProp(prevProp.current, prop, state);
						setState(newState);
					}
				)()
				
				// setState((currentState: StateType) => getDerivedStateFromProp(prevProp.current, prop, currentState));
			}
			else setState(prop);
		}
		prevProp.current = prop;

	}, [prop]);

	const setAllowPropChangeState = useCallback((allowPropChangeState: boolean | ((currentAllowPropChangeState: boolean )=>boolean)) => {
		if(typeof allowPropChangeState === "boolean")
			isPropChangeAllowed.current = allowPropChangeState;
			else 
			isPropChangeAllowed.current = allowPropChangeState(isPropChangeAllowed.current);

	}, []);

	const getAllowPropChangeState = useCallback(() => {
			return isPropChangeAllowed.current ;
	}, []);

	const getPrevProp = useCallback(() => {
			return prevProp.current ;
	}, []);

	return [state, setState, {setAllowPropChangeState,getAllowPropChangeState,getPrevProp}];
}
