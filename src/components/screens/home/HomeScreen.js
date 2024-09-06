import React, { useState } from 'react';
import { Alert, FlatList, Image, Keyboard, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CustomButton, CustomDateTimePicker, CustomTextInput } from '../../common';
import { isEmpty } from '../../../utils';
import { COLORS, FS, IMAGES } from '../../../constants';
import { selectToDoList, setToDotListData } from '../../../redux/reducers/ToDoSlice';
import { HomeStyles } from './styles';

// HomeScreen component represents the main screen of the To-Do app
const HomeScreen = (props) => {
    // State variables to manage the task text, edit text, list of to-do items, selected item for editing, and modal visibility
    const dispatch = useDispatch();
    const toDoList = useSelector(selectToDoList);
    const [taskText, setTaskText] = useState("");
    const [editText, SetEditText] = useState("");
    const [date, setDate] = useState(new Date());
    const [selectedItem, setSelectedItem] = useState([]);
    const [displayEditModal, setDisplayEditModal] = useState(false);

    // Function to add a new task to the to-do list
    const addNewTask = async (value) => {
        let data = [...toDoList];

        // Check if the task text is not empty
        if (!isEmpty(value)) {
            data.push({ id: Math.floor(1000 + Math.random() * 9000), title: value, completed: false, dateTime: date });
            setDate(new Date())
            await dispatch(setToDotListData(data));
            setTaskText("");
        } else {
            // Show an alert if the task text is empty
            Alert.alert("Alert", "Please enter the task title!");
        }
        // Dismiss the keyboard
        Keyboard.dismiss();
    };

    // Function to edit an existing task
    const OnEditItem = async (title, date) => {
        let allToDodata = [...toDoList]
        allToDodata = allToDodata.map((item) => item.id == selectedItem.id ? { ...item, title: title, dateTime: date } : item);
        console.log("allToDodata:", allToDodata);
        await dispatch(setToDotListData(allToDodata)) // setToDoList(allToDodata);
        setSelectedItem([]);
        SetEditText("");
        setDate(new Date())
        setDisplayEditModal(false);
    };

    async function onDelete(id) {
        let data = [...toDoList];
        data = data.filter((item) => item.id != id);
        console.log("delete data:",data);
        await dispatch(setToDotListData(data)); // setToDoList(data);
    }

    // Function to delete a task from the to-do list
    const OnDeleteItem = (id) => {
        Alert.alert("Delete", "Are you sure you want delete?", [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            { text: 'Yes', onPress: () => onDelete(id) },
        ]);
    };

    // Function to mark a task as completed or uncompleted
    const OnCompletePress = async (selectedItem) => {
        var allToDodata = [...toDoList];
        allToDodata = allToDodata.map((item) => item.id == selectedItem.id ? { ...item, completed: true } : item);
        console.log("allToDodata:", allToDodata)
        await dispatch(setToDotListData(allToDodata)); // setToDoList(allToDodata);
        setTimeout(() => {
            onDelete(selectedItem.id)
        }, 2500);
    };

    // Function to render each to-do item in the list
    const rendertodoList =
     ({ item, index }) => {
        return (
            <View style={[HomeStyles.todoContainer, { backgroundColor: item.completed ? COLORS.MAIN_COLOR : COLORS.BG_GREY }]}>
                <View
                    key={index}
                    style={{ flexDirection: 'row' }}
                >
                    <TouchableOpacity onPress={() => OnCompletePress(item)}>
                        <Image
                            source={!item.completed ? IMAGES.ToDoUN_CHECK : IMAGES.ToDO_CHECK}
                            style={[
                                HomeStyles.todoImage,
                                item.completed ? { tintColor: COLORS.GREEN } : { tintColor: COLORS.GREY },
                            ]}
                        />
                    </TouchableOpacity>
                    <Text style={HomeStyles.todoText}>{item.title}</Text>
                    <View style={HomeStyles.todoActions}>
                        <View style={HomeStyles.actionButtons}>
                            {/* Button to open edit modal */}
                            <TouchableOpacity
                                style={[HomeStyles.actionButton, { backgroundColor: COLORS.GREEN }]}
                                onPress={async () => {
                                    await setSelectedItem(item);
                                    await SetEditText(item.title);
                                    setDisplayEditModal(true);
                                }}
                            >
                                <Image source={IMAGES.TASK_EDIT} style={HomeStyles.actionIcon} />
                            </TouchableOpacity>
                            {/* Button to delete the to-do item */}
                            <TouchableOpacity
                                style={[HomeStyles.actionButton, { backgroundColor: COLORS.RED }]}
                                onPress={() => OnDeleteItem(item.id)}
                            >
                                <Image source={IMAGES.TASK_DELETE} style={HomeStyles.actionIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignSelf: 'flex-start', marginLeft: 40, width: '60%', justifyContent: 'space-between', marginTop: 5 }}>
                    <View style={{ flexDirection: 'row', }}>
                        <Image source={IMAGES.DATE_ICON} style={{ height: 22, width: 22, marginRight: 10 }} />
                        <Text>{new Date(item?.dateTime)?.toLocaleDateString()}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', }}>
                        <Image source={IMAGES.TIME_ICON} style={{ height: 22, width: 22, marginRight: 10 }} />
                        <Text>{new Date(item?.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                    </View>

                </View>
            </View>
        );
    };

    // Function to render the edit modal
    const SelectedTypeModal = () => {
        const [selectedDate, setSelectedDate] = useState(selectedItem.dateTime ?? new Date())
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={displayEditModal}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setDisplayEditModal(!displayEditModal);
                }}
            >
                <View style={HomeStyles.centeredView}>
                    <View style={HomeStyles.modalView}>
                        <Text style={HomeStyles.modalText}>Edit To-Do Item</Text>
                        <CustomTextInput
                            placeholder="Enter task title"
                            mainStyle={HomeStyles.modalTextInput}
                            setValue={SetEditText}
                            value={editText}
                        />
                        <CustomDateTimePicker date={new Date(selectedDate)} setDate={setSelectedDate} />
                        <View style={HomeStyles.modalButtonsContainer}>
                            <CustomButton
                                title="Edit"
                                containerStyle={HomeStyles.modalButton}
                                onClick={() => OnEditItem(editText, selectedDate)}
                            />
                            <CustomButton
                                title="Cancel"
                                containerStyle={[HomeStyles.modalButton, { backgroundColor: COLORS.RED }]}
                                onClick={() => setDisplayEditModal(false)}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };

    // Function to clear the text input field
    const clearPress = () => setTaskText("");

    return (
        <View style={{ flex: 1 }}>
            {/* Main container for the home screen */}
            <View style={HomeStyles.container}>
                <Text style={[HomeStyles.headerText, { marginTop: 20 }]}>Enter Your Tasks</Text>

                {/* Input field for entering a new task */}
                <CustomTextInput
                    placeholder='Enter task title'
                    mainStyle={HomeStyles.textInput}
                    setValue={setTaskText}
                    value={taskText}
                />
                <CustomDateTimePicker date={date} setDate={setDate} />

                {/* Container for Add and Clear buttons */}
                <View style={HomeStyles.buttonsContainer}>
                    {/* Button to add a new task */}
                    <CustomButton
                        title={'Add Task'}
                        containerStyle={HomeStyles.addButton}
                        onClick={() => addNewTask(taskText)}
                    />
                    {/* Button to clear the input field */}
                    <CustomButton
                        title={'Clear'}
                        containerStyle={HomeStyles.clearButton}
                        onClick={clearPress}
                    />
                </View>

                {/* Header for the to-do list */}
                <View style={HomeStyles.header}>
                    <Image source={IMAGES.TODO_ICON} style={HomeStyles.headerIcon} />
                    <Text style={HomeStyles.headerText}>To-Do Lists</Text>
                </View>

                {/* List to display all to-do items */}
                <FlatList
                    data={toDoList}
                    style={HomeStyles.flatList}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={HomeStyles.flatListContent}
                    renderItem={rendertodoList}
                    ListEmptyComponent={() => (
                        <View>
                            <Text style={HomeStyles.emptyListView}>
                                Your To-Do List is Empty!{'\n'}
                                <Text style={{ fontSize: FS.FS16 }}>
                                    Enter some tasks and achieve your goals
                                </Text>
                            </Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
                {/* Modal for editing a selected to-do item */}
                <SelectedTypeModal />
            </View>
        </View>
    );
};

export default HomeScreen;
