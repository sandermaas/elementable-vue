export const datatable = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    table: {
        borderCollapse: 'collapse',
        width: '100%',
        textAlign: 'left'
    },
    theadRow: {
        borderBottom: '1px solid black'
    },
    theadCell: {
        userSelect: 'none',
        padding: '10px'
    },
    theadSpan: {
        display: 'flex',
        alignItems: 'center'
    },
    tbodyCell: {
        padding: '5px 10px 5px 10px'
    },
    arrowDown: {
        marginLeft: '20px',
        width: '0', 
        height: '0', 
        borderLeft: '5px solid transparent',
        borderRight: '5px solid transparent',
        borderTop: '8px solid black'
    },
    arrowUp: {
        marginLeft: '20px',
        width: '0', 
        height: '0', 
        borderLeft: '5px solid transparent',
        borderRight: '5px solid transparent',
        borderBottom: '8px solid black'
    },
    arrowHidden: {
        opacity: '0',
        marginLeft: '20px',
        width: '0', 
        height: '0', 
        borderLeft: '5px solid transparent',
        borderRight: '5px solid transparent',
        borderTop: '8px solid transparent',
        borderBottom: '8px solid transparent'
    }
};

export const searchbar = {
    root: {
        padding: '5px',
        width: '25%'
    }
};

export const filtersection = {
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '30%'
    },
    span: {
        display: 'flex',
        userSelect: 'none',
        cursor: 'pointer'
    },
    input: {
        cursor: 'pointer'
    }
};

export const pagination = {
    root: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    section: {
        listStyle: 'none',
        display: 'flex',
        justifyContent: 'space-evenly',
        width: '30%'
    },
    pagingItem: {
        cursor: 'pointer',
        userSelect: 'none',
        width: '20%',
        textAlign: 'center',
        padding: '10px 0 10px 0'
    }
};

export default { datatable, searchbar, filtersection, pagination };