import { reactive } from 'vue'

export const store = reactive({
    featureInfo: [{}],
    params: {},
    num_scenario: "",
    prob_scenario: 0,
    dblclick: false,
    itineraire: [],
    depart: {},
    arrivee: {}
})
