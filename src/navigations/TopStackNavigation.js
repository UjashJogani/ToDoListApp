import { Alert } from 'react-native';
import RNFS from 'react-native-fs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { HomeScreen } from '../components/screens/home';
import { ToDoApiScreen } from '../components/screens/ToDoList';
import { CustomHeader } from '../components/common';
import { checkPermission } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { selectToDoList, setToDotListData } from '../redux/reducers/ToDoSlice';

const Tab = createMaterialTopTabNavigator();

const TopStackNavigation = () => {
    const toDoList = useSelector(selectToDoList);
    const dispatch = useDispatch();
    
    const TakeABackup = async () => {
        await checkPermission();
        const jsonData = JSON.stringify(toDoList);
        const backupPath = `${RNFS.DocumentDirectoryPath}/toDoListBackup.json`;
        try {
            await RNFS.writeFile(backupPath, jsonData, 'utf8');
            Alert.alert("Backup Success", "Backup taking successfully!")
            console.log('Data exported successfully!', backupPath);
        } catch (error) {
            console.error('Error exporting data:', error);
        }
    }

    const restoreBackUp = async () => {
        const backupPath = `${RNFS.DocumentDirectoryPath}/toDoListBackup.json`;
        try {
            const jsonData = await RNFS.readFile(backupPath, 'utf8');
            const data = JSON.parse(jsonData);
            const newData = []

            // Add imported data to the ToDoList
            data.map(item => {
                if (!toDoList.find((element) => element.id == item.id)) newData.push(item)
            });

            await dispatch(setToDotListData([...toDoList, ...newData]));
            Alert.alert('Data imported successfully!');
        } catch (error) {
            console.error('Error importing data:', error);
        }
    };
    return (
        <>
            <CustomHeader title={'Home Screen'} displayBackupRestore={true} onBackUpPress={TakeABackup} onRestorePress={restoreBackUp} />
            <Tab.Navigator>
                <Tab.Screen name="ToDoScreen" component={HomeScreen} options={{ title: 'To-Do List' }} />
                <Tab.Screen name="ToDoApiScreen" component={ToDoApiScreen} options={{ title: 'To-Do API List' }} />
            </Tab.Navigator>
        </>
    );
}

export default TopStackNavigation;