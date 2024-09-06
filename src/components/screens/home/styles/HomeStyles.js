import { StyleSheet } from 'react-native';

const HomeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    textInput: {
        marginVertical: 15,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    addButton: {
        flex: 1,
        marginRight: 10,
    },
    clearButton: {
        width: '40%',
        backgroundColor: COLORS.RED,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    headerIcon: {
        height: 50,
        width: 50,
        marginHorizontal: 10,
    },
    headerText: {
        fontSize: FS.FS25,
        color: COLORS.BLACK,
        fontWeight: 'bold',
    },
    flatList: {
        width: '100%',
    },
    flatListContent: {
        paddingBottom: 60,
    },
    todoContainer: {
        width: '100%',
        padding: 10,
        marginVertical: 5,
        // flexDirection: 'row',
        borderRadius: 10,
        alignItems: 'center'
    },
    todoImage: {
        height: 30,
        width: 30,
        resizeMode: 'contain',
        marginRight: 10,
    },
    todoText: {
        fontSize: FS.FS20,
        textTransform: 'capitalize',
        color: COLORS.BLACK,
        fontWeight: '600',
        flex: 1,
    },
    todoActions: {
        alignSelf: 'flex-end',
        flex: 1,
    },
    completeButtonContainer: {
        marginRight: 10,
        padding: 5,
        width: '30%',
        minWidth: '60%',
        alignSelf: 'flex-end',
        marginBottom: 5,
    },
    completeButtonText: {
        fontSize: FS.FS16,
    },
    actionButtons: {
        flexDirection: 'row',
        minWidth: '40%',
        alignSelf: 'flex-end',
    },
    actionButton: {
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    actionIcon: {
        height: 20,
        width: 20,
        tintColor: COLORS.WHITE,
    },
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
    },
    modalText: {
        alignSelf: 'center',
        textAlign: 'left',
        fontSize: FS.FS20,
        fontWeight: '600',
        color: COLORS.BLACK,
    },
    modalTextInput: {
        marginVertical: 15,
        backgroundColor: COLORS.BG_GREY,
    },
    modalButtonsContainer: {
        flexDirection: 'row',
        width: '80%',
    },
    modalButton: {
        marginRight: 10,
        padding: 10,
        width: '50%',
    },
    emptyListView: {
        fontSize: FS.FS18,
        color: COLORS.BLACK,
        textAlign: 'center',
        marginTop: 20
    }
});

export default HomeStyles;
