# elementable-vue

This is the Vue version of the *elementable* datatable. I know, another datatable component.. But I am trying to make this one very straight forward and as decoupled as possible. This is only the first version so configuration is limited for now, you can expect a lot more changes to come. If you have ideas about features, feel free to drop them in the Issues and I will get back to you.

### Install
```
npm install elementable-vue
```

### Configuration

You can use the following properties with the component:

**columns**

Type: Array<br/>
Required

This is your collection of columns. Every column is an object which you can assign the following properties to:

| Property | Type    | Description                                                 |
| -------- | ------- | ----------------------------------------------------------- |
| name     | string  | The name of the column, this will show as the column header |
| selector | string  | The property in the data object in dot notation             |
| sortable | boolean | Define if the column should be sortable or not              |
| active   | boolean | Set an active column, this can only be applied to one       |

**data**

Type: Array<br/>
Required

Every element of the data array represents a row in the table and should be an object with at least the properties defined in the columns array.

**filters**

Type: Array<br/>
Default: []

If you want some pre-defined filters to interact with the data you can add some to the filters array. Every filter is an object with the following properties: 

| Property  | Type     | Description                                                        |
| --------- | -------- | ------------------------------------------------------------------ |
| name      | string   | The name of the filter, it will show in the top right corner       |
| active    | boolean  | Set this to true if you want the filter active by default          |
| condition | function | A function that returns true or false, depending on some condition |

**rowsPerPageOptions**

Type: Array<br/>
Default: [10, 25, 50]

Choose how many rows can be displayed on a page.