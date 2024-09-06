import React, { useEffect, useState } from 'react';
import { FlatList, Image, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { receiveToDoListData } from '../../../redux/actionCreator/Todos';
import { selectToDoApiList } from '../../../redux/reducers/ToDOAPISlice';
import { COLORS, FS, IMAGES } from '../../../constants';
import { CustomSpinner } from '../../common';
import { ToDoApiStyles } from './styles';

const PAGE_SIZE = 10;  // Number of Todos to load per page

const ToDoApiScreen = () => {
    const dispatch = useDispatch();
    const toDoListData = useSelector(selectToDoApiList);  // Selects ToDo list data from the Redux store
    const [isRefresh, setIsRefresh] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [displayedToDo, setDisplayedToDos] = useState([]);
    
    useEffect(() => {
        fetchToDoData(true);
    }, []);

    // Function to fetch ToDos data
    const fetchToDoData = async (isInitial = false) => {
        await dispatch(receiveToDoListData(dispatch));
        if (isInitial) {
            setDisplayedToDos(toDoListData.slice(0, PAGE_SIZE));
        }
    };

    // Effect to load more ToDos when toDoListData changes and not refreshing
    useEffect(() => {
        if (!isRefresh) {
            loadMoreTodos();
        }
    }, [toDoListData]);

    // Function to load more Todos for pagination
    const loadMoreTodos = () => {
        const newPage = currentPage + 1;
        const newToDos = toDoListData.slice(0, newPage * PAGE_SIZE);
        setDisplayedToDos(newToDos);
        setCurrentPage(newPage);
    };

    // Function to render each ToDo item
    const renderToDosData = ({ item }) => (
        <View style={ToDoApiStyles.toDoContainer}>
            <View>
                <View style={ToDoApiStyles.ToDoHeader}>
                    <Image source={IMAGES.ToDO_CHECK} style={ToDoApiStyles.toDoIcon} />
                    <Text style={ToDoApiStyles.toDoTitle}>{item.title}</Text>
                </View>
                {/* <Text style={ToDoApiStyles.toDoBody}>{item.body}</Text> */}
            </View>
        </View>
    );

    // Function to handle pull-to-refresh
    const onRefresh = () => {
        setIsRefresh(true);
        setCurrentPage(1);
        fetchToDoData(true);
        setTimeout(() => {
            setIsRefresh(false);
        }, 2000);
    };

    return (
        <View style={ToDoApiStyles.container}>
            <FlatList
                data={displayedToDo}  // Data for FlatList
                style={ToDoApiStyles.flatList}
                contentContainerStyle={ToDoApiStyles.flatListContent}
                renderItem={renderToDosData}  // Render function for each Todo
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={() => (
                    <View>
                        <Text style={ToDoApiStyles.emptyListView}>
                            Your ToDo API List is Empty!{'\n'}
                            <Text style={ToDoApiStyles.emptyListSubText}> Please Enter some To Do Data </Text>
                        </Text>
                    </View>
                )}
                refreshControl={
                    <RefreshControl
                        colors={[COLORS.DARK_GOLD, COLORS.MAIN_COLOR, COLORS.BG_GREY]}
                        refreshing={isRefresh}
                        onRefresh={onRefresh}  // Pull-to-refresh handler
                    />
                }
                onEndReachedThreshold={0.1}
                onEndReached={() => {
                    if (displayedToDo.length < toDoListData.length && !isRefresh) {
                        setIsLoading(true);
                        loadMoreTodos();  // Load more ToDos when end is reached
                        setTimeout(() => {
                            setIsLoading(false);
                        }, 2000);
                    }
                }}
            />
            {/* Spinner to indicate loading */}
            <CustomSpinner isActive={isLoading} />
        </View>
    );
};

export default ToDoApiScreen;