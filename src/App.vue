<template>
    <ElemenTable
        :columns="columns"
        :data="data"
        :filters="filters"
        :rowsPerPageOptions="rowsPerPage"
    ></ElemenTable>
</template>

<script>
    import ElemenTable from './components/ElemenTable'

    export default {
        name: 'app',
        components: {
            ElemenTable
        },
        data(){
            return {
                columns: [
                    {
                        name: 'Country',
                        selector: 'country',
                        sortable: true,
                        active: false
                    },
                    {
                        name: 'Capital',
                        selector: 'capital',
                        sortable: true,
                        active: false
                    },
                    {
                        name: 'Population',
                        selector: 'population',
                        sortable: false,
                        active: false
                    }
                ],
                data: [
                    {country:'Austria',capital:'Vienna',population:8857960},
                    {country:'Belgium',capital:'Brussels',population:11420163},
                    {country:'Canada',capital:'Ottawa',population:37602103},
                    {country:'Denmark',capital:'Copenhagen',population:5814461},
                    {country:'England',capital:'London',population:55619400},
                    {country:'France',capital:'Paris',population:67022000},
                    {country:'Germany',capital:'Berlin',population:83019200},
                    {country:'Hungary',capital:'Budapest',population:9772756},
                    {country:'Italy',capital:'Rome',population:60359546},
                    {country:'Japan',capital:'Tokio',population:126317000},
                    {country:'Kazakhstan',capital:'Nur-Sultan',population:18448600},
                    {country:'Lithuania',capital:'Vilnius',population:2793486},
                    {country:'Mozambique',capital:'Maputo',population:28829476},
                    {country:'New-Zealand',capital:'Wellington',population:4940580},
                    {country:'Oman',capital:'Muscat',population:4424762},
                    {country:'Poland',capital:'Warsaw',population:38386000},
                    {country:'Qatar',capital:'Doha',population:2641669},
                    {country:'Russia',capital:'Moscow',population:146793744},
                    {country:'Sweden',capital:'Stockholm',population:10302984},
                    {country:'Tonga',capital:'Nuku\'alofa',population:100651},
                    {country:'Ukraine',capital:'Kiev',population:42030832},
                    {country:'Venezuela',capital:'Caracas',population:31568179},
                    {country:'Wales',capital:'Cardiff',population:3125000}
                ],
                filters: [
                    {
                        name: 'Small',
                        active: false,
                        condition: function(row){
                            if (row.population < 5000000) return true;
                            return false;
                        }
                    },
                    {
                        name: 'Medium',
                        active: true,
                        condition: function(row){
                            if (row.population >= 5000000 && row.population <= 50000000) return true;
                            return false;
                        }
                    },
                    {
                        name: 'Big',
                        active: false,
                        condition: function(row){
                            if (row.population > 50000000) return true;
                            return false;
                        }
                    }
                ],
                rowsPerPage: [10, 20, 50]
            };
        }
    }
</script>