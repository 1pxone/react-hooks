type TSearchValues = string | number | null | undefined;
type TParseResult = { [key: string]: TSearchValues };

export function searchParse(search: string): TParseResult {
    if (search) {
        search = search.split('?')[1];
        const params = search.split('&');
        const parsed: TParseResult = {};
        for (const param of params) {
            const paramSplit = param.split('=');
            parsed[paramSplit[0]] = paramSplit[1];
        }
        return parsed;
    } else {
        return {};
    }
}

export function rebuildQuery(q, prop) {
    if (prop) {
        // console.log(prop);
        prop = JSON.parse(prop);
        const propType = Object.keys(prop)[0],
            propValue = prop[Object.keys(prop)[0]];
        switch (propType) {
            case 'q':
                q[propType] = JSON.stringify(propValue);
                break;
            case 'pg':
                q[propType] = JSON.stringify(propValue);
                break;
            default:
                q[propType] = propValue;
        }
    }
    // console.log(q);
    const hasQuery = 'q' in q || false,
        hasName = 'name' in q || false,
        emptyQuery = hasQuery ? q['q'].length === 0 : true,
        hasPaging = 'pg' in q || false,
        hasSorting = 'sort' in q || false,
        hasTags = 't' in q || false,
        tmpArr = [];

    if (hasQuery && !emptyQuery) {
        tmpArr.push('q=' + encodeURIComponent(q['q']));
    }
    if (hasName) {
        tmpArr.push('name=' + encodeURIComponent(q['name']));
    }
    if (hasTags) {
        tmpArr.push('t=' + q['t']);
    }
    if (hasPaging) {
        tmpArr.push('pg=' + q['pg']);
    }
    if (hasSorting) {
        tmpArr.push('sort=' + q['sort']);
    }

    return '?' + tmpArr.join('&');
}

interface IUseSearchQueryResult {
    values: TParseResult;
    setValue(key: string, value: TSearchValues): void;
    getValue(key: string): TSearchValues;
}

export const useSearchQuery = () => {};
