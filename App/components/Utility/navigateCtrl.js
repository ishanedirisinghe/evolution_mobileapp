import {StackActions, NavigationActions} from 'react-navigation';

export const resetStack = screen_name =>
  StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: screen_name})],
  });

export const resetStackWithKey = (screen_name, key) =>
  StackActions.reset({
    index: 0,
    key: 'MyIdScreen',
    actions: [NavigationActions.navigate({routeName: screen_name})],
  });

export const resetStackWithPassingInitialData = screen_name =>
  StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate(
        {routeName: screen_name},
        {INITIAL_SCREEN: 'YES'},
      ),
    ],
  });
