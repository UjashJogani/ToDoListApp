import { StyleSheet } from 'react-native';
import { COLORS, FS } from '../../../../constants';

const ToDoApiStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    flatList: {
        marginTop: 10,
    },
    flatListContent: {
        paddingBottom: 30,
    },
    toDoContainer: {
        backgroundColor: COLORS.WHITE,
        marginVertical: 5,
        borderWidth: 1,
        borderRadius: 5,
        overflow: 'hidden',
    },
    ToDoHeader: {
        flexDirection: 'row',
        backgroundColor: COLORS.DARK_GOLD,
        alignItems: 'center',
    },
    toDoIcon: {
        height: 25,
        width: 25,
        marginLeft: 10,
        tintColor: COLORS.BORDER_GREY
    },
    toDoTitle: {
        color: COLORS.WHITE,
        padding: 10,
        textTransform: 'capitalize',
        fontSize: FS.FS16,
        fontWeight: '600',
        flex: 1,
    },
    toDoBody: {
        color: COLORS.BLACK,
        padding: 5,
    },
    emptyListView: {
        fontSize: FS.FS18,
        color: COLORS.BLACK,
        textAlign: 'center',
        marginTop: 20
    }
});

export default ToDoApiStyles;
