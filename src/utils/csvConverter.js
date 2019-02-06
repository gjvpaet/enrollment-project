export const convertArrayOfObjectsToCSV = args => {
    let result, ctr, keys, columnDelimeter, lineDelimeter, data;

    data = args.data || null;
    if (!data || !data.length) {
        return null;
    }

    columnDelimeter = args.columnDelimeter || ',';
    lineDelimeter = args.lineDelimeter || '\n';

    keys = Object.keys(data[0]);

    result = '';
    result += keys.join(columnDelimeter);
    result += lineDelimeter;

    data.forEach(item => {
        ctr = 0;

        keys.forEach(key => {
            if (ctr > 0) {
                result += columnDelimeter;
            }

            result += item[key];
            ctr++;
        });

        result += lineDelimeter;
    });

    return result;
};
