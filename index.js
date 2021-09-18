/**
 * @format
 */

import {AppRegistry} from 'react-native';
console.ignoredYellowBox = ['Warning: Failed propType: SceneView'];
import App from './App';
import {name as appName} from './app.json';
// console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
