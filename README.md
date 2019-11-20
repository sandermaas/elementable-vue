# elementable-vue

This is the Vue version of the *elementable* datatable. I know, another datatable component.. But I am trying to make this one very straight forward and as decoupled as possible. This is only the first version so configuration is limited for now, you can expect a lot more changes to come. If you have ideas about features, feel free to drop them in the Issues and I will get back to you.

### Install
```
npm install elementable-vue
```

### Configuration

You can use the following properties with the component:

**columns**

Type: Object

| Property | Type   | Required |
| -------- | ------ | -------- |
| name     | string | yes      |
| selector | string | yes      |

**data**

Type: Array

**filters**

Type: Object

| Property  | Type     | Required |
| --------- | -------- | -------- |
| name      | string   | yes      |
| condition | function | yes      |

**rowsPerPageOptions**

Type: Array