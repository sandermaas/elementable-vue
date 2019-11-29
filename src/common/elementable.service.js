import get from 'lodash/get';

export const orderby = function(data, selector, direction){
    if (direction === 'down') return data.sort(compare(selector));
    if (direction === 'up') return data.sort(compare('-' + selector));
};

const compare = function(prop){
    var sortOrder = 1;
    if (prop[0] === '-'){
        sortOrder = -1;
        prop = prop.substr(1);
    }

    return function(a, b){
        a = get(a, prop);
        if (!a) a = "";

        b = get(b, prop);
        if (!b) b = "";

        var result = 0;
        if (typeof(a) === 'number' && typeof(b) === 'number'){
            if (a < b) result = -1;
            if (a > b) result = 1;
        } else {
            if (a.toString().toLowerCase() < b.toString().toLowerCase()) result = -1;
            if (a.toString().toLowerCase() > b.toString().toLowerCase()) result = 1;
        }
        return result * sortOrder;
    };
};

export const filter = function(data, activefilters){
    activefilters.forEach((activefilter) => {
        data = data.filter(function(item){
            if (activefilter.condition(item)) return true;
        });
    });

    /*
    data = data.filter(function(item){
        for (var i = 0, iLength = activefilters.length; i < iLength; i++){
            if (activefilters[i].condition(item)) return true;
        }
        return false;
    });
    */

    return data;
};

export const search = function(data, term){
    return data.filter(function(item){
        var values = Object.values(item);
        for (var i = 0, iLength = values.length; i < iLength; i++){
            if (values[i]){
                if (values[i].toString().toLowerCase().indexOf(term) !== -1) return true;
            }
        }
        return false;
    });
};

export default { orderby, filter, search };