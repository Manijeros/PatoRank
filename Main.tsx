import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './Home';
import SelectPlayers from './SelectPlayers';
import AddMatch from './AddMatch';
import db from './db'

const MainNavigator = createStackNavigator({
  Rankings: { screen: Home },
  SelectPlayers: { screen: SelectPlayers },
  AddMatch: { screen: AddMatch },
});

const Main = createAppContainer(MainNavigator);

db.setup('<<baseId>>', '<<secret>>')

export default Main
